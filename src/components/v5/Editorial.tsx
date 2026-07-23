'use client'

import { ReactNode } from 'react'
import { Reveal } from '@/components/cds/Reveal'

/**
 * Editorial — the RC subpage grammar as shared primitives (Phase 5 rollout).
 *
 * Derived from restaurantcompanion.ai's subpages (Product / Features /
 * Enterprise / Pilot / Company / Demo), which all speak one grammar:
 *
 *   1. PAGE HERO — mono-caps eyebrow (the page's name), one editorial
 *      statement H1 with an italic emphasis, one short deck paragraph,
 *      a single primary action, and one supporting device/visual.
 *   2. PROOF CHIPS — a quiet hairline band of mono-caps claims.
 *   3. NUMBERED ACTS — `01 · LABEL` eyebrow + a claim-as-headline (a
 *      sentence, never a category name) + at most one short paragraph +
 *      exactly ONE supporting artifact (device UI, diagram, numbered
 *      principles, or a statement-card row). One message per section.
 *   4. CLOSING HAND-OFF — a pointer to the next page, not a heavy CTA.
 *
 * Type scale, rhythm and tokens match HomeClient (RC-measured): Fraunces 530,
 * section rhythm clamp(104px,14vw,190px), page bed #100e0c.
 */

export const SERIF = 'var(--font-serif), Georgia, serif'

export function Em({ children }: { children: ReactNode }) {
  return (
    <em style={{ fontStyle: 'italic', fontWeight: 480, color: 'var(--cream, #F2EEE6)' }}>
      {children}
    </em>
  )
}

/** Generous RC section rhythm; one page background, air over banding. */
export function Band({
  children,
  id,
  tight = false,
}: {
  children: ReactNode
  id?: string
  tight?: boolean
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20"
      style={{ paddingBlock: tight ? 'clamp(72px, 9vw, 128px)' : 'clamp(104px, 14vw, 190px)' }}
    >
      <div className="container-rc">{children}</div>
    </section>
  )
}

/**
 * Subpage hero — RC subpage composition: flat page bed (no photo), text left,
 * one device/visual right. The H1 is one editorial statement.
 */
export function PageHero({
  eyebrow,
  title,
  deck,
  actions,
  visual,
}: {
  eyebrow: string
  title: ReactNode
  deck?: string
  actions?: ReactNode
  visual?: ReactNode
}) {
  return (
    <section style={{ paddingBlock: 'clamp(88px, 11vw, 160px)' }}>
      <div className="container-rc">
        <div className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
          <div className={visual ? 'lg:col-span-6' : 'lg:col-span-8'}>
            <div className="eyebrow eyebrow-accent mb-6">{eyebrow}</div>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 530,
                fontSize: 'clamp(34px, 4.5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: 'var(--text)',
                maxWidth: '16ch',
              }}
            >
              {title}
            </h1>
            {deck && (
              <p className="body-lead mt-7" style={{ maxWidth: '46ch' }}>
                {deck}
              </p>
            )}
            {actions && (
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {actions}
              </div>
            )}
          </div>
          {visual && (
            <div className="lg:col-span-6">
              <Reveal>{visual}</Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/** Quiet trust row — mono-caps claims on a hairline band (RC proof strip). */
export function ChipStrip({ chips }: { chips: ReadonlyArray<string> }) {
  return (
    <div style={{ background: 'var(--surface-1)', borderBlock: '1px solid var(--border-soft)' }}>
      <div className="container-rc py-6 flex flex-wrap gap-x-8 gap-y-3">
        {chips.map((chip) => (
          <span key={chip} className="eyebrow" style={{ color: 'var(--text-faint)' }}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * A numbered act: `01 · LABEL` + claim-as-headline + optional deck +
 * exactly one artifact (children). The core RC section.
 */
export function Act({
  no,
  label,
  statement,
  deck,
  children,
  id,
  tight,
}: {
  no?: string
  label?: string
  statement: ReactNode
  deck?: string
  children?: ReactNode
  id?: string
  tight?: boolean
}) {
  return (
    <Band id={id} tight={tight}>
      <Reveal>
        {(no || label) && (
          <div className="eyebrow eyebrow-accent mb-6">
            {no}
            {no && label ? ' · ' : ''}
            {label}
          </div>
        )}
        <h2
          style={{
            fontFamily: SERIF,
            fontWeight: 530,
            fontSize: 'clamp(30px, 4vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: '-0.012em',
            color: 'var(--text)',
            maxWidth: '22ch',
          }}
        >
          {statement}
        </h2>
        {deck && (
          <p className="body-lead mt-7" style={{ maxWidth: '52ch' }}>
            {deck}
          </p>
        )}
      </Reveal>
      {children && <div className="mt-14">{children}</div>}
    </Band>
  )
}

/** RC's 01..05 principle list — hairline rows, mono number, serif claim. */
export function NumberedList({
  items,
}: {
  items: ReadonlyArray<{ title: string; body?: string }>
}) {
  return (
    <div>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={Math.min(i, 6) * 60}>
          <div
            className="grid md:grid-cols-12 gap-x-10 py-7 items-baseline"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            <div
              className="md:col-span-1 eyebrow"
              style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="md:col-span-5">
              <p style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(19px, 2vw, 25px)', lineHeight: 1.3, color: 'var(--text)' }}>
                {it.title}
              </p>
            </div>
            {it.body && (
              <div className="md:col-span-6 mt-2 md:mt-0">
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)' }}>{it.body}</p>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** RC's statement-card row (2–3 across): mono eyebrow + serif claim + body. */
export function StatementCards({
  items,
  columns = 3,
}: {
  items: ReadonlyArray<{ eyebrow?: string; title: string; body: string }>
  columns?: 2 | 3
}) {
  return (
    <div className={`grid gap-x-12 gap-y-12 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={Math.min(i, 4) * 80}>
          <div className="pt-6" style={{ borderTop: '1px solid var(--border-soft)' }}>
            {it.eyebrow && <div className="eyebrow eyebrow-accent mb-4">{it.eyebrow}</div>}
            <p style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.25, color: 'var(--text)', maxWidth: '18ch' }}>
              {it.title}
            </p>
            <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '38ch' }}>
              {it.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Quiet mono chips for enumerations (replaces the old dense icon grids). */
export function QuietChips({ items }: { items: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((chip) => (
        <span
          key={chip}
          className="eyebrow"
          style={{
            border: '1px solid var(--chip-border, rgba(201,139,78,.3))',
            borderRadius: 999,
            padding: '10px 18px',
            color: 'var(--text-dim)',
          }}
        >
          {chip.replace(/\.$/, '')}
        </span>
      ))}
    </div>
  )
}

/**
 * TenantStack — RC's enterprise architecture artifact: a vertical stack of
 * boxed tiers (your org → the product layer → the foundation), joined by a
 * short accent connector, the product tier highlighted, with a mono caption
 * beneath. One idea: "one platform sits between your organization and the
 * foundation it runs on."
 */
export function TenantStack({
  tiers,
  caption,
}: {
  tiers: ReadonlyArray<{
    eyebrow: string
    title: string
    sub?: string
    chips: ReadonlyArray<string>
    highlight?: boolean
  }>
  caption?: string
}) {
  return (
    <div>
      {tiers.map((t, i) => (
        <div key={t.eyebrow}>
          <Reveal delay={i * 90}>
            <div
              className="rounded-2xl"
              style={{
                border: t.highlight ? '1px solid var(--accent)' : '1px solid var(--border-soft)',
                background: t.highlight ? 'rgba(200,106,58,0.06)' : 'var(--surface-1)',
                boxShadow: t.highlight ? '0 0 60px rgba(200,106,58,0.12)' : 'none',
                padding: 'clamp(24px, 3vw, 40px)',
              }}
            >
              <div className="eyebrow mb-3" style={{ color: t.highlight ? 'var(--accent)' : 'var(--text-faint)' }}>
                {t.eyebrow}
              </div>
              <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.15, color: 'var(--text)' }}>
                {t.title}
              </div>
              {t.sub && (
                <div className="mt-1.5" style={{ fontSize: 14, color: 'var(--text-dim)' }}>
                  {t.sub}
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {t.chips.map((chip) => (
                  <span
                    key={chip}
                    className="eyebrow"
                    style={{ border: '1px solid var(--chip-border, rgba(201,139,78,.3))', borderRadius: 999, padding: '8px 14px', color: 'var(--text-dim)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          {i < tiers.length - 1 && (
            <div
              aria-hidden="true"
              style={{ width: 2, height: 'clamp(20px, 3vw, 34px)', background: 'linear-gradient(var(--accent), rgba(200,106,58,0.25))', margin: '0 auto' }}
            />
          )}
        </div>
      ))}
      {caption && (
        <Reveal>
          <p className="eyebrow mt-8" style={{ color: 'var(--text-faint)', textAlign: 'center' }}>
            {caption}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/**
 * PostureSplit — RC's privacy/security artifact: numbered principles on the
 * left, a labeled "posture" card on the right (LABEL eyebrow → one-line value).
 * One idea, shown as claim + posture at a glance.
 */
export function PostureSplit({
  principles,
  postureLabel,
  postureTag,
  posture,
}: {
  principles: ReadonlyArray<string>
  postureLabel: string
  postureTag?: string
  posture: ReadonlyArray<{ label: string; value: string }>
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-6">
        {principles.map((p, i) => (
          <Reveal key={p} delay={Math.min(i, 6) * 50}>
            <div className="grid grid-cols-12 gap-x-6 py-5 items-baseline" style={{ borderTop: '1px solid var(--border-soft)' }}>
              <div className="col-span-2 eyebrow" style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="col-span-10">
                <p style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.5, color: 'var(--text)' }}>{p}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="lg:col-span-6">
        <Reveal delay={140}>
          <div className="rounded-2xl" style={{ border: '1px solid var(--border-soft)', background: 'var(--surface-1)', padding: 'clamp(28px, 3.4vw, 44px)' }}>
            <div className="flex items-baseline justify-between mb-6">
              <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'var(--text)' }}>
                {postureLabel}
              </div>
              {postureTag && (
                <div className="eyebrow" style={{ color: 'var(--text-faint)' }}>
                  {postureTag}
                </div>
              )}
            </div>
            {posture.map((row, i) => (
              <div key={row.label} style={{ paddingBlock: 18, borderTop: i === 0 ? 'none' : '1px solid var(--border-soft)' }}>
                <div className="eyebrow eyebrow-accent mb-2">{row.label}</div>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-dim)' }}>{row.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/**
 * LeadershipCards — RC's "Built by operators" artifact: a grid of member cards
 * (name, role eyebrow, location, bio, skill chips, optional LinkedIn). Calm,
 * bordered, one card per person.
 */
export function LeadershipCards({
  members,
  linkedinLabel = 'LINKEDIN',
}: {
  members: ReadonlyArray<{
    name: string
    role: string
    location?: string
    bio: string
    skills?: ReadonlyArray<string>
    linkedin?: string
  }>
  linkedinLabel?: string
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {members.map((m, i) => (
        <Reveal key={m.name} delay={Math.min(i, 4) * 70}>
          <div className="rounded-2xl h-full" style={{ border: '1px solid var(--border-soft)', background: 'var(--surface-1)', padding: 'clamp(24px, 3vw, 40px)' }}>
            <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'var(--text)' }}>
              {m.name}
            </div>
            <div className="eyebrow eyebrow-accent mt-3">{m.role}</div>
            {m.location && (
              <div className="mt-3" style={{ fontSize: 14, color: 'var(--text-faint)' }}>
                {m.location}
              </div>
            )}
            <p className="mt-5" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)' }}>
              {m.bio}
            </p>
            {m.skills && m.skills.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <span
                    key={s}
                    className="eyebrow"
                    style={{ border: '1px solid var(--chip-border, rgba(201,139,78,.3))', borderRadius: 999, padding: '7px 13px', color: 'var(--text-dim)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="eyebrow eyebrow-accent mt-6 inline-block" style={{ fontSize: 12 }}>
                {linkedinLabel} ↗
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Closing hand-off — a pointer to the next page, not a heavy CTA (RC). */
export function Handoff({
  statement,
  href,
  label,
  onClick,
}: {
  statement: ReactNode
  href?: string
  label: string
  onClick?: () => void
}) {
  const arrow = (
    <span aria-hidden="true" style={{ marginLeft: 12 }}>
      →
    </span>
  )
  return (
    <Band tight>
      <Reveal>
        <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 'clamp(40px, 5vw, 64px)' }}>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 530,
              fontSize: 'clamp(24px, 3vw, 40px)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              maxWidth: '26ch',
            }}
          >
            {statement}
          </p>
          <div className="mt-8">
            {href ? (
              <a href={href} className="eyebrow eyebrow-accent" style={{ fontSize: 13 }}>
                {label}
                {arrow}
              </a>
            ) : (
              <button type="button" onClick={onClick} className="eyebrow eyebrow-accent" style={{ fontSize: 13 }}>
                {label}
                {arrow}
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </Band>
  )
}
