import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#resources} (the expanded, approved version). Verbatim. */

const en = {
  hero: {
    title: 'Insights for the Future of Hospitality.',
    body1:
      'Explore ideas, research, and practical guidance on guest intelligence, AI, operational excellence, and the future of hospitality.',
    body2:
      'Whether you’re evaluating AI, improving guest experiences, or rethinking hotel operations, our library is designed to help hospitality leaders understand what’s next.',
  },
  featured: {
    eyebrow: '01 · FEATURED',
    title: 'The Future of Hospitality Is Conversational.',
    body1:
      'Guests no longer want to navigate apps, search websites, or wait on hold. They simply want to ask.',
    body2:
      'Discover why conversational intelligence is becoming the new operating interface for hotels—and how forward-thinking properties are turning every guest interaction into exceptional service and measurable business value.',
    cta: 'Read Article',
    slug: 'future-of-hospitality-is-conversational',
  },
  library: {
    eyebrow: '02 · LIBRARY',
    title: 'Featured Articles',
    /* Card labels + deks are the copy deck's friendlier variants; each maps to a
       canonical essay slug (essays file {#essay-index} mapping note). */
    cards: [
      {
        label: 'Understanding Guest Intelligence',
        dek: 'Why guest conversations are becoming the hospitality industry’s most valuable source of operational and commercial intelligence.',
        slug: 'future-of-hospitality-is-conversational',
      },
      {
        label: 'Beyond the AI Concierge',
        dek: 'Why the next generation of hospitality technology is moving beyond chatbots toward Guest Intelligence Platforms.',
        slug: 'beyond-the-ai-concierge',
      },
      {
        label: 'Every Conversation Is Revenue',
        dek: 'How hotels can identify revenue opportunities naturally through guest conversations without compromising hospitality.',
        slug: 'every-conversation-is-revenue',
      },
      {
        label: 'Voice Is the New Interface',
        dek: 'Why speaking is becoming the most natural way for guests to interact with hotels.',
        slug: 'voice-is-the-new-interface',
      },
      {
        label: 'Building the Intelligent Hotel',
        dek: 'How conversational AI, organizational knowledge, and operational intelligence create a new operating model for hospitality.',
        slug: 'the-operating-system-for-hospitality',
      },
      {
        label: 'From Questions to Workflows',
        dek: 'How guest requests become coordinated operational execution across every department.',
        slug: 'every-department-should-share-the-same-intelligence',
      },
      {
        label: 'The Knowledge Advantage',
        dek: 'Why your hotel’s greatest competitive advantage is the knowledge your team already possesses.',
        slug: 'the-hotel-knowledge-problem',
      },
      {
        label: 'The Hotel of the Future',
        dek: 'How AI, voice, automation, and organizational intelligence are reshaping guest expectations.',
        slug: 'what-happens-when-every-guest-conversation-becomes-intelligence',
      },
    ],
  },
  categories: {
    eyebrow: '03 · TOPICS',
    title: 'Browse by Topic',
    all: 'All',
  },
  newsletter: {
    eyebrow: '06 · NEWSLETTER',
    title: 'Stay Ahead of What’s Next.',
    body1: 'Hospitality is changing rapidly.',
    body2:
      'Receive occasional insights on AI, guest intelligence, operational innovation, and the future of hospitality—written for hotel leaders, not technologists.',
    cta: 'Join the Newsletter',
    placeholder: 'Business Email',
    success: 'Thank you — you’re on the list.',
  },
}

/* Copy source: HotelCompanion__Site_Copy_ES.md {#resources}. Verbatim.
   Slugs are route identifiers — byte-identical to EN, never translated. */

const es: typeof en = {
  hero: {
    title: 'Ideas para el Futuro de la Hospitalidad.',
    body1:
      'Explora ideas, investigación y guías prácticas sobre inteligencia de huéspedes, IA, excelencia operativa y el futuro de la hospitalidad.',
    body2:
      'Ya sea que estés evaluando IA, mejorando la experiencia del huésped o repensando las operaciones de tu hotel, nuestra biblioteca está diseñada para ayudar a los líderes de hospitalidad a entender lo que viene.',
  },
  featured: {
    eyebrow: '01 · DESTACADO',
    title: 'El Futuro de la Hospitalidad Es Conversacional.',
    body1:
      'Los huéspedes ya no quieren navegar apps, buscar en sitios web ni esperar en el teléfono. Simplemente quieren preguntar.',
    body2:
      'Descubre por qué la inteligencia conversacional se está convirtiendo en la nueva interfaz operativa de los hoteles—y cómo las propiedades visionarias están transformando cada interacción con el huésped en servicio excepcional y valor de negocio medible.',
    cta: 'Leer Artículo',
    slug: 'future-of-hospitality-is-conversational',
  },
  library: {
    eyebrow: '02 · BIBLIOTECA',
    title: 'Artículos Destacados',
    cards: [
      {
        label: 'Entendiendo la Inteligencia de Huéspedes',
        dek: 'Por qué las conversaciones con huéspedes se están convirtiendo en la fuente más valiosa de inteligencia operativa y comercial de la hospitalidad.',
        slug: 'future-of-hospitality-is-conversational',
      },
      {
        label: 'Más Allá del Concierge con IA',
        dek: 'Por qué la próxima generación de tecnología hotelera va más allá de los asistentes automatizados, hacia las Plataformas de Inteligencia de Huéspedes.',
        slug: 'beyond-the-ai-concierge',
      },
      {
        label: 'Cada Conversación Es Ingreso',
        dek: 'Cómo los hoteles pueden identificar oportunidades de ingreso de forma natural a través de las conversaciones, sin comprometer la hospitalidad.',
        slug: 'every-conversation-is-revenue',
      },
      {
        label: 'La Voz Es la Nueva Interfaz',
        dek: 'Por qué hablar se está convirtiendo en la forma más natural en que los huéspedes interactúan con los hoteles.',
        slug: 'voice-is-the-new-interface',
      },
      {
        label: 'Construyendo el Hotel Inteligente',
        dek: 'Cómo la IA conversacional, el conocimiento organizacional y la inteligencia operativa crean un nuevo modelo operativo para la hospitalidad.',
        slug: 'the-operating-system-for-hospitality',
      },
      {
        label: 'De las Preguntas a los Flujos de Trabajo',
        dek: 'Cómo las solicitudes de los huéspedes se convierten en ejecución coordinada en cada departamento.',
        slug: 'every-department-should-share-the-same-intelligence',
      },
      {
        label: 'La Ventaja del Conocimiento',
        dek: 'Por qué la mayor ventaja competitiva de tu hotel es el conocimiento que tu equipo ya posee.',
        slug: 'the-hotel-knowledge-problem',
      },
      {
        label: 'El Hotel del Futuro',
        dek: 'Cómo la IA, la voz, la automatización y la inteligencia organizacional están redefiniendo las expectativas de los huéspedes.',
        slug: 'what-happens-when-every-guest-conversation-becomes-intelligence',
      },
    ],
  },
  categories: {
    eyebrow: '03 · TEMAS',
    title: 'Explora por Tema',
    all: 'Todos',
  },
  newsletter: {
    eyebrow: '06 · NEWSLETTER',
    title: 'Mantente Adelante de lo que Viene.',
    body1: 'La hospitalidad está cambiando rápidamente.',
    body2:
      'Recibe ideas ocasionales sobre IA, inteligencia de huéspedes, innovación operativa y el futuro de la hospitalidad—escritas para líderes hoteleros, no para tecnólogos.',
    cta: 'Suscríbete al Newsletter',
    placeholder: 'Correo de Trabajo',
    success: 'Gracias — ya estás en la lista.',
  },
}

export const resourcesCopy: Localized<typeof en> = { en, es }
