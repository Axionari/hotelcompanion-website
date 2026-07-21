'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { VoiceOrb, type OrbState } from './VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { launcherCopy } from '@/lib/i18n/marketing/companionLauncher'

type Msg = { role: 'guest' | 'companion'; text: string }

/**
 * The persistent Companion launcher — always visible, every breakpoint.
 *
 * Restaurant Companion shows its orb only inside one section of /features.
 * Here the mic is a standing affordance on every page and every surface, and
 * it opens a real chat panel (voice orb + text input), so the product's core
 * promise is reachable at any moment rather than only where a section happens
 * to sit. That is the "past RC" part.
 *
 * States mirror RC's: idle → listening → thinking → speaking.
 *
 * Three states as always:
 *  - motion: orb animates per state, replies stream in
 *  - prefers-reduced-motion: no orb animation, no typing delay — replies appear
 *  - no-JS: nothing renders (it is a progressive enhancement; every page already
 *    carries a real Book-a-Demo CTA without it)
 *
 * Responses are a scripted sample of the same exchanges shown inside the tablet,
 * clearly labelled as such — this is a marketing demo, not a live model.
 */
export function CompanionLauncher() {
  const c = useCopy(launcherCopy)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<OrbState>('idle')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [draft, setDraft] = useState('')
  const [reduce, setReduce] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => timers.current.forEach((t) => window.clearTimeout(t))
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setState('idle')
    btnRef.current?.focus()
  }, [])

  // Esc + focus trap while the panel is open
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      )
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('input')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [msgs, reduce])

  function reply(question: string) {
    const hit = c.script.find((s) => s.q.toLowerCase() === question.toLowerCase())
    const answer = hit?.a ?? c.fallback
    setMsgs((m) => [...m, { role: 'guest', text: question }])

    if (reduce) {
      setMsgs((m) => [...m, { role: 'companion', text: answer }])
      return
    }

    setState('thinking')
    timers.current.push(
      window.setTimeout(() => {
        setState('speaking')
        setMsgs((m) => [...m, { role: 'companion', text: answer }])
      }, 900),
      window.setTimeout(() => setState('idle'), 900 + Math.min(4200, answer.length * 28))
    )
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = draft.trim()
    if (!q) return
    setDraft('')
    reply(q)
  }

  return (
    <>
      {/* The standing affordance — always visible, above the mobile CTA bar */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? c.close : c.open}
        className="fixed z-50 grid place-items-center rounded-full"
        style={{
          right: 'max(16px, env(safe-area-inset-right))',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--launcher-offset, 16px))',
          width: 64,
          height: 64,
          background: 'rgba(16,14,12,0.82)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-hairline)',
          boxShadow: '0 18px 44px -18px rgba(0,0,0,0.9)',
          transition: 'transform var(--dur-base) var(--ease-standard)',
        }}
      >
        <VoiceOrb state={open ? state : 'idle'} size={58} showMic />
      </button>

      {/* Chat panel — bottom sheet on mobile, docked card on desktop */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={c.title}
          className="fixed z-50 flex flex-col overflow-hidden"
          style={{
            right: 'max(16px, env(safe-area-inset-right))',
            left: 'auto',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--launcher-offset, 16px) + 76px)',
            width: 'min(380px, calc(100vw - 32px))',
            maxHeight: 'min(560px, calc(100dvh - 180px))',
            background: 'rgba(16,14,12,0.97)',
            backdropFilter: 'blur(18px)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            boxShadow: '0 30px 70px -24px rgba(0,0,0,0.9)',
          }}
        >
          {/* header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5"
            style={{ borderBottom: '1px solid var(--border-soft)' }}
          >
            <VoiceOrb state={state} size={38} showMic={false} />
            <div className="flex-1 min-w-0">
              <div className="font-serif" style={{ fontSize: 15, fontWeight: 530, color: 'var(--text)' }}>
                {c.title}
              </div>
              <div className="eyebrow" style={{ fontSize: 9 }}>
                {c.states[state]}
              </div>
            </div>
            <button onClick={close} aria-label={c.close} className="p-2" style={{ color: 'var(--text-faint)', minWidth: 44, minHeight: 44 }}>
              ✕
            </button>
          </div>

          {/* transcript */}
          <div ref={logRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5" aria-live="polite">
            {msgs.length === 0 && (
              <>
                <p className="eyebrow" style={{ fontSize: 9 }}>
                  {c.subtitle}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {c.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => reply(s)}
                      className="text-left rounded-2xl px-3.5 py-2.5 transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--text-dim)',
                        fontSize: 14,
                        minHeight: 44,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}

            {msgs.map((m, i) => (
              <p
                key={i}
                className="rounded-2xl px-3.5 py-2.5"
                style={
                  m.role === 'guest'
                    ? {
                        background: 'rgba(251,248,242,0.07)',
                        color: 'var(--text)',
                        fontSize: 14,
                        marginLeft: 'auto',
                        maxWidth: '85%',
                      }
                    : {
                        background: 'var(--accent-soft)',
                        border: '1px solid var(--accent-hairline)',
                        color: 'var(--text)',
                        fontSize: 14,
                        lineHeight: 1.55,
                        maxWidth: '92%',
                      }
                }
              >
                {m.text}
              </p>
            ))}
          </div>

          {/* input + CTA */}
          <form onSubmit={submit} className="px-3 pb-3 pt-2" style={{ borderTop: '1px solid var(--border-soft)' }}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setState((s) => (s === 'listening' ? 'idle' : 'listening'))}
                aria-label={c.states.listening}
                aria-pressed={state === 'listening'}
                className="grid place-items-center rounded-full flex-shrink-0"
                style={{ width: 44, height: 44, border: '1px solid var(--border)' }}
              >
                <VoiceOrb state={state === 'listening' ? 'listening' : 'idle'} size={34} showMic />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={c.inputPlaceholder}
                aria-label={c.inputPlaceholder}
                className="flex-1 px-3.5 font-sans"
                style={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  height: 44,
                  color: 'var(--text)',
                  fontSize: 14,
                }}
              />
              <button
                type="submit"
                aria-label={c.send}
                className="grid place-items-center rounded-full flex-shrink-0"
                style={{ width: 44, height: 44, background: 'var(--accent)', color: '#1a1207' }}
              >
                ↑
              </button>
            </div>
            <div className="flex items-center justify-between mt-2.5 px-1">
              <span className="eyebrow" style={{ fontSize: 8 }}>
                {c.demoNote}
              </span>
              <Link
                href="/demo"
                onClick={close}
                className="font-sans transition-colors hover:text-[#d4824f]"
                style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 500 }}
              >
                {c.cta} →
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
