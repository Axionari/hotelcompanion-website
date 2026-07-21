'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy } from '@/lib/i18n/useCopy'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { useCompanion, type Turn } from '@/lib/demo/useCompanion'
import { useSpeech } from '@/lib/demo/useSpeech'
import { VoiceOrb, type OrbState } from './VoiceOrb'
import { DemoCard } from './DemoCards'

/**
 * The working, embedded demo (Live Demo · D5).
 *
 * This is the real thing, not a mockup: it speaks to the repo's existing
 * `/api/preview-chat` route, it listens through the Web Speech API, and it
 * answers with the same picture cards the static tablet renders. The mic is
 * always visible and text chat is always available beside it — voice is an
 * addition to the demo, never a prerequisite for it.
 *
 * Three states, as everywhere else in this build:
 *  - motion: orb animates per real status, replies stream token by token
 *  - prefers-reduced-motion: orb still, no auto-scroll easing, replies still stream
 *    (streaming is information, not decoration) and nothing is spoken unprompted
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
  confirmedCopy,
}: {
  turn: Turn
  confirmLabel?: string
  onConfirm?: () => void
  mockNote: string
  confirmedCopy?: { title: string; meta: string }
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
            turn.card === 'confirmation' && confirmedCopy
              ? { ...confirmedCopy, note: mockNote }
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

  const [draft, setDraft] = useState('')
  const [muted, setMuted] = useState(true)
  const [reduce, setReduce] = useState(false)

  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { turns, busy, send, reset, confirmAction } = useCompanion(lang, c.greeting)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

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
      void send(q, { onReply: (reply) => speech.speak(reply) })
    },
    [send, speech]
  )

  useEffect(() => {
    const el = logRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [turns, reduce])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const showSuggestions = turns.length <= 1 && !busy

  const confirmedFor = useMemo(
    () => ({
      upgrade: { title: c.confirmed.upgrade, meta: c.confirmedMeta.upgrade },
      roomservice: { title: c.confirmed.roomservice, meta: c.confirmedMeta.roomservice },
      spa: { title: c.confirmed.spa, meta: c.confirmedMeta.spa },
    }),
    [c]
  )

  /** Confirmation copy belongs to the action that produced it. */
  const lastAction = useRef<'upgrade' | 'roomservice' | 'spa'>('upgrade')

  return (
    <div className={className}>
      <div
        className="flex flex-col overflow-hidden"
        style={{
          background: 'var(--device-frame)',
          borderRadius: 'var(--device-radius)',
          padding: 'var(--bezel)',
          border: '1px solid rgba(251,248,242,0.08)',
          boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(200,106,58,0.05)',
        }}
      >
        <div
          className="flex flex-col overflow-hidden"
          style={{
            borderRadius: 'calc(var(--device-radius) - var(--bezel))',
            background: 'linear-gradient(168deg, #191410 0%, #12100e 58%, #0f0d0c 100%)',
            height: compact ? 420 : 540,
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

          {/* --------------------------------------------------- transcript */}
          <div
            ref={logRef}
            className="flex-1 overflow-y-auto px-3.5 py-3.5 flex flex-col gap-3"
            aria-live="polite"
            aria-atomic="false"
          >
            {turns.map((t) =>
              t.role === 'guest' ? (
                <GuestBubble key={t.id} text={t.text} />
              ) : (
                <CompanionBubble
                  key={t.id}
                  turn={t}
                  mockNote={c.mockNote}
                  confirmedCopy={confirmedFor[lastAction.current]}
                  confirmLabel={t.action ? c.confirm[t.action] : undefined}
                  onConfirm={
                    t.action
                      ? () => {
                          lastAction.current = t.action!
                          confirmAction(t.id, c.confirmed[t.action!])
                        }
                      : undefined
                  }
                />
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

            {showSuggestions && (
              <div className="flex flex-col gap-2 mt-1">
                {c.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="text-left rounded-2xl px-3.5 py-2.5 transition-colors"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--text-dim)',
                      fontSize: 13,
                      minHeight: 44,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ------------------------------------- persistent chrome: mic + chat */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit(draft)
            }}
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ borderTop: '1px solid rgba(251,248,242,0.07)' }}
          >
            <button
              type="button"
              onClick={() => (speech.listening ? speech.stop() : speech.start())}
              disabled={!speech.canListen}
              aria-pressed={speech.listening}
              aria-label={speech.listening ? c.micStop : c.mic}
              title={speech.canListen ? c.mic : c.voiceUnsupported}
              className="grid place-items-center rounded-full flex-shrink-0"
              style={{
                width: 44,
                height: 44,
                border: '1px solid var(--border)',
                opacity: speech.canListen ? 1 : 0.45,
              }}
            >
              <VoiceOrb state={orbState} size={34} showMic />
            </button>

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
