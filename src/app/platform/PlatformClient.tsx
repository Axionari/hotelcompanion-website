'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { Breather } from '@/components/cds/Breather'
import { MediaBed } from '@/components/cds/MediaBed'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { VoiceMorph, TwoStageAlert } from '@/components/cds/interactive'
import { DashboardShowcase } from '@/components/v5/DashboardShowcase'
import { EverySurface } from '@/components/v5/EverySurface'
import { NextSurface } from '@/components/v5/NextSurface'
import { JourneyWalkthrough } from '@/components/cds/JourneyWalkthrough'
import {
  SERIF,
  Em,
  PageHero,
  ChipStrip,
  Act,
  StatementCards,
  QuietChips,
  FaqList,
  Handoff,
} from '@/components/v5/Editorial'
import { CompanionTablet } from '@/components/v5/CompanionTablet'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { platformCopy } from '@/lib/i18n/marketing/platform'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'

/**
 * Platform — RC-editorial grammar (Phase 5 rollout). This page still answers
 * exactly one question — "What does it actually do?" — but now as numbered
 * acts, each carrying ONE message and ONE artifact:
 *
 *   HERO (statement + in-room device) · proof chips
 *   01 THE VOICE        — it sounds like your hotel        → VoiceMorph
 *   EVERY SURFACE       — one conversation, every screen   → device family
 *   ON THE HORIZON      — the surface after the screen     → AR still
 *   02 THE KNOWLEDGE    — it knows the operation + place   → two quiet panels
 *   03 THE LIFECYCLE    — arrival to review                → JourneyWalkthrough
 *   04 THE ACTION       — every request becomes action     → TwoStageAlert
 *   05 THE INTELLIGENCE — conversations reveal intent      → statement cards
 *   06 THE COMMAND CENTRE — understand why                 → DashboardShowcase
 *   HAND-OFF → /enterprise · 07 FAQ · CLOSING MEDIA BAND (one action)
 *
 * All reading copy is the approved platform copy (platformCopy) — condensed
 * and re-presented, never rewritten. Old section ids survive as anchors.
 */

/** Split a one-sentence-pair statement ("A. B.") into plain + italic halves. */
function splitStatement(title: string): { pre: string; hi: string } {
  const i = title.indexOf('. ')
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i + 1), hi: title.slice(i + 1) }
}

export default function PlatformClient() {
  const c = useCopy(platformCopy)
  const g = useCopy(globalCopy)
  const demo = useCopy(liveDemoCopy)
  const { t } = useLang()

  const heroTitle = splitStatement(c.hero.title)

  return (
    <main>
      <SiteNav />

      {/* HERO {#platform-hero} — flat page bed, statement left, device right */}
      <div id="platform-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.platform}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body}
          actions={
            <>
              <Link href="/demo" className="btn-primary">
                {c.finalCta.cta}
              </Link>
              <button type="button" onClick={openLiveDemo} className="btn-secondary">
                {demo.open}
              </button>
            </>
          }
          visual={<CompanionTablet askBar={false} />}
        />
      </div>

      {/* Proof strip — quiet mono claims (all from approved copy) */}
      <ChipStrip chips={c.heroChips} />

      {/* 01 · THE VOICE {#platform-voice-first} — one message: it sounds like
          your hotel. One artifact: the voice, morphing. */}
      <Act
        no="01"
        label={c.acts.voice}
        id="platform-voice-first"
        statement={
          <>
            {c.yourVoice.close[0]} <Em>{c.yourVoice.close[1]}</Em>
          </>
        }
        deck={c.voiceFirst.body1}
      >
        <div id="platform-your-voice" className="scroll-mt-24">
          <VoiceMorph
            voices={c.yourVoice.voices}
            guestQuestion={c.yourVoice.morphQuestion}
            deviceLabel={c.yourVoice.morphDeviceLabel}
          />
          <Reveal>
            <p
              className="mt-12"
              style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
            >
              {c.voiceFirst.close.join(' ')}
            </p>
          </Reveal>
        </div>
      </Act>

      {/* EVERY SURFACE {#every-surface} — one conversation across the whole
          device family (moved from the homepage; this is platform's surfaces
          story, richer than the old channels list). */}
      <EverySurface />

      {/* ON THE HORIZON {#next-surface} — the AR surface, where this is going. */}
      <NextSurface />

      <Breather id="band-platform-waterfall" image="/assets/breathers/waterfall-swim.webp" />

      {/* 02 · THE KNOWLEDGE {#platform-knows-property} — one message: it knows
          the operation and the destination. One artifact: the two panels. */}
      <Act
        no="02"
        label={c.acts.knowledge}
        id="platform-knows-property"
        statement={c.knowsProperty.lead}
        deck={c.destination.beats.join(' ')}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="eyebrow eyebrow-accent mb-6">{c.knowledgeSplit.property}</div>
            <QuietChips items={c.knowsProperty.items.slice(0, 12)} />
          </div>
          <div id="platform-destination" className="scroll-mt-24">
            <div className="eyebrow eyebrow-accent mb-6">{c.knowledgeSplit.destination}</div>
            <QuietChips items={c.destination.items.slice(0, 12)} />
          </div>
        </div>
        <div id="platform-not-generic-ai" className="scroll-mt-24">
          <Reveal>
            <p
              className="mt-14"
              style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.3, color: 'var(--cream, #F2EEE6)', maxWidth: '34ch' }}
            >
              {c.notGenericAi.close}
            </p>
          </Reveal>
        </div>
      </Act>

      {/* 03 · THE LIFECYCLE {#platform-lifecycle} — one message: arrival to
          review. One artifact: the journey walkthrough (stage text advancing
          beside the tablet screen for each stage; the revenue tally carries). */}
      <Act no="03" label={c.acts.lifecycle} id="platform-lifecycle" statement={c.lifecycle.title}>
        <JourneyWalkthrough steps={c.journey.steps} tallyLabel={c.journey.tallyLabel} />
      </Act>

      {/* 04 · THE ACTION {#platform-request-action} — one message: every
          request is tracked to completion. One artifact: the 2 AM save. */}
      <Act
        no="04"
        label={c.acts.action}
        id="platform-request-action"
        statement={c.requestAction.close[0]}
        deck={c.issueDetection.lead}
      >
        <div id="platform-issue-detection" className="scroll-mt-24">
          <TwoStageAlert
            guest={c.issueAlert.guest}
            reply={c.issueAlert.reply}
            deviceLabel={c.issueAlert.deviceLabel}
            stages={c.issueDetection.features.slice(1, 3).map((f) => ({ title: f.name, body: f.desc }))}
          />
        </div>
        <div id="platform-reservations" className="mt-12 scroll-mt-24">
          <QuietChips items={c.requestAction.departments} />
        </div>
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '26ch' }}
          >
            {c.requestAction.close.slice(1).join(' ')}
          </p>
        </Reveal>
      </Act>

      <Breather image="/assets/lux/breather-daybeds-hills.webp" darken={0.42} />

      {/* 05 · THE INTELLIGENCE {#platform-intelligence} — one message: behind
          every conversation is intelligence. One artifact: two statements. */}
      <Act
        no="05"
        label={c.acts.intelligence}
        id="platform-intelligence"
        statement={c.guestIntel.lead}
      >
        <div id="platform-revenue-intel" className="scroll-mt-24">
          <StatementCards
            columns={2}
            items={[
              { eyebrow: c.revenueIntel.title, title: c.revenueIntel.lead, body: c.revenueIntel.body },
              { eyebrow: c.guestIntel.title, title: c.guestMemory.body, body: c.guestIntel.body + ' ' + c.guestIntel.items.slice(0, 6).map((x) => x.replace(/\.$/, '').toLowerCase()).join(' · ') + '.' },
            ]}
          />
        </div>
        <div id="platform-guest-memory" className="scroll-mt-24" />
      </Act>

      {/* 06 · THE COMMAND CENTRE {#platform-dashboards} — one message:
          understand why. One artifact: the dashboard. */}
      <Act
        no="06"
        label={c.acts.command}
        id="platform-dashboards"
        statement={
          <>
            {c.dashboards.close[0]} <Em>{c.dashboards.close[1]}</Em>
          </>
        }
      >
        {/* {#dashboards-resolution} — the operator command center, ported from
            the shipping marketing homepage (placecompanion.com). NEEDS CONFIRM
            on the 91/9 split. */}
        <div id="dashboards-resolution">
          <DashboardShowcase caption={c.dashboards.live} />
        </div>
      </Act>

      {/* HAND-OFF {#platform-enterprise-ready} — the enterprise question is
          named here, answered only on /enterprise (RC hand-off, not a CTA). */}
      <div id="platform-enterprise-ready" className="scroll-mt-20">
        <Handoff statement={c.enterpriseReady.close} href="/enterprise" label={g.nav.enterprise} />
      </div>

      {/* 07 · COMMON QUESTIONS {#platform-faq} — the practical questions,
          closed-by-default accordion (copy = the shipping site FAQ). */}
      <Act no="07" label={c.acts.faq} id="platform-faq" statement={t.faq.headline}>
        <FaqList items={t.faq.items} />
      </Act>

      {/* CLOSING {#platform-final-cta} — warm media band, one action */}
      <MediaBed poster="/assets/img/hero-poolside.webp" scrim={0.72}>
        <section id="platform-final-cta" style={{ paddingBlock: 'clamp(120px, 18vw, 240px)' }}>
          <div className="container-rc" style={{ textAlign: 'center' }}>
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-7">{c.acts.next}</div>
              <h2
                style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)' }}
              >
                {c.finalCta.title}
              </h2>
              <div className="mt-10 flex justify-center">
                <Link href="/demo" className="btn-primary">
                  {c.finalCta.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </MediaBed>

      <SiteFooter />
    </main>
  )
}
