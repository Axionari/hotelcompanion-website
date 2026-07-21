'use client'

import { useEffect, useRef, useState } from 'react'
import { TabletOS, TabletFilmstrip } from './TabletOS'
import type { ScreenId } from '@/lib/i18n/marketing/deviceScreens'

/**
 * The signature scroll-synced sticky device walkthrough
 * (Visual Interface Level-Up §D) — pin the tablet, and as the guest scrolls the
 * numbered steps the screen cross-fades step → step.
 *
 * It carries the spine of the product story: PRE (win the direct booking) ·
 * DURING (every request an upsell that feels like service) · AFTER (earn the
 * review, rebook direct). A small copper revenue tally ticks up across the acts.
 *
 * Reduced motion: no pinning, no cross-fade — the steps render as a plain list
 * beside a static filmstrip of the screens.
 * No-JS: identical to the reduced-motion state (server-rendered).
 */

export interface JourneyStep {
  act: string
  title: string
  caption: string
  screen: ScreenId
  /** Running revenue tally shown at this step, e.g. "+$250". */
  tally?: string
}

export function JourneyWalkthrough({
  steps,
  tallyLabel,
}: {
  steps: ReadonlyArray<JourneyStep>
  tallyLabel: string
}) {
  const [active, setActive] = useState(0)
  const [reduce, setReduce] = useState(true) // assume reduced until proven otherwise (no-JS safe)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduce) return
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length) return

    const pick = () => {
      // The step whose midpoint is nearest the viewport centre wins.
      const centre = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const dist = Math.abs(r.top + r.height / 2 - centre)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(pick, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
        : undefined
    els.forEach((el) => io?.observe(el))
    window.addEventListener('scroll', pick, { passive: true })
    pick()
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', pick)
    }
  }, [reduce])

  const tallyNow = steps.slice(0, active + 1).filter((s) => s.tally).slice(-1)[0]?.tally

  if (reduce) {
    return (
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col gap-8">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="eyebrow eyebrow-accent mb-2">
                {String(i + 1).padStart(2, '0')} · {s.act}
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 530, color: 'var(--text)' }}>
                {s.title}
              </h3>
              <p className="font-sans mt-1.5" style={{ fontSize: 15, color: 'var(--text-dim)' }}>
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
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* steps rail */}
      <div className="lg:col-span-5">
        {steps.map((s, i) => {
          const on = i === active
          return (
            <div
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el
              }}
              className="py-14 lg:py-24"
            >
              <div
                className="eyebrow mb-3"
                style={{ color: on ? 'var(--accent)' : 'var(--text-faint)', transition: 'color var(--dur-base)' }}
              >
                {String(i + 1).padStart(2, '0')} · {s.act}
              </div>
              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                  fontWeight: 530,
                  lineHeight: 1.2,
                  color: on ? 'var(--text)' : 'var(--text-faint)',
                  transition: 'color var(--dur-base) var(--ease-standard)',
                  maxWidth: '20ch',
                }}
              >
                {s.title}
              </h3>
              <p
                className="font-sans mt-3"
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: on ? 'var(--text-dim)' : 'var(--text-faint)',
                  transition: 'color var(--dur-base) var(--ease-standard)',
                  maxWidth: '42ch',
                }}
              >
                {s.caption}
              </p>
            </div>
          )
        })}
      </div>

      {/* pinned device */}
      <div className="lg:col-span-7 lg:sticky" style={{ top: 120 }}>
        <TabletOS screen={steps[active]?.screen} />
        {tallyNow && (
          <div className="mt-6 flex items-baseline gap-3">
            <span className="eyebrow">{tallyLabel}</span>
            <span
              className="font-serif"
              style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                fontWeight: 530,
                color: 'var(--accent)',
                transition: 'opacity var(--dur-base) var(--ease-standard)',
              }}
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
