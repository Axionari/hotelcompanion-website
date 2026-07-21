'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PersistentCTA } from './PersistentCTA'
import { Reveal } from './Reveal'
import { primaryBtn } from './PageShell'
import type { EssayBlock, EssayMeta } from '@/lib/library'

/**
 * The Library article template (#article-template).
 * ~680px measure, mono eyebrow "LIBRARY · {CATEGORY}", display-serif title,
 * italic dek, thin rule, one-line-per-beat body. No author byline
 * (institutional voice). Footer: Next Article card (or Epilogue for essay 12),
 * an Explore the Library strip, and a single Book a Demo CTA.
 */
export function ArticleLayout({
  essay,
  blocks,
  next,
  others,
}: {
  essay: EssayMeta
  blocks: EssayBlock[]
  next: EssayMeta | null
  others: EssayMeta[]
}) {
  return (
    <main>
      <SiteNav />

      <article>
        {/* Hero — first viewport, full opacity */}
        <header className="pt-16 md:pt-24 pb-10" style={{ background: 'var(--bg)' }}>
          <div className="mx-auto px-4 md:px-6" style={{ maxWidth: '760px' }}>
            <div className="eyebrow mb-6">LIBRARY · {essay.category.toUpperCase()}</div>
            <h1 className="heading-page font-serif font-normal text-balance" style={{ color: 'var(--text)' }}>
              {essay.title}
            </h1>
            <p
              className="font-serif italic mt-6"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', color: 'var(--text-secondary)' }}
            >
              {essay.subtitle}
            </p>
            <p className="font-sans mt-6" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {essay.readingTime}
            </p>
            <hr className="mt-10" style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
          </div>
        </header>

        {/* Body — verbatim, one line per beat */}
        <div className="pb-20" style={{ background: 'var(--bg)' }}>
          <div className="mx-auto px-4 md:px-6" style={{ maxWidth: '760px' }}>
            {blocks.map((b, i) => {
              if (b.type === 'gap') return <div key={i} style={{ height: '1.5rem' }} />
              if (b.type === 'subhead') {
                return (
                  <Reveal key={i}>
                    <h2
                      className="font-serif font-normal mt-14 mb-6"
                      style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', lineHeight: 1.2, color: 'var(--text)' }}
                    >
                      {b.text}
                    </h2>
                  </Reveal>
                )
              }
              return (
                <p
                  key={i}
                  className="font-sans"
                  style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}
                >
                  {b.text}
                </p>
              )
            })}
          </div>
        </div>
      </article>

      {/* Next Article (or Epilogue closure for essay 12) */}
      <section className="py-16 md:py-20" style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto px-4 md:px-6" style={{ maxWidth: '760px' }}>
          {next ? (
            <Reveal>
              <Link
                href={`/resources/library/${next.slug}`}
                className="block rounded-2xl p-6 md:p-8 transition-colors hover:border-[rgba(201,106,58,0.4)]"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="eyebrow mb-3">NEXT ARTICLE →</div>
                <div className="font-serif heading-card mb-2" style={{ color: 'var(--text)' }}>
                  {next.title}
                </div>
                <p className="font-serif italic" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                  {next.subtitle}
                </p>
              </Link>
            </Reveal>
          ) : (
            <Reveal>
              <div
                className="rounded-2xl p-6 md:p-8 text-center"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="eyebrow mb-3">END OF THE LIBRARY SERIES</div>
                <p className="font-serif" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}>
                  Every conversation leads somewhere.
                </p>
              </div>
            </Reveal>
          )}

          {/* Explore the Library strip */}
          <div className="mt-12">
            <div className="eyebrow mb-5">EXPLORE THE LIBRARY</div>
            <ul className="flex flex-col">
              {others.map((o) => (
                <li key={o.slug} style={{ borderBottom: '1px solid var(--border)' }}>
                  <Link
                    href={`/resources/library/${o.slug}`}
                    className="flex items-baseline gap-4 py-3.5 transition-colors hover:text-[#D4784A]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="eyebrow flex-shrink-0">{String(o.order).padStart(2, '0')}</span>
                    <span className="font-sans" style={{ fontSize: '15px' }}>
                      {o.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/resources"
              className="font-sans inline-block mt-6 text-sm transition-colors hover:text-[#D4784A]"
              style={{ color: 'var(--accent)', fontWeight: 500 }}
            >
              All resources →
            </Link>
          </div>

          {/* Single Book a Demo CTA */}
          <Reveal>
            <div className="mt-14 flex justify-center">
              <Link
                href="/demo"
                className="font-sans flex items-center justify-center text-white transition-colors hover:bg-[#D4784A]"
                style={primaryBtn}
              >
                Book a Demo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}
