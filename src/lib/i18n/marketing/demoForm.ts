import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#demo-form}. Verbatim. */

const en = {
  title: 'Schedule Your Demonstration',
  intro: 'Complete the form below and we’ll contact you to arrange a personalized executive demonstration.',
  fields: {
    name: 'Name',
    hotel: 'Hotel',
    role: 'Role',
    email: 'Business Email',
    phone: 'Phone (Optional)',
    country: 'Country',
    propertyType: 'Property Type',
    properties: 'Number of Properties',
    interest: 'What would you like to explore?',
    message: 'Tell us about your hotel and what you’re hoping to improve.',
  },
  propertyTypes: ['Boutique Hotel', 'Luxury Hotel', 'Resort', 'Business Hotel', 'Hotel Group', 'Other'],
  interests: [
    'Guest Experience',
    'Voice AI',
    'Revenue Opportunities',
    'Operations',
    'Enterprise Deployment',
    'Companion OS',
    'General Information',
  ],
  submit: 'Book My Demonstration',
  submitting: 'Sending…',
  select: 'Select…',
  errors: {
    required: 'This field is required.',
    email: 'Please enter a valid business email.',
    submit: 'Unable to submit right now. Please try again or email sales@axionari.com.',
  },
  success: {
    title: 'Thank you.',
    body: 'We’ve received your request and will contact you shortly to arrange your personalized demonstration.',
    /* Calendly confirmation state (booking pass) */
    bookLead: 'Prefer to lock in a time now? Choose a slot below — your details are already filled in.',
    bookFallback: 'Open the booking page',
    bookBlocked: 'The scheduler is a third-party embed that sets its own cookies. Accept non-essential cookies to load it here, or open the booking page directly:',
  },
}

/* Copy source: HotelCompanion__Site_Copy_ES.md {#demo-form}. Verbatim. */

const es: typeof en = {
  title: 'Agenda Tu Demostración',
  intro: 'Completa el formulario y te contactaremos para coordinar una demostración ejecutiva personalizada.',
  fields: {
    name: 'Nombre',
    hotel: 'Hotel',
    role: 'Cargo',
    email: 'Correo de Trabajo',
    phone: 'Teléfono (Opcional)',
    country: 'País',
    propertyType: 'Tipo de Propiedad',
    properties: 'Número de Propiedades',
    interest: '¿Qué te gustaría explorar?',
    message: 'Cuéntanos sobre tu hotel y qué te gustaría mejorar.',
  },
  propertyTypes: ['Hotel Boutique', 'Hotel de Lujo', 'Resort', 'Hotel de Negocios', 'Grupo Hotelero', 'Otro'],
  interests: [
    'Experiencia del Huésped',
    'IA por Voz',
    'Oportunidades de Ingreso',
    'Operaciones',
    'Despliegue Empresarial',
    'Companion OS',
    'Información General',
  ],
  submit: 'Agendar Mi Demostración',
  submitting: 'Enviando…',
  select: 'Selecciona…',
  errors: {
    required: 'Este campo es obligatorio.',
    email: 'Por favor ingresa un correo de trabajo válido.',
    submit: 'No fue posible enviar en este momento. Por favor intenta de nuevo o escribe a sales@axionari.com.',
  },
  success: {
    title: 'Gracias.',
    body: 'Recibimos tu solicitud y te contactaremos en breve para coordinar tu demostración personalizada.',
    bookLead: '¿Prefieres apartar un horario ahora? Elige uno abajo — tus datos ya están cargados.',
    bookFallback: 'Abrir la página de agenda',
    bookBlocked: 'La agenda es un recurso de terceros que instala sus propias cookies. Acepta las cookies no esenciales para verla aquí, o abre la página directamente:',
  },
}

export const demoFormCopy: Localized<typeof en> = { en, es }
