'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PersistentCTA } from './PersistentCTA'
import { Reveal } from './Reveal'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'term'; label: string; text: string }
  | { type: 'link'; label: string; href: string; text?: string }

export interface LegalDoc {
  eyebrow: string
  title: string
  lastUpdated?: string
  intro: string[]
  blocks: LegalBlock[]
}

/**
 * Legal / Trust document layout (brief §7): readable ~680px measure, same
 * warm-dark art direction, "Last Updated" stamp. Fully legible with motion off.
 */
export function LegalLayout({ doc }: { doc: Localized<LegalDoc> }) {
  const { eyebrow, title, lastUpdated, intro, blocks } = useCopy(doc)
  return (
    <main>
      <SiteNav />

      <article className="pt-16 md:pt-24 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="mx-auto px-4 md:px-6" style={{ maxWidth: '720px' }}>
          <div className="eyebrow mb-6">{eyebrow}</div>
          <h1 className="heading-page font-serif font-normal text-balance" style={{ color: 'var(--text)' }}>
            {title}
          </h1>
          {lastUpdated && (
            <p className="font-sans mt-5" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {lastUpdated}
            </p>
          )}
          {intro && (
            <div className="mt-8 flex flex-col gap-3">
              {intro.map((line, i) => (
                <p
                  key={i}
                  className="font-sans"
                  style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)' }}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
          <hr className="mt-10 mb-2" style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

          {blocks.map((b, i) => {
            if (b.type === 'h2') {
              return (
                <Reveal key={i}>
                  <h2
                    className="font-serif font-normal mt-12 mb-5"
                    style={{ fontSize: 'clamp(1.35rem, 3vw, 1.9rem)', lineHeight: 1.2, color: 'var(--text)' }}
                  >
                    {b.text}
                  </h2>
                </Reveal>
              )
            }
            if (b.type === 'term') {
              return (
                <p
                  key={i}
                  className="font-sans mb-4"
                  style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)' }}
                >
                  <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{b.label}</strong> — {b.text}
                </p>
              )
            }
            if (b.type === 'link') {
              return (
                <p key={i} className="font-sans mb-4" style={{ fontSize: '17px', lineHeight: 1.7 }}>
                  {b.text && <span style={{ color: 'var(--text-secondary)' }}>{b.text} </span>}
                  <Link
                    href={b.href}
                    className="transition-colors hover:text-[#D4784A]"
                    style={{ color: 'var(--accent)', fontWeight: 500 }}
                  >
                    {b.label} →
                  </Link>
                </p>
              )
            }
            return (
              <p
                key={i}
                className="font-sans mb-4"
                style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)' }}
              >
                {b.text}
              </p>
            )
          })}
        </div>
      </article>

      <PersistentCTA />
      <SiteFooter />
    </main>
  )
}
