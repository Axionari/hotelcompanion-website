'use client'

import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialArticlePlate } from '@/components/editorial/EditorialImage'
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import { libraryChrome } from '@/lib/i18n/marketing/libraryChrome'
import { articleVisuals } from '@/lib/i18n/marketing/articleVisuals'
import type { EssayBlock, EssayMeta } from '@/lib/library'
import './signature-reading.css'

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
  const { lang } = useLang()
  const contentsLabel = lang === 'es' ? 'En este artículo' : 'In this article'
  const sections = blocks.flatMap((block, index) => block.type === 'subhead' ? [{ text: block.text, id: `article-section-${index}` }] : [])
  const sectionLinks = <ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.text}</a></li>)}</ol>

  return (
    <div className="ed-page hc-signature-reading hc-signature-article">
      <a className="sr-skip" href="#article-template">{lang === 'es' ? 'Saltar al artículo' : 'Skip to article'}</a>
      <SiteNav appearance="light" />

      <main>
      <article id="article-template">
        <header className="sr-article-hero sr-container">
          <div className="sr-topline">
            <Link className="sr-back" href="/resources#library"><ArrowLeft size={15} aria-hidden="true" /> {chrome.allResources}</Link>
            <span className="sr-eyebrow">{chrome.eyebrow} / {String(essay.order).padStart(2, '0')}</span>
          </div>
          <div className="sr-article-heading">
            <div><p className="sr-eyebrow">{essay.category}</p><h1>{essay.title}</h1></div>
            <div className="sr-article-intro"><p>{essay.subtitle}</p><span>{essay.readingTime}</span></div>
          </div>
        </header>

        <div className="sr-article-image sr-container">
          <EditorialArticlePlate visual={visual} />
        </div>

        <div className="sr-reading-grid sr-container">
          <aside className="sr-reading-aside">
            <nav className="sr-desktop-index" aria-label={contentsLabel}><p className="sr-eyebrow">{contentsLabel}</p>{sectionLinks}</nav>
            <details className="sr-mobile-index"><summary>{contentsLabel}<ChevronDown size={17} aria-hidden="true" /></summary><nav aria-label={contentsLabel}>{sectionLinks}</nav></details>
          </aside>
          <div className="sr-article-copy">
            {blocks.map((block, index) => {
              if (block.type === 'gap') return <div className="sr-article-gap" key={index} />
              if (block.type === 'subhead') {
                return <h2 id={`article-section-${index}`} key={index}>{block.text}</h2>
              }
              return <p key={index}>{block.text}</p>
            })}
          </div>
        </div>
      </article>

      <section className="sr-article-after">
        <div className="sr-container">
          {next ? (
            <Link className="sr-next-story" href={`/resources/library/${next.slug}`}>
              <div className="sr-eyebrow">{chrome.nextArticle}<span>№ {String(next.order).padStart(2, '0')}</span></div>
              <div><h2>{next.title}</h2><p>{next.subtitle}</p></div>
              <ArrowUpRight size={28} aria-hidden="true" />
            </Link>
          ) : (
            <div className="sr-next-story sr-series-end">
              <div className="sr-eyebrow">{chrome.seriesEnd}</div>
              <h2>{chrome.seriesEndLine}</h2>
            </div>
          )}

          <div className="sr-more-stories">
            <div className="sr-eyebrow">{chrome.explore}</div>
            <ol>
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/resources/library/${other.slug}`}>
                    <span>{String(other.order).padStart(2, '0')}</span>
                    <strong>{other.title}</strong>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
            <div className="sr-actions">
              <Link className="sr-button sr-button-outline" href="/resources">{chrome.allResources}<ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link className="sr-button" href="/demo">{chrome.cta}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  )
}
