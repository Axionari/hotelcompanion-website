'use client'

import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { useCopy } from '@/lib/i18n/useCopy'
import { notFoundCopy } from '@/lib/i18n/marketing/notFound'
import { globalCopy } from '@/lib/i18n/marketing/global'
import styles from './not-found-experience.module.css'

export default function NotFoundClient() {
  const c = useCopy(notFoundCopy)
  const g = useCopy(globalCopy)

  return (
    <div className={styles.page}>
      <a className="ed-skip-link" href="#main-content">{g.nav.skipToContent}</a>
      <SiteNav appearance="light" />
      <main id="main-content" className={styles.main}>
        <section className={styles.intro}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{c.code} · HOTEL COMPANION</p>
            <h1>{c.title}</h1>
            <p className={styles.body}>{c.body1} {c.body2}</p>
            <Link className={styles.button} href="/">{c.cta}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.photograph} aria-hidden="true">
            <Image src="/assets/editorial/hc-caribbean-arrival.webp" alt="" fill sizes="(max-width:800px) calc(100vw - 48px), 45vw" />
            <div className={styles.photoShade} />
            <span>{c.code}</span>
          </div>
        </section>
        <div className={styles.links}>
          {c.cards.map((card, index) => (
            <Link href={card.href} key={card.href}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{card.title}</h2><p>{card.body}</p></div>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
