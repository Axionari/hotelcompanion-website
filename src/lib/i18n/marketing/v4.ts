import type { Localized } from '../useCopy'

/* Copy source: docs/v4/V4_BUILD_KIT.md §3 — VERBATIM LAW.
   Where a §3 line is marked [v3] and the line exists in docs/v3/02_COPY_DECK.md
   (or its ADDENDA), the v3 string is authoritative per the kit's own rule; the
   resolved conflicts are logged in OPEN_QUESTIONS.md OQ-10.
   14 conversations / $250 / 10:04 / 18:40 / 02:14 / 10:12:
   /* ILLUSTRATIVE — audit before production promotion */

const en = {
  actI: {
    wordmark: 'HOTEL COMPANION',
    coords: 'N 20.2114° · W 87.4654°',
    eyebrow: 'THE VOICE-FIRST GUEST INTELLIGENCE PLATFORM FOR HOTELS',
    h1Line1: 'Understand Every Guest.',
    h1Line2: 'Capture Every Opportunity.',
    strip: 'NO FORM · NO BROCHURE · THIS IS THE PRODUCT',
    proof: '0% OTA COMMISSION · 24/7 · IN EVERY LANGUAGE · LIVE IN DAYS',
  },
  actII: {
    eyebrow: "02 · WHAT'S AT STAKE",
    figure1: '2–3×',
    line1: 'What an OTA booking costs versus direct.',
    source1: 'SOURCE: KALIBRI LABS.',
    figure2: '$160B',
    line2: 'Waiting inside AI-run hospitality operations.',
    source2: 'SOURCE: MCKINSEY.',
  },
  actIII: {
    eyebrow: '03 · ONE DAY, ONE VOICE',
    statementPre:
      'The booking, the upsell, the 2AM save — each begins as a question. The Companion closes what it answers. ',
    statementHi: 'No OTA in between.',
    moments: [
      { time: '10:04', tag: 'TABLET' },
      { time: '18:40', tag: 'DUSK · PHONE' },
      { time: '02:14', tag: 'VOICE · LIGHTS OFF' },
    ],
    /* device-UI below (cards ported from the v3 arc stops) */
    bubble1: '"Best beach near here?"',
    bubble2: '"Can we upgrade to an ocean view?"',
    bubble3: '"There\'s water on the bathroom floor."',
    suitePrice: '$250/night',
    receipt214: ['→ ENGINEERING · ', 'ROOM 214', ' · 02:14', "GUEST'S EXACT WORDS ATTACHED"],
  },
  actIV: {
    eyebrow: '04 · EVERY SURFACE',
    statementPre: 'One conversation. ',
    statementHi: "Every screen in the guest's world.",
    closingPre: 'Five screens. One memory. ',
    closingHi: 'She never repeated herself once.',
  },
  actV: {
    eyebrow: '05 · INTELLIGENCE & EXECUTION',
    statementPre: 'Every conversation becomes ',
    statementHi: 'intelligence',
    statementPost: ' — and execution.',
    /* receipt rows: device-UI */
    rows: [
      { route: '→ FRONT DESK · ', item: 'LATE CHECKOUT', tail: '', time: '10:04' },
      { route: '→ CONCIERGE · ', item: 'TAXI TO AKUMAL', tail: '', time: '10:12' },
      { route: '→ RESERVATIONS · ', item: 'SUITE UPGRADE', tail: '', time: '18:40' },
      { route: '→ ENGINEERING · ', item: 'ROOM 214', tail: ' · WORDS ATTACHED', time: '02:14' },
    ],
    footerPre: 'Tracked from creation to completion. Tonight: 14 conversations · ',
    footerHi: '0 woke your staff.',
  },
  actVI: {
    eyebrow: '06 · DEPLOYMENT',
    statementPre: 'Live in Days. ',
    statementHi: 'Not Months.',
    line: "It doesn't replace your systems. It understands the conversations between them.",
    chips: ['LIVE IN DAYS', 'ROLE-BASED ACCESS', 'ENCRYPTED', 'PRIVACY-FIRST', 'WORKS WITH YOUR PMS'],
  },
  actVII: {
    eyebrow: '07 · NEXT STEP',
    statementLine1: 'Stop reading about it.',
    statementLine2: 'Ask it something.',
    partnerLine: 'Now partnering with a limited number of visionary hotel groups.',
    /* ADDENDUM 2: the founding CTA retired — the primary action is the site's
       Book a Demo string; /contact#founding is the program's canonical home */
    signoff: 'POWERED BY AXIONARI',
  },
}

const es: typeof en = {
  actI: {
    wordmark: 'HOTEL COMPANION',
    coords: 'N 20.2114° · W 87.4654°',
    eyebrow: 'LA PLATAFORMA DE INTELIGENCIA DE HUÉSPEDES POR VOZ PARA HOTELES',
    /* [v3] — hero copy unchanged in the v3 deck → shipped v3 string (OQ-10) */
    h1Line1: 'Entiende a Cada Huésped.',
    h1Line2: 'Aprovecha Cada Oportunidad.',
    strip: 'SIN FORMULARIO · SIN FOLLETO · ESTO ES EL PRODUCTO',
    /* [v3] deck {#01}: EN CADA IDIOMA · EN MARCHA EN DÍAS (OQ-10) */
    proof: '0% COMISIÓN OTA · 24/7 · EN CADA IDIOMA · EN MARCHA EN DÍAS',
  },
  actII: {
    eyebrow: '02 · LO QUE ESTÁ EN JUEGO',
    figure1: '2–3×',
    line1: 'Lo que cuesta una reserva por OTA frente a una directa.',
    source1: 'FUENTE: KALIBRI LABS.',
    figure2: '$160 mil millones',
    line2: 'Esperando dentro de la hospitalidad operada con IA.',
    source2: 'FUENTE: MCKINSEY.',
  },
  actIII: {
    eyebrow: '03 · UN DÍA, UNA VOZ',
    statementPre:
      'La reserva, la mejora, el rescate de las 2AM — cada uno empieza como una pregunta. El Companion las responde y las cierra. ',
    statementHi: 'Sin OTA de por medio.',
    moments: [
      { time: '10:04', tag: 'TABLET' },
      { time: '18:40', tag: 'ATARDECER · TELÉFONO' },
      { time: '02:14', tag: 'VOZ · A OSCURAS' },
    ],
    bubble1: '«¿La mejor playa cerca?»',
    bubble2: '«¿Podemos mejorar a vista al mar?»',
    bubble3: '«Hay agua en el piso del baño.»',
    suitePrice: '$250/noche',
    /* [v3] deck {#04} stop 4: PALABRAS EXACTAS ADJUNTAS (OQ-10) */
    receipt214: ['→ INGENIERÍA · ', 'HAB 214', ' · 02:14', 'PALABRAS EXACTAS ADJUNTAS'],
  },
  actIV: {
    eyebrow: '04 · CADA SUPERFICIE',
    statementPre: 'Una conversación. ',
    statementHi: 'Cada pantalla del mundo del huésped.',
    closingPre: 'Cinco pantallas. Una memoria. ',
    closingHi: 'Nunca tuvo que repetirse.',
  },
  actV: {
    eyebrow: '05 · INTELIGENCIA Y EJECUCIÓN',
    /* [v3] deck {#07}: … — y en ejecución. (OQ-10) */
    statementPre: 'Cada conversación se convierte en ',
    statementHi: 'inteligencia',
    statementPost: ' — y en ejecución.',
    rows: [
      { route: '→ RECEPCIÓN · ', item: 'SALIDA TARDÍA', tail: '', time: '10:04' },
      { route: '→ CONCIERGE · ', item: 'TAXI A AKUMAL', tail: '', time: '10:12' },
      { route: '→ RESERVAS · ', item: 'MEJORA DE SUITE', tail: '', time: '18:40' },
      { route: '→ INGENIERÍA · ', item: 'HAB 214', tail: ' · PALABRAS ADJUNTAS', time: '02:14' },
    ],
    /* [v3 A3] ADDENDUM_1 */
    footerPre: 'Rastreado de inicio a fin. Esta noche: 14 conversaciones · ',
    footerHi: '0 despertaron a tu equipo.',
  },
  actVI: {
    eyebrow: '06 · IMPLEMENTACIÓN',
    /* [v3] — title unchanged in the v3 deck → shipped v3 string (OQ-10) */
    statementPre: 'En Marcha en Días. ',
    statementHi: 'No en Meses.',
    line: 'No reemplaza tus sistemas. Entiende las conversaciones entre ellos.',
    /* [v3 trust strings] — v3 security vocabulary, chip-length (OQ-10) */
    chips: [
      'EN MARCHA EN DÍAS',
      'ACCESO BASADO EN ROLES',
      'CIFRADO',
      'CENTRADO EN LA PRIVACIDAD',
      'FUNCIONA CON TU PMS',
    ],
  },
  actVII: {
    eyebrow: '07 · SIGUIENTE PASO',
    /* [v3] deck {#13}: Deja de leerlo. Pregúntale algo. (OQ-10) */
    statementLine1: 'Deja de leerlo.',
    statementLine2: 'Pregúntale algo.',
    partnerLine: 'Ahora nos asociamos con un número limitado de grupos hoteleros visionarios.',
    signoff: 'POWERED BY AXIONARI',
  },
}

export const v4Copy: Localized<typeof en> = { en, es }
