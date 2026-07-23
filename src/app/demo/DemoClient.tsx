'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { Accordion } from '@/components/cds/blocks'
import { DemoForm } from '@/components/cds/DemoForm'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { LIVE_DEMO_ENABLED } from '@/lib/flags'
import { ArrowFlow } from '@/components/v5/Diagrams'
import {
  Em,
  PageHero,
  Act,
  NumberedList,
  QuietChips,
  Handoff,
} from '@/components/v5/Editorial'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'
import { contactCopy } from '@/lib/i18n/marketing/contact'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'

/**
 * /demo — RC-editorial grammar (Phase 5 rollout). The RC "Request a Demo"
 * analog: one editorial hero statement, then numbered acts — each ONE
 * message and ONE artifact:
 *
 *   HERO (statement, form anchor + live demo)
 *   01 THE SESSION       — what the meeting is        → numbered agenda + roles
 *   02 WHO SHOULD ATTEND — who the room is for        → QuietChips
 *   03 THE REQUEST       — the page's one job         → DemoForm {#form}
 *   04 DEPLOYMENT        — what happens after         → numbered stages
 *   05 FAQ {#faq}        — hesitation questions       → Accordion (site's only
 *                          FAQ; footer + /faq redirect link here, JSON-LD in
 *                          page.tsx reads the same demoCopy.faq.items)
 *   HAND-OFF → /contact
 *
 * All reading copy is the approved demo copy (demoCopy) — condensed and
 * re-presented, never rewritten.
 */

/** Split a title into plain + italic halves around its (verbatim) em fragment. */
function splitEm(title: string, em: string): { pre: string; hi: string } {
  const i = em ? title.lastIndexOf(em) : -1
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i).trimEnd(), hi: title.slice(i) }
}

export default function DemoClient() {
  const c = useCopy(demoCopy)
  const g = useCopy(globalCopy)
  const form = useCopy(demoFormCopy)
  const contact = useCopy(contactCopy)
  const home = useCopy(homeCopy)
  const demo = useCopy(liveDemoCopy)

  const heroTitle = splitEm(c.hero.title, c.hero.em)

  return (
    <main>
      <SiteNav />

      {/* HERO {#demo-hero} — flat page bed, one statement, two quiet actions */}
      <div id="demo-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.bookDemo}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body1}
          actions={
            <>
              <a href="#form" className="btn-primary">
                {c.hero.cta}
              </a>
              {LIVE_DEMO_ENABLED && (
                <button type="button" onClick={openLiveDemo} className="btn-secondary">
                  {demo.open}
                </button>
              )}
            </>
          }
        />
      </div>

      {/* 01 · THE SESSION {#demo-expect} — one message: what the meeting is.
          One artifact: the agenda, numbered. */}
      <Act
        no="01"
        label={c.acts.session}
        id="demo-expect"
        statement={c.expect.title}
        deck={c.experience.lead}
      >
        <NumberedList items={c.agenda.items} />
      </Act>

      {/* 02 · WHO SHOULD ATTEND {#demo-who} — one message: the room. One
          artifact: the roles, as quiet chips. */}
      <Act no="02" label={c.acts.who} id="demo-who" statement={c.who.lead} tight>
        <QuietChips items={c.who.roles} />
      </Act>

      {/* 03 · THE REQUEST {#form} — the page's one job. One artifact: the
          form itself (functionality untouched). */}
      <Act
        no="03"
        label={c.acts.request}
        id="form"
        statement={form.title}
        deck={form.intro}
      >
        <DemoForm />
        {/* the Founding Partner Program, as a quiet signal (Addendum 2) */}
        <Reveal>
          <p className="mt-10">
            <Link href="/contact#founding" className="eyebrow eyebrow-accent" style={{ fontSize: 13 }}>
              {home.foundingCta}
              <span aria-hidden="true" style={{ marginLeft: 12 }}>
                →
              </span>
            </Link>
          </p>
        </Reveal>
      </Act>

      {/* 04 · DEPLOYMENT {#demo-deployment} — one message: what happens after
          you submit. One artifact: the stages, numbered. */}
      <Act no="04" label={c.acts.deployment} id="demo-deployment" statement={c.deployment.title}>
        <ArrowFlow steps={c.deployment.stages.map((s) => ({ title: s.title, sub: s.body }))} />
      </Act>

      {/* 05 · FAQ {#faq} — the site's ONLY FAQ: hesitation questions at the
          point of conversion. Footer-linked (/demo#faq); Accordion kept. */}
      <Act no="05" label={c.acts.faq} id="faq" statement={c.faq.title}>
        <Accordion items={c.faq.items} />
      </Act>

      {/* HAND-OFF → /contact — a pointer, not a heavy CTA (RC) */}
      <Handoff statement={contact.hero.coda} href="/contact" label={contact.closing.cta} />

      <SiteFooter />
    </main>
  )
}
