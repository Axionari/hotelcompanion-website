'use client'

import { ReactNode, useState } from 'react'
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
  shortViewportSafe = false,
}: {
  eyebrow: string
  title: ReactNode
  deck?: string
  actions?: ReactNode
  visual?: ReactNode
  /**
   * Make the hero's leading space viewport-HEIGHT responsive instead of
   * width-responsive — the same mechanism the home hero uses.
   *
   * The default 11vw knows nothing about how tall the window is: at 1393x692
   * it puts 153px of air above the kicker, and in Spanish — where the H1 takes
   * three lines to English's two — that pushed /contact's hero CTA 45px under
   * the cookie banner. 13vh gives 90px there and restores the clearance.
   *
   * OPT-IN, not the default, and deliberately so: measured across all eight
   * PageHero pages, switching globally improves six but REGRESSES /enterprise
   * in Spanish, whose CTA sits below the fold at 153px and gets pulled up into
   * the banner at 90px. Those pages need their own pass. Floor (88) and
   * ceiling (160) are identical either way, so tall windows and phones are
   * unaffected by this flag; only short viewports differ.
   */
  shortViewportSafe?: boolean
}) {
  return (
    <section style={{ paddingBlock: shortViewportSafe ? 'clamp(88px, 13vh, 160px)' : 'clamp(88px, 11vw, 160px)' }}>
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
  /** `body` is optional — a card can be a bare statement. */
  items: ReadonlyArray<{ eyebrow?: string; title: string; body?: string }>
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
            {it.body && (
              <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '38ch' }}>
                {it.body}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Quiet mono chips for enumerations (replaces the old dense icon grids). */
export function QuietChips({ items }: { items: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5">
      {items.map((chip) => (
        <span
          key={chip}
          className="eyebrow px-3.5 py-2 sm:px-[18px] sm:py-2.5"
          style={{
            border: '1px solid var(--chip-border, rgba(201,139,78,.3))',
            borderRadius: 999,
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
    <div style={{ maxWidth: 940, marginInline: 'auto' }}>
      {tiers.map((t, i) => (
        <div key={t.eyebrow}>
          <Reveal delay={i * 90}>
            {t.highlight ? (
              /* the layer tier — Axionari-premium: identity left, capability
                 bullets right of a soft divider */
              <div className="v5-tier-hi" style={{ padding: 'clamp(28px, 3.2vw, 46px)' }}>
                <div className="grid md:grid-cols-[1.15fr_1fr] items-center" style={{ gap: 'clamp(20px, 2.6vw, 40px)' }}>
                  <div>
                    <div className="eyebrow mb-4" style={{ color: 'var(--accent)' }}>{t.eyebrow}</div>
                    <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(22px, 2.7vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)' }}>
                      {t.title}
                    </div>
                    {t.sub && (
                      <div className="mt-2.5" style={{ fontSize: 14.5, color: 'var(--text-dim)' }}>
                        {t.sub}
                      </div>
                    )}
                  </div>
                  <div className="md:pl-8" style={{ borderLeft: '1px solid rgba(200,106,58,0.25)' }}>
                    {t.chips.map((chip) => (
                      <div key={chip} className="flex items-baseline gap-3" style={{ padding: '6px 0' }}>
                        <span aria-hidden style={{ color: 'var(--accent)', fontSize: 11 }}>▸</span>
                        <span style={{ fontSize: 'clamp(13.5px, 1.15vw, 15.5px)', color: 'rgba(242,238,230,0.85)' }}>{chip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="v5-card" style={{ padding: 'clamp(28px, 3.2vw, 44px)' }}>
                <div className="eyebrow mb-4" style={{ color: 'var(--text-faint)' }}>{t.eyebrow}</div>
                <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(21px, 2.5vw, 31px)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--text)' }}>
                  {t.title}
                </div>
                {t.sub && (
                  <div className="mt-2" style={{ fontSize: 14.5, color: 'var(--text-dim)' }}>
                    {t.sub}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {t.chips.map((chip) => (
                    <span key={chip} className="v5-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
          {i < tiers.length - 1 && (
            /* bidirectional exchange between tiers (Axionari ↑↓ rows) */
            <div aria-hidden="true" className="flex justify-center" style={{ gap: 'clamp(48px, 10vw, 150px)', padding: 'clamp(10px, 1.2vw, 16px) 0' }}>
              {[0, 1, 2, 3, 4].map((k) => (
                <span
                  key={k}
                  className={k > 2 ? 'hidden md:flex' : 'flex'}
                  style={{ flexDirection: 'column', alignItems: 'center', lineHeight: 1.05, fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(11px, 1vw, 14px)', color: 'rgba(200,106,58,0.85)' }}
                >
                  <span>↑</span>
                  <span>↓</span>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
      {caption && (
        <Reveal>
          <p className="eyebrow mt-10" style={{ color: 'var(--text-faint)', textAlign: 'center', letterSpacing: '0.14em' }}>
            {caption}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/**
 * ArticleCards — RC/PC's "Product Philosophy" essay cards: an elevated card
 * per item (eyebrow → serif title → description → meta link with a nudging
 * arrow on hover). Each card is a link.
 */
export function ArticleCards({
  items,
  columns = 3,
}: {
  items: ReadonlyArray<{ eyebrow?: string; title: string; body: string; meta?: string; href: string }>
  columns?: 2 | 3
}) {
  return (
    <div className={`grid gap-6 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((it, i) => (
        <Reveal key={it.href} delay={Math.min(i, 6) * 60}>
          <a
            href={it.href}
            className="v5-card v5-card-link group flex flex-col h-full"
            style={{ padding: 'clamp(24px, 2.6vw, 34px)' }}
          >
            {it.eyebrow && <div className="eyebrow eyebrow-accent">{it.eyebrow}</div>}
            <p
              className="mt-4"
              style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 1.9vw, 25px)', lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--text)' }}
            >
              {it.title}
            </p>
            <p className="mt-3" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-dim)', flex: 1 }}>
              {it.body}
            </p>
            {it.meta && (
              <div className="eyebrow mt-8" style={{ color: 'var(--text-faint)' }}>
                {it.meta}
                <span className="v5-card-arrow" style={{ color: 'var(--accent)', marginLeft: 8 }} aria-hidden="true">
                  →
                </span>
              </div>
            )}
          </a>
        </Reveal>
      ))}
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
          <div className="v5-card" style={{ padding: 'clamp(28px, 3.4vw, 44px)' }}>
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
          <div className="v5-card h-full" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
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

/**
 * FaqList — a calm, closed-by-default accordion (hairline rows, serif question,
 * a rotating +). One row open at a time reads cleanest; click toggles.
 */
export function FaqList({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div style={{ maxWidth: 820 }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <Reveal key={item.q} delay={Math.min(i, 8) * 30}>
            <div style={{ borderTop: '1px solid var(--border-soft)' }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-6 text-left"
                style={{ paddingBlock: 'clamp(20px, 2.4vw, 28px)' }}
              >
                <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.3, color: 'var(--text)' }}>
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: 4, fontSize: 22, lineHeight: 1, color: 'var(--accent)', transition: 'transform 0.3s var(--ease-standard)', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s var(--ease-standard)' }}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-dim)', maxWidth: '62ch', paddingBottom: 'clamp(20px, 2.4vw, 28px)' }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )
      })}
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
