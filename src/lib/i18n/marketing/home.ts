import type { Localized } from '../useCopy'
import type { ScreenId } from './deviceScreens'

/* Copy source: HotelCompanion__Site_Copy.md {#home}. Verbatim — do not edit here. */

const en = {
  heroLead:
    'The Guest Intelligence Platform that transforms every guest conversation into intelligence, action, and revenue.',
  /* P5.5 — framing for the in-room tablet showcase. Statement reuses the
     approved journey line ("Every answer is a picture"); eyebrow is a label. */
  tabletShowcase: {
    eyebrow: 'THE IN-ROOM COMPANION',
    statement: 'Every answer is a picture.',
    caption: 'Speak or tap, in any language. The guest asks in their own words; the Companion answers on the screen — one tap from booked.',
  },
  /* P5.7 — framing for the guest-question marquee (the signature slider). */
  marquee: {
    eyebrow: 'WHAT GUESTS ACTUALLY ASK',
    statement: 'Hospitality begins with a question.',
  },
  /* P5.13 — the "before" diagram (RC homepage §02 applied to hotels), setting
     up IntelligentLayer's answer. Statement is the approved Axionari line
     (sales.axionari.com); the deck is its hotel application. */
  fragmentation: {
    eyebrow: 'THE PROBLEM',
    statementPre: 'Data exists everywhere. ',
    statementHi: 'Context exists nowhere.',
    deck: 'Every system holds a piece of the guest. No system holds the guest.',
    center: 'The guest',
    systems: ['PMS', 'Booking engine', 'Front desk', 'WhatsApp', 'Spa system', 'POS', 'Housekeeping', 'OTA inbox'],
    markers: ['CONTEXT LOST', 'ASKED TWICE', 'STARTS OVER'],
  },
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
    'La Plataforma de Inteligencia de Huéspedes que convierte cada conversación con el huésped en inteligencia, acción e ingresos.',
  tabletShowcase: {
    eyebrow: 'EL COMPANION EN LA HABITACIÓN',
    statement: 'Cada respuesta es una imagen.',
    caption: 'Habla o toca, en cualquier idioma. El huésped pregunta con sus propias palabras; el Companion responde en la pantalla — a un toque de reservar.',
  },
  marquee: {
    eyebrow: 'LO QUE LOS HUÉSPEDES REALMENTE PREGUNTAN',
    statement: 'La hospitalidad comienza con una pregunta.',
  },
  fragmentation: {
    eyebrow: 'EL PROBLEMA',
    statementPre: 'Los datos existen en todas partes. ',
    statementHi: 'El contexto no existe en ninguna.',
    deck: 'Cada sistema tiene un pedazo del huésped. Ningún sistema tiene al huésped.',
    center: 'El huésped',
    systems: ['PMS', 'Motor de reservas', 'Recepción', 'WhatsApp', 'Sistema de spa', 'POS', 'Ama de llaves', 'Bandeja OTA'],
    markers: ['CONTEXTO PERDIDO', 'PREGUNTADO DOS VECES', 'VUELVE A EMPEZAR'],
  },
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
