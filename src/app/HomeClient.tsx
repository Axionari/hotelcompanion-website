'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { CapabilityGrid } from '@/components/cds/CapabilityGrid'
import { QuestionMarquee } from '@/components/cds/QuestionMarquee'
import { RoutingDiagram } from '@/components/cds/RoutingDiagram'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { FAQAccordion } from '@/components/cds/FAQAccordion'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { Lead } from '@/components/cds/Prose'
import { HeroDevice } from '@/components/cds/HeroDevice'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { useCopy } from '@/lib/i18n/useCopy'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { accents } from '@/lib/i18n/marketing/accents'

export default function HomeClient() {
  const c = useCopy(homeCopy)
  const a = useCopy(accents)

  return (
    <main>
      <SiteNav />

      {/* HERO {#home-hero} — asymmetric: text left (6 cols), in-room tablet right (6 cols).
          Left-aligned per the layout law; first viewport renders at full opacity. */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28" style={{ background: 'var(--bg)' }}>
        <div className="container-rc">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="eyebrow eyebrow-accent mb-7">{c.hero.positioning}</div>
              <MultiAccentHeadline
                as="h1"
                className="heading-hero"
                style={{ color: 'var(--text)', maxWidth: '15ch' }}
                text={c.hero.h1}
                accents={a.homeHero}
              />
              <p className="body-lead mt-8" style={{ maxWidth: '46ch' }}>
                {c.hero.lead1}
              </p>
              <p className="body-lead mt-4" style={{ maxWidth: '46ch' }}>
                {c.hero.lead2}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/demo" className="btn-primary">
                  {c.hero.primaryCta}
                </Link>
                {/* NEEDS REAL DATA: product-tour video asset — points to /platform until one exists */}
                <Link href="/platform" className="btn-secondary">
                  {c.hero.secondaryCta}
                </Link>
              </div>
              <div className="mt-10">
                <EndorsementMark variant="companion-os" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroDevice />
            </div>
          </div>
        </div>
      </section>

      {/* Signature guest-question marquee, full-bleed under the hero */}
      <div className="pb-4" style={{ background: 'var(--bg)' }}>
        <QuestionMarquee />
      </div>

      {/* TRUST {#home-trust} */}
      <section className="py-10 text-center" style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="font-serif italic" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)' }}>
            {c.trust}
          </p>
        </div>
      </section>

      {/* THE STAKE {#home-stake} — the one sourced figure on the site */}
      <Section eyebrow="01 · THE STAKE" variant="bg" center>
        <Reveal>
          <p
            className="font-serif"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)', lineHeight: 1, color: 'var(--accent)' }}
          >
            {c.stake.figure}
          </p>
        </Reveal>
        <div className="mt-6">
          <Lead>{c.stake.caption}</Lead>
        </div>
        <Reveal>
          <p className="font-sans mt-3" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {c.stake.source}
          </p>
        </Reveal>
        <div className="mt-12">
          <RhythmStack lines={c.stake.beats} center />
        </div>
        <Reveal>
          <p
            className="font-serif italic mt-10 mx-auto max-w-2xl"
            style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}
          >
            {c.stake.close}
          </p>
        </Reveal>
      </Section>

      {/* {#home-conversation} */}
      <Section eyebrow="02 · CONVERSATION" title={c.conversation.title} center>
        <Reveal>
          <p className="font-sans mt-6 mx-auto max-w-2xl" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {c.conversation.lead}
          </p>
        </Reveal>
        <div className="mt-10">
          <RhythmStack lines={c.conversation.questions} center serif size="lg" />
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.conversation.beats} center />
        </div>
        <Reveal>
          <p className="font-serif italic mt-10 mx-auto max-w-2xl" style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}>
            {c.conversation.close}
          </p>
        </Reveal>
      </Section>

      {/* {#home-employee} */}
      <Section eyebrow="03 · ALWAYS ON" title={c.employee.title} variant="surface-1" center>
        <Reveal>
          <p className="font-sans mt-6 mx-auto max-w-2xl" style={{ fontSize: '1.1rem', color: 'var(--text)' }}>
            {c.employee.lead}
          </p>
        </Reveal>
        <div className="mt-8">
          <RhythmStack lines={c.employee.bests} center />
        </div>
        <div className="mt-8">
          <RhythmStack lines={c.employee.cadence} center serif size="lg" />
        </div>
        <Reveal>
          <p className="font-sans mt-10 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.employee.close}
          </p>
        </Reveal>
      </Section>

      {/* {#home-voice} */}
      <Section eyebrow="04 · VOICE-FIRST" title={c.voice.title} center>
        <div className="mt-10">
          <RhythmStack lines={c.voice.beats} center serif size="lg" />
        </div>
        <Reveal>
          <p className="font-sans mt-10 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.voice.body}
          </p>
        </Reveal>
        <div className="mt-8">
          <RhythmStack lines={c.voice.close} center />
        </div>
      </Section>

      {/* {#home-every-room} */}
      <Section eyebrow="05 · IN EVERY ROOM" title={c.everyRoom.title} variant="surface-1" center>
        <Reveal>
          <p className="font-sans mt-6" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.everyRoom.lead}
          </p>
        </Reveal>
        <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10">
          <RhythmStack lines={c.everyRoom.items.slice(0, 7)} />
          <RhythmStack lines={c.everyRoom.items.slice(7)} />
        </div>
        <Reveal>
          <p className="font-serif italic mt-12 mx-auto max-w-2xl" style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}>
            {c.everyRoom.close}
          </p>
        </Reveal>
      </Section>

      {/* {#home-revenue} */}
      <Section eyebrow="06 · REVENUE" title={c.revenue.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.revenue.beats} center />
        </div>
        <Reveal>
          <p className="font-sans mt-8 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.revenue.body}
          </p>
        </Reveal>
        <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10">
          <RhythmStack lines={c.revenue.items.slice(0, 5)} />
          <RhythmStack lines={c.revenue.items.slice(5)} />
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.revenue.close} center serif size="lg" />
        </div>

        {/* {#home-revenue-example} — a real exchange, not a claim */}
        <Reveal>
          <div
            className="mt-16 mx-auto max-w-xl rounded-2xl p-6 md:p-8 text-left"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <p className="eyebrow mb-5">{c.revenueExample.prompt}</p>
            <p
              className="font-sans rounded-2xl px-5 py-3.5 mb-4"
              style={{ background: 'var(--surface-3)', fontSize: '15px', color: 'var(--text)' }}
            >
              {c.revenueExample.guest}
            </p>
            <p className="font-sans mb-4" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {c.revenueExample.context}
            </p>
            <p
              className="font-sans rounded-2xl px-5 py-3.5 mb-4"
              style={{
                background: 'rgba(201,106,58,0.12)',
                border: '1px solid rgba(201,106,58,0.25)',
                fontSize: '15px',
                color: 'var(--text)',
              }}
            >
              {c.revenueExample.reply}
            </p>
            <p
              className="font-sans rounded-2xl px-5 py-3.5"
              style={{ background: 'var(--surface-3)', fontSize: '15px', color: 'var(--text)' }}
            >
              {c.revenueExample.accept}
            </p>
          </div>
        </Reveal>
        <div className="mt-10">
          <RhythmStack lines={c.revenueExample.close} center serif size="lg" />
        </div>
      </Section>

      {/* {#home-knows} */}
      <Section eyebrow="07 · KNOWLEDGE" title={c.knows.title} variant="surface-1" center>
        <Reveal>
          <p className="font-sans mt-6" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.knows.lead}
          </p>
        </Reveal>
        <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10 gap-y-10 text-left sm:text-center">
          <RhythmStack lines={c.knows.property} />
          <div>
            <Reveal>
              <p className="font-serif italic mb-4" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                {c.knows.destinationLead}
              </p>
            </Reveal>
            <RhythmStack lines={c.knows.destination} />
          </div>
        </div>
        <div className="mt-12">
          <RhythmStack lines={c.knows.close} center />
        </div>
      </Section>

      {/* {#home-intelligence} */}
      <Section eyebrow="08 · INTELLIGENCE" title={c.intelligence.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.intelligence.beats} center serif size="lg" />
        </div>
        <Reveal>
          <p className="font-sans mt-8" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.intelligence.lead}
          </p>
        </Reveal>
        <div className="mt-8 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10">
          <RhythmStack lines={c.intelligence.items.slice(0, 5)} />
          <RhythmStack lines={c.intelligence.items.slice(5)} />
        </div>
        <div className="mt-10">
          <RhythmStack lines={c.intelligence.close} center />
        </div>
      </Section>

      {/* {#home-execution} */}
      <Section eyebrow="09 · EXECUTION" title={c.execution.title} variant="surface-1" center>
        <Reveal>
          <p className="font-sans mt-6 mb-10" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.execution.lead}
          </p>
        </Reveal>
        <RoutingDiagram pairs={c.execution.pairs} />
        <div className="mt-10">
          <RhythmStack lines={c.execution.close} center />
        </div>
      </Section>

      {/* {#home-enterprise-intel} */}
      <Section eyebrow="10 · ENTERPRISE" title={c.enterpriseIntel.title} center>
        <Reveal>
          <p className="font-sans mt-6" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.enterpriseIntel.lead}
          </p>
        </Reveal>
        <div className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-10">
          <RhythmStack lines={c.enterpriseIntel.items.slice(0, 4)} />
          <RhythmStack lines={c.enterpriseIntel.items.slice(4)} />
        </div>
        <Reveal>
          <p className="font-sans mt-12 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.enterpriseIntel.close}
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-6">
            <Link href="/enterprise" className="font-sans text-sm transition-colors hover:text-[#D4784A]" style={{ color: 'var(--accent)', fontWeight: 500 }}>
              {c.enterpriseLink} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* {#home-companion-os} */}
      <Section eyebrow="11 · COMPANION OS" title={c.companionOs.title} variant="surface-1" center>
        <Reveal>
          <p className="font-sans mt-6 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.companionOs.lead}
          </p>
        </Reveal>
        <div className="mt-10">
          <CapabilityGrid />
        </div>
        <Reveal>
          <p className="font-sans mt-10 mx-auto max-w-2xl" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.companionOs.close}
          </p>
        </Reveal>
        <div className="mt-6">
          <EndorsementMark variant="companion-os" />
        </div>
      </Section>

      {/* {#home-live-in-days} */}
      <Section eyebrow="12 · DEPLOYMENT" title={c.liveInDays.title} center>
        <div className="mt-8">
          <RhythmStack lines={c.liveInDays.beats} center serif size="lg" />
        </div>
        <Reveal>
          <p className="font-sans mt-8 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.liveInDays.body}
          </p>
        </Reveal>
        <div className="mt-8">
          <RhythmStack lines={c.liveInDays.close} center />
        </div>
      </Section>

      {/* {#home-founding-partner} — enterprise design-partner framing */}
      <Section eyebrow="13 · FOUNDING PARTNERS" title={c.foundingPartner.title} variant="surface-2" center>
        <Reveal>
          <p className="font-sans mt-6 mx-auto max-w-2xl leading-relaxed" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.foundingPartner.lead}
          </p>
        </Reveal>
        <Reveal>
          <p className="font-sans mt-8" style={{ fontSize: '1.05rem', color: 'var(--text)' }}>
            {c.foundingPartner.receiveLead}
          </p>
        </Reveal>
        <div className="mt-6">
          <RhythmStack lines={c.foundingPartner.items} center />
        </div>
        <Reveal>
          <p className="mt-10">
            <Link href="/contact#founding" className="font-sans text-sm transition-colors hover:text-[#D4784A]" style={{ color: 'var(--accent)', fontWeight: 500 }}>
              {c.foundingCta} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* FAQ {#home-faq} */}
      <Section eyebrow="14 · FAQ" title={c.faq.title} center>
        <div className="mt-12">
          <FAQAccordion items={c.faq.items} />
        </div>
      </Section>

      {/* {#home-what-it-is-not-teaser} — full version lives on Enterprise */}
      <Section eyebrow="15 · BOUNDARIES" variant="bg" center tight>
        <Reveal>
          <p
            className="font-serif mx-auto max-w-3xl"
            style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)', lineHeight: 1.25, color: 'var(--text)' }}
          >
            {c.whatItIsNot.headline}
          </p>
        </Reveal>
        <div className="mt-8">
          <RhythmStack lines={c.whatItIsNot.beats} center />
        </div>
        <Reveal>
          <p className="mt-8">
            <Link
              href="/enterprise#what-it-is-not"
              className="font-sans text-sm transition-colors hover:text-[#D4784A]"
              style={{ color: 'var(--accent)', fontWeight: 500 }}
            >
              {c.whatItIsNot.cta} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* FINAL CTA {#home-final-cta} */}
      <Section eyebrow="16 · NEXT STEP" title={c.finalCta.title} variant="surface-1" center>
        <div className="mt-8">
          <RhythmStack lines={c.finalCta.beats} center />
        </div>
        <Reveal>
          <p className="font-serif italic mt-10" style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}>
            {c.finalCta.platform}
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

      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}
