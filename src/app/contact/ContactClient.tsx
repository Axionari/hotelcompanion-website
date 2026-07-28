'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { SERIF, Em, PageHero, Act, NumberedList, Handoff } from '@/components/v5/Editorial'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { contactCopy } from '@/lib/i18n/marketing/contact'

/**
 * /contact — RC-editorial grammar (Phase 5 rollout). The RC "Pilot" analog:
 * one statement hero, then numbered acts — each ONE message and ONE artifact:
 *
 *   HERO (statement + one action)
 *   01 FOUNDING PARTNERS {#founding} — the program   → numbered benefits
 *                        (footer + Home deep-link here; CTA routes to /demo,
 *                        the site's single intake mechanism)
 *   02 GET IN TOUCH      — the channels              → quiet hairline rows
 *                        (mailtos kept) + HQ / scheduling as quiet lines
 *   HAND-OFF → /demo
 *
 * All reading copy is the approved contact copy (contactCopy) — condensed
 * and re-presented, never rewritten.
 */

/** Split a title into plain + italic halves around its (verbatim) em fragment. */
function splitEm(title: string, em: string): { pre: string; hi: string } {
  const i = em ? title.lastIndexOf(em) : -1
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i).trimEnd(), hi: title.slice(i) }
}

export default function ContactClient() {
  const c = useCopy(contactCopy)
  const g = useCopy(globalCopy)

  const heroTitle = splitEm(c.hero.title, c.hero.em)

  return (
    <main>
      <SiteNav />

      {/* HERO {#contact-hero} — flat page bed, one statement, one action */}
      <div id="contact-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={c.eyebrow}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body}
          actions={
            <Link href="/demo" className="btn-primary">
              {c.schedule.cta}
            </Link>
          }
        />
      </div>

      {/* 01 · FOUNDING PARTNERS {#founding} — deep-linked from Home and the
          footer. One artifact: the benefits, numbered. */}
      <Act
        no="01"
        label={c.acts.founding}
        id="founding"
        statement={c.founding.title}
        deck={c.founding.body}
      >
        <Reveal>
          <div className="eyebrow eyebrow-accent mb-2">{c.founding.receiveLead}</div>
        </Reveal>
        <NumberedList items={c.founding.items.map((item) => ({ title: item }))} />
        <Reveal>
          <p
            className="mt-12"
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '30ch' }}
          >
            {c.founding.close}
          </p>
          <div className="mt-8">
            {/* A2-2: founding CTAs across the site route here. This block is the
                destination, so its own action is the demo request — the site's
                single intake mechanism. */}
            <Link href="/demo" className="btn-primary">
              {c.founding.cta}
            </Link>
          </div>
        </Reveal>

        {/* THE PILOT INSTRUMENT {#founding-pilot} — the founding pilot on one
            page: four blank KPI cards (values are measured in the pilot, never
            invented), the two-column commitments, and the 90-day timeline. */}
        <Reveal>
          <div id="founding-pilot" className="scroll-mt-24 mt-20 pt-14" style={{ borderTop: '1px solid var(--border-soft)' }}>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'var(--text-dim)' }}>
              {c.pilot.framing}
            </p>
            <h3 className="mt-4" style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--text)', maxWidth: '20ch' }}>
              {c.pilot.title}
            </h3>
            <p className="mt-4" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '46ch' }}>
              {c.pilot.sub}
            </p>

            {/* Four blank KPI cards — dashed: the values do not exist yet */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.pilot.kpis.map((k) => (
                <div key={k.label} style={{ border: '1px dashed rgba(200,106,58,0.45)', borderRadius: 16, padding: 'clamp(18px, 2vw, 26px)', background: 'rgba(200,106,58,0.03)' }}>
                  <div aria-hidden style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 3vw, 40px)', lineHeight: 1, color: 'var(--text-faint)' }}>
                    —
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(11px, 1vw, 13px)', letterSpacing: '.04em', color: 'var(--accent)', marginLeft: 8 }}>{k.unit}</span>
                  </div>
                  <p className="mt-3" style={{ fontFamily: 'var(--font-sans), sans-serif', fontWeight: 600, fontSize: 14, lineHeight: 1.4, color: 'var(--text)' }}>
                    {k.label}
                  </p>
                  <p className="eyebrow mt-3" style={{ fontSize: 10, color: 'var(--text-faint)' }}>
                    {c.pilot.stamp}
                  </p>
                </div>
              ))}
            </div>

            {/* Two-column commitments */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[c.pilot.youBring, c.pilot.weBring].map((col) => (
                <div key={col.title} style={{ border: '1px solid var(--border-soft)', borderRadius: 16, padding: 'clamp(20px, 2.2vw, 30px)', background: 'var(--surface-1)' }}>
                  <div className="eyebrow eyebrow-accent mb-5">{col.title}</div>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-3" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-dim)' }}>
                        <span aria-hidden style={{ color: 'var(--accent)', fontSize: 12 }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Timeline strip — Week 0 · Day 45 · Day 90 */}
            <div className="mt-6" style={{ border: '1px solid var(--border-soft)', borderRadius: 16, overflow: 'hidden' }}>
              {c.pilot.timeline.map((t, i) => (
                <div key={t.marker} className="grid md:grid-cols-12 gap-x-8 gap-y-1 px-6 py-5 md:px-8 items-baseline" style={{ borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
                  <div className="md:col-span-2" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.08em', color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                    {t.marker}
                  </div>
                  <p className="md:col-span-10" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '68ch' }}>
                    {t.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/demo" className="btn-primary">
                {g.nav.bookDemo}
              </Link>
            </div>
          </div>
        </Reveal>
      </Act>

      {/* 02 · GET IN TOUCH {#contact-channels} — one message: how to reach us.
          One artifact: the channels, as quiet hairline rows. */}
      <Act no="02" label={c.acts.channels} id="contact-channels" statement={c.channelsTitle}>
        <div>
          {c.channels.map((ch, i) => (
            <Reveal key={ch.id} delay={Math.min(i, 4) * 60}>
              <div
                id={ch.id}
                className="scroll-mt-24 grid md:grid-cols-12 gap-x-10 gap-y-2 py-7 items-baseline"
                style={{ borderTop: '1px solid var(--border-soft)' }}
              >
                <div className="md:col-span-2 eyebrow" style={{ color: 'var(--accent)' }}>
                  {ch.eyebrow}
                </div>
                <div className="md:col-span-6">
                  <p style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(19px, 2vw, 25px)', lineHeight: 1.3, color: 'var(--text)' }}>
                    {ch.title}
                  </p>
                  <p className="mt-2" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '52ch' }}>
                    {ch.body}
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <p>
                    <a
                      href={`mailto:${ch.email}`}
                      className="font-sans transition-colors hover:text-[#D4784A]"
                      style={{ color: 'var(--accent)', fontSize: 15 }}
                    >
                      {ch.email}
                    </a>
                  </p>
                  {'cta' in ch && ch.cta && (
                    <p className="mt-2">
                      <Link href={ch.cta.href} className="eyebrow eyebrow-accent" style={{ fontSize: 12 }}>
                        {ch.cta.label}
                        <span aria-hidden="true" style={{ marginLeft: 10 }}>
                          →
                        </span>
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {/* headquarters + scheduling fold into the same act as quiet lines */}
        <Reveal>
          <div
            id="contact-hq"
            className="mt-2 scroll-mt-24 grid md:grid-cols-2 gap-x-10 gap-y-6 py-7 items-baseline"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            <div>
              <div className="eyebrow mb-3" style={{ color: 'var(--text-faint)' }}>
                {c.hq.title}
              </div>
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 15, lineHeight: 1.6, color: 'var(--text-dim)' }}>
                {c.hq.line}
              </p>
            </div>
            <div id="contact-schedule" className="scroll-mt-24">
              <div className="eyebrow mb-3" style={{ color: 'var(--text-faint)' }}>
                {c.schedule.title}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '44ch' }}>
                {c.schedule.body}
              </p>
            </div>
          </div>
        </Reveal>
      </Act>

      {/* HAND-OFF → /demo — a pointer, not a heavy CTA (RC) */}
      <Handoff statement={c.closing.title} href="/demo" label={g.nav.bookDemo} />

      <SiteFooter />
    </main>
  )
}
