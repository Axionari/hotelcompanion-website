import type { Localized } from '../useCopy'

/* Copy source: docs/v4/V4_BUILD_KIT.md §3 — VERBATIM LAW.
   Where a §3 line is marked [v3] and the line exists in docs/v3/02_COPY_DECK.md
   (or its ADDENDA), the v3 string is authoritative per the kit’s own rule; the
   resolved conflicts are logged in OPEN_QUESTIONS.md OQ-10.
   14 conversations / $250 / 10:04 / 18:40 / 02:14 / 10:12:
   /* ILLUSTRATIVE — audit before production promotion */

const en = {
  actI: {
    wordmark: 'HOTEL COMPANION',
    coords: 'N 20.2114° · W 87.4654°',
    /* Chapter kicker 01 — the numbered 01–07 sequence now starts at the hero
       (system-coherence pass), superseding the earlier no-eyebrow rule. */
    kicker: '01 · HOTEL COMPANION',
    h1Line1: 'A Front Desk That Never Sleeps.',
    h1Line2: 'A Concierge That Never Forgets.',
    strip: 'NO FORM · NO BROCHURE · THIS IS THE PRODUCT',
    proof: '0% OTA COMMISSION · 24/7 · IN EVERY LANGUAGE · MEASURED FROM DAY ONE',
  },
  actII: {
    eyebrow: "02 · WHAT’S AT STAKE",
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
    receipt214: ['→ ENGINEERING · ', 'ROOM 214', ' · 02:14', "GUEST’S EXACT WORDS ATTACHED"],
  },
  actIV: {
    eyebrow: '04 · EVERY SURFACE',
    statementPre: 'One conversation. ',
    statementHi: "Every screen in the guest’s world.",
    closingPre: 'Five screens. One memory. ',
    closingHi: 'She never repeated herself once.',
  },
  actV: {
    eyebrow: '05 · INTELLIGENCE & EXECUTION',
    statementPre: 'Every conversation becomes ',
    statementHi: 'intelligence',
    statementPost: ' — and execution.',
    /* operations feed: device-UI. A `revenue` starting with "+" is captured $;
       otherwise it renders as a resolved-status badge. */
    liveLabel: 'SIMULATED NIGHT · DEMO PROPERTY: MARAZUL',
    feedCaption:
      'A simulated evening at our demo property — this is the operations view your team would watch.',
    capturedLabel: 'Captured tonight',
    captured: '+$415',
    rows: [
      { route: '→ FRONT DESK · ', item: 'LATE CHECKOUT', tail: '', revenue: '+$45', time: '10:04' },
      { route: '→ CONCIERGE · ', item: 'AIRPORT PICKUP', tail: '', revenue: '+$120', time: '10:12' },
      { route: '→ RESERVATIONS · ', item: 'SUITE UPGRADE', tail: '', revenue: '+$250', time: '18:40' },
      { route: '→ ENGINEERING · ', item: 'ROOM 214 · AC NOT WORKING', tail: ' · MAINTENANCE ALERT', revenue: 'STAFF NOTIFIED', time: '02:14' },
    ],
    footerPre: 'Tracked from creation to completion. Tonight: 14 conversations · ',
    footerHi: '0 woke your staff.',
  },
  actVI: {
    eyebrow: '06 · DEPLOYMENT',
    /* P5.13 — deployment claim reframed: promise the architecture, not a
       calendar. The knowledge layer needs no integration, so value lands
       before the first system is connected; integrations follow staged.
       NEEDS CONFIRM (Eduardo): replaces "Live in Days. Not Months." */
    statementPre: 'Value ',
    statementHi: 'before integration.',
    line: "It doesn’t replace your systems. It understands the conversations between them.",
    line2: 'The Companion starts answering guests before a single system is connected. PMS, POS and payments follow in a staged rollout — measured together, live in weeks.',
    chips: ['STAGED ROLLOUT', 'ROLE-BASED ACCESS', 'ENCRYPTED', 'PRIVACY-FIRST', 'WORKS WITH YOUR PMS'],
  },
  actVII: {
    eyebrow: '07 · NEXT STEP',
    statementLine1: 'Stop reading about it.',
    statementLine2: 'See it answer.',
    /* Rendered as the standard mono-caps kicker (site-audit ruling #1). */
    partnerLine: 'NOW SELECTING FOUNDING HOTEL GROUPS',
    /* ADDENDUM 2: the founding CTA retired — the primary action is the site’s
       Book a Demo string; /contact#founding is the program’s canonical home */
    signoff: 'POWERED BY AXIONARI',
  },
}

const es: typeof en = {
  actI: {
    wordmark: 'HOTEL COMPANION',
    coords: 'N 20.2114° · W 87.4654°',
    kicker: '01 · HOTEL COMPANION',
    h1Line1: 'Una Recepción Que Nunca Duerme.',
    h1Line2: 'Un Concierge Que Nunca Olvida.',
    strip: 'SIN FORMULARIO · SIN FOLLETO · ESTO ES EL PRODUCTO',
    proof: '0% COMISIÓN OTA · 24/7 · EN CADA IDIOMA · MEDIDO DESDE EL DÍA UNO',
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
    liveLabel: 'NOCHE SIMULADA · PROPIEDAD DEMO: MARAZUL',
    feedCaption:
      'Una noche simulada en nuestra propiedad demo — esta es la vista de operaciones que vería tu equipo.',
    capturedLabel: 'Capturado esta noche',
    captured: '+$415',
    rows: [
      { route: '→ RECEPCIÓN · ', item: 'SALIDA TARDÍA', tail: '', revenue: '+$45', time: '10:04' },
      { route: '→ CONCIERGE · ', item: 'TRASLADO AL AEROPUERTO', tail: '', revenue: '+$120', time: '10:12' },
      { route: '→ RESERVAS · ', item: 'MEJORA DE SUITE', tail: '', revenue: '+$250', time: '18:40' },
      { route: '→ INGENIERÍA · ', item: 'HAB 214 · AIRE NO FUNCIONA', tail: ' · ALERTA DE MANTENIMIENTO', revenue: 'EQUIPO NOTIFICADO', time: '02:14' },
    ],
    /* [v3 A3] ADDENDUM_1 */
    footerPre: 'Rastreado de inicio a fin. Esta noche: 14 conversaciones · ',
    footerHi: '0 despertaron a tu equipo.',
  },
  actVI: {
    eyebrow: '06 · IMPLEMENTACIÓN',
    /* P5.13 — NEEDS CONFIRM: reemplaza "En Marcha en Días. No en Meses." */
    statementPre: 'Valor ',
    statementHi: 'antes de la integración.',
    line: 'No reemplaza tus sistemas. Entiende las conversaciones entre ellos.',
    line2: 'El Companion empieza a responder a los huéspedes antes de conectar un solo sistema. PMS, POS y pagos llegan después, en una implementación por etapas — medida en conjunto, en vivo en semanas.',
    /* [v3 trust strings] — v3 security vocabulary, chip-length (OQ-10) */
    chips: [
      'IMPLEMENTACIÓN POR ETAPAS',
      'ACCESO BASADO EN ROLES',
      'CIFRADO',
      'CENTRADO EN LA PRIVACIDAD',
      'FUNCIONA CON TU PMS',
    ],
  },
  actVII: {
    eyebrow: '07 · SIGUIENTE PASO',
    statementLine1: 'Deja de leerlo.',
    statementLine2: 'Míralo responder.',
    partnerLine: 'SELECCIONANDO A LOS GRUPOS HOTELEROS FUNDADORES',
    signoff: 'POWERED BY AXIONARI',
  },
}

export const v4Copy: Localized<typeof en> = { en, es }
