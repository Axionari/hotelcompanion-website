'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { Breather } from '@/components/cds/Breather'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { IntelligenceModel } from '@/components/v5/IntelligenceModel'
import {
  Em,
  PageHero,
  ChipStrip,
  Act,
  StatementCards,
  QuietChips,
  Handoff,
} from '@/components/v5/Editorial'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { companionOsCopy } from '@/lib/i18n/marketing/companionOs'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * /companion-os — the technology philosophy: the platform behind the ecosystem,
 * never another Hotel Companion page. Rolled onto the v5 RC-editorial grammar
 * (Phase 5; this page was missed in the original rollout and was still running
 * the pre-v5 Section / IconChipGrid / ConvergenceDiagram blocks).
 *
 *   HERO (statement, no visual — this is an argument, not a product shot)
 *   proof strip — the eight capabilities, mono
 *   01 WHY              — why the platform exists    → two bare statements
 *   02 THE MODEL        — the signature diagram      → IntelligenceModel
 *   03 ONE PLATFORM     — universal vs specialized   → QuietChips + coda
 *   04 THE ARCHITECTURE — the eight capabilities     → cards (ids preserved)
 *   05 ENTERPRISE       — the foundation             → QuietChips + coda
 *   06 ECOSYSTEM        — the family                 → today / tomorrow
 *   07 AXIONARI         — the builder                → statement + mark
 *   HAND-OFF → /
 *
 * Depth is held back deliberately: the page should leave strategic buyers
 * wanting the conversation. All reading copy is the approved companionOsCopy —
 * re-presented, never rewritten.
 */

/** Split an approved title into plain + italic halves around its accent phrase. */
function splitEm(title: string, em?: string): { pre: string; hi: string } {
  const i = em ? title.lastIndexOf(em) : -1
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i).trimEnd(), hi: title.slice(i) }
}

/** Split an approved noun-run body line into its items. */
function nounRun(line: string): string[] {
  return line
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${s}.`)
}

/** Names out of the approved "Today:/Tomorrow:" lines. */
function familyNames(line: string): string[] {
  const after = line.includes(':') ? line.slice(line.indexOf(':') + 1) : line
  return after
    .replace(/\.$/, '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** "01 · VOICE INTELLIGENCE" → "VOICE INTELLIGENCE" for the proof strip. */
function stripNo(eyebrow: string): string {
  const i = eyebrow.indexOf('· ')
  return i === -1 ? eyebrow : eyebrow.slice(i + 2)
}

/** The coda line that closes several acts — serif, short measure. */
function Coda({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p
        className="mt-10"
        style={{
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontWeight: 530,
          fontSize: 'clamp(19px, 2vw, 26px)',
          lineHeight: 1.3,
          color: 'var(--text)',
          maxWidth: '32ch',
        }}
      >
        {children}
      </p>
    </Reveal>
  )
}

export default function CompanionOsClient() {
  const c = useCopy(companionOsCopy)
  const g = useCopy(globalCopy)
  const a = useCopy(accents)

  const heroTitle = splitEm(c.hero.title, a.companionOsHero[0])

  return (
    <main>
      <SiteNav />

      {/* HERO {#companionos-hero} — no visual: the claim carries the page. */}
      <div id="companionos-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.companionOs}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body}
          actions={
            <Link href="/" className="btn-primary">
              {c.finalCta.cta}
            </Link>
          }
        />
      </div>

      {/* Proof strip — the eight capabilities, quiet mono. */}
      <ChipStrip chips={c.deepDives.map((d) => stripNo(d.eyebrow))} />

      {/* 01 · WHY {#companionos-why} — the argument for a shared platform. */}
      <Act
        no="01"
        label="WHY"
        id="companionos-why"
        statement={c.why.title}
        deck={c.why.beats.join(' ')}
      >
        <StatementCards columns={2} items={c.why.body.map((b) => ({ title: b }))} />
      </Act>

      {/* 02 · THE MODEL {#companionos-model} — the signature diagram. One idea:
          a conversation becomes shared intelligence that improves the whole
          hotel. Business model, never architecture. See IntelligenceModel. */}
      <Act
        no="02"
        label={c.model.eyebrow}
        id="companionos-model"
        statement={c.model.title}
        deck={c.model.deck}
      >
        <IntelligenceModel c={c.model} />
      </Act>

      {/* 03 · ONE PLATFORM {#companionos-one-platform} — universal intelligence
          vs industry specialization. The specializations carry the idea, so
          they run as quiet chips rather than a diagram. */}
      <Act
        no="03"
        label="ONE PLATFORM"
        id="companionos-one-platform"
        statement={c.onePlatform.title}
        deck={c.onePlatform.body[0]}
      >
        <>
          <QuietChips items={c.onePlatform.specializations} />
          <Reveal>
            <p className="body-lead mt-10" style={{ maxWidth: '46ch' }}>
              {c.onePlatform.body[1]}
            </p>
          </Reveal>
          <Coda>{c.onePlatform.coda}</Coda>
        </>
      </Act>

      <Breather id="band-companionos-palms" image="/assets/img/ambient-palms-night.webp" darken={0.4} />

      {/* 04 · THE ARCHITECTURE {#companionos-architecture} — the eight
          capabilities. Rendered inline rather than via StatementCards because
          each card is a deep-link target (/companion-os#voice etc.); the visual
          language is StatementCards' exactly. */}
      {/* The hero's two closing lines are re-presented here: they are the
          claim the eight capabilities actually prove, and reusing
          onePlatform.title would print the same headline twice running. */}
      <Act
        no="04"
        label="THE ARCHITECTURE"
        id="companionos-architecture"
        statement={c.hero.close[0]}
        deck={c.hero.close[1]}
      >
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {c.deepDives.map((d, i) => (
            <Reveal key={d.id} delay={Math.min(i, 4) * 80}>
              <div
                id={d.id}
                className="pt-6 scroll-mt-24"
                style={{ borderTop: '1px solid var(--border-soft)' }}
              >
                <div className="eyebrow eyebrow-accent mb-4">{d.eyebrow}</div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontWeight: 530,
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    lineHeight: 1.25,
                    color: 'var(--text)',
                    maxWidth: '18ch',
                  }}
                >
                  {d.title}
                </p>
                <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '38ch' }}>
                  {d.body[0]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Act>

      {/* 05 · ENTERPRISE {#companionos-enterprise} — the foundation. */}
      <Act
        no="05"
        label="ENTERPRISE"
        id="companionos-enterprise"
        statement={c.enterprise.title}
        deck={c.enterprise.body[0]}
        tight
      >
        <>
          <QuietChips items={nounRun(c.enterprise.body[1])} />
          <Coda>{c.enterprise.coda}</Coda>
        </>
      </Act>

      <Breather image="/assets/lux/breather-thatch-beach-band.webp" darken={0.4} />

      {/* 06 · ECOSYSTEM {#companionos-ecosystem} — the family today and next.
          Destination Companion is a future NAME ONLY, never a link. */}
      <Act
        no="06"
        label="ECOSYSTEM"
        id="companionos-ecosystem"
        statement={c.ecosystem.title}
        deck={c.ecosystem.lead}
      >
        <>
          <Reveal>
            <div className="eyebrow eyebrow-accent mb-6">{c.ecosystem.today.split(':')[0]}</div>
          </Reveal>
          <StatementCards
            columns={2}
            items={familyNames(c.ecosystem.today).map((name) => ({ title: name }))}
          />
          <Reveal>
            <div className="eyebrow mt-16 mb-6" style={{ color: 'var(--text-faint)' }}>
              {c.ecosystem.tomorrow.split(':')[0]}
            </div>
          </Reveal>
          <QuietChips items={familyNames(c.ecosystem.tomorrow)} />
          <Coda>{c.ecosystem.coda}</Coda>
        </>
      </Act>

      {/* 07 · AXIONARI {#companionos-axionari} — the builder behind the platform. */}
      <Act
        no="07"
        label="THE BUILDER"
        id="companionos-axionari"
        statement={c.axionari.title}
        deck={c.axionari.body[0]}
        tight
      >
        <>
          <Reveal>
            <p className="body-lead" style={{ color: 'var(--text)', maxWidth: '46ch' }}>
              {c.axionari.body[1]}
            </p>
          </Reveal>
          <Coda>{c.axionari.coda}</Coda>
          <Reveal>
            <div className="mt-10">
              <EndorsementMark variant="axionari" />
            </div>
          </Reveal>
        </>
      </Act>

      {/* HAND-OFF → / — a pointer back to Hotel Companion, not a heavy CTA. */}
      <Handoff statement={c.finalCta.title} href="/" label={c.finalCta.cta} />

      <SiteFooter />
    </main>
  )
}
