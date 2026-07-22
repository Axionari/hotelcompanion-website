'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'

/**
 * v4 shared primitives (docs/v4/V4_BUILD_KIT.md).
 * Reference geometry/materials source: docs/v4/reference/Hotel Companion
 * Homepage.dc.html rendered at 1280 — values ported 1:1.
 */

/* ---------------------------------------------------------------- palette */
export const V4 = {
  bg: '#0E0B09',
  text: '#F2E9DA',
  textSoft: 'rgba(242,233,218,.55)',
  textFaint: 'rgba(242,233,218,.45)',
  champagne: '#E7CE86',
  emberEyebrow: 'rgba(226,155,86,.8)',
  chipBorder: 'rgba(201,139,78,.3)',
  barBorder: 'rgba(201,139,78,.4)',
  cardBg: '#1E1610',
  cardBorder: 'rgba(201,139,78,.28)',
  receiptText: '#C9A87A',
  ink: '#171008',
  serif: "var(--font-v4-serif), 'Instrument Serif', serif",
  mono: "var(--font-v4-mono), 'IBM Plex Mono', monospace",
  /* §4 keyframes — the reference's per-act background values */
  actBg: ['#0E0B09', '#1A110B', '#20150C', '#141009', '#100C08', '#0F0B08', '#0B0807'],
} as const

export const monoStyle = (size: number, tracking: string, color: string): CSSProperties => ({
  fontFamily: V4.mono,
  fontSize: size,
  letterSpacing: tracking,
  color,
})

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div style={monoStyle(10, '.45em', V4.emberEyebrow)}>{children}</div>
}

/* ------------------------------------------------- entrance reveal (§4) */
/** One entrance transition per act: opacity+rise on first intersection.
    prefers-reduced-motion renders static. */
export function V4Reveal({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setSeen(true)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
    const failsafe = window.setTimeout(() => setSeen(true), 3000)
    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? 'none' : 'translateY(16px)',
        transition: 'opacity 700ms var(--ease-standard), transform 700ms var(--ease-standard)',
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------- the sun lighting model */
/**
 * §4 — a page-level scroll variable `--day` (0 at top, 1 at the footer)
 * drives the page background through the acts' reference keyframes; scrolling
 * reads as one continuous day. Acts declare their static reference background
 * as a fallback (`var(--v4-clear, <act color>)`); once the model is live the
 * root sets --v4-clear: transparent and paints the interpolated color behind
 * everything. No-JS and print keep the static per-act values.
 */
export function useDayModel(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const hex = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]
    const stops = V4.actBg.map(hex)
    let raf = 0
    let tops: number[] = []
    const measure = () => {
      tops = [...root.querySelectorAll<HTMLElement>('[data-v4-act]')].map((s) => s.offsetTop + root.offsetTop)
    }
    const tick = () => {
      const doc = document.documentElement
      const day = Math.min(1, Math.max(0, scrollY / Math.max(1, doc.scrollHeight - innerHeight)))
      root.style.setProperty('--day', day.toFixed(4))
      // anchor = viewport top edge, biased a third down so an act "owns" the
      // screen while it fills it
      const y = scrollY + innerHeight * 0.33
      let i = 0
      while (i < tops.length - 1 && y >= tops[i + 1]) i++
      const next = tops[i + 1] ?? tops[i] + innerHeight
      const t = Math.min(1, Math.max(0, (y - tops[i]) / Math.max(1, next - tops[i])))
      const a = stops[i]
      const b = stops[Math.min(i + 1, stops.length - 1)]
      const mix = a.map((v, k) => Math.round(v + (b[k] - v) * t))
      root.style.setProperty('--v4-day-bg', `rgb(${mix[0]},${mix[1]},${mix[2]})`)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    measure()
    tick()
    root.style.setProperty('--v4-clear', 'transparent')
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', () => {
      measure()
      onScroll()
    })
    return () => {
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [rootRef])
}
