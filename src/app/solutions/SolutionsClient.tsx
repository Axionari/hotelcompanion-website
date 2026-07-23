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
  QuietChips,
  Handoff,
} from '@/components/v5/Editorial'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { solutionsCopy } from '@/lib/i18n/marketing/solutions'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'

/**
 * Solutions — RC-editorial grammar (Phase 5 rollout). This page still answers
 * exactly one question — "Who is it for?" — but now as numbered acts, each
 * carrying ONE message and ONE artifact:
 *
 *   HERO (statement, no device) · department chips
 *   01 THE DEPARTMENTS      — one shared intelligence      → numbered index
 *   02 MULTI-PROPERTY GROUPS — consistency + identity      → quiet chips
 *   03 LUXURY HOTELS        — recognized, at scale         → quiet chips
 *   04 RESORTS              — one seamless journey         → quiet chips
 *   05 BOUTIQUE HOTELS      — distinctly yours             → numbered claims
 *   06 BUSINESS HOTELS      — speed at any hour            → quiet chips
 *   07 ENTERPRISE GROUPS    — one platform, every hotel    → quiet chips
 *   HAND-OFF → /enterprise · CLOSING MEDIA BAND (one action)
 *
 * All reading copy is the approved solutions copy (solutionsCopy) — condensed
 * and re-presented, never rewritten. The footer deep-link ids (#luxury,
 * #boutique, #resorts, #business, #enterprise-groups, #multi-property) survive
 * as ids on the corresponding acts and MUST survive any future edit.
 */

/** Split a one-sentence-pair statement ("A. B.") into plain + italic halves. */
function splitStatement(title: string): { pre: string; hi: string } {
  const i = title.indexOf('. ')
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i + 1), hi: title.slice(i + 1) }
}

/** Approved noun-stack / clause lines ("A. B. C.") as their sentences. */
function sentences(line: string): string[] {
  return line
    .split('. ')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.endsWith('.') ? p : `${p}.`))
}

export default function SolutionsClient() {
  const c = useCopy(solutionsCopy)
  const g = useCopy(globalCopy)
  const demo = useCopy(liveDemoCopy)

  const heroTitle = splitStatement(c.hero.title)

  /** Footer deep-link segments by id — copy order never leaks into the acts. */
  const seg = (id: string) => c.segments.find((s) => s.id === id) ?? c.segments[0]
  const multi = seg('multi-property')
  const luxury = seg('luxury')
  const resorts = seg('resorts')
  const boutique = seg('boutique')
  const business = seg('business')
  const enterprise = seg('enterprise-groups')

  const multiTitle = splitStatement(multi.title)

  return (
    <main>
      <SiteNav />

      {/* HERO {#solutions-hero} — flat page bed, statement left, no device */}
      <div id="solutions-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.solutions}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body1}
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

      {/* Proof strip — the nine departments, quiet mono (approved eyebrows) */}
      <ChipStrip chips={c.departments.map((d) => d.eyebrow)} />

      {/* 01 · THE DEPARTMENTS {#solutions-departments} — one message: every
          department shares one intelligence. One artifact: the index. */}
      <Act
        no="01"
        label={c.acts.departments}
        id="solutions-departments"
        statement={c.departmentsTitle}
        deck={c.hero.body2}
      >
        <NumberedList
          items={c.departments.map((d) => ({
            title: d.eyebrow,
            body: `${d.title} ${d.body[d.body.length - 1]}`,
          }))}
        />
      </Act>

      <Breather id="band-solutions-lagoon" image="/assets/breathers/waterfall-lagoon.webp" />

      {/* 02 · MULTI-PROPERTY GROUPS {#multi-property} — one message: consistency
          without losing identity. One artifact: the portfolio chips. */}
      <Act
        no="02"
        label={multi.eyebrow}
        id="multi-property"
        statement={
          <>
            {multiTitle.pre} <Em>{multiTitle.hi}</Em>
          </>
        }
        deck={`${c.segmentsTitle} ${multi.body[0]}`}
      >
        <QuietChips items={sentences(multi.body[1])} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '26ch' }}
          >
            {multi.body[2]}
          </p>
        </Reveal>
      </Act>

      {/* 03 · LUXURY HOTELS {#luxury} — one message: guests feel recognized.
          One artifact: the white-glove chips. */}
      <Act no="03" label={luxury.eyebrow} id="luxury" statement={luxury.title} deck={luxury.body[0]}>
        <QuietChips items={sentences(luxury.body[2])} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.3, color: 'var(--cream, #F2EEE6)', maxWidth: '34ch' }}
          >
            {luxury.body[1]}
          </p>
        </Reveal>
      </Act>

      {/* 04 · RESORTS {#resorts} — one message: every amenity, one journey.
          One artifact: the amenity chips. */}
      <Act
        no="04"
        label={resorts.eyebrow}
        id="resorts"
        statement={resorts.title}
        deck={`${resorts.body[0]} ${resorts.body[1]}`}
      >
        <QuietChips items={sentences(resorts.body[2])} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
          >
            {resorts.body[3]}
          </p>
        </Reveal>
      </Act>

      <Breather image="/assets/breathers/beach-dusk-walk.webp" />

      {/* 05 · BOUTIQUE HOTELS {#boutique} — one message: personality survives
          scale. One artifact: the three claims, numbered. */}
      <Act
        no="05"
        label={boutique.eyebrow}
        id="boutique"
        statement={boutique.title}
        deck={`${boutique.body[0]} ${boutique.body[1]}`}
      >
        <NumberedList items={sentences(boutique.body[2]).map((title) => ({ title }))} />
      </Act>

      {/* 06 · BUSINESS HOTELS {#business} — one message: speed, at any hour.
          One artifact: the traveler chips. */}
      <Act
        no="06"
        label={business.eyebrow}
        id="business"
        statement={business.title}
        deck={`${business.body[0]} ${business.body[1]}`}
      >
        <QuietChips items={sentences(business.body[2])} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '26ch' }}
          >
            {business.body[3]}
          </p>
        </Reveal>
      </Act>

      {/* 07 · ENTERPRISE HOTEL GROUPS {#enterprise-groups} — one message: one
          platform behind every hotel. One artifact: the governance chips. */}
      <Act
        no="07"
        label={enterprise.eyebrow}
        id="enterprise-groups"
        statement={enterprise.title}
        deck={enterprise.body[0]}
      >
        <QuietChips items={sentences(enterprise.body[1])} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '28ch' }}
          >
            {enterprise.body[2]}
          </p>
        </Reveal>
      </Act>

      {/* HAND-OFF {#solutions-enterprise} — the shared-intelligence promise is
          named here, answered on /enterprise (RC hand-off, not a CTA). */}
      <div id="solutions-enterprise" className="scroll-mt-20">
        <Handoff statement={c.finalCta.body} href="/enterprise" label={g.nav.enterprise} />
      </div>

      {/* CLOSING {#solutions-final-cta} — warm media band, one action */}
      <MediaBed poster="/assets/img/lobby-modern.webp" scrim={0.72}>
        <section id="solutions-final-cta" style={{ paddingBlock: 'clamp(120px, 18vw, 240px)' }}>
          <div className="container-rc" style={{ textAlign: 'center' }}>
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-7">{c.acts.next}</div>
              <h2
                style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)' }}
              >
                {c.finalCta.title}
              </h2>
              <p
                style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--text-dim)', marginTop: 28, maxWidth: '40ch', marginInline: 'auto' }}
              >
                {c.finalCta.platform}
              </p>
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
