'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Breather } from '@/components/cds/Breather'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { IconChipGrid, JourneyTimeline, ConvergenceDiagram } from '@/components/cds/blocks'
import { useCopy } from '@/lib/i18n/useCopy'
import { enterpriseCopy } from '@/lib/i18n/marketing/enterprise'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * /enterprise — PRODUCT_ARCHITECTURE §5/§10: this page removes risk and
 * answers one question, "Can my organization trust and deploy this?", in six
 * sections: Hero · Shared intelligence (multi-property) · Trust architecture
 * (security + governance + administration) · Intelligence for operators ·
 * Deployment & fit (integration + boundaries + deploy + scale) · Next step.
 * Dashboards live on /platform (§7 — Silent here); Companion OS is Silent
 * here (footer carries the endorsement). Old section ids survive as anchors.
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
  integrates: 2,
  deploy: 2,
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

export default function EnterpriseClient() {
  const c = useCopy(enterpriseCopy)
  const a = useCopy(accents)
  const demo = useCopy(liveDemoCopy)

  const byId = (id: string) => c.sections.find((s) => s.id === id)!
  const deploy = byId('deploy')
  const grow = byId('grow')

  /** Prose lines for a section — the noun-run line is rendered as chips instead. */
  const prose = (id: string) => {
    const s = byId(id)
    const run = RUN_INDEX[id]
    return run === undefined ? s.body : s.body.filter((_, i) => i !== run)
  }
  const run = (id: string) => nounRun(byId(id).body[RUN_INDEX[id]])

  /** A former standalone band, now a titled column inside a merged section. */
  const column = (id: string) => {
    const s = byId(id)
    return (
      <div id={id} className="scroll-mt-24">
        <div className="font-serif mb-2" style={{ fontSize: '1.35rem', fontWeight: 530, color: 'var(--text)' }}>
          {s.title}
        </div>
        <p className="body-lead mb-6" style={{ maxWidth: '40ch' }}>
          {prose(id)[0]}
        </p>
        <IconChipGrid items={run(id).slice(0, 8)} columns={2} />
      </div>
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
                  <button type="button" onClick={openLiveDemo} className="btn-secondary">
                    {demo.open}
                  </button>
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

      {/* 01 · SHARED INTELLIGENCE {#shared-intel} — one brain across the
          portfolio (merged: shared-intel + multi-property + knowledge) */}
      <Section id="shared-intel" eyebrow={byId('shared-intel').eyebrow} variant="surface-3">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '20ch' }}>
                {byId('shared-intel').title}
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                {byId('shared-intel').body.map((line, i) => (
                  <p key={i} className="body-lead" style={{ maxWidth: '52ch' }}>
                    {line}
                  </p>
                ))}
              </div>
              <Coda>{byId('shared-intel').coda}</Coda>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <ConvergenceDiagram inputs={c.sharedIntel.inputs} nodeLabel={c.sharedIntel.node} />
          </div>
        </div>
        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16">
          {column('multi-property')}
          {column('knowledge')}
        </div>
      </Section>

      {/* 02 · TRUST ARCHITECTURE {#secure} — the page's centerpiece
          (merged: secure + governance + admin; all content kept) */}
      <Section id="secure" eyebrow={byId('secure').eyebrow.replace(/^\d+/, '02')} title={byId('secure').title} support={prose('secure')[0]} variant="surface-4">
        <div className="mt-14 grid lg:grid-cols-3 gap-12 lg:gap-14">
          <div className="scroll-mt-24">
            <IconChipGrid items={run('secure').slice(0, 8)} columns={2} />
            <Coda>{byId('secure').coda}</Coda>
          </div>
          {column('governance')}
          {column('admin')}
        </div>
      </Section>

      {/* 03 · INTELLIGENCE FOR OPERATORS (merged: operational + commercial;
          dashboards are Platform's — Silent here) */}
      <Section
        id="operational-intel"
        eyebrow={byId('operational-intel').eyebrow.replace(/^\d+/, '03')}
        title={byId('operational-intel').title}
        support={prose('operational-intel')[0]}
        variant="surface-3"
      >
        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <IconChipGrid items={run('operational-intel').slice(0, 8)} columns={2} />
            <Coda>{byId('operational-intel').coda}</Coda>
          </div>
          {column('commercial-intel')}
        </div>
      </Section>

      <Breather id="band-enterprise-lagoon" image="/assets/breathers/waterfall-lagoon.webp" />

      {/* 04 · DEPLOYMENT & FIT — it fits without risk
          (merged: integrates + what-it-is-not + deploy + grow) */}
      <Section
        id="integrates"
        eyebrow={byId('integrates').eyebrow.replace(/^\d+/, '04')}
        title={byId('integrates').title}
        support={prose('integrates')[0]}
        variant="surface-3"
      >
        <div className="mt-12">
          <IconChipGrid items={run('integrates').slice(0, 10)} columns={2} />
        </div>

        {/* the boundaries — deep-linked from around the site */}
        <div id="what-it-is-not" className="mt-16 scroll-mt-24">
          <Reveal>
            <div className="flex flex-col gap-4" style={{ maxWidth: '58ch' }}>
              {c.whatItIsNot.lead.map((line, i) => (
                <p key={i} className="body-lead" style={i === 0 ? { color: 'var(--text)' } : undefined}>
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2" style={{ borderTop: '1px solid var(--border-soft)' }}>
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
        </div>

        {/* live in days — the mechanics the homepage withheld */}
        <div id="deploy" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="body-lead mb-10" style={{ color: 'var(--text)', maxWidth: '52ch' }}>
              {prose('deploy')[0]}
            </p>
          </Reveal>
          <JourneyTimeline stages={run('deploy').map((name) => ({ name, body: '' }))} columns={5} />
          <Reveal>
            <Coda>{deploy.coda}</Coda>
          </Reveal>
        </div>

        {/* and it grows with the portfolio */}
        <div id="grow" className="mt-16 scroll-mt-24">
          <JourneyTimeline stages={nounRun(grow.body[0]).map((name) => ({ name, body: '' }))} columns={3} />
          <Reveal>
            <Coda>{grow.coda}</Coda>
          </Reveal>
        </div>
      </Section>

      {/* 05 · NEXT STEP {#enterprise-final-cta} — warm media band */}
      <MediaBed poster="/assets/img/company-reception.webp" scrim={0.72}>
        <section className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">05 · NEXT STEP</div>
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

      <SiteFooter />
    </main>
  )
}
