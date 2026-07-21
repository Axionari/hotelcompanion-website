'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { Reveal } from './Reveal'

/* ============================================================================
   BLOCK VOCABULARY — Design & Interaction Spec §3, Level-Up plan A + B.
   Left-aligned, card-less where RC would be, tasteful frames only where a real
   UI is being depicted (dashboards, devices, flows).
   Every block ships motion / reduced-motion / no-JS states.
   ========================================================================= */

function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
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
      if (done) return
      done = true
      setSeen(true)
    }
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && show(), {
            rootMargin: '0px 0px -10% 0px',
          })
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
  return [ref, seen]
}

/* ---------------------------------------------------------------- StatBlock */
/** Big copper display number, left-aligned, with a count-up on reveal. */
export function StatBlock({
  figure,
  caption,
  source,
  children,
}: {
  figure: string
  caption: string
  source?: string
  children?: ReactNode
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const [shown, setShown] = useState(figure)

  useEffect(() => {
    if (!seen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const m = figure.match(/^(\D*)([\d.,]+)(.*)$/)
    if (!m) return
    const [, pre, num, post] = m
    const target = parseFloat(num.replace(/,/g, ''))
    if (!isFinite(target)) return
    const dur = 900
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = Math.round(target * eased)
      setShown(`${pre}${v}${post}`)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, figure])

  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      <div className="lg:col-span-5">
        <p
          className="font-serif"
          style={{
            fontSize: 'clamp(3.4rem, 9vw, 6.5rem)',
            fontWeight: 530,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--accent)',
          }}
        >
          {shown}
        </p>
        {source && (
          <p className="eyebrow mt-5">{source}</p>
        )}
      </div>
      <div className="lg:col-span-7">
        <p className="body-lead" style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', color: 'var(--text)' }}>
          {caption}
        </p>
        {children && <div className="mt-8 flex flex-col gap-4">{children}</div>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- IconChipGrid */
/**
 * Turns a long noun-stack into a scannable chip grid (Webby fix).
 * Visual Interface Level-Up §C pushes this further: show six, then "+ N more" —
 * long lists read as filler and hurt the luxury tone.
 */
export function IconChipGrid({
  items,
  columns = 3,
  cap = 6,
  moreLabel,
}: {
  items: ReadonlyArray<string>
  columns?: 2 | 3
  /** Set to 0 to disable capping. */
  cap?: number
  /** e.g. "+ 4 more" / "+ 4 más". Falls back to a neutral count. */
  moreLabel?: (n: number) => string
}) {
  const { nav: gnav } = useCopy(globalCopy)
  const shown = cap > 0 ? items.slice(0, cap) : items
  const rest = items.length - shown.length
  return (
    <>
    <div className={`grid gap-x-8 gap-y-0 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {shown.map((item, i) => (
        <Reveal key={item} delay={Math.min(i, 8) * 25}>
          <div
            className="flex items-center gap-3 py-3.5"
            style={{ borderBottom: '1px solid var(--border-soft)' }}
          >
            <span
              aria-hidden="true"
              className="flex-shrink-0"
              style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)' }}
            />
            <span className="font-sans" style={{ fontSize: '15px', color: 'var(--text-dim)' }}>
              {item}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
    {rest > 0 && (
      <p className="eyebrow mt-4" style={{ color: 'var(--accent)' }}>
        {moreLabel ? moreLabel(rest) : `+ ${rest} ${gnav.more}`}
      </p>
    )}
    </>
  )
}

/* --------------------------------------------------------------- RoutingFlow */
/** Request → department, as mini flow cards animating left→right on reveal. */
export function RoutingFlow({ pairs }: { pairs: ReadonlyArray<{ from: string; to: string }> }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {pairs.map((p, i) => (
        <Reveal key={i} delay={Math.min(i, 8) * 45}>
          <div
            className="flex items-center justify-between gap-4 rounded-xl px-5 py-4"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-soft)' }}
          >
            <span className="font-sans" style={{ fontSize: '14px', color: 'var(--text)' }}>
              {p.from}
            </span>
            <span aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }}>
              →
            </span>
            <span className="eyebrow" style={{ textAlign: 'right' }}>
              {p.to}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------- JourneyTimeline */
/** Horizontal dated timeline (RC pattern) — used for the guest lifecycle. */
const TIMELINE_COLS: Record<3 | 4 | 5, string> = {
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
}

export function JourneyTimeline({
  stages,
  columns = 3,
}: {
  stages: ReadonlyArray<{ name: string; body: string }>
  /** Match the column count to the number of stages so no cell is left empty. */
  columns?: 3 | 4 | 5
}) {
  return (
    <div className={`grid ${TIMELINE_COLS[columns]} gap-px`} style={{ background: 'var(--border-soft)' }}>
      {stages.map((s, i) => (
        <Reveal key={s.name} delay={i * 90}>
          <div className="h-full px-6 py-8" style={{ background: 'var(--bg)' }}>
            <div className="eyebrow eyebrow-accent mb-4">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="font-serif mb-3" style={{ fontSize: '1.3rem', fontWeight: 530, color: 'var(--text)' }}>
              {s.name}
            </h3>
            <p className="font-sans" style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-dim)' }}>
              {s.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ------------------------------------------------------- ConvergenceDiagram */
/** Many inputs flowing into one glowing copper node — the Companion OS story. */
export function ConvergenceDiagram({
  inputs,
  nodeLabel,
}: {
  inputs: ReadonlyArray<string>
  nodeLabel: string
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-5 flex flex-col gap-2.5">
        {inputs.map((label, i) => (
          <div
            key={label}
            className="rounded-lg px-4 py-3"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-soft)',
              fontSize: '13px',
              color: 'var(--text-dim)',
              opacity: seen ? 1 : 0,
              transform: seen ? 'translateX(0)' : 'translateX(-12px)',
              transition: `opacity var(--dur-base) var(--ease-standard) ${i * 60}ms, transform var(--dur-base) var(--ease-standard) ${i * 60}ms`,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="lg:col-span-2 flex items-center justify-center py-6 lg:py-0" aria-hidden="true">
        <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ maxWidth: 100 }}>
          <path
            d="M0 20 H100"
            stroke="var(--accent-hairline)"
            strokeWidth="1"
            strokeDasharray="100"
            strokeDashoffset={seen ? 0 : 100}
            style={{ transition: 'stroke-dashoffset 700ms var(--ease-standard) 300ms' }}
          />
        </svg>
      </div>

      <div className="lg:col-span-5 flex justify-center lg:justify-start">
        <div
          className="rounded-2xl px-8 py-7 text-center"
          style={{
            background: 'radial-gradient(120% 120% at 50% 0%, rgba(200,106,58,0.22) 0%, var(--surface-3) 70%)',
            border: '1px solid var(--accent-hairline)',
            boxShadow: seen ? '0 0 60px -12px rgba(200,106,58,0.4)' : 'none',
            transition: 'box-shadow 900ms var(--ease-standard) 500ms',
          }}
        >
          <div className="eyebrow eyebrow-accent mb-2">ONE PLATFORM</div>
          <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 530, color: 'var(--text)' }}>
            {nodeLabel}
          </div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- NodeDiagram */
/** Fragmented systems with copper break-points — the problem framing. */
export function NodeDiagram({
  nodes,
  breakLabel,
}: {
  nodes: ReadonlyArray<string>
  breakLabel: string
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {nodes.map((n, i) => (
        <div
          key={n}
          className="relative rounded-xl px-5 py-5"
          style={{
            background: 'var(--surface-2)',
            border: '1px dashed var(--border)',
            opacity: seen ? 1 : 0,
            transition: `opacity var(--dur-base) var(--ease-standard) ${i * 70}ms`,
          }}
        >
          <span className="font-sans" style={{ fontSize: '14px', color: 'var(--text-dim)' }}>
            {n}
          </span>
          {i < nodes.length - 1 && (
            <span
              aria-hidden="true"
              className="eyebrow absolute"
              style={{
                right: -10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent)',
                fontSize: '11px',
                opacity: seen ? 1 : 0,
                transition: `opacity var(--dur-base) var(--ease-standard) ${300 + i * 70}ms`,
              }}
            >
              ✕
            </span>
          )}
        </div>
      ))}
      <p className="eyebrow mt-4 sm:col-span-2 lg:col-span-3" style={{ color: 'var(--accent)' }}>
        {breakLabel}
      </p>
    </div>
  )
}

/* ---------------------------------------------------------- CapabilitySurface */
/** The 8 Companion OS capabilities as a restrained ruled surface, not SaaS cards. */
export function CapabilitySurface({ items }: { items: ReadonlyArray<{ id: string; name: string }> }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-0">
      {items.map((c, i) => (
        <Reveal key={c.id} delay={Math.min(i, 8) * 35}>
          <div className="py-5" style={{ borderTop: '1px solid var(--border-soft)' }}>
            <div className="eyebrow eyebrow-accent mb-2">{String(i + 1).padStart(2, '0')}</div>
            <div className="font-serif" style={{ fontSize: '1.05rem', fontWeight: 530, color: 'var(--text)' }}>
              {c.name}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------ DashboardMockup */
/** Windowed "command center" — the proof surface RC doesn't foreground. */
export function DashboardMockup({
  title,
  resolvedPct,
  escalatedPct,
  resolvedLabel,
  escalatedLabel,
  metrics,
  properties,
}: {
  title: string
  resolvedPct: number
  escalatedPct: number
  resolvedLabel: string
  escalatedLabel: string
  metrics: ReadonlyArray<{ label: string; value: string }>
  properties: ReadonlyArray<{ name: string; value: string }>
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const circ = 2 * Math.PI * 42

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-2 px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--surface-3)' }}
      >
        <span aria-hidden="true" className="flex gap-1.5">
          {['#3a3330', '#3a3330', '#3a3330'].map((c, i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: 999, background: c, display: 'block' }} />
          ))}
        </span>
        <span className="eyebrow ml-2">{title}</span>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
        {/* donut */}
        <div className="flex items-center gap-6">
          <svg width="112" height="112" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="9" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="9"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              strokeDasharray={circ}
              strokeDashoffset={seen ? circ * (1 - resolvedPct / 100) : circ}
              style={{ transition: 'stroke-dashoffset 1100ms var(--ease-standard) 200ms' }}
            />
          </svg>
          <div>
            <div className="font-serif" style={{ fontSize: '2rem', fontWeight: 530, color: 'var(--text)' }}>
              {resolvedPct}%
            </div>
            <div className="font-sans" style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
              {resolvedLabel}
            </div>
            <div className="font-sans mt-2" style={{ fontSize: '13px', color: 'var(--text-faint)' }}>
              {escalatedPct}% · {escalatedLabel}
            </div>
          </div>
        </div>

        {/* metrics */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 530, color: 'var(--text)' }}>
                {m.value}
              </div>
              <div className="eyebrow mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* property list */}
      <div style={{ borderTop: '1px solid var(--border-soft)' }}>
        {properties.map((p, i) => (
          <div
            key={p.name}
            className="flex items-center justify-between px-6 md:px-8 py-3.5"
            style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-soft)' }}
          >
            <span className="font-sans" style={{ fontSize: '14px', color: 'var(--text-dim)' }}>
              {p.name}
            </span>
            <span className="font-sans" style={{ fontSize: '14px', color: 'var(--accent)' }}>
              {p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Accordion */
export function Accordion({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <Reveal key={i}>
            <div style={{ borderBottom: '1px solid var(--border-soft)' }}>
              <button
                className="w-full flex items-center justify-between gap-6 py-5 text-left"
                style={{ minHeight: 44 }}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 530, color: 'var(--text)' }}>
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0"
                  style={{
                    color: 'var(--accent)',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform var(--dur-base) var(--ease-standard)',
                  }}
                >
                  ⌄
                </span>
              </button>
              {isOpen && (
                <p
                  className="font-sans pb-6"
                  style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-dim)', maxWidth: '62ch' }}
                >
                  {item.a}
                </p>
              )}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------- CommissionCompare */
/**
 * OTA vs direct, as two proportional bars. Turns the commission stat into
 * something you can see at a glance (Visual Interface Level-Up: revenue-forward).
 * Percentages are illustrative of the quoted ranges and carry the same
 * NEEDS CONFIRM caveat as the figure they visualise.
 */
export function CommissionCompare({
  rows,
}: {
  rows: ReadonlyArray<{ label: string; pct: number; note: string; accent?: boolean }>
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const max = Math.max(...rows.map((r) => r.pct), 1)
  return (
    <div ref={ref} className="flex flex-col gap-7">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between mb-2.5">
            <span className="eyebrow" style={{ color: r.accent ? 'var(--accent)' : 'var(--text-faint)' }}>
              {r.label}
            </span>
            <span
              className="font-serif"
              style={{ fontSize: '1.35rem', fontWeight: 530, color: r.accent ? 'var(--accent)' : 'var(--text)' }}
            >
              {r.note}
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--surface-3)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: seen ? `${(r.pct / max) * 100}%` : '0%',
                borderRadius: 999,
                background: r.accent ? 'var(--accent)' : 'rgba(251,248,242,0.22)',
                transition: `width 900ms var(--ease-standard) ${i * 140}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * The resolution split as a thin copper donut (91% resolved / 9% escalated).
 *
 * Used where the full DashboardMockup would be a duplicate — the number is the
 * argument, so it does not need the whole dashboard around it. Counts up once
 * on reveal; reduced motion renders the final value immediately.
 */
export function ResolutionDonut({
  resolvedPct,
  escalatedPct,
  resolvedLabel,
  escalatedLabel,
  size = 168,
}: {
  resolvedPct: number
  escalatedPct: number
  resolvedLabel: string
  escalatedLabel: string
  size?: number
}) {
  const r = 54
  const c = 2 * Math.PI * r
  const resolved = (resolvedPct / 100) * c

  return (
    <div className="flex items-center gap-7">
      <svg width={size} height={size} viewBox="0 0 140 140" role="img" aria-label={`${resolvedPct}% ${resolvedLabel}`}>
        {/* escalated remainder */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--border)" strokeWidth="9" />
        {/* resolved arc */}
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${resolved} ${c - resolved}`}
          transform="rotate(-90 70 70)"
          className="donut-arc"
          style={{ ['--arc' as string]: `${resolved}` }}
        />
        <text
          x="70"
          y="66"
          textAnchor="middle"
          className="font-serif"
          style={{ fontSize: 26, fontWeight: 530, fill: 'var(--text)' }}
        >
          {resolvedPct}%
        </text>
        <text x="70" y="84" textAnchor="middle" style={{ fontSize: 8, fill: 'var(--text-faint)', letterSpacing: '0.14em' }}>
          {resolvedLabel.toUpperCase()}
        </text>
      </svg>

      <ul className="flex flex-col gap-3" role="list">
        <li className="flex items-center gap-2.5">
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent)' }} />
          <span className="font-sans" style={{ fontSize: 14, color: 'var(--text)' }}>
            {resolvedPct}% {resolvedLabel}
          </span>
        </li>
        <li className="flex items-center gap-2.5">
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--border)' }} />
          <span className="font-sans" style={{ fontSize: 14, color: 'var(--text-dim)' }}>
            {escalatedPct}% {escalatedLabel}
          </span>
        </li>
      </ul>
    </div>
  )
}
