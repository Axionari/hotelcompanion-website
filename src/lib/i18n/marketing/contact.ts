import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#contact}. Verbatim. */

const en = {
  /* RC-editorial page name + act labels (Phase 5) */
  eyebrow: 'Contact',
  acts: {
    founding: 'FOUNDING PARTNERS',
    channels: 'GET IN TOUCH',
  },
  hero: {
    title: 'Let’s Build the Future of Hospitality Together.',
    /* styling only — the italic fragment of the (verbatim) title above */
    em: 'the Future of Hospitality Together.',
    body:
      'Whether you’re exploring Hotel Companion, evaluating a pilot, or simply curious about the future of Guest Intelligence, we’d love to hear from you.',
    coda: 'Every conversation starts somewhere. Let’s start one.',
  },
  channelsEyebrow: '01 · GET IN TOUCH',
  channelsTitle: 'How can we help?',
  channels: [
    {
      id: 'sales',
      eyebrow: 'Sales',
      title: 'Explore the platform.',
      body: 'Interested in learning how Hotel Companion can transform your guest experience? Our team will walk you through the platform, answer your questions, and explore whether we’re a good fit for your organization.',
      email: 'sales@hotelcompanion.ai',
      cta: { label: 'Book a Demonstration', href: '/demo' },
    },
    {
      id: 'partnerships',
      eyebrow: 'Partnerships',
      title: 'Build with us.',
      body: 'We’re building the future of hospitality with forward-thinking hotel groups, technology partners, systems integrators, and industry leaders.',
      email: 'partners@hotelcompanion.ai',
    },
    {
      id: 'customer-success',
      eyebrow: 'Customer Success',
      title: 'Already with us.',
      body: 'Already working with Hotel Companion? Our Customer Success team is here to help you maximize the value of your deployment.',
      email: 'support@hotelcompanion.ai',
    },
    {
      id: 'media',
      eyebrow: 'Media & Speaking',
      title: 'Press and events.',
      body: 'For interviews, conferences, podcasts, speaking engagements, or media inquiries.',
      email: 'press@hotelcompanion.ai',
    },
    {
      id: 'general',
      eyebrow: 'General Inquiries',
      title: 'Anything else.',
      body: 'Questions about Hotel Companion or Companion OS? We’ll make sure your message reaches the right person.',
      email: 'hello@hotelcompanion.ai',
    },
  ],
  hq: {
    title: 'Headquarters',
    line: 'Hotel Companion — Powered by Axionari — Mexico City, Mexico — Serving hospitality organizations worldwide.',
  },
  schedule: {
    title: 'Schedule a Conversation',
    body: 'Rather speak with us directly? Book a personalized demonstration with one of our hospitality specialists.',
    cta: 'Book a Demo',
  },
  founding: {
    title: 'Join the Founding Partner Program',
    body:
      'We’re looking for a small group of hospitality leaders who want to help define the next generation of intelligent guest experiences.',
    receiveLead: 'Founding partners receive:',
    items: [
      'Early access to new capabilities',
      'Direct collaboration with our product team',
      'Priority support',
      'Influence over our roadmap',
      'Preferential commercial terms',
    ],
    close: 'If you’re interested in helping shape the future of hospitality, we’d love to hear from you.',
    cta: 'Become a Founding Partner',
  },
  /* Pilot instrument (pilot-instrument pass): the founding pilot on one page.
     KPI values are deliberately blank — measured in the pilot, never invented. */
  pilot: {
    /* Rendered as the standard mono-caps kicker (design-correction pass). */
    framing: 'NOW SELECTING FOUNDING HOTEL GROUPS',
    title: 'The founding pilot, on one page.',
    sub: 'Ninety days. One property. Four numbers we agree on before we go live.',
    stamp: 'measured in your pilot',
    kpis: [
      { label: 'Direct-booking share', unit: '%' },
      { label: 'OTA commission avoided', unit: '$/mo' },
      { label: 'Upsell revenue per stay', unit: '$' },
      { label: 'After-hours requests captured', unit: 'req/wk' },
    ],
    youBring: {
      title: 'YOU BRING',
      items: [
        'Your room types and rate calendar',
        'A PMS/front-desk contact',
        'A champion on property',
        'Thirty minutes every Monday',
      ],
    },
    weBring: {
      title: 'WE BRING',
      items: [
        'Full install, weeks 1–2',
        'The Companion, live, weeks 3–12',
        'Your Monday Briefing, every week',
        'Every number instrumented from day one',
      ],
    },
    timeline: [
      {
        marker: 'Week 0',
        text: 'We set the four targets together, and the Day-90 meeting goes on the calendar before we start.',
      },
      { marker: 'Day 45', text: 'Mid-pilot review.' },
      {
        marker: 'Day 90',
        text: 'The numbers decide. If they clear the bar we set together, we plan the next property. If they don’t, we switch it off — and your data stays yours either way.',
      },
    ],
  },
  closing: {
    title: 'Every Great Partnership Begins with a Conversation.',
    body1: 'Technology doesn’t transform organizations. People do.',
    body2:
      'We’re excited to learn about your hotel, your guests, and your vision for the future of hospitality. Let’s build it together.',
    cta: 'Get in Touch',
  },
}

/* Copy source: HotelCompanion__Site_Copy_ES.md {#contact}. Verbatim. */

const es: typeof en = {
  /* Nombre de página + etiquetas de actos RC-editorial (Fase 5) */
  eyebrow: 'Contacto',
  acts: {
    founding: 'SOCIOS FUNDADORES',
    channels: 'PONTE EN CONTACTO',
  },
  hero: {
    title: 'Construyamos Juntos el Futuro de la Hospitalidad.',
    /* solo estilo — el fragmento en itálica del título (verbatim) de arriba */
    em: 'el Futuro de la Hospitalidad.',
    body:
      'Ya sea que estés explorando Hotel Companion, evaluando un piloto o simplemente con curiosidad sobre el futuro de la Inteligencia de Huéspedes, nos encantaría saber de ti.',
    coda: 'Toda conversación comienza en algún lugar. Comencemos una.',
  },
  channelsEyebrow: '01 · PONTE EN CONTACTO',
  channelsTitle: '¿Cómo podemos ayudarte?',
  channels: [
    {
      id: 'sales',
      eyebrow: 'Ventas',
      title: 'Explora la plataforma.',
      body: '¿Te interesa saber cómo Hotel Companion puede transformar tu experiencia del huésped? Nuestro equipo te mostrará la plataforma, responderá tus preguntas y explorará si somos lo indicado para tu organización.',
      email: 'sales@hotelcompanion.ai',
      cta: { label: 'Agenda una Demostración', href: '/demo' },
    },
    {
      id: 'partnerships',
      eyebrow: 'Alianzas',
      title: 'Construye con nosotros.',
      body: 'Estamos construyendo el futuro de la hospitalidad con grupos hoteleros visionarios, socios tecnológicos, integradores y líderes de la industria.',
      email: 'partners@hotelcompanion.ai',
    },
    {
      id: 'customer-success',
      eyebrow: 'Éxito del Cliente',
      title: 'Ya trabajas con nosotros.',
      body: '¿Ya trabajas con Hotel Companion? Nuestro equipo de Éxito del Cliente está aquí para ayudarte a maximizar el valor de tu despliegue.',
      email: 'support@hotelcompanion.ai',
    },
    {
      id: 'media',
      eyebrow: 'Prensa y Conferencias',
      title: 'Prensa y eventos.',
      body: 'Para entrevistas, congresos, pódcast, conferencias o consultas de medios.',
      email: 'press@hotelcompanion.ai',
    },
    {
      id: 'general',
      eyebrow: 'Consultas Generales',
      title: 'Cualquier otro tema.',
      body: '¿Preguntas sobre Hotel Companion o Companion OS? Nos aseguraremos de que tu mensaje llegue a la persona correcta.',
      email: 'hello@hotelcompanion.ai',
    },
  ],
  hq: {
    title: 'Oficinas',
    line: 'Hotel Companion — Construido por Axionari — Ciudad de México, México — Al servicio de organizaciones de hospitalidad en todo el mundo.',
  },
  schedule: {
    title: 'Agenda una Conversación',
    body: '¿Prefieres hablar directamente con nosotros? Agenda una demostración personalizada con uno de nuestros especialistas en hospitalidad.',
    cta: 'Agenda una Demo',
  },
  founding: {
    title: 'Únete al Programa de Socios Fundadores',
    body:
      'Buscamos un pequeño grupo de líderes de hospitalidad que quieran ayudar a definir la próxima generación de experiencias inteligentes para huéspedes.',
    receiveLead: 'Los socios fundadores reciben:',
    items: [
      'Acceso anticipado a nuevas capacidades',
      'Colaboración directa con nuestro equipo de producto',
      'Soporte prioritario',
      'Influencia sobre nuestra hoja de ruta',
      'Condiciones comerciales preferentes',
    ],
    close: 'Si te interesa ayudar a dar forma al futuro de la hospitalidad, nos encantaría saber de ti.',
    cta: 'Conviértete en Socio Fundador',
  },
  /* Instrumento del piloto: los valores de KPI van en blanco a propósito —
     se miden en el piloto, nunca se inventan. */
  pilot: {
    framing: 'SELECCIONANDO A LOS GRUPOS HOTELEROS FUNDADORES',
    title: 'El piloto fundador, en una página.',
    sub: 'Noventa días. Una propiedad. Cuatro números que acordamos antes de arrancar.',
    stamp: 'medido en tu piloto',
    kpis: [
      { label: 'Participación de reserva directa', unit: '%' },
      { label: 'Comisión OTA evitada', unit: '$/mes' },
      { label: 'Ingreso por upsell por estancia', unit: '$' },
      { label: 'Solicitudes fuera de horario capturadas', unit: 'sol/sem' },
    ],
    youBring: {
      title: 'USTEDES PONEN',
      items: [
        'Sus tipos de habitación y calendario de tarifas',
        'Un contacto de PMS/recepción',
        'Un responsable en la propiedad',
        'Treinta minutos cada lunes',
      ],
    },
    weBring: {
      title: 'NOSOTROS PONEMOS',
      items: [
        'Instalación completa, semanas 1–2',
        'El Companion en vivo, semanas 3–12',
        'Su Briefing de los lunes, cada semana',
        'Cada número instrumentado desde el día uno',
      ],
    },
    timeline: [
      {
        marker: 'Semana 0',
        text: 'Fijamos juntos las cuatro metas, y la reunión del día 90 queda agendada antes de arrancar.',
      },
      { marker: 'Día 45', text: 'Revisión de medio piloto.' },
      {
        marker: 'Día 90',
        text: 'Deciden los números. Si superan la meta que fijamos juntos, planeamos la siguiente propiedad. Si no, lo apagamos — y sus datos se quedan con ustedes, pase lo que pase.',
      },
    ],
  },
  closing: {
    title: 'Toda Gran Alianza Comienza con una Conversación.',
    body1: 'La tecnología no transforma organizaciones. Las personas lo hacen.',
    body2:
      'Nos entusiasma conocer tu hotel, tus huéspedes y tu visión para el futuro de la hospitalidad. Construyámoslo juntos.',
    cta: 'Ponte en Contacto',
  },
}

export const contactCopy: Localized<typeof en> = { en, es }
