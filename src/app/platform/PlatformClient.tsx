'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { TabletOS } from '@/components/cds/TabletOS'
import { Teaser, CapabilityStrip } from '@/components/cds/Teaser'
import { Breather } from '@/components/cds/Breather'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import {
  IconChipGrid,
  RoutingFlow,
  JourneyTimeline,
  NodeDiagram,
  DashboardMockup,
} from '@/components/cds/blocks'
import { VoiceMorph, TwoStageAlert } from '@/components/cds/interactive'
import { COMPANION_OS_CAPABILITIES } from '@/lib/capabilities'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { platformCopy } from '@/lib/i18n/marketing/platform'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * Platform — composed to Restaurant Companion level (Level-Up plan P2,
 * Design & Interaction Spec §5). Fifteen composed scenes, every one
 * left-aligned and carrying a visual: device, morph, diagram, timeline,
 * alert flow, routing flow, dashboard or photography. No centered text walls,
 * no two adjacent sections sharing a surface step.
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
  const home = useCopy(homeCopy)

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
                  {/* Approved string, reused from the Home hero */}
                  <a href="#platform-voice-first" className="btn-secondary">
                    {home.hero.secondaryCta}
                  </a>
                </div>
                <div className="mt-10">
                  <EndorsementMark variant="companion-os" />
                </div>
              </div>
              <div className="lg:col-span-6">
                <TabletOS cycle={['home', 'beach', 'spa', 'concierge']} />
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* 01 · VOICE-FIRST {#platform-voice-first} + channels {#platform-channels}
          Product-first: the device carries the meaning, the copy is terse. */}
      <Section
        id="platform-voice-first"
        eyebrow="01 · VOICE-FIRST"
        title={c.voiceFirst.title}
        support={c.voiceFirst.body1}
        variant="surface-1"
      >
        {/* The full stepper is canonical on Home; this is the teaser. */}
        <div className="mt-12">
          <Teaser
            lines={[home.journey.steps[0].caption, home.journey.steps[home.journey.steps.length - 1].caption]}
            href="/#home-revenue"
            label={home.revenue.title}
          />
        </div>
        <div id="platform-channels" className="mt-20">
          <Reveal>
            <div className="eyebrow eyebrow-accent mb-6">{c.voiceFirst.availableLead}</div>
          </Reveal>
          <NamedRows items={c.channels.items} columns={2} />
        </div>
      </Section>

      {/* 02 · BRAND VOICE {#platform-your-voice} + {#platform-five-voices} — the voice morph */}
      <Section
        id="platform-your-voice"
        eyebrow="02 · BRAND VOICE"
        title={c.yourVoice.title}
        support={c.yourVoice.voicesLead}
        variant="bg"
      >
        <div id="platform-five-voices" className="mt-14">
          <VoiceMorph
            voices={c.yourVoice.voices}
            guestQuestion={c.yourVoice.morphQuestion}
            deviceLabel={c.yourVoice.morphDeviceLabel}
          />
        </div>
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="body-lead" style={{ maxWidth: '48ch' }}>
                {c.yourVoice.body}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Beats lines={c.yourVoice.close} size="lg" />
          </div>
        </div>
      </Section>

      {/* 03 · KNOWLEDGE SPLIT {#platform-knows-property} + {#platform-destination} */}
      <Section
        id="platform-knows-property"
        eyebrow="03 · PROPERTY KNOWLEDGE"
        title={c.knowsProperty.title}
        support={c.knowsProperty.lead}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="eyebrow eyebrow-accent mb-6">{c.knowledgeSplit.property}</div>
            {/* Level-Up §D: the 20-item noun-stack renders as its strongest ten. */}
            <IconChipGrid items={c.knowsProperty.items.slice(0, 10)} columns={2} />
          </div>
          <div id="platform-destination">
            <div className="eyebrow eyebrow-accent mb-6">{c.knowledgeSplit.destination}</div>
            <IconChipGrid items={c.destination.items.slice(0, 10)} columns={2} />
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Beats lines={c.knowsProperty.close} />
            <Reveal>
              <p className="body-lead mt-8" style={{ maxWidth: '46ch' }}>
                {c.destination.close}
              </p>
            </Reveal>
          </div>
          {/* {#platform-destination-examples} — the vivid, un-PMS-able questions */}
          <div id="platform-destination-examples" className="lg:col-span-6">
            <Reveal>
              <p className="body-lead mb-5" style={{ color: 'var(--text)', maxWidth: '42ch' }}>
                {c.destinationExamples.lead}
              </p>
            </Reveal>
            <Beats lines={c.destinationExamples.questions} />
            <Reveal>
              <div className="mt-8 flex flex-col gap-2" style={{ maxWidth: '48ch' }}>
                {c.destinationExamples.close.map((l) => (
                  <p key={l} className="body-lead">
                    {l}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 04 · NOT GENERIC AI {#platform-not-generic-ai} — split node diagram */}
      <Section
        id="platform-not-generic-ai"
        eyebrow="04 · NOT GENERIC AI"
        title={c.notGenericAi.title}
        support={c.notGenericAi.body[0]}
        variant="bg"
      >
        <div className="mt-14">
          <NodeDiagram nodes={c.notGenericAi.beats} breakLabel={c.notGenericAi.body[1]} />
        </div>
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="body-lead" style={{ maxWidth: '46ch' }}>
                {c.notGenericAi.close}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Beats lines={c.notGenericAi.coda} size="lg" />
          </div>
        </div>
      </Section>

      {/* 05 · LIFECYCLE {#platform-lifecycle} — the guest's own journey */}
      <Section
        id="platform-lifecycle"
        eyebrow="05 · LIFECYCLE"
        title={c.lifecycle.title}
        variant="surface-2"
      >
        <div className="mt-14">
          <JourneyTimeline stages={c.lifecycle.stages} />
        </div>
        <div className="mt-12">
          <Beats lines={c.lifecycle.close} size="lg" />
        </div>
      </Section>

      {/* 06 · ISSUE DETECTION {#platform-issue-detection} — the 2 AM two-stage alert */}
      <Section
        id="platform-issue-detection"
        eyebrow="06 · ISSUE DETECTION"
        title={c.issueDetection.title}
        support={c.issueDetection.lead}
        variant="bg"
      >
        <div className="mt-14">
          <TwoStageAlert
            guest={c.issueAlert.guest}
            reply={c.issueAlert.reply}
            deviceLabel={c.issueAlert.deviceLabel}
            stages={c.issueDetection.features.slice(1, 3).map((f) => ({ title: f.name, body: f.desc }))}
          />
        </div>
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="body-lead" style={{ maxWidth: '44ch' }}>
                {c.issueDetection.body}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <NamedRows
              items={[c.issueDetection.features[0], c.issueDetection.features[3]]}
              columns={2}
            />
          </div>
        </div>
      </Section>

      {/* 07 · RESERVATIONS {#platform-reservations} */}
      <Breather image="/assets/breathers/waterfall-swim.webp" />

      <Section
        id="platform-reservations"
        eyebrow="07 · RESERVATIONS"
        title={c.reservations.title}
        support={c.reservations.lead}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <IconChipGrid items={c.reservations.items.slice(0, 10)} columns={2} />
          </div>
          <div className="lg:col-span-5">
            <Beats lines={c.reservations.close} size="lg" />
          </div>
        </div>
      </Section>

      {/* 08 · EXECUTION {#platform-request-action} — routing flow */}
      <Section
        id="platform-request-action"
        eyebrow="08 · EXECUTION"
        title={c.requestAction.title}
        support={c.requestAction.body}
        variant="bg"
      >
        <div className="mt-10">
          <Beats lines={c.requestAction.beats} />
        </div>
        <div className="mt-12">
          <RoutingFlow
            pairs={c.requestAction.departments.map((d) => ({
              from: c.requestAction.routingFrom,
              to: d,
            }))}
          />
        </div>
        <div className="mt-12">
          <Beats lines={c.requestAction.close} />
        </div>
      </Section>

      {/* 09 · REVENUE INTELLIGENCE {#platform-revenue-intel} */}
      <Section
        id="platform-revenue-intel"
        eyebrow="09 · REVENUE INTELLIGENCE"
        title={c.revenueIntel.title}
        support={c.revenueIntel.lead}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="body-lead" style={{ maxWidth: '42ch' }}>
                {c.revenueIntel.body}
              </p>
              <p className="body-lead mt-6" style={{ maxWidth: '42ch' }}>
                {c.revenueIntel.close}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <IconChipGrid items={c.revenueIntel.items.slice(0, 10)} columns={2} />
          </div>
        </div>
      </Section>

      {/* 10 · GUEST MEMORY {#platform-guest-memory} + {#platform-guest-intel} */}
      <Section
        id="platform-guest-memory"
        eyebrow="10 · GUEST MEMORY"
        title={c.guestMemory.title}
        support={c.guestMemory.lead}
        variant="bg"
      >
        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <Reveal>
              <p className="body-lead mb-6" style={{ color: 'var(--text)' }}>
                {c.guestMemory.body}
              </p>
            </Reveal>
            <IconChipGrid items={c.guestMemory.items} columns={2} />
            <Reveal>
              <p className="body-lead mt-8" style={{ maxWidth: '44ch' }}>
                {c.guestMemory.close}
              </p>
            </Reveal>
          </div>
          <div id="platform-guest-intel">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-3">{c.guestIntel.title}</div>
              <p className="body-lead mb-6" style={{ color: 'var(--text)' }}>
                {c.guestIntel.lead}
              </p>
            </Reveal>
            <IconChipGrid items={c.guestIntel.items} columns={2} />
            <Reveal>
              <p className="body-lead mt-8" style={{ maxWidth: '44ch' }}>
                {c.guestIntel.close}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 11 · DASHBOARDS {#platform-dashboards} — the command centre */}
      <Section
        id="platform-dashboards"
        eyebrow="11 · DASHBOARDS"
        title={c.dashboards.title}
        support={c.dashboards.lead}
        variant="surface-1"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-4">{c.dashboards.monitorLead}</div>
            </Reveal>
            <IconChipGrid items={c.dashboards.items.slice(0, 10)} columns={2} />
          </div>
          {/* {#dashboards-resolution} — NEEDS CONFIRM on the 91/9 split */}
          <div id="dashboards-resolution" className="lg:col-span-7">
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
        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="body-lead" style={{ maxWidth: '46ch' }}>
                {c.resolution.close}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Beats lines={c.dashboards.close} size="lg" />
          </div>
        </div>
      </Section>

      {/* 12 · MULTI-PROPERTY {#platform-multi-property} */}
      <Breather image="/assets/breathers/beach-dusk-walk.webp" />

      <Section
        id="platform-multi-property"
        eyebrow="12 · MULTI-PROPERTY"
        title={c.multiProperty.title}
        variant="bg"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Beats lines={c.multiProperty.beats} />
          </div>
          <div className="lg:col-span-7">
            <IconChipGrid items={c.multiProperty.items} columns={2} />
          </div>
        </div>
        <div className="mt-12">
          <Beats lines={c.multiProperty.close} size="lg" />
        </div>
      </Section>

      {/* 13 · ENTERPRISE-READY {#platform-enterprise-ready} */}
      <Section
        id="platform-enterprise-ready"
        eyebrow="13 · ENTERPRISE-READY"
        title={c.enterpriseReady.title}
        support={c.enterpriseReady.lead}
        variant="surface-2"
      >
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <IconChipGrid items={c.enterpriseReady.items} columns={2} />
          </div>
          <div className="lg:col-span-5">
            <Beats lines={[c.enterpriseReady.close]} size="lg" />
          </div>
        </div>
      </Section>

      {/* 14 · COMPANION OS {#platform-companion-os} — capability surface */}
      <Section
        id="platform-companion-os"
        eyebrow="14 · COMPANION OS"
        title={c.companionOs.title}
        support={c.companionOs.lead}
        variant="surface-3"
      >
        <div className="mt-12">
          <Teaser lines={[c.companionOs.lead]} href="/companion-os" label={g.nav.companionOs}>
            <CapabilityStrip names={COMPANION_OS_CAPABILITIES.map((x) => x.name)} />
          </Teaser>
        </div>
        <div className="mt-14">
          <Beats lines={c.companionOs.close} size="lg" />
        </div>
        <Reveal>
          <div className="mt-10">
            <EndorsementMark variant="companion-os" />
          </div>
        </Reveal>
      </Section>

      {/* 15 · NEXT STEP {#platform-final-cta} — warm media band */}
      <MediaBed video="cta-beach-aerial" poster="/assets/img/cta-beach-aerial-poster.webp" scrim={0.72}>
        <section id="platform-final-cta" className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">15 · NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '18ch' }}>
                {c.finalCta.title}
              </h2>
              <p className="body-lead mt-8" style={{ maxWidth: '52ch' }}>
                {c.finalCta.body}
              </p>
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
              <p
                className="font-serif mt-10"
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
