'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { QuestionMarquee } from '@/components/cds/QuestionMarquee'
import { AxionariMark } from '@/components/cds/EndorsementMark'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { HeroIgnition } from '@/components/cds/HeroIgnition'
import { TabletOS } from '@/components/cds/TabletOS'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { Teaser } from '@/components/cds/Teaser'
import { Breather } from '@/components/cds/Breather'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { JourneyWalkthrough } from '@/components/cds/JourneyWalkthrough'
import { DeviceWall } from '@/components/cds/DeviceWall'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import {
  StatBlock,
  IconChipGrid,
  JourneyTimeline,
  ResolutionDonut,
  Accordion,
  CommissionCompare,
} from '@/components/cds/blocks'
import { useCopy } from '@/lib/i18n/useCopy'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * Home — v3 (docs/v3/00_BUILD_BRIEF.md): 15 numbered sections condensed to 13.
 * Phase 1 is words & structure only — merges (02+03, 08+09 → content level),
 * caption cuts, Companion OS dedupe (G5), renumbered eyebrows 01–13.
 * The Phase 3 heroes (sun arc, constellation) rebuild sections 04/05 visually.
 */
export default function HomeClient() {
  const c = useCopy(homeCopy)
  const a = useCopy(accents)
  const g = useCopy(globalCopy)
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
                {/* v3 {#01}: mono proof line replaces the Companion OS badge (G5) */}
                <div className="eyebrow mt-10">{c.hero.proofLine}</div>
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

      {/* 02 · WHAT'S AT STAKE {#home-stake} — v3 merge of old 02+03: both
          stats in one band, two closing paragraphs cut to one line (deck {#02}).
          Visual side-by-side arrives with the Phase 2 StatBlock work. */}
      <Section id="home-stake" eyebrow="02 · WHAT'S AT STAKE" variant="surface-1" flush>
        <div className="mt-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <StatBlock figure={c.otaStake.figure} caption={c.otaStake.caption} source={c.otaStake.source}>
            <div className="mt-4" style={{ maxWidth: 460 }}>
              <CommissionCompare rows={c.otaStake.compare} />
            </div>
          </StatBlock>
          <StatBlock figure={c.stake.figure} caption={c.stake.caption} source={c.stake.source} />
        </div>
        <Reveal>
          <p className="body-lead mt-12" style={{ maxWidth: '56ch' }}>
            {c.stake.close}
          </p>
        </Reveal>
      </Section>

      {/* 03 · CONVERSATION {#home-conversation} — headline + full-bleed marquee */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg)' }}>
        <div className="container-rc">
          <Reveal>
            <div className="eyebrow eyebrow-accent mb-5">03 · CONVERSATION</div>
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

      {/* 04 · REVENUE {#home-revenue} — v3: five explanation captions and the
          PRE/DURING/AFTER bullets deleted (deck {#04}); headline, ticker and
          tablet stay. Intentionally sparse until the Phase 3 sun-arc rebuild.
          A1 thesis line lands here (styled champagne in Phase 3). */}
      <Section id="home-revenue" eyebrow="04 · REVENUE" title={c.revenue.title} support={c.revenue.thesis} variant="surface-1">
        <div className="mt-14">
          <JourneyWalkthrough steps={c.journey.steps} tallyLabel={c.journey.tallyLabel} />
        </div>
      </Section>

      {/* 05 · EVERY SURFACE — one intent, every surface */}
      <Section eyebrow="05 · EVERY SURFACE" title={c.surfaces2029.title} support={c.surfaces2029.caption} variant="surface-1">
        <div className="mt-14">
          <DeviceWall intent={c.surfaces2029.intent} />
        </div>
      </Section>

      {/* 05 · KNOWLEDGE SPLIT {#home-knows} — property / destination, chips not stacks */}
      {/* THE PRODUCT, BIG — one unbroken look at the interface itself.
          No competing copy: the device is the whole statement. */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(64% 54% at 50% 42%, rgba(200,106,58,0.16) 0%, rgba(200,106,58,0.05) 46%, transparent 74%)',
          }}
        />
        <div className="container-rc relative py-12 md:py-16">
          <Reveal>
            <div className="eyebrow eyebrow-accent mb-6">{c.surfaces2029.caption}</div>
          </Reveal>
          {/* Scaled rather than widened: TabletOS's chrome is fixed-px and only
              correct near its native 560, so stretching it collapsed the photo
              and overlapped the actions. A transform keeps the exact layout and
              just makes it big. */}
          <Reveal delay={80}>
            <div className="cinematic-stage">
              <div className="cinematic-device">
                <TabletOS screen="beach" orbState="speaking" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="06 · KNOWLEDGE" title={c.knows.title} support={c.knows.lead} variant="bg">
        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="eyebrow mb-6">{c.hero.positioning.split('.')[0]}</div>
            <IconChipGrid items={c.knows.property.slice(0, 10)} columns={2} />
            {/* v3 {#06}: insider flavor line, gold caption style */}
            <p className="font-serif italic mt-6" style={{ fontSize: '1.05rem', color: 'var(--champagne)' }}>
              {c.knows.insiderProperty}
            </p>
          </div>
          <div>
            <div className="eyebrow mb-6">{c.knows.destinationLead}</div>
            <IconChipGrid items={c.knows.destination} columns={2} />
            {/* v3 {#06}: insider flavor line, gold caption style */}
            <p className="font-serif italic mt-6" style={{ fontSize: '1.05rem', color: 'var(--champagne)' }}>
              {c.knows.insiderDestination}
            </p>
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

      {/* 07 · INTELLIGENCE & EXECUTION {#home-intelligence} — v3 merge of old
          08+09 (deck {#07}): one heading, Centro de mando kept, old routing
          list and intro/closing paragraphs deleted. GuestMemoryCard and
          RequestExecutionCard join in Phase 2/3. */}
      <Section
        eyebrow="07 · INTELLIGENCE & EXECUTION"
        title={c.intelligence.title}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <IconChipGrid items={c.intelligence.items} columns={2} />
          </div>
          <div className="lg:col-span-7">
            {/* The full dashboard is canonical on Platform. */}
            <Teaser lines={[c.dashboard.title]} href="/platform#platform-dashboards" label={g.nav.platform}>
              {/* 91% / 9%: ILLUSTRATIVE — audit before production promotion */}
              <ResolutionDonut
                resolvedPct={91}
                escalatedPct={9}
                resolvedLabel={c.dashboard.resolvedLabel}
                escalatedLabel={c.dashboard.escalatedLabel}
              />
            </Teaser>
          </div>
        </div>
      </Section>

      <Breather id="band-home-tree" image="/assets/breathers/giant-tree.webp" />

      {/* 08 · COMPANION OS {#home-companion-os} — v3 quiet band (deck {#08}):
          one line + platform link + the Powered by AXIONARI mark (G5/G6).
          Convergence diagram and the eight capability names left this page. */}
      <Section id="home-companion-os" eyebrow="08 · COMPANION OS" variant="surface-3" flush>
        <Reveal>
          <p className="body-lead" style={{ maxWidth: '58ch', color: 'var(--text)' }}>
            {c.companionOs.line}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
            <Link
              href="/companion-os"
              className="font-sans inline-flex items-center gap-2 transition-colors hover:text-[#d4824f]"
              style={{ color: 'var(--accent)', fontSize: 15, fontWeight: 500, minHeight: 44 }}
            >
              {c.companionOs.link}
            </Link>
            <AxionariMark />
          </div>
        </Reveal>
      </Section>

      {/* 09 · DEPLOYMENT {#home-live-in-days} — three-step timeline */}
      <Section eyebrow="09 · DEPLOYMENT" title={c.liveInDays.title} support={c.liveInDays.body} variant="bg" tight>
        {/* The deck gives three standalone beats and a two-line close for the
            section — there are no per-step descriptions. The previous mapping
            invented them by recycling close[1], which put the same sentence
            under steps 01 and 02. */}
        <div className="mt-14">
          <JourneyTimeline stages={c.liveInDays.beats.map((b) => ({ name: b }))} />
        </div>
        <Reveal>
          {/* Set in General Sans, not Fraunces: in serif at 1.5rem the close
              competed with the step titles above it. It is a resolving line,
              not a second headline. */}
          <div className="mt-7 flex flex-col gap-1">
            {c.liveInDays.close.map((line) => (
              <p
                key={line}
                className="font-sans"
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'var(--text-dim)',
                  maxWidth: '46ch',
                  lineHeight: 1.6,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Breather id="band-home-pause" image="/assets/breathers/beach-golden.webp" video="section-tropical-beach" height="clamp(280px, 44vh, 520px)" />

      {/* 10 · BOUNDARIES {#home-what-it-is-not-teaser} — untouched (brief: best-written section) */}
      <Section eyebrow="10 · BOUNDARIES" variant="surface-1" tight>
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
      <Section eyebrow="11 · FOUNDING PARTNERS" title={c.foundingPartner.title} support={c.foundingPartner.lead} variant="bg" tight>
        {/* The full programme is canonical on /contact#founding. */}
        <div className="mt-12">
          <Teaser
            split
            lines={[c.foundingPartner.receiveLead]}
            href="/contact#founding"
            label={c.foundingCta}
          >
            {/* v3 Phase 2 (G4): the four benefits as a mono list — copy unchanged */}
            <ul className="flex flex-col gap-3">
              {c.foundingPartner.items.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="eyebrow"
                  style={{ color: 'var(--text-dim)', fontSize: 11, display: 'flex', gap: 10 }}
                >
                  <span aria-hidden="true" style={{ color: 'var(--gold)' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Teaser>
        </div>
      </Section>

      {/* 12 · FAQ {#home-faq} — v3: 4 on-page Q&As, the rest live on /faq (deck {#12}) */}
      <Section eyebrow="12 · FAQ" title={c.faq.title} variant="surface-1">
        <div className="mt-12" style={{ maxWidth: 860 }}>
          <Accordion items={c.faq.items} />
        </div>
        <p className="mt-8">
          <Link
            href="/faq"
            className="font-sans transition-colors hover:text-[#d4824f]"
            style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 15 }}
          >
            {c.faq.allLink}
          </Link>
        </p>
      </Section>

      {/* 13 · FINAL CTA {#home-final-cta} — warm media band */}
      <MediaBed poster="/assets/img/ambient-palms-night.webp" scrim={0.72}>
        <section className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">13 · NEXT STEP</div>
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
