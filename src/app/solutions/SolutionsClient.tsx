'use client'

import { Section } from '@/components/cds/Section'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Lead, Coda, Card, CardText } from '@/components/cds/Prose'
import { PageShell, PageHero, FinalCta } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { solutionsCopy } from '@/lib/i18n/marketing/solutions'

function BlockGrid({
  blocks,
}: {
  blocks: ReadonlyArray<{ id: string; eyebrow: string; title: string; body: ReadonlyArray<string> }>
}) {
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-5">
      {blocks.map((b) => (
        <Card key={b.id} id={b.id} eyebrow={b.eyebrow} title={b.title}>
          {b.body.map((line, i) => (
            <CardText key={i}>{line}</CardText>
          ))}
        </Card>
      ))}
    </div>
  )
}

export default function SolutionsClient() {
  const c = useCopy(solutionsCopy)

  return (
    <PageShell>
      {/* {#solutions-hero} */}
      <PageHero title={c.hero.title}>
        <Lead reveal={false}>{c.hero.body1}</Lead>
        <Lead reveal={false}>{c.hero.body2}</Lead>
      </PageHero>

      {/* Department blocks {#solutions-front-desk} … {#solutions-gm} */}
      <Section eyebrow={c.departmentsEyebrow} title={c.departmentsTitle} variant="surface-1" center>
        <BlockGrid blocks={c.departments} />
      </Section>

      {/* Segment blocks {#solutions-multi-property} … {#solutions-enterprise-groups} */}
      <Section eyebrow={c.segmentsEyebrow} title={c.segmentsTitle} center>
        <BlockGrid blocks={c.segments} />
      </Section>

      {/* {#solutions-companion-os} */}
      <Section eyebrow="03 · COMPANION OS" title={c.companionOs.title} variant="surface-1" center>
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

      {/* {#solutions-final-cta} */}
      <FinalCta
        eyebrow="04 · NEXT STEP"
        title={c.finalCta.title}
        body={c.finalCta.body}
        beats={c.finalCta.beats}
        platform={c.finalCta.platform}
        cta={c.finalCta.cta}
      />
    </PageShell>
  )
}
