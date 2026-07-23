import type { Localized } from '../useCopy'
import type { ScreenId } from './deviceScreens'

/* Copy source: HotelCompanion__Site_Copy.md {#home}. Verbatim — do not edit here. */

const en = {
  heroLead:
    'Every guest conversation is an opportunity to deliver exceptional hospitality, generate new revenue, and strengthen your operation.',
  stake: {
    figure: '$160B',
    /* NEEDS CONFIRM: exact figure, report, year — Eduardo sourcing. Approved for use now. */
    caption: 'In annual value and operational savings AI automation can unlock for hospitality.',
    source: 'Source: McKinsey.',
    /* v3 copy deck {#02} — single line replacing the two closing paragraphs */
    close: 'The routine, resolved automatically — your team, free for the moments that matter.',
  },
  /* v3 copy deck {#08} — the Companion OS quiet band (old 10 compressed).
     Old execution/enterpriseIntel/convergence copy deleted per deck {#07}. */
  otaStake: {
    /* NEEDS CONFIRM: figure, comparison and source — placeholder, wired to swap. */
    eyebrow: 'THE COST OF INTERMEDIARIES',
    figure: '2–3×',
    caption:
      'An OTA booking can cost 2–3× more than a direct one — 18–30% commission vs. 5–12% all-in.',
    source: 'Source: Kalibri Labs.',
    compare: [
      { label: 'OTA booking', pct: 30, note: '18–30%', accent: false },
      { label: 'Direct booking', pct: 12, note: '5–12%', accent: true },
    ],
  },
  foundingCta: 'Become a Founding Partner',
  /* v3 Phase 4 D4: old section 15 copy deleted — the ask-bar closes the page. */
}

/* Copy source: HotelCompanion__Site_Copy_ES.md {#home}. Verbatim — do not edit here. */

const es: typeof en = {
  heroLead:
    'Cada conversación con un huésped es una oportunidad para brindar una hospitalidad excepcional, generar nuevos ingresos y fortalecer tu operación.',
  stake: {
    figure: '$160 mil millones',
    /* NEEDS CONFIRM: cifra exacta, reporte, año. */
    caption: 'En valor anual y ahorros operativos que la automatización con IA puede desbloquear para la hospitalidad.',
    source: 'Fuente: McKinsey.',
    /* v3 copy deck {#02} — línea única que reemplaza los dos párrafos de cierre */
    close: 'Lo rutinario, resuelto automáticamente — tu equipo, libre para los momentos que importan.',
  },
  /* v3 copy deck {#08} — banda silenciosa de Companion OS (antigua 10 comprimida).
     El copy antiguo de execution/enterpriseIntel/convergence se elimina según deck {#07}. */
  otaStake: {
    /* NEEDS CONFIRM: cifra, comparación y fuente — provisional, listo para reemplazar. */
    eyebrow: 'EL COSTO DE LOS INTERMEDIARIOS',
    figure: '2–3×',
    caption:
      'Una reserva por OTA puede costar 2–3× más que una directa — 18–30% de comisión frente a 5–12% todo incluido.',
    source: 'Fuente: Kalibri Labs.',
    compare: [
      { label: 'Reserva por OTA', pct: 30, note: '18–30%', accent: false },
      { label: 'Reserva directa', pct: 12, note: '5–12%', accent: true },
    ],
  },
  foundingCta: 'Conviértete en Socio Fundador',
  /* v3 Fase 4 D4: el copy de la antigua sección 15 se elimina — el ask-bar cierra la página. */
}

export const homeCopy: Localized<typeof en> = { en, es }
