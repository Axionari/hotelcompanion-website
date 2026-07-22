import type { Localized } from '../useCopy'
import type { ReceiptSeg } from '@/components/cds/ReceiptCard'

/* v3 copy deck {#demo} — Phase 4 strings, verbatim.
   D2 greeting · Scenario A (Akumal, upgraded anatomy) · Scenario B (day-planner).
   $10 / $95: ILLUSTRATIVE — audit before production promotion */

const en = {
  /* D2 — recognition greeting on open */
  greeting: 'Good afternoon, Maya · Suite 214',
  scenarioA: {
    contextChip: 'SEA TURTLES BEFORE 11 AM',
    metadata: '20 MIN · TAXI $10',
    /* G3: **…** renders <strong> */
    reply: 'The water is clearest early. Say **"book it"** and I\'ll hold the taxi for 9.',
    receipt: [
      [
        { t: 'check', s: '✓' },
        { t: 'text', s: 'TAXI BOOKED · 9:00 · CHARGED TO ROOM' },
      ],
    ] as ReceiptSeg[][],
  },
  scenarioB: {
    chip: 'Plan our last day',
    rows: [
      { time: '9:00', title: 'Cenote Dos Ojos', note: '40 min · quietest before 10', chip: 'Driver booked', image: '/assets/breathers/waterfall-lagoon.webp' },
      { time: '13:30', title: 'Lunch in the pueblo', note: 'where the locals eat', chip: null, image: '/assets/ui/dish-2.webp' },
      { time: '17:30', title: 'Back for the chocolate ritual', note: 'Spa Ixchel · your 5:30 reservation', chip: 'Held for you', image: '/assets/ui/spa-1.webp' },
    ],
    route: '78 KM · ONE DRIVER ALL DAY · $95',
    closer: 'Everything timed around your spa booking. Say **"book the day"**.',
    button: 'Book the day',
    receipt: [
      [
        { t: 'check', s: '✓' },
        { t: 'text', s: 'DAY BOOKED · 3 STOPS · ONE DRIVER ·' },
        { t: 'money', s: '$95' },
      ],
    ] as ReceiptSeg[][],
  },
  /* D4 — the ask-bar close (deck {#13} headline; italic serif on the hi part) */
  askClose: {
    pre: 'Stop reading about it. ',
    hi: 'Ask it something.',
  },
}

const es: typeof en = {
  greeting: 'Buenas tardes, Maya · Suite 214',
  scenarioA: {
    contextChip: 'TORTUGAS ANTES DE LAS 11 AM',
    metadata: '20 MIN · TAXI $10',
    reply: 'El agua está más clara temprano. Di **"resérvalo"** y aparto el taxi para las 9.',
    receipt: [
      [
        { t: 'check', s: '✓' },
        { t: 'text', s: 'TAXI RESERVADO · 9:00 · A LA CUENTA DE LA HABITACIÓN' },
      ],
    ] as ReceiptSeg[][],
  },
  scenarioB: {
    chip: 'Planea nuestro último día',
    rows: [
      { time: '9:00', title: 'Cenote Dos Ojos', note: '40 min · más tranquilo antes de las 10', chip: 'Chofer reservado', image: '/assets/breathers/waterfall-lagoon.webp' },
      { time: '13:30', title: 'Comida en el pueblo', note: 'donde comen los locales', chip: null, image: '/assets/ui/dish-2.webp' },
      { time: '17:30', title: 'De vuelta para el ritual de chocolate', note: 'Spa Ixchel · tu reserva de las 5:30', chip: 'Apartado para ti', image: '/assets/ui/spa-1.webp' },
    ],
    route: '78 KM · UN CHOFER TODO EL DÍA · $95',
    closer: 'Todo alineado con tu reserva del spa. Di **"reserva el día"**.',
    button: 'Reservar el día',
    receipt: [
      [
        { t: 'check', s: '✓' },
        { t: 'text', s: 'DÍA RESERVADO · 3 PARADAS · UN CHOFER ·' },
        { t: 'money', s: '$95' },
      ],
    ] as ReceiptSeg[][],
  },
  askClose: {
    pre: 'Deja de leerlo. ',
    hi: 'Pregúntale algo.',
  },
}

export const demoV3Copy: Localized<typeof en> = { en, es }
