'use client'

import { useEffect, useRef, useState } from 'react'
import { TabletOS, TabletFilmstrip } from './TabletOS'
import type { ScreenId } from '@/lib/i18n/marketing/deviceScreens'

/**
 * The journey sequence — PRE · DURING · AFTER, compressed.
 *
 * This replaced a scroll-synced version that gave each of six steps its own
 * viewport: six screens of scrolling to land one idea. Instead the tablet sits
 * on the left showing the screen for the current stage, and the stages advance
 * beside it in place — the whole act fits one screen, so the cognitive load is
 * a glance rather than a scroll.
 *
 * The active stage expands to show its caption and a copper progress line;
 * the others collapse to a title. Acts are grouped, and the revenue tally
 * carries across so the money story is visible at every stage.
 *
 * Three states:
 *  - motion: auto-advances (~5s), pausing on hover/focus; click any stage to jump
 *  - prefers-reduced-motion: no auto-advance, every stage expanded, filmstrip device
 *  - no-JS: identical to the reduced-motion state (server-rendered)
 */

export interface JourneyStep {
  act: string
  title: string
  caption: string
  screen: ScreenId
  /** Running revenue tally shown at this step, e.g. "+$250". */
  tally?: string
}

const DWELL = 5000

export function JourneyWalkthrough({
  steps,
  tallyLabel,
}: {
  steps: ReadonlyArray<JourneyStep>
  tallyLabel: string
}) {
  const [active, setActive] = useState(0)
  const [reduce, setReduce] = useState(true) // assume reduced until proven otherwise (no-JS safe)
  const [paused, setPaused] = useState(false)
  const [seen, setSeen] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null)
  const playing = seen && inView && pageVisible && !paused && !reduce

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Only run the sequence once it is actually on screen.
  useEffect(() => {
    const el = rootRef.current
    if (!el || reduce) return
    let done = false
    const show = () => {
      if (!done) {
        done = true
        setSeen(true)
      }
    }
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((es) => {
            const visible = es.some((e) => e.isIntersecting)
            setInView(visible)
            if (visible) show()
          }, { rootMargin: '160px 0px -20% 0px' })
        : undefined
    io?.observe(el)
    const onScroll = () => {
      if (io) return
      const rect = el.getBoundingClientRect()
      const visible = rect.bottom > 0 && rect.top < window.innerHeight * 0.85
      setInView(visible)
      if (visible) show()
    }
    const onVisibility = () => setPageVisible(!document.hidden)
    if (!io) window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    const failsafe = window.setTimeout(show, 3000)
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(failsafe)
    }
  }, [reduce])

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => setActive((n) => (n + 1) % steps.length), DWELL)
    return () => window.clearTimeout(t)
  }, [active, playing, steps.length])

  /**
   * The copper indicator is one absolutely-positioned bar that slides between
   * stages, measured from the active button. The previous version animated a
   * per-item border plus font-size and padding — all three reflow, which is
   * what made stepping feel like it jumped.
   */
  useEffect(() => {
    let frame = 0
    // The first interactive render happens when `reduce` flips false, and the
    // refs are not always attached by the time this runs — so retry on the
    // next frame. Bounded: an unbounded rAF chain would be exactly the kind of
    // runaway loop that pins the main thread if the ref never resolves.
    let tries = 0
    const measure = () => {
      const el = itemRefs.current[active]
      if (!el) {
        if (tries++ < 10) frame = window.requestAnimationFrame(measure)
        return
      }
      setBar({ top: el.offsetTop, height: el.offsetHeight })
    }
    measure()

    // Keep it aligned when the column reflows (language switch, resize).
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [active, reduce, steps.length])

  const tallyNow = steps.slice(0, active + 1).filter((s) => s.tally).slice(-1)[0]?.tally

  /* Reduced motion / no-JS: everything visible, nothing moving. */
  if (reduce) {
    return (
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col gap-7">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="eyebrow eyebrow-accent mb-1.5">
                {String(i + 1).padStart(2, '0')} · {s.act}
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 530, color: 'var(--text)' }}>
                {s.title}
              </h3>
              <p className="font-sans mt-1.5" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-dim)' }}>
                {s.caption}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-7">
          <TabletFilmstrip screens={steps.map((s) => s.screen)} />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-start motion-gated ${inView && pageVisible ? 'is-in-view' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ---------------------------------------- the stages — now on the left */}
      <div className="lg:col-span-5">
        <ol className="relative flex flex-col" role="list" style={{ borderLeft: '1px solid var(--border-soft)' }}>
          {/* the sliding copper indicator */}
          <span
            aria-hidden="true"
            className="jw-bar"
            style={{
              transform: `translateY(${bar?.top ?? 0}px)`,
              height: bar?.height ?? 0,
              opacity: bar ? 1 : 0,
            }}
          />

          {steps.map((s, i) => {
            const on = i === active
            const newAct = i === 0 || steps[i - 1].act !== s.act
            return (
              <li key={i}>
                {newAct && (
                  <div className="eyebrow mt-6 first:mt-0 mb-2 pl-4" style={{ color: 'var(--accent)', opacity: 0.9 }}>
                    {s.act}
                  </div>
                )}
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className="w-full text-left pl-4"
                  style={{
                    display: 'block',
                    // Fixed padding and font-size: nothing here may reflow.
                    paddingBlock: 9,
                    minHeight: 44,
                  }}
                >
                  <span
                    className="font-serif block"
                    style={{
                      fontSize: '1.12rem',
                      fontWeight: 530,
                      lineHeight: 1.3,
                      color: on ? 'var(--text)' : 'var(--text-faint)',
                      opacity: on ? 1 : 0.55,
                      transition: 'color 420ms var(--ease-standard), opacity 420ms var(--ease-standard)',
                    }}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {/* Fixed-height caption slot: the caption cross-fades in place instead
            of expanding inside the list, which used to shove every stage below
            it down the page.

            The fade is SEQUENTIAL, not a true cross-fade: the outgoing caption
            drops to 0 in 160ms, and the incoming one waits that long before
            fading in. A simultaneous cross-fade left both captions at ~50%
            opacity mid-transition, superimposed — badly in ES, where captions
            wrap to two lines. The min-height reserves room for the tallest
            (two-line) caption so nothing below it shifts. */}
        <div className="relative mt-6 pl-4" style={{ minHeight: 88 }}>
          {steps.map((s, i) => {
            const on = i === active
            return (
              <p
                key={i}
                aria-hidden={!on}
                className="font-sans absolute inset-x-0 top-0 pl-4"
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: 'var(--text-dim)',
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(4px)',
                  transition: on
                    ? 'opacity 240ms var(--ease-standard) 160ms, transform 240ms var(--ease-emphasis) 160ms'
                    : 'opacity 160ms var(--ease-standard), transform 160ms var(--ease-emphasis)',
                  pointerEvents: on ? 'auto' : 'none',
                }}
              >
                {s.caption}
              </p>
            )
          })}
        </div>

        {/* dwell bar + dots */}
        <div className="mt-5 pl-4">
          <span aria-hidden="true" className="block" style={{ height: 1, background: 'var(--border-soft)' }}>
            <span
              key={`${active}-${playing}`}
              style={{
                display: 'block',
                height: 1,
                background: 'var(--accent)',
                width: playing ? undefined : '100%',
                animation: playing ? `journey-progress ${DWELL}ms linear forwards` : 'none',
              }}
            />
          </span>

          <div className="mt-2 flex items-center" role="tablist" aria-label="Journey stages">
            {steps.map((s, i) => {
              const on = i === active
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={on}
                  aria-label={`${i + 1}. ${s.title}`}
                  onClick={() => setActive(i)}
                  className="grid place-items-center"
                  style={{ width: 40, height: 44 }}
                >
                  <span
                    style={{
                      display: 'block',
                      height: 3,
                      width: on ? 26 : 14,
                      borderRadius: 999,
                      background: on ? 'var(--accent)' : 'var(--border)',
                      transition: 'width 420ms var(--ease-emphasis), background 420ms var(--ease-standard)',
                    }}
                  />
                </button>
              )
            })}
            <span className="eyebrow ml-2" style={{ fontSize: 9 }}>
              {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* The tally slot is always rendered so it cannot shift the layout when
            the first value appears; the value itself cross-fades. */}
        <div
          className="mt-7 pt-5"
          style={{ borderTop: '1px solid var(--border-soft)' }}
        >
          <span className="eyebrow block">{tallyLabel}</span>
          {/* The value sits on its own line: baseline-aligning an absolutely
              positioned number against the label made them overlap. */}
          <span className="relative block mt-1.5" style={{ height: '2.1rem' }}>
            {steps.map((s, i) =>
              s.tally ? (
                <span
                  key={i}
                  aria-hidden={s.tally !== tallyNow}
                  className="font-serif absolute left-0 bottom-0"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                    fontWeight: 530,
                    color: 'var(--accent)',
                    lineHeight: 1.05,
                    opacity: s.tally === tallyNow ? 1 : 0,
                    transform: s.tally === tallyNow ? 'none' : 'translateY(6px)',
                    transition: 'opacity 420ms var(--ease-standard), transform 420ms var(--ease-emphasis)',
                  }}
                >
                  {s.tally}
                </span>
              ) : null
            )}
          </span>
        </div>
      </div>

      {/* ---------------------------------------- the device — now on the right */}
      <div className="lg:col-span-7">
        <TabletOS screen={steps[active]?.screen} orbState={playing ? 'listening' : 'idle'} />
      </div>
    </div>
  )
}

/* ------------------------------------------------- Interface of 2029 (§B) */

export interface Surface {
  id: string
  label: string
  emerging?: boolean
}
