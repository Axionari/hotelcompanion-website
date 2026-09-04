'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialCloseMedia, EditorialImageBreak } from '@/components/editorial/EditorialImage'
import { useCopy, type Localized } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { resourcesCopy } from '@/lib/i18n/marketing/resources'
import type { EssayMeta } from '@/lib/library'

export interface ResourcesContent {
  essays: EssayMeta[]
  categories: string[]
}

const editorial = {
  en: {
    heroEyebrow: 'The Hotel Companion Journal',
    title: 'Hospitality,',
    accent: 'read between the lines.',
    proof: ['GUEST EXPERIENCE', 'REVENUE GROWTH', 'HOTEL OPERATIONS', 'ARTIFICIAL INTELLIGENCE', 'VOICE', 'COMPANION OS'],
    featuredLabel: 'One idea to begin',
    featuredTitle: 'The guest no longer wants',
    featuredAccent: 'another interface.',
    libraryTitle: 'Twelve essays.',
    libraryAccent: 'One operating thesis.',
    libraryBody: 'A considered reading list for hotel leaders building more responsive, more profitable and more human properties.',
    issue: 'ISSUE',
    closeEyebrow: 'TURN THE THESIS INTO A PROPERTY',
    closeTitle: 'Bring us one stay.',
    closeAccent: 'We’ll map what the hotel could know.',
    closeBody: 'A working session for leaders ready to connect guest experience, operations and revenue.',
    visual: {
      dividerAlt: 'A handcrafted open-air Caribbean hotel terrace looking across the sea',
      dividerLabel: 'FIELD NOTE · HOSPITALITY IS FELT IN THE DETAILS',
      dividerCaption: 'The best technology leaves more room for the place itself.',
      closeAlt: 'A secluded reef-blue Caribbean cove with an intimate hotel hidden among palms',
      closeLabel: 'FROM THE JOURNAL · INTO THE HOTEL',
    },
  },
  es: {
    heroEyebrow: 'El Journal de Hotel Companion',
    title: 'Hospitalidad,',
    accent: 'leída entre líneas.',
    proof: ['EXPERIENCIA DEL HUÉSPED', 'CRECIMIENTO DE INGRESOS', 'OPERACIÓN HOTELERA', 'INTELIGENCIA ARTIFICIAL', 'VOZ', 'COMPANION OS'],
    featuredLabel: 'Una idea para comenzar',
    featuredTitle: 'El huésped ya no quiere',
    featuredAccent: 'otra interfaz.',
    libraryTitle: 'Doce ensayos.',
    libraryAccent: 'Una tesis operativa.',
    libraryBody: 'Una lectura considerada para líderes que construyen hoteles más receptivos, más rentables y más humanos.',
    issue: 'EDICIÓN',
    closeEyebrow: 'CONVIERTE LA TESIS EN UNA PROPIEDAD',
    closeTitle: 'Tráenos una estancia.',
    closeAccent: 'Mapearemos lo que el hotel podría saber.',
    closeBody: 'Una sesión de trabajo para líderes listos para conectar experiencia, operación e ingresos.',
    visual: {
      dividerAlt: 'Una terraza artesanal de hotel caribeño abierta hacia el mar',
      dividerLabel: 'NOTA DE CAMPO · LA HOSPITALIDAD SE SIENTE EN LOS DETALLES',
      dividerCaption: 'La mejor tecnología deja más espacio para el lugar mismo.',
      closeAlt: 'Una cala caribeña de arrecife azul con un hotel íntimo escondido entre palmeras',
      closeLabel: 'DEL JOURNAL · AL HOTEL',
    },
  },
}

export default function ResourcesClient({ content }: { content: Localized<ResourcesContent> }) {
  const c = useCopy(resourcesCopy)
  const g = useCopy(globalCopy)
  const { essays, categories } = useCopy(content)
  const e = useCopy(editorial)
  const [active, setActive] = useState<string | null>(null)

  const activeValid = active !== null && categories.includes(active)
  const visible = activeValid ? essays.filter((essay) => essay.category === active) : essays
  const featured = essays.find((essay) => essay.slug === c.featured.slug) ?? essays[0]

  return (
    <main className="ed-page ed-resources">
      <SiteNav appearance="light" />

      <header className="ed-hero" id="resources-hero">
        <div className="ed-wrap ed-hero-grid">
          <div className="ed-hero-copy">
            <div className="ed-eyebrow">{e.heroEyebrow}</div>
            <h1>{e.title}<br /><em>{e.accent}</em></h1>
            <p>{c.hero.body1}</p>
            <div className="ed-actions"><a className="ed-button ed-button-primary" href="#library">{c.acts.library}</a></div>
          </div>
          {featured && (
            <Link className="ed-journal-cover" href={`/resources/library/${featured.slug}`} aria-label={`${c.featured.cta}: ${featured.title}`}>
              <div className="ed-journal-cover-top"><span>HOTEL COMPANION</span><span>№ {String(featured.order).padStart(2, '0')}</span></div>
              <div className="ed-journal-cover-center">
                <small>{featured.category}</small>
                <h2>{featured.title}</h2>
                <p>{featured.subtitle}</p>
              </div>
              <div className="ed-journal-cover-bottom"><span>{featured.readingTime}</span><span>{c.featured.cta} →</span></div>
            </Link>
          )}
        </div>
      </header>

      <div className="ed-proof"><div className="ed-wrap">{e.proof.map((item) => <span key={item}>{item}</span>)}</div></div>

      <section className="ed-section ed-tone-sand" id="resources-featured">
        <div className="ed-wrap ed-feature-story">
          <div>
            <div className="ed-eyebrow">01 · {e.featuredLabel}</div>
            <h2>{e.featuredTitle}<br /><em>{e.featuredAccent}</em></h2>
          </div>
          <div className="ed-feature-story-copy">
            <blockquote>{c.featured.body1}</blockquote>
            <p>{c.featured.body2}</p>
            <Link className="ed-inline-link" href={`/resources/library/${c.featured.slug}`}>{c.featured.cta} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <EditorialImageBreak visual={{
        src: '/assets/editorial/hc-caribbean-lobby.webp',
        alt: e.visual.dividerAlt,
        eyebrow: e.visual.dividerLabel,
        caption: e.visual.dividerCaption,
        position: 'center 50%',
      }} />

      <section className="ed-section ed-tone-paper" id="library">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-eyebrow">02 · {c.acts.library}</div>
            <h2>{e.libraryTitle}<br /><em>{e.libraryAccent}</em></h2>
            <p>{e.libraryBody}</p>
          </div>
          <div className="ed-library" id="categories">
            <div className="ed-library-filter" aria-label={c.categories.title}>
              {[null, ...categories].map((category) => {
                const selected = category === null ? !activeValid : category === active
                return (
                  <button key={category ?? 'all'} type="button" aria-pressed={selected} onClick={() => setActive(category)}>
                    {category ?? c.categories.all}
                  </button>
                )
              })}
            </div>
            <ol className="ed-article-index">
              {visible.map((essay) => (
                <li key={essay.slug}>
                  <Link href={`/resources/library/${essay.slug}`}>
                    <span>{String(essay.order).padStart(2, '0')}</span>
                    <div><small>{essay.category}</small><h3>{essay.title}</h3><p>{essay.subtitle}</p></div>
                    <b>{essay.readingTime}<i aria-hidden="true">↗</i></b>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ed-close has-media ed-close--resources" id="resources-newsletter">
        <EditorialCloseMedia visual={{
          src: '/assets/editorial/hc-secluded-cove.webp',
          alt: e.visual.closeAlt,
          eyebrow: e.visual.closeLabel,
          position: 'center 58%',
          overlay: 'deep',
        }} />
        <div className="ed-wrap ed-close-grid">
          <div>
            <div className="ed-eyebrow">{e.closeEyebrow}</div>
            <h2>{e.closeTitle}<br /><em>{e.closeAccent}</em></h2>
          </div>
          <div className="ed-close-action">
            <p>{e.closeBody}</p>
            <div className="ed-actions"><Link className="ed-button ed-button-primary" href="/demo">{g.nav.bookDemo}</Link></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
