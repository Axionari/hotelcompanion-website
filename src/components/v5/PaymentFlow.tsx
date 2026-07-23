'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { NumberedList } from '@/components/v5/Editorial'

/**
 * PaymentFlow — the hybrid checkout diagram, in the HC/RC editorial register.
 * Three lanes — The guest (companion screen) → Hotel Companion (booking &
 * guest records) → Stripe (PCI Level 1 vault). The order is captured on the
 * companion screen; the raw card data routes straight down to the vault,
 * visibly bypassing Hotel Companion; only a tokenized reference returns to
 * the booking record. No engineering vocabulary — the audience is hoteliers.
 *
 * Motion reuses the .v5-layer armed/in gate (globals.css): the flow paths draw
 * (pathLength dash), glyphs and notes fade in, the vault breathes. Fail-open —
 * reduced motion and no-JS render the composed still. Mobile stacks the lanes.
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
  record: { title: string; row: string; token: string }
  steps: ReadonlyArray<{ name: string; desc: string }>
}

function laneLabel(x: number, yLabel: number, label: string, sub: string, accent = false) {
  return (
    <g className="pay-fade">
      <text x={x} y={yLabel} style={{ ...MONO, fontSize: 13, letterSpacing: '0.18em', fill: accent ? TERRA : FAINT }}>
        {label}
      </text>
      <text x={x} y={yLabel + 28} style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 19, fill: CREAM }}>
        {sub}
      </text>
    </g>
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
  const note = splitNote(copy.bypass)

  return (
    <div>
      <div ref={ref} className={`v5-layer ${armed ? 'armed' : ''} ${inView ? 'in' : ''}`}>
        {/* ── desktop diagram ── */}
        <div className="hidden md:block">
          <svg viewBox="0 0 1000 560" width="100%" role="img" aria-label={copy.statement} style={{ display: 'block' }}>
            <defs>
              <linearGradient id="pay-band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(247,242,234,0.05)" />
                <stop offset="100%" stopColor="rgba(247,242,234,0.015)" />
              </linearGradient>
              <radialGradient id="pay-vault-glow">
                <stop offset="0%" stopColor="rgba(200,106,58,0.35)" />
                <stop offset="60%" stopColor="rgba(200,106,58,0.12)" />
                <stop offset="100%" stopColor="rgba(200,106,58,0)" />
              </radialGradient>
            </defs>

            {/* lane bands */}
            {[20, 200, 380].map((y, i) => (
              <rect key={y} className="pay-fade" x={36} y={y} width={928} height={i === 2 ? 150 : 140} rx={20} fill="url(#pay-band)" stroke={HAIR} style={fadeStyle(i * 90)} />
            ))}

            {laneLabel(70, 82, copy.lanes.client.label, copy.lanes.client.sub)}
            {laneLabel(70, 262, copy.lanes.api.label, copy.lanes.api.sub)}
            {laneLabel(70, 444, copy.lanes.stripe.label, copy.lanes.stripe.sub, true)}

            {/* ── lane 1: the companion pay card ── */}
            <g className="pay-fade" style={fadeStyle(140)}>
              <rect x={340} y={40} width={280} height={100} rx={14} fill="#161310" stroke="rgba(242,238,230,0.16)" />
              <circle cx={362} cy={62} r={2.6} fill="rgba(242,238,230,0.24)" />
              <circle cx={374} cy={62} r={2.6} fill="rgba(242,238,230,0.24)" />
              <circle cx={386} cy={62} r={2.6} fill="rgba(242,238,230,0.24)" />
              <text x={360} y={96} style={{ ...MONO, fontSize: 12, letterSpacing: '0.08em', fill: DIM }}>{copy.device.total}</text>
              <text x={360} y={124} style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 24, fill: CREAM }}>{copy.device.amount}</text>
              <rect x={492} y={98} width={110} height={30} rx={15} fill={TERRA} />
              <text x={547} y={118} textAnchor="middle" style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13, fill: '#1a1207' }}>{copy.device.cta}</text>
            </g>

            {/* ── lane 2: the booking record — a token, never the card ── */}
            <g className="pay-fade" style={fadeStyle(260)}>
              <rect x={340} y={222} width={280} height={98} rx={14} fill="#14110e" stroke="rgba(242,238,230,0.14)" />
              <text x={360} y={250} style={{ ...MONO, fontSize: 11.5, letterSpacing: '0.1em', fill: TERRA }}>{copy.record.title}</text>
              <text x={360} y={274} style={{ fontFamily: SANS, fontSize: 13.5, fill: 'rgba(242,238,230,0.85)' }}>{copy.record.row}</text>
              <rect x={358} y={286} width={216} height={24} rx={12} fill="rgba(201,161,90,0.08)" stroke="rgba(201,161,90,0.35)" />
              <text x={466} y={302} textAnchor="middle" style={{ ...MONO, fontSize: 10, letterSpacing: '0.06em', fill: 'rgba(201,161,90,0.9)' }}>{copy.record.token}</text>
            </g>

            {/* ── lane 3: the vault ── */}
            <g className="pay-fade" style={fadeStyle(620)}>
              <circle cx={480} cy={455} r={62} fill="url(#pay-vault-glow)" />
              <circle cx={480} cy={455} r={44} fill="none" stroke="rgba(200,106,58,0.25)" />
              <g className="v5-pay-vault" stroke={TERRA} strokeWidth={2.6} fill="none">
                <path d="M 464 452 v -9 a 16 16 0 0 1 32 0 v 9" />
                <rect x={455} y={452} width={50} height={38} rx={7} fill="rgba(200,106,58,0.12)" />
                <circle cx={480} cy={467} r={4.5} fill={TERRA} stroke="none" />
                <line x1={480} y1={467} x2={480} y2={479} strokeWidth={2.6} />
              </g>
            </g>

            {/* ── the card-data path: screen → straight to the vault ── */}
            {/* glow underlay */}
            <path
              className="pay-draw"
              pathLength={1}
              d="M 620 90 H 758 Q 776 90 776 108 V 437 Q 776 455 758 455 H 552"
              stroke="rgba(200,106,58,0.16)"
              strokeWidth={11}
              fill="none"
              strokeLinecap="round"
              style={drawStyle(220)}
            />
            <path
              className="pay-draw"
              pathLength={1}
              d="M 620 90 H 758 Q 776 90 776 108 V 437 Q 776 455 758 455 H 552"
              stroke={TERRA}
              strokeWidth={3.5}
              fill="none"
              strokeLinecap="round"
              style={drawStyle(220)}
            />
            <polygon className="pay-fade" style={fadeStyle(1500)} points="548,455 562,448 562,462" fill={TERRA} />
            <path className="pay-fade" style={fadeStyle(1150)} d="M 768 276 l 8 9 l 8 -9" stroke={TERRA} strokeWidth={2.2} fill="none" />

            {/* bypass note, right of the descending path */}
            <g className="pay-fade" style={fadeStyle(1280)}>
              <text x={800} y={252} style={{ fontFamily: SANS, fontSize: 14.5, fill: DIM }}>{note[0]}</text>
              <text x={800} y={274} style={{ fontFamily: SANS, fontSize: 14.5, fill: DIM }}>{note[1]}</text>
              <text x={800} y={296} style={{ fontFamily: SANS, fontSize: 14.5, fill: DIM }}>{note[2]}</text>
            </g>

            {/* ── the return: a token, up into the booking record ── */}
            <path
              className="pay-draw"
              pathLength={1}
              d="M 452 412 C 424 384, 424 342, 448 314"
              stroke="rgba(201,161,90,0.55)"
              strokeWidth={2}
              strokeDasharray="6 6"
              fill="none"
              style={{ transitionDelay: '1100ms' }}
            />
            <polygon className="pay-fade" style={fadeStyle(2050)} points="448,308 442,322 456,319" fill="rgba(201,161,90,0.7)" />
            <text className="pay-fade" x={480} y={366} textAnchor="middle" style={{ ...MONO, ...fadeStyle(1850), fontSize: 12, letterSpacing: '0.06em', fill: 'rgba(201,161,90,0.8)' }}>
              {copy.token}
            </text>
          </svg>
        </div>

        {/* ── mobile: stacked lanes ── */}
        <div className="md:hidden flex flex-col gap-3">
          {[
            { ...copy.lanes.client, note: copy.device.total + ' · ' + copy.device.amount, accent: false },
            { ...copy.lanes.api, note: copy.record.token, accent: false },
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
