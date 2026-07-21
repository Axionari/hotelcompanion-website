'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PersistentCTA } from './PersistentCTA'
import { Section } from './Section'
import { RhythmStack } from './RhythmStack'
import { Lead } from './Prose'
import { Reveal } from './Reveal'
import { MultiAccentHeadline } from './AccentHeadline'
import { MediaBed } from './MediaBed'

export const primaryBtn = {
  background: 'var(--accent)',
  borderRadius: '8px',
  height: '52px',
  padding: '0 32px',
  fontSize: '16px',
  fontWeight: 600,
} as const

/** Shared marketing page chrome: nav, content, mobile CTA, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main>
      <SiteNav />
      {children}
      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}

/**
 * Page hero — first viewport, always rendered at full opacity (never revealed).
 */
export function PageHero({
  eyebrow,
  title,
  accents,
  poster,
  children,
}: {
  eyebrow?: string
  title: string
  /** Phrases to set in the display-serif italic (styling only — copy is verbatim). */
  accents?: string[]
  /** Optional photographic bed, per the RC hero treatment. */
  poster?: string
  children?: ReactNode
}) {
  const inner = (
    <section className="relative pt-16 md:pt-24 pb-16 md:pb-20">
      <div className="container-rc">
        {eyebrow && <div className="eyebrow eyebrow-accent mb-6">{eyebrow}</div>}
        <MultiAccentHeadline
          as="h1"
          className="heading-page text-balance"
          style={{ color: 'var(--text)', maxWidth: '17ch' }}
          text={title}
          accents={accents}
        />
        <div className="mt-8 flex flex-col items-start gap-4">{children}</div>
      </div>
    </section>
  )
  if (poster) {
    return (
      <MediaBed poster={poster} scrim={0.72}>
        {inner}
      </MediaBed>
    )
  }
  return <div style={{ background: 'var(--bg)' }}>{inner}</div>
}

/** Standard final-CTA section shared by every marketing page. */
export function FinalCta({
  eyebrow,
  title,
  body,
  beats,
  platform,
  cta,
  href = '/demo',
}: {
  eyebrow: string
  title: string
  body?: string
  beats?: ReadonlyArray<string>
  platform?: string
  cta: string
  href?: string
}) {
  return (
    <Section eyebrow={eyebrow} title={title} variant="surface-5">
      {body && (
        <div className="mt-6">
          <Lead>{body}</Lead>
        </div>
      )}
      {beats && (
        <div className="mt-8">
          <RhythmStack lines={beats} />
        </div>
      )}
      {platform && (
        <Reveal>
          <p
            className="font-serif italic mt-10"
            style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}
          >
            {platform}
          </p>
        </Reveal>
      )}
      <Reveal>
        <div className="mt-10">
          <Link
            href={href}
            className="btn-primary"
          >
            {cta}
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}
