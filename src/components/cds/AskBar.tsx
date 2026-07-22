'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { ReceiptCard } from './ReceiptCard'
import { MonoChip } from './MonoChip'
import { useCopy } from '@/lib/i18n/useCopy'
import { askBarCopy } from '@/lib/i18n/marketing/askBar'

/**
 * v3 AskBar (copy deck {#13}) — the page ends by being a conversation.
 * SCRIPTED ONLY: three suggestion chips with canned answers + receipts; free
 * text gets the polite fallback. No network calls, no LLM (brief: not in v3).
 *
 * Interaction: clicking/Enter-ing a chip "types" the question into the input
 * (~24ms/char), then renders the answer (speakable phrase in <strong>, G3) and
 * its ReceiptCard into an aria-live region. Reduced motion: instant text, no
 * pulsing dot. Chips are buttons (tabbable); the input submits on Enter.
 */

/** Renders the deck's **speakable phrase** markers as <strong> (G3).
    Shared with the demo cards (Phase 4 D1–D3). */
export function Speakable({ text }: { text: string }) {
  const parts = text.split('**')
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color: 'var(--text)', fontWeight: 600 }}>
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  )
}

export function AskBar({ className = '' }: { className?: string }) {
  const c = useCopy(askBarCopy)
  const [value, setValue] = useState('')
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [answerIdx, setAnswerIdx] = useState<number | null>(null)
  const [fallback, setFallback] = useState(false)
  const [reduce, setReduce] = useState(false)
  const typingTimer = useRef<number[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const timers = typingTimer.current
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  function clearTimers() {
    typingTimer.current.forEach((t) => window.clearTimeout(t))
    typingTimer.current = []
  }

  function playChip(i: number) {
    clearTimers()
    setFallback(false)
    setAnswerIdx(null)
    setActiveIdx(i)
    const q = c.items[i].chip
    if (reduce) {
      setValue(q)
      setAnswerIdx(i)
      return
    }
    setValue('')
    // Type the question character-by-character (~24ms/char), then answer.
    for (let n = 1; n <= q.length; n++) {
      typingTimer.current.push(window.setTimeout(() => setValue(q.slice(0, n)), 24 * n))
    }
    typingTimer.current.push(window.setTimeout(() => setAnswerIdx(i), 24 * q.length + 220))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const typed = value.trim()
    if (!typed) return
    const match = c.items.findIndex((it) => it.chip === typed)
    if (match >= 0) {
      setFallback(false)
      setActiveIdx(match)
      setAnswerIdx(match)
    } else {
      clearTimers()
      setActiveIdx(null)
      setAnswerIdx(null)
      setFallback(true)
    }
  }

  return (
    <div className={className} style={{ maxWidth: 720 }}>
      {/* Suggestion chips — plain buttons (aria-pressed marks the active one) */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        {c.items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => playChip(i)}
            aria-pressed={activeIdx === i}
            className="askbar-chip"
            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <MonoChip lowercase variant="on-dark" className="transition-colors">
              {it.chip}
            </MonoChip>
          </button>
        ))}
      </div>

      {/* The bar */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3"
        style={{
          background: 'color-mix(in srgb, var(--surface-1) 90%, transparent)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid var(--hairline)',
          borderRadius: 999,
          padding: '8px 10px 8px 20px',
        }}
      >
        <span aria-hidden="true" className={reduce ? '' : 'askbar-dot'} style={{
          width: 10, height: 10, borderRadius: 999, background: 'var(--accent)', flexShrink: 0,
        }} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={c.placeholder}
          aria-label={c.placeholder}
          className="font-sans flex-1"
          style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 15.5, minHeight: 40 }}
        />
        <button
          type="submit"
          aria-label={c.submitLabel}
          className="grid place-items-center transition-colors hover:bg-[#d4824f]"
          style={{
            width: 44, height: 44, borderRadius: 999, background: 'var(--accent)',
            color: 'var(--bg)', border: 'none', cursor: 'pointer', flexShrink: 0, fontSize: 18,
          }}
        >
          <span aria-hidden="true">↑</span>
        </button>
      </form>

      {/* Answer region — polite live region so SRs announce scripted replies */}
      <div aria-live="polite" role="region" aria-label={c.answerRegionLabel} className="mt-6" style={{ minHeight: 8 }}>
        {fallback && (
          <p className="font-sans" style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-dim)' }}>
            {c.fallback}
          </p>
        )}
        {answerIdx !== null && (
          <div>
            <p className="font-sans" style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '58ch' }}>
              <Speakable text={c.items[answerIdx].answer} />
            </p>
            <ReceiptCard lines={c.items[answerIdx].receipt} size="sm" appear={!reduce} className="mt-4 inline-block" />
          </div>
        )}
      </div>
    </div>
  )
}
