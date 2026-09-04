'use client'

import { useLang } from '@/lib/i18n/LanguageContext'
import styles from './DepartmentPulse.module.css'

type Row = { label: string; value: string }

const COPY = {
  en: {
    property: 'MARAZUL · LIVE STAY',
    context: 'ONE GUEST · SHARED CONTEXT',
    guest: 'MAYA · RETURNING GUEST',
    arrival: 'Arrival 15:42',
    summary: 'Four nights · ocean preference · anniversary · Spanish + English',
    facts: [['ROOM', '214'], ['CONSENT', 'ACTIVE'], ['SOURCE', 'DIRECT']],
    owner: 'OWNER',
    contextLabel: 'CONTEXT',
    statusLabel: 'STATUS',
    state: ['VERIFIED', 'KNOWN', 'DELIVERED', 'READY'],
    footer: 'GUIDED PRODUCT VIEW · ILLUSTRATIVE STAY · THE GUEST SPEAKS ONCE · EACH TEAM SEES WHAT IT NEEDS',
    aria: 'A live hotel operations view showing one guest context shared across departments',
  },
  es: {
    property: 'MARAZUL · ESTANCIA ACTIVA',
    context: 'UN HUÉSPED · CONTEXTO COMPARTIDO',
    guest: 'MAYA · HUÉSPED RECURRENTE',
    arrival: 'Llegada 15:42',
    summary: 'Cuatro noches · preferencia por el mar · aniversario · español + inglés',
    facts: [['HAB.', '214'], ['CONSENT.', 'ACTIVO'], ['ORIGEN', 'DIRECTO']],
    owner: 'RESPONSABLE',
    contextLabel: 'CONTEXTO',
    statusLabel: 'ESTADO',
    state: ['VERIFICADO', 'CONOCIDO', 'ENTREGADO', 'LISTO'],
    footer: 'VISTA GUIADA DEL PRODUCTO · ESTANCIA ILUSTRATIVA · EL HUÉSPED HABLA UNA VEZ · CADA EQUIPO VE LO QUE NECESITA',
    aria: 'Vista operativa del hotel que muestra el contexto de un huésped compartido entre departamentos',
  },
} as const

export function DepartmentPulse({ title, rows }: { title: string; rows: Row[] }) {
  const { lang } = useLang()
  const c = COPY[lang]

  return (
    <div className={styles.stage} aria-label={c.aria}>
      <div className={styles.topline}>
        <span>{c.property}</span>
        <span><i aria-hidden="true" />{c.context}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.identity}>
          <span>{c.guest}</span>
          <h2>{title}</h2>
          <strong>{c.arrival}</strong>
          <p>{c.summary}</p>
          <dl>
            {c.facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
        <div className={styles.stream}>
          <div className={styles.streamHead}><span>{c.owner}</span><span>{c.contextLabel}</span><span>{c.statusLabel}</span></div>
          {rows.map((row, index) => (
            <article key={`${row.label}-${row.value}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><small>{row.label}</small><strong>{row.value}</strong></div>
              <b><i aria-hidden="true" />{c.state[index] ?? c.state[c.state.length - 1]}</b>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.footer}>{c.footer}</div>
    </div>
  )
}
