'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * v3 ReceiptCard — the shared receipts idiom (docs/v3/03_TOKENS.md, G2).
 * Mono 12–12.5px, line-height ≈ 2; ✓ in --success, route arrows in
 * --eyebrow-warm, money in --money, IDs/emphasis in --text; container is
 * --surface-1 at high opacity with blur(8px), 1px --hairline, radius 16–18px.
 * Receipts always name a business outcome.
 */

export interface ReceiptSeg {
  t: 'check' | 'route' | 'money' | 'id' | 'text'
  s: string
}

const SEG_COLOR: Record<ReceiptSeg['t'], string> = {
  check: 'var(--success)',
  route: 'var(--eyebrow-warm)',
  money: 'var(--money)',
  id: 'var(--text)',
  text: 'var(--text-dim)',
}

export function ReceiptCard({
  lines,
  size = 'md',
  appear = false,
  className = '',
}: {
  /** Each line is a row of typed segments, joined with spaces. */
  lines: ReceiptSeg[][]
  size?: 'sm' | 'md'
  /** Fade + 12px rise once when scrolled into view (static under reduced motion). */
  appear?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  // Start visible: no-JS and reduced-motion both get the final state.
  const [shown, setShown] = useState(true)

  useEffect(() => {
    if (!appear) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    setShown(false)
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    const failsafe = window.setTimeout(() => setShown(true), 3000)
    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [appear])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        fontSize: size === 'sm' ? 12 : 12.5,
        lineHeight: 2,
        letterSpacing: '0.02em',
        background: 'color-mix(in srgb, var(--surface-1) 88%, transparent)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid var(--hairline)',
        borderRadius: size === 'sm' ? 16 : 18,
        padding: size === 'sm' ? '8px 14px' : '10px 18px',
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(12px)',
        transition: 'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {lines.map((line, i) => (
        <div key={i}>
          {line.map((seg, j) => (
            <span key={j} style={{ color: SEG_COLOR[seg.t], fontWeight: seg.t === 'id' ? 600 : 400 }}>
              {seg.s}
              {j < line.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
