'use client'

import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialCloseMedia } from '@/components/editorial/EditorialImage'
import { DemoForm } from '@/components/cds/DemoForm'
import { openLiveDemo } from '@/components/cds/liveDemoEvents'
import { LIVE_DEMO_ENABLED } from '@/lib/flags'
import { useCopy } from '@/lib/i18n/useCopy'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'
import { globalCopy } from '@/lib/i18n/marketing/global'

const editorial = {
  en: {
    hero: {
      eyebrow: 'A working session for hotel leaders',
      title: 'Show us your hotel.',
      accent: 'See what it remembers.',
      body: 'Bring one real stay, one recurring service gap and one revenue question. We’ll map the guest conversation all the way to action.',
      productDisclosure: 'Guided demonstration · Demo property · Illustrative rates',
      folioLabel: 'Your working session',
      folioTitle: 'Built around the property you actually run.',
      rows: [
        ['CONTEXT', 'Your hotel, systems and service model'],
        ['SCENARIO', 'A real guest journey'],
        ['PROOF', 'Live handoffs and outcomes'],
        ['NEXT', 'A practical deployment path'],
      ],
    },
    proof: ['YOUR PROPERTY', 'LIVE SCENARIOS', 'REAL HANDOFFS', 'A CLEAR NEXT STEP'],
    session: {
      title: 'Not a product tour.',
      accent: 'A working session.',
      body: 'We start with the way your property hosts today, then pressure-test Hotel Companion against the moments that matter most.',
    },
    room: {
      title: 'Bring the people who own',
      accent: 'the guest journey.',
      body: 'A small cross-functional room makes the session sharper. One person who knows daily operations is enough to begin.',
    },
    request: {
      eyebrow: '03 · REQUEST YOUR SESSION',
      title: 'Tell us where',
      accent: 'hospitality gets stuck.',
      note: 'Your request goes directly to the Hotel Companion team. No generic sales sequence.',
    },
    after: {
      title: 'From first conversation',
      accent: 'to a live property.',
      body: 'The path is staged around knowledge, team readiness and the systems that matter to your operation.',
    },
    faq: {
      title: 'The questions worth asking',
      accent: 'before you invite us in.',
    },
    close: {
      eyebrow: 'PREFER TO START SMALL?',
      title: 'One property.',
      accent: 'Ninety days. Four numbers.',
      body: 'The Founding Partner Program turns the first deployment into a measured operating proof.',
      link: 'See the founding pilot',
      imageAlt: 'An intimate Caribbean boutique hotel suite and private pool at blue hour',
      imageLabel: 'YOUR HOTEL · THE WORKING VIEW',
    },
  },
  es: {
    hero: {
      eyebrow: 'Una sesión de trabajo para líderes hoteleros',
      title: 'Muéstranos tu hotel.',
      accent: 'Mira lo que recuerda.',
      body: 'Trae una estancia real, una falla de servicio recurrente y una pregunta de ingresos. Mapearemos la conversación del huésped hasta la acción.',
      productDisclosure: 'Demostración guiada · Propiedad demo · Tarifas ilustrativas',
      folioLabel: 'Tu sesión de trabajo',
      folioTitle: 'Construida alrededor de la propiedad que realmente operas.',
      rows: [
        ['CONTEXTO', 'Tu hotel, sistemas y modelo de servicio'],
        ['ESCENARIO', 'Un viaje real del huésped'],
        ['PRUEBA', 'Relevos y resultados en vivo'],
        ['SIGUIENTE', 'Una ruta práctica de despliegue'],
      ],
    },
    proof: ['TU PROPIEDAD', 'ESCENARIOS EN VIVO', 'RELEVOS REALES', 'UN SIGUIENTE PASO CLARO'],
    session: {
      title: 'No es un recorrido de producto.',
      accent: 'Es una sesión de trabajo.',
      body: 'Comenzamos con la forma en que hoy recibe tu propiedad y ponemos a prueba Hotel Companion en los momentos que más importan.',
    },
    room: {
      title: 'Trae a quienes cuidan',
      accent: 'el viaje del huésped.',
      body: 'Un grupo pequeño y multidisciplinario hace la sesión más precisa. Para comenzar basta una persona que conozca la operación diaria.',
    },
    request: {
      eyebrow: '03 · SOLICITA TU SESIÓN',
      title: 'Cuéntanos dónde',
      accent: 'se atora la hospitalidad.',
      note: 'Tu solicitud llega directamente al equipo de Hotel Companion. Sin una secuencia genérica de ventas.',
    },
    after: {
      title: 'De la primera conversación',
      accent: 'a una propiedad en vivo.',
      body: 'La ruta avanza por etapas según el conocimiento, la preparación del equipo y los sistemas que importan a tu operación.',
    },
    faq: {
      title: 'Las preguntas que vale la pena hacer',
      accent: 'antes de invitarnos.',
    },
    close: {
      eyebrow: '¿PREFIERES COMENZAR EN PEQUEÑO?',
      title: 'Una propiedad.',
      accent: 'Noventa días. Cuatro números.',
      body: 'El Programa de Socios Fundadores convierte el primer despliegue en una prueba operativa medible.',
      link: 'Conoce el piloto fundador',
      imageAlt: 'Una suite íntima y alberca privada en un hotel boutique caribeño al anochecer',
      imageLabel: 'TU HOTEL · LA VISTA DE TRABAJO',
    },
  },
}

export default function DemoClient() {
  const c = useCopy(demoCopy)
  const form = useCopy(demoFormCopy)
  const g = useCopy(globalCopy)
  const e = useCopy(editorial)

  return (
    <div className="ed-page ed-demo">
      <a className="ed-skip-link" href="#main-content">{g.nav.skipToContent}</a>
      <SiteNav appearance="light" />

      <main id="main-content">
      <header className="ed-hero" id="demo-hero">
        <div className="ed-wrap ed-hero-grid">
          <div className="ed-hero-copy">
            <div className="ed-eyebrow">{e.hero.eyebrow}</div>
            <h1>{e.hero.title}<br /><em>{e.hero.accent}</em></h1>
            <p>{e.hero.body}</p>
            <div className="ed-actions">
              <a className="ed-button ed-button-primary" href="#form">{c.hero.cta}</a>
              {LIVE_DEMO_ENABLED && (
                <button className="ed-button ed-button-quiet" type="button" onClick={openLiveDemo}>{g.nav.see} Hotel Companion</button>
              )}
            </div>
          </div>
          <aside className="ed-session-dossier" aria-labelledby="demo-dossier-title">
            <div className="ed-session-dossier-head">
              <span>{e.hero.folioLabel}</span>
              <span aria-hidden="true">HC / 01</span>
            </div>
            <div className="ed-session-dossier-title">
              <span aria-hidden="true">01</span>
              <h2 id="demo-dossier-title">{e.hero.folioTitle}</h2>
            </div>
            <dl>
              {e.hero.rows.map(([label, value], index) => (
                <div key={label}>
                  <dt><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="ed-session-dossier-foot">
              <small>{e.hero.productDisclosure}</small>
              <span aria-hidden="true">01—04</span>
            </div>
          </aside>
        </div>
      </header>

      <div className="ed-proof"><div className="ed-wrap">{e.proof.map((item) => <span key={item}>{item}</span>)}</div></div>

      <section className="ed-section ed-tone-night" id="demo-why">
        <span id="demo-expect" className="ed-anchor" aria-hidden="true" />
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">01 · {c.acts.session}</div>
            <h2>{e.session.title}<br /><em>{e.session.accent}</em></h2>
            <p>{e.session.body}</p>
          </div>
          <ol className="ed-flow">
            {c.agenda.items.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-section ed-tone-paper" id="demo-who">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">02 · {c.acts.who}</div>
            <h2>{e.room.title}<br /><em>{e.room.accent}</em></h2>
            <p>{e.room.body}</p>
          </div>
          <div className="ed-role-cloud" aria-label={c.acts.who}>
            {c.who.roles.map((role) => <span key={role}>{role}</span>)}
          </div>
        </div>
      </section>

      <section className="ed-section ed-tone-sand ed-form-section" id="form">
        <div className="ed-wrap ed-form-grid">
          <div className="ed-section-head ed-form-heading">
            <div className="ed-eyebrow">{e.request.eyebrow}</div>
            <h2>{e.request.title}<br /><em>{e.request.accent}</em></h2>
            <p>{form.intro}</p>
            <small>{e.request.note}</small>
          </div>
          <div className="ed-form-card">
            <div className="ed-form-card-head">
              <span>{form.title}</span>
              <i aria-hidden="true" />
            </div>
            <DemoForm />
          </div>
        </div>
      </section>

      <section className="ed-section ed-tone-cocoa" id="demo-deployment">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">04 · {c.acts.deployment}</div>
            <h2>{e.after.title}<br /><em>{e.after.accent}</em></h2>
            <p>{e.after.body}</p>
          </div>
          <ol className="ed-flow">
            {c.deployment.stages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-section ed-tone-paper" id="faq">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">05 · {c.acts.faq}</div>
            <h2>{e.faq.title}<br /><em>{e.faq.accent}</em></h2>
          </div>
          <div className="ed-faq">
            {c.faq.items.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ed-close has-media ed-close--demo" id="demo-final-cta">
        <EditorialCloseMedia visual={{
          src: '/assets/editorial/hc-boutique-suite-blue-hour.webp',
          alt: e.close.imageAlt,
          eyebrow: e.close.imageLabel,
          position: 'center',
          overlay: 'soft',
        }} />
        <div className="ed-wrap ed-close-grid">
          <div>
            <div className="ed-eyebrow">{e.close.eyebrow}</div>
            <h2>{e.close.title}<br /><em>{e.close.accent}</em></h2>
          </div>
          <div className="ed-close-action">
            <p>{e.close.body}</p>
            <div className="ed-actions"><Link className="ed-button ed-button-dark" href="/contact#founding">{e.close.link}</Link></div>
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
