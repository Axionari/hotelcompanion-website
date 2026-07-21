'use client'

import Link from 'next/link'
import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { Accordion } from '@/components/cds/blocks'
import { Reveal } from '@/components/cds/Reveal'
import { Lead, Coda, Card, CardText } from '@/components/cds/Prose'
import { PageShell, PageHero } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { accents } from '@/lib/i18n/marketing/accents'
import { contactCopy } from '@/lib/i18n/marketing/contact'

export default function ContactClient() {
  const c = useCopy(contactCopy)
  const a = useCopy(accents)

  return (
    <PageShell>
      {/* {#contact-hero} */}
      <PageHero title={c.hero.title} accents={a.contactHero} poster="/assets/img/lobby-modern.webp">
        <Lead reveal={false}>{c.hero.body}</Lead>
        <p
          className="font-serif italic mt-2"
          style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}
        >
          {c.hero.coda}
        </p>
      </PageHero>

      {/* {#contact-channels} */}
      <Section eyebrow={c.channelsEyebrow} title={c.channelsTitle} variant="surface-1">
        <div className="mt-12 grid md:grid-cols-2 gap-5 text-left">
          {c.channels.map((ch) => (
            <Card key={ch.id} id={ch.id} eyebrow={ch.eyebrow} title={ch.title}>
              <CardText>{ch.body}</CardText>
              <p className="font-sans" style={{ fontSize: '15px' }}>
                <a
                  href={`mailto:${ch.email}`}
                  className="transition-colors hover:text-[#D4784A]"
                  style={{ color: 'var(--accent)' }}
                >
                  {ch.email}
                </a>
              </p>
              {'cta' in ch && ch.cta && (
                <p className="font-sans" style={{ fontSize: '15px' }}>
                  <Link
                    href={ch.cta.href}
                    className="transition-colors hover:text-[#D4784A]"
                    style={{ color: 'var(--accent)', fontWeight: 500 }}
                  >
                    {ch.cta.label} →
                  </Link>
                </p>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* {#contact-hq} */}
      <Section eyebrow="02 · HEADQUARTERS" title={c.hq.title} tight>
        <div className="mt-6">
          <Coda>{c.hq.line}</Coda>
        </div>
      </Section>

      {/* {#contact-schedule} */}
      <Section eyebrow="03 · SCHEDULE" title={c.schedule.title} variant="surface-1">
        <div className="mt-6">
          <Lead>{c.schedule.body}</Lead>
        </div>
        <Reveal>
          <div className="mt-10">
            <Link
              href="/demo"
              className="btn-primary"
            >
              {c.schedule.cta}
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* {#contact-faq} */}
      <Section eyebrow="04 · FAQ" title={c.faq.title}>
        <div className="mt-12">
          <Accordion items={c.faq.items} />
        </div>
      </Section>

      {/* {#contact-founding} — deep-linked from Home and the footer */}
      <Section id="founding" eyebrow="05 · FOUNDING PARTNERS" title={c.founding.title} variant="surface-2">
        <div className="mt-8">
          <Lead>{c.founding.body}</Lead>
        </div>
        <div className="mt-8">
          <Lead tone="primary">{c.founding.receiveLead}</Lead>
        </div>
        <div className="mt-6">
          <RhythmStack lines={c.founding.items} />
        </div>
        <div className="mt-10">
          <Lead>{c.founding.close}</Lead>
        </div>
        <Reveal>
          <div className="mt-10">
            {/* A2-2: founding CTAs across the site route here. This block is the destination,
                so its own action is the demo request — the site's single intake mechanism. */}
            <Link
              href="/demo"
              className="btn-primary"
            >
              {c.founding.cta}
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* {#contact-closing} */}
      <Section eyebrow="06 · CLOSING" title={c.closing.title} variant="surface-1">
        <div className="mt-8 flex flex-col gap-4">
          <Lead tone="primary">{c.closing.body1}</Lead>
          <Lead>{c.closing.body2}</Lead>
        </div>
        <Reveal>
          <div className="mt-10">
            <a
              href="mailto:hello@hotelcompanion.ai"
              className="btn-primary"
            >
              {c.closing.cta}
            </a>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  )
}
