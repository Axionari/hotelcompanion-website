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
  closing: {
    title: 'Toda Gran Alianza Comienza con una Conversación.',
    body1: 'La tecnología no transforma organizaciones. Las personas lo hacen.',
    body2:
      'Nos entusiasma conocer tu hotel, tus huéspedes y tu visión para el futuro de la hospitalidad. Construyámoslo juntos.',
    cta: 'Ponte en Contacto',
  },
}

export const contactCopy: Localized<typeof en> = { en, es }
