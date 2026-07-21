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
  const rootRef = useRef<HTMLDivElement | null>(null)

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
        ? new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && show(), {
            rootMargin: '0px 0px -20% 0px',
          })
        : undefined
    io?.observe(el)
    const onScroll = () => el.getBoundingClientRect().top < window.innerHeight * 0.85 && show()
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const failsafe = window.setTimeout(show, 3000)
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(failsafe)
    }
  }, [reduce])

  useEffect(() => {
    if (reduce || !seen || paused) return
    const t = window.setTimeout(() => setActive((n) => (n + 1) % steps.length), DWELL)
    return () => window.clearTimeout(t)
  }, [active, reduce, seen, paused, steps.length])

  const tallyNow = steps.slice(0, active + 1).filter((s) => s.tally).slice(-1)[0]?.tally

  /* Reduced motion / no-JS: everything visible, nothing moving. */
  if (reduce) {
    return (
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7">
          <TabletFilmstrip screens={steps.map((s) => s.screen)} />
        </div>
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
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* the device — left, showing the screen for the current stage */}
      <div className="lg:col-span-7">
        <TabletOS screen={steps[active]?.screen} orbState={paused ? 'idle' : 'listening'} />

        {/* step dots — manual control alongside the auto-advance */}
        <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Journey stages">
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
                style={{ width: 28, height: 44 }}
              >
                <span
                  style={{
                    display: 'block',
                    height: 3,
                    width: on ? 26 : 14,
                    borderRadius: 999,
                    background: on ? 'var(--accent)' : 'var(--border)',
                    transition: 'width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)',
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

      {/* the stages — right, advancing in place */}
      <div className="lg:col-span-5">
        <ol className="flex flex-col" role="list">
          {steps.map((s, i) => {
            const on = i === active
            const newAct = i === 0 || steps[i - 1].act !== s.act
            return (
              <li key={i}>
                {newAct && (
                  <div
                    className="eyebrow mt-6 first:mt-0 mb-2"
                    style={{ color: 'var(--accent)', opacity: 0.9 }}
                  >
                    {s.act}
                  </div>
                )}
                <button
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className="w-full text-left"
                  style={{
                    display: 'block',
                    paddingBlock: on ? 10 : 7,
                    paddingLeft: 16,
                    borderLeft: `2px solid ${on ? 'var(--accent)' : 'var(--border-soft)'}`,
                    transition: 'border-color var(--dur-base) var(--ease-standard), padding var(--dur-base) var(--ease-standard)',
                    minHeight: 44,
                  }}
                >
                  <span
                    className="font-serif block"
                    style={{
                      fontSize: on ? '1.2rem' : '1.05rem',
                      fontWeight: 530,
                      lineHeight: 1.25,
                      color: on ? 'var(--text)' : 'var(--text-faint)',
                      transition: 'color var(--dur-base) var(--ease-standard), font-size var(--dur-base) var(--ease-standard)',
                    }}
                  >
                    {s.title}
                  </span>

                  {/* caption + progress reveal only for the active stage */}
                  <span
                    className="block overflow-hidden"
                    style={{
                      maxHeight: on ? 90 : 0,
                      opacity: on ? 1 : 0,
                      transition: 'max-height var(--dur-slow) var(--ease-emphasis), opacity var(--dur-base) var(--ease-standard)',
                    }}
                  >
                    <span
                      className="font-sans block mt-1.5"
                      style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-dim)' }}
                    >
                      {s.caption}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block mt-3"
                      style={{ height: 1, background: 'var(--border-soft)' }}
                    >
                      <span
                        key={`${active}-${paused}`}
                        style={{
                          display: 'block',
                          height: 1,
                          background: 'var(--accent)',
                          width: paused ? '100%' : undefined,
                          animation: paused ? 'none' : `journey-progress ${DWELL}ms linear forwards`,
                        }}
                      />
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {tallyNow && (
          <div
            className="flex items-baseline gap-3 mt-8 pt-5"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            <span className="eyebrow">{tallyLabel}</span>
            <span
              className="font-serif"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 530, color: 'var(--accent)' }}
            >
              {tallyNow}
            </span>
          </div>
        )}
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

/**
 * The multi-surface signature moment: one intent, every screen the guest owns.
 * A copper thread connects the surfaces and the card hands off along it.
 * Horizon surfaces are labelled "Emerging" so this reads as vision, not a claim.
 */
export function SurfaceFan({
  surfaces,
  intent,
  answerImage,
  answerTitle,
  answerMeta,
  callNote,
  emergingLabel,
}: {
  surfaces: ReadonlyArray<Surface>
  intent: string
  answerImage: string
  answerTitle: string
  answerMeta: string
  callNote: string
  emergingLabel: string
}) {
  const [active, setActive] = useState(0)
  const [reduce, setReduce] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setActive((n) => (n + 1) % surfaces.length), 3200)
    return () => window.clearInterval(t)
  }, [reduce, surfaces.length])

  const isCall = surfaces[active]?.id === 'call'

  return (
    <div ref={ref}>
      {/* the intent, asked once */}
      <div
        className="rounded-full px-4 py-2.5 inline-block"
        style={{ background: 'rgba(251,248,242,0.06)', color: 'var(--text)', fontSize: 15 }}
      >
        {intent}
      </div>

      {/* copper thread + surfaces */}
      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="absolute left-0 right-0"
          style={{ top: 26, height: 1, background: 'var(--accent-hairline)' }}
        />
        <div className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {surfaces.map((s, i) => {
            const on = i === active
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="text-left"
                style={{ minHeight: 44 }}
                aria-pressed={on}
              >
                <span
                  aria-hidden="true"
                  className="block mx-auto"
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 999,
                    background: on ? 'var(--accent)' : 'var(--surface-3)',
                    border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                    boxShadow: on ? '0 0 0 5px rgba(200,106,58,0.18)' : 'none',
                    marginTop: 21,
                    transition: 'all var(--dur-base) var(--ease-standard)',
                  }}
                />
                <span
                  className="eyebrow block mt-4 text-center"
                  style={{ fontSize: 9, color: on ? 'var(--accent)' : 'var(--text-faint)' }}
                >
                  {s.label}
                </span>
                {s.emerging && (
                  <span className="eyebrow block text-center" style={{ fontSize: 8, opacity: 0.6 }}>
                    {emergingLabel}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* the answer, rendered for the active surface */}
      <div className="mt-12 flex justify-center">
        <div
          style={{
            width: '100%',
            maxWidth: isCall ? 420 : 520,
            background: 'var(--device-frame)',
            borderRadius: 20,
            padding: 8,
            border: '1px solid rgba(251,248,242,0.08)',
            transition: reduce ? 'none' : 'max-width var(--dur-slow) var(--ease-emphasis)',
          }}
        >
          <div
            className="overflow-hidden p-3"
            style={{ borderRadius: 14, background: 'linear-gradient(168deg,#191410,#0f0d0c)' }}
          >
            {isCall ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="flex items-end gap-1" aria-hidden="true">
                  {[10, 20, 32, 24, 38, 22, 14, 26, 16].map((h, i) => (
                    <span
                      key={i}
                      style={{
                        width: 3,
                        height: h,
                        background: 'var(--accent)',
                        borderRadius: 2,
                        opacity: 0.75,
                        animation: reduce ? 'none' : `pc-dot-pulse ${1.2 + (i % 4) * 0.25}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
                <span className="eyebrow" style={{ fontSize: 9 }}>
                  {callNote}
                </span>
              </div>
            ) : (
              <>
                <div
                  className="relative overflow-hidden"
                  style={{ height: 180, borderRadius: 10, border: '1px solid rgba(251,248,242,0.1)' }}
                >
                  <div
                    role="img"
                    aria-label={answerTitle}
                    className="tablet-kenburns"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${answerImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
                <div className="mt-3">
                  <div className="font-serif" style={{ fontSize: 15, fontWeight: 530, color: 'var(--text)' }}>
                    {answerTitle}
                  </div>
                  <div className="font-sans" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
                    {answerMeta}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
