'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from './Reveal'
import { ManageCookiesButton } from '@/components/CookieBanner'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'term'; label: string; text: string }
  | { type: 'link'; label: string; href: string; text?: string }
  | { type: 'manage-cookies' }

export interface LegalDoc {
  eyebrow: string
  title: string
  lastUpdated?: string
  intro: string[]
  blocks: LegalBlock[]
}

function withEmailLinks(text: string): ReactNode {
  return text.split(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi).map((part, index) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)
      ? <a className="ed-legal-email" href={`mailto:${part}`} key={`${part}-${index}`}>{part}</a>
      : part
  )
}

export function LegalLayout({ doc }: { doc: Localized<LegalDoc> }) {
  const { eyebrow, title, lastUpdated, intro, blocks } = useCopy(doc)

  return (
    <main className="ed-page ed-legal">
      <SiteNav appearance="light" />

      <article>
        <header className="ed-legal-hero">
          <div className="ed-legal-wrap">
            <div>
              <div className="ed-eyebrow">{eyebrow}</div>
              <h1>{title}</h1>
              {lastUpdated && <p className="ed-legal-updated">{lastUpdated}</p>}
            </div>
            <div className="ed-legal-intro">
              {intro.map((line, index) => <p key={index}>{withEmailLinks(line)}</p>)}
            </div>
          </div>
        </header>

        <div className="ed-legal-body">
          <div className="ed-legal-measure">
            {blocks.map((block, index) => {
              if (block.type === 'h2') {
                return <Reveal key={index}><h2>{block.text}</h2></Reveal>
              }
              if (block.type === 'term') {
                return <p className="ed-legal-term" key={index}><strong>{block.label}</strong><span aria-hidden="true"> — </span>{withEmailLinks(block.text)}</p>
              }
              if (block.type === 'link') {
                return (
                  <p key={index}>
                    {block.text && <>{withEmailLinks(block.text)} </>}
                    <Link className="ed-legal-link" href={block.href}>{block.label} <span aria-hidden="true">→</span></Link>
                  </p>
                )
              }
              if (block.type === 'manage-cookies') {
                return <div className="ed-cookie-control" key={index}><ManageCookiesButton /></div>
              }
              return <p key={index}>{withEmailLinks(block.text)}</p>
            })}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
