'use client'

import Link from 'next/link'
import { Section } from '@/components/cds/Section'
import { Accordion } from '@/components/cds/blocks'
import { DemoForm } from '@/components/cds/DemoForm'
import { LiveDemo } from '@/components/cds/LiveDemo'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { Reveal } from '@/components/cds/Reveal'
import { Lead } from '@/components/cds/Prose'
import { PageShell, PageHero } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { accents } from '@/lib/i18n/marketing/accents'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'
import { homeCopy } from '@/lib/i18n/marketing/home'

/**
 * /demo — PRODUCT_ARCHITECTURE §5/§10: this page generates meetings. The form
 * sits at position 2 — a visitor can request a demo within one viewport of
 * scrolling; everything below it exists only to dissolve hesitation:
 * one merged "what to expect", the live product, the site's only FAQ
 * (hesitation questions — §10 FAQ doctrine), and what happens after
 * submitting. The Founding Partner Program appears as a quiet link under the
 * form (its canonical home is /contact#founding).
 */

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
  const home = useCopy(homeCopy)

  return (
    <PageShell>
      {/* {#demo-hero} — one line; by arrival, persuasion is spent (§8) */}
      <PageHero title={c.hero.title} accents={a.demoHero} poster="/assets/img/platform-pool-night.webp">
        <Lead reveal={false}>{c.hero.body1}</Lead>
        <a href="#form" className="btn-primary mt-4">
          {c.hero.cta}
        </a>
      </PageHero>

      {/* {#demo-form} — position 2: the page's one job */}
      <Section id="form" eyebrow="01 · REQUEST" title={form.title} variant="surface-1">
        <div className="mt-6">
          <Lead>{form.intro}</Lead>
        </div>
        <div className="mt-12">
          <DemoForm />
        </div>
        {/* the Founding Partner Program, as a quiet signal (Addendum 2) */}
        <Reveal>
          <p className="mt-10">
            <Link
              href="/contact#founding"
              className="font-sans transition-colors hover:text-[#d4824f]"
              style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 15 }}
            >
              {home.foundingCta} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* {#demo-expect} — one description of the meeting
          (merged: the session + attendees + topics + expectations + agenda) */}
      <Section eyebrow="02 · WHAT TO EXPECT" title={c.expect.title}>
        <div className="mt-6">
          <Lead>{c.experience.lead}</Lead>
        </div>
        <Steps items={c.agenda.items} />
        <div id="demo-who" className="scroll-mt-24">
          <Reveal>
            <div className="mt-12 flex flex-wrap gap-2.5">
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
        </div>
      </Section>

      {/* {#demo-experience} — the product itself, for the not-yet-convinced */}
      <Section id="try" eyebrow="03 · TRY IT" title={demo.title} support={demo.lead} variant="surface-1">
        <div style={{ maxWidth: 560 }}>
          <LiveDemo />
        </div>
      </Section>

      {/* {#demo-faq} — the site's ONLY FAQ: hesitation questions, at the point
          of conversion (PRODUCT_ARCHITECTURE §10) */}
      <Section id="faq" eyebrow="04 · FAQ" title={c.faq.title}>
        <div className="mt-12">
          <Accordion items={c.faq.items} />
        </div>
      </Section>

      {/* {#demo-deployment} — what happens after you submit */}
      <Section eyebrow="05 · DEPLOYMENT" title={c.deployment.title} variant="surface-1">
        <Steps items={c.deployment.stages} />
      </Section>
    </PageShell>
  )
}
