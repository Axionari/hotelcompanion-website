'use client'

import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Lead, Coda } from '@/components/cds/Prose'
import { Reveal } from '@/components/cds/Reveal'
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


/** Named item + description, used for voices, channels and issue-detection features. */
function NamedList({ items, columns = 1 }: { items: ReadonlyArray<{ name: string; desc: string }>; columns?: 1 | 2 }) {
  return (
    <div className={`mt-10 max-w-3xl mx-auto grid gap-4 text-left ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((it, i) => (
        <Reveal key={it.name} delay={Math.min(i, 5) * 40}>
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <div className="font-serif mb-1.5" style={{ fontSize: '1.15rem', color: 'var(--text)' }}>
              {it.name}
            </div>
            <p className="font-sans leading-relaxed" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              {it.desc}
            </p>
          </div>
        </Reveal>
      ))}
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
        {/* {#platform-channels} — the concrete access channels */}
        <div className="mt-10">
          <Lead tone="primary">{c.voiceFirst.availableLead}</Lead>
          <div className="mt-3">
            <Lead>{c.channels.lead}</Lead>
          </div>
          <NamedList items={c.channels.items} columns={2} />
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
        {/* {#platform-five-voices} — named, productized styles */}
        <div className="mt-8">
          <Lead>{c.yourVoice.voicesLead}</Lead>
        </div>
        <NamedList items={c.yourVoice.voices} columns={2} />
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

      {/* {#platform-not-generic-ai} */}
      <Section eyebrow="04 · NOT GENERIC AI" title={c.notGenericAi.title} center>
        <div className="mt-8 flex flex-col gap-4">
          {c.notGenericAi.body.map((line, i) => (
            <Lead key={i} tone={i === 0 ? 'primary' : 'secondary'}>
              {line}
            </Lead>
          ))}
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.notGenericAi.beats} center serif size="lg" />
        </div>
        <div className="mt-10">
          <Lead>{c.notGenericAi.close}</Lead>
        </div>
        <div className="mt-8">
          <RhythmStack lines={c.notGenericAi.coda} center />
        </div>
      </Section>

      {/* {#platform-destination} */}
      <Section variant="surface-1" eyebrow="05 · DESTINATION" title={c.destination.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.destination.beats} center />
        </div>
        <div className="mt-8">
          <Lead tone="primary">{c.destination.lead}</Lead>
        </div>
        <SplitStack items={c.destination.items} />
        {/* {#platform-destination-examples} — made vivid */}
        <div className="mt-14">
          <Lead tone="primary">{c.destinationExamples.lead}</Lead>
        </div>
        <div className="mt-6">
          <RhythmStack lines={c.destinationExamples.questions} center serif size="lg" />
        </div>
        <div className="mt-8">
          <RhythmStack lines={c.destinationExamples.close} center />
        </div>
        <div className="mt-10">
          <Lead>{c.destination.close}</Lead>
        </div>
      </Section>

      {/* {#platform-lifecycle} */}
      <Section eyebrow="06 · LIFECYCLE" title={c.lifecycle.title} center>
        <NamedList items={c.lifecycle.stages.map((st) => ({ name: st.name, desc: st.body }))} />
        <div className="mt-10">
          <RhythmStack lines={c.lifecycle.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-reservations} */}
      <Section eyebrow="07 · RESERVATIONS" title={c.reservations.title} variant="surface-1" center>
        <div className="mt-6">
          <Lead>{c.reservations.lead}</Lead>
        </div>
        <SplitStack items={c.reservations.items} />
        <div className="mt-10">
          <RhythmStack lines={c.reservations.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-request-action} */}
      <Section eyebrow="08 · EXECUTION" title={c.requestAction.title} center>
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

      {/* {#platform-issue-detection} */}
      <Section eyebrow="09 · ISSUE DETECTION" title={c.issueDetection.title} variant="surface-1" center>
        <div className="mt-8 flex flex-col gap-4">
          <Lead tone="primary">{c.issueDetection.lead}</Lead>
          <Lead>{c.issueDetection.body}</Lead>
        </div>
        <NamedList items={c.issueDetection.features} columns={2} />
      </Section>

      {/* {#platform-revenue-intel} */}
      <Section eyebrow="10 · REVENUE INTELLIGENCE" title={c.revenueIntel.title} center>
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
      <Section variant="surface-1" eyebrow="11 · GUEST MEMORY" title={c.guestMemory.title} center>
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
      <Section eyebrow="12 · GUEST INTELLIGENCE" title={c.guestIntel.title} center>
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
      <Section variant="surface-1" eyebrow="13 · DASHBOARDS" title={c.dashboards.title} center>
        <div className="mt-6 flex flex-col gap-4">
          <Lead>{c.dashboards.lead}</Lead>
          <Lead tone="primary">{c.dashboards.monitorLead}</Lead>
        </div>
        <SplitStack items={c.dashboards.items} />
        {/* {#dashboards-resolution} — NEEDS CONFIRM on the rate */}
        <Reveal>
          <div
            className="mt-14 mx-auto max-w-xl rounded-2xl p-8"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <p className="font-serif" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--accent)' }}>
              {c.resolution.resolved}
            </p>
            <p className="font-sans mt-3" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              {c.resolution.escalated}
            </p>
          </div>
        </Reveal>
        <div className="mt-8">
          <Lead>{c.resolution.close}</Lead>
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.dashboards.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-multi-property} */}
      <Section eyebrow="14 · MULTI-PROPERTY" title={c.multiProperty.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.multiProperty.beats} center />
        </div>
        <SplitStack items={c.multiProperty.items} />
        <div className="mt-10">
          <RhythmStack lines={c.multiProperty.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#platform-enterprise-ready} */}
      <Section variant="surface-1" eyebrow="15 · ENTERPRISE-READY" title={c.enterpriseReady.title} center>
        <div className="mt-6">
          <Lead>{c.enterpriseReady.lead}</Lead>
        </div>
        <SplitStack items={c.enterpriseReady.items} />
        <div className="mt-10">
          <Coda>{c.enterpriseReady.close}</Coda>
        </div>
      </Section>

      {/* {#platform-companion-os} */}
      <Section eyebrow="16 · COMPANION OS" title={c.companionOs.title} center>
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
        eyebrow="17 · NEXT STEP"
        title={c.finalCta.title}
        body={c.finalCta.body}
        beats={c.finalCta.beats}
        platform={c.finalCta.platform}
        cta={c.finalCta.cta}
      />
    </PageShell>
  )
}
