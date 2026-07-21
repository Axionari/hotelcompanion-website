import type { Localized } from '../useCopy'

/**
 * UI chrome for the persistent voice/chat launcher.
 * This is product-demo content, not approved marketing copy. The launcher now
 * runs the real model against the MarAzul sample property, so the scripted
 * exchanges it used to carry have been removed rather than left to rot.
 */

const en = {
  open: 'Talk to the Companion',
  close: 'Close',
  title: 'MarAzul Riviera Maya',
  subtitle: 'Ask it anything — this is how a guest experiences it',
  states: {
    idle: 'Tap to speak, or type',
    listening: 'Listening',
    thinking: 'Thinking',
    speaking: 'Speaking',
  },
  inputPlaceholder: 'Ask anything…',
  send: 'Send',
  suggestions: ['Best beach near here?', 'Do you have a spa?', 'Can we get a late checkout?'],
  cta: 'Book a Demo',
  demoNote: 'Live model · sample property',
}

const es: typeof en = {
  open: 'Habla con el Companion',
  close: 'Cerrar',
  title: 'MarAzul Riviera Maya',
  subtitle: 'Pregúntele lo que sea — así lo vive un huésped',
  states: {
    idle: 'Toca para hablar, o escribe',
    listening: 'Escuchando',
    thinking: 'Pensando',
    speaking: 'Hablando',
  },
  inputPlaceholder: 'Pregunta lo que sea…',
  send: 'Enviar',
  suggestions: ['¿La mejor playa cerca?', '¿Tienen spa?', '¿Podemos salir más tarde?'],
  cta: 'Agenda una Demo',
  demoNote: 'Modelo en vivo · propiedad de muestra',
}

export const launcherCopy: Localized<typeof en> = { en, es }
