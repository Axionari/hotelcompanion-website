'use client'

import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Reveal } from '@/components/cds/Reveal'
import { Lead, Coda } from '@/components/cds/Prose'
import { PageShell, PageHero, FinalCta } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { companionOsCopy } from '@/lib/i18n/marketing/companionOs'

export default function CompanionOsClient() {
  const c = useCopy(companionOsCopy)

  return (
    <PageShell>
      {/* {#companionos-hero} */}
      <PageHero eyebrow={c.hero.positioning} title={c.hero.title}>
        <Lead reveal={false}>{c.hero.body}</Lead>
        <div className="mt-2">
          <RhythmStack lines={c.hero.close} center stagger={false} />
        </div>
      </PageHero>

      {/* {#companionos-why} */}
      <Section eyebrow="01 · WHY" title={c.why.title} variant="surface-1" center>
        <div className="mt-8">
          <RhythmStack lines={c.why.beats} center serif size="lg" />
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Lead tone="primary">{c.why.industries}</Lead>
          {c.why.body.map((line, i) => (
            <Lead key={i}>{line}</Lead>
          ))}
          <Lead tone="primary">{c.why.capabilities}</Lead>
        </div>
        <div className="mt-10">
          <Coda>{c.why.coda}</Coda>
        </div>
      </Section>

      {/* {#companionos-one-platform} — also hosts the capability overview grid.
          NEEDS CONFIRM: the copy deck has no #companionos-analytics deep-dive, so the
          Enterprise Analytics tile deep-links here rather than to a dedicated section. */}
      <Section id="analytics" eyebrow="02 · ONE PLATFORM" title={c.onePlatform.title} center>
        <div className="mt-8 flex flex-col gap-4">
          {c.onePlatform.body.map((line, i) => (
            <Lead key={i}>{line}</Lead>
          ))}
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.onePlatform.specializations} center />
        </div>
        <div className="mt-12">
          <CapabilityGrid />
        </div>
        <div className="mt-10">
          <Coda>{c.onePlatform.coda}</Coda>
        </div>
      </Section>

      {/* Capability deep-dives {#companionos-voice} … {#companionos-learning} */}
      {c.deepDives.map((d, i) => (
        <Section
          key={d.id}
          id={d.id}
          eyebrow={d.eyebrow}
          title={d.title}
          variant={i % 2 === 0 ? 'surface-1' : 'bg'}
          center
        >
          <div className="mt-8 flex flex-col gap-4">
            {d.body.map((line, j) => (
              <Lead key={j} tone={j === 0 ? 'primary' : 'secondary'}>
                {line}
              </Lead>
            ))}
          </div>
          {'chain' in d && d.chain && (
            <Reveal>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 max-w-3xl mx-auto">
                {d.chain.map((step, j) => (
                  <span key={j} className="flex items-center gap-3">
                    <span
                      className="font-sans rounded-full px-4 py-2"
                      style={{
                        background: 'var(--surface-3)',
                        border: '1px solid var(--border)',
                        fontSize: '14px',
                        color: 'var(--text)',
                      }}
                    >
                      {step}
                    </span>
                    {j < d.chain.length - 1 && (
                      <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
          {'after' in d && d.after && (
            <div className="mt-8 flex flex-col gap-4">
              {d.after.map((line, j) => (
                <Lead key={j}>{line}</Lead>
              ))}
            </div>
          )}
          <div className="mt-10">
            <Coda>{d.coda}</Coda>
          </div>
        </Section>
      ))}

      {/* {#companionos-enterprise} */}
      <Section eyebrow="08 · ENTERPRISE" title={c.enterprise.title} variant="surface-1" center>
        <div className="mt-8 flex flex-col gap-4">
          {c.enterprise.body.map((line, i) => (
            <Lead key={i} tone={i === 0 ? 'primary' : 'secondary'}>
              {line}
            </Lead>
          ))}
        </div>
        <div className="mt-10">
          <Coda>{c.enterprise.coda}</Coda>
        </div>
      </Section>

      {/* {#companionos-ecosystem} — Destination Companion appears as a future name only */}
      <Section eyebrow="09 · ECOSYSTEM" title={c.ecosystem.title} center>
        <div className="mt-8 flex flex-col gap-4">
          <Lead>{c.ecosystem.lead}</Lead>
          <Lead tone="primary">{c.ecosystem.today}</Lead>
          <Lead>{c.ecosystem.tomorrow}</Lead>
          <Lead>{c.ecosystem.body}</Lead>
        </div>
        <div className="mt-10">
          <Coda>{c.ecosystem.coda}</Coda>
        </div>
      </Section>

      {/* {#companionos-axionari} */}
      <Section eyebrow="10 · AXIONARI" title={c.axionari.title} variant="surface-2" center>
        <div className="mt-8 flex flex-col gap-4">
          {c.axionari.body.map((line, i) => (
            <Lead key={i}>{line}</Lead>
          ))}
        </div>
        <div className="mt-10">
          <Coda>{c.axionari.coda}</Coda>
        </div>
        <div className="mt-8">
          <EndorsementMark variant="axionari" />
        </div>
      </Section>

      {/* {#companionos-final-cta} — CTA leads back to Hotel Companion */}
      <FinalCta
        eyebrow="11 · NEXT STEP"
        title={c.finalCta.title}
        body={c.finalCta.body}
        beats={[c.finalCta.subtitle]}
        platform={c.finalCta.platform}
        cta={c.finalCta.cta}
        href="/"
      />
    </PageShell>
  )
}
