'use client'

import Link from 'next/link'
import { Breather } from '@/components/cds/Breather'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { MediaBed } from '@/components/cds/MediaBed'
import { useCopy } from '@/lib/i18n/useCopy'
import { companyCopy } from '@/lib/i18n/marketing/company'
import { accents } from '@/lib/i18n/marketing/accents'

export default function CompanyClient() {
  const c = useCopy(companyCopy)
  const a = useCopy(accents)

  const byId = (id: string) => c.sections.find((s) => s.id === id)!
  const why = byId('why-hotels')
  /* PRODUCT_ARCHITECTURE §10 — one story: the four belief movements read as a
     single manifesto; Companion OS + Axionari read as one builder section;
     the Founding Partner band moved to /contact#founding (Silent here, §7). */
  const manifesto = ['belief', 'mission', 'philosophy', 'approach'].map(byId).filter(Boolean)
  const builder = ['companion-os', 'axionari'].map(byId).filter(Boolean)

  return (
    <main>
      <SiteNav />

      {/* {#company-hero} — left text, reception still filling the right column */}
      <section className="pt-16 pb-20 md:pt-28 md:pb-28" style={{ background: 'var(--bg)' }}>
        <div className="container-rc">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="eyebrow eyebrow-accent mb-7">COMPANY</div>
              <MultiAccentHeadline
                as="h1"
                className="heading-page"
                style={{ color: 'var(--text)', maxWidth: '17ch' }}
                text={c.hero.title}
                accents={a.companyHero}
              />
              <div className="mt-9 flex flex-col gap-5" style={{ maxWidth: '54ch' }}>
                <p className="body-lead">{c.hero.body1}</p>
                <p className="body-lead">{c.hero.body2}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <MediaBed
                poster="/assets/img/lobby-modern.webp"
                scrim={0.3}
                className="rounded-2xl"
                minHeight="420px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* {#company-why-hotels} — the emotional peak. Editorial passage, generously
          spaced on the bed; the closing line set as an italic copper pull-quote. */}
      {why && (
        <section id="why-hotels" className="scroll-mt-20 py-24 md:py-36" style={{ background: 'var(--surface-3)' }}>
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">{why.eyebrow}</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '16ch' }}>
                {why.title}
              </h2>
            </Reveal>

            <div className="mt-12 grid lg:grid-cols-12 gap-x-16">
              <div className="lg:col-span-7 flex flex-col gap-6">
                {why.body.slice(0, -1).map((line, i) => (
                  <Reveal key={i} delay={Math.min(i, 6) * 30}>
                    <p
                      className="body-lead"
                      style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: 1.72, maxWidth: '54ch' }}
                    >
                      {line}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* The "walked out the door" line — pull-quote over the reception still */}
              <div className="lg:col-span-5 mt-12 lg:mt-0">
                <MediaBed
                  poster="/assets/img/company-reception.webp"
                  scrim={0.74}
                  className="rounded-2xl h-full flex items-center"
                >
                <div className="px-7 py-10">
                <Reveal>
                  <blockquote
                    className="font-serif"
                    style={{
                      fontStyle: 'italic',
                      fontWeight: 480,
                      fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
                      lineHeight: 1.28,
                      color: 'var(--accent)',
                      borderLeft: '1px solid var(--accent-hairline)',
                      paddingLeft: '1.75rem',
                    }}
                  >
                    {why.body[why.body.length - 1]}
                  </blockquote>
                </Reveal>
                </div>
                </MediaBed>
              </div>
            </div>

            <Reveal>
              <p
                className="font-serif mt-16"
                style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 530, color: 'var(--text)' }}
              >
                {why.coda}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* {#company-manifesto} — the four belief movements as one narrative
          section (merged: belief + mission + philosophy + approach). This page
          is allowed depth: every movement keeps its body and coda. */}
      <Section id="belief" eyebrow={manifesto[0].eyebrow} title={manifesto[0].title} variant="surface-1">
        <div className="mt-4 flex flex-col">
          {manifesto.map((m, i) => (
            <div key={m.id} id={i === 0 ? undefined : m.id} className="scroll-mt-24 py-10" style={{ borderBottom: i < manifesto.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
              {i > 0 && (
                <div className="font-serif mb-5" style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.8rem)', fontWeight: 530, color: 'var(--text)', maxWidth: '24ch' }}>
                  {m.title}
                </div>
              )}
              <div className="grid lg:grid-cols-12 gap-x-16">
                <div className="lg:col-span-7 flex flex-col gap-5">
                  {m.body.map((line, j) => (
                    <Reveal key={j} delay={Math.min(j, 5) * 30}>
                      <p className="body-lead" style={{ maxWidth: '54ch' }}>
                        {line}
                      </p>
                    </Reveal>
                  ))}
                </div>
                <div className="lg:col-span-5 mt-6 lg:mt-0 flex items-center">
                  <Reveal>
                    <p className="font-serif" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', fontWeight: 530, lineHeight: 1.3, color: 'var(--text)' }}>
                      {m.coda}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* {#company-axionari} — the builder, one section
          (merged: companion-os + axionari) */}
      <Section id="axionari" eyebrow={builder[1].eyebrow} title={builder[1].title} variant="surface-3">
        <div className="mt-10 grid lg:grid-cols-12 gap-x-16">
          <div className="lg:col-span-7 flex flex-col gap-5">
            {builder[1].body.map((line, j) => (
              <Reveal key={j} delay={Math.min(j, 5) * 30}>
                <p className="body-lead" style={{ maxWidth: '54ch' }}>
                  {line}
                </p>
              </Reveal>
            ))}
            <div id="companion-os" className="scroll-mt-24 mt-4 flex flex-col gap-5">
              {builder[0].body.map((line, j) => (
                <Reveal key={j} delay={Math.min(j, 5) * 30}>
                  <p className="body-lead" style={{ maxWidth: '54ch' }}>
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 mt-8 lg:mt-0 flex items-center">
            <Reveal>
              <p className="font-serif" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', fontWeight: 530, lineHeight: 1.3, color: 'var(--text)' }}>
                {builder[1].coda}
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal>
          <div className="mt-10">
            <EndorsementMark variant="axionari" />
          </div>
        </Reveal>
      </Section>


      {/* {#company-contact} */}
      <Breather id="band-company-dusk" image="/assets/breathers/beach-dusk-walk.webp" height="clamp(280px, 44vh, 520px)" />

      <Section id="contact" eyebrow="CONTACT" title={c.contact.title} variant="surface-2">
        <div className="mt-8 body-lead" style={{ maxWidth: '56ch' }}>
          {c.contact.body}
        </div>
        <div className="mt-10 flex flex-col gap-px" style={{ maxWidth: '640px' }}>
          {c.contact.channels.map((ch) => (
            <Reveal key={ch.email}>
              <a
                href={`mailto:${ch.email}`}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-5 transition-colors hover:text-[#d4824f]"
                style={{ borderBottom: '1px solid var(--border-soft)', color: 'var(--text)' }}
              >
                <span className="eyebrow">{ch.label}</span>
                <span className="font-sans" style={{ fontSize: '16px', color: 'var(--accent)' }}>
                  {ch.email}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        {/* the one place this closing line lives (PRODUCT_ARCHITECTURE §7) */}
        <Reveal>
          <p
            className="font-serif mt-12"
            style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)', fontWeight: 530, color: 'var(--text)', maxWidth: '30ch' }}
          >
            {c.finalCta.title}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10">
            <Link href="/demo" className="btn-primary">
              {c.finalCta.cta}
            </Link>
          </div>
        </Reveal>
      </Section>

      <SiteFooter />
    </main>
  )
}
