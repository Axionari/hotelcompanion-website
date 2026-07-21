'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Section } from '@/components/cds/Section'
import { RhythmStack } from '@/components/cds/RhythmStack'
import { Reveal } from '@/components/cds/Reveal'
import { Lead, Coda } from '@/components/cds/Prose'
import { PageShell, PageHero, FinalCta } from '@/components/cds/PageShell'
import { MediaBed } from '@/components/cds/MediaBed'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import { resourcesCopy } from '@/lib/i18n/marketing/resources'
import type { EssayMeta } from '@/lib/library'

export interface ResourcesContent {
  essays: EssayMeta[]
  categories: string[]
}

export default function ResourcesClient({ content }: { content: Localized<ResourcesContent> }) {
  const c = useCopy(resourcesCopy)
  const { essays, categories } = useCopy(content)
  // null = "all"; stored language-agnostically so switching language keeps the filter valid
  const [active, setActive] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const activeValid = active !== null && categories.includes(active)
  const visible = activeValid ? essays.filter((e) => e.category === active) : essays

  return (
    <PageShell>
      {/* {#resources-hero} */}
      <PageHero title={c.hero.title}>
        <Lead reveal={false}>{c.hero.body1}</Lead>
        <Lead reveal={false}>{c.hero.body2}</Lead>
      </PageHero>

      {/* {#resources-featured} */}
      <Section eyebrow={c.featured.eyebrow} title={c.featured.title} variant="surface-1" center>
        <div className="mt-8 flex flex-col gap-4">
          <Lead tone="primary">{c.featured.body1}</Lead>
          <Lead>{c.featured.body2}</Lead>
        </div>
        <Reveal>
          <div className="mt-10">
            <Link href={`/resources/library/${c.featured.slug}`} className="btn-primary">
              {c.featured.cta} →
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* {#resources-library} — featured cards from the copy deck */}
      <Section id="library" eyebrow={c.library.eyebrow} title={c.library.title} center>
        <div className="mt-12 grid md:grid-cols-2 gap-5 text-left">
          {c.library.cards.map((card) => (
            <Reveal key={card.label}>
              <Link
                href={`/resources/library/${card.slug}`}
                className="block rounded-2xl p-6 md:p-7 h-full transition-colors hover:border-[rgba(201,106,58,0.4)]"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-serif mb-3" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', color: 'var(--text)' }}>
                  {card.label}
                </h3>
                <p className="font-sans leading-relaxed" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                  {card.dek}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* {#resources-categories} — filters over the full 12-essay library */}
      <Section id="categories" eyebrow={c.categories.eyebrow} title={c.categories.title} variant="surface-1" center>
        <Reveal>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {[null, ...categories].map((cat) => {
              const on = cat === null ? !activeValid : cat === active
              return (
                <button
                  key={cat ?? '__all'}
                  onClick={() => setActive(cat)}
                  aria-pressed={on}
                  className="font-sans rounded-full px-4 transition-colors"
                  style={{
                    background: on ? 'var(--accent)' : 'transparent',
                    border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                    color: on ? '#1a1207' : 'var(--text-dim)',
                    fontWeight: on ? 600 : 400,
                    fontSize: '14px',
                    minHeight: '44px',
                  }}
                >
                  {cat ?? c.categories.all}
                </button>
              )
            })}
          </div>
        </Reveal>

        {activeValid && c.categories.descriptions[active] && (
          <div className="mt-8">
            <Lead>{c.categories.descriptions[active]}</Lead>
          </div>
        )}

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((e, i) => (
            <li key={e.slug}>
              <Reveal delay={Math.min(i, 6) * 30}>
                <Link
                  href={`/resources/library/${e.slug}`}
                  className="group flex h-full flex-col rounded-2xl p-6 transition-colors"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border-soft)' }}
                >
                  <span className="eyebrow eyebrow-accent mb-4">
                    {String(e.order).padStart(2, '0')} · {e.category}
                  </span>
                  <span
                    className="font-serif mb-3"
                    style={{ fontSize: '1.25rem', fontWeight: 530, lineHeight: 1.2, color: 'var(--text)' }}
                  >
                    {e.title}
                  </span>
                  <span
                    className="font-serif italic flex-1"
                    style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-dim)' }}
                  >
                    {e.subtitle}
                  </span>
                  <span className="eyebrow mt-5">{e.readingTime}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* {#resources-faq} */}
      <Section id="faq" eyebrow={c.faq.eyebrow} title={c.faq.title} center>
        <div className="mt-6">
          <Lead>{c.faq.body}</Lead>
        </div>
        <Reveal>
          <p className="mt-8">
            <Link
              href="/demo#faq"
              className="font-sans text-sm transition-colors hover:text-[#D4784A]"
              style={{ color: 'var(--accent)', fontWeight: 500 }}
            >
              {c.faq.cta} →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* {#resources-updates} */}
      <Section id="updates" eyebrow={c.updates.eyebrow} title={c.updates.title} variant="surface-1" center>
        <div className="mt-6">
          <Lead>{c.updates.body}</Lead>
        </div>
        <div className="mt-8">
          <Lead tone="primary">{c.updates.lead}</Lead>
        </div>
        <div className="mt-6">
          <RhythmStack lines={c.updates.items} center />
        </div>
        <Reveal>
          <p className="eyebrow mt-10" style={{ color: 'var(--accent)' }}>
            {c.updates.status}
          </p>
        </Reveal>
      </Section>

      {/* {#resources-newsletter} */}
      <Section eyebrow={c.newsletter.eyebrow} title={c.newsletter.title} center>
        <div className="mt-8 flex flex-col gap-4">
          <Lead tone="primary">{c.newsletter.body1}</Lead>
          <Lead>{c.newsletter.body2}</Lead>
        </div>
        <Reveal>
          <div className="mt-10 max-w-md mx-auto">
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
      </Section>

      {/* {#resources-final-cta} */}
      <FinalCta
        eyebrow="07 · NEXT STEP"
        title={c.finalCta.title}
        body={c.finalCta.body}
        beats={[c.finalCta.subtitle]}
        cta={c.finalCta.cta}
      />
    </PageShell>
  )
}
