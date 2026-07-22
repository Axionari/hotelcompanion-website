import type { Localized } from '../useCopy'

/* v3 copy deck {#07} — Cards B (GuestMemoryCard) and C (RequestExecutionCard).
   Card C footer per ADDENDUM_1 A3 (supersedes the deck's footer line). */

const en = {
  memory: {
    title: 'GUEST MEMORY',
    body: 'Maya returns in November. The Companion already knows:',
    chips: ['ocean view', 'vegetarian', 'anniversary in Nov', 'sunrise yoga', 'speaks Spanish', 'late checkout'],
    footer: 'Familiar from the very first message.',
  },
  execution: {
    title: 'REQUEST → EXECUTION',
    rows: [
      { quote: '"There\'s water on the bathroom floor"', time: '02:14', route: '→ ENGINEERING' },
      { quote: '"Table for two at eight"', time: '19:12', route: '→ RESTAURANT' },
      { quote: '"Late checkout tomorrow?"', time: '21:40', route: '→ FRONT OFFICE' },
      { quote: '"Taxi to the airport at 6am"', time: '22:05', route: '→ TRANSPORTATION' },
    ],
    /* ADDENDUM_1 A3. "0 woke your staff" renders in --text (hi-contrast).
       14 conversations: ILLUSTRATIVE — audit before production promotion */
    footerPre: 'Tracked from creation to completion. Tonight: 14 conversations · ',
    footerHi: '0 woke your staff',
    footerPost: '.',
  },
}

const es: typeof en = {
  memory: {
    title: 'MEMORIA DEL HUÉSPED',
    body: 'Maya vuelve en noviembre. El Companion ya sabe:',
    chips: ['vista al mar', 'vegetariana', 'aniversario en nov', 'yoga al amanecer', 'habla español', 'salida tardía'],
    footer: 'Familiar desde el primer mensaje.',
  },
  execution: {
    title: 'SOLICITUD → EJECUCIÓN',
    rows: [
      { quote: '"Hay agua en el piso del baño"', time: '02:14', route: '→ INGENIERÍA' },
      { quote: '"Mesa para dos a las ocho"', time: '19:12', route: '→ RESTAURANTE' },
      { quote: '"¿Salida tardía mañana?"', time: '21:40', route: '→ RECEPCIÓN' },
      { quote: '"Taxi al aeropuerto a las 6am"', time: '22:05', route: '→ TRANSPORTE' },
    ],
    /* ADDENDUM_1 A3. `0 despertaron a tu equipo` en --text (alto contraste).
       14 conversaciones: ILLUSTRATIVE — audit before production promotion */
    footerPre: 'Rastreado de inicio a fin. Esta noche: 14 conversaciones · ',
    footerHi: '0 despertaron a tu equipo',
    footerPost: '.',
  },
}

export const intelExecCopy: Localized<typeof en> = { en, es }
