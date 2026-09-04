'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialArticlePlate } from '@/components/editorial/EditorialImage'
import { Reveal } from './Reveal'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import { libraryChrome } from '@/lib/i18n/marketing/libraryChrome'
import { articleVisuals } from '@/lib/i18n/marketing/articleVisuals'
import type { EssayBlock, EssayMeta } from '@/lib/library'

export interface ArticleContent {
  essay: EssayMeta
  blocks: EssayBlock[]
  next: EssayMeta | null
  others: EssayMeta[]
}

export function ArticleLayout({ content }: { content: Localized<ArticleContent> }) {
  const { essay, blocks, next, others } = useCopy(content)
  const chrome = useCopy(libraryChrome)
  const visual = useCopy(articleVisuals[(essay.order - 1) % articleVisuals.length])

  return (
    <main className="ed-page ed-article">
      <SiteNav appearance="light" />

      <article id="article-template">
        <header className="ed-article-hero">
          <div className="ed-article-measure">
            <Link className="ed-article-back" href="/resources#library">← {chrome.allResources}</Link>
            <div className="ed-eyebrow">{chrome.eyebrow} · {essay.category}</div>
            <h1>{essay.title}</h1>
            <p className="ed-article-dek">{essay.subtitle}</p>
            <div className="ed-article-meta"><span>№ {String(essay.order).padStart(2, '0')}</span><span>{essay.readingTime}</span></div>
          </div>
        </header>

        <div className="ed-article-plate-shell">
          <EditorialArticlePlate visual={visual} />
        </div>

        <div className="ed-article-body">
          <div className="ed-article-measure">
            {blocks.map((block, index) => {
              if (block.type === 'gap') return <div className="ed-article-gap" key={index} />
              if (block.type === 'subhead') {
                return <Reveal key={index}><h2>{block.text}</h2></Reveal>
              }
              return <p key={index}>{block.text}</p>
            })}
          </div>
        </div>
      </article>

      <section className="ed-article-after">
        <div className="ed-article-measure">
          {next ? (
            <Link className="ed-next-story" href={`/resources/library/${next.slug}`}>
              <div className="ed-eyebrow">{chrome.nextArticle}</div>
              <span>№ {String(next.order).padStart(2, '0')}</span>
              <h2>{next.title}</h2>
              <p>{next.subtitle}</p>
              <b aria-hidden="true">→</b>
            </Link>
          ) : (
            <div className="ed-next-story ed-series-end">
              <div className="ed-eyebrow">{chrome.seriesEnd}</div>
              <h2>{chrome.seriesEndLine}</h2>
            </div>
          )}

          <div className="ed-more-stories">
            <div className="ed-eyebrow">{chrome.explore}</div>
            <ol>
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/resources/library/${other.slug}`}>
                    <span>{String(other.order).padStart(2, '0')}</span>
                    <strong>{other.title}</strong>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="ed-actions">
              <Link className="ed-button ed-button-dark" href="/resources">{chrome.allResources}</Link>
              <Link className="ed-button ed-button-primary" href="/demo">{chrome.cta}</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
