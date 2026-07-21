'use client'

import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { QuestionMarquee } from '@/components/cds/QuestionMarquee'
import { RoutingDiagram } from '@/components/cds/RoutingDiagram'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { FAQAccordion } from '@/components/cds/FAQAccordion'
import { DemoForm } from '@/components/cds/DemoForm'
import { PersistentCTA } from '@/components/cds/PersistentCTA'

export default function KitchenSinkClient() {
  return (
    <main>
      <SiteNav />
      <Section eyebrow="00 · KITCHEN SINK" title="CDS component gallery" variant="bg">
        <p className="font-sans mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          Dev-only. Toggle EN/ES via nav; test reduced motion via OS setting.
        </p>
      </Section>

      <Section eyebrow="01 · RHYTHM STACK" title="Stacked beats" variant="surface-1">
        <div className="mt-10">
          <RhythmStack lines={['Every room.', 'Every restaurant.', 'Every menu.', 'Every service.']} />
        </div>
      </Section>

      <Section eyebrow="02 · CAPABILITY GRID" title="Companion OS capabilities" variant="bg">
        <div className="mt-10">
          <CapabilityGrid />
        </div>
      </Section>

      <Section eyebrow="03 · QUESTION MARQUEE" title="Signature marquees" variant="surface-1">
        <div className="mt-10 -mx-4 md:-mx-6">
          <QuestionMarquee />
        </div>
      </Section>

      <Section eyebrow="04 · ROUTING DIAGRAM" title="Request → department" variant="bg">
        <div className="mt-10">
          <RoutingDiagram
            pairs={[
              { from: 'Restaurant reservation', to: 'Restaurant Team' },
              { from: 'Spa appointment', to: 'Spa Team' },
              { from: 'Maintenance issue', to: 'Engineering' },
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="05 · ENDORSEMENT MARKS" title="Family lockups" variant="surface-1">
        <div className="mt-10 flex flex-col gap-3">
          <EndorsementMark variant="companion-os" />
          <EndorsementMark variant="axionari" />
        </div>
      </Section>

      <Section eyebrow="06 · FAQ" title="Accordion" variant="bg">
        <div className="mt-10">
          <FAQAccordion
            items={[
              { q: 'Question one?', a: 'Answer one.' },
              { q: 'Question two?', a: 'Answer two.' },
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="07 · DEMO FORM" title="Book a demonstration" variant="surface-1">
        <div className="mt-10">
          <DemoForm />
        </div>
      </Section>

      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}
