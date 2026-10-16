'use client'

import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useWords } from './Experience'
import styles from './operating-story.module.css'

export function OperatingStory() {
  const t = useWords()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const views = [
    {
      key: 'requests',
      label: t('Guest requests', 'Solicitudes de huéspedes'),
      image: '/assets/experience/sales-current-staff-request.jpg',
      alt: t(
        'Current Hotel Companion sales demo: a fictional housekeeping request with an assigned team member, status controls and an audit timeline.',
        'Demo de ventas actual de Hotel Companion: una solicitud ficticia de limpieza con responsable, controles de estado e historial de actividad.',
      ),
    },
    {
      key: 'overview',
      label: t('Hotel overview', 'Vista general del hotel'),
      image: '/assets/experience/sales-current-operations.jpg',
      alt: t(
        'Current Hotel Companion sales demo: the House overview for a fictional hotel, with illustrative operating figures and service requests.',
        'Demo de ventas actual de Hotel Companion: la vista general de un hotel ficticio, con cifras operativas ilustrativas y solicitudes de servicio.',
      ),
    },
  ]
  const view = views[active]
  const benefits = [
    {
      title: t('Ownership', 'Responsables'),
      body: t('The right team sees the request.', 'La solicitud llega al equipo indicado.'),
    },
    {
      title: t('Context', 'Contexto'),
      body: t('Guest details stay with the conversation.', 'Los detalles del huésped acompañan la conversación.'),
    },
    {
      title: t('Follow-through', 'Seguimiento'),
      body: t('Status updates make the next step clear.', 'Cada cambio de estado aclara el siguiente paso.'),
    },
  ]

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % views.length
    else if (event.key === 'ArrowLeft') next = (index + views.length - 1) % views.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = views.length - 1
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return <section className={styles.section} id="control" aria-labelledby={`${id}-title`}>
    <div className={styles.inner}>
      <p className={styles.chapter}><span>03</span><span aria-hidden="true">/</span>COMPANION CONTROL</p>
      <div className={styles.heading}>
        <h2 className={styles.title} id={`${id}-title`}>
          {t('Every request.', 'Cada solicitud.')}<br/>
          <span>{t('A team behind it.', 'Un equipo detrás.')}</span>
        </h2>
        <p className={styles.body}>{t(
          'Follow each request from conversation through team review and confirmation. Less chasing details. More time to care for guests.',
          'Sigue cada solicitud desde la conversación hasta la revisión y confirmación del equipo. Menos tiempo persiguiendo detalles. Más tiempo para atender al huésped.',
        )}</p>
      </div>

      <div className={styles.exhibit}>
        <div className={styles.controls} role="tablist" aria-label={t('Explore Companion Control', 'Explora Companion Control')}>
          {views.map((item, index) => <button
            className={styles.tab}
            type="button"
            role="tab"
            key={item.key}
            id={`${id}-tab-${item.key}`}
            aria-controls={`${id}-panel`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={element => { tabs.current[index] = element }}
            onClick={() => setActive(index)}
            onKeyDown={event => navigate(event, index)}
          >{item.label}</button>)}
        </div>
        <div className={styles.panel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${view.key}`} tabIndex={0}>
          <figure className={styles.figure}>
            <div className={styles.image}>
              <Image unoptimized src={view.image} alt={view.alt} width={1422} height={1000} sizes="(max-width:800px) calc(100vw - 40px), (max-width:1280px) calc(100vw - 96px), 1120px"/>
            </div>
            <figcaption className={styles.caption}>
              <p>{t('Current sales demo. Fictional hotel and guest data. Illustrative figures, not measured results.', 'Demo de ventas actual. Datos ficticios de hotel y huéspedes. Cifras ilustrativas, no resultados medidos.')}</p>
              <a href={view.image} target="_blank" rel="noopener noreferrer">{t('View the full screen', 'Ver la pantalla completa')}<ArrowUpRight size={16} aria-hidden="true"/></a>
            </figcaption>
          </figure>
        </div>

        <div className={styles.benefits}>
          {benefits.map(benefit => <div className={styles.benefit} key={benefit.title}>
            <h3>{benefit.title}</h3>
            <p>{benefit.body}</p>
          </div>)}
        </div>
      </div>
    </div>
  </section>
}
