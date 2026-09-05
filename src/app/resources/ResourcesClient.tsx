'use client'

import { useState } from 'react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialCloseMedia } from '@/components/editorial/EditorialImage'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { resourcesCopy } from '@/lib/i18n/marketing/resources'
import type { EssayMeta } from '@/lib/library'

export interface ResourcesContent {
  essays: EssayMeta[]
  categories: string[]
}

const compactCopy = {
  en: {
    eyebrow: 'Resources for hotel leaders',
    title: 'A practical library.',
    accent: 'For better hotels.',
    body: 'Twelve concise essays on guest experience, direct revenue, hotel operations and the practical use of AI.',
    featured: 'Start here',
    browse: 'Browse the library',
    all: 'All essays',
    open: 'Read essay',
    count: '12 essays · 6 themes',
    closeEyebrow: 'FROM THE LIBRARY · INTO THE HOTEL',
    closeTitle: 'Bring us one stay.',
    closeAccent: 'We’ll map what the hotel could know.',
    closeBody: 'A working session for leaders ready to connect guest experience, operations and revenue.',
    closeAlt: 'A secluded reef-blue Caribbean cove with an intimate hotel hidden among palms',
  },
  es: {
    eyebrow: 'Recursos para líderes hoteleros',
    title: 'Una biblioteca práctica.',
    accent: 'Para mejores hoteles.',
    body: 'Doce ensayos concisos sobre experiencia del huésped, ingreso directo, operación hotelera y el uso práctico de la IA.',
    featured: 'Comienza aquí',
    browse: 'Explora la biblioteca',
    all: 'Todos los ensayos',
    open: 'Leer ensayo',
    count: '12 ensayos · 6 temas',
    closeEyebrow: 'DE LA BIBLIOTECA · AL HOTEL',
    closeTitle: 'Tráenos una estancia.',
    closeAccent: 'Mapearemos lo que el hotel podría saber.',
    closeBody: 'Una sesión de trabajo para líderes listos para conectar experiencia, operación e ingresos.',
    closeAlt: 'Una cala caribeña de arrecife azul con un hotel íntimo escondido entre palmeras',
  },
}

export default function ResourcesClient({ content }: { content: Localized<ResourcesContent> }) {
  const c = useCopy(resourcesCopy)
  const g = useCopy(globalCopy)
  const e = useCopy(compactCopy)
  const { essays, categories } = useCopy(content)
  const [active, setActive] = useState<string | null>(null)

  const activeValid = active !== null && categories.includes(active)
  const visible = activeValid ? essays.filter((essay) => essay.category === active) : essays
  const featured = essays.find((essay) => essay.slug === c.featured.slug) ?? essays[0]

  return (
    <div className="ed-page rl-page">
      <SiteNav appearance="light" />
      <main id="main-content">
        <header className="rl-hero" id="resources-hero">
          <div className="ed-wrap rl-hero-grid">
            <div className="rl-hero-copy">
              <div className="ed-eyebrow">{e.eyebrow}</div>
              <h1>{e.title}<br /><em>{e.accent}</em></h1>
              <p>{e.body}</p>
              <a className="ed-button ed-button-primary" href="#library">{e.browse}</a>
            </div>

            {featured ? (
              <Link className="rl-featured" href={`/resources/library/${featured.slug}`}>
                <span className="rl-featured-kicker">{e.featured} · {featured.category}</span>
                <span className="rl-featured-number">№ {String(featured.order).padStart(2, '0')}</span>
                <h2>{featured.title}</h2>
                <p>{featured.subtitle}</p>
                <span className="rl-featured-meta">{featured.readingTime}<b>{e.open} →</b></span>
              </Link>
            ) : null}
          </div>
        </header>

        <section className="rl-library" id="library" aria-labelledby="resources-library-title">
          <div className="ed-wrap">
            <div className="rl-library-head">
              <div>
                <div className="ed-eyebrow">01 · {c.acts.library}</div>
                <h2 id="resources-library-title">{e.browse}</h2>
              </div>
              <p>{e.count}</p>
            </div>

            <div className="rl-filters" id="categories" aria-label={c.categories.title}>
              {[null, ...categories].map((category) => {
                const selected = category === null ? !activeValid : category === active
                return (
                  <button
                    key={category ?? 'all'}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(category)}
                  >
                    {category ?? e.all}
                  </button>
                )
              })}
            </div>

            <ol className="rl-card-grid">
              {visible.map((essay) => (
                <li key={essay.slug}>
                  <Link href={`/resources/library/${essay.slug}`}>
                    <span className="rl-card-top">
                      <small>{String(essay.order).padStart(2, '0')} · {essay.category}</small>
                      <i aria-hidden="true">↗</i>
                    </span>
                    <h3>{essay.title}</h3>
                    <p>{essay.subtitle}</p>
                    <span className="rl-card-time">{essay.readingTime}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ed-close has-media rl-close" id="resources-newsletter">
          <EditorialCloseMedia visual={{
            src: '/assets/editorial/hc-secluded-cove.webp',
            alt: e.closeAlt,
            eyebrow: e.closeEyebrow,
            position: 'center 58%',
            overlay: 'deep',
          }} />
          <div className="ed-wrap rl-close-grid">
            <div>
              <div className="ed-eyebrow">{e.closeEyebrow}</div>
              <h2>{e.closeTitle}<br /><em>{e.closeAccent}</em></h2>
            </div>
            <div className="rl-close-action">
              <p>{e.closeBody}</p>
              <Link className="ed-button ed-button-primary" href="/demo">{g.nav.bookDemo}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
