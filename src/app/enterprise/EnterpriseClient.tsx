'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { Breather } from '@/components/cds/Breather'
import { MediaBed } from '@/components/cds/MediaBed'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import {
  SERIF,
  Em,
  PageHero,
  ChipStrip,
  Act,
  NumberedList,
  StatementCards,
  QuietChips,
  TenantStack,
  PostureSplit,
} from '@/components/v5/Editorial'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { enterpriseCopy } from '@/lib/i18n/marketing/enterprise'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'

/**
 * Enterprise — RC-editorial grammar (Phase 5 rollout). This page still answers
 * exactly one question — "Can my organization trust and deploy this?" — but
 * now as numbered acts, each carrying ONE message and ONE artifact:
 *
 *   HERO (statement, no device) · proof chips
 *   01 SHARED INTELLIGENCE — one brain, local execution   → TenantStack
 *   02 MULTI-PROPERTY      — one platform, every property → numbered run
 *   03 KNOWLEDGE & ADMIN   — knowledge as an asset        → two statements
 *   04 SECURITY            — secure by design             → PostureSplit
 *   05 GOVERNANCE          — consistency without friction → quiet chips
 *   06 INTELLIGENCE        — conversations reveal patterns→ two statements
 *   07 INTEGRATION & BOUNDARIES — fits without risk       → the four "nots"
 *   08 DEPLOYMENT & SCALE  — live in days, grows with you → numbered stages
 *   CLOSING MEDIA BAND (one action)
 *
 * All reading copy is the approved enterprise copy (enterpriseCopy) —
 * condensed and re-presented, never rewritten. Old section ids survive as
 * anchors. Dashboards stay Silent here (§7 — they live on /platform).
 */

/** Split a one-sentence-pair statement ("A. B.") into plain + italic halves. */
function splitStatement(title: string): { pre: string; hi: string } {
  const i = title.indexOf('. ')
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i + 1), hi: title.slice(i + 1) }
}

/** Splits an approved noun-run body line into its items for list rendering. */
function nounRun(line: string): string[] {
  return line
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${s}.`)
}

export default function EnterpriseClient() {
  const c = useCopy(enterpriseCopy)
  const g = useCopy(globalCopy)
  const demo = useCopy(liveDemoCopy)

  const byId = (id: string) => c.sections.find((s) => s.id === id)!
  /** Existing section eyebrow, minus its retired number ("04 · X" → "X"). */
  const plainEyebrow = (id: string) => byId(id).eyebrow.replace(/^\d+ · /, '')

  // The hero statement is the page's own opening pair (shared-intel body[0]).
  const heroTitle = splitStatement(byId('shared-intel').body[0])
  const multiClose = splitStatement(byId('multi-property').coda)
  const secureClose = splitStatement(byId('secure').coda)

  return (
    <main>
      <SiteNav />

      {/* HERO {#enterprise-hero} — flat page bed, statement left, no device */}
      <div id="enterprise-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.enterprise}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.positioning}
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
        />
      </div>

      {/* Proof strip — quiet mono claims (all from approved copy) */}
      <ChipStrip chips={c.heroChips} />

      {/* 01 · SHARED INTELLIGENCE {#shared-intel} — one message: one brain
          across the portfolio. One artifact: the architecture stack (your
          organization → Hotel Companion → the foundation). */}
      <Act
        no="01"
        label={c.acts.shared}
        id="shared-intel"
        statement={byId('shared-intel').title}
        deck={byId('shared-intel').body[1]}
      >
        <TenantStack
          caption={c.architecture.caption}
          tiers={[
            { ...c.architecture.tiers.org },
            { ...c.architecture.tiers.layer, highlight: true },
            { ...c.architecture.tiers.foundation },
          ]}
        />
      </Act>

      {/* 02 · MULTI-PROPERTY {#multi-property} — one message: one hotel or
          hundreds from one platform. One artifact: the run, numbered. */}
      <Act
        no="02"
        label={c.acts.multi}
        id="multi-property"
        statement={byId('multi-property').title}
        deck={byId('multi-property').body[0]}
      >
        <NumberedList items={nounRun(byId('multi-property').body[1]).map((title) => ({ title }))} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
          >
            {multiClose.pre} <Em>{multiClose.hi}</Em>
          </p>
        </Reveal>
      </Act>

      {/* 03 · KNOWLEDGE & ADMINISTRATION {#knowledge} — one message: knowledge
          is an asset, managed from one place. One artifact: two statements. */}
      <Act
        no="03"
        label={c.acts.knowledge}
        id="knowledge"
        statement={byId('knowledge').body[0]}
        deck={byId('knowledge').body[1]}
      >
        <div id="admin" className="scroll-mt-24">
          <StatementCards
            columns={2}
            items={[
              {
                eyebrow: plainEyebrow('knowledge'),
                title: byId('knowledge').coda,
                body: byId('knowledge').body[2],
              },
              {
                eyebrow: plainEyebrow('admin'),
                title: byId('admin').coda,
                body: byId('admin').body[0] + ' ' + byId('admin').body[1],
              },
            ]}
          />
        </div>
      </Act>

      <Breather id="band-enterprise-lagoon" image="/assets/breathers/waterfall-lagoon.webp" />

      {/* 04 · SECURITY {#secure} — the page's centerpiece. One message:
          secure by design. One artifact: the principles + a posture card
          (RC's privacy/security split). */}
      <Act
        no="04"
        label={c.acts.security}
        id="secure"
        statement={byId('secure').title}
        deck={byId('secure').body[1]}
      >
        <PostureSplit
          principles={nounRun(byId('secure').body[2])}
          postureLabel={c.securityPosture.label}
          postureTag={c.securityPosture.tag}
          posture={c.securityPosture.rows}
        />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
          >
            {secureClose.pre} <Em>{secureClose.hi}</Em>
          </p>
        </Reveal>
      </Act>

      {/* 05 · GOVERNANCE {#governance} — one message: consistency without
          friction. One artifact: the controls, as quiet chips. */}
      <Act
        no="05"
        label={c.acts.governance}
        id="governance"
        statement={byId('governance').title}
        deck={byId('governance').body[0]}
      >
        <QuietChips items={nounRun(byId('governance').body[1])} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
          >
            {byId('governance').coda}
          </p>
        </Reveal>
      </Act>

      {/* 06 · INTELLIGENCE {#operational-intel} — one message: conversations
          reveal patterns. One artifact: two statements (ops + commercial). */}
      <Act
        no="06"
        label={c.acts.intelligence}
        id="operational-intel"
        statement={byId('operational-intel').body[0]}
        deck={byId('commercial-intel').body[0]}
      >
        <div id="commercial-intel" className="scroll-mt-24">
          <StatementCards
            columns={2}
            items={[
              {
                eyebrow: plainEyebrow('operational-intel'),
                title: byId('operational-intel').coda,
                body: byId('operational-intel').body[2],
              },
              {
                eyebrow: plainEyebrow('commercial-intel'),
                title: byId('commercial-intel').body[1],
                body: byId('commercial-intel').body[2],
              },
            ]}
          />
        </div>
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '34ch' }}
          >
            {byId('commercial-intel').coda}
          </p>
        </Reveal>
      </Act>

      <Breather image="/assets/lux/breather-thatch-beach.webp" darken={0.4} />

      {/* 07 · INTEGRATION & BOUNDARIES {#integrates} — one message: it fits
          without risk. One artifact: the four "nots", numbered. */}
      <Act
        no="07"
        label={c.acts.fit}
        id="integrates"
        statement={
          <>
            {c.whatItIsNot.close[0]} <Em>{c.whatItIsNot.close[1]}</Em>
          </>
        }
        deck={byId('integrates').body[0]}
      >
        <div id="what-it-is-not" className="scroll-mt-24">
          <NumberedList items={c.whatItIsNot.items.map((it) => ({ title: it.name, body: it.desc }))} />
        </div>
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '30ch' }}
          >
            {byId('integrates').coda}
          </p>
        </Reveal>
      </Act>

      {/* 08 · DEPLOYMENT & SCALE {#deploy} — one message: live in days,
          grows with the portfolio. One artifact: the stages, numbered. */}
      <Act
        no="08"
        label={c.acts.deploy}
        id="deploy"
        statement={byId('deploy').title}
        deck={byId('deploy').body[0]}
      >
        <NumberedList items={nounRun(byId('deploy').body[2]).map((title) => ({ title }))} />
        <div id="grow" className="scroll-mt-24">
          <Reveal>
            <p
              className="mt-12"
              style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
            >
              {byId('grow').body[0]}
            </p>
          </Reveal>
        </div>
      </Act>

      {/* CLOSING {#enterprise-final-cta} — warm media band, one action */}
      <MediaBed poster="/assets/img/company-reception.webp" scrim={0.72}>
        <section id="enterprise-final-cta" style={{ paddingBlock: 'clamp(120px, 18vw, 240px)' }}>
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
