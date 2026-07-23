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

/** Scattered chip positions (percent), tuned to feel disordered. */
const SCATTER: Array<{ x: number; y: number }> = [
  { x: 10, y: 12 }, { x: 44, y: 4 }, { x: 78, y: 10 },
  { x: 3, y: 52 }, { x: 92, y: 42 },
  { x: 14, y: 88 }, { x: 52, y: 94 }, { x: 84, y: 82 },
]

/** Mono failure labels along the broken lines. */
const MARKS: Array<{ x: number; y: number }> = [
  { x: 24, y: 30 }, { x: 66, y: 68 }, { x: 30, y: 70 },
]

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
  return (
    <div ref={ref} className={cls}>
      {/* ── desktop scatter ── */}
      <div className="relative hidden md:block" style={{ height: 'clamp(340px, 34vw, 480px)' }}>
        <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {pts.map((p, i) => {
            const mx = (p.x + 50) / 2 + (i % 2 ? 4 : -4)
            const my = (p.y + 50) / 2 + (i % 3 ? -3 : 3)
            return (
              <path
                key={i}
                className="lg-line"
                pathLength={1}
                d={`M 50 50 Q ${mx} ${my}, ${p.x} ${p.y}`}
                stroke="rgba(200,106,58,0.4)"
                strokeWidth="1"
                strokeDasharray="3 5"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ transitionDelay: `${180 + i * 70}ms` }}
              />
            )
          })}
          {MARKS.map((m, i) => (
            <g key={`x${i}`} className="lg-line" style={{ transitionDelay: `${700 + i * 120}ms` }}>
              <line x1={m.x - 1} y1={m.y - 1.6} x2={m.x + 1} y2={m.y + 1.6} stroke={TERRA} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              <line x1={m.x + 1} y1={m.y - 1.6} x2={m.x - 1} y2={m.y + 1.6} stroke={TERRA} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </svg>

        {/* the guest, center */}
        <div className="lg-item absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(16px,1.6vw,22px)', color: '#1a1207', background: CREAM, borderRadius: 999, padding: 'clamp(12px,1.4vw,18px) clamp(24px,2.8vw,38px)', whiteSpace: 'nowrap', boxShadow: '0 18px 50px -18px rgba(0,0,0,0.7)' }}>
            {center}
          </div>
        </div>

        {/* the systems, scattered */}
        {pts.map((p, i) => (
          <div key={systems[i]} className="lg-item absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)', transitionDelay: `${120 + i * 60}ms` }}>
            <span style={chipStyle}>{systems[i]}</span>
          </div>
        ))}

        {/* the failure labels */}
        {MARKS.map((m, i) => (
          <div key={markers[i]} className="lg-item absolute" style={{ left: `${m.x}%`, top: `${m.y - 7}%`, transform: 'translate(-50%,-50%)', transitionDelay: `${820 + i * 120}ms` }}>
            <span style={{ ...MONO, fontSize: 'clamp(8px,0.8vw,11px)', letterSpacing: '.18em', color: 'rgba(242,233,218,0.45)', whiteSpace: 'nowrap' }}>{markers[i]}</span>
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
