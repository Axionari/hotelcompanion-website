'use client'

import Image from 'next/image'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { DemoForm } from '@/components/cds/DemoForm'
import { buildCalendlyUrl } from '@/components/cds/CalendlyInline'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy } from '@/lib/i18n/useCopy'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'
import { globalCopy } from '@/lib/i18n/marketing/global'
import styles from './demo-experience.module.css'

export default function DemoClient() {
  const c = useCopy(demoCopy)
  const form = useCopy(demoFormCopy)
  const g = useCopy(globalCopy)
  const { lang } = useLang()
  const calendarUrl = buildCalendlyUrl({ name: '', email: '', company: '', title: '' }, lang)

  return (
    <div className={`hc-demo-page ${styles.page}`}>
      <a className="ed-skip-link" href="#main-content">{g.nav.skipToContent}</a>
      <SiteNav />
      <main id="main-content">
        <section className={styles.intro} id="form">
          <header className={styles.heading}>
            <p className={styles.eyebrow}>{form.page.eyebrow}</p>
            <div className={styles.headingGrid}>
              <h1>{form.page.title}</h1>
              <p className={styles.lead}>{form.page.body}</p>
            </div>
          </header>
          <div className={styles.formPanel}>
            <h2>{form.title}</h2>
            <p>{form.intro}</p>
            <DemoForm />
          </div>
          <div className={styles.context}>
            <div className={styles.photograph}>
              <Image src="/assets/editorial/hc-boutique-suite-blue-hour.webp" alt={lang === 'es' ? 'Una estancia para descubrir' : 'A stay worth discovering'} fill sizes="(max-width:800px) calc(100vw - 48px), (max-width:1200px) 48vw, 640px" />
            </div>
            <details className={styles.agenda} open>
              <summary>{form.page.agendaTitle}</summary>
              <ul>{form.page.agenda.map(item => <li key={item}>{item}</li>)}</ul>
            </details>
            <p className={styles.note}>{form.page.note}</p>
            <p className={styles.calendar}>{form.page.calendarLead}<br /><a href={calendarUrl} target="_blank" rel="noopener noreferrer">{form.page.calendarLink} <span aria-hidden="true">↗</span></a></p>
          </div>
        </section>
        <section className={styles.faq} id="faq">
          <div className={styles.faqInner}>
            <h2>{form.page.faq}</h2>
            <div className={styles.questions}>
              {c.faq.items.map(item => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
