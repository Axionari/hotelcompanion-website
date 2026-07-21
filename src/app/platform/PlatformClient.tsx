'use client'

import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Lead, Coda } from '@/components/cds/Prose'
import { PageShell, PageHero, FinalCta } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { platformCopy } from '@/lib/i18n/marketing/platform'

/** Two-column rhythm stack for the long noun runs. */
function SplitStack({ items }: { items: ReadonlyArray<string> }) {
  const half = Math.ceil(items.length / 2)
  return (
    <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10">
      <RhythmStack lines={items.slice(0, half)} />
      <RhythmStack lines={items.slice(half)} />
    </div>
  )
}

export default function PlatformClient() {
  const c = useCopy(platformCopy)

  return (
    <PageShell>
      {/* {#platform-hero} */}
      <PageHero eyebrow={c.hero.positioning} title={c.hero.title}>
        <Lead reveal={false}>{c.hero.body}</Lead>
      </PageHero>

      {/* {#platform-voice-first} */}
      <Section eyebrow="01 · VOICE-FIRST" title={c.voiceFirst.title} variant="surface-1" center>
        <div className="mt-8">
          <RhythmStack lines={c.voiceFirst.beats} center serif size="lg" />
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Lead>{c.voiceFirst.body1}</Lead>
          <Lead>{c.voiceFirst.body2}</Lead>
        </div>
        <div className="mt-10">
          <Lead tone="primary">{c.voiceFirst.availableLead}</Lead>
          <div className="mt-6">
            <RhythmStack lines={c.voiceFirst.surfaces} center />
          </div>
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.voiceFirst.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-your-voice} */}
      <Section eyebrow="02 · BRAND VOICE" title={c.yourVoice.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.yourVoice.beats} center />
        </div>
        <SplitStack items={c.yourVoice.personalities} />
        <div className="mt-10">
          <Lead>{c.yourVoice.body}</Lead>
        </div>
        <div className="mt-8">
          <RhythmStack lines={c.yourVoice.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-knows-property} */}
      <Section eyebrow="03 · PROPERTY KNOWLEDGE" title={c.knowsProperty.title} variant="surface-1" center>
        <div className="mt-6">
          <Lead>{c.knowsProperty.lead}</Lead>
        </div>
        <SplitStack items={c.knowsProperty.items} />
        <div className="mt-10">
          <RhythmStack lines={c.knowsProperty.close} center />
        </div>
      </Section>

      {/* {#platform-destination} */}
      <Section eyebrow="04 · DESTINATION" title={c.destination.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.destination.beats} center />
        </div>
        <div className="mt-8">
          <Lead tone="primary">{c.destination.lead}</Lead>
        </div>
        <SplitStack items={c.destination.items} />
        <div className="mt-10">
          <Lead>{c.destination.close}</Lead>
        </div>
      </Section>

      {/* {#platform-reservations} */}
      <Section eyebrow="05 · RESERVATIONS" title={c.reservations.title} variant="surface-1" center>
        <div className="mt-6">
          <Lead>{c.reservations.lead}</Lead>
        </div>
        <SplitStack items={c.reservations.items} />
        <div className="mt-10">
          <RhythmStack lines={c.reservations.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-request-action} */}
      <Section eyebrow="06 · EXECUTION" title={c.requestAction.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.requestAction.beats} center serif size="lg" />
        </div>
        <div className="mt-8">
          <Lead>{c.requestAction.body}</Lead>
        </div>
        <SplitStack items={c.requestAction.departments} />
        <div className="mt-10">
          <RhythmStack lines={c.requestAction.close} center />
        </div>
      </Section>

      {/* {#platform-revenue-intel} */}
      <Section eyebrow="07 · REVENUE INTELLIGENCE" title={c.revenueIntel.title} variant="surface-1" center>
        <div className="mt-6 flex flex-col gap-4">
          <Lead tone="primary">{c.revenueIntel.lead}</Lead>
          <Lead>{c.revenueIntel.body}</Lead>
        </div>
        <SplitStack items={c.revenueIntel.items} />
        <div className="mt-10">
          <Lead>{c.revenueIntel.close}</Lead>
        </div>
      </Section>

      {/* {#platform-guest-memory} */}
      <Section eyebrow="08 · GUEST MEMORY" title={c.guestMemory.title} center>
        <div className="mt-6 flex flex-col gap-4">
          <Lead tone="primary">{c.guestMemory.lead}</Lead>
          <Lead>{c.guestMemory.body}</Lead>
        </div>
        <SplitStack items={c.guestMemory.items} />
        <div className="mt-10">
          <Coda>{c.guestMemory.close}</Coda>
        </div>
      </Section>

      {/* {#platform-guest-intel} */}
      <Section eyebrow="09 · GUEST INTELLIGENCE" title={c.guestIntel.title} variant="surface-1" center>
        <div className="mt-6 flex flex-col gap-4">
          <Lead tone="primary">{c.guestIntel.lead}</Lead>
          <Lead>{c.guestIntel.body}</Lead>
        </div>
        <SplitStack items={c.guestIntel.items} />
        <div className="mt-10">
          <Lead>{c.guestIntel.close}</Lead>
        </div>
      </Section>

      {/* {#platform-dashboards} */}
      <Section eyebrow="10 · DASHBOARDS" title={c.dashboards.title} center>
        <div className="mt-6 flex flex-col gap-4">
          <Lead>{c.dashboards.lead}</Lead>
          <Lead tone="primary">{c.dashboards.monitorLead}</Lead>
        </div>
        <SplitStack items={c.dashboards.items} />
        <div className="mt-10">
          <RhythmStack lines={c.dashboards.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-multi-property} */}
      <Section eyebrow="11 · MULTI-PROPERTY" title={c.multiProperty.title} variant="surface-1" center>
        <div className="mt-8">
          <RhythmStack lines={c.multiProperty.beats} center />
        </div>
        <SplitStack items={c.multiProperty.items} />
        <div className="mt-10">
          <RhythmStack lines={c.multiProperty.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-enterprise-ready} */}
      <Section eyebrow="12 · ENTERPRISE-READY" title={c.enterpriseReady.title} center>
        <div className="mt-6">
          <Lead>{c.enterpriseReady.lead}</Lead>
        </div>
        <SplitStack items={c.enterpriseReady.items} />
        <div className="mt-10">
          <Coda>{c.enterpriseReady.close}</Coda>
        </div>
      </Section>

      {/* {#platform-companion-os} */}
      <Section eyebrow="13 · COMPANION OS" title={c.companionOs.title} variant="surface-1" center>
        <div className="mt-6">
          <Lead>{c.companionOs.lead}</Lead>
        </div>
        <div className="mt-10">
          <CapabilityGrid />
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.companionOs.close} center serif size="lg" />
        </div>
        <div className="mt-6">
          <EndorsementMark variant="companion-os" />
        </div>
      </Section>

      {/* {#platform-final-cta} */}
      <FinalCta
        eyebrow="14 · NEXT STEP"
        title={c.finalCta.title}
        body={c.finalCta.body}
        beats={c.finalCta.beats}
        platform={c.finalCta.platform}
        cta={c.finalCta.cta}
      />
    </PageShell>
  )
}
