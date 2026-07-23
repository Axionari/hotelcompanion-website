'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { ReceiptCard } from '@/components/cds/ReceiptCard'
import { Speakable } from '@/components/cds/AskBar'
import { useCopy } from '@/lib/i18n/useCopy'
import { askBarCopy } from '@/lib/i18n/marketing/askBar'

/**
 * v4 ask-bar — the v3 AskBar's scripted engine (no LLM, no network) inside the
 * reference's pill geometry: ember dot · input · champagne ASK. Chips (Act VII
 * only) are wired to the two v3 scripted responses closest to their labels
 * (kit §2); free text gets the v3 polite fallback. Everything the bar renders
 * is device UI (kit §3 marks bar + chips `UI`).
 */
export function AskBarV4({ chips = null }: { chips?: string[] | null }) {
  const c = useCopy(askBarCopy)
  const [value, setValue] = useState('')
  const [answerIdx, setAnswerIdx] = useState<number | null>(null)
  const [fallback, setFallback] = useState(false)
  const [reduce, setReduce] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  /** chip label → the closest v3 scripted response (kit §2) */
  function scriptFor(label: string): number {
    const l = label.toLowerCase()
    if (l.includes('2am') || l.includes('2 am')) return 1
    if (l.includes('upsell') || l.includes('vender')) return 0
    return 2
  }

  function playChip(label: string) {
    clearTimers()
    setFallback(false)
    setAnswerIdx(null)
    const i = scriptFor(label)
    if (reduce) {
      setValue(label)
      setAnswerIdx(i)
      return
    }
    setValue('')
    for (let n = 1; n <= label.length; n++) {
      timers.current.push(window.setTimeout(() => setValue(label.slice(0, n)), 24 * n))
    }
    timers.current.push(window.setTimeout(() => setAnswerIdx(i), 24 * label.length + 220))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const typed = value.trim()
    if (!typed) return
    clearTimers()
    const chipMatch = (chips ?? []).find((ch) => ch === typed)
    const exact = c.items.findIndex((it) => it.chip === typed)
    if (chipMatch) {
      setFallback(false)
      setAnswerIdx(scriptFor(chipMatch))
    } else if (exact >= 0) {
      setFallback(false)
      setAnswerIdx(exact)
    } else {
      setAnswerIdx(null)
      setFallback(true)
    }
  }

  return (
    <div data-device-ui="" className="v4-askbar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <form
        onSubmit={onSubmit}
        className="v4-askbar-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          width: 600,
          maxWidth: '100%',
          background: 'rgba(26,18,12,.72)',
          border: '1px solid rgba(201,139,78,.4)',
          borderRadius: 999,
          padding: '10px 10px 10px 20px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 20px 60px rgba(0,0,0,.45)',
          boxSizing: 'border-box',
        }}
      >
        <span aria-hidden="true" style={{ flex: 'none' }}>
          <VoiceOrb size={26} state="idle" showMic={false} />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={c.placeholder}
          aria-label={c.placeholder}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F2E9DA',
            fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          className="v4-ask-btn"
          style={{
            flex: 'none',
            /* ADDENDUM 1 §B4 — terracotta solid action, dark text */
            background: '#C86A3A',
            color: '#1A0F06',
            border: 'none',
            borderRadius: 999,
            padding: '11px 26px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11,
            letterSpacing: '.2em',
            cursor: 'pointer',
          }}
        >
          {c.submitLabel.toUpperCase()}
        </button>
      </form>

      {chips && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {chips.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => playChip(label)}
              className="v4-chip-btn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,139,78,.35)',
                borderRadius: 999,
                padding: '9px 18px',
                fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
                fontSize: 12.5,
                color: 'rgba(242,233,218,.7)',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite" role="region" aria-label={c.answerRegionLabel} style={{ width: 560, maxWidth: '100%' }}>
        {fallback && (
          <div className="v4-reply-card">
            <p style={{ margin: 0 }}>{c.fallback}</p>
          </div>
        )}
        {answerIdx !== null && (
          <div className="v4-reply-card">
            <p style={{ margin: 0 }}>
              <Speakable text={c.items[answerIdx].answer} />
            </p>
            <ReceiptCard lines={c.items[answerIdx].receipt} size="sm" appear={!reduce} className="mt-3 inline-block" />
          </div>
        )}
      </div>
    </div>
  )
}
