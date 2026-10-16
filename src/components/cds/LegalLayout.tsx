'use client'

import type { ReactNode } from 'react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/i18n/LanguageContext'
import { stripLanguagePrefix } from '@/lib/i18n/paths'
import { ManageCookiesButton } from '@/components/CookieBanner'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import './signature-reading.css'

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
      ? <a className="sr-legal-email" href={`mailto:${part}`} key={`${part}-${index}`}>{part}</a>
      : part
  )
}

export function LegalLayout({ doc }: { doc: Localized<LegalDoc> }) {
  const { eyebrow, title, lastUpdated, intro, blocks } = useCopy(doc)
  const { lang } = useLang()
  const pathname = stripLanguagePrefix(usePathname())
  const contentsLabel = lang === 'es' ? 'En esta página' : 'On this page'
  const sections = blocks.flatMap((block, index) => block.type === 'h2' ? [{ text: block.text, id: `policy-section-${index}` }] : [])
  const sectionLinks = <ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.text}</a></li>)}</ol>
  const policies = [
    { href: '/trust', label: lang === 'es' ? 'Confianza' : 'Trust' },
    { href: '/security', label: lang === 'es' ? 'Seguridad' : 'Security' },
    { href: '/privacy', label: lang === 'es' ? 'Privacidad' : 'Privacy' },
    { href: '/responsible-ai', label: lang === 'es' ? 'IA responsable' : 'Responsible AI' },
    { href: '/terms', label: lang === 'es' ? 'Términos' : 'Terms' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/accessibility', label: lang === 'es' ? 'Accesibilidad' : 'Accessibility' },
  ]

  return (
    <div className="ed-page hc-signature-reading hc-signature-legal">
      <a className="sr-skip" href="#policy-content">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <SiteNav appearance="light" />

      <main id="policy-content">
      <article>
        <header className="sr-legal-hero">
          <div className="sr-container">
            <p className="sr-eyebrow">{eyebrow}</p>
            <div className="sr-legal-heading">
              <div><h1>{title}</h1>{lastUpdated && <p className="sr-legal-updated">{lastUpdated}</p>}</div>
              <div className="sr-legal-intro">
                {intro.map((line, index) => <p key={index}>{withEmailLinks(line)}</p>)}
              </div>
            </div>
            <nav className="sr-policy-nav" aria-label={lang === 'es' ? 'Políticas y confianza' : 'Trust and policies'}>{policies.map(policy => <Link key={policy.href} href={policy.href} aria-current={pathname === policy.href ? 'page' : undefined}>{policy.label}</Link>)}</nav>
          </div>
        </header>

        <div className="sr-reading-grid sr-container">
          <aside className="sr-reading-aside">
            <nav className="sr-desktop-index" aria-label={contentsLabel}><p className="sr-eyebrow">{contentsLabel}</p>{sectionLinks}</nav>
            <details className="sr-mobile-index"><summary>{contentsLabel}<ChevronDown size={17} aria-hidden="true" /></summary><nav aria-label={contentsLabel}>{sectionLinks}</nav></details>
          </aside>
          <div className="sr-legal-copy">
            {blocks.map((block, index) => {
              if (block.type === 'h2') {
                return <h2 id={`policy-section-${index}`} key={index}>{block.text}</h2>
              }
              if (block.type === 'term') {
                return <p className="sr-legal-term" key={index}><strong>{block.label}</strong><span aria-hidden="true"> — </span>{withEmailLinks(block.text)}</p>
              }
              if (block.type === 'link') {
                return (
                  <p key={index}>
                    {block.text && <>{withEmailLinks(block.text)} </>}
                    <Link className="sr-legal-link" href={block.href}>{block.label} <ArrowUpRight size={15} aria-hidden="true" /></Link>
                  </p>
                )
              }
              if (block.type === 'manage-cookies') {
                return <div className="sr-cookie-control" key={index}><ManageCookiesButton /></div>
              }
              return <p key={index}>{withEmailLinks(block.text)}</p>
            })}
          </div>
        </div>
      </article>
      </main>
      <SiteFooter />
    </div>
  )
}
