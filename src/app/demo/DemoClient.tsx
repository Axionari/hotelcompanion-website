'use client'

import Image from 'next/image'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
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
            <span className={styles.formLabel}>{lang === 'es' ? 'UNA CONVERSACIÓN SOBRE TU HOTEL' : 'A CONVERSATION ABOUT YOUR HOTEL'}</span>
            <h2>{lang === 'es' ? 'Empecemos por ti.' : 'Let’s start with you.'}</h2>
            <p>{form.intro}</p>
            <DemoForm />
          </div>
          <div className={styles.context}>
            <figure className={styles.photograph}>
              <Image src="/assets/figma/2-4217-imgEditorialPhotograph.webp" alt={lang === 'es' ? 'Una suite abierta a una terraza con vista al mar' : 'A suite opening onto a terrace overlooking the sea'} fill sizes="(max-width:800px) calc(100vw - 48px), (max-width:1200px) 48vw, 640px" priority />
              <figcaption>{lang === 'es' ? 'Tu hotel. Tus huéspedes. Las posibilidades.' : 'Your hotel. Your guests. The possibilities.'}</figcaption>
            </figure>
            <div className={styles.calendar}><CalendarDays size={19} strokeWidth={1.4}/><div><span>{form.page.calendarLead}</span><a href={calendarUrl} target="_blank" rel="noopener noreferrer">{form.page.calendarLink}<ArrowUpRight size={15}/></a></div></div>
          </div>
        </section>
        <section className={styles.agenda} aria-label={form.page.agendaTitle}>
          <div className={styles.agendaInner}><header><p className={styles.eyebrow}>{lang === 'es' ? 'EN LA CONVERSACIÓN' : 'IN OUR CONVERSATION'}</p><h2>{form.page.agendaTitle}</h2><p className={styles.note}>{form.page.note}</p></header><ol>{form.page.agenda.map((item,index)=><li key={item}><span>0{index+1}</span><p>{item}</p></li>)}</ol></div>
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
