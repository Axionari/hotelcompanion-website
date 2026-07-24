'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { intelLayerCopy } from '@/lib/i18n/marketing/intelLayer'

/**
 * "Not another app. One intelligent layer." — the operating-model diagram
 * (RC's §03 grammar applied to hotels). The guest on the left, the hotel's
 * existing systems on the right, the Companion as the single glowing layer in
 * between: one continuous experience, no new application.
 *
 * Motion: when the diagram enters the viewport the connector lines draw
 * (pathLength dash) and the nodes rise in sequence. Fail-open like Reveal —
 * the hidden state is only applied once JS arms the block, reduced motion and
 * no-JS render the composed still.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const SERIF = "var(--font-serif), Georgia, serif"
const TERRA = '#C86A3A'
const CREAM = '#F2EEE6'

/** Chip rows (percent Y) for the 2×4 systems grid on the design stage. */
const ROWS = [14, 38, 62, 86]

function SystemChip({ label, delay, style }: { label: string; delay: number; style?: CSSProperties }) {
  return (
    <div
      className="lg-item"
      style={{
        fontFamily: SANS,
        fontSize: 'clamp(11px, 1.05vw, 14px)',
        fontWeight: 500,
        color: 'rgba(242,233,218,0.85)',
        background: 'rgba(243,236,226,0.05)',
        border: '1px solid rgba(243,236,226,0.13)',
        borderRadius: 10,
        padding: 'clamp(9px,1vw,13px) 6px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {label}
    </div>
  )
}

export function IntelligentLayer() {
  const c = useCopy(intelLayerCopy)
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Already on screen at mount → render the still, no theatre.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return

    setArmed(true)
    let done = false
    const show = () => {
      if (done) return
      done = true
      setInView(true)
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(failsafe)
    }
    const near = () => el.getBoundingClientRect().top < window.innerHeight * 0.72
    const onScroll = () => { if (near()) show() }
    window.addEventListener('scroll', onScroll, { passive: true })
    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) show() }, { rootMargin: '0px 0px -28% 0px' })
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

  const guestPill: CSSProperties = {
    fontFamily: SERIF,
    fontWeight: 530,
    fontSize: 'clamp(15px, 1.5vw, 20px)',
    color: '#1a1207',
    background: CREAM,
    borderRadius: 999,
    padding: 'clamp(12px,1.4vw,18px) clamp(22px,2.6vw,36px)',
    whiteSpace: 'nowrap',
    boxShadow: '0 18px 50px -18px rgba(0,0,0,0.7)',
  }

  const centerNode: CSSProperties = {
    textAlign: 'center',
    border: '1px solid rgba(200,106,58,0.75)',
    borderRadius: 18,
    background: 'rgba(16,13,10,0.72)',
    boxShadow: '0 0 70px -12px rgba(200,106,58,0.4), inset 0 0 40px rgba(200,106,58,0.05)',
    padding: 'clamp(18px,2.2vw,30px) clamp(20px,2.6vw,38px)',
  }

  return (
    <section id="intelligent-layer" className="scroll-mt-20" style={{ paddingBlock: 'clamp(104px, 14vw, 190px)' }}>
      <div className="container-rc">
        {/* header */}
        <div className="mb-10 md:mb-16" style={{ maxWidth: '46rem' }}>
          <div className="eyebrow eyebrow-accent mb-6">{c.eyebrow}</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.015em', color: 'var(--text)', maxWidth: '17ch' }}>
            {c.h2Pre}
            <em style={{ fontStyle: 'italic', fontWeight: 480, color: CREAM }}>{c.h2Hi}</em>
          </h2>
          <p style={{ fontFamily: SANS, marginTop: 20, fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'var(--text-dim, rgba(242,233,220,.6))', maxWidth: '56ch', lineHeight: 1.6 }}>{c.body}</p>
        </div>

        <div ref={ref} className={`v5-layer ${armed ? 'armed' : ''} ${inView ? 'in' : ''}`}>
          {/* ── desktop diagram — guest → layer → the hotel's systems ── */}
          <div className="relative hidden md:block" style={{ height: 'clamp(300px, 30vw, 430px)' }}>
            {/* connector lines */}
            <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* guest → layer (layer left edge now at x=30) */}
              <path className="lg-line" pathLength={1} d="M 15 50 L 30 50" stroke={TERRA} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" style={{ transitionDelay: '100ms' }} />
              {/* layer → systems (fan, both columns; layer right edge now at x=70) */}
              {ROWS.map((y, i) => (
                <path key={`a${i}`} className="lg-line" pathLength={1} d={`M 70 50 C 71.5 50, 71.5 ${y}, 73.5 ${y}`} stroke="rgba(242,233,220,0.22)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" style={{ transitionDelay: `${340 + i * 90}ms` }} />
              ))}
              {ROWS.map((y, i) => (
                <path key={`b${i}`} className="lg-line" pathLength={1} d={`M 70 50 C 76 50, 82 ${y}, 87 ${y}`} stroke="rgba(242,233,220,0.13)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" style={{ transitionDelay: `${420 + i * 90}ms` }} />
              ))}
            </svg>

            {/* the guest */}
            <div className="lg-item absolute" style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}>
              <div style={guestPill}>{c.guest}</div>
            </div>

            {/* the layer — width holds the sub on one line (the category sub is
                wider than the old node; Spanish is wider still). Centred at 50%;
                the connector anchors below meet its edges at x=30 / x=70. */}
            <div className="lg-item absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '40%', transitionDelay: '160ms' }}>
              <div style={centerNode}>
                <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(17px, 1.9vw, 27px)', color: CREAM, whiteSpace: 'nowrap' }}>{c.center}</div>
                <div style={{ ...MONO, fontSize: 'clamp(8px, 0.8vw, 10.5px)', letterSpacing: '.16em', color: TERRA, marginTop: 10, whiteSpace: 'nowrap' }}>{c.centerSub}</div>
              </div>
            </div>

            {/* the systems it works with */}
            <div className="absolute grid grid-cols-2" style={{ right: 0, top: '4%', bottom: '4%', width: '27%', gap: 'clamp(8px,1vw,14px)', alignContent: 'space-between' }}>
              {c.systems.map((s, i) => (
                <SystemChip key={s} label={s} delay={480 + i * 70} />
              ))}
            </div>
          </div>

          {/* ── mobile — the same story, stacked ── */}
          <div className="md:hidden flex flex-col items-center">
            <div className="lg-item" style={guestPill}>{c.guest}</div>
            <div className="lg-item" aria-hidden style={{ width: 1.5, height: 44, background: `linear-gradient(180deg, ${TERRA}, rgba(200,106,58,0.25))`, transitionDelay: '120ms' }} />
            <div className="lg-item" style={{ ...centerNode, width: '100%', maxWidth: 360, transitionDelay: '200ms' }}>
              <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(19px, 5.4vw, 24px)', color: CREAM }}>{c.center}</div>
              <div style={{ ...MONO, fontSize: 'clamp(8.5px, 2.4vw, 10px)', letterSpacing: '.2em', color: TERRA, marginTop: 8 }}>{c.centerSub}</div>
            </div>
            <div className="lg-item" aria-hidden style={{ width: 1.5, height: 44, background: 'linear-gradient(180deg, rgba(242,233,220,0.35), rgba(242,233,220,0.08))', transitionDelay: '280ms' }} />
            <div className="grid grid-cols-2 w-full" style={{ gap: 10, maxWidth: 420 }}>
              {c.systems.map((s, i) => (
                <SystemChip key={s} label={s} delay={340 + i * 60} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
