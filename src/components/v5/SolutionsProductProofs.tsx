'use client'

import Image from 'next/image'
import { useLang } from '@/lib/i18n/LanguageContext'
import styles from './SolutionsProductProofs.module.css'

const COPY = {
  en: {
    revenue: {
      label: 'Contextual offer · Live stay',
      guest: 'MAYA · SUITE 214 · NIGHT 02 OF 04',
      detected: 'Guest intent detected',
      ask: '“We would love a little more space for tomorrow morning.”',
      context: ['Anniversary stay', 'Ocean preference', 'Late breakfast'],
      logic: 'A single relevant upgrade is available. It keeps Maya close to the water and opens breakfast on the terrace.',
      fit: 'Best-fit addition',
      suite: 'Ocean Panorama Suite',
      detail: 'Private terrace · plunge pool · breakfast included',
      availability: 'Incremental room revenue',
      price: '+$178 / night',
      value: '+$356 over the final 2 nights',
      action: 'Offer the upgrade',
      footer: 'ONE OFFER · EXPLAINABLE FIT · LIVE AVAILABILITY · DIRECT REVENUE',
      aria: 'Hotel Companion revenue moment showing a contextual suite upgrade',
    },
    morning: {
      label: 'Daily operating brief',
      date: '04 SEP · 07:30',
      property: 'MARAZUL · RIVIERA MAYA',
      aria: 'Hotel Companion morning briefing for the general manager',
      metrics: [
        { value: '$4,280', label: 'assisted revenue', delta: '+18% vs. prior period' },
        { value: '91%', label: 'requests closed', delta: '6 awaiting verification' },
        { value: '14', label: 'high-intent stays', delta: 'today and tomorrow' },
      ],
      title: 'What changed overnight',
      summary: 'Late dining demand rose after 21:00. Two room-temperature reports share one probable cause. Three arriving guests have spa intent before check-in.',
      insightLabel: 'Recommended operating move',
      insight: 'Keep the pool kitchen open one hour later tonight and pre-position engineering on the east wing before 11:00.',
      signals: 'Signals requiring an owner',
      rows: [
        { time: '07:45', type: 'REVENUE', text: '3 pre-arrival spa moments', owner: 'SPA · READY' },
        { time: '08:10', type: 'SERVICE', text: 'East-wing temperature pattern', owner: 'ENG · ASSIGNED' },
        { time: '09:00', type: 'F&B', text: 'Late pool dining demand', owner: 'GM · REVIEW' },
      ],
      footer: 'CONVERSATIONS BECOME DECISIONS · WITHOUT READING TRANSCRIPTS',
    },
  },
  es: {
    revenue: {
      label: 'Oferta contextual · Estancia activa',
      guest: 'MAYA · SUITE 214 · NOCHE 02 DE 04',
      detected: 'Intención detectada',
      ask: '“Nos encantaría tener un poco más de espacio mañana por la mañana.”',
      context: ['Viaje de aniversario', 'Preferencia por el mar', 'Desayuno tardío'],
      logic: 'Hay una mejora relevante disponible. Mantiene a Maya cerca del agua e incluye desayuno en la terraza.',
      fit: 'Mejor adición',
      suite: 'Suite Panorama Océano',
      detail: 'Terraza privada · alberca · desayuno incluido',
      availability: 'Ingreso incremental por habitación',
      price: '+$178 / noche',
      value: '+$356 por las últimas 2 noches',
      action: 'Ofrecer la mejora',
      footer: 'UNA OFERTA · AFINIDAD EXPLICABLE · DISPONIBILIDAD REAL · INGRESO DIRECTO',
      aria: 'Momento de ingreso de Hotel Companion con una mejora de suite contextual',
    },
    morning: {
      label: 'Brief operativo diario',
      date: '04 SEP · 07:30',
      property: 'MARAZUL · RIVIERA MAYA',
      aria: 'Brief matutino de Hotel Companion para la dirección general',
      metrics: [
        { value: '$4,280', label: 'ingreso asistido', delta: '+18% vs. periodo anterior' },
        { value: '91%', label: 'solicitudes cerradas', delta: '6 por verificar' },
        { value: '14', label: 'estancias con intención', delta: 'hoy y mañana' },
      ],
      title: 'Qué cambió durante la noche',
      summary: 'La demanda de cena tardía aumentó después de las 21:00. Dos reportes de temperatura comparten una causa probable. Tres huéspedes por llegar muestran intención de spa.',
      insightLabel: 'Movimiento operativo recomendado',
      insight: 'Mantener abierta una hora más la cocina de alberca y posicionar a ingeniería en el ala este antes de las 11:00.',
      signals: 'Señales que requieren responsable',
      rows: [
        { time: '07:45', type: 'INGRESOS', text: '3 momentos de spa antes de llegar', owner: 'SPA · LISTO' },
        { time: '08:10', type: 'SERVICIO', text: 'Patrón térmico en el ala este', owner: 'ING · ASIGNADO' },
        { time: '09:00', type: 'A&B', text: 'Demanda de cena tardía', owner: 'DG · REVISAR' },
      ],
      footer: 'LAS CONVERSACIONES SE VUELVEN DECISIONES · SIN LEER TRANSCRIPCIONES',
    },
  },
} as const

export function RevenueMoment() {
  const { lang } = useLang()
  const c = COPY[lang].revenue

  return (
    <div className={styles.revenue} aria-label={c.aria}>
      <div className={styles.revenueTop}>
        <span className={styles.mark}>MARAZUL</span>
        <span>{c.label}</span>
        <small>{c.guest}</small>
      </div>
      <div className={styles.revenueBody}>
        <div className={styles.intent}>
          <span className={styles.kicker}>{c.detected}</span>
          <blockquote>{c.ask}</blockquote>
          <div className={styles.chips}>
            {c.context.map((item) => <span key={item}>{item}</span>)}
          </div>
          <p>{c.logic}</p>
          <div className={styles.logicLine} aria-hidden="true"><i /><i /><i /><b /></div>
        </div>

        <article className={styles.offer}>
          <div className={styles.offerImage}>
            <Image
              src="/assets/ui/suite-ocean.webp"
              alt={lang === 'es' ? 'Suite Panorama Océano de MarAzul' : 'MarAzul Ocean Panorama Suite'}
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              quality={75}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.offerScrim} />
            <span>{c.fit}</span>
            <div className={styles.offerTitle}>
              <h3>{c.suite}</h3>
              <p>{c.detail}</p>
            </div>
          </div>
          <div className={styles.offerAction}>
            <div>
              <small>{c.availability}</small>
              <strong>{c.price}</strong>
              <span>{c.value}</span>
            </div>
            <span className={styles.actionPill}>{c.action}</span>
          </div>
        </article>
      </div>
      <div className={styles.productNote}>{c.footer}</div>
    </div>
  )
}

export function MorningBriefing() {
  const { lang } = useLang()
  const c = COPY[lang].morning

  return (
    <div className={styles.morning} aria-label={c.aria}>
      <div className={styles.morningTop}>
        <div><span className={styles.mark}>HOTEL COMPANION</span><small>{c.label}</small></div>
        <div><span>{c.property}</span><small>{c.date}</small></div>
      </div>

      <div className={styles.metricRail}>
        {c.metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.delta}</small>
          </div>
        ))}
      </div>

      <div className={styles.briefGrid}>
        <div className={styles.briefLead}>
          <span className={styles.kicker}>{c.title}</span>
          <p>{c.summary}</p>
          <div className={styles.insight}>
            <small>{c.insightLabel}</small>
            <strong>{c.insight}</strong>
          </div>
          <div className={styles.sparkline} aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
        </div>

        <div className={styles.signalList}>
          <span className={styles.kicker}>{c.signals}</span>
          {c.rows.map((row) => (
            <div className={styles.signalRow} key={`${row.time}-${row.type}`}>
              <time>{row.time}</time>
              <div><small>{row.type}</small><strong>{row.text}</strong></div>
              <span>{row.owner}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.productNote}>{c.footer}</div>
    </div>
  )
}
