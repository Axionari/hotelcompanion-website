import type { Localized } from '../useCopy'

/* Source: HotelCompanion__Site_Copy.md, including the 2026-09-29 addendum. */

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
      body: 'Interested in learning how Hotel Companion can transform your guest experience? We’ll walk you through the platform, answer your questions, and explore whether we’re a good fit for your organization.',
      email: 'sales@axionari.com',
      cta: { label: 'Book a Demo', href: '/demo' },
    },
    /* Partnerships / Media & Speaking / General Inquiries removed: their
       addresses (partners@, press@, hello@) exist on no domain. */
    {
      id: 'customer-success',
      eyebrow: 'Support',
      title: 'Already talking.',
      body: 'If you’re already in conversation with us, this is the fastest way to reach us directly.',
      email: 'support@axionari.com',
    },
  ],
  hq: {
    title: 'Headquarters',
    line: 'Hotel Companion — Powered by Axionari — Serving hospitality organizations worldwide.',
  },
  schedule: {
    title: 'Schedule a Conversation',
    body: 'Rather speak with us directly? Book a personalized demonstration built around your property.',
    cta: 'Book a Demo',
  },
  founding: {
    title: 'Join the Founding Partner Program',
    body:
      'We’re looking for a small group of hospitality leaders who want to help define the next generation of intelligent guest experiences.',
    receiveLead: 'Founding partners receive:',
    items: [
      'Early access to new capabilities',
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
    sub: 'One property. A defined guest journey. A comparison and success measures agreed before launch.',
    stamp: 'measured in your pilot',
    kpis: [
      { label: 'Additional contribution', unit: '$' },
      { label: 'Completed, paid offer value', unit: '$' },
      { label: 'Offer contribution after costs', unit: '$' },
      { label: 'Guest declines respected', unit: '%' },
    ],
    youBring: {
      title: 'YOU BRING',
      items: [
        'Your approved catalogue, prices and service costs',
        'A PMS/front-desk contact',
        'A champion on property',
        'Outcome data and an agreed comparison group',
      ],
    },
    weBring: {
      title: 'WE BRING',
      items: [
        'Proposed standard pilot: no upfront software or implementation fee',
        'Property and destination knowledge, verified',
        'Contextual recommendations and hotel-approved deals',
        'An agreed share of verified additional contribution; connections scoped first',
      ],
    },
    timeline: [
      {
        marker: 'Before launch',
        text: 'We agree eligibility, supported connections, costs, measurement, commercial terms and the pilot duration before launch.',
      },
      { marker: 'During the pilot', text: 'Review guest experience, fulfillment, paid outcomes and data quality.' },
      {
        marker: 'At review',
        text: 'Review the measured additional contribution. Expand only when the evidence supports it; uncertain results are not a success claim. The hotel keeps its data.',
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

/* Source: HotelCompanion__Site_Copy_ES.md, including the 2026-09-29 addendum. */

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
      body: '¿Te interesa saber cómo Hotel Companion puede transformar tu experiencia del huésped? Te mostraremos la plataforma, responderemos tus preguntas y exploraremos si somos lo indicado para tu organización.',
      email: 'sales@axionari.com',
      cta: { label: 'Agenda una Demo', href: '/demo' },
    },
    {
      id: 'customer-success',
      eyebrow: 'Soporte',
      title: 'Ya estamos en contacto.',
      body: 'Si ya estás en conversación con nosotros, esta es la vía más directa para escribirnos.',
      email: 'support@axionari.com',
    },
  ],
  hq: {
    title: 'Oficinas',
    line: 'Hotel Companion — Construido por Axionari — Al servicio de organizaciones de hospitalidad en todo el mundo.',
  },
  schedule: {
    title: 'Agenda una Conversación',
    body: '¿Prefieres hablar directamente con nosotros? Agenda una demostración personalizada, centrada en tu propiedad.',
    cta: 'Agenda una Demo',
  },
  founding: {
    title: 'Únete al Programa de Socios Fundadores',
    body:
      'Buscamos un pequeño grupo de líderes de hospitalidad que quieran ayudar a definir la próxima generación de experiencias inteligentes para huéspedes.',
    receiveLead: 'Los socios fundadores reciben:',
    items: [
      'Acceso anticipado a nuevas capacidades',
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
    sub: 'Una propiedad. Una experiencia definida. Comparación y medidas de éxito acordadas antes de comenzar.',
    stamp: 'medido en su piloto',
    kpis: [
      { label: 'Contribución adicional', unit: '$' },
      { label: 'Valor de ofertas completadas y pagadas', unit: '$' },
      { label: 'Contribución de ofertas después de costos', unit: '$' },
      { label: 'Rechazos del huésped respetados', unit: '%' },
    ],
    youBring: {
      title: 'USTEDES PONEN',
      items: [
        'Su catálogo aprobado, precios y costos de servicio',
        'Un contacto de PMS/recepción',
        'Un responsable en la propiedad',
        'Datos de resultados y un grupo de comparación acordado',
      ],
    },
    weBring: {
      title: 'NOSOTROS PONEMOS',
      items: [
        'Propuesta de piloto estándar: sin pago inicial por software o implementación',
        'Conocimiento de la propiedad y el destino, verificado',
        'Recomendaciones con contexto y ofertas aprobadas por el hotel',
        'Parte acordada de la contribución adicional verificada; conexiones definidas antes',
      ],
    },
    timeline: [
      {
        marker: 'Antes del lanzamiento',
        text: 'Acordamos elegibilidad, conexiones compatibles, costos, medición, términos comerciales y duración antes de comenzar.',
      },
      { marker: 'Durante el piloto', text: 'Revisamos experiencia, prestación, pagos y calidad de los datos.' },
      {
        marker: 'En la revisión',
        text: 'Revisamos la contribución adicional medida. Ampliamos solo cuando la evidencia lo justifica; la incertidumbre no se presenta como éxito. El hotel conserva sus datos.',
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
