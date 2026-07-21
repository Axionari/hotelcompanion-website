'use client'

import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Lead, Coda } from '@/components/cds/Prose'
import { Reveal } from '@/components/cds/Reveal'
import { PageShell, PageHero, FinalCta } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { enterpriseCopy } from '@/lib/i18n/marketing/enterprise'

export default function EnterpriseClient() {
  const c = useCopy(enterpriseCopy)

  return (
    <PageShell>
      {/* {#enterprise-hero} */}
      <PageHero eyebrow={c.hero.positioning} title={c.hero.title}>
        <Lead reveal={false}>{c.hero.body}</Lead>
      </PageHero>

      {/* {#enterprise-shared-intel} … {#enterprise-grow} */}
      {c.sections.map((s, i) => (
        <div key={s.id}>
          <Section
            id={s.id}
            eyebrow={s.eyebrow}
            title={s.title}
            variant={i % 2 === 0 ? 'surface-1' : 'bg'}
            center
          >
            <div className="mt-8 flex flex-col gap-4">
              {s.body.map((line, j) => (
                <Lead key={j} tone={j === 0 ? 'primary' : 'secondary'}>
                  {line}
                </Lead>
              ))}
            </div>

            {/* {#dashboards-resolution} — NEEDS CONFIRM on the rate */}
            {s.id === 'dashboards' && (
              <Reveal>
                <div
                  className="mt-12 mx-auto max-w-xl rounded-2xl p-8"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                >
                  <p className="font-serif" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--accent)' }}>
                    {c.resolution.resolved}
                  </p>
                  <p className="font-sans mt-3" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                    {c.resolution.escalated}
                  </p>
                  <p className="font-sans mt-4" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                    {c.resolution.close}
                  </p>
                </div>
              </Reveal>
            )}

            <div className="mt-10">
              <Coda>{s.coda}</Coda>
            </div>
          </Section>

          {/* {#enterprise-what-it-is-not} — category boundaries for diligence.
              Deep-linked from the Home teaser as /enterprise#what-it-is-not. */}
          {s.id === 'integrates' && (
            <Section
              id="what-it-is-not"
              eyebrow="11 · WHAT IT IS NOT"
              title={c.whatItIsNot.title}
              variant={i % 2 === 0 ? 'bg' : 'surface-1'}
              center
            >
              <div className="mt-8 flex flex-col gap-4">
                {c.whatItIsNot.lead.map((line, j) => (
                  <Lead key={j} tone={j === 0 ? 'primary' : 'secondary'}>
                    {line}
                  </Lead>
                ))}
              </div>
              <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-4 text-left">
                {c.whatItIsNot.items.map((it, j) => (
                  <Reveal key={it.name} delay={Math.min(j, 4) * 40}>
                    <div
                      className="rounded-xl p-5 h-full"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                    >
                      <div className="font-serif mb-1.5" style={{ fontSize: '1.15rem', color: 'var(--text)' }}>
                        {it.name}
                      </div>
                      <p
                        className="font-sans leading-relaxed"
                        style={{ fontSize: '15px', color: 'var(--text-secondary)' }}
                      >
                        {it.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-10">
                <RhythmStack lines={c.whatItIsNot.close} center serif size="lg" />
              </div>
            </Section>
          )}
        </div>
      ))}

      {/* {#enterprise-companion-os} */}
      <Section eyebrow="14 · COMPANION OS" title={c.companionOs.title} variant="surface-2" center>
        <div className="mt-6">
          <Lead>{c.companionOs.lead}</Lead>
        </div>
        <div className="mt-10">
          <CapabilityGrid />
        </div>
        <div className="mt-10">
          <Coda>{c.companionOs.close}</Coda>
        </div>
        <div className="mt-6">
          <EndorsementMark variant="companion-os" />
        </div>
      </Section>

      {/* {#enterprise-final-cta} */}
      <FinalCta eyebrow="15 · NEXT STEP" title={c.finalCta.title} beats={c.finalCta.beats} cta={c.finalCta.cta} />
    </PageShell>
  )
}
