'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import type { SectionVariant } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { IconChipGrid, ConvergenceDiagram, NodeDiagram } from '@/components/cds/blocks'
import { useCopy } from '@/lib/i18n/useCopy'
import { companionOsCopy } from '@/lib/i18n/marketing/companionOs'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * /companion-os — composed to Restaurant Companion level (Design & Interaction
 * Spec §5). Left-aligned throughout, card-less by default, every section
 * carrying a visual. The convergence diagram at {#companionos-one-platform} is
 * the page's signature graphic.
 *
 * Approved copy is never edited: noun-runs inside `body` lines are only
 * *rendered* differently (chips / step flow), never rewritten. The eight
 * deep-dive ids are load-bearing — CapabilityGrid/CapabilitySurface tiles
 * deep-link to /companion-os#voice … #learning.
 */

/** Splits an approved noun-run body line into its items for chip rendering. */
function nounRun(line: string): string[] {
  return line
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${s}.`)
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
        maxWidth: '32ch',
      }}
    >
      {children}
    </p>
  )
}

/** Workflow chain rendered as a numbered step flow (the `workflow` deep-dive). */
function StepFlow({ steps }: { steps: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <Reveal key={step} delay={Math.min(i, 6) * 70}>
          <div
            className="flex items-baseline gap-4 py-4"
            style={{ borderTop: i === 0 ? '1px solid var(--border-soft)' : 'none', borderBottom: '1px solid var(--border-soft)' }}
          >
            <span className="eyebrow eyebrow-accent" style={{ minWidth: 28 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-sans" style={{ fontSize: 15, color: 'var(--text-dim)' }}>
              {step}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="ml-auto" style={{ color: 'var(--accent)' }}>
                ↓
              </span>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** The default page shape: text one side, visual the other. */
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
  id?: string
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

/** Index of the body line that is a noun-run, per deep-dive id. */
const RUN_INDEX: Record<string, number> = {
  voice: 2,
  knowledge: 1,
  memory: 2,
  reasoning: 2,
  operational: 2,
  analytics: -1, // uses its own `items` array
  learning: 1,
}

export default function CompanionOsClient() {
  const c = useCopy(companionOsCopy)
  const a = useCopy(accents)

  /** Ecosystem family row — names parsed out of the approved "Today:/Tomorrow:" lines. */
  const familyNames = (line: string) => {
    const after = line.includes(':') ? line.slice(line.indexOf(':') + 1) : line
    return after
      .replace(/\.$/, '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  return (
    <main>
      <SiteNav />

      {/* HERO {#companionos-hero} — over the tropical loop, text left */}
      <MediaBed
        video="section-tropical-beach"
        poster="/assets/img/section-tropical-beach-poster.webp"
        scrim={0.68}
      >
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
                  accents={a.companionOsHero}
                />
                <p className="body-lead mt-8" style={{ maxWidth: '54ch' }}>
                  {c.hero.body}
                </p>
                <div className="mt-8 flex flex-col gap-1.5">
                  {c.hero.close.map((line) => (
                    <p
                      key={line}
                      className="font-serif"
                      style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.3rem)', fontWeight: 530, color: 'var(--text)' }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                  <EndorsementMark variant="axionari" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* 01 · WHY {#companionos-why} — fragmented industries node diagram */}
      <Section id="companionos-why" eyebrow="WHY" title={c.why.title} variant="bg">
        <Reveal>
          <div className="mt-8 flex flex-col gap-2">
            {c.why.beats.map((line) => (
              <p
                key={line}
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)',
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
        <div className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <NodeDiagram nodes={nounRun(c.why.industries)} breakLabel={c.why.fragmentLabel} />
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              {c.why.body.map((line, i) => (
                <p key={i} className="body-lead" style={{ maxWidth: '46ch' }}>
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <IconChipGrid items={nounRun(c.why.capabilities)} columns={2} />
            </div>
          </div>
        </div>
        <Reveal>
          <Coda>{c.why.coda}</Coda>
        </Reveal>
      </Section>

      {/* 02 · ONE PLATFORM {#companionos-one-platform} — the page's signature visual */}
      <Section
        id="companionos-one-platform"
        eyebrow="ONE PLATFORM"
        title={c.onePlatform.title}
        support={c.onePlatform.body[0]}
        variant="surface-3"
      >
        <Reveal>
          <p className="body-lead mt-4" style={{ maxWidth: '54ch' }}>
            {c.onePlatform.body[1]}
          </p>
        </Reveal>
        <div className="mt-14">
          <ConvergenceDiagram inputs={c.onePlatform.specializations} nodeLabel="Companion OS" />
        </div>
        <Reveal>
          <Coda>{c.onePlatform.coda}</Coda>
        </Reveal>
      </Section>

      {/* Capability deep-dives {#voice} … {#learning} — ids are deep-link targets */}
      {c.deepDives.map((d, i) => {
        const runIdx = RUN_INDEX[d.id]
        const hasRun = runIdx !== undefined && runIdx >= 0
        const body = hasRun ? d.body.filter((_, j) => j !== runIdx) : d.body

        let visual: ReactNode
        if ('chain' in d && d.chain) {
          visual = <StepFlow steps={d.chain} />
        } else if ('items' in d && d.items) {
          visual = <IconChipGrid items={d.items.slice(0, 10)} columns={2} />
        } else if (hasRun) {
          visual = <IconChipGrid items={nounRun(d.body[runIdx]).slice(0, 10)} columns={2} />
        } else {
          visual = <IconChipGrid items={d.body.slice(0, 10)} columns={2} />
        }

        const after = 'after' in d && d.after ? d.after : undefined

        return (
          <Block
            key={d.id}
            id={d.id}
            eyebrow={d.eyebrow}
            title={d.title}
            body={after ? [...body, ...after] : body}
            coda={d.coda}
            variant={i % 2 === 0 ? 'surface-1' : 'bg'}
            reverse={i % 2 === 1}
            visual={visual}
          />
        )
      })}

      {/* 09 · ENTERPRISE {#companionos-enterprise} */}
      <Block
        id="companionos-enterprise"
        eyebrow="ENTERPRISE"
        title={c.enterprise.title}
        body={[c.enterprise.body[0]]}
        coda={c.enterprise.coda}
        variant="surface-2"
        visual={<IconChipGrid items={nounRun(c.enterprise.body[1]).slice(0, 10)} columns={2} />}
      />

      {/* 10 · ECOSYSTEM {#companionos-ecosystem} — the family row.
          Destination Companion appears as a future NAME ONLY, never a link. */}
      <Section
        id="companionos-ecosystem"
        eyebrow="ECOSYSTEM"
        title={c.ecosystem.title}
        support={c.ecosystem.lead}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="eyebrow eyebrow-accent mb-5">{c.ecosystem.today.split(':')[0]}</div>
            <div className="grid sm:grid-cols-2 gap-x-8" style={{ borderTop: '1px solid var(--border-soft)' }}>
              {familyNames(c.ecosystem.today).map((name) => (
                <Reveal key={name}>
                  <div className="py-5" style={{ borderBottom: '1px solid var(--border-soft)' }}>
                    <span className="font-serif" style={{ fontSize: '1.15rem', fontWeight: 530, color: 'var(--text)' }}>
                      {name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">{c.ecosystem.tomorrow.split(':')[0]}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8" style={{ borderTop: '1px solid var(--border-soft)' }}>
              {familyNames(c.ecosystem.tomorrow).map((name, i) => (
                <Reveal key={name} delay={Math.min(i, 6) * 35}>
                  <div className="py-5" style={{ borderBottom: '1px solid var(--border-soft)' }}>
                    <span className="font-sans" style={{ fontSize: 15, color: 'var(--text-dim)' }}>
                      {name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <Reveal>
          <p className="body-lead mt-12" style={{ maxWidth: '54ch' }}>
            {c.ecosystem.body}
          </p>
          <Coda>{c.ecosystem.coda}</Coda>
        </Reveal>
      </Section>

      {/* 11 · AXIONARI {#companionos-axionari} */}
      <Section
        id="companionos-axionari"
        eyebrow="AXIONARI"
        title={c.axionari.title}
        support={c.axionari.body[0]}
        variant="surface-3"
      >
        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="body-lead" style={{ color: 'var(--text)', maxWidth: '48ch' }}>
                {c.axionari.body[1]}
              </p>
              <Coda>{c.axionari.coda}</Coda>
              <div className="mt-8">
                <EndorsementMark variant="axionari" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            {/* Ambient hospitality still — warm, dim, unposed (see CREDITS.md). */}
            <div
              aria-hidden="true"
              className="rounded-2xl overflow-hidden bg-cover bg-center"
              style={{
                aspectRatio: '4 / 3',
                backgroundImage: 'url(/assets/img/ambient-palms-night.webp)',
                border: '1px solid var(--border-soft)',
              }}
            />
          </div>
        </div>
      </Section>

      {/* 12 · NEXT STEP {#companionos-final-cta} — CTA leads back to Hotel Companion */}
      <MediaBed video="cta-beach-aerial" poster="/assets/img/cta-beach-aerial-poster.webp" scrim={0.72}>
        <section className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">12 · NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '20ch' }}>
                {c.finalCta.title}
              </h2>
              <p
                className="font-serif mt-6"
                style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)', fontWeight: 530, color: 'var(--accent)' }}
              >
                {c.finalCta.subtitle}
              </p>
              <p className="body-lead mt-8" style={{ maxWidth: '56ch' }}>
                {c.finalCta.body}
              </p>
              <p
                className="font-serif italic mt-8"
                style={{ fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', color: 'var(--text)' }}
              >
                {c.finalCta.platform}
              </p>
              <div className="mt-10">
                <Link href="/" className="btn-primary">
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
