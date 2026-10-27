'use client'

import { ArrowUpRight } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { Label } from './Atelier'
import styles from './HomeValueBenchmarks.module.css'

type Benchmark = { area: string; value: string; unit?: string; title: string; body: string; context: string; sources: string[] }
type Copy = { eyebrow: string; title: [string, string]; intro: string; cards: Benchmark[]; scope: string; cta: string; sourceLabel: string }

const en: Copy = {
  eyebrow: 'The business value of better hospitality',
  title: ['More value from every stay.', 'More time for every guest.'],
  intro: 'Relevant offers, answered inquiries and fewer repetitive tasks. Published hotel cases show the commercial and operational opportunity.',
  cards: [
    { area: 'Upselling', value: '+20–25%', title: 'More revenue from upselling', body: 'A hotel group reported increased upsell revenue after introducing personalized digital offers and AI-supported guest communication.', context: 'Reported hotel-group case', sources: ["https://duve.com/how-conscious-hotels-increased-upsell-revenue-by-20-25-while-scaling-guest-communication-with-ai/"] },
    { area: 'Guest service', value: '89–93%', title: 'Guest conversations automated', body: 'Two published hotel-group cases reported these automation rates, reducing the volume of inquiries requiring staff attention.', context: 'Two hotel-group cases', sources: ["https://www.hijiffy.com/success-stories/ght-hotels", "https://www.hijiffy.com/es/casos-de-exito/success-story-ax-hotels-es"] },
    { area: 'Team capacity', value: '45–70', unit: 'hours', title: 'Staff time freed each month', body: 'Estimated monthly time savings reported by a hotel group’s reception and reservations teams, primarily from answering recurring questions automatically.', context: 'Group-level estimate · Per month', sources: ["https://www.hijiffy.com/es/casos-de-exito/success-story-ax-hotels-es"] },
    { area: 'Telephone bookings', value: '3,000', unit: 'bookings', title: 'Telephone conversations that convert', body: 'AI handled 3,000 room reservations at one hotel in one month—showing the potential of telephone booking assistance.', context: 'One hotel · One month', sources: ["https://poly.ai/customers/golden-nugget"] },
  ],
  scope: 'Selected vendor-published hotel cases—not Hotel Companion results or industry averages. Outcomes vary by property, scope and integrations.',
  cta: 'Explore your hotel’s opportunity',
  sourceLabel: 'Published case',
}
const es: Copy = {
  eyebrow: 'El valor de una mejor hospitalidad',
  title: ['Más valor en cada estancia.', 'Más tiempo para cada huésped.'],
  intro: 'Ofertas relevantes, consultas atendidas y menos tareas repetitivas. Los casos hoteleros publicados muestran la oportunidad comercial y operativa.',
  cards: [
    { area: 'Ventas adicionales', value: '+20–25%', title: 'Más ingresos por ventas adicionales', body: 'Un grupo hotelero reportó mayores ingresos por ventas adicionales tras introducir ofertas digitales personalizadas y comunicación con huéspedes apoyada por IA.', context: 'Caso reportado de un grupo hotelero', sources: ["https://duve.com/how-conscious-hotels-increased-upsell-revenue-by-20-25-while-scaling-guest-communication-with-ai/"] },
    { area: 'Atención al huésped', value: '89–93%', title: 'Conversaciones automatizadas', body: 'Dos casos publicados de grupos hoteleros reportaron estas tasas de automatización, reduciendo las consultas que requieren atención del personal.', context: 'Dos casos de grupos hoteleros', sources: ["https://www.hijiffy.com/success-stories/ght-hotels", "https://www.hijiffy.com/es/casos-de-exito/success-story-ax-hotels-es"] },
    { area: 'Capacidad del equipo', value: '45–70', unit: 'horas', title: 'Tiempo liberado cada mes', body: 'Ahorro mensual estimado por los equipos de recepción y reservas de un grupo hotelero, principalmente al responder preguntas frecuentes de forma automática.', context: 'Estimación del grupo · Por mes', sources: ["https://www.hijiffy.com/es/casos-de-exito/success-story-ax-hotels-es"] },
    { area: 'Reservas telefónicas', value: '3,000', unit: 'reservas', title: 'Llamadas que se convierten en reservas', body: 'La IA gestionó 3,000 reservas de habitación en un hotel durante un mes, mostrando el potencial de la asistencia telefónica para reservar.', context: 'Un hotel · Un mes', sources: ["https://poly.ai/customers/golden-nugget"] },
  ],
  scope: 'Casos hoteleros publicados por proveedores; no son resultados de Hotel Companion ni promedios del sector. Los resultados varían según el hotel, el alcance y las integraciones.',
  cta: 'Explora la oportunidad de tu hotel',
  sourceLabel: 'Caso publicado',
}

export function HomeValueBenchmarks() {
  const { lang } = useLang()
  const copy = lang === 'es' ? es : en
  return <section className={styles.section} id="business-value" aria-labelledby="business-value-title">
    <div className="at-wrap">
      <header className={styles.heading}>
        <Label>{copy.eyebrow}</Label>
        <h2 id="business-value-title">{copy.title[0]}<br/>{copy.title[1]}</h2>
        <p>{copy.intro}</p>
      </header>
      <div className={styles.grid}>
        {copy.cards.map((card, index) => <article className={styles.card} key={card.area}>
          <div className={styles.area}><span>0{index + 1}</span>{card.area}</div>
          <p className={styles.number}>{card.value}{card.unit ? <small> {card.unit}</small> : null}</p>
          <h3>{card.title}</h3>
          <p className={styles.body}>{card.body}</p>
          <div className={styles.context}><p>{card.context}</p><div className={styles.sources}>{card.sources.map((href, sourceIndex) => <a href={href} key={href} target="_blank" rel="noopener noreferrer" aria-label={`${copy.sourceLabel}${card.sources.length > 1 ? ` ${sourceIndex + 1}` : ''}: ${card.area}`}>{copy.sourceLabel}{card.sources.length > 1 ? ` ${sourceIndex + 1}` : ''} <span aria-hidden="true">↗</span></a>)}</div></div>
        </article>)}
      </div>
      <div className={styles.footer}>
        <p>{copy.scope}</p>
        <Link href="/revenue" className="at-button">{copy.cta}<ArrowUpRight size={16} aria-hidden="true"/></Link>
      </div>
    </div>
  </section>
}
