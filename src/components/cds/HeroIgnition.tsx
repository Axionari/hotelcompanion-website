'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy } from '@/lib/i18n/useCopy'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { useCompanion } from '@/lib/demo/useCompanion'
import { useSpeech } from '@/lib/demo/useSpeech'
import { VoiceOrbControl, type OrbState } from './VoiceOrb'
import { DemoCard } from './DemoCards'
import { openLiveDemo } from './LiveDemoModal'

/**
 * The Ignition — the Home hero's right-side anchor (Hero · HI-1…HI-4).
 *
 * This is the same orb, the same runtime and the same card vocabulary as the
 * live demo: the hero orb and the demo mic are one object, not two. Pressing it
 * starts real speech recognition, the states are the genuine Web Speech states,
 * and answers resolve into image cards directly beneath it.
 *
 * Motion is CSS-only and delayed, so the orb holds its unlit state while the
 * H1 paints and cannot delay the LCP element. Space is reserved by a static
 * clamp, so igniting causes no layout shift.
 *
 * The hold is produced by `animation-fill-mode: backwards`, which means the orb
 * sits at 28% opacity until the animation runs. Where animations never tick —
 * some embedded webviews, throttled/background tabs — that hold would be
 * permanent, and a hero that never lights is broken rather than merely
 * unadorned. So a deadline forces the lit resting state, exactly the fail-open
 * discipline the Reveal primitive uses.
 *
 * Three states:
 *  - motion: held dark ~1s, then core bloom + one outward ring + waveform
 *    flicker, settling to rest
 *  - prefers-reduced-motion: the composed lit still, no motion, no breath
 *  - no-JS: the same composed still renders (the orb is server-rendered); only
 *    the voice control is inert, and the headline's CTAs still work
 */
export function HeroIgnition() {
  const { lang } = useLang()
  const c = useCopy(liveDemoCopy)

  const wrapRef = useRef<HTMLDivElement>(null)
  const [ignited, setIgnited] = useState(false)

  // Deadline = delay (950ms) + duration (1500ms) + buffer. After this the
  // resting state is asserted regardless of whether the animation ever ran.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIgnited(true)
      return
    }
    const t = window.setTimeout(() => setIgnited(true), 2700)
    return () => window.clearTimeout(t)
  }, [])
  const { turns, busy, send, confirmAction } = useCompanion(lang, c.greeting)

  const speech = useSpeech({
    lang,
    muted: false,
    onFinal: (text) => void send(text, { onReply: (reply) => speech.speak(reply) }),
  })

  const orbState: OrbState = speech.listening
    ? 'listening'
    : busy
      ? 'thinking'
      : speech.speaking
        ? 'speaking'
        : 'idle'

  /**
   * The guarded cinematic breath (HI-4).
   *
   * Only above 1024px, where the orb has its own column and real negative space
   * to bloom into — on narrower screens it sits above or behind the headline,
   * which is precisely the case the brief says to cut. Peaks on the first small
   * scroll and is fully receded by ~340px, as section 01 arrives.
   */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const allowed =
      window.matchMedia('(min-width: 1024px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!allowed) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const p = Math.min(1, Math.max(0, window.scrollY / 340))
        // Rises then falls: one breath, not a scroll-linked zoom.
        el.style.setProperty('--breath', String(Math.sin(p * Math.PI)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const confirmedFor = useMemo(
    () => ({
      upgrade: { title: c.confirmed.upgrade, meta: c.confirmedMeta.upgrade },
      roomservice: { title: c.confirmed.roomservice, meta: c.confirmedMeta.roomservice },
      spa: { title: c.confirmed.spa, meta: c.confirmedMeta.spa },
    }),
    [c]
  )

  // Only the newest answer surfaces in the hero; the full transcript lives in
  // the demo surface, which the link below opens.
  const latest = [...turns].reverse().find((t) => t.role === 'companion' && t.id !== 0)
  const engaged = Boolean(latest) || busy || speech.listening

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={wrapRef}
        className="ignition ignition-breath"
        data-ignited={ignited ? 'true' : undefined}
      >
        <span className="ignition-bloom" aria-hidden="true" />
        <span className="ignition-bleed" aria-hidden="true" />
        <span className="ign-pulse" aria-hidden="true" />

        <div className="ign-core">
          <VoiceOrbControl
            state={orbState}
            size="100%"
            label={c.orbStates[orbState]}
            ariaLabel={speech.listening ? c.orbActionStop : c.orbAction}
            pressed={speech.listening}
            disabled={!speech.canListen}
            onToggle={() => (speech.listening ? speech.stop() : speech.start())}
          />
        </div>
      </div>

      {/* The answer blooms beneath the orb — same cards as the demo surface. */}
      {engaged && latest && (
        <div className="mt-6 w-full" style={{ maxWidth: 340 }}>
          {latest.text && (
            <p
              className="font-sans mb-2.5"
              style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-dim)' }}
            >
              {latest.text}
            </p>
          )}
          {latest.card && !latest.streaming && (
            <DemoCard
              id={latest.card}
              confirmed={
                latest.card === 'confirmation' && latest.confirm
                  ? { ...latest.confirm, note: c.mockNote }
                  : undefined
              }
            />
          )}
          {latest.action && !latest.actionDone && !latest.streaming && (
            <button
              type="button"
              onClick={() => confirmAction(latest.id, confirmedFor[latest.action!])}
              className="font-sans mt-2.5"
              style={{
                background: 'var(--accent)',
                color: '#1a1207',
                borderRadius: 999,
                padding: '0 18px',
                minHeight: 40,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {c.confirm[latest.action]}
            </button>
          )}
        </div>
      )}

      {/* Typing is always reachable, including where the mic is unavailable. */}
      <button
        type="button"
        onClick={openLiveDemo}
        className="font-sans mt-5 transition-colors hover:text-[#d4824f]"
        style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 500, minHeight: 44 }}
      >
        {speech.canListen ? `${c.open} →` : `${c.voiceUnsupported} →`}
      </button>
    </div>
  )
}
