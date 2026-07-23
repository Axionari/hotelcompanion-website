'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/cds/Reveal'
import { SERIF, Em, PageHero, Act, ArticleCards, Handoff } from '@/components/v5/Editorial'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { resourcesCopy } from '@/lib/i18n/marketing/resources'
import type { EssayMeta } from '@/lib/library'

/**
 * /resources — RC-editorial grammar (Phase 5 rollout). The RC "Library"
 * analog: an editorial index. One statement hero, then numbered acts —
 * each ONE message and ONE artifact:
 *
 *   HERO (statement)
 *   01 FEATURED    — the flagship essay          → one quiet pointer
 *   02 THE LIBRARY — the full index {#library}   → hairline essay rows with a
 *                    quiet mono-caps topic filter {#categories}
 *   03 NEWSLETTER  — stay ahead                  → the (working) signup form
 *   HAND-OFF → /demo
 *
 * Essays come from @/lib/library (untouched); all reading copy is the
 * approved resources copy (resourcesCopy) — condensed, never rewritten.
 */

export interface ResourcesContent {
  essays: EssayMeta[]
  categories: string[]
}

/** Split a title into plain + italic halves around its (verbatim) em fragment. */
function splitEm(title: string, em: string): { pre: string; hi: string } {
  const i = em ? title.lastIndexOf(em) : -1
  if (i === -1) return { pre: title, hi: '' }
  return { pre: title.slice(0, i).trimEnd(), hi: title.slice(i) }
}

export default function ResourcesClient({ content }: { content: Localized<ResourcesContent> }) {
  const c = useCopy(resourcesCopy)
  const g = useCopy(globalCopy)
  const { essays, categories } = useCopy(content)
  // null = "all"; stored language-agnostically so switching language keeps the filter valid
  const [active, setActive] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const activeValid = active !== null && categories.includes(active)
  const visible = activeValid ? essays.filter((e) => e.category === active) : essays

  const heroTitle = splitEm(c.hero.title, c.hero.em)

  return (
    <main>
      <SiteNav />

      {/* HERO {#resources-hero} — flat page bed, one statement */}
      <div id="resources-hero" className="scroll-mt-20">
        <PageHero
          eyebrow={g.nav.resources}
          title={
            <>
              {heroTitle.pre} <Em>{heroTitle.hi}</Em>
            </>
          }
          deck={c.hero.body1}
        />
      </div>

      {/* 01 · FEATURED {#resources-featured} — one message: the flagship
          essay. One artifact: a quiet pointer to it. */}
      <Act
        no="01"
        label={c.acts.featured}
        id="resources-featured"
        statement={c.featured.title}
        deck={c.featured.body1}
      >
        <Reveal>
          <p
            style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(20px, 2.2vw, 27px)', lineHeight: 1.35, color: 'var(--text)', maxWidth: '34ch' }}
          >
            {c.featured.body2}
          </p>
          <p className="mt-8">
            <Link href={`/resources/library/${c.featured.slug}`} className="eyebrow eyebrow-accent" style={{ fontSize: 13 }}>
              {c.featured.cta}
              <span aria-hidden="true" style={{ marginLeft: 12 }}>
                →
              </span>
            </Link>
          </p>
        </Reveal>
      </Act>

      {/* 02 · THE LIBRARY {#library} — footer-linked (/resources#library).
          One artifact: the index as hairline rows, with a quiet mono-caps
          topic filter {#categories}. */}
      <Act no="02" label={c.acts.library} id="library" statement={c.categories.title} deck={c.hero.body2}>
        <div id="categories" className="scroll-mt-24">
          <Reveal>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {[null, ...categories].map((cat) => {
                const on = cat === null ? !activeValid : cat === active
                return (
                  <button
                    key={cat ?? '__all'}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={on}
                    className="eyebrow transition-colors"
                    style={{ color: on ? 'var(--accent)' : 'var(--text-faint)', paddingBlock: 6 }}
                  >
                    {cat ?? c.categories.all}
                  </button>
                )
              })}
            </div>
          </Reveal>
          <div className="mt-12">
            <ArticleCards
              items={visible.map((e) => ({
                eyebrow: e.category,
                title: e.title,
                body: e.subtitle,
                meta: e.readingTime,
                href: `/resources/library/${e.slug}`,
              }))}
            />
          </div>
        </div>
      </Act>

      {/* 03 · NEWSLETTER {#resources-newsletter} — one message: stay ahead.
          One artifact: the (working) signup form. */}
      <Act
        no="03"
        label={c.acts.newsletter}
        id="resources-newsletter"
        statement={c.newsletter.title}
        deck={c.newsletter.body1 + ' ' + c.newsletter.body2}
        tight
      >
        <Reveal>
          <div style={{ maxWidth: 460 }}>
            {subscribed ? (
              <p className="font-sans" style={{ color: 'var(--green)' }} role="status">
                {c.newsletter.success}
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.includes('@')) setSubscribed(true)
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.newsletter.placeholder}
                  aria-label={c.newsletter.placeholder}
                  className="font-sans flex-1 px-4"
                  style={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    height: '48px',
                    color: 'var(--text)',
                    fontSize: '15px',
                  }}
                />
                <button
                  type="submit"
                  className="font-sans text-white transition-colors hover:bg-[#D4784A] px-6"
                  style={{ background: 'var(--accent)', borderRadius: '8px', height: '48px', fontWeight: 600, fontSize: '15px' }}
                >
                  {c.newsletter.cta}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Act>

      {/* HAND-OFF → /demo — a pointer, not a heavy CTA (RC) */}
      <Handoff statement={g.footer.brand.headline} href="/demo" label={g.nav.bookDemo} />

      <SiteFooter />
    </main>
  )
}
