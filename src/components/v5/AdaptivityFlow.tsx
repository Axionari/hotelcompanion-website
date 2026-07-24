'use client'

import { CSSProperties } from 'react'
import { useArmedIn } from './Diagrams'

/**
 * AdaptivityFlow — four guest types, four different conversations, one
 * destination. RC's adaptivity figure applied to hotels.
 *
 * The argument is the CONVERGENCE: the lanes are visibly different lengths and
 * different waypoints, and they still land on the same outcome. That is what
 * "zero scripts" means — not one flow with branches, but four conversations the
 * Companion runs differently on purpose.
 *
 * Two renderings, because a 4-lane convergence cannot survive 390px:
 *   ≥900px  SVG, curves and all — the convergence is the point, so it needs to
 *           be seen as one figure.
 *   <900px  the same lanes stacked as rows, with the destination stated once
 *           underneath. No curves; implying them at that width just produces
 *           spaghetti.
 *
 * Lane colours are the only place this diagram uses more than one accent. They
 * are identity, not decoration — each lane must stay visually traceable from
 * its label to the node.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const SERIF = 'var(--font-serif), Georgia, serif'
const CREAM = '#F2EEE6'
const DIM = 'rgba(242,233,218,0.55)'
const ACCENT = '#C86A3A'

/** One colour per lane, so a lane stays traceable end to end. */
const LANE_COLORS = ['#C86A3A', '#D98E6A', '#7FA88C', '#C9A15A']

export type AdaptivityCopy = {
  lanes: ReadonlyArray<{ label: string; steps: ReadonlyArray<string> }>
  node: ReadonlyArray<string>
  caption: string
}

/* ── geometry (viewBox units) ─────────────────────────────────────────── */
const VB_W = 1200
const VB_H = 620
const LANE_Y = [80, 225, 370, 515]
const TRACK_X0 = 240
const TRACK_X1 = 770
// Node is wide enough for the longest destination string in EITHER locale —
// Spanish runs longer ("Reservado → Confirmado → Recordado"), so size for it.
const NODE_X = 855
const NODE_Y = 255
const NODE_W = 330
const NODE_H = 84
const NODE_MID = NODE_Y + NODE_H / 2

export function AdaptivityFlow({ c }: { c: AdaptivityCopy }) {
  const { ref, cls } = useArmedIn()

  return (
    <div ref={ref} className={cls}>
      {/* ── wide: the whole figure, convergence intact ─────────────────── */}
      <figure className="adapt-wide" style={{ margin: 0 }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width="100%"
          role="img"
          aria-label={`${c.lanes.map((l) => l.label).join(', ')} — all reaching ${c.node.join(', ')}`}
          style={{ display: 'block', overflow: 'visible' }}
        >
          {c.lanes.map((lane, i) => {
            const y = LANE_Y[i]
            const color = LANE_COLORS[i]
            const n = lane.steps.length
            // waypoints spread evenly along the track
            const gap = (TRACK_X1 - TRACK_X0 - 120) / Math.max(n - 1, 1)
            const dotX = lane.steps.map((_, k) => TRACK_X0 + 60 + k * gap)
            return (
              <g key={lane.label} className="lg-item" style={{ transitionDelay: `${140 + i * 130}ms` }}>
                {/* lane label */}
                <rect x={0} y={y - 22} width={210} height={44} rx={22}
                  fill="rgba(243,236,226,0.04)" stroke="rgba(243,236,226,0.13)" />
                <rect x={0} y={y - 22} width={4} height={44} rx={2} fill={color} />
                <text x={26} y={y + 5} style={{ fontFamily: SANS, fontSize: 15, fill: CREAM }}>
                  {lane.label}
                </text>

                {/* the track */}
                <line x1={TRACK_X0} y1={y} x2={TRACK_X1} y2={y}
                  stroke={color} strokeOpacity={0.55} strokeWidth={1.5}
                  strokeDasharray="2 9" strokeLinecap="round" className="v5-adapt-line" />

                {/* waypoints */}
                {dotX.map((x, k) => (
                  <g key={lane.steps[k]}>
                    <text x={x} y={y - 20} textAnchor="middle"
                      style={{ ...MONO, fontSize: 11.5, letterSpacing: '0.12em', fill: DIM }}>
                      {lane.steps[k]}
                    </text>
                    <circle cx={x} cy={y} r={5.5} fill={color} />
                  </g>
                ))}

                {/* the convergence */}
                <path
                  d={`M ${TRACK_X1} ${y} C ${TRACK_X1 + 70} ${y}, ${NODE_X - 70} ${NODE_MID}, ${NODE_X} ${NODE_MID}`}
                  fill="none" stroke={color} strokeOpacity={0.55} strokeWidth={1.5}
                  strokeDasharray="2 9" strokeLinecap="round" className="v5-adapt-line"
                />
              </g>
            )
          })}

          {/* the one destination */}
          <g className="lg-item" style={{ transitionDelay: '760ms' }}>
            <rect x={NODE_X} y={NODE_Y} width={NODE_W} height={NODE_H} rx={18}
              fill="rgba(16,13,10,0.75)" stroke={ACCENT} strokeOpacity={0.8} strokeWidth={1.5} />
            <text x={NODE_X + NODE_W / 2} y={NODE_MID + 6} textAnchor="middle"
              style={{ fontFamily: SANS, fontWeight: 600, fontSize: 15, fill: CREAM }}>
              {c.node.map((word, i) => (
                <tspan key={word}>
                  {i > 0 && <tspan style={{ fill: ACCENT }}>{'  →  '}</tspan>}
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        </svg>
        <div className="lg-item" style={{ transitionDelay: '880ms', textAlign: 'center', marginTop: 'clamp(14px,1.6vw,22px)' }}>
          <span style={{ ...MONO, fontSize: 'clamp(8px,0.75vw,10px)', letterSpacing: '.2em', color: 'rgba(242,233,218,0.4)' }}>
            {c.caption}
          </span>
        </div>
      </figure>

      {/* ── narrow: same lanes, stacked; destination stated once ────────── */}
      <div className="adapt-narrow">
        {c.lanes.map((lane, i) => (
          <div
            key={lane.label}
            className="lg-item"
            style={{
              transitionDelay: `${120 + i * 110}ms`,
              borderLeft: `3px solid ${LANE_COLORS[i]}`,
              paddingLeft: 16,
              marginBottom: 22,
            }}
          >
            <div style={{ fontFamily: SANS, fontSize: 15, color: CREAM, marginBottom: 10 }}>{lane.label}</div>
            <div className="flex flex-wrap" style={{ gap: '6px 10px' }}>
              {lane.steps.map((s, k) => (
                <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {k > 0 && <span aria-hidden style={{ color: 'rgba(242,233,218,0.3)' }}>·</span>}
                  <span style={{ ...MONO, fontSize: 10.5, letterSpacing: '.12em', color: DIM }}>{s}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
        <div
          className="lg-item"
          style={{
            transitionDelay: '600ms',
            marginTop: 26,
            borderTop: `1px solid rgba(200,106,58,0.45)`,
            paddingTop: 18,
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(17px,4.4vw,22px)', color: CREAM }}>
            {c.node.join(' → ')}
          </div>
          <div style={{ ...MONO, fontSize: 9.5, letterSpacing: '.18em', color: 'rgba(242,233,218,0.4)', marginTop: 10 }}>
            {c.caption}
          </div>
        </div>
      </div>
    </div>
  )
}
