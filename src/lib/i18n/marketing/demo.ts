import type { Localized } from '../useCopy'

/* Source: HotelCompanion__Site_Copy.md, including the 2026-09-29 addendum. */

const en = {
  hero: {
    title: 'Book a Personalized Demonstration',
    /* styling only — the italic fragment of the (verbatim) title above */
    em: 'Personalized Demonstration',
    body1:
      'Discover how Hotel Companion helps hotels understand every guest, increase revenue, and coordinate operations through conversational intelligence.',
    cta: 'Schedule Your Demonstration',
  },
  /* RC-editorial act labels (Phase 5) */
  acts: {
    why: 'WHY A DEMO',
    session: 'THE SESSION',
    who: 'WHO SHOULD ATTEND',
    request: 'THE REQUEST',
    deployment: 'DEPLOYMENT',
    faq: 'FAQ',
  },
  why: {
    title: 'Why schedule a demo?',
    reasons: [
      { title: 'See Hotel Companion on your own property.' },
      { title: 'Discover hidden operational opportunities.' },
      { title: 'Explore deployment in under 30 minutes.' },
    ],
  },
  experience: {
    lead: 'Every demonstration is personalized, but typically includes:',
  },
  who: {
    /* condensed verbatim fragment of the FAQ answer {#demo} */
    lead: 'From boutique properties to global hospitality groups.',
    roles: [
      'Hotel Owners',
      'General Managers',
      'Operations Directors',
      'Revenue Managers',
      'Guest Experience Leaders',
      'Digital Transformation Teams',
      'IT Directors',
      'Hotel Management Companies',
      'Multi-Property Groups',
      'Luxury Hospitality Brands',
      'Boutique Hotels',
      'Resorts',
    ],
  },
  expect: {
    title: 'What to Expect',
  },
  agenda: {
    title: 'Typical Agenda',
    items: [
      {
        title: 'Understanding Your Property',
        body: 'Property type. Guest profile. Current technology stack. Operational priorities. Business goals.',
      },
      {
        title: 'Guided Product Demonstration',
        body: 'Voice and text on mobile and desktop web. Contextual recommendations. Approved deals. Service requests. Companion Control.',
      },
      { title: 'Companion OS', body: 'Knowledge. Memory. Reasoning. Workflow orchestration. Analytics.' },
      {
        title: 'Questions & Discussion',
        body: 'Your current challenges, questions, and how Hotel Companion could fit into your operation.',
      },
    ],
  },
  deployment: {
    title: 'From Demonstration to Deployment',
    stages: [
      { title: 'Discovery', body: 'Understanding your operation, workflows, knowledge, and guest experience.' },
      {
        title: 'Knowledge Configuration',
        body: 'Importing your hotel’s information, policies, amenities, destination knowledge, and operational procedures.',
      },
      {
        title: 'Platform Configuration',
        body: 'Voice. Brand personality. Languages. Workflows. Department routing. Enterprise settings.',
      },
      { title: 'Team Onboarding', body: 'Training your staff and administrators.' },
      {
        title: 'Go Live',
        body: 'Launch the agreed scope, verify outcomes and compare results before expanding automation.',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'Do we need anything ready before the demo?',
        a: 'No preparation required. It helps if someone who knows your daily operation is in the room, but we come to you — the session is built around your property, not a generic script.',
      },
      {
        q: 'Is this a live product or a concept?',
        a: 'You will see a guided product demonstration. We distinguish working capabilities, illustrative scenarios and the connections your hotel would need before launch.',
      },
      {
        q: 'How do guests use it?',
        a: 'Guests speak or type on mobile and desktop web, opening a link or QR code without installing an app. Telephone and WhatsApp connections are scoped for the pilot. In-room tablets are optional, with hardware and setup covered by the hotel.',
      },
      {
        q: 'How is this different from a guest messaging platform?',
        a: 'Messaging tools move words between people. Hotel Companion turns those conversations into operational intelligence — context that routes the work and reaches every department. The conversation is the input, not the product.',
      },
      {
        q: 'Does it replace our systems or our staff?',
        a: 'Neither. It sits above the systems you already run and resolves the routine so your team is free for the moments that matter.',
      },
      {
        q: 'How long does implementation take?',
        a: 'We agree launch timing after defining the pilot scope, reviewing property knowledge and confirming the workflows. Any PMS, POS or payment connections are scoped separately and depend on provider access, validation and approvals.',
      },
      {
        q: 'Is guest information secure?',
        a: 'Yes. Encryption, role-based access, and privacy-first governance are foundational principles of Companion OS.',
      },
      {
        q: 'Is this only for luxury hotels?',
        a: 'No. From boutique properties to global hospitality groups — any hotel that believes exceptional guest experience creates long-term business value.',
      },
    ],
  },
}

/* Source: HotelCompanion__Site_Copy_ES.md, including the 2026-09-29 addendum. */

const es: typeof en = {
  hero: {
    title: 'Agenda una Demostración Personalizada',
    /* solo estilo — el fragmento en itálica del título (verbatim) de arriba */
    em: 'Demostración Personalizada',
    body1:
      'Descubre cómo Hotel Companion ayuda a los hoteles a entender a cada huésped, aumentar los ingresos y coordinar operaciones a través de la inteligencia conversacional.',
    cta: 'Agenda Tu Demostración',
  },
  /* Etiquetas de actos RC-editorial (Fase 5) */
  acts: {
    why: 'POR QUÉ UNA DEMO',
    session: 'LA SESIÓN',
    who: 'QUIÉN DEBERÍA ASISTIR',
    request: 'LA SOLICITUD',
    deployment: 'DESPLIEGUE',
    faq: 'PREGUNTAS FRECUENTES',
  },
  why: {
    title: '¿Por qué agendar una demo?',
    reasons: [
      { title: 'Ve Hotel Companion en tu propia propiedad.' },
      { title: 'Descubre oportunidades operativas ocultas.' },
      { title: 'Explora el despliegue en menos de 30 minutos.' },
    ],
  },
  experience: {
    lead: 'Cada demostración es personalizada, pero por lo general incluye:',
  },
  who: {
    /* fragmento condensado (verbatim) de la respuesta del FAQ {#demo} */
    lead: 'Desde propiedades boutique hasta grupos hoteleros globales.',
    roles: [
      'Propietarios de Hoteles',
      'Gerentes Generales',
      'Directores de Operaciones',
      'Revenue Managers',
      'Líderes de Experiencia del Huésped',
      'Equipos de Transformación Digital',
      'Directores de TI',
      'Compañías Operadoras de Hoteles',
      'Grupos Multipropiedad',
      'Marcas de Hospitalidad de Lujo',
      'Hoteles Boutique',
      'Resorts',
    ],
  },
  expect: {
    title: 'Qué Esperar',
  },
  agenda: {
    title: 'Agenda Típica',
    items: [
      {
        title: 'Conocer Tu Propiedad',
        body: 'Tipo de propiedad. Perfil del huésped. Stack tecnológico actual. Prioridades operativas. Objetivos de negocio.',
      },
      {
        title: 'Demostración Guiada',
        body: 'Voz y texto en web móvil y computadora. Recomendaciones con contexto. Ofertas aprobadas. Solicitudes de servicio. Companion Control.',
      },
      { title: 'Companion OS', body: 'Conocimiento. Memoria. Razonamiento. Orquestación de flujos. Analítica.' },
      {
        title: 'Preguntas y Conversación',
        body: 'Tus retos actuales, tus preguntas y cómo Hotel Companion podría integrarse a tu operación.',
      },
    ],
  },
  deployment: {
    title: 'De la Demostración al Despliegue',
    stages: [
      { title: 'Descubrimiento', body: 'Entender tu operación, flujos de trabajo, conocimiento y experiencia del huésped.' },
      {
        title: 'Configuración del Conocimiento',
        body: 'Importar la información de tu hotel, políticas, amenidades, conocimiento del destino y procedimientos operativos.',
      },
      {
        title: 'Configuración de la Plataforma',
        body: 'Voz. Personalidad de marca. Idiomas. Flujos de trabajo. Enrutamiento por departamento. Ajustes empresariales.',
      },
      { title: 'Incorporación del Equipo', body: 'Capacitar a tu personal y administradores.' },
      {
        title: 'Puesta en Marcha',
        body: 'Lanza el alcance acordado, verifica resultados y compara antes de ampliar la automatización.',
      },
    ],
  },
  faq: {
    title: 'Preguntas Frecuentes',
    items: [
      {
        q: '¿Necesitamos preparar algo antes de la demo?',
        a: 'No hace falta preparación. Ayuda que esté alguien que conozca la operación diaria, pero nosotros vamos a ti — la sesión se construye alrededor de tu propiedad, no de un guion genérico.',
      },
      {
        q: '¿Es un producto real o un concepto?',
        a: 'Verás una demostración guiada. Distinguimos capacidades disponibles, escenarios ilustrativos y las conexiones que tu hotel necesitaría antes del lanzamiento.',
      },
      {
        q: '¿Cómo lo usan los huéspedes?',
        a: 'El huésped habla o escribe en web móvil o computadora, desde un enlace o QR y sin instalar una aplicación. Teléfono y WhatsApp se definen para el piloto. Las tablets son opcionales, con dispositivos e instalación cubiertos por el hotel.',
      },
      {
        q: '¿En qué se diferencia de una plataforma de mensajería para huéspedes?',
        a: 'Las herramientas de mensajería mueven palabras entre personas. Hotel Companion convierte esas conversaciones en inteligencia operativa — contexto que enruta el trabajo y llega a cada departamento. La conversación es el insumo, no el producto.',
      },
      {
        q: '¿Reemplaza nuestros sistemas o a nuestro personal?',
        a: 'Ninguno de los dos. Se coloca por encima de los sistemas que ya operas y resuelve lo rutinario para que tu equipo quede libre para los momentos que importan.',
      },
      {
        q: '¿Cuánto tarda la implementación?',
        a: 'Acordamos el plazo después de definir el alcance del piloto, revisar el conocimiento del hotel y confirmar los flujos de trabajo. Las conexiones con PMS, POS o pagos se definen por separado y dependen de acceso, validación y aprobaciones.',
      },
      {
        q: '¿La información del huésped es segura?',
        a: 'Sí. El cifrado, el acceso por roles y una gobernanza centrada en la privacidad son principios fundamentales de Companion OS.',
      },
      {
        q: '¿Es solo para hoteles de lujo?',
        a: 'No. Desde propiedades boutique hasta grupos hoteleros globales — cualquier hotel que crea que una experiencia excepcional del huésped crea valor de negocio a largo plazo.',
      },
    ],
  },
}

export const demoCopy: Localized<typeof en> = { en, es }
