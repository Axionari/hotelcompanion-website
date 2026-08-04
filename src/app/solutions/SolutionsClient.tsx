'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { Breather } from '@/components/cds/Breather'
import { MediaBed } from '@/components/cds/MediaBed'
import { TabletOS } from '@/components/cds/TabletOS'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { LIVE_DEMO_ENABLED } from '@/lib/flags'
import {
  SERIF,
  Em,
  Band,
  PageHero,
  ChipStrip,
  Act,
  NumberedList,
  QuietChips,
  StatementCards,
  TenantStack,
  Handoff,
} from '@/components/v5/Editorial'
import { CompanionTablet } from '@/components/v5/CompanionTablet'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { solutionsCopy } from '@/lib/i18n/marketing/solutions'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'

/**
 * Solutions — RC-editorial grammar, but every section a DIFFERENT layout so the
 * page never reads as one template repeated (the earlier rebuild was all
 * statement + chips + close). Each act still carries ONE message; the artifact
 * varies:
 *
 *   HERO (statement + in-room device)  · department chips
 *   01 THE DEPARTMENTS      — one shared intelligence  → 3-col statement cards
 *   02 MULTI-PROPERTY GROUPS — identity + consistency  → TenantStack diagram
 *   03 LUXURY HOTELS        — recognized, at scale     → editorial two-column
 *   04 RESORTS              — one seamless journey     → text + tablet screen
 *   05 BOUTIQUE HOTELS      — distinctly yours         → 3 statement cards
 *   06 BUSINESS HOTELS      — speed at any hour        → quiet chips
 *   07 ENTERPRISE GROUPS    — one platform, every hotel → numbered pillars
 *   HAND-OFF → /enterprise · CLOSING MEDIA BAND (one action)
 *
 * All reading copy is the approved solutions copy (solutionsCopy) — condensed
 * and re-presented, never rewritten. Footer deep-link ids (#luxury, #boutique,
 * #resorts, #business, #enterprise-groups, #multi-property) survive as ids.
 */

/** Split a one-sentence-pair statement ("A. B.") into plain + italic halves. */
function splitStatement(title: string): { pre: string; hi: string } {
  const i = title.indexOf('. ')
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i + 1), hi: title.slice(i + 1) }
}

/** Approved noun-stack / clause lines ("A. B. C.") as their sentences. */
function sentences(line: string): string[] {
  return line
    .split('. ')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.endsWith('.') ? p : `${p}.`))
}

/** A serif closing line under an artifact (shared beat). */
function Close({ children, italic = false }: { children: React.ReactNode; italic?: boolean }) {
  return (
    <Reveal>
      <p
        className="mt-12"
        style={{
          fontFamily: SERIF,
          fontStyle: italic ? 'italic' : 'normal',
          fontWeight: italic ? 480 : 530,
          fontSize: italic ? 'clamp(20px, 2.4vw, 30px)' : 'clamp(20px, 2.2vw, 27px)',
          lineHeight: italic ? 1.3 : 1.35,
          color: italic ? 'var(--cream, #F2EEE6)' : 'var(--text)',
          maxWidth: italic ? '34ch' : '28ch',
        }}
      >
        {children}
      </p>
    </Reveal>
  )
}

export default function SolutionsClient() {
  const c = useCopy(solutionsCopy)
  const g = useCopy(globalCopy)
  const demo = useCopy(liveDemoCopy)

  const heroTitle = splitStatement(c.hero.title)

  const seg = (id: string) => c.segments.find((s) => s.id === id) ?? c.segments[0]
  const multi = seg('multi-property')
  const luxury = seg('luxury')
  const resorts = seg('resorts')
  const boutique = seg('boutique')
  const business = seg('business')
  const enterprise = seg('enterprise-groups')

  return (
    <main>
      <SiteNav />

      {/* HERO {#solutions-hero} — statement left, the in-room device right. */}
      <div id="solutions-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.solutions}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body1}
          actions={
            <>
              <Link href="/demo" className="btn-primary">
                {c.finalCta.cta}
              </Link>
              {LIVE_DEMO_ENABLED && (
                <button type="button" onClick={openLiveDemo} className="btn-secondary">
                  {demo.open}
                </button>
              )}
            </>
          }
          visual={<CompanionTablet variant="solutions" />}
        />
      </div>

      {/* Proof strip — the nine departments, quiet mono (approved eyebrows) */}
      <ChipStrip chips={c.departments.map((d) => d.eyebrow)} />

      {/* 01 · THE DEPARTMENTS {#solutions-departments} — LAYOUT: 3-col cards.
          Every department, one card. */}
      <Act
        no="01"
        label={c.acts.departments}
        id="solutions-departments"
        statement={c.departmentsTitle}
        deck={c.hero.body2}
      >
        <StatementCards
          columns={3}
          items={c.departments.map((d) => ({ eyebrow: d.eyebrow, title: d.title, body: d.body[0] }))}
        />
      </Act>

      <Breather id="band-solutions-lagoon" image="/assets/breathers/waterfall-lagoon.webp" />

      {/* 02 · MULTI-PROPERTY GROUPS {#multi-property} — LAYOUT: tiered diagram.
          Every property keeps its identity above one shared intelligence. */}
      <Act
        no="02"
        label={multi.eyebrow}
        statement={splitStatement(multi.title).pre}
        deck={`${c.segmentsTitle} ${multi.body[0]}`}
        id="multi-property"
      >
        <TenantStack
          caption={c.multiDiagram.caption}
          tiers={[
            { ...c.multiDiagram.property },
            { ...c.multiDiagram.platform, highlight: true },
          ]}
        />
      </Act>

      {/* 03 · LUXURY HOTELS {#luxury} — LAYOUT: editorial two-column text.
          No cards, no chips — the type carries it (RC's calm register). */}
      <Band id="luxury">
        <Reveal className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow eyebrow-accent mb-7">{luxury.eyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.012em', color: 'var(--text)', maxWidth: '20ch' }}>
              {luxury.title}
            </h2>
            <p className="body-lead mt-7" style={{ maxWidth: '42ch' }}>{luxury.body[0]}</p>
          </div>
          <div className="lg:col-span-5 lg:pt-20">
            <div style={{ width: 44, height: 2, background: 'var(--accent)', marginBottom: 24 }} />
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 'clamp(22px, 2.6vw, 34px)', lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--cream, #F2EEE6)', maxWidth: '20ch' }}>
              {luxury.body[1]}
            </p>
            <p className="mt-8" style={{ fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif', fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: 'var(--text-dim, rgba(242,233,220,0.62))', maxWidth: '34ch' }}>
              {luxury.body[2]}
            </p>
          </div>
        </Reveal>
      </Band>

      {/* 04 · RESORTS {#resorts} — LAYOUT: text + tablet screen. Every amenity,
          one journey — shown on the in-room device (destination/concierge). */}
      <Band id="resorts">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-6">{resorts.eyebrow}</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.012em', color: 'var(--text)', maxWidth: '18ch' }}>
                {resorts.title}
              </h2>
              <p className="body-lead mt-7" style={{ maxWidth: '44ch' }}>{`${resorts.body[0]} ${resorts.body[1]}`}</p>
              <div className="mt-9">
                <QuietChips items={sentences(resorts.body[2])} />
              </div>
              <p className="mt-9" style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}>
                {resorts.body[3]}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <TabletOS cycle={['beach', 'concierge', 'spa']} />
            </Reveal>
          </div>
        </div>
      </Band>

      <Breather image="/assets/breathers/beach-dusk-walk.webp" />

      {/* 05 · BOUTIQUE HOTELS {#boutique} — LAYOUT: 3 statement cards.
          The three ways personality survives scale. */}
      <Act
        no="05"
        label={boutique.eyebrow}
        id="boutique"
        statement={boutique.title}
        deck={`${boutique.body[0]} ${boutique.body[1]}`}
      >
        <StatementCards columns={3} items={sentences(boutique.body[2]).map((s) => ({ title: s, body: '' }))} />
      </Act>

      {/* 06 · BUSINESS HOTELS {#business} — LAYOUT: quiet chips. The traveler's
          needs, at a glance. */}
      <Act
        no="06"
        label={business.eyebrow}
        id="business"
        statement={business.title}
        deck={`${business.body[0]} ${business.body[1]}`}
      >
        <QuietChips items={sentences(business.body[2])} />
        <Close>{business.body[3]}</Close>
      </Act>

      {/* 07 · ENTERPRISE HOTEL GROUPS {#enterprise-groups} — LAYOUT: numbered
          pillars. One platform behind every hotel. */}
      <Act
        no="07"
        label={enterprise.eyebrow}
        id="enterprise-groups"
        statement={enterprise.title}
        deck={enterprise.body[0]}
      >
        <NumberedList items={sentences(enterprise.body[1]).map((title) => ({ title }))} />
        <Close>{enterprise.body[2]}</Close>
      </Act>

      {/* HAND-OFF {#solutions-enterprise} — the shared-intelligence promise is
          named here, answered on /enterprise (RC hand-off, not a CTA). */}
      <div id="solutions-enterprise" className="scroll-mt-20">
        <Handoff statement={c.finalCta.body} href="/enterprise" label={g.nav.enterprise} />
      </div>

      {/* CLOSING {#solutions-final-cta} — warm media band, one action */}
      <MediaBed poster="/assets/img/lobby-modern.webp" scrim={0.72}>
        <section id="solutions-final-cta" style={{ paddingBlock: 'clamp(120px, 18vw, 240px)' }}>
          <div className="container-rc" style={{ textAlign: 'center' }}>
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-7">{c.acts.next}</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)' }}>
                {c.finalCta.title}
              </h2>
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--text-dim)', marginTop: 28, maxWidth: '40ch', marginInline: 'auto' }}>
                {c.finalCta.platform}
              </p>
              <div className="mt-10 flex justify-center">
                <Link href="/demo" className="btn-primary">
                  {c.finalCta.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </MediaBed>

      <SiteFooter />
    </main>
  )
}
