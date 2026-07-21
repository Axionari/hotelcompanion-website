'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Teaser, CapabilityStrip } from '@/components/cds/Teaser'
import { Breather } from '@/components/cds/Breather'
import { Section } from '@/components/cds/Section'
import type { SectionVariant } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import {
  IconChipGrid,
  JourneyTimeline,
  ConvergenceDiagram,
  DashboardMockup,
} from '@/components/cds/blocks'
import { COMPANION_OS_CAPABILITIES } from '@/lib/capabilities'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { enterpriseCopy } from '@/lib/i18n/marketing/enterprise'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * /enterprise — composed to Restaurant Companion level (Level-Up plan P3,
 * Design & Interaction Spec §5). Left-aligned throughout, card-less by default,
 * every section carrying a visual. This page runs the warmest banding on the
 * site (surface-3/4/5 dominant), per the spec.
 *
 * Approved copy is never edited here: long noun-runs inside `body` lines are
 * only *rendered* differently (chips / timeline), never rewritten.
 */

/** Splits an approved noun-run body line into its items for chip/timeline rendering. */
function nounRun(line: string): string[] {
  return line
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${s}.`)
}

/** Index of the body line that is a noun-run, per section. Absent = all prose. */
const RUN_INDEX: Record<string, number> = {
  'multi-property': 1,
  knowledge: 2,
  admin: 1,
  secure: 2,
  governance: 1,
  'operational-intel': 2,
  'commercial-intel': 2,
  dashboards: 2,
  integrates: 2,
  deploy: 2,
}

/** Ambient banding — warmest ladder on the site; no two neighbours share a step. */
const BANDING: Record<string, SectionVariant> = {
  'shared-intel': 'surface-3',
  'multi-property': 'surface-4',
  knowledge: 'surface-3',
  admin: 'surface-4',
  secure: 'surface-3',
  governance: 'surface-4',
  'operational-intel': 'surface-3',
  'commercial-intel': 'surface-4',
  dashboards: 'surface-2',
  integrates: 'surface-4',
  deploy: 'surface-4',
  grow: 'surface-3',
}

function Coda({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-serif mt-8"
      style={{
        fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
        fontWeight: 530,
        lineHeight: 1.35,
        color: 'var(--text)',
        maxWidth: '30ch',
      }}
    >
      {children}
    </p>
  )
}

/** The default enterprise shape: text left (or right), visual opposite. */
function Block({
  id,
  eyebrow,
  title,
  body,
  coda,
  visual,
  variant,
  reverse = false,
}: {
  id: string
  eyebrow: string
  title: string
  body: ReadonlyArray<string>
  coda: string
  visual: ReactNode
  variant: SectionVariant
  reverse?: boolean
}) {
  return (
    <Section id={id} variant={variant}>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
          <Reveal>
            <div className="eyebrow eyebrow-accent mb-5">{eyebrow}</div>
            <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '20ch' }}>
              {title}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {body.map((line, i) => (
                <p key={i} className="body-lead" style={{ maxWidth: '52ch' }}>
                  {line}
                </p>
              ))}
            </div>
            <Coda>{coda}</Coda>
          </Reveal>
        </div>
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-1' : ''}`}>{visual}</div>
      </div>
    </Section>
  )
}

export default function EnterpriseClient() {
  const c = useCopy(enterpriseCopy)
  const g = useCopy(globalCopy)
  const a = useCopy(accents)

  const byId = (id: string) => c.sections.find((s) => s.id === id)!
  const dashboards = byId('dashboards')
  const deploy = byId('deploy')
  const grow = byId('grow')

  /** Prose lines for a section — the noun-run line is rendered as the visual instead. */
  const prose = (id: string) => {
    const s = byId(id)
    const run = RUN_INDEX[id]
    return run === undefined ? s.body : s.body.filter((_, i) => i !== run)
  }
  const run = (id: string) => nounRun(byId(id).body[RUN_INDEX[id]])

  /** Standard two-column block driven by the section's own noun-run. */
  const chipBlock = (id: string, reverse: boolean) => {
    const s = byId(id)
    return (
      <Block
        key={id}
        id={id}
        eyebrow={s.eyebrow}
        title={s.title}
        body={prose(id)}
        coda={s.coda}
        variant={BANDING[id]}
        reverse={reverse}
        visual={<IconChipGrid items={run(id).slice(0, 10)} columns={2} />}
      />
    )
  }

  return (
    <main>
      <SiteNav />

      {/* HERO {#enterprise-hero} — over the night-pool still, text left */}
      <MediaBed poster="/assets/img/ambient-palms-night.webp" scrim={0.68}>
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="container-rc">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <div className="eyebrow eyebrow-accent mb-7">{c.hero.positioning}</div>
                <MultiAccentHeadline
                  as="h1"
                  className="heading-hero"
                  style={{ color: 'var(--text)', maxWidth: '16ch' }}
                  text={c.hero.title}
                  accents={a.enterpriseHero}
                />
                <p className="body-lead mt-8" style={{ maxWidth: '54ch' }}>
                  {c.hero.body}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/demo" className="btn-primary">
                    {c.finalCta.cta}
                  </Link>
                  <Link href="/companion-os" className="btn-secondary">
                    {c.companionOs.title}
                  </Link>
                </div>
                <div className="mt-10">
                  <EndorsementMark variant="companion-os" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* Trust strip {#enterprise-trust} — hairline, small caps */}
      <div style={{ background: 'var(--surface-1)', borderBlock: '1px solid var(--border-soft)' }}>
        <div className="container-rc py-6">
          <p className="eyebrow">{c.trust}</p>
        </div>
      </div>

      {/* 01 · SHARED INTELLIGENCE {#shared-intel} — convergence diagram */}
      <Block
        id="shared-intel"
        eyebrow={byId('shared-intel').eyebrow}
        title={byId('shared-intel').title}
        body={byId('shared-intel').body}
        coda={byId('shared-intel').coda}
        variant={BANDING['shared-intel']}
        visual={<ConvergenceDiagram inputs={c.sharedIntel.inputs} nodeLabel={c.sharedIntel.node} />}
      />

      {/* 02 … 08 — alternating two-column blocks, noun-runs as chip grids */}
      {chipBlock('multi-property', true)}
      {chipBlock('knowledge', false)}
      {chipBlock('admin', true)}
      {chipBlock('secure', false)}
      {chipBlock('governance', true)}
      {chipBlock('operational-intel', false)}
      {chipBlock('commercial-intel', true)}

      {/* 09 · DASHBOARDS {#dashboards} — the 91/9 command centre */}
      <Section
        id="dashboards"
        eyebrow={dashboards.eyebrow}
        title={dashboards.title}
        support={prose('dashboards').join(' ')}
        variant={BANDING.dashboards}
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <IconChipGrid items={run('dashboards').slice(0, 10)} columns={2} />
          </div>
          <div className="lg:col-span-7">
            {/* NEEDS CONFIRM: resolution rate — verify before public launch. */}
            <DashboardMockup
              title={c.dashboard.title}
              resolvedPct={91}
              escalatedPct={9}
              resolvedLabel={c.dashboard.resolvedLabel}
              escalatedLabel={c.dashboard.escalatedLabel}
              metrics={c.dashboard.metrics}
              properties={c.dashboard.properties}
            />
          </div>
        </div>
        <Reveal>
          <div className="mt-12 flex flex-col gap-3" style={{ maxWidth: '56ch' }}>
            <p className="body-lead" style={{ color: 'var(--text)' }}>
              {c.resolution.resolved}
            </p>
            <p className="body-lead">{c.resolution.escalated}</p>
            <p className="body-lead">{c.resolution.close}</p>
          </div>
          <Coda>{dashboards.coda}</Coda>
        </Reveal>
      </Section>

      {/* 10 · INTEGRATION {#integrates} */}
      {chipBlock('integrates', false)}

      {/* 11 · WHAT IT IS NOT {#what-it-is-not} — the "Not a…" quadrant.
          Deep-linked from the Home teaser as /enterprise#what-it-is-not. */}
      <Breather image="/assets/breathers/waterfall-lagoon.webp" />

      <Section
        id="what-it-is-not"
        eyebrow="11 · WHAT IT IS NOT"
        title={c.whatItIsNot.title}
        variant="surface-3"
      >
        <Reveal>
          <div className="mt-8 flex flex-col gap-4" style={{ maxWidth: '58ch' }}>
            {c.whatItIsNot.lead.map((line, i) => (
              <p key={i} className="body-lead" style={i === 0 ? { color: 'var(--text)' } : undefined}>
                {line}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2" style={{ borderTop: '1px solid var(--border-soft)' }}>
          {c.whatItIsNot.items.map((it, i) => (
            <Reveal key={it.name} delay={Math.min(i, 4) * 45}>
              <div
                className={`h-full py-9 ${i % 2 === 1 ? 'sm:border-l sm:pl-10' : 'sm:pr-10'}`}
                style={{ borderBottom: '1px solid var(--border-soft)', borderLeftColor: 'var(--border-soft)' }}
              >
                <div className="eyebrow eyebrow-accent mb-3">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 530, color: 'var(--text)' }}>
                  {it.name}
                </div>
                <p
                  className="font-sans mt-2.5"
                  style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '36ch' }}
                >
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12">
            {c.whatItIsNot.close.map((line) => (
              <p
                key={line}
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.7rem)',
                  fontWeight: 530,
                  lineHeight: 1.3,
                  color: 'var(--text)',
                  maxWidth: '32ch',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 12 · DEPLOYMENT {#deploy} — numbered deploy timeline */}
      <Section
        id="deploy"
        eyebrow={deploy.eyebrow}
        title={deploy.title}
        support={prose('deploy').join(' ')}
        variant={BANDING.deploy}
      >
        <div className="mt-14">
          <JourneyTimeline stages={run('deploy').map((name) => ({ name, body: '' }))} columns={5} />
        </div>
        <Reveal>
          <Coda>{deploy.coda}</Coda>
        </Reveal>
      </Section>

      {/* 13 · SCALE {#grow} — the scale ladder */}
      <Section id="grow" eyebrow={grow.eyebrow} title={grow.title} support={grow.body[1]} variant={BANDING.grow}>
        <div className="mt-14">
          <JourneyTimeline stages={nounRun(grow.body[0]).map((name) => ({ name, body: '' }))} columns={3} />
        </div>
        <Reveal>
          <Coda>{grow.coda}</Coda>
        </Reveal>
      </Section>

      {/* 14 · COMPANION OS {#enterprise-companion-os} — capability surface */}
      <Section
        id="enterprise-companion-os"
        eyebrow="14 · COMPANION OS"
        title={c.companionOs.title}
        support={c.companionOs.lead}
        variant="surface-5"
      >
        <div className="mt-14">
          <Teaser lines={[]} href="/companion-os" label={g.nav.companionOs}>
            <CapabilityStrip names={COMPANION_OS_CAPABILITIES.map((x) => x.name)} />
          </Teaser>
        </div>
        <Reveal>
          <Coda>{c.companionOs.close}</Coda>
          <div className="mt-8">
            <EndorsementMark variant="companion-os" />
          </div>
        </Reveal>
      </Section>

      {/* 15 · NEXT STEP {#enterprise-final-cta} — warm media band */}
      <MediaBed poster="/assets/img/company-reception.webp" scrim={0.72}>
        <section className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">15 · NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '20ch' }}>
                {c.finalCta.title}
              </h2>
              <div className="mt-10 grid sm:grid-cols-2 gap-x-12">
                {c.finalCta.beats.map((b) => (
                  <p
                    key={b}
                    className="font-sans py-3.5"
                    style={{ fontSize: 15, color: 'var(--text-dim)', borderBottom: '1px solid var(--border-soft)' }}
                  >
                    {b}
                  </p>
                ))}
              </div>
              <div className="mt-12">
                <Link href="/demo" className="btn-primary">
                  {c.finalCta.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </MediaBed>

      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}
