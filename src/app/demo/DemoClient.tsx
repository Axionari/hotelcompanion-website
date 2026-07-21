'use client'

import { Section } from '@/components/cds/Section'
import { Accordion } from '@/components/cds/blocks'
import { DemoForm } from '@/components/cds/DemoForm'
import { LiveDemo } from '@/components/cds/LiveDemo'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { Reveal } from '@/components/cds/Reveal'
import { Lead, Card, CardText } from '@/components/cds/Prose'
import { PageShell, PageHero } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { accents } from '@/lib/i18n/marketing/accents'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'

/** Numbered step list used for the agenda and the deployment sequence. */
function Steps({ items }: { items: ReadonlyArray<{ title: string; body: string }> }) {
  return (
    <ol className="mt-12 flex flex-col gap-6" style={{ maxWidth: 760 }}>
      {items.map((s, i) => (
        <Reveal key={s.title} as="li" delay={Math.min(i, 5) * 40}>
          <div className="flex gap-5">
            <span className="eyebrow flex-shrink-0 pt-1.5" style={{ color: 'var(--accent)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-serif mb-1.5" style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', color: 'var(--text)' }}>
                {s.title}
              </h3>
              <p className="font-sans leading-relaxed" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                {s.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

export default function DemoClient() {
  const c = useCopy(demoCopy)
  const a = useCopy(accents)
  const form = useCopy(demoFormCopy)
  const demo = useCopy(liveDemoCopy)

  return (
    <PageShell>
      {/* {#demo-hero} */}
      <PageHero title={c.hero.title} accents={a.demoHero} poster="/assets/img/platform-pool-night.webp">
        <Lead reveal={false}>{c.hero.body1}</Lead>
        <Lead reveal={false}>{c.hero.body2}</Lead>
        <Lead reveal={false}>{c.hero.body3}</Lead>
        <a
          href="#form"
          className="btn-primary mt-4"
        >
          {c.hero.cta}
        </a>
      </PageHero>

      {/* {#demo-experience} */}
      {/* 01 · TRY IT — the product itself, before the form */}
      <Section id="try" eyebrow="01 · TRY IT" title={demo.title} support={demo.lead}>
        <div style={{ maxWidth: 560 }}>
          <LiveDemo />
        </div>
      </Section>

      <Section eyebrow="02 · THE SESSION" title={c.experience.title} variant="surface-1">
        <div className="mt-6">
          <Lead>{c.experience.lead}</Lead>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-5 text-left">
          {c.experience.items.map((item) => (
            <Card key={item.id} id={item.id} title={item.title}>
              <CardText>{item.body}</CardText>
            </Card>
          ))}
        </div>
      </Section>

      {/* {#demo-who} */}
      <Section eyebrow="03 · ATTENDEES" title={c.who.title}>
        <div className="mt-6">
          <Lead>{c.who.lead}</Lead>
        </div>
        <Reveal>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {c.who.roles.map((role) => (
              <span
                key={role}
                className="font-sans rounded-full px-4 py-2"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                }}
              >
                {role}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* {#demo-discuss} */}
      <Section eyebrow="04 · TOPICS" title={c.discuss.title} variant="surface-1">
        <div className="mt-8 flex flex-col gap-4">
          <Lead>{c.discuss.lead}</Lead>
          <Lead tone="primary">{c.discuss.body}</Lead>
        </div>
      </Section>

      {/* {#demo-expect} */}
      <Section eyebrow="05 · WHAT TO EXPECT" title={c.expect.title}>
        <div className="mt-12 grid sm:grid-cols-2 gap-5 text-left">
          {c.expect.items.map((item) => (
            <Card key={item.id} id={item.id} title={item.title}>
              <CardText>{item.body}</CardText>
            </Card>
          ))}
        </div>
      </Section>

      {/* {#demo-agenda} */}
      <Section eyebrow="06 · AGENDA" title={c.agenda.title} variant="surface-1">
        <Steps items={c.agenda.items} />
      </Section>

      {/* {#demo-deployment} */}
      <Section eyebrow="07 · DEPLOYMENT" title={c.deployment.title}>
        <Steps items={c.deployment.stages} />
      </Section>

      {/* {#demo-faq} */}
      <Section id="faq" eyebrow="08 · FAQ" title={c.faq.title} variant="surface-1">
        <div className="mt-12">
          <Accordion items={c.faq.items} />
        </div>
      </Section>

      {/* {#demo-form} */}
      <Section id="form" eyebrow="09 · REQUEST" title={form.title}>
        <div className="mt-6">
          <Lead>{form.intro}</Lead>
        </div>
        <div className="mt-12">
          <DemoForm />
        </div>
      </Section>

      {/* {#demo-final-cta} */}
      <Section eyebrow="10 · NEXT STEP" title={c.finalCta.title} variant="surface-1">
        <div className="mt-8 flex flex-col gap-4">
          <Lead>{c.finalCta.body1}</Lead>
          <Lead>{c.finalCta.body2}</Lead>
        </div>
        <Reveal>
          <div className="mt-10">
            <a
              href="#form"
              className="btn-primary"
            >
              {c.finalCta.cta}
            </a>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  )
}
