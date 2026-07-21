'use client'

import { useEffect, useRef, useState } from 'react'

/* ============================================================================
   The two genuinely interactive moments RC does not have (Level-Up §FWA):
   the five-voice morph and the tabbed guest-journey device walkthrough.
   Both ship reduced-motion and no-JS states.
   ========================================================================= */

/** Shared device shell so every in-page device matches the hero tablet. */
function DeviceShell({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div
      className="relative mx-auto w-full"
      style={{
        maxWidth: 460,
        background: 'var(--device-frame)',
        borderRadius: 'var(--device-radius)',
        padding: 'var(--bezel)',
        border: '1px solid rgba(251,248,242,0.08)',
        boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 'calc(var(--device-radius) - var(--bezel))',
          background: 'linear-gradient(168deg, #191410 0%, #12100e 60%, #0f0d0c 100%)',
          minHeight: 300,
        }}
      >
        {label && (
          <div className="px-5 pt-5">
            <span
              className="eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ border: '1px solid var(--accent-hairline)', color: 'var(--accent)', fontSize: 9 }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: 'var(--accent)',
                  animation: 'pc-dot-pulse 2s ease-in-out infinite',
                }}
              />
              {label}
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- VoiceMorph */
/**
 * Five named voices, one reply — Hotel's answer to RC's white-label brand morph.
 * Selecting a voice cross-fades the SAME guest reply into that tone.
 */
export function VoiceMorph({
  voices,
  guestQuestion,
  deviceLabel,
  hint,
}: {
  voices: ReadonlyArray<{ name: string; desc: string; reply: string }>
  guestQuestion: string
  deviceLabel: string
  hint?: string
}) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  function pick(i: number) {
    if (i === active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setActive(i)
      return
    }
    setFading(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 210)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* selector */}
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Assistant voice" className="flex flex-col">
          {voices.map((v, i) => {
            const on = i === active
            return (
              <button
                key={v.name}
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                className="text-left py-4 transition-colors"
                style={{
                  borderTop: '1px solid var(--border-soft)',
                  borderLeft: `2px solid ${on ? 'var(--accent)' : 'transparent'}`,
                  paddingLeft: 16,
                  minHeight: 44,
                }}
              >
                <div
                  className="font-serif"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 530,
                    color: on ? 'var(--text)' : 'var(--text-dim)',
                  }}
                >
                  {v.name}
                </div>
                <div className="font-sans mt-0.5" style={{ fontSize: 13, color: 'var(--text-faint)' }}>
                  {v.desc}
                </div>
              </button>
            )
          })}
        </div>
        {hint && <p className="eyebrow mt-6">{hint}</p>}
      </div>

      {/* device */}
      <div className="lg:col-span-7">
        <DeviceShell label={deviceLabel}>
          <div className="px-5 pb-6 pt-5">
            <p
              className="rounded-2xl px-4 py-3 ml-auto"
              style={{
                background: 'rgba(251,248,242,0.06)',
                color: 'var(--text)',
                fontSize: 14,
                maxWidth: '85%',
                width: 'fit-content',
              }}
            >
              {guestQuestion}
            </p>
            <p
              className="mt-3 rounded-2xl px-4 py-3.5"
              style={{
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-hairline)',
                color: 'var(--text)',
                fontSize: 14,
                lineHeight: 1.6,
                opacity: fading ? 0 : 1,
                transition: 'opacity var(--dur-slow) var(--ease-emphasis)',
              }}
            >
              {voices[active].reply}
            </p>
          </div>
        </DeviceShell>
      </div>
    </div>
  )
}

/* ------------------------------------------------- TabbedDeviceWalkthrough */
/**
 * "Every conversation becomes action" — PC's tabbed panel re-skinned.
 * Tabs swap the in-device exchange; the final beat lands a copper punch line.
 */
export function TabbedDeviceWalkthrough({
  tabs,
  deviceLabel,
}: {
  tabs: ReadonlyArray<{
    label: string
    guest: string
    reply: string
    outcome?: string
  }>
  deviceLabel: string
}) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  function pick(i: number) {
    if (i === active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(i)
      return
    }
    setFading(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 210)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])
  const t = tabs[active]

  return (
    <div>
      {/* tabs */}
      <div role="tablist" aria-label="Guest requests" className="flex flex-wrap gap-2">
        {tabs.map((tab, i) => {
          const on = i === active
          return (
            <button
              key={tab.label}
              role="tab"
              aria-selected={on}
              onClick={() => pick(i)}
              className="font-sans rounded-full px-4 transition-colors"
              style={{
                minHeight: 44,
                fontSize: 14,
                background: on ? 'var(--accent)' : 'transparent',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                color: on ? '#1a1207' : 'var(--text-dim)',
                fontWeight: on ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <DeviceShell label={deviceLabel}>
            <div className="px-5 pb-6 pt-5" style={{ opacity: fading ? 0 : 1, transition: 'opacity var(--dur-slow) var(--ease-emphasis)' }}>
              <p
                className="rounded-2xl px-4 py-3 ml-auto"
                style={{
                  background: 'rgba(251,248,242,0.06)',
                  color: 'var(--text)',
                  fontSize: 14,
                  maxWidth: '85%',
                  width: 'fit-content',
                }}
              >
                {t.guest}
              </p>
              <p
                className="mt-3 rounded-2xl px-4 py-3.5"
                style={{
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--accent-hairline)',
                  color: 'var(--text)',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {t.reply}
              </p>
            </div>
          </DeviceShell>
        </div>

        <div className="lg:col-span-5">
          {t.outcome && (
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                fontWeight: 530,
                lineHeight: 1.25,
                color: 'var(--accent)',
                opacity: fading ? 0 : 1,
                transition: 'opacity var(--dur-slow) var(--ease-emphasis)',
              }}
            >
              {t.outcome}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- TwoStageAlert */
/** The 2 AM maintenance alert: guest reports → room captured → two alerts fire. */
export function TwoStageAlert({
  guest,
  reply,
  stages,
  deviceLabel,
}: {
  guest: string
  reply: string
  stages: ReadonlyArray<{ title: string; body: string }>
  deviceLabel: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSeen(true)
      return
    }
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
            rootMargin: '0px 0px -10% 0px',
          })
        : undefined
    io?.observe(el)
    const onScroll = () => el.getBoundingClientRect().top < window.innerHeight * 0.9 && show()
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const failsafe = window.setTimeout(show, 3000)
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(failsafe)
    }
  }, [])

  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="lg:col-span-6">
        <DeviceShell label={deviceLabel}>
          <div className="px-5 pb-6 pt-5">
            <p
              className="rounded-2xl px-4 py-3 ml-auto"
              style={{
                background: 'rgba(251,248,242,0.06)',
                color: 'var(--text)',
                fontSize: 14,
                maxWidth: '85%',
                width: 'fit-content',
              }}
            >
              {guest}
            </p>
            <p
              className="mt-3 rounded-2xl px-4 py-3.5"
              style={{
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-hairline)',
                color: 'var(--text)',
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {reply}
            </p>
          </div>
        </DeviceShell>
      </div>

      {/* the two alert cards firing in sequence */}
      <div className="lg:col-span-6 flex flex-col gap-3">
        {stages.map((s, i) => (
          <div
            key={s.title}
            className="rounded-xl px-5 py-4"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-soft)',
              borderLeft: '2px solid var(--accent)',
              opacity: seen ? 1 : 0,
              transform: seen ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity var(--dur-base) var(--ease-standard) ${400 + i * 450}ms, transform var(--dur-base) var(--ease-standard) ${400 + i * 450}ms`,
            }}
          >
            <div className="eyebrow eyebrow-accent mb-1.5">{s.title}</div>
            <p className="font-sans" style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
