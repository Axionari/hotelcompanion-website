'use client'

import { CSSProperties } from 'react'
import { useArmedIn, chipStyle } from './Diagrams'

/**
 * IntelligenceModel — the signature conceptual diagram. VERSION 1.
 *
 * One idea, and only one: every interaction becomes shared intelligence that
 * improves the whole organization.
 *
 * Rendered TWICE, at two altitudes, and the distinction matters:
 *
 *   /companion-os  — industry-agnostic. Interactions → the Companion Operating
 *                    System → people, teams, systems, operations. The engine.
 *   /platform      — the hospitality realisation. Guests → the Hospitality
 *                    Intelligence Platform → front desk, housekeeping, F&B.
 *
 * Companion OS is the engine; Hotel Companion is one implementation of it.
 * Keeping the OS diagram vertical-neutral is what makes the framework reusable
 * as Axionari expands past hospitality — so do NOT let hotel vocabulary leak
 * into the /companion-os copy. That is why the fields are named `nodeTitle`,
 * `recipients` and so on rather than `platform` and `departments`.
 *
 * This is a BUSINESS MODEL diagram, not an engineering one. It must never
 * acquire APIs, databases, queues, or arrows between services. If a future
 * revision is tempted to show how the software works, it has lost the plot —
 * the audience is a GM, an owner and an investor, in that order.
 *
 * The argument is carried by three moves:
 *   1. Many ways in, one layer.        (the surfaces converge)
 *   2. The layer is the product.       (the band is the only accented mass)
 *   3. It comes back around.           (the loop — outcomes teach the next
 *                                       conversation, so the hotel compounds)
 *
 * Move 3 is the differentiator. A funnel says "we process conversations";
 * the loop says "the hotel gets smarter." Do not drop it in a redesign.
 *
 * Fully data-driven and localised — every string comes from copy, so the model
 * can evolve on customer feedback without touching this file. Expect the
 * labels and outcomes to change; expect the three moves not to.
 *
 * v5 grammar only: hairline rules, mono labels, serif statements, accent used
 * once (the band). Reveal via the shared armed/in gate — fail-open, so reduced
 * motion and no-JS render the composed still.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SERIF = 'var(--font-serif), Georgia, serif'
const ACCENT = 'rgba(200,106,58,'
const RULE = 'rgba(243,236,226,0.13)'

export type IntelligenceModelCopy = {
  /** Mono eyebrow over the ways in. */
  inputsLabel: string
  /** The surfaces a guest can use. */
  inputs: ReadonlyArray<string>
  /** Connector label: inputs → band. */
  toBand: string
  /** The layer itself — the one serif mass in the figure. */
  nodeTitle: string
  /** The mono line beneath it. */
  nodeSub: string
  /** Connector label: band → who receives the intelligence. */
  toRecipients: string
  /** Who the intelligence reaches. Departments for a hotel; people, teams,
      systems and operations for the industry-agnostic version. */
  recipients: ReadonlyArray<string>
  /** Connector label: departments → outcomes. */
  toOutcomes: string
  outcomes: ReadonlyArray<string>
  /** The return path. The whole argument. */
  loop: string
}

/** Vertical hairline + mono label + vertical hairline. */
function Connector({ label, delay }: { label: string; delay: number }) {
  const rule = { width: 1.5, height: 'clamp(16px,1.9vw,24px)', background: `${ACCENT}0.55)` }
  return (
    <div className="lg-item flex flex-col items-center" style={{ transitionDelay: `${delay}ms` }}>
      <div aria-hidden style={rule} />
      <span
        style={{
          ...MONO,
          fontSize: 'clamp(8px,0.75vw,10px)',
          letterSpacing: '.2em',
          color: 'rgba(242,233,218,0.45)',
          padding: '7px 0',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
      <div aria-hidden style={rule} />
    </div>
  )
}

export function IntelligenceModel({ c }: { c: IntelligenceModelCopy }) {
  const { ref, cls } = useArmedIn()

  return (
    <div ref={ref} className={cls}>
      <figure style={{ margin: 0, maxWidth: 860, marginInline: 'auto' }}>
        <div className="flex flex-col items-center text-center">
          {/* ── in: many ways to ask ─────────────────────────────────── */}
          <div className="lg-item">
            <span style={{ ...MONO, fontSize: 'clamp(8px,0.78vw,10.5px)', letterSpacing: '.22em', color: `${ACCENT}0.9)` }}>
              {c.inputsLabel}
            </span>
          </div>
          <div
            className="lg-item flex flex-wrap justify-center"
            style={{ gap: 'clamp(6px,0.8vw,10px)', marginTop: 'clamp(14px,1.6vw,20px)', transitionDelay: '120ms' }}
          >
            {c.inputs.map((s) => (
              <span key={s} style={chipStyle}>
                {s}
              </span>
            ))}
          </div>

          <Connector label={c.toBand} delay={260} />

          {/* ── the layer ─────────────────────────────────────────────────
              Deliberately BLEEDS WIDER than everything above and below it.
              A band the same width as the chips reads as one more node in a
              stack; a band that runs past them reads as the ground they stand
              on. That is the whole psychological move — infrastructure, not a
              box — so keep the negative margin if this is ever restyled. */}
          <div
            className="lg-item"
            style={{
              alignSelf: 'stretch',
              marginInline: 'calc(-1 * clamp(10px, 4vw, 90px))',
              transitionDelay: '380ms',
              borderBlock: `1px solid ${ACCENT}0.75)`,
              background: `radial-gradient(130% 160% at 50% 50%, ${ACCENT}0.12) 0%, transparent 72%)`,
              padding: 'clamp(20px,2.4vw,32px) clamp(16px,2vw,28px)',
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontWeight: 530,
                fontSize: 'clamp(20px,2.5vw,34px)',
                lineHeight: 1.15,
                color: '#F2EEE6',
              }}
            >
              {c.nodeTitle}
            </div>
            <div
              aria-hidden
              style={{ height: 1, background: RULE, maxWidth: 220, margin: 'clamp(12px,1.4vw,18px) auto' }}
            />
            <div
              style={{
                ...MONO,
                fontSize: 'clamp(8.5px,0.8vw,11px)',
                letterSpacing: '.18em',
                lineHeight: 1.7,
                color: 'rgba(242,233,218,0.6)',
              }}
            >
              {c.nodeSub}
            </div>
          </div>

          <Connector label={c.toRecipients} delay={520} />

          {/* ── out: the whole hotel, not one inbox ───────────────────── */}
          <div
            className="lg-item flex flex-wrap justify-center"
            style={{ gap: 'clamp(6px,0.8vw,10px)', transitionDelay: '640ms' }}
          >
            {c.recipients.map((d) => (
              <span key={d} style={chipStyle}>
                {d}
              </span>
            ))}
          </div>

          <Connector label={c.toOutcomes} delay={760} />

          {/* ── what it is all for ────────────────────────────────────── */}
          <div
            className="lg-item grid w-full"
            style={{
              transitionDelay: '880ms',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              borderTop: `1px solid ${RULE}`,
            }}
          >
            {c.outcomes.map((o) => (
              <div key={o} style={{ padding: 'clamp(16px,1.8vw,24px) clamp(8px,1vw,14px)' }}>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 530,
                    fontSize: 'clamp(15px,1.5vw,20px)',
                    lineHeight: 1.25,
                    color: '#F2EEE6',
                  }}
                >
                  {o}
                </span>
              </div>
            ))}
          </div>

          {/* ── the loop: why this is not a funnel ────────────────────── */}
          <div
            className="lg-item w-full"
            style={{
              transitionDelay: '1000ms',
              borderTop: `1px solid ${ACCENT}0.45)`,
              paddingTop: 'clamp(12px,1.4vw,18px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <span aria-hidden style={{ ...MONO, fontSize: 'clamp(10px,1vw,13px)', color: `${ACCENT}0.9)` }}>
              ↑
            </span>
            <span
              style={{
                ...MONO,
                fontSize: 'clamp(8px,0.75vw,10px)',
                letterSpacing: '.2em',
                color: 'rgba(242,233,218,0.5)',
              }}
            >
              {c.loop}
            </span>
          </div>
        </div>
      </figure>
    </div>
  )
}
