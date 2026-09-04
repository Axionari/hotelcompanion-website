'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import styles from './WhiteLabelHotels.module.css'

type HotelBrand = {
  id: 'marazul' | 'lumbre' | 'sombra'
  tab: string
  name: string
  location: string
  guest: { en: string; es: string }
  image: string
  alt: { en: string; es: string }
  scene: { en: string; es: string }
  headline: { en: string; es: string }
  question: { en: string; es: string }
  answer: { en: string; es: string }
  mobileAnswer: { en: string; es: string }
  signal: { en: string; es: string }
  action: { en: string; es: string }
  confirmed: { en: string; es: string }
  palette: CSSProperties
}

const BRANDS: HotelBrand[] = [
  {
    id: 'marazul',
    tab: 'MarAzul',
    name: 'MARAZUL',
    location: 'Riviera Maya',
    guest: { en: 'MAYA · SUITE 214', es: 'MAYA · SUITE 214' },
    image: '/assets/lux/hotel-companion-hero-v2.webp',
    alt: {
      en: 'An oceanfront limestone suite and infinity pool at MarAzul Riviera Maya',
      es: 'Una suite de piedra caliza y alberca infinita frente al mar en MarAzul Riviera Maya',
    },
    scene: { en: 'CARIBBEAN · PRIVATE COAST', es: 'CARIBE · COSTA PRIVADA' },
    headline: { en: 'The Caribbean, with a point of view.', es: 'El Caribe, con un punto de vista.' },
    question: {
      en: 'We have one free afternoon. What would you choose?',
      es: 'Tenemos una tarde libre. ¿Qué elegirías?',
    },
    answer: {
      en: 'I’d make Cenote Dos Ojos the center of the day. I can arrange the driver, towels and a late lunch back at MarAzul.',
      es: 'Haría de Cenote Dos Ojos el centro del día. Puedo coordinar conductor, toallas y un almuerzo tardío de regreso en MarAzul.',
    },
    mobileAnswer: {
      en: 'I can arrange Cenote Dos Ojos, a private driver, towels and lunch back at MarAzul.',
      es: 'Puedo coordinar Cenote Dos Ojos, conductor privado, toallas y almuerzo en MarAzul.',
    },
    signal: { en: 'PRIVATE DRIVER · $95', es: 'CONDUCTOR PRIVADO · $95' },
    action: { en: 'Plan the afternoon', es: 'Planear la tarde' },
    confirmed: { en: 'Afternoon planned', es: 'Tarde planeada' },
    palette: {
      '--wl-bg': '#061f24',
      '--wl-panel': '#0b3034',
      '--wl-accent': '#d97a4f',
      '--wl-secondary': '#86b9b7',
      '--wl-cream': '#f7ecdd',
      '--wl-dim': 'rgba(247,236,221,.68)',
    } as CSSProperties,
  },
  {
    id: 'lumbre',
    tab: 'Albor XVII',
    name: 'ALBOR XVII',
    location: 'San Miguel de Allende',
    guest: { en: 'ELENA · PATIO 06', es: 'ELENA · PATIO 06' },
    image: '/assets/editorial/hc-white-label-san-miguel.webp',
    alt: {
      en: 'A candlelit ochre courtyard at a luxury boutique hotel in San Miguel de Allende',
      es: 'Un patio ocre iluminado con velas en un hotel boutique de lujo en San Miguel de Allende',
    },
    scene: { en: 'CENTRO HISTÓRICO · BLUE HOUR', es: 'CENTRO HISTÓRICO · HORA AZUL' },
    headline: { en: 'San Miguel, known by heart.', es: 'San Miguel, conocido de memoria.' },
    question: {
      en: 'Somewhere beautiful for mezcal before dinner?',
      es: '¿Un lugar hermoso para tomar mezcal antes de cenar?',
    },
    answer: {
      en: 'The rooftop catches the last light at 6:42. I can hold the corner table and have your car waiting at 7:35.',
      es: 'La azotea recibe la última luz a las 18:42. Puedo apartar la mesa de la esquina y tener tu auto listo a las 19:35.',
    },
    mobileAnswer: {
      en: 'I can hold the rooftop table and have your car waiting at 7:35.',
      es: 'Puedo apartar la mesa en la azotea y tener tu auto listo a las 19:35.',
    },
    signal: { en: 'MEZCAL FLIGHT · MX$780', es: 'DEGUSTACIÓN · MX$780' },
    action: { en: 'Hold the table', es: 'Apartar la mesa' },
    confirmed: { en: 'Table held', es: 'Mesa apartada' },
    palette: {
      '--wl-bg': '#20100f',
      '--wl-panel': '#331815',
      '--wl-accent': '#d79a55',
      '--wl-secondary': '#a94f42',
      '--wl-cream': '#f8ead7',
      '--wl-dim': 'rgba(248,234,215,.66)',
    } as CSSProperties,
  },
  {
    id: 'sombra',
    tab: 'Niebla 47',
    name: 'NIEBLA / 47',
    location: 'Ciudad de México',
    guest: { en: 'LEO · LOFT 1203', es: 'LEO · LOFT 1203' },
    image: '/assets/editorial/hc-white-label-mexico-city.webp',
    alt: {
      en: 'A modernist luxury suite overlooking jacarandas and Mexico City at blue hour',
      es: 'Una suite modernista de lujo con vista a jacarandas y la Ciudad de México en la hora azul',
    },
    scene: { en: 'POLANCO · CITY SALON', es: 'POLANCO · SALÓN URBANO' },
    headline: { en: 'Mexico City, precisely timed.', es: 'Ciudad de México, a la hora precisa.' },
    question: {
      en: 'We have two hours before the gallery opening.',
      es: 'Tenemos dos horas antes de que abra la galería.',
    },
    answer: {
      en: 'Walk the jacaranda route, then I’ll send the car at 7:10. Your late table remains confirmed for 9:00.',
      es: 'Recorre la ruta de jacarandas y después envío el auto a las 19:10. Tu mesa sigue confirmada para las 21:00.',
    },
    mobileAnswer: {
      en: 'Walk the jacaranda route. Your car leaves at 7:10; dinner remains confirmed for 9:00.',
      es: 'Recorre la ruta de jacarandas. Tu auto sale a las 19:10; la cena sigue confirmada a las 21:00.',
    },
    signal: { en: 'PRIVATE CAR · MX$1,180', es: 'AUTO PRIVADO · MX$1,180' },
    action: { en: 'Build my route', es: 'Crear mi ruta' },
    confirmed: { en: 'Route confirmed', es: 'Ruta confirmada' },
    palette: {
      '--wl-bg': '#11131a',
      '--wl-panel': '#181c28',
      '--wl-accent': '#7f8fd8',
      '--wl-secondary': '#ab77aa',
      '--wl-cream': '#f2f0ec',
      '--wl-dim': 'rgba(242,240,236,.62)',
    } as CSSProperties,
  },
]

const COPY = {
  en: {
    eyebrow: '05 · MULTI-PROPERTY · WHITE-LABEL BY DEFAULT',
    title: 'Three hotels. Three worlds.',
    accent: 'One intelligence underneath.',
    body: 'MarAzul should feel like MarAzul. A San Miguel hideaway should feel handcrafted. A Mexico City address should feel unmistakably urban. Hotel Companion adopts each property’s identity, voice, services and local knowledge — without flattening the portfolio. Guests see their hotel, never Hotel Companion; the brand keeps the relationship and the data.',
    switcher: 'Switch hotel brand',
    pause: 'Pause brand preview',
    resume: 'Resume brand preview',
    ready: 'READY · ANYTHING ELSE?',
    note: 'ILLUSTRATIVE HOTEL IDENTITIES · BRAND, TYPOGRAPHY, PALETTE, KNOWLEDGE AND SERVICE LOGIC CHANGE · THE PLATFORM DOES NOT',
    shown: 'Now showing {brand}. Same platform, a completely different hotel.',
    fit: [
      ['luxury', 'Luxury hotels'],
      ['resorts', 'Resorts'],
      ['boutique', 'Boutique & independent'],
      ['business', 'Urban & business'],
      ['enterprise-groups', 'Hotel groups'],
    ],
  },
  es: {
    eyebrow: '05 · MULTI-PROPIEDAD · MARCA BLANCA POR DEFECTO',
    title: 'Tres hoteles. Tres mundos.',
    accent: 'Una sola inteligencia detrás.',
    body: 'MarAzul debe sentirse como MarAzul. Un refugio en San Miguel debe sentirse hecho a mano. Un hotel en Ciudad de México debe sentirse inequívocamente urbano. Hotel Companion adopta la identidad, la voz, los servicios y el conocimiento local de cada propiedad — sin uniformar el portafolio. El huésped ve a su hotel, nunca a Hotel Companion; la marca conserva la relación y los datos.',
    switcher: 'Cambiar la marca del hotel',
    pause: 'Pausar vista de marcas',
    resume: 'Reanudar vista de marcas',
    ready: 'LISTO · ¿ALGO MÁS?',
    note: 'IDENTIDADES HOTELERAS ILUSTRATIVAS · CAMBIAN MARCA, TIPOGRAFÍA, PALETA, CONOCIMIENTO Y LÓGICA DE SERVICIO · LA PLATAFORMA NO',
    shown: 'Mostrando {brand}. Misma plataforma, un hotel completamente distinto.',
    fit: [
      ['luxury', 'Hoteles de lujo'],
      ['resorts', 'Resorts'],
      ['boutique', 'Boutique e independientes'],
      ['business', 'Urbanos y de negocios'],
      ['enterprise-groups', 'Grupos hoteleros'],
    ],
  },
} as const

export function WhiteLabelHotels() {
  const { lang } = useLang()
  const c = COPY[lang]
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({})
  const [autoplay, setAutoplay] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [announcement, setAnnouncement] = useState('')
  const rootRef = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const transitionTimer = useRef<number | undefined>(undefined)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const brand = BRANDS[active]

  useEffect(() => () => {
    window.clearTimeout(timer.current)
    window.clearTimeout(transitionTimer.current)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '240px 0px', threshold: 0.01 })
    const onVisibility = () => setPageVisible(!document.hidden)
    observer.observe(root)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!autoplay || interacting || !inView || !pageVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = window.setTimeout(() => switchBrand((active + 1) % BRANDS.length, false), 5200)
    return () => window.clearTimeout(timer.current)
    // switchBrand intentionally closes over the current active brand.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, autoplay, interacting, inView, pageVisible])

  useEffect(() => {
    if (!inView || !pageVisible) return
    const preload = new window.Image()
    preload.src = BRANDS[(active + 1) % BRANDS.length].image
  }, [active, inView, pageVisible])

  const switchBrand = (next: number, byGuest = true) => {
    window.clearTimeout(timer.current)
    window.clearTimeout(transitionTimer.current)
    if (byGuest) {
      setAutoplay(false)
      setAnnouncement(c.shown.replace('{brand}', BRANDS[next].tab))
    }
    if (next === active) {
      setFading(false)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(next)
      setFading(false)
      return
    }
    setFading(true)
    transitionTimer.current = window.setTimeout(() => {
      setActive(next)
      setFading(false)
    }, 180)
  }

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined
    if (event.key === 'ArrowRight') next = (index + 1) % BRANDS.length
    if (event.key === 'ArrowLeft') next = (index - 1 + BRANDS.length) % BRANDS.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = BRANDS.length - 1
    if (next === undefined) return
    event.preventDefault()
    switchBrand(next)
    tabs.current[next]?.focus()
  }

  const toggleConfirmation = () => {
    setAutoplay(false)
    window.clearTimeout(timer.current)
    setConfirmed((current) => ({ ...current, [brand.id]: !current[brand.id] }))
  }

  return (
    <section
      ref={rootRef}
      id="white-label"
      className={`${styles.section} motion-gated ${inView && pageVisible ? 'is-in-view' : ''}`}
      aria-labelledby="white-label-title"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false)
      }}
    >
      <span id="multi-property" className="ed-anchor" aria-hidden="true" />
      <span id="solutions-property-fit" className="ed-anchor" aria-hidden="true" />
      <span id="solutions-enterprise" className="ed-anchor" aria-hidden="true" />
      {c.fit.map(([id]) => <span id={id} className="ed-anchor" aria-hidden="true" key={id} />)}
      <div className="ed-wrap">
        <div className={styles.intro}>
          <div>
            <span className="ed-eyebrow">{c.eyebrow}</span>
            <h2 id="white-label-title">{c.title}<br /><em>{c.accent}</em></h2>
          </div>
          <p>{c.body}</p>
        </div>

        <div className={styles.switcher} role="tablist" aria-label={c.switcher}>
          {BRANDS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`white-label-tab-${item.id}`}
              aria-selected={index === active}
              aria-controls="white-label-screen"
              tabIndex={index === active ? 0 : -1}
              className={index === active ? styles.activeTab : undefined}
              ref={(node) => { tabs.current[index] = node }}
              onClick={() => switchBrand(index)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              <span className={styles.swatch} style={item.palette} aria-hidden="true" />
              <span><strong>{item.tab}</strong><small>{item.location}</small></span>
            </button>
          ))}
        </div>

        <div className={styles.scroller}>
          <div className={styles.tablet} style={brand.palette}>
            <span className={styles.camera} aria-hidden="true" />
            <div
              id="white-label-screen"
              role="tabpanel"
              aria-labelledby={`white-label-tab-${brand.id}`}
              className={`${styles.screen} ${styles[brand.id]}${fading ? ` ${styles.fading}` : ''}`}
            >
              <div className={styles.imagePane}>
                <Image
                  key={brand.id}
                  src={brand.image}
                  alt={brand.alt[lang]}
                  fill
                  sizes="(max-width: 560px) calc(100vw - 48px), (max-width: 900px) 50vw, 720px"
                  quality={75}
                  className={styles.activeImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.imageScrim} />
                <div className={styles.brandBar}>
                  <span className={styles.wordmark}>{brand.name}</span>
                  <span>{brand.location}</span>
                </div>
                <div className={styles.imageCopy}>
                  <small>{brand.scene[lang]}</small>
                  <h3>{brand.headline[lang]}</h3>
                </div>
              </div>

              <div className={styles.conversation}>
                <div className={styles.conversationTop}>
                  <span>{brand.name}</span>
                  <small>{brand.guest[lang]}</small>
                </div>
                <div className={styles.exchange}>
                  <p className={styles.guestBubble}>{brand.question[lang]}</p>
                  <div className={styles.answerBubble}>
                    <span>{brand.signal[lang]}</span>
                    <p className={styles.answerLong}>{brand.answer[lang]}</p>
                    <p className={styles.answerShort}>{brand.mobileAnswer[lang]}</p>
                  </div>
                  <button
                    type="button"
                    className={confirmed[brand.id] ? styles.confirmed : undefined}
                    onClick={toggleConfirmation}
                  >
                    {confirmed[brand.id] ? `✓ ${brand.confirmed[lang]}` : brand.action[lang]}
                  </button>
                </div>
                <div className={styles.voiceBar}>
                  <i aria-hidden="true" />
                  <span aria-hidden="true">▮▰▮</span>
                  <small>{c.ready}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.note}>{c.note}</p>
        <button
          type="button"
          className={styles.previewControl}
          aria-pressed={!autoplay}
          onClick={() => setAutoplay((running) => !running)}
        >
          <span aria-hidden="true">{autoplay ? 'Ⅱ' : '▶'}</span>{' '}{autoplay ? c.pause : c.resume}
        </button>
        <div className={styles.fitRail} aria-label={lang === 'es' ? 'Tipos de propiedad' : 'Property types'}>
          {c.fit.map(([id, label]) => <span key={id}>{label}</span>)}
        </div>
        <p className={styles.live} aria-live="polite">{announcement}</p>
      </div>
    </section>
  )
}
