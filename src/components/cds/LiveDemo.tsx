'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy } from '@/lib/i18n/useCopy'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { useCompanion, type Turn } from '@/lib/demo/useCompanion'
import { demoV3Copy } from '@/lib/i18n/marketing/demoV3'
import { useSpeech } from '@/lib/demo/useSpeech'
import { VoiceOrbControl, type OrbState } from './VoiceOrb'
import { DemoCard } from './DemoCards'

/**
 * The working, embedded demo (Live Demo · D5).
 *
 * This is the real thing, not a mockup: it speaks to the repo's existing
 * `/api/preview-chat` route, it listens through the Web Speech API, and it
 * answers with the same picture cards the static tablet renders.
 *
 * The orb IS the control, exactly as on Restaurant Companion's Features page:
 * it sits centred in the device's upper area, always visible, and pressing it
 * starts and stops listening. The text field beneath it is the secondary path,
 * so voice is the headline but never a prerequisite.
 *
 * The orb is full size while the demo is at rest and settles smaller once the
 * conversation starts, so the answer cards have room to bloom below it without
 * the orb ever leaving the screen.
 *
 * Three states, as everywhere else in this build:
 *  - motion: orb animates per real status, replies stream token by token
 *  - prefers-reduced-motion: static glow, no ripples, no waveform, no orb
 *    resize easing; replies still stream (streaming is information, not
 *    decoration) and nothing is spoken unprompted
 *  - no-JS: a scripted transcript with real image cards renders in <noscript>,
 *    so the section is never an empty box
 */

const SCRIPTED: Array<{ q: 'beach' | 'roomservice' | 'upgrade' }> = [
  { q: 'beach' },
  { q: 'roomservice' },
  { q: 'upgrade' },
]

function StatePill({ label }: { label: string }) {
  return (
    <span
      className="eyebrow"
      style={{
        fontSize: 8.5,
        color: 'var(--accent)',
        border: '1px solid var(--accent-hairline)',
        borderRadius: 999,
        padding: '3px 8px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function GuestBubble({ text }: { text: string }) {
  return (
    <p
      className="rounded-2xl px-3.5 py-2.5 ml-auto"
      style={{
        background: 'rgba(251,248,242,0.07)',
        color: 'var(--text)',
        fontSize: 13.5,
        lineHeight: 1.5,
        width: 'fit-content',
        maxWidth: '86%',
      }}
    >
      {text}
    </p>
  )
}

function CompanionBubble({
  turn,
  confirmLabel,
  onConfirm,
  mockNote,
}: {
  turn: Turn
  confirmLabel?: string
  onConfirm?: () => void
  mockNote: string
}) {
  return (
    <div className="flex flex-col gap-2" style={{ maxWidth: '92%' }}>
      {(turn.text || turn.streaming) && (
        <p
          className="rounded-2xl px-3.5 py-2.5"
          style={{
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent-hairline)',
            color: 'var(--text)',
            fontSize: 13.5,
            lineHeight: 1.55,
            width: 'fit-content',
          }}
        >
          {turn.text}
          {turn.streaming && (
            <span className="demo-caret" aria-hidden="true">
              ▍
            </span>
          )}
        </p>
      )}

      {turn.card && !turn.streaming && (
        <DemoCard
          id={turn.card}
          confirmed={
            turn.card === 'confirmation' && turn.confirm
              ? { ...turn.confirm, note: mockNote }
              : undefined
          }
        />
      )}

      {turn.action && !turn.actionDone && !turn.streaming && confirmLabel && (
        <button
          type="button"
          onClick={onConfirm}
          className="font-sans self-start"
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
          {confirmLabel}
        </button>
      )}
    </div>
  )
}

export function LiveDemo({
  compact = false,
  autoFocus = false,
  className = '',
}: {
  /** Smaller transcript for in-hero and mobile placements. */
  compact?: boolean
  autoFocus?: boolean
  className?: string
}) {
  const { lang } = useLang()
  const c = useCopy(liveDemoCopy)
  const screens = useCopy(deviceScreens)
  const v3 = useCopy(demoV3Copy)

  const [draft, setDraft] = useState('')
  const [muted, setMuted] = useState(true)

  const stageRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  /** False once the guest scrolls up to re-read something. */
  const stick = useRef(true)

  const { turns, busy, send, sendScripted, reset, confirmAction } = useCompanion(lang, c.greeting)

  const speech = useSpeech({
    lang,
    muted,
    onFinal: (text) => {
      // A completed utterance is a sent message — the guest should not have to
      // press anything after speaking.
      void send(text, { onReply: (reply) => speech.speak(reply) })
    },
  })

  const orbState: OrbState = speech.listening
    ? 'listening'
    : busy
      ? 'thinking'
      : speech.speaking
        ? 'speaking'
        : 'idle'

  const submit = useCallback(
    (text: string) => {
      const q = text.trim()
      if (!q) return
      setDraft('')
      // v3 Phase 4 D3: the day-planner is a fully scripted scenario — the
      // deck defines it verbatim, so it never goes to the model.
      if (q === v3.scenarioB.chip) {
        sendScripted(q, { card: 'dayplan' })
        return
      }
      void send(q, { onReply: (reply) => speech.speak(reply) })
    },
    [send, sendScripted, speech, v3.scenarioB.chip]
  )

  /**
   * Keep the newest answer in view.
   *
   * Scrolling once when `turns` changes is not enough: the card mounts with an
   * entry animation and its photographs load afterwards, so the content grows
   * *after* the scroll and the card ends up below the fold — which is exactly
   * where it must not be, since the card is the answer.
   *
   * Fail-open, like the Reveal primitive: a ResizeObserver is the good path,
   * but observers do not fire in every embedded webview (this repo already hit
   * the same thing with IntersectionObserver), so a short bounded polling loop
   * after each turn guarantees the pin lands even where observers are inert.
   * scrollTop is assigned directly because smooth scrolling is a silent no-op
   * wherever transitions do not tick.
   */
  useEffect(() => {
    const el = logRef.current
    if (!el) return

    let selfScrolls = 0

    const pin = () => {
      if (!stick.current) return
      const target = el.scrollHeight - el.clientHeight
      if (target <= 0 || Math.abs(el.scrollTop - target) < 1) return
      selfScrolls++
      el.scrollTop = target
    }

    // Self-caused scrolls are counted rather than inferred from wheel/touch:
    // a tap in mobile emulation fires touchmove, which made the pin's own
    // scroll look like the guest scrolling away and unpinned it for good.
    const onScroll = () => {
      if (selfScrolls > 0) {
        selfScrolls--
        return
      }
      stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    let ro: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined' && contentRef.current) {
      ro = new ResizeObserver(pin)
      ro.observe(contentRef.current)
    }

    // Bounded catch-up: covers streamed tokens, the card mounting and its
    // images decoding, then stops so nothing runs for the life of the page.
    pin()
    const iv = window.setInterval(pin, 90)
    const stop = window.setTimeout(() => window.clearInterval(iv), 2000)

    return () => {
      ro?.disconnect()
      el.removeEventListener('scroll', onScroll)
      window.clearInterval(iv)
      window.clearTimeout(stop)
    }
  }, [turns.length])

  // A new question means the guest is following along again.
  useEffect(() => {
    stick.current = true
  }, [turns.length])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  // "At rest" = nothing asked yet. The orb owns the device; once the
  // conversation starts it settles so the cards have room below it.
  const atRest = turns.length <= 1 && !busy
  const showSuggestions = atRest

  // RC's ladder: 440px outer ring / 300px inner on desktop, scaled down on
  // small screens but never below a 220px outer ring at 360px.
  /**
   * Orb size in plain pixels, derived from the device's own width.
   *
   * This was a CSS `clamp()` per state, but transitioning `width` between two
   * clamp() expressions does not resolve in every engine — the computed width
   * stayed at the previous state's value indefinitely, so the orb never
   * settled. Measuring the stage and animating between two numbers is both
   * predictable and correctly sized to the device rather than the viewport,
   * which is what actually matters inside a fixed-width tablet.
   */
  const [stageW, setStageW] = useState(0)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setStageW(e.contentRect.width))
    ro.observe(el)
    setStageW(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  // RC's ladder: a 440px outer ring on desktop, never below ~220px on a 360px
  // screen. The settled size stays well under that so a whole answer card fits.
  const heroMax = compact ? 260 : 440
  const settledMax = compact ? 132 : 160
  const orbSize = stageW
    ? atRest
      ? Math.max(220, Math.min(heroMax, Math.round(stageW)))
      : Math.max(112, Math.min(settledMax, Math.round(stageW * 0.42)))
    : compact
      ? 220
      : 240

  const confirmedFor = useMemo(
    () => ({
      upgrade: { title: c.confirmed.upgrade, meta: c.confirmedMeta.upgrade },
      roomservice: { title: c.confirmed.roomservice, meta: c.confirmedMeta.roomservice },
      spa: { title: c.confirmed.spa, meta: c.confirmedMeta.spa },
    }),
    [c]
  )

  return (
    <div className={className}>
      <div
        className="flex flex-col overflow-hidden"
        data-device-ui=""
        style={{
          background: 'var(--device-frame)',
          borderRadius: 'var(--device-radius)',
          padding: 'var(--bezel)',
          border: '1px solid rgba(251,248,242,0.08)',
          boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85), 0 0 100px -12px rgba(200,106,58,0.26), 0 0 0 1px rgba(200,106,58,0.12)',
        }}
      >
        <div
          className="flex flex-col overflow-hidden"
          style={{
            borderRadius: 'calc(var(--device-radius) - var(--bezel))',
            background: 'linear-gradient(168deg, #191410 0%, #12100e 58%, #0f0d0c 100%)',
            height: compact ? 540 : 640,
          }}
        >
          {/* ---------------------------------------------------- status bar */}
          <div
            className="flex items-center gap-2 px-3.5"
            style={{ height: 40, borderBottom: '1px solid rgba(251,248,242,0.07)' }}
          >
            <span className="eyebrow flex-1 min-w-0 truncate" style={{ fontSize: 8.5 }}>
              {screens.property}
            </span>
            <StatePill label={c.states[orbState]} />
            {speech.canSpeak && (
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-pressed={!muted}
                aria-label={muted ? c.unmuted : c.muted}
                className="grid place-items-center"
                style={{ width: 30, height: 30, color: muted ? 'var(--text-faint)' : 'var(--accent)' }}
              >
                {muted ? '🔇' : '🔊'}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                speech.cancel()
                speech.stop()
                reset()
              }}
              aria-label={c.reset}
              className="grid place-items-center"
              style={{ width: 30, height: 30, color: 'var(--text-faint)', fontSize: 13 }}
            >
              ↺
            </button>
          </div>

          {/* ------------------------------------------- the orb: the control */}
          <div
            ref={stageRef}
            className="flex items-center justify-center px-4"
            style={{
              flex: atRest ? '1 1 auto' : '0 0 auto',
              paddingTop: atRest ? 0 : 12,
              paddingBottom: atRest ? 0 : 2,
            }}
          >
            <VoiceOrbControl
              state={orbState}
              size={orbSize}
              label={c.orbStates[orbState]}
              ariaLabel={speech.listening ? c.orbActionStop : c.orbAction}
              pressed={speech.listening}
              disabled={!speech.canListen}
              onToggle={() => (speech.listening ? speech.stop() : speech.start())}
            />
          </div>

          {/* ------------------------------- transcript + cards, beneath the orb */}
          <div
            ref={logRef}
            className="overflow-y-auto px-3.5 flex flex-col gap-3"
            style={{
              flex: atRest ? '0 0 auto' : '1 1 auto',
              minHeight: 0,
              paddingTop: atRest ? 0 : 4,
              paddingBottom: atRest ? 0 : 12,
            }}
            aria-live="polite"
            aria-atomic="false"
          >
            {/* Observed for growth so the newest card is always scrolled into view. */}
            <div ref={contentRef} className="flex flex-col gap-3">
            {/* At rest the greeting lives under the orb label, not as a bubble.
                v3 Phase 4 D2: the recognition line greets Maya by name first. */}
            {atRest ? (
              <div className="text-center px-2 pb-3">
                <p className="font-serif" style={{ fontSize: 14.5, fontWeight: 530, color: 'var(--champagne)' }}>
                  {v3.greeting}
                </p>
                <p className="font-sans mt-1.5" style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-faint)' }}>
                  {turns[0]?.text}
                </p>
              </div>
            ) : (
              turns.map((t) =>
                t.role === 'guest' ? (
                  <GuestBubble key={t.id} text={t.text} />
                ) : (
                  <CompanionBubble
                    key={t.id}
                    turn={t}
                    mockNote={c.mockNote}
                    confirmLabel={t.action ? c.confirm[t.action] : undefined}
                    onConfirm={
                      t.action ? () => confirmAction(t.id, confirmedFor[t.action!]) : undefined
                    }
                  />
                )
              )
            )}

            {speech.interim && (
              <p
                className="rounded-2xl px-3.5 py-2.5 ml-auto"
                style={{
                  background: 'rgba(251,248,242,0.04)',
                  color: 'var(--text-faint)',
                  fontSize: 13.5,
                  fontStyle: 'italic',
                  width: 'fit-content',
                  maxWidth: '86%',
                }}
              >
                {speech.interim}
              </p>
            )}
            </div>
          </div>

          {/* ------------------------------------------- chips, above the field */}
          {showSuggestions && (
            <div
              className="flex gap-2 px-3.5 pb-2.5 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {[...c.suggestions, v3.scenarioB.chip].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="rounded-full px-3.5 flex-shrink-0 transition-colors"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-dim)',
                    fontSize: 12.5,
                    minHeight: 40,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* ------------------------------------- persistent chrome: mic + chat */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit(draft)
            }}
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ borderTop: '1px solid rgba(251,248,242,0.07)' }}
          >
            {/* No mic icon here: the orb above is the voice control, and two
                competing mic affordances would only split the interaction. */}
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={c.placeholder}
              aria-label={c.placeholder}
              maxLength={500}
              className="flex-1 min-w-0 px-3.5 font-sans"
              style={{
                background: 'var(--surface-3)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                height: 44,
                color: 'var(--text)',
                fontSize: 13.5,
              }}
            />

            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label={c.send}
              className="grid place-items-center rounded-full flex-shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'var(--accent)',
                color: '#1a1207',
                opacity: busy || !draft.trim() ? 0.5 : 1,
              }}
            >
              ↑
            </button>
          </form>
        </div>
      </div>

      <p className="eyebrow mt-3" style={{ fontSize: 8.5 }}>
        {speech.canListen ? c.disclosure : `${c.disclosure} · ${c.voiceUnsupported}`}
      </p>

      {/* ------------------------------------------------ no-JS: scripted view */}
      <noscript>
        <div className="flex flex-col gap-3 mt-4">
          {SCRIPTED.map(({ q }) => (
            <div key={q} className="flex flex-col gap-2">
              <p style={{ fontSize: 13.5, color: 'var(--text)' }}>{screens.screens[q].ask}</p>
              <DemoCard id={q === 'roomservice' ? 'dish-grid' : q === 'upgrade' ? 'upgrade' : 'beach'} />
            </div>
          ))}
        </div>
      </noscript>
    </div>
  )
}
