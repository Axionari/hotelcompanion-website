'use client'

import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { Breather } from '@/components/cds/Breather'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import {
  SERIF,
  Em,
  Band,
  PageHero,
  Act,
  StatementCards,
  QuietChips,
  Handoff,
} from '@/components/v5/Editorial'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { companyCopy } from '@/lib/i18n/marketing/company'

/**
 * Company — RC-editorial grammar (Phase 5 rollout). This page still answers
 * exactly one question — "Who is behind this, and why?" — but now as numbered
 * acts, each carrying ONE message and ONE artifact:
 *
 *   HERO (mission statement, text-led — no visual, no action)
 *   01 WHY HOTELS      — every missed question is a missed moment → text-only
 *                        two-column essay (statement left, resolve right)
 *   02 THE MISSION     — understand every guest                  → quiet chips
 *   03 THE PRINCIPLES  — hospitality is human                    → statement cards
 *   04 THE BUILDER     — Companion OS + Axionari                 → statement cards
 *   05 CONTACT         — the three doors in                      → hairline rows
 *   HAND-OFF → /demo
 *
 * All reading copy is the approved company copy (companyCopy) — condensed
 * and re-presented, never rewritten. Old section ids survive as anchors.
 */

/** Split a one-sentence-pair statement ("A. B.") into plain + italic halves. */
function splitStatement(title: string): { pre: string; hi: string } {
  const i = title.indexOf('. ')
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i + 1), hi: title.slice(i + 1) }
}

/** Italicise the last N words of a single-sentence statement (hero emphasis). */
function splitTail(title: string, n = 2): { pre: string; hi: string } {
  const words = title.split(' ')
  return { pre: words.slice(0, -n).join(' '), hi: words.slice(-n).join(' ') }
}

/** Strip the legacy "NN · " prefix off a section eyebrow (acts renumber). */
function plainEyebrow(eyebrow: string): string {
  return eyebrow.replace(/^\d+\s*·\s*/, '')
}

export default function CompanyClient() {
  const c = useCopy(companyCopy)
  const g = useCopy(globalCopy)

  const byId = (id: string) => c.sections.find((s) => s.id === id)!
  const why = byId('why-hotels')
  const belief = byId('belief')
  const mission = byId('mission')
  const philosophy = byId('philosophy')
  const approach = byId('approach')
  const companionOs = byId('companion-os')
  const axionari = byId('axionari')

  const heroTitle = splitTail(c.hero.title)
  const beliefTitle = splitStatement(belief.title)
  const builderTitle = splitStatement(companionOs.title)

  return (
    <main>
      <SiteNav />

      {/* HERO {#company-hero} — flat page bed, mission statement only. A
          company page is text-led: no device, no action (RC). */}
      <div id="company-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.company}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body1}
        />
      </div>

      {/* 01 · WHY HOTELS {#why-hotels} — one message: every missed question is
          a missed moment. One artifact: the essay itself, two-column text-only
          (HomeClient's ONE DAY composition — statement left, rule + resolve
          right, italic coda). */}
      <Band id="why-hotels">
        <Reveal className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow eyebrow-accent mb-7">01 · {c.acts.why}</div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 530,
                fontSize: 'clamp(30px, 4vw, 54px)',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                color: 'var(--text)',
                maxWidth: '18ch',
              }}
            >
              {why.body[7]}
            </h2>
            <p className="body-lead mt-7" style={{ maxWidth: '46ch' }}>
              {why.body[0]}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <div style={{ width: 44, height: 2, background: 'var(--accent)', marginBottom: 24 }} />
            <p
              style={{
                fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
                fontSize: 'clamp(16px, 1.7vw, 21px)',
                lineHeight: 1.5,
                color: 'var(--text-dim, rgba(242,233,220,0.62))',
                maxWidth: '34ch',
              }}
            >
              {why.body[8]} {why.body[9]}
            </p>
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 480,
                fontSize: 'clamp(26px, 3vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--cream, #F2EEE6)',
                marginTop: 18,
                maxWidth: '18ch',
              }}
            >
              {why.coda}
            </p>
          </div>
        </Reveal>
      </Band>

      {/* 02 · THE MISSION {#mission} — one message: understand every guest.
          One artifact: the six kinds of intelligence, as quiet chips. */}
      <Act
        no="02"
        label={c.acts.mission}
        id="mission"
        statement={mission.title}
        deck={mission.body[0] + ' ' + mission.body[1]}
      >
        <QuietChips items={mission.body[2].split('. ')} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '32ch' }}
          >
            {mission.coda}
          </p>
        </Reveal>
      </Act>

      {/* 03 · THE PRINCIPLES {#belief} — one message: hospitality is human.
          One artifact: the three movements (belief / approach / philosophy)
          as statement cards. */}
      <Act
        no="03"
        label={c.acts.principles}
        id="belief"
        statement={
          <>
            {beliefTitle.pre} <Em>{beliefTitle.hi}</Em>
          </>
        }
        deck={belief.body[1]}
      >
        <div id="approach" className="scroll-mt-24" />
        <div id="philosophy" className="scroll-mt-24" />
        <StatementCards
          items={[
            { eyebrow: plainEyebrow(belief.eyebrow), title: belief.coda, body: belief.body[2] },
            { eyebrow: plainEyebrow(approach.eyebrow), title: approach.title, body: approach.body[0] + ' ' + approach.coda },
            { eyebrow: plainEyebrow(philosophy.eyebrow), title: philosophy.title, body: philosophy.body[2] + ' ' + philosophy.coda },
          ]}
        />
      </Act>

      {/* 04 · THE BUILDER {#axionari} — one message: one platform, one builder.
          One artifact: Companion OS and Axionari as statement cards, closed by
          the endorsement mark in a quiet position. */}
      <Act
        no="04"
        label={c.acts.builder}
        id="axionari"
        statement={
          <>
            {builderTitle.pre} <Em>{builderTitle.hi}</Em>
          </>
        }
        deck={companionOs.body[0]}
      >
        <div id="companion-os" className="scroll-mt-24" />
        <StatementCards
          columns={2}
          items={[
            { eyebrow: plainEyebrow(companionOs.eyebrow), title: companionOs.coda, body: companionOs.body[1] + ' ' + companionOs.body[2] },
            { eyebrow: plainEyebrow(axionari.eyebrow), title: axionari.title, body: axionari.body[0] + ' ' + axionari.body[1] },
          ]}
        />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '30ch' }}
          >
            {axionari.coda}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10">
            <EndorsementMark variant="axionari" />
          </div>
        </Reveal>
      </Act>

      {/* Breather — air before the doors in (existing image, this page) */}
      <Breather id="band-company-dusk" image="/assets/breathers/beach-dusk-walk.webp" height="clamp(280px, 44vh, 520px)" />

      {/* 05 · CONTACT {#contact} — one message: three doors in. One artifact:
          the channels, as calm hairline rows. */}
      <Act no="05" label={c.acts.contact} id="contact" statement={c.contact.title} deck={c.contact.body}>
        <div style={{ maxWidth: 640 }}>
          {c.contact.channels.map((ch, i) => (
            <Reveal key={ch.email} delay={Math.min(i, 4) * 60}>
              <a
                href={`mailto:${ch.email}`}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-5 transition-colors hover:text-[#d4824f]"
                style={{ borderTop: '1px solid var(--border-soft)', color: 'var(--text)' }}
              >
                <span className="eyebrow">{ch.label}</span>
                <span style={{ fontSize: 16, color: 'var(--accent)' }}>{ch.email}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Act>

      {/* HAND-OFF {#company-final-cta} — the closing line points back into the
          product (RC hand-off, not a heavy CTA). */}
      <div id="company-final-cta" className="scroll-mt-20">
        <Handoff statement={c.finalCta.title} href="/demo" label={c.finalCta.cta} />
      </div>

      <SiteFooter />
    </main>
  )
}
