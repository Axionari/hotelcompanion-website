'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { MediaBed } from '@/components/cds/MediaBed'
import { Breather } from '@/components/cds/Breather'
import { CompanionTablet } from '@/components/v5/CompanionTablet'
import { SuiteShowcase } from '@/components/v5/SuiteShowcase'
import { QuestionMarquee } from '@/components/cds/QuestionMarquee'
import { IntelligentLayer } from '@/components/v5/IntelligentLayer'
import { AxionariMark } from '@/components/cds/EndorsementMark'
import { openLiveDemo } from '@/components/cds/LiveDemoModal'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { ReactNode } from 'react'

/**
 * Home — Restaurant Companion editorial grammar applied to Hotel Companion
 * (PRODUCT_ARCHITECTURE §1–§8, Phase 5). Left-aligned hero with the in-room
 * tablet as the device (no centered layout, no ask-bar); the seven-act story
 * re-presented as calm statement sections that alternate copy-led / visual-led,
 * separated by photographic breather strips for air, and closed on a full-bleed
 * image band + footer image. All reading copy is the approved seven-act deck
 * (v4Copy) — re-presented, never rewritten. World-class photography in
 * /assets/lux is swap-ready (see lux/CREDITS.md).
 */

const SERIF = "var(--font-serif), Georgia, serif"

/** Generous RC section rhythm (~140px), one page background, air over banding. */
function Band({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-20" style={{ paddingBlock: 'clamp(104px, 14vw, 190px)' }}>
      <div className="container-rc">{children}</div>
    </section>
  )
}

/** A statement + one dominant visual (RC's core section: one idea, one anchor). */
function Split({
  eyebrow,
  statement,
  image,
  alt,
  reverse = false,
  id,
  children,
}: {
  eyebrow?: string
  statement: ReactNode
  image: string
  alt: string
  reverse?: boolean
  id?: string
  children?: ReactNode
}) {
  return (
    <Band id={id}>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
          <Reveal>
            {eyebrow && <div className="eyebrow eyebrow-accent mb-6">{eyebrow}</div>}
            <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--text)', maxWidth: '20ch' }}>
              {statement}
            </h2>
            {children && <div className="mt-8">{children}</div>}
          </Reveal>
        </div>
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-1' : ''}`}>
          <Reveal>
            <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border-soft)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={alt} src={image} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block' }} className="lg:!aspect-[4/5]" />
            </div>
          </Reveal>
        </div>
      </div>
    </Band>
  )
}

export default function HomeClient() {
  const c = useCopy(v4Copy)
  const g = useCopy(globalCopy)
  const demo = useCopy(liveDemoCopy)
  const home = useCopy(homeCopy)

  const italic = (t: string) => <em style={{ fontStyle: 'italic', fontWeight: 480, color: 'var(--cream, #F2EEE6)' }}>{t}</em>

  return (
    <main>
      <SiteNav />

      {/* HERO — left text, in-room tablet right, over the ocean-pool still.
          RC composition: not centered, no ask-bar. */}
      <MediaBed poster="/assets/lux/hero-ocean-pool.webp" scrim={0.64} priority>
        <section className="relative" style={{ minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', paddingBlock: 'clamp(64px, 9vw, 120px)' }}>
          <div className="container-rc w-full">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <h1 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)', maxWidth: '15ch' }}>
                  {c.actI.h1Line1}{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 480, color: 'var(--cream, #F2EEE6)' }}>{c.actI.h1Line2}</em>
                </h1>
                <p className="body-lead mt-7" style={{ maxWidth: '42ch' }}>{home.heroLead}</p>
                <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/demo" className="btn-primary">{g.nav.bookDemo}</Link>
                  <button type="button" onClick={openLiveDemo} className="btn-secondary">{demo.open}</button>
                </div>
                <div className="mt-9"><AxionariMark /></div>
              </div>
              <div className="lg:col-span-7">
                <Reveal>
                  <CompanionTablet />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* Proof strip — hairline, small caps (RC's quiet trust row) */}
      <div style={{ background: 'var(--surface-1)', borderBlock: '1px solid var(--border-soft)' }}>
        <div className="container-rc py-6">
          <p className="eyebrow">{c.actI.proof}</p>
        </div>
      </div>

      {/* STAKES — copy-led, calm, generous air (numbers-as-art, RC restraint) */}
      <Band id="stakes">
        <div className="eyebrow eyebrow-accent mb-10">{c.actII.eyebrow}</div>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          <Reveal>
            <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(64px, 12vw, 150px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text)' }}>{c.actII.figure1}</div>
            <p style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.3, color: 'var(--text)', marginTop: 20, maxWidth: '20ch' }}>{c.actII.line1}</p>
            <p className="eyebrow mt-5" style={{ color: 'var(--text-faint)' }}>{c.actII.source1}</p>
          </Reveal>
          <Reveal delay={140}>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 'clamp(64px, 12vw, 150px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--cream, #F2EEE6)', textShadow: '0 0 60px rgba(231,206,134,.22)' }}>{c.actII.figure2}</div>
            <p style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.3, color: 'var(--text)', marginTop: 20, maxWidth: '22ch' }}>{c.actII.line2}</p>
            <p className="eyebrow mt-5" style={{ color: 'var(--text-faint)' }}>{c.actII.source2}</p>
          </Reveal>
        </div>
      </Band>

      {/* Breather — air, photographic (RC image strip) */}
      <Breather image="/assets/lux/breather-daybeds-hills.webp" height="clamp(260px, 42vh, 460px)" darken={0.42} />

      {/* ONE DAY — text-only editorial: the question (serif lead) resolves into
          the close (complementary coda). No image; the type carries it. */}
      {(() => {
        const parts = c.actIII.statementPre.split('. ').map((x) => x.trim()).filter(Boolean)
        const lead = parts[0] ? `${parts[0]}.` : c.actIII.statementPre
        const resolution = parts.length > 1 ? `${parts.slice(1).join('. ')}.` : ''
        return (
          <Band id="one-day">
            <Reveal className="grid lg:grid-cols-12 gap-x-16 gap-y-10 items-start">
              <div className="lg:col-span-7">
                <div className="eyebrow eyebrow-accent mb-7">{c.actIII.eyebrow}</div>
                <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.015em', color: 'var(--text)', maxWidth: '15ch' }}>
                  {lead}
                </h2>
              </div>
              <div className="lg:col-span-5 lg:pt-24">
                <div style={{ width: 44, height: 2, background: 'var(--accent)', marginBottom: 24 }} />
                {resolution && (
                  <p style={{ fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif', fontSize: 'clamp(16px, 1.7vw, 21px)', lineHeight: 1.5, color: 'var(--text-dim, rgba(242,233,220,0.62))', maxWidth: '30ch' }}>
                    {resolution}
                  </p>
                )}
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 480, fontSize: 'clamp(26px, 3vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--cream, #F2EEE6)', marginTop: 18, maxWidth: '16ch' }}>
                  {c.actIII.statementHi}
                </p>
              </div>
            </Reveal>
          </Band>
        )
      })()}

      {/* THE QUESTIONS — the signature scrolling marquee of real guest
          questions (rescued from the original homepage). Sets up the tablet
          showcase: these are the questions; every answer is a picture. */}
      <Band id="guest-questions">
        <Reveal className="text-center mb-12">
          <div className="eyebrow eyebrow-accent mb-6">{home.marquee.eyebrow}</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--text)', maxWidth: '18ch', marginInline: 'auto' }}>
            {home.marquee.statement}
          </h2>
        </Reveal>
      </Band>
      <QuestionMarquee />

      {/* THE IN-ROOM COMPANION — a big, near-full-width tablet that animates
          between the accommodations options (3 cards) and one suite opened in
          detail (RC "browse → open" logic). The answer IS a picture. */}
      <section id="tablet-showcase" className="scroll-mt-20" style={{ paddingBlock: 'clamp(104px, 14vw, 190px)' }}>
        <div className="container-rc">
          <Reveal className="text-center">
            <div className="eyebrow eyebrow-accent mb-6">{home.tabletShowcase.eyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.015em', color: 'var(--text)', maxWidth: '20ch', marginInline: 'auto' }}>
              {home.tabletShowcase.statement}
            </h2>
            <p className="body-lead mt-6" style={{ maxWidth: '52ch', marginInline: 'auto' }}>{home.tabletShowcase.caption}</p>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <div style={{ width: 'min(910px, 92vw)', marginInline: 'auto' }}>
            <SuiteShowcase />
          </div>
        </Reveal>
      </section>

      {/* Breather — air */}
      <Breather image="/assets/lux/breather-thatch-beach.webp" height="clamp(260px, 42vh, 460px)" darken={0.4} />

      {/* THE OPERATING MODEL — guest → one intelligent layer → the hotel's systems */}
      <IntelligentLayer />

      {/* THE OPERATIONS FEED — execution as intelligence, in a prominent live
          terminal: every routed conversation, its revenue, its resolution. */}
      <Band id="receipt">
        <Reveal className="max-w-3xl mb-12">
          <div className="eyebrow eyebrow-accent mb-6">{c.actV.eyebrow}</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--text)', maxWidth: '22ch' }}>
            {c.actV.statementPre}{italic(c.actV.statementHi)}{c.actV.statementPost}
          </h2>
          <p className="body-lead mt-7" style={{ maxWidth: '52ch' }}>
            {c.actV.footerPre}{italic(c.actV.footerHi)}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div data-device-ui="" className="v5-card" style={{ maxWidth: 940, marginInline: 'auto', overflow: 'hidden', boxShadow: '0 1px 0 rgba(247,242,234,0.04) inset, 0 40px 80px -46px rgba(0,0,0,0.9), 0 0 90px -50px rgba(200,106,58,0.5)' }}>
            {/* terminal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 'clamp(16px,1.8vw,22px) clamp(20px,2.4vw,30px)', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <span className="v5-live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#2D9E6B' }} />
                <span className="eyebrow" style={{ color: 'var(--text-faint)' }}>{c.actV.liveLabel}</span>
              </span>
              <span style={{ textAlign: 'right' }}>
                <span className="eyebrow" style={{ color: 'var(--text-faint)', display: 'block', fontSize: 10 }}>{c.actV.capturedLabel}</span>
                <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px,2.2vw,30px)', color: '#2D9E6B', lineHeight: 1.1 }}>{c.actV.captured}</span>
              </span>
            </div>
            {/* rows */}
            {c.actV.rows.map((r, i) => {
              const isRevenue = r.revenue.startsWith('+')
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(12px,1.6vw,24px)', padding: 'clamp(15px,1.7vw,21px) clamp(20px,2.4vw,30px)', borderBottom: i < c.actV.rows.length - 1 ? '1px solid rgba(243,236,226,0.06)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(11px,1.05vw,13.5px)', letterSpacing: '.04em', color: 'var(--accent)', minWidth: 0 }}>
                    {r.route}<span style={{ color: 'var(--text)' }}>{r.item}</span><span style={{ color: 'var(--text-faint)' }}>{r.tail}</span>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(10px,1.4vw,20px)', flexShrink: 0 }}>
                    <span
                      className="eyebrow"
                      style={{
                        fontSize: 11,
                        color: isRevenue ? '#2D9E6B' : 'var(--accent)',
                        border: `1px solid ${isRevenue ? 'rgba(45,158,107,0.32)' : 'rgba(200,106,58,0.32)'}`,
                        background: isRevenue ? 'rgba(45,158,107,0.08)' : 'rgba(200,106,58,0.06)',
                        borderRadius: 999,
                        padding: '5px 12px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.revenue}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 'clamp(10px,1vw,12.5px)', color: 'var(--text-faint)', minWidth: 44, textAlign: 'right' }}>{r.time}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </Reveal>
      </Band>

      {/* LIVE IN DAYS — ease + trust chips (short, RC-brief) */}
      <Band id="live-in-days">
        <Reveal className="max-w-3xl">
          <div className="eyebrow eyebrow-accent mb-6">{c.actVI.eyebrow}</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.06, letterSpacing: '-0.015em', color: 'var(--text)' }}>
            {c.actVI.statementPre}{italic(c.actVI.statementHi)}
          </h2>
          <p className="body-lead mt-7" style={{ maxWidth: '48ch' }}>{c.actVI.line}</p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {c.actVI.chips.map((chip) => (
              <span key={chip} className="eyebrow" style={{ border: '1px solid var(--chip-border, rgba(201,139,78,.3))', borderRadius: 999, padding: '10px 18px', color: 'var(--text-dim)' }}>{chip}</span>
            ))}
          </div>
        </Reveal>
      </Band>

      {/* CLOSING — full-bleed clifftop band, one action: Book a Demo */}
      <MediaBed poster="/assets/lux/band-clifftop-ocean.webp" scrim={0.62}>
        <section style={{ paddingBlock: 'clamp(120px, 18vw, 240px)' }}>
          <div className="container-rc" style={{ textAlign: 'center' }}>
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-7">{c.actVII.eyebrow}</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)' }}>
                {c.actVII.statementLine1}<br />{italic(c.actVII.statementLine2)}
              </h2>
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--text-dim)', marginTop: 28, maxWidth: '40ch', marginInline: 'auto' }}>{c.actVII.partnerLine}</p>
              <div className="mt-10 flex justify-center">
                <Link href="/demo" className="btn-primary">{g.nav.bookDemo}</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </MediaBed>

      <SiteFooter />
    </main>
  )
}
