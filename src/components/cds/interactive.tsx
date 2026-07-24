'use client'

import { useEffect, useRef, useState, CSSProperties } from 'react'
import { VoiceOrb } from './VoiceOrb'

/* ============================================================================
   The two genuinely interactive moments RC does not have (Level-Up §FWA):
   the five-voice morph and the 2 AM maintenance save.

   Both are VOICE-FIRST devices, not chat panels: the orb is always present and
   "speaking", a live equalizer runs, the status bar reads the state, and the
   companion's answer is a large spoken line — never a small grey chat bubble.
   This is the difference between "a chatbot" and "the Companion". Every state
   ships reduced-motion and no-JS variants.
   ========================================================================= */

const SERIF = 'var(--font-serif), Georgia, serif'
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const MONO = 'var(--font-mono), ui-monospace, monospace'
const CREAM = '#F2EEE6'

/** Device frame + inner screen, matching the tablet devices across the site. */
const FRAME: CSSProperties = {
  background: 'var(--device-frame)',
  borderRadius: 'var(--device-radius)',
  padding: 'var(--bezel)',
  border: '1px solid rgba(251,248,242,0.08)',
  // Copper glow — warm halo off the device (RC device treatment).
  boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85), 0 0 100px -12px rgba(200,106,58,0.26), 0 0 0 1px rgba(200,106,58,0.12)',
}
const SCREEN: CSSProperties = {
  borderRadius: 'calc(var(--device-radius) - var(--bezel))',
  background: 'linear-gradient(168deg, #191410 0%, #12100e 60%, #0f0d0c 100%)',
}

/** Status bar: property (left, live dot) + state (right, e.g. SPEAKING). */
function DeviceStatus({ property, state }: { property: string; state?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-4">
      <span
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{ border: '1px solid var(--accent-hairline)', color: 'var(--accent)', fontSize: 9, fontFamily: MONO, letterSpacing: '.14em', textTransform: 'uppercase', minWidth: 0 }}
      >
        <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', flexShrink: 0, animation: 'pc-dot-pulse 2s ease-in-out infinite' }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{property}</span>
      </span>
      {state && (
        <span className="inline-flex items-center gap-1.5 flex-shrink-0" style={{ fontSize: 9, fontFamily: MONO, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
          {state}
        </span>
      )}
    </div>
  )
}

/** The guest's spoken line — right-aligned, prefixed by a small static waveform
 *  so it reads as something said aloud rather than typed. */
function GuestAsk({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-end gap-2.5 px-5 pt-5">
      <span aria-hidden className="flex items-center gap-[3px] flex-shrink-0" style={{ opacity: 0.5 }}>
        {[7, 12, 5, 10, 6].map((h, i) => (
          <span key={i} style={{ width: 2, height: h, borderRadius: 2, background: 'var(--text-faint)' }} />
        ))}
      </span>
      <p
        className="rounded-2xl px-4 py-2.5"
        style={{ background: 'rgba(251,248,242,0.06)', color: 'var(--text)', fontFamily: SANS, fontSize: 'clamp(13px,1.15vw,15px)', lineHeight: 1.45, maxWidth: '76%', width: 'fit-content' }}
      >
        {text}
      </p>
    </div>
  )
}

/** The companion voicing the answer: the orb + live equalizer beside a large
 *  spoken reply. `tag`/`tone` name the current voice when morphing. */
function CompanionAnswer({
  reply,
  tag,
  tone,
  fading,
}: {
  reply: string
  tag?: string
  tone?: string
  fading?: boolean
}) {
  return (
    <div className="flex items-start gap-4 px-5 pb-6 pt-5 sm:gap-5">
      <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 'clamp(52px,7vw,66px)' }}>
        <VoiceOrb state="speaking" size="clamp(48px,6.4vw,64px)" showMic />
        <span className="v5-eq" aria-hidden>
          <i /><i /><i /><i /><i />
        </span>
      </div>
      <div className="flex-1 min-w-0" style={{ opacity: fading ? 0 : 1, transition: 'opacity var(--dur-slow) var(--ease-emphasis)' }}>
        {tone && (
          <div className="mb-2.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {tag} · {tone}
          </div>
        )}
        <p style={{ fontFamily: SERIF, fontWeight: 480, fontSize: 'clamp(16.5px,1.75vw,22px)', lineHeight: 1.42, color: CREAM, textWrap: 'balance' } as CSSProperties}>
          {reply}
        </p>
      </div>
    </div>
  )
}

/** Legacy shell kept for the (currently unused) tabbed walkthrough below. */
function DeviceShell({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 460, ...FRAME }}>
      <div className="relative overflow-hidden" style={{ ...SCREEN, minHeight: 300 }}>
        {label && (
          <div className="px-5 pt-5">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ border: '1px solid var(--accent-hairline)', color: 'var(--accent)', fontSize: 9 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', animation: 'pc-dot-pulse 2s ease-in-out infinite' }} />
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
 * Selecting a voice cross-fades the SAME guest reply into that tone; the orb
 * speaks it and the tone is named, so the point ("it sounds like your hotel")
 * is shown, not just told.
 */
export function VoiceMorph({
  voices,
  guestQuestion,
  deviceLabel,
  statusLabel = 'Speaking',
  voiceTag = 'Voice',
  hint,
}: {
  voices: ReadonlyArray<{ name: string; desc: string; reply: string }>
  guestQuestion: string
  deviceLabel: string
  statusLabel?: string
  voiceTag?: string
  hint?: string
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
                style={{ borderTop: '1px solid var(--border-soft)', borderLeft: `2px solid ${on ? 'var(--accent)' : 'transparent'}`, paddingLeft: 16, minHeight: 44 }}
              >
                <div className="font-serif" style={{ fontSize: '1.15rem', fontWeight: 530, color: on ? 'var(--text)' : 'var(--text-dim)' }}>
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
        <div className="relative mx-auto w-full" style={{ maxWidth: 640, ...FRAME }}>
          <div className="relative overflow-hidden flex flex-col" style={{ ...SCREEN, minHeight: 340 }}>
            <DeviceStatus property={deviceLabel} state={statusLabel} />
            <GuestAsk text={guestQuestion} />
            <div className="mt-auto">
              <CompanionAnswer reply={voices[active].reply} tag={voiceTag} tone={voices[active].name} fading={fading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- TwoStageAlert */
/**
 * The 2 AM maintenance save: a guest reports an issue by voice; the Companion
 * answers and opens a tracked request that escalates on its own. The right
 * column is that request as a live ticket — a header, a status, and the stages
 * firing down a timeline — so "tracked from creation to completion" is an
 * artifact on screen, not a claim.
 */
export function TwoStageAlert({
  guest,
  reply,
  stages,
  deviceLabel,
  ticketTag = 'Request',
  ticketStatus = 'Open',
}: {
  guest: string
  reply: string
  stages: ReadonlyArray<{ title: string; body: string }>
  deviceLabel: string
  ticketTag?: string
  ticketStatus?: string
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
        ? new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && show(), { rootMargin: '0px 0px -10% 0px' })
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
      {/* the voice exchange */}
      <div className="lg:col-span-6">
        <div className="relative mx-auto w-full" style={{ maxWidth: 560, ...FRAME }}>
          <div className="relative overflow-hidden flex flex-col" style={{ ...SCREEN, minHeight: 340 }}>
            <DeviceStatus property={deviceLabel} state={ticketStatus} />
            <GuestAsk text={guest} />
            <div className="mt-auto">
              <CompanionAnswer reply={reply} />
            </div>
          </div>
        </div>
      </div>

      {/* the tracked request — a live ticket, stages firing down a timeline */}
      <div className="lg:col-span-6">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-soft)' }}>
          <div className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ borderBottom: '1px solid var(--border-soft)', background: 'rgba(200,106,58,0.05)' }}>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>{ticketTag}</span>
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)', animation: 'pc-dot-pulse 2s ease-in-out infinite' }} />
              {ticketStatus}
            </span>
          </div>

          <div className="px-5 py-5">
            {stages.map((s, i) => {
              const last = i === stages.length - 1
              return (
                <div
                  key={s.title}
                  className="relative pl-7"
                  style={{
                    paddingBottom: last ? 0 : 20,
                    opacity: seen ? 1 : 0,
                    transform: seen ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity var(--dur-base) var(--ease-standard) ${400 + i * 450}ms, transform var(--dur-base) var(--ease-standard) ${400 + i * 450}ms`,
                  }}
                >
                  {/* connecting timeline line */}
                  {!last && <span aria-hidden style={{ position: 'absolute', left: 5, top: 14, bottom: 0, width: 1, background: 'var(--border-soft)' }} />}
                  {/* status node */}
                  <span aria-hidden style={{ position: 'absolute', left: 0, top: 2, width: 11, height: 11, borderRadius: 999, border: '2px solid var(--accent)', background: 'var(--device-frame, #12100e)', boxShadow: '0 0 0 3px rgba(200,106,58,0.12)' }} />
                  <div className="eyebrow eyebrow-accent mb-1.5">{s.title}</div>
                  <p className="font-sans" style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>
                    {s.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------- TabbedDeviceWalkthrough */
/**
 * "Every conversation becomes action" — PC's tabbed panel re-skinned.
 * Retained for reference; not currently mounted.
 */
export function TabbedDeviceWalkthrough({
  tabs,
  deviceLabel,
}: {
  tabs: ReadonlyArray<{ label: string; guest: string; reply: string; outcome?: string }>
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
              style={{ minHeight: 44, fontSize: 14, background: on ? 'var(--accent)' : 'transparent', border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`, color: on ? '#1a1207' : 'var(--text-dim)', fontWeight: on ? 600 : 400 }}
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
              <p className="rounded-2xl px-4 py-3 ml-auto" style={{ background: 'rgba(251,248,242,0.06)', color: 'var(--text)', fontSize: 14, maxWidth: '85%', width: 'fit-content' }}>
                {t.guest}
              </p>
              <p className="mt-3 rounded-2xl px-4 py-3.5" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-hairline)', color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>
                {t.reply}
              </p>
            </div>
          </DeviceShell>
        </div>
        <div className="lg:col-span-5">
          {t.outcome && (
            <p className="font-serif" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 530, lineHeight: 1.25, color: 'var(--accent)', opacity: fading ? 0 : 1, transition: 'opacity var(--dur-slow) var(--ease-emphasis)' }}>
              {t.outcome}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
