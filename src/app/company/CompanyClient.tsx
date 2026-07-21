'use client'

import { Section } from '@/components/cds/Section'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { Reveal } from '@/components/cds/Reveal'
import { Lead, Coda } from '@/components/cds/Prose'
import { PageShell, PageHero, FinalCta } from '@/components/cds/PageShell'
import { useCopy } from '@/lib/i18n/useCopy'
import { companyCopy } from '@/lib/i18n/marketing/company'

export default function CompanyClient() {
  const c = useCopy(companyCopy)

  return (
    <PageShell>
      {/* {#company-hero} */}
      <PageHero title={c.hero.title}>
        <Lead reveal={false}>{c.hero.body1}</Lead>
        <Lead reveal={false}>{c.hero.body2}</Lead>
      </PageHero>

      {/* {#company-belief} … {#company-founding-partners} */}
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
          {s.id === 'axionari' && (
            <div className="mt-8">
              <EndorsementMark variant="axionari" />
            </div>
          )}
          {s.id === 'companion-os' && (
            <div className="mt-8">
              <EndorsementMark variant="companion-os" />
            </div>
          )}
        </Section>
      ))}

      {/* {#company-contact} */}
      <Section id="contact" eyebrow="08 · CONTACT" title={c.contact.title} variant="surface-2" center>
        <div className="mt-8">
          <Lead>{c.contact.body}</Lead>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          {c.contact.channels.map((ch) => (
            <Reveal key={ch.email}>
              <p className="font-sans" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
                {ch.label} —{' '}
                <a
                  href={`mailto:${ch.email}`}
                  className="transition-colors hover:text-[#D4784A]"
                  style={{ color: 'var(--accent)' }}
                >
                  {ch.email}
                </a>
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* {#company-final-cta} */}
      <FinalCta
        eyebrow="09 · NEXT STEP"
        title={c.finalCta.title}
        body={c.finalCta.body}
        platform={c.finalCta.platform}
        cta={c.finalCta.cta}
      />
    </PageShell>
  )
}
