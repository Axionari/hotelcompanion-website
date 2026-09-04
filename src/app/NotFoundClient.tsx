'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { useCopy } from '@/lib/i18n/useCopy'
import { notFoundCopy } from '@/lib/i18n/marketing/notFound'

export default function NotFoundClient() {
  const c = useCopy(notFoundCopy)

  return (
    <main className="ed-page ed-not-found">
      <SiteNav appearance="light" />
      <section className="ed-missing">
        <div className="ed-wrap">
          <div className="ed-missing-code" aria-hidden="true">{c.code}</div>
          <div className="ed-missing-copy">
            <div className="ed-eyebrow">{c.code} · HOTEL COMPANION</div>
            <h1>{c.title}</h1>
            <p>{c.body1} {c.body2}</p>
            <div className="ed-actions"><Link className="ed-button ed-button-primary" href="/">{c.cta}</Link></div>
          </div>
          <div className="ed-missing-links">
            {c.cards.map((card, index) => (
              <Link href={card.href} key={card.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h2>{card.title}</h2><p>{card.body}</p></div>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
