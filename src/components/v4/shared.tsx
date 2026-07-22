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
 * drives the page's luminance through the acts' reference keyframes; scrolling
 * reads as one continuous day. The interpolation itself is painted once as a
 * document-height gradient through the keyframes on `[data-v4-day-layer]`
 * (see V4Home) — scroll moves the viewport across it, so `--day` advances
 * with zero runtime paint invalidation (G-7: mutating act backgrounds on
 * scroll/hydration was re-timing the H1's LCP paint).
 */
export function useDayModel(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let raf = 0
    const tick = () => {
      const doc = document.documentElement
      const day = Math.min(1, Math.max(0, scrollY / Math.max(1, doc.scrollHeight - innerHeight)))
      root.style.setProperty('--day', day.toFixed(4))
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [rootRef])
}

/** §4 keyframes as one continuous document-height ramp: each act's reference
    background value sits at its measured top-of-act position (1280 heights),
    with the page's tail holding 2AM. */
export const DAY_GRADIENT =
  'linear-gradient(180deg, #0E0B09 0%, #1A110B 12.5%, #20150C 25%, #141009 41%, #100C08 60%, #0F0B08 72%, #0B0807 83%, #0B0807 100%)'

/** Below-fold act imagery, fetched only when its act approaches the viewport
    (G-7: `loading=lazy` still eager-fetches within ~3000px on fast
    connections, dragging every act photo into the LCP dependency graph). */
export function DeferredImg({ src, alt, style, className }: { src: string; alt: string; style?: CSSProperties; className?: string }) {
  const ref = useRef<HTMLImageElement | null>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setOn(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} alt={alt} src={on ? src : undefined} decoding="async" style={style} className={className} />
}
