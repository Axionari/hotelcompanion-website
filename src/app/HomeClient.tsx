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
import { useCopy } from '@/lib/i18n/useCopy'
import { homeCopy } from '@/lib/i18n/marketing/home'

const primaryBtn = {
  background: 'var(--accent)',
  borderRadius: '8px',
  height: '52px',
  padding: '0 32px',
  fontSize: '16px',
  fontWeight: 600,
} as const

const ghostBtn = {
  background: 'transparent',
  border: '1px solid rgba(232,227,220,0.2)',
  borderRadius: '8px',
  height: '52px',
  padding: '0 32px',
  fontSize: '16px',
  color: 'var(--text-secondary)',
} as const

export default function HomeClient() {
  const c = useCopy(homeCopy)

  return (
    <main>
      <SiteNav />

      {/* HERO {#home-hero} — first viewport renders at full opacity (no reveal) */}
      <section className="pt-16 md:pt-24 pb-10 text-center overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="eyebrow mb-6" style={{ color: 'var(--accent)' }}>
            {c.hero.positioning}
          </div>
          <h1 className="heading-hero font-serif font-normal text-balance mx-auto max-w-4xl" style={{ color: 'var(--text)' }}>
            {c.hero.h1}
          </h1>
          <p
            className="font-sans mt-8 mx-auto max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)' }}
          >
            {c.hero.lead1}
          </p>
          <p
            className="font-sans mt-4 mx-auto max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)' }}
          >
            {c.hero.lead2}
          </p>
          <div className="mt-6">
            <EndorsementMark variant="companion-os" />
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="font-sans flex items-center justify-center text-white transition-colors hover:bg-[#D4784A] w-full sm:w-auto" style={primaryBtn}>
              {c.hero.primaryCta}
            </Link>
            {/* NEEDS REAL DATA: product-tour video asset — CTA points to /platform until one exists */}
            <Link href="/platform" className="font-sans flex items-center justify-center transition-colors hover:text-[#FAF9F5] hover:border-[rgba(232,227,220,0.35)] w-full sm:w-auto" style={ghostBtn}>
              {c.hero.secondaryCta}
            </Link>
          </div>
          {/* NEEDS REAL DATA: in-room tablet render — hero artifact slot (brief §7 Home) */}
        </div>
        {/* Ambient signature marquee below the hero copy */}
        <div className="mt-16">
          <QuestionMarquee />
        </div>
      </section>

      {/* TRUST {#home-trust} */}
      <section className="py-10 text-center" style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="font-serif italic" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)' }}>
            {c.trust}
          </p>
        </div>
      </section>

      {/* {#home-conversation} */}
      <Section eyebrow="01 · CONVERSATION" title={c.conversation.title} center>
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
      <Section eyebrow="02 · ALWAYS ON" title={c.employee.title} variant="surface-1" center>
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
      <Section eyebrow="03 · VOICE-FIRST" title={c.voice.title} center>
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
      <Section eyebrow="04 · IN EVERY ROOM" title={c.everyRoom.title} variant="surface-1" center>
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
      <Section eyebrow="05 · REVENUE" title={c.revenue.title} center>
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
      </Section>

      {/* {#home-knows} */}
      <Section eyebrow="06 · KNOWLEDGE" title={c.knows.title} variant="surface-1" center>
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
      <Section eyebrow="07 · INTELLIGENCE" title={c.intelligence.title} center>
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
      <Section eyebrow="08 · EXECUTION" title={c.execution.title} variant="surface-1" center>
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
      <Section eyebrow="09 · ENTERPRISE" title={c.enterpriseIntel.title} center>
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
      <Section eyebrow="10 · COMPANION OS" title={c.companionOs.title} variant="surface-1" center>
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
      <Section eyebrow="11 · DEPLOYMENT" title={c.liveInDays.title} center>
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
      <Section eyebrow="12 · FOUNDING PARTNERS" title={c.foundingPartner.title} variant="surface-2" center>
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
      <Section eyebrow="13 · FAQ" title={c.faq.title} center>
        <div className="mt-12">
          <FAQAccordion items={c.faq.items} />
        </div>
      </Section>

      {/* FINAL CTA {#home-final-cta} */}
      <Section eyebrow="14 · NEXT STEP" title={c.finalCta.title} variant="surface-1" center>
        <div className="mt-8">
          <RhythmStack lines={c.finalCta.beats} center />
        </div>
        <Reveal>
          <p className="font-serif italic mt-10" style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}>
            {c.finalCta.platform}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <Link href="/demo" className="font-sans flex items-center justify-center text-white transition-colors hover:bg-[#D4784A]" style={{ ...primaryBtn, animation: 'pulse-ring 2.5s ease-out infinite' }}>
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
