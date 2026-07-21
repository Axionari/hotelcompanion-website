import type { Localized } from '../useCopy'

/**
 * UI chrome + demo script for the persistent voice/chat launcher.
 * This is product-demo content, not approved marketing copy — the exchanges
 * reuse the same sample Q&A already shown inside the tablet so the launcher
 * and the device tell one consistent story.
 */

const en = {
  open: 'Talk to the Companion',
  close: 'Close',
  title: 'MarAzul Riviera Maya',
  subtitle: 'Demo · this is how a guest experiences it',
  states: {
    idle: 'Tap to speak, or type',
    listening: 'Listening',
    thinking: 'Thinking',
    speaking: 'Speaking',
  },
  inputPlaceholder: 'Ask anything…',
  send: 'Send',
  suggestions: ['Best beach near here?', 'Do you have a spa?', 'Can we get a late checkout?'],
  fallback:
    'Every answer comes from the property — its own knowledge, in its own voice. Book a demo to see it on your hotel.',
  cta: 'Book a Demo',
  demoNote: 'Sample responses',
  script: [
    {
      q: 'Best beach near here?',
      a: 'Akumal — about 20 minutes south. The water has been exceptionally clear this week, and you can snorkel with sea turtles.',
    },
    {
      q: 'Do you have a spa?',
      a: 'Our Cenote spa is open 9am to 8pm daily. The Maya chocolate ritual is our most requested treatment — shall I reserve it for tomorrow?',
    },
    {
      q: 'Can we get a late checkout?',
      a: 'Yes — late checkout until 1pm is available for your room. I have noted it with the front desk.',
    },
  ],
}

const es: typeof en = {
  open: 'Habla con el Companion',
  close: 'Cerrar',
  title: 'MarAzul Riviera Maya',
  subtitle: 'Demo · así lo vive un huésped',
  states: {
    idle: 'Toca para hablar, o escribe',
    listening: 'Escuchando',
    thinking: 'Pensando',
    speaking: 'Hablando',
  },
  inputPlaceholder: 'Pregunta lo que sea…',
  send: 'Enviar',
  suggestions: ['¿La mejor playa cerca?', '¿Tienen spa?', '¿Podemos salir más tarde?'],
  fallback:
    'Cada respuesta viene de la propiedad — su propio conocimiento, en su propia voz. Agenda una demo para verlo con tu hotel.',
  cta: 'Agenda una Demo',
  demoNote: 'Respuestas de ejemplo',
  script: [
    {
      q: '¿La mejor playa cerca?',
      a: 'Akumal — a unos 20 minutos al sur. El agua ha estado excepcionalmente clara esta semana, y puedes nadar con tortugas marinas.',
    },
    {
      q: '¿Tienen spa?',
      a: 'Nuestro spa Cenote abre de 9am a 8pm todos los días. El ritual de chocolate maya es nuestro tratamiento más solicitado — ¿se lo reservo para mañana?',
    },
    {
      q: '¿Podemos salir más tarde?',
      a: 'Sí — la salida tardía hasta la 1pm está disponible para su habitación. Ya lo dejé anotado en recepción.',
    },
  ],
}

export const launcherCopy: Localized<typeof en> = { en, es }
