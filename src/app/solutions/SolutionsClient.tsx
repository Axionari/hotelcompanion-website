'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Teaser, CapabilityStrip } from '@/components/cds/Teaser'
import { Breather } from '@/components/cds/Breather'
import { Section } from '@/components/cds/Section'
import { Reveal } from '@/components/cds/Reveal'
import { EndorsementMark } from '@/components/cds/EndorsementMark'
import { PersistentCTA } from '@/components/cds/PersistentCTA'
import { MediaBed } from '@/components/cds/MediaBed'
import { MultiAccentHeadline } from '@/components/cds/AccentHeadline'
import { IconChipGrid, CapabilitySurface } from '@/components/cds/blocks'
import { COMPANION_OS_CAPABILITIES } from '@/lib/capabilities'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { solutionsCopy } from '@/lib/i18n/marketing/solutions'
import { accents } from '@/lib/i18n/marketing/accents'

/**
 * Solutions — composed to Restaurant Companion level (Level-Up plan §C).
 * The endless centred card stack is replaced by an interactive department
 * index (left rail swaps the right panel) and a hairline segment index.
 * Left-aligned throughout; the six segment ids are footer deep-link targets
 * (/solutions#luxury, #boutique, #resorts, #business, #enterprise-groups,
 * #multi-property) and must survive any future edit.
 */

type Block = { id: string; eyebrow: string; title: string; body: ReadonlyArray<string> }

/**
 * Several approved body lines are noun-stacks ("Wi-Fi. Parking. Maps. …").
 * Level-Up §D authorises rendering those as their strongest ten as chips —
 * the copy module is never edited, the slice happens here.
 */
const NOUN_STACK_MIN = 6

function nounStack(line: string): string[] | null {
  const parts = line
    .split('. ')
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length < NOUN_STACK_MIN) return null
  // A noun-stack has no clause longer than a few words.
  if (parts.some((p) => p.split(' ').length > 5)) return null
  return parts.slice(0, 10).map((p) => (p.endsWith('.') ? p : `${p}.`))
}

/** Body renderer shared by the department panel and the segment rows. */
function BlockBody({ body, columns = 2 }: { body: ReadonlyArray<string>; columns?: 2 | 3 }) {
  return (
    <div className="flex flex-col gap-6">
      {body.map((line, i) => {
        const chips = nounStack(line)
        if (chips) {
          return <IconChipGrid key={i} items={chips} columns={columns === 3 ? 3 : 2} />
        }
        return (
          <p key={i} className="body-lead" style={{ maxWidth: '58ch' }}>
            {line}
          </p>
        )
      })}
    </div>
  )
}

/**
 * Department index — left rail selects, right panel swaps.
 * Same interaction grammar as the platform voice-morph: aria-selected rows,
 * 44px targets, copper active border-left. Reduced motion swaps instantly;
 * with no JS the first department is the server-rendered panel.
 */
function DepartmentIndex({ departments }: { departments: ReadonlyArray<Block> }) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  function pick(i: number) {
    if (i === active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(i)
      return
    }
    setFading(true)
    window.setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 180)
  }

  const d = departments[active]

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-4">
        <div role="tablist" aria-label="Departments" className="flex flex-col">
          {departments.map((dep, i) => {
            const on = i === active
            return (
              <button
                key={dep.id}
                id={`solutions-${dep.id}`}
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
                className="scroll-mt-24 text-left py-4 transition-colors"
                style={{
                  borderTop: '1px solid var(--border-soft)',
                  borderLeft: `2px solid ${on ? 'var(--accent)' : 'transparent'}`,
                  paddingLeft: 16,
                  minHeight: 44,
                }}
              >
                <span
                  className="font-serif"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 530,
                    color: on ? 'var(--text)' : 'var(--text-dim)',
                  }}
                >
                  {dep.eyebrow}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="lg:col-span-8"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity var(--dur-slow) var(--ease-emphasis)' }}
      >
        <div className="eyebrow eyebrow-accent mb-5">{d.eyebrow}</div>
        <h3
          className="font-serif"
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
            fontWeight: 530,
            lineHeight: 1.15,
            color: 'var(--text)',
            maxWidth: '20ch',
          }}
        >
          {d.title}
        </h3>
        <div className="mt-8">
          <BlockBody body={d.body} columns={2} />
        </div>
      </div>
    </div>
  )
}

/** Segment index — ruled rows, not cards. The ids are footer deep-link targets. */
function SegmentIndex({ segments }: { segments: ReadonlyArray<Block> }) {
  return (
    <div>
      {segments.map((s, i) => (
        <Reveal key={s.id} delay={Math.min(i, 6) * 40}>
          <div
            id={s.id}
            className="scroll-mt-24 grid lg:grid-cols-12 gap-6 lg:gap-16 py-12"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            <div className="lg:col-span-4">
              <div className="eyebrow eyebrow-accent mb-4">{s.eyebrow}</div>
              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
                  fontWeight: 530,
                  lineHeight: 1.2,
                  color: 'var(--text)',
                  maxWidth: '18ch',
                }}
              >
                {s.title}
              </h3>
            </div>
            <div className="lg:col-span-8">
              <BlockBody body={s.body} columns={3} />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function SolutionsClient() {
  const c = useCopy(solutionsCopy)
  const g = useCopy(globalCopy)
  const a = useCopy(accents)

  return (
    <main>
      <SiteNav />

      {/* HERO {#solutions-hero} — over the lobby still, text left */}
      <MediaBed poster="/assets/img/luxury-lobby.webp" scrim={0.7}>
        <section id="solutions-hero" className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="container-rc">
            <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <MultiAccentHeadline
                  as="h1"
                  className="heading-hero"
                  style={{ color: 'var(--text)', maxWidth: '15ch' }}
                  text={c.hero.title}
                  accents={a.solutionsHero}
                />
                <p className="body-lead mt-8" style={{ maxWidth: '50ch' }}>
                  {c.hero.body1}
                </p>
                <p className="body-lead mt-5" style={{ maxWidth: '50ch' }}>
                  {c.hero.body2}
                </p>
                <div className="mt-10">
                  <Link href="/demo" className="btn-primary">
                    {c.finalCta.cta}
                  </Link>
                </div>
                <div className="mt-10">
                  <EndorsementMark variant="companion-os" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </MediaBed>

      {/* 01 · BY DEPARTMENT {#solutions-departments} — interactive index */}
      <Section
        id="solutions-departments"
        eyebrow={c.departmentsEyebrow}
        title={c.departmentsTitle}
        variant="surface-1"
      >
        <div className="mt-14">
          <DepartmentIndex departments={c.departments} />
        </div>
      </Section>

      {/* Photography moment — introduces the segment index */}
      <MediaBed poster="/assets/img/lobby-modern.webp" scrim={0.68}>
        <section className="py-24 md:py-32">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">{c.segmentsEyebrow}</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '20ch' }}>
                {c.segmentsTitle}
              </h2>
            </Reveal>
          </div>
        </section>
      </MediaBed>

      {/* 02 · BY PROPERTY TYPE {#multi-property} … {#enterprise-groups} — hairline index */}
      <Section id="solutions-segments" variant="bg">
        <SegmentIndex segments={c.segments} />
      </Section>

      {/* 03 · COMPANION OS {#solutions-companion-os} — capability surface */}
      <Breather image="/assets/breathers/beach-golden.webp" />

      <Section
        id="solutions-companion-os"
        eyebrow="03 · COMPANION OS"
        title={c.companionOs.title}
        support={c.companionOs.lead}
        variant="surface-2"
      >
        <div className="mt-14">
          <Teaser lines={[]} href="/companion-os" label={g.nav.companionOs}>
            <CapabilityStrip names={COMPANION_OS_CAPABILITIES.map((x) => x.name)} />
          </Teaser>
        </div>
        <Reveal>
          <p
            className="font-serif mt-14"
            style={{
              fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
              fontWeight: 530,
              color: 'var(--text)',
              maxWidth: '30ch',
            }}
          >
            {c.companionOs.close}
          </p>
          <div className="mt-10">
            <EndorsementMark variant="companion-os" />
          </div>
        </Reveal>
      </Section>

      {/* 04 · NEXT STEP {#solutions-final-cta} — warm media band */}
      <MediaBed video="hero-coastal-sunset" poster="/assets/img/hero-coastal-sunset-poster.webp" scrim={0.72}>
        <section id="solutions-final-cta" className="py-24 md:py-36">
          <div className="container-rc">
            <Reveal>
              <div className="eyebrow eyebrow-accent mb-5">04 · NEXT STEP</div>
              <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '18ch' }}>
                {c.finalCta.title}
              </h2>
              <p className="body-lead mt-8" style={{ maxWidth: '52ch' }}>
                {c.finalCta.body}
              </p>
            </Reveal>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
              {c.finalCta.beats.map((b) => (
                <Reveal key={b}>
                  <p className="font-sans py-3" style={{ fontSize: 15, color: 'var(--text-dim)' }}>
                    {b}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p
                className="font-serif mt-10"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 530, color: 'var(--text)' }}
              >
                {c.finalCta.platform}
              </p>
              <div className="mt-10">
                <Link href="/demo" className="btn-primary">
                  {c.finalCta.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </MediaBed>

      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}
