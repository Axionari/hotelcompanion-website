'use client'

import { Section } from '@/components/cds/Section'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Lead, Coda } from '@/components/cds/Prose'
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
        <Section
          key={s.id}
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
          <div className="mt-10">
            <Coda>{s.coda}</Coda>
          </div>
        </Section>
      ))}

      {/* {#enterprise-companion-os} */}
      <Section eyebrow="13 · COMPANION OS" title={c.companionOs.title} variant="surface-2" center>
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
      <FinalCta eyebrow="14 · NEXT STEP" title={c.finalCta.title} beats={c.finalCta.beats} cta={c.finalCta.cta} />
    </PageShell>
  )
}
