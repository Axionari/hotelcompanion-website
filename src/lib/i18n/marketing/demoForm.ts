import type { Localized } from '../useCopy'

/* Copy source: handoff/HotelCompanion__Site_Copy*.md, focused preview addendum. */
const en = {
  title: 'Request a demo',
  intro: 'Tell us where you work. We’ll arrange a focused conversation about your hotel.',
  fields: {
    name: 'Your name',
    hotel: 'Hotel or hotel group',
    email: 'Work email',
    goal: 'What would you like to improve? (optional)',
  },
  submit: 'Request a demo',
  submitting: 'Sending…',
  privacy: 'We’ll use these details to respond to your request.',
  privacyLink: 'Privacy policy',
  errors: {
    required: 'This field is required.',
    email: 'Please enter a valid work email.',
    submit: 'Unable to submit right now. Please try again or email sales@axionari.com.',
  },
  success: {
    title: 'Your request is in.',
    body: 'We’ve received your details and will contact you to arrange a demonstration.',
    bookLead: 'You can also choose a meeting time below.',
    bookFallback: 'Open the booking page',
    bookBlocked: 'The scheduler is a third-party embed that sets its own cookies. Accept non-essential cookies to load it here, or open the booking page directly:',
  },
  page: {
    eyebrow: 'Hotel Companion',
    title: 'See what it could do for your hotel.',
    body: 'See how smarter recommendations and hotel-approved offers work through voice, text and guest context—and how a pilot measures additional contribution.',
    agendaTitle: 'What we’ll cover',
    agenda: [
      'Explore recommendations, approved packages and alternatives that capture guest interest.',
      'Try voice and text conversations with guest context and memory.',
      'Define a pilot, the connections it needs and how to measure results.',
    ],
    note: 'No purchase commitment. We’ll agree the scope and commercial terms before a pilot.',
    calendarLead: 'Prefer to choose a time?',
    calendarLink: 'Open the meeting calendar',
    faq: 'A few practical questions.',
  },
}

const es: typeof en = {
  title: 'Solicita una demo',
  intro: 'Dinos dónde trabajas. Coordinaremos una conversación enfocada en tu hotel.',
  fields: {
    name: 'Tu nombre',
    hotel: 'Hotel o grupo hotelero',
    email: 'Correo de trabajo',
    goal: '¿Qué te gustaría mejorar? (opcional)',
  },
  submit: 'Solicitar una demo',
  submitting: 'Enviando…',
  privacy: 'Usaremos estos datos para responder a tu solicitud.',
  privacyLink: 'Política de privacidad',
  errors: {
    required: 'Este campo es obligatorio.',
    email: 'Ingresa un correo de trabajo válido.',
    submit: 'No fue posible enviar en este momento. Intenta de nuevo o escribe a sales@axionari.com.',
  },
  success: {
    title: 'Recibimos tu solicitud.',
    body: 'Te contactaremos para coordinar una demostración.',
    bookLead: 'También puedes elegir un horario abajo.',
    bookFallback: 'Abrir la página de agenda',
    bookBlocked: 'La agenda es un recurso de terceros que instala sus propias cookies. Acepta las cookies no esenciales para verla aquí, o abre la página directamente:',
  },
  page: {
    eyebrow: 'Hotel Companion',
    title: 'Descubre qué puede aportar a tu hotel.',
    body: 'Conoce las recomendaciones y ofertas aprobadas por voz y texto, con contexto del huésped, y cómo el piloto mide la contribución adicional.',
    agendaTitle: 'Qué veremos',
    agenda: [
      'Explora recomendaciones, paquetes aprobados y alternativas que aprovechan el interés del huésped.',
      'Prueba conversaciones por voz y texto con contexto y memoria del huésped.',
      'Define un piloto, las conexiones necesarias y cómo medir resultados.',
    ],
    note: 'Sin compromiso de compra. Acordaremos el alcance y las condiciones comerciales antes de un piloto.',
    calendarLead: '¿Prefieres elegir un horario?',
    calendarLink: 'Abrir la agenda de reuniones',
    faq: 'Algunas preguntas prácticas.',
  },
}

export const demoFormCopy: Localized<typeof en> = { en, es }
