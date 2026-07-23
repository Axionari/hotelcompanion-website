'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { NumberedList } from '@/components/v5/Editorial'

/**
 * PaymentFlow — the hybrid checkout diagram, in the HC/RC editorial register
 * (terracotta + cream on the page bed, not the gold blueprint). Three stacked
 * lanes — Client (Next.js) → Serverless API (Postgres) → Stripe (PCI Level 1)
 * — with the order captured on the companion screen, the raw card data routed
 * straight down to Stripe (bypassing the Axionari backend), and only a token
 * returning to Postgres. The five steps read below as a numbered legend.
 *
 * Motion reuses the .v5-layer armed/in gate (see globals.css): flow paths draw
 * (pathLength dash), glyphs and notes fade in. Fail-open — reduced motion and
 * no-JS render the composed still.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const SERIF = 'var(--font-serif), Georgia, serif'
const TERRA = '#C86A3A'
const CREAM = '#F2EEE6'
const DIM = 'rgba(242,238,230,0.55)'
const FAINT = 'rgba(242,238,230,0.3)'
const HAIR = 'rgba(242,238,230,0.09)'

export interface PaymentCopy {
  statement: string
  deck: string
  lanes: {
    client: { label: string; sub: string }
    api: { label: string; sub: string }
    stripe: { label: string; sub: string }
  }
  device: { total: string; amount: string; cta: string }
  bypass: string
  token: string
  steps: ReadonlyArray<{ name: string; desc: string }>
}

/** One lane band (label + sub on the left). */
function laneLabel(x: number, yLabel: number, label: string, sub: string, accent = false) {
  return (
    <g className="pay-fade">
      <text x={x} y={yLabel} style={{ ...MONO, fontSize: 13, letterSpacing: '0.18em', fill: accent ? TERRA : FAINT }}>
        {label}
      </text>
      <text x={x} y={yLabel + 26} style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 18, fill: CREAM }}>
        {sub}
      </text>
    </g>
  )
}

export function PaymentFlow({ copy }: { copy: PaymentCopy }) {
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
    const near = () => el.getBoundingClientRect().top < window.innerHeight * 0.72
    const onScroll = () => { if (near()) show() }
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

  const drawStyle = (delayMs: number): CSSProperties => ({ strokeDasharray: 1, strokeDashoffset: 0, transitionDelay: `${delayMs}ms` })
  const fadeStyle = (delayMs: number): CSSProperties => ({ transitionDelay: `${delayMs}ms` })

  return (
    <div>
      <div ref={ref} className={`v5-layer ${armed ? 'armed' : ''} ${inView ? 'in' : ''}`}>
        {/* ── desktop diagram ── */}
        <div className="hidden md:block">
          <svg viewBox="0 0 1000 552" width="100%" role="img" aria-label={copy.statement} style={{ display: 'block' }}>
            {/* lane bands */}
            {[36, 206, 376].map((y) => (
              <rect key={y} className="pay-fade" x={40} y={y} width={920} height={148} rx={18} fill="rgba(242,238,230,0.02)" stroke={HAIR} />
            ))}

            {laneLabel(72, 96, copy.lanes.client.label, copy.lanes.client.sub)}
            {laneLabel(72, 266, copy.lanes.api.label, copy.lanes.api.sub)}
            {laneLabel(72, 436, copy.lanes.stripe.label, copy.lanes.stripe.sub, true)}

            {/* ── Client lane: the companion screen ── */}
            <g className="pay-fade" style={fadeStyle(120)}>
              <rect x={356} y={62} width={244} height={96} rx={12} fill="#161310" stroke="rgba(242,238,230,0.14)" />
              <circle cx={376} cy={82} r={2.4} fill="rgba(242,238,230,0.22)" />
              <circle cx={387} cy={82} r={2.4} fill="rgba(242,238,230,0.22)" />
              <circle cx={398} cy={82} r={2.4} fill="rgba(242,238,230,0.22)" />
              <text x={374} y={116} style={{ ...MONO, fontSize: 11, letterSpacing: '0.08em', fill: DIM }}>{copy.device.total}</text>
              <text x={374} y={142} style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 21, fill: CREAM }}>{copy.device.amount}</text>
              <rect x={480} y={116} width={100} height={28} rx={14} fill={TERRA} />
              <text x={530} y={134} textAnchor="middle" style={{ fontFamily: SANS, fontWeight: 600, fontSize: 12.5, fill: '#1a1207' }}>{copy.device.cta}</text>
            </g>

            {/* ── Serverless lane: the backend the raw card data bypasses ── */}
            <g className="pay-fade" style={fadeStyle(220)}>
              {/* node cluster */}
              {[[372, 250], [372, 312], [508, 250], [508, 312]].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width={22} height={22} rx={4} fill="rgba(242,238,230,0.05)" stroke="rgba(242,238,230,0.14)" />
              ))}
              <line x1={394} y1={261} x2={430} y2={281} stroke={HAIR} />
              <line x1={394} y1={323} x2={430} y2={299} stroke={HAIR} />
              <line x1={508} y1={261} x2={470} y2={281} stroke={HAIR} />
              <line x1={508} y1={323} x2={470} y2={299} stroke={HAIR} />
              {/* Postgres cylinder */}
              <g stroke="rgba(242,238,230,0.22)" fill="rgba(242,238,230,0.04)">
                <ellipse cx={450} cy={266} rx={22} ry={7} />
                <path d="M 428 266 V 300 A 22 7 0 0 0 472 300 V 266" fill="rgba(242,238,230,0.04)" />
                <ellipse cx={450} cy={283} rx={22} ry={7} fill="none" opacity={0.6} />
              </g>
            </g>

            {/* ── Stripe lane: the PCI vault ── */}
            <g className="pay-fade" style={fadeStyle(600)}>
              <circle cx={470} cy={450} r={54} fill="rgba(200,106,58,0.06)" />
              <g className="v5-pay-vault" stroke={TERRA} strokeWidth={2.4} fill="none">
                <path d="M 456 448 v -8 a 14 14 0 0 1 28 0 v 8" />
                <rect x={448} y={448} width={44} height={34} rx={6} fill="rgba(200,106,58,0.10)" />
                <circle cx={470} cy={462} r={4} fill={TERRA} stroke="none" />
                <line x1={470} y1={462} x2={470} y2={472} strokeWidth={2.4} />
              </g>
            </g>

            {/* ── main flow: card data → straight to Stripe (bypasses backend) ── */}
            <path
              className="pay-draw"
              pathLength={1}
              d="M 600 116 H 786 Q 800 116 800 130 V 436 Q 800 450 786 450 H 540"
              stroke={TERRA}
              strokeWidth={3}
              fill="none"
              style={drawStyle(180)}
            />
            {/* arrowhead into the vault */}
            <polygon className="pay-fade" style={fadeStyle(1500)} points="540,450 552,444 552,456" fill={TERRA} />
            {/* direction chevron mid-descent */}
            <path className="pay-fade" style={fadeStyle(1200)} d="M 793 300 l 7 8 l 7 -8" stroke={TERRA} strokeWidth={2} fill="none" />

            {/* bypass note */}
            <g className="pay-fade" style={fadeStyle(1300)}>
              <text x={824} y={288} style={{ fontFamily: SANS, fontSize: 14, fill: DIM }}>{splitNote(copy.bypass)[0]}</text>
              <text x={824} y={309} style={{ fontFamily: SANS, fontSize: 14, fill: DIM }}>{splitNote(copy.bypass)[1]}</text>
              <text x={824} y={330} style={{ fontFamily: SANS, fontSize: 14, fill: DIM }}>{splitNote(copy.bypass)[2]}</text>
            </g>

            {/* ── return flow: tokenized reference → Postgres (dashed) ── */}
            <path
              className="pay-draw"
              pathLength={1}
              d="M 452 420 C 430 384, 430 340, 448 306"
              stroke="rgba(242,238,230,0.42)"
              strokeWidth={1.6}
              strokeDasharray="5 5"
              fill="none"
              style={{ transitionDelay: '1100ms' }}
            />
            <polygon className="pay-fade" style={fadeStyle(2100)} points="448,300 444,312 454,310" fill="rgba(242,238,230,0.5)" />
            <text className="pay-fade" style={{ ...MONO, ...fadeStyle(1900) }} x={356} y={372} fontSize={11.5} letterSpacing="0.04em" fill={FAINT}>
              {copy.token}
            </text>
          </svg>
        </div>

        {/* ── mobile: stacked lanes ── */}
        <div className="md:hidden flex flex-col gap-3">
          {[
            { ...copy.lanes.client, note: copy.device.total + ' · ' + copy.device.amount, accent: false },
            { ...copy.lanes.api, note: copy.token, accent: false },
            { ...copy.lanes.stripe, note: copy.bypass, accent: true },
          ].map((lane, i) => (
            <div key={lane.label}>
              <div className="pay-fade v5-card" style={{ padding: '20px 22px', ...fadeStyle(i * 120) }}>
                <div className="eyebrow" style={{ color: lane.accent ? TERRA : FAINT }}>{lane.label}</div>
                <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 20, color: CREAM, marginTop: 4 }}>{lane.sub}</div>
                <div style={{ fontFamily: SANS, fontSize: 13.5, color: DIM, marginTop: 8 }}>{lane.note}</div>
              </div>
              {i < 2 && (
                <div className="pay-fade" aria-hidden style={{ width: 1.5, height: 24, margin: '0 auto', background: `linear-gradient(${TERRA}, rgba(200,106,58,0.2))`, ...fadeStyle(i * 120 + 60) }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── the five steps, as a numbered legend ── */}
      <div className="mt-14 md:mt-16">
        <NumberedList items={copy.steps.map((s) => ({ title: s.name, body: s.desc }))} />
      </div>
    </div>
  )
}

/** Break the bypass note into ~3 balanced lines for the SVG annotation. */
function splitNote(note: string): [string, string, string] {
  const words = note.split(' ')
  const third = Math.ceil(words.length / 3)
  return [
    words.slice(0, third).join(' '),
    words.slice(third, third * 2).join(' '),
    words.slice(third * 2).join(' '),
  ]
}
