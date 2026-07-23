'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { TabletOS } from '@/components/cds/TabletOS'
import { Teaser } from '@/components/cds/Teaser'
import { Breather } from '@/components/cds/Breather'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import {
  IconChipGrid,
  RoutingFlow,
  JourneyTimeline,
  NodeDiagram,
  DashboardMockup,
} from '@/components/cds/blocks'
import { VoiceMorph, TwoStageAlert } from '@/components/cds/interactive'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { platformCopy } from '@/lib/i18n/marketing/platform'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * Platform — PRODUCT_ARCHITECTURE §5/§10: this page owns capabilities and
 * answers exactly one question, "What does it actually do?", in six chapters:
 * Hero · Voice & knowledge · Lifecycle & action · Intelligence ·
 * Enterprise tease · Next step. Every merged chapter keeps its signature
 * visual (VoiceMorph, NodeDiagram, JourneyTimeline, TwoStageAlert,
 * RoutingFlow, DashboardMockup); the duplicate prose between them is gone.
 * Companion OS is Silent here (§7); the enterprise band is a tease (§8).
 * Old section ids survive as inner anchors.
 */

/** Hairline named list — card-less rows for name + description runs. */
function NamedRows({
  items,
  columns = 2,
}: {
  items: ReadonlyArray<{ name: string; desc: string }>
  columns?: 1 | 2
}) {
  return (
    <div className={`grid gap-x-12 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((it, i) => (
        <Reveal key={it.name} delay={Math.min(i, 6) * 40}>
          <div className="py-5" style={{ borderTop: '1px solid var(--border-soft)' }}>
            <div className="font-serif mb-1.5" style={{ fontSize: '1.1rem', fontWeight: 530, color: 'var(--text)' }}>
              {it.name}
            </div>
            <p className="font-sans" style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-dim)' }}>
              {it.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** A tight run of serif beats, left-aligned. */
function Beats({ lines, size = 'md' }: { lines: ReadonlyArray<string>; size?: 'md' | 'lg' }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-1.5">
        {lines.map((l) => (
          <p
            key={l}
            className="font-serif"
            style={{
              fontSize:
                size === 'lg' ? 'clamp(1.3rem, 2.2vw, 1.75rem)' : 'clamp(1.05rem, 1.6vw, 1.3rem)',
              fontWeight: 530,
              lineHeight: 1.3,
              color: 'var(--text)',
              maxWidth: '30ch',
            }}
          >
            {l}
          </p>
        ))}
      </div>
    </Reveal>
  )
}

export default function PlatformClient() {
  const c = useCopy(platformCopy)
  const g = useCopy(globalCopy)
  const a = useCopy(accents)
  const demo = useCopy(liveDemoCopy)

  return (
    <main>
      <SiteNav />

      {/* HERO {#platform-hero} — poolside still, text left, in-room tablet right */}
      <MediaBed poster="/assets/img/platform-pool-night.webp" scrim={0.68}>
        <section id="platform-hero" className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="container-rc">
            <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="eyebrow eyebrow-accent mb-7">{c.hero.positioning}</div>
                <MultiAccentHeadline
                  as="h1"
                  className="heading-hero"
                  style={{ color: 'var(--text)', maxWidth: '15ch' }}
                  text={c.hero.title}
                  accents={a.platformHero}
                />
                <p className="body-lead mt-8" style={{ maxWidth: '50ch' }}>
                  {c.hero.body}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/demo" className="btn-primary">
                    {c.finalCta.cta}
                  </Link>
                  {/* One secondary label site-wide (PRODUCT_ARCHITECTURE §11) */}
                  <button type="button" onClick={openLiveDemo} className="btn-secondary">
                    {demo.open}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6">
                <TabletOS cycle={['home', 'beach', 'spa', 'concierge']} />
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* 01 · VOICE & YOUR HOTEL'S KNOWLEDGE — merged chapter
          (was: voice-first + your-voice + knows-property + not-generic-ai) */}
      <Section
        id="platform-voice-first"
        eyebrow="01 · VOICE-FIRST"
        title={c.voiceFirst.title}
        support={c.voiceFirst.body1}
        variant="surface-1"
      >
        {/* the voice, morphing to the hotel's own register */}
        <div id="platform-your-voice" className="mt-14 scroll-mt-24">
          <VoiceMorph
            voices={c.yourVoice.voices}
            guestQuestion={c.yourVoice.morphQuestion}
            deviceLabel={c.yourVoice.morphDeviceLabel}
          />
          <div className="mt-10">
            <Beats lines={c.yourVoice.close} size="lg" />
          </div>
        </div>

        {/* every channel it speaks through */}
        <div id="platform-channels" className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow eyebrow-accent">{c.voiceFirst.availableLead}</div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <NamedRows items={c.channels.items} columns={2} />
          </div>
        </div>

        {/* what it knows — property and destination */}
        <div id="platform-knows-property" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="body-lead mb-10" style={{ color: 'var(--text)', maxWidth: '48ch' }}>
              {c.knowsProperty.lead}
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="eyebrow eyebrow-accent mb-6">{c.knowledgeSplit.property}</div>
              <IconChipGrid items={c.knowsProperty.items.slice(0, 10)} columns={2} />
            </div>
            <div id="platform-destination">
              <div className="eyebrow eyebrow-accent mb-6">{c.knowledgeSplit.destination}</div>
              <IconChipGrid items={c.destination.items.slice(0, 10)} columns={2} />
            </div>
          </div>
        </div>

        {/* the contrast that makes the knowledge matter */}
        <div id="platform-not-generic-ai" className="mt-16 scroll-mt-24">
          <NodeDiagram nodes={c.notGenericAi.beats} breakLabel={c.notGenericAi.body[1]} />
          {/* P4 §3: one supporting idea — the competing beat column removed */}
          <Reveal>
            <p className="body-lead mt-10" style={{ maxWidth: '52ch' }}>
              {c.notGenericAi.close}
            </p>
          </Reveal>
        </div>
      </Section>

      <Breather id="band-platform-waterfall" image="/assets/breathers/waterfall-swim.webp" />

      {/* 02 · LIFECYCLE & ACTION — merged chapter
          (was: lifecycle + issue-detection + reservations + request-action) */}
      <Section
        id="platform-lifecycle"
        eyebrow="02 · LIFECYCLE"
        title={c.lifecycle.title}
        variant="bg"
      >
        <div className="mt-14">
          <JourneyTimeline stages={c.lifecycle.stages} />
        </div>

        {/* the 2 AM save — issue detection */}
        <div id="platform-issue-detection" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="body-lead mb-10" style={{ maxWidth: '48ch' }}>
              {c.issueDetection.lead}
            </p>
          </Reveal>
          <TwoStageAlert
            guest={c.issueAlert.guest}
            reply={c.issueAlert.reply}
            deviceLabel={c.issueAlert.deviceLabel}
            stages={c.issueDetection.features.slice(1, 3).map((f) => ({ title: f.name, body: f.desc }))}
          />
        </div>

        {/* every request becomes routed action */}
        <div id="platform-request-action" className="mt-16 scroll-mt-24">
          <RoutingFlow
            pairs={c.requestAction.departments.map((d) => ({
              from: c.requestAction.routingFrom,
              to: d,
            }))}
          />
          {/* P4 §4/§7: one reading path — chips, then the single closing beat */}
          <div id="platform-reservations" className="mt-12 scroll-mt-24" style={{ maxWidth: 760 }}>
            <IconChipGrid items={c.reservations.items.slice(0, 8)} columns={2} />
          </div>
          <div className="mt-10">
            <Beats lines={c.requestAction.close} size="lg" />
          </div>
        </div>
      </Section>

      {/* 03 · INTELLIGENCE — merged chapter; the site's ONLY dashboards telling
          (was: revenue-intel + guest-memory + dashboards) */}
      <Section
        id="platform-intelligence"
        eyebrow="03 · INTELLIGENCE"
        title={c.revenueIntel.title}
        support={c.revenueIntel.lead}
        variant="surface-1"
      >
        <div id="platform-revenue-intel" className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start scroll-mt-24">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="body-lead" style={{ maxWidth: '42ch' }}>
                {c.revenueIntel.body}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <IconChipGrid items={c.revenueIntel.items.slice(0, 10)} columns={2} />
          </div>
        </div>

        {/* who the guest is — memory and intent */}
        <div id="platform-guest-memory" className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16 scroll-mt-24">
          <div>
            <Reveal>
              <p className="body-lead mb-6" style={{ color: 'var(--text)' }}>
                {c.guestMemory.body}
              </p>
            </Reveal>
            <IconChipGrid items={c.guestMemory.items} columns={2} />
          </div>
          <div id="platform-guest-intel">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-3">{c.guestIntel.title}</div>
              <p className="body-lead mb-6" style={{ color: 'var(--text)' }}>
                {c.guestIntel.lead}
              </p>
            </Reveal>
            <IconChipGrid items={c.guestIntel.items} columns={2} />
          </div>
        </div>

        {/* the command centre */}
        <div id="platform-dashboards" className="mt-16 scroll-mt-24">
          {/* P4 §4: the dashboard is the focal point — the chip column that
              competed with it is gone */}
          {/* {#dashboards-resolution} — NEEDS CONFIRM on the 91/9 split */}
          <div id="dashboards-resolution" style={{ maxWidth: 880 }}>
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
          <div className="mt-12">
            <Beats lines={c.dashboards.close} size="lg" />
          </div>
        </div>
      </Section>

      {/* 04 · ENTERPRISE-READY — a tease, not a summary (PRODUCT_ARCHITECTURE §8):
          the enterprise question named, answered only on /enterprise */}
      <Section
        id="platform-enterprise-ready"
        eyebrow="04 · ENTERPRISE-READY"
        title={c.enterpriseReady.title}
        variant="surface-2"
        tight
      >
        <div id="platform-multi-property" className="mt-10 scroll-mt-24">
          <Teaser split lines={[c.enterpriseReady.close]} href="/enterprise" label={g.nav.enterprise} />
        </div>
      </Section>

      {/* 05 · NEXT STEP {#platform-final-cta} — warm media band */}
      <MediaBed poster="/assets/img/hero-poolside.webp" scrim={0.72}>
        <section id="platform-final-cta" className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">05 · NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '18ch' }}>
                {c.finalCta.title}
              </h2>
            </Reveal>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
              {c.finalCta.beats.map((b) => (
                <Reveal key={b}>
                  <p className="font-sans py-3" style={{ fontSize: 15, color: 'var(--text-dim)' }}>
                    {b}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-10">
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
