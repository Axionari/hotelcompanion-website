'use client'

import { useId } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import styles from './PlatformThread.module.css'

const COPY = {
  en: {
    aria: 'One continuous Hotel Companion guest thread, from pre-arrival to a verified return stay',
    product: 'HOTEL COMPANION',
    mode: 'LIVE GUEST THREAD',
    property: 'MARAZUL · RIVIERA MAYA',
    live: 'CONTEXT ACTIVE',
    threadId: 'THREAD · MZ–0842',
    contextLabel: 'GUEST CONTEXT',
    guestName: 'Maya Chen',
    guestState: 'RETURNING GUEST · DIRECT',
    context: [
      { label: 'Identity', value: 'Verified' },
      { label: 'Language', value: 'English' },
      { label: 'Stay', value: 'Suite 214' },
      { label: 'Preference', value: 'Quiet ocean room' },
    ],
    retained: 'RETAINED WITH CONSENT',
    valueLabel: 'REVENUE ATTRIBUTED',
    value: '+US$180',
    journeyLabel: 'ONE THREAD · 184 DAYS · 4 TOUCHPOINTS',
    journeyTitle: 'Maya never starts over.',
    stages: {
      before: {
        number: '01',
        phase: 'PRE-ARRIVAL',
        channel: 'WEB · 14 MAR · 16:42',
        question: 'Our flight lands at 8:40. Can you keep an ocean suite?',
        answer: 'Suite 214 is held for a 9:30 arrival. The direct upgrade is ready to confirm.',
        revenue: '+US$180 · DIRECT UPGRADE',
        commission: '0% OTA COMMISSION',
      },
      room: {
        number: '02',
        phase: 'IN-ROOM SERVICE',
        channel: 'VOICE · SUITE 214 · DAY 2',
        question: 'Two extra towels, please — before dinner.',
        understood: 'INTENT UNDERSTOOD',
        request: '2 BATH TOWELS · BEFORE 19:00',
      },
      owned: {
        number: '03',
        phase: 'TEAM OWNERSHIP',
        channel: 'OPERATIONS · LIVE',
        department: 'HOUSEKEEPING',
        owner: 'ANA R.',
        accepted: 'ACCEPTED · 18:07',
        delivered: 'DELIVERED · 18:14',
        verified: 'MAYA CONFIRMED',
        quote: '“Perfect, thank you.”',
      },
      return: {
        number: '04',
        phase: 'VERIFIED RETURN',
        channel: 'WEB · 184 DAYS LATER',
        question: 'Could we have the same room again?',
        answer: 'Welcome back, Maya. Suite 214, a 9:30 arrival and extra towels are already in your stay.',
        direct: 'DIRECT RETURN',
        memory: 'PREFERENCES VERIFIED',
      },
    },
    footer: 'ONE IDENTITY · ONE CONTEXT · EVERY TEAM · EVERY STAY',
  },
  es: {
    aria: 'Un hilo continuo del huésped en Hotel Companion, desde antes de llegar hasta un regreso verificado',
    product: 'HOTEL COMPANION',
    mode: 'HILO ACTIVO DEL HUÉSPED',
    property: 'MARAZUL · RIVIERA MAYA',
    live: 'CONTEXTO ACTIVO',
    threadId: 'HILO · MZ–0842',
    contextLabel: 'CONTEXTO DEL HUÉSPED',
    guestName: 'Maya Chen',
    guestState: 'HUÉSPED RECURRENTE · DIRECTO',
    context: [
      { label: 'Identidad', value: 'Verificada' },
      { label: 'Idioma', value: 'Inglés' },
      { label: 'Estancia', value: 'Suite 214' },
      { label: 'Preferencia', value: 'Habitación tranquila frente al mar' },
    ],
    retained: 'CONSERVADO CON CONSENTIMIENTO',
    valueLabel: 'INGRESO ATRIBUIDO',
    value: '+US$180',
    journeyLabel: 'UN HILO · 184 DÍAS · 4 MOMENTOS',
    journeyTitle: 'Maya nunca empieza de cero.',
    stages: {
      before: {
        number: '01',
        phase: 'ANTES DE LLEGAR',
        channel: 'WEB · 14 MAR · 16:42',
        question: 'Nuestro vuelo aterriza a las 20:40. ¿Pueden guardarnos una suite frente al mar?',
        answer: 'La suite 214 está apartada para tu llegada a las 21:30. La mejora directa está lista para confirmar.',
        revenue: '+US$180 · MEJORA DIRECTA',
        commission: '0% COMISIÓN OTA',
      },
      room: {
        number: '02',
        phase: 'SERVICIO EN HABITACIÓN',
        channel: 'VOZ · SUITE 214 · DÍA 2',
        question: 'Dos toallas extra, por favor — antes de cenar.',
        understood: 'INTENCIÓN COMPRENDIDA',
        request: '2 TOALLAS DE BAÑO · ANTES DE LAS 19:00',
      },
      owned: {
        number: '03',
        phase: 'RESPONSABLE ASIGNADO',
        channel: 'OPERACIÓN · EN VIVO',
        department: 'AMA DE LLAVES',
        owner: 'ANA R.',
        accepted: 'ACEPTADO · 18:07',
        delivered: 'ENTREGADO · 18:14',
        verified: 'MAYA CONFIRMÓ',
        quote: '“Perfecto, gracias.”',
      },
      return: {
        number: '04',
        phase: 'REGRESO VERIFICADO',
        channel: 'WEB · 184 DÍAS DESPUÉS',
        question: '¿Podemos tener la misma habitación otra vez?',
        answer: 'Qué gusto verte, Maya. La suite 214, tu llegada a las 21:30 y las toallas extra ya están contempladas.',
        direct: 'REGRESO DIRECTO',
        memory: 'PREFERENCIAS VERIFICADAS',
      },
    },
    footer: 'UNA IDENTIDAD · UN CONTEXTO · CADA EQUIPO · CADA ESTANCIA',
  },
} as const

const WAVEFORM = [10, 18, 27, 15, 34, 22, 39, 17, 30, 13, 25, 18, 11]

type PlatformThreadProps = {
  className?: string
}

export function PlatformThread({ className = '' }: PlatformThreadProps) {
  const { lang } = useLang()
  const c = COPY[lang]
  const headingId = useId()

  return (
    <figure className={`${styles.root} ${className}`.trim()} aria-label={c.aria}>
      <div className={styles.workspace}>
        <header className={styles.chrome}>
          <div className={styles.productMark}>
            <span className={styles.monogram} aria-hidden="true">HC</span>
            <span><strong>{c.product}</strong><small>{c.mode}</small></span>
          </div>
          <div className={styles.property}>{c.property}</div>
          <div className={styles.liveState} role="status">
            <i aria-hidden="true" />
            {c.live}
          </div>
        </header>

        <div className={styles.workspaceBody}>
          <aside className={styles.context} aria-label={c.contextLabel}>
            <div className={styles.contextTop}>
              <span>{c.contextLabel}</span>
              <small>{c.threadId}</small>
            </div>
            <div className={styles.identity}>
              <span aria-hidden="true">MC</span>
              <div><strong>{c.guestName}</strong><small>{c.guestState}</small></div>
            </div>
            <dl>
              {c.context.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.consent}><i aria-hidden="true">✓</i>{c.retained}</div>
            <div className={styles.attribution}>
              <small>{c.valueLabel}</small>
              <strong>{c.value}</strong>
            </div>
          </aside>

          <section className={styles.thread} aria-labelledby={headingId}>
            <div className={styles.threadHeading}>
              <span>{c.journeyLabel}</span>
              <h2 id={headingId}>{c.journeyTitle}</h2>
            </div>

            <ol className={styles.journey}>
              <li className={`${styles.moment} ${styles.before}`}>
                <div className={styles.momentMeta}>
                  <span>{c.stages.before.number} · {c.stages.before.phase}</span>
                  <time dateTime="2026-03-14T16:42">{c.stages.before.channel}</time>
                </div>
                <blockquote className={styles.guestMessage}>{c.stages.before.question}</blockquote>
                <p className={styles.companionReply}>{c.stages.before.answer}</p>
                <div className={styles.outcomeLine}>
                  <strong>{c.stages.before.revenue}</strong>
                  <span>{c.stages.before.commission}</span>
                </div>
              </li>

              <li className={`${styles.moment} ${styles.room}`}>
                <div className={styles.momentMeta}>
                  <span>{c.stages.room.number} · {c.stages.room.phase}</span>
                  <time dateTime="2026-03-19T18:06">{c.stages.room.channel}</time>
                </div>
                <div className={styles.voiceRequest}>
                  <div className={styles.waveform} aria-hidden="true">
                    {WAVEFORM.map((height, index) => <i key={`${height}-${index}`} style={{ height }} />)}
                  </div>
                  <blockquote>{c.stages.room.question}</blockquote>
                </div>
                <div className={styles.interpretation}>
                  <span>{c.stages.room.understood}</span>
                  <strong>{c.stages.room.request}</strong>
                </div>
              </li>

              <li className={`${styles.moment} ${styles.owned}`}>
                <div className={styles.momentMeta}>
                  <span>{c.stages.owned.number} · {c.stages.owned.phase}</span>
                  <time dateTime="2026-03-19T18:07">{c.stages.owned.channel}</time>
                </div>
                <div className={styles.route} aria-label={`${c.stages.owned.department}, ${c.stages.owned.owner}, ${c.stages.owned.accepted}, ${c.stages.owned.delivered}`}>
                  <span>{c.stages.owned.department}</span>
                  <span>{c.stages.owned.owner}</span>
                  <span>{c.stages.owned.accepted}</span>
                  <strong>{c.stages.owned.delivered}</strong>
                </div>
                <p className={styles.verification}><i aria-hidden="true">✓</i><span>{c.stages.owned.verified}</span><q>{c.stages.owned.quote.replace(/[“”]/g, '')}</q></p>
              </li>

              <li className={`${styles.moment} ${styles.return}`}>
                <div className={styles.momentMeta}>
                  <span>{c.stages.return.number} · {c.stages.return.phase}</span>
                  <time dateTime="2026-09-19">{c.stages.return.channel}</time>
                </div>
                <blockquote className={styles.returnQuestion}>{c.stages.return.question}</blockquote>
                <p className={styles.returnReply}>{c.stages.return.answer}</p>
                <div className={styles.returnSignals}>
                  <span>{c.stages.return.direct}</span>
                  <span>{c.stages.return.memory}</span>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <footer className={styles.footer}>
          <span>{c.footer}</span>
          <i aria-hidden="true" />
        </footer>
      </div>
    </figure>
  )
}
