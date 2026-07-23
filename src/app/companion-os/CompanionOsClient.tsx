'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { IconChipGrid, ConvergenceDiagram } from '@/components/cds/blocks'
import { useCopy } from '@/lib/i18n/useCopy'
import { companionOsCopy } from '@/lib/i18n/marketing/companionOs'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * /companion-os — PRODUCT_ARCHITECTURE §5/§10: the technology philosophy —
 * the platform behind the ecosystem, never another Hotel Companion page.
 * Six sections: Hero · Why (one layer) · The architecture (eight capability
 * cards — layer language only) · Enterprise foundation · Ecosystem & Axionari
 * · Next step. The sequential capability storytelling is gone: each former
 * deep-dive survives as a card carrying its title and first (layer-level)
 * sentence, with its id preserved as a deep-link target. Depth is held back
 * deliberately (§8) — the page should leave strategic buyers wanting the
 * conversation.
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
      <MediaBed poster="/assets/img/section-tropical-beach-poster.webp" scrim={0.68}>
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

      {/* 01 · WHY {#companionos-why} — one layer, many industries
          (merged: why + one-platform; the convergence diagram is the page's
          signature visual and closes the argument) */}
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
        {/* P4 §4: one focal point — the fragmentation diagram competed with
            the convergence signature below; prose carries the why */}
        <div className="mt-10 flex flex-col gap-4" style={{ maxWidth: '54ch' }}>
          {c.why.body.map((line, i) => (
            <p key={i} className="body-lead">
              {line}
            </p>
          ))}
        </div>
        <div id="companionos-one-platform" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="body-lead" style={{ color: 'var(--text)', maxWidth: '54ch' }}>
              {c.onePlatform.body[0]}
            </p>
          </Reveal>
          <div className="mt-12">
            <ConvergenceDiagram inputs={c.onePlatform.specializations} nodeLabel="Companion OS" />
          </div>
          <Reveal>
            <Coda>{c.onePlatform.coda}</Coda>
          </Reveal>
        </div>
      </Section>

      {/* 02 · THE ARCHITECTURE {#companionos-architecture} — eight capability
          cards, layer language only; former deep-dive ids kept as anchors */}
      <Section
        id="companionos-architecture"
        eyebrow="ONE PLATFORM"
        title={c.onePlatform.title}
        variant="surface-3"
      >
        <div className="mt-14 grid sm:grid-cols-2 gap-x-12" style={{ borderTop: '1px solid var(--border-soft)' }}>
          {c.deepDives.map((d, i) => (
            <Reveal key={d.id} delay={Math.min(i, 6) * 40}>
              <div id={d.id} className="h-full py-8 scroll-mt-24" style={{ borderBottom: '1px solid var(--border-soft)' }}>
                <div className="eyebrow eyebrow-accent mb-3">{d.eyebrow}</div>
                <div className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 530, color: 'var(--text)' }}>
                  {d.title}
                </div>
                <p className="font-sans mt-2.5" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '44ch' }}>
                  {d.body[0]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 03 · ENTERPRISE {#companionos-enterprise} — the platform's foundation */}
      <Section
        id="companionos-enterprise"
        eyebrow="ENTERPRISE"
        title={c.enterprise.title}
        support={c.enterprise.body[0]}
        variant="surface-2"
      >
        <div className="mt-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <IconChipGrid items={nounRun(c.enterprise.body[1]).slice(0, 10)} columns={2} />
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <Coda>{c.enterprise.coda}</Coda>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 04 · ECOSYSTEM & AXIONARI {#companionos-ecosystem} — the family and
          its builder, one section (merged: ecosystem + axionari).
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
        <div id="companionos-axionari" className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-24">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="body-lead" style={{ color: 'var(--text)', maxWidth: '48ch' }}>
                {c.axionari.body[0]}
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

      {/* 05 · NEXT STEP {#companionos-final-cta} — CTA leads back to Hotel Companion */}
      <MediaBed poster="/assets/img/platform-pool-night.webp" scrim={0.72}>
        <section className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '20ch' }}>
                {c.finalCta.title}
              </h2>
              <p
                className="font-serif mt-6"
                style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)', fontWeight: 530, color: 'var(--accent)' }}
              >
                {c.finalCta.subtitle}
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

      <SiteFooter />
    </main>
  )
}
