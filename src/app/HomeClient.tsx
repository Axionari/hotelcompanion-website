'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { QuestionMarquee } from '@/components/cds/QuestionMarquee'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { HeroIgnition } from '@/components/cds/HeroIgnition'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { JourneyWalkthrough } from '@/components/cds/JourneyWalkthrough'
import { DeviceWall } from '@/components/cds/DeviceWall'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import {
  StatBlock,
  IconChipGrid,
  RoutingFlow,
  JourneyTimeline,
  ConvergenceDiagram,
  CapabilitySurface,
  DashboardMockup,
  Accordion,
  CommissionCompare,
} from '@/components/cds/blocks'
import { COMPANION_OS_CAPABILITIES } from '@/lib/capabilities'
import { useCopy } from '@/lib/i18n/useCopy'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * Home — composed to Restaurant Companion level.
 * Seventeen text sections trimmed to ten composed scenes per the Level-Up plan §D.
 * Every section is left-aligned and carries a visual: device, diagram, timeline,
 * dashboard, marquee or photography. No centered text walls.
 */
export default function HomeClient() {
  const c = useCopy(homeCopy)
  const a = useCopy(accents)
  const screens = useCopy(deviceScreens)

  return (
    <main>
      <SiteNav />

      {/* 01 · HERO {#home-hero} — over the coastal loop, text left, tablet right */}
      <MediaBed video="hero-coastal-sunset" poster="/assets/img/hero-coastal-sunset-poster.webp" scrim={0.66}>
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Darkens the hero away from the orb so the orb reads brightest */}
          <div className="hero-vignette" aria-hidden="true" />
          <div className="container-rc relative" style={{ zIndex: 1 }}>
            <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="eyebrow eyebrow-accent mb-7">{c.hero.positioning}</div>
                <MultiAccentHeadline
                  as="h1"
                  className="heading-hero"
                  style={{ color: 'var(--text)', maxWidth: '15ch' }}
                  text={c.hero.h1}
                  accents={a.homeHero}
                />
                <p className="body-lead mt-8" style={{ maxWidth: '44ch' }}>
                  {c.hero.lead1}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/demo" className="btn-primary">
                    {c.hero.primaryCta}
                  </Link>
                  {/* The working demo is the product tour — this retires the
                      earlier /platform placeholder. Approved label unchanged. */}
                  <button type="button" onClick={openLiveDemo} className="btn-secondary">
                    {c.hero.secondaryCta}
                  </button>
                </div>
                <div className="mt-10">
                  <EndorsementMark variant="companion-os" />
                </div>
              </div>
              <div className="lg:col-span-6">
                {/* The Ignition: the orb is the light source of the hero and the
                    live mic of the demo — one object, not two. */}
                <HeroIgnition />
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* Trust strip {#home-trust} — hairline, small caps */}
      <div style={{ background: 'var(--surface-1)', borderBlock: '1px solid var(--border-soft)' }}>
        <div className="container-rc py-6">
          <p className="eyebrow">{c.trust}</p>
        </div>
      </div>

      {/* 02 · THE COST OF INTERMEDIARIES — the book-direct revenue story.
          One of only two big numbers on the site; both carry NEEDS CONFIRM. */}
      <Section eyebrow={`02 · ${c.otaStake.eyebrow}`} variant="surface-1">
        <div className="mt-4">
          <StatBlock figure={c.otaStake.figure} caption={c.otaStake.caption} source={c.otaStake.source}>
            <div className="mt-4" style={{ maxWidth: 460 }}>
              <CommissionCompare rows={c.otaStake.compare} />
            </div>
          </StatBlock>
        </div>
      </Section>

      {/* 03 · THE STAKE {#home-stake} — left stat block, count-up on reveal */}
      <Section eyebrow="03 · THE STAKE" variant="bg">
        <div className="mt-4">
          <StatBlock figure={c.stake.figure} caption={c.stake.caption} source={c.stake.source}>
            {c.stake.beats.map((b, i) => (
              <p key={i} className="body-lead" style={{ maxWidth: '56ch' }}>
                {b}
              </p>
            ))}
          </StatBlock>
        </div>
      </Section>

      {/* 03 · CONVERSATION {#home-conversation} — headline + full-bleed marquee */}
      <section className="py-16 md:py-24" style={{ background: 'var(--surface-1)' }}>
        <div className="container-rc">
          <Reveal>
            <div className="eyebrow eyebrow-accent mb-5">04 · CONVERSATION</div>
            <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '18ch' }}>
              {c.conversation.title}
            </h2>
            <p className="body-lead mt-6" style={{ maxWidth: '52ch' }}>
              {c.conversation.lead}
            </p>
          </Reveal>
        </div>
        <div className="mt-14">
          <QuestionMarquee />
        </div>
        <div className="container-rc mt-14">
          <Reveal>
            <p
              className="font-serif"
              style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 530, color: 'var(--text)', maxWidth: '24ch' }}
            >
              {c.conversation.close}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 · THE JOURNEY — the signature scroll-synced sticky walkthrough.
          PRE (win the direct booking) · DURING (every request an upsell) ·
          AFTER (earn the review, rebook direct), with a copper revenue tally. */}
      <Section eyebrow="05 · PRE · DURING · AFTER" title={c.revenue.title} variant="bg">
        <div className="mt-14">
          <JourneyWalkthrough steps={c.journey.steps} tallyLabel={c.journey.tallyLabel} />
        </div>
      </Section>

      {/* 06 · THE INTERFACE OF 2029 — one intent, every surface */}
      <Section eyebrow="06 · EVERY SURFACE" title={c.surfaces2029.title} support={c.surfaces2029.caption} variant="surface-1">
        <div className="mt-14">
          <DeviceWall intent={c.surfaces2029.intent} />
        </div>
      </Section>

      {/* 05 · KNOWLEDGE SPLIT {#home-knows} — property / destination, chips not stacks */}
      <Section eyebrow="07 · KNOWLEDGE" title={c.knows.title} support={c.knows.lead} variant="bg">
        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="eyebrow mb-6">{c.hero.positioning.split('.')[0]}</div>
            <IconChipGrid items={c.knows.property.slice(0, 10)} columns={2} />
          </div>
          <div>
            <div className="eyebrow mb-6">{c.knows.destinationLead}</div>
            <IconChipGrid items={c.knows.destination} columns={2} />
          </div>
        </div>
        <Reveal>
          <p
            className="font-serif mt-14"
            style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', fontWeight: 530, color: 'var(--text)', maxWidth: '30ch' }}
          >
            {c.knows.close[c.knows.close.length - 1]}
          </p>
        </Reveal>
      </Section>

      {/* 06 · INTELLIGENCE → DASHBOARD {#home-intelligence} + {#home-enterprise-intel} */}
      <Section
        eyebrow="08 · INTELLIGENCE"
        title={c.intelligence.title}
        support={c.enterpriseIntel.lead}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <IconChipGrid items={c.intelligence.items} columns={2} />
          </div>
          <div className="lg:col-span-7">
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
          <p className="body-lead mt-12" style={{ maxWidth: '58ch' }}>
            {c.enterpriseIntel.close}
          </p>
        </Reveal>
      </Section>

      {/* 07 · EXECUTION {#home-execution} — routing flow cards */}
      <Section eyebrow="09 · EXECUTION" title={c.execution.title} support={c.execution.lead} variant="bg">
        <div className="mt-14">
          <RoutingFlow pairs={c.execution.pairs} />
        </div>
        <Reveal>
          <p
            className="font-serif mt-12"
            style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', fontWeight: 530, color: 'var(--text)', maxWidth: '28ch' }}
          >
            {c.execution.close[c.execution.close.length - 1]}
          </p>
        </Reveal>
      </Section>

      {/* 08 · COMPANION OS {#home-companion-os} — convergence + capability surface */}
      <Section eyebrow="10 · COMPANION OS" title={c.companionOs.title} support={c.companionOs.lead} variant="surface-3">
        <div className="mt-14">
          <ConvergenceDiagram inputs={c.convergence.inputs} nodeLabel={c.convergence.node} />
        </div>
        <div className="mt-16">
          <CapabilitySurface items={COMPANION_OS_CAPABILITIES.map((x) => ({ id: x.id, name: x.name }))} />
        </div>
        <Reveal>
          <div className="mt-12">
            <EndorsementMark variant="companion-os" />
          </div>
        </Reveal>
      </Section>

      {/* 09 · LIVE IN DAYS {#home-live-in-days} — three-step timeline */}
      <Section eyebrow="11 · DEPLOYMENT" title={c.liveInDays.title} support={c.liveInDays.body} variant="bg">
        <div className="mt-14">
          <JourneyTimeline
            stages={c.liveInDays.beats.map((b, i) => ({
              name: b,
              body: i === c.liveInDays.beats.length - 1 ? c.liveInDays.close[0] : c.liveInDays.close[1] ?? '',
            }))}
          />
        </div>
      </Section>

      {/* 10 · BOUNDARIES {#home-what-it-is-not-teaser} — statement + link to Enterprise */}
      <Section eyebrow="12 · BOUNDARIES" variant="surface-1" tight>
        <Reveal>
          <p
            className="font-serif"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)', fontWeight: 530, lineHeight: 1.2, color: 'var(--text)', maxWidth: '26ch' }}
          >
            {c.whatItIsNot.headline}
          </p>
          <div className="mt-8 flex flex-col gap-2" style={{ maxWidth: '52ch' }}>
            {c.whatItIsNot.beats.map((b) => (
              <p key={b} className="body-lead">
                {b}
              </p>
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/enterprise#what-it-is-not"
              className="font-sans transition-colors hover:text-[#d4824f]"
              style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 15 }}
            >
              {c.whatItIsNot.cta} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* 11 · FOUNDING PARTNERS {#home-founding-partner} */}
      <Section eyebrow="13 · FOUNDING PARTNERS" title={c.foundingPartner.title} support={c.foundingPartner.lead} variant="bg">
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="body-lead" style={{ color: 'var(--text)' }}>
              {c.foundingPartner.receiveLead}
            </p>
          </div>
          <div className="lg:col-span-7">
            <IconChipGrid items={c.foundingPartner.items} columns={2} />
          </div>
        </div>
        <Reveal>
          <p className="mt-10">
            <Link
              href="/contact#founding"
              className="font-sans transition-colors hover:text-[#d4824f]"
              style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 15 }}
            >
              {c.foundingCta} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* 12 · FAQ {#home-faq} — accordion */}
      <Section eyebrow="14 · FAQ" title={c.faq.title} variant="surface-1">
        <div className="mt-12" style={{ maxWidth: 860 }}>
          <Accordion items={c.faq.items} />
        </div>
      </Section>

      {/* 13 · FINAL CTA {#home-final-cta} — warm media band */}
      <MediaBed video="cta-beach-aerial" poster="/assets/img/cta-beach-aerial-poster.webp" scrim={0.72}>
        <section className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">15 · NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '18ch' }}>
                {c.finalCta.title}
              </h2>
              <p
                className="font-serif mt-8"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 530, color: 'var(--text)' }}
              >
                {c.finalCta.platform}
              </p>
              <div className="mt-10">
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
