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
    body: 'Tell us what you want to improve: direct enquiries, relevant upgrades or a recurring service gap. See the guest journey, the team’s next step and what a pilot would need to prove.',
    agendaTitle: 'What we’ll cover',
    agenda: [
      'Follow one guest from enquiry to a completed next step, with relevant recommendations.',
      'See how the team receives context, keeps approvals and follows service through.',
      'Agree the first use case, required connections and a baseline for commercial and service results.',
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
    body: 'Cuéntanos qué quieres mejorar: consultas directas, mejoras relevantes o una falla recurrente de servicio. Veremos el recorrido, la acción del equipo y qué debe demostrar el piloto.',
    agendaTitle: 'Qué veremos',
    agenda: [
      'Sigue a un huésped de la consulta al siguiente paso, con recomendaciones relevantes.',
      'Ve cómo el equipo recibe contexto, conserva aprobaciones y da seguimiento al servicio.',
      'Define el primer caso, las conexiones y una base para medir resultados comerciales y de servicio.',
    ],
    note: 'Sin compromiso de compra. Acordaremos el alcance y las condiciones comerciales antes de un piloto.',
    calendarLead: '¿Prefieres elegir un horario?',
    calendarLink: 'Abrir la agenda de reuniones',
    faq: 'Algunas preguntas prácticas.',
  },
}

export const demoFormCopy: Localized<typeof en> = { en, es }
