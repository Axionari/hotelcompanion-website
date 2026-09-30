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

export default function DemoClient() {
  const c = useCopy(demoCopy)
  const form = useCopy(demoFormCopy)
  const g = useCopy(globalCopy)
  const { lang } = useLang()
  const calendarUrl = buildCalendlyUrl({ name: '', email: '', company: '', title: '' }, lang)

  return (
    <div className="hc-demo-page">
      <a className="ed-skip-link" href="#main-content">{g.nav.skipToContent}</a>
      <SiteNav />
      <main id="main-content">
        <section className="hc-demo-intro" id="form">
          <div className="hc-demo-copy">
            <p className="hc-demo-kicker">{form.page.eyebrow}</p>
            <h1>{form.page.title}</h1>
            <p className="hc-demo-lead">{form.page.body}</p>
            <Image className="hc-demo-photo" src="/assets/editorial/hc-boutique-suite-blue-hour.webp" alt={lang === 'es' ? 'Una estancia para descubrir' : 'A stay worth discovering'} width={760} height={470} sizes="(max-width:800px) 90vw, 480px"/>
            <details><summary>{form.page.agendaTitle}</summary><ul>{form.page.agenda.map(item => <li key={item}>{item}</li>)}</ul></details>
            <p className="hc-demo-note">{form.page.note}</p>
            <p className="hc-demo-calendar">{form.page.calendarLead}<br /><a href={calendarUrl} target="_blank" rel="noopener noreferrer">{form.page.calendarLink} ↗</a></p>
          </div>
          <div className="hc-demo-card">
            <h2>{form.title}</h2>
            <p>{form.intro}</p>
            <DemoForm />
          </div>
        </section>
        <section className="hc-demo-faq" id="faq">
          <h2>{form.page.faq}</h2>
          <div>
            {c.faq.items.map(item => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
