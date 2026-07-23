'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'

/**
 * Diagrams — RC's three remaining diagram forms, shared (Phase 5):
 *
 *  - FragmentScatter — the "before" chaos: systems scattered around the guest,
 *    dashed lines, × breaks, mono failure labels (RC homepage §02).
 *  - PassThrough — the vertical pass-through: one interaction → the layer →
 *    the systems you already run (RC product "Nothing new to operate").
 *  - ArrowFlow — the numbered step flow with arrows (RC pilot "From
 *    conversation to deployment").
 *
 * All three reuse the .v5-layer armed/in reveal gate (globals.css): fail-open,
 * reduced motion and no-JS render the composed still.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const SERIF = 'var(--font-serif), Georgia, serif'
const TERRA = '#C86A3A'
const CREAM = '#F2EEE6'

/** Shared reveal gate (mirrors IntelligentLayer's). */
function useArmedIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return
    setArmed(true)
    let done = false
    let io: IntersectionObserver | undefined
    const show = () => {
      if (done) return
      done = true
      setInView(true)
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(failsafe)
    }
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.75) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) show() }, { rootMargin: '0px 0px -25% 0px' })
      io.observe(el)
    }
    const failsafe = window.setTimeout(() => { if (el.getBoundingClientRect().top < window.innerHeight) show() }, 3000)
    onScroll()
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(failsafe)
    }
  }, [])
  return { ref, cls: `v5-layer ${armed ? 'armed' : ''} ${inView ? 'in' : ''}` }
}

const chipStyle: CSSProperties = {
  fontFamily: SANS,
  fontSize: 'clamp(11px, 1.05vw, 14px)',
  fontWeight: 500,
  color: 'rgba(242,233,218,0.85)',
  background: 'rgba(243,236,226,0.05)',
  border: '1px solid rgba(243,236,226,0.13)',
  borderRadius: 12,
  padding: 'clamp(9px,1vw,13px) clamp(12px,1.4vw,18px)',
  whiteSpace: 'nowrap',
}

/* ───────────────────────────────────────────────── FragmentScatter ── */

/** Diagram coordinate space — the container is aspect-locked to this, so SVG
 *  and HTML positions correspond exactly (no stretch, no missed endpoints). */
const FW = 1100
const FH = 460
const FC = { x: 550, y: 230 }

/** Chip centers in diagram units. */
const SCATTER: Array<{ x: number; y: number }> = [
  { x: 150, y: 88 }, { x: 470, y: 50 }, { x: 860, y: 74 },
  { x: 85, y: 253 }, { x: 1000, y: 207 },
  { x: 185, y: 386 }, { x: 555, y: 419 }, { x: 935, y: 363 },
]

/** Which lines break (gap + × + failure label), one per marker. */
const BROKEN = [0, 4, 5]

export function FragmentScatter({
  center,
  systems,
  markers,
}: {
  center: string
  systems: ReadonlyArray<string>
  markers: ReadonlyArray<string>
}) {
  const { ref, cls } = useArmedIn()
  const pts = SCATTER.slice(0, systems.length)

  /** Each line runs center → just short of its chip; at() walks it. */
  const geom = pts.map((p) => {
    const dx = p.x - FC.x
    const dy = p.y - FC.y
    const len = Math.hypot(dx, dy)
    const end = { x: p.x - (dx / len) * 70, y: p.y - (dy / len) * 48 }
    const at = (t: number) => ({ x: FC.x + (end.x - FC.x) * t, y: FC.y + (end.y - FC.y) * t })
    return { end, at }
  })
  const lineStyle = { stroke: 'rgba(200,106,58,0.6)', strokeWidth: 1.5, strokeDasharray: '5 6' }

  return (
    <div ref={ref} className={cls}>
      {/* ── desktop scatter — aspect-locked so every line lands true ── */}
      <div className="relative hidden md:block" style={{ aspectRatio: `${FW} / ${FH}`, maxWidth: 1200, marginInline: 'auto' }}>
        <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox={`0 0 ${FW} ${FH}`}>
          {geom.map((g, i) => {
            const broken = BROKEN.indexOf(i)
            if (broken === -1) {
              return (
                <line
                  key={i}
                  className="lg-line"
                  x1={FC.x} y1={FC.y} x2={g.end.x} y2={g.end.y}
                  {...lineStyle}
                  style={{ transitionDelay: `${180 + i * 70}ms` }}
                />
              )
            }
            const a = g.at(0.46)
            const b = g.at(0.62)
            const m = g.at(0.54)
            return (
              <g key={i}>
                <line className="lg-line" x1={FC.x} y1={FC.y} x2={a.x} y2={a.y} {...lineStyle} style={{ transitionDelay: `${180 + i * 70}ms` }} />
                <line className="lg-line" x1={b.x} y1={b.y} x2={g.end.x} y2={g.end.y} {...lineStyle} style={{ transitionDelay: `${240 + i * 70}ms` }} />
                {/* the break, marked */}
                <g className="lg-line" style={{ transitionDelay: `${760 + broken * 130}ms` }}>
                  <line x1={m.x - 8} y1={m.y - 8} x2={m.x + 8} y2={m.y + 8} stroke={TERRA} strokeWidth="2" />
                  <line x1={m.x + 8} y1={m.y - 8} x2={m.x - 8} y2={m.y + 8} stroke={TERRA} strokeWidth="2" />
                </g>
                <text
                  className="lg-line"
                  x={m.x} y={m.y - 22}
                  textAnchor="middle"
                  style={{ ...MONO, fontSize: 12.5, letterSpacing: '0.2em', fill: 'rgba(242,233,218,0.5)', transitionDelay: `${860 + broken * 130}ms` } as CSSProperties}
                >
                  {markers[broken]}
                </text>
              </g>
            )
          })}
        </svg>

        {/* the guest, center */}
        <div className="lg-item absolute" style={{ left: `${(FC.x / FW) * 100}%`, top: `${(FC.y / FH) * 100}%`, transform: 'translate(-50%,-50%)' }}>
          <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(16px,1.6vw,22px)', color: '#1a1207', background: CREAM, borderRadius: 999, padding: 'clamp(12px,1.4vw,18px) clamp(24px,2.8vw,38px)', whiteSpace: 'nowrap', boxShadow: '0 18px 50px -18px rgba(0,0,0,0.7)' }}>
            {center}
          </div>
        </div>

        {/* the systems — exactly where their lines point, drifting gently */}
        {pts.map((p, i) => (
          <div key={systems[i]} className="lg-item absolute" style={{ left: `${(p.x / FW) * 100}%`, top: `${(p.y / FH) * 100}%`, transform: 'translate(-50%,-50%)', transitionDelay: `${120 + i * 60}ms` }}>
            <span
              className={i % 2 ? 'v5-drift-b' : 'v5-drift-a'}
              style={{ ...chipStyle, display: 'inline-block', animationDuration: `${5.5 + (i % 4) * 1.2}s`, animationDelay: `${-i * 1.3}s` }}
            >
              {systems[i]}
            </span>
          </div>
        ))}
      </div>

      {/* ── mobile — the same story, stacked ── */}
      <div className="md:hidden flex flex-col items-center gap-5">
        <div className="lg-item" style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 20, color: '#1a1207', background: CREAM, borderRadius: 999, padding: '12px 28px' }}>{center}</div>
        <div className="lg-item flex flex-wrap justify-center gap-x-5 gap-y-2" style={{ transitionDelay: '120ms' }}>
          {markers.map((m) => (
            <span key={m} style={{ ...MONO, fontSize: 9, letterSpacing: '.16em', color: TERRA }}>× {m}</span>
          ))}
        </div>
        <div className="lg-item flex flex-wrap justify-center gap-2" style={{ transitionDelay: '220ms' }}>
          {systems.map((s) => (
            <span key={s} style={{ ...chipStyle, fontSize: 12, padding: '8px 13px' }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────── PassThrough ── */

export function PassThrough({
  from,
  label1,
  node,
  label2,
  systems,
  caption,
}: {
  from: string
  label1: string
  node: string
  label2: string
  systems: ReadonlyArray<string>
  caption: string
}) {
  const { ref, cls } = useArmedIn()
  const connector = (label: string, delay: number) => (
    <div className="lg-item flex flex-col items-center" style={{ transitionDelay: `${delay}ms` }}>
      <div aria-hidden style={{ width: 1.5, height: 'clamp(18px,2vw,26px)', background: 'rgba(200,106,58,0.55)' }} />
      <span style={{ ...MONO, fontSize: 'clamp(8px,0.78vw,10.5px)', letterSpacing: '.2em', color: 'rgba(242,233,218,0.45)', padding: '6px 0' }}>{label}</span>
      <div aria-hidden style={{ width: 1.5, height: 'clamp(18px,2vw,26px)', background: 'rgba(200,106,58,0.55)' }} />
    </div>
  )
  return (
    <div ref={ref} className={cls}>
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 720, marginInline: 'auto' }}>
        <div className="lg-item"><span style={chipStyle}>{from}</span></div>
        {connector(label1, 140)}
        <div className="lg-item" style={{ transitionDelay: '260ms' }}>
          <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(19px,2vw,28px)', color: CREAM, textAlign: 'center', border: '1px solid rgba(200,106,58,0.75)', borderRadius: 16, background: 'rgba(16,13,10,0.72)', boxShadow: '0 0 60px -14px rgba(200,106,58,0.4)', padding: 'clamp(14px,1.7vw,22px) clamp(26px,3vw,44px)' }}>
            {node}
          </div>
        </div>
        {connector(label2, 400)}
        <div className="lg-item flex flex-wrap justify-center" style={{ gap: 'clamp(7px,0.9vw,11px)', transitionDelay: '540ms' }}>
          {systems.map((s) => (
            <span key={s} style={chipStyle}>{s}</span>
          ))}
        </div>
        <div className="lg-item" style={{ transitionDelay: '680ms' }}>
          <span style={{ ...MONO, display: 'block', marginTop: 'clamp(16px,1.8vw,24px)', fontSize: 'clamp(8px,0.8vw,11px)', letterSpacing: '.22em', color: 'rgba(242,233,218,0.4)' }}>{caption}</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────── OutcomeBand ── */

/** Axionari's outcomes row: one bordered band, N columns with dividers —
 *  mono number, serif outcome, one-line sub. */
export function OutcomeBand({
  items,
}: {
  items: ReadonlyArray<{ title: string; sub: string }>
}) {
  const { ref, cls } = useArmedIn()
  return (
    <div ref={ref} className={cls}>
      <div className="v5-card grid md:grid-cols-4" style={{ overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div
            key={it.title}
            className="lg-item"
            style={{
              padding: 'clamp(24px, 2.8vw, 42px) clamp(22px, 2.4vw, 34px)',
              borderLeft: i > 0 ? '1px solid rgba(242,238,230,0.07)' : 'none',
              transitionDelay: `${i * 110}ms`,
            }}
          >
            <div style={{ ...MONO, fontSize: 'clamp(9px,0.85vw,11px)', letterSpacing: '.14em', color: TERRA }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px,2vw,28px)', lineHeight: 1.15, color: 'var(--text)', marginTop: 12 }}>
              {it.title}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.5, color: 'var(--text-dim)', marginTop: 10 }}>
              {it.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────── ArrowFlow ── */

export function ArrowFlow({
  steps,
  caption,
}: {
  steps: ReadonlyArray<{ title: string; sub?: ReactNode }>
  caption?: string
}) {
  const { ref, cls } = useArmedIn()
  return (
    <div ref={ref} className={cls}>
      <div style={{ borderBlock: '1px solid var(--border-soft)', paddingBlock: 'clamp(24px,2.8vw,40px)' }}>
        <div className="flex flex-col md:flex-row md:items-start" style={{ gap: 'clamp(18px,2vw,28px)' }}>
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col md:flex-row md:items-start md:flex-1" style={{ gap: 'clamp(18px,2vw,28px)' }}>
              <div className="lg-item md:flex-1" style={{ transitionDelay: `${i * 140}ms` }}>
                <div style={{ ...MONO, fontSize: 'clamp(9px,0.85vw,11px)', letterSpacing: '.14em', color: TERRA }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(19px,1.9vw,26px)', lineHeight: 1.2, color: 'var(--text)', marginTop: 8 }}>{s.title}</div>
                {s.sub && <div style={{ fontFamily: SANS, fontSize: 'clamp(12.5px,1.1vw,15px)', lineHeight: 1.55, color: 'var(--text-dim)', marginTop: 7 }}>{s.sub}</div>}
              </div>
              {i < steps.length - 1 && (
                <div aria-hidden className="lg-item hidden md:block" style={{ color: TERRA, fontSize: 'clamp(16px,1.6vw,22px)', paddingTop: 'clamp(20px,2vw,28px)', transitionDelay: `${i * 140 + 90}ms` }}>
                  ⟶
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <div className="lg-item" style={{ transitionDelay: `${steps.length * 140}ms` }}>
          <span style={{ ...MONO, display: 'block', marginTop: 'clamp(14px,1.6vw,20px)', fontSize: 'clamp(8px,0.8vw,11px)', letterSpacing: '.2em', color: 'rgba(242,233,218,0.4)', textAlign: 'center' }}>{caption}</span>
        </div>
      )}
    </div>
  )
}
