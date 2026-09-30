'use client'

import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialCloseMedia } from '@/components/editorial/EditorialImage'
import { useCopy } from '@/lib/i18n/useCopy'
import { contactCopy } from '@/lib/i18n/marketing/contact'
import { contactEditorialCopy } from '@/lib/i18n/marketing/contactEditorial'
import { globalCopy } from '@/lib/i18n/marketing/global'


export default function ContactClient() {
  const c = useCopy(contactCopy)
  const g = useCopy(globalCopy)
  const e = useCopy(contactEditorialCopy)

  return (
    <main className="ed-page ed-contact">
      <SiteNav appearance="light" />

      <header className="ed-hero" id="contact-hero">
        <div className="ed-wrap ed-hero-grid">
          <div className="ed-hero-copy">
            <div className="ed-eyebrow">{e.hero.eyebrow}</div>
            <h1>{e.hero.title}<br /><em>{e.hero.accent}</em></h1>
            <p>{e.hero.body}</p>
            <div className="ed-actions">
              <Link className="ed-button ed-button-primary" href="/demo">{c.founding.cta}</Link>
              <a className="ed-button ed-button-quiet" href="mailto:sales@axionari.com">sales@axionari.com</a>
            </div>
          </div>
          <aside className="ed-folio" aria-label={e.hero.folioLabel}>
            <div className="ed-folio-head"><span>{e.hero.folioLabel}</span><i aria-hidden="true" /></div>
            <h2>{e.hero.folioTitle}</h2>
            <dl>{e.hero.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <small>HOTEL COMPANION · FOUNDING PILOT</small>
          </aside>
        </div>
      </header>

      <div className="ed-proof"><div className="ed-wrap">{e.proof.map((item) => <span key={item}>{item}</span>)}</div></div>

      <section className="ed-section ed-tone-night" id="founding">
        <span id="founding-pilot" className="ed-anchor" aria-hidden="true" />
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">01 · {c.acts.founding}</div>
            <h2>{e.founding.title}<br /><em>{e.founding.accent}</em></h2>
            <p>{c.founding.body} {c.pilot.sub}</p>
          </div>
          <div className="ed-kpi-grid">
            {c.pilot.kpis.map((kpi, index) => (
              <article key={kpi.label}>
                <div><span>—</span><small>{kpi.unit}</small></div>
                <h3>{kpi.label}</h3>
                <p>{String(index + 1).padStart(2, '0')} · {c.pilot.stamp}</p>
              </article>
            ))}
          </div>
          <div className="ed-section-foot"><small>{c.founding.receiveLead} {c.founding.items.join(' · ')}</small></div>
        </div>
      </section>

      <section className="ed-section ed-tone-sand">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">02 · {e.commitmentsLabel}</div>
            <h2>{e.commitments.title}<br /><em>{e.commitments.accent}</em></h2>
            <p>{e.commitments.body}</p>
          </div>
          <div className="ed-commitments">
            {[c.pilot.youBring, c.pilot.weBring].map((column) => (
              <article key={column.title}>
                <div className="ed-eyebrow">{column.title}</div>
                <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ed-section ed-tone-cocoa">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">03 · {e.timelineLabel}</div>
            <h2>{e.timeline.title}<br /><em>{e.timeline.accent}</em></h2>
            <p>{e.timeline.body}</p>
          </div>
          <div className="ed-timeline">
            {c.pilot.timeline.map((moment, index) => (
              <article key={moment.marker}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{moment.marker}</h3>
                <p>{moment.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ed-section ed-tone-paper" id="contact-channels">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">04 · {c.acts.channels}</div>
            <h2>{e.contact.title}<br /><em>{e.contact.accent}</em></h2>
            <p>{e.contact.body}</p>
          </div>
          <div className="ed-ledger ed-contact-ledger">
            {c.channels.map((channel) => (
              <article id={channel.id} key={channel.id}>
                <span>{channel.eyebrow}</span>
                <h3>{channel.title}</h3>
                <div>
                  <p>{channel.body}</p>
                  <a className="ed-inline-link" href={`mailto:${channel.email}`}>{channel.email} <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
          <div className="ed-contact-notes">
            <div id="contact-hq"><span>{c.hq.title}</span><p>{c.hq.line}</p></div>
            <div id="contact-schedule"><span>{c.schedule.title}</span><p>{c.schedule.body}</p></div>
          </div>
        </div>
      </section>

      <section className="ed-close has-media ed-close--contact" id="contact-final-cta">
        <EditorialCloseMedia visual={{
          src: '/assets/lux/hotel-companion-hero-v2.webp',
          alt: e.closeVisual.alt,
          eyebrow: e.closeVisual.label,
          position: 'center 54%',
          overlay: 'deep',
        }} />
        <div className="ed-wrap ed-close-grid">
          <div>
            <div className="ed-eyebrow">{c.closing.title}</div>
            <h2>{c.hero.coda}<br /><em>{c.closing.body1}</em></h2>
          </div>
          <div className="ed-close-action">
            <p>{c.closing.body2}</p>
            <div className="ed-actions"><Link className="ed-button ed-button-primary" href="/demo">{g.nav.bookDemo}</Link></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
