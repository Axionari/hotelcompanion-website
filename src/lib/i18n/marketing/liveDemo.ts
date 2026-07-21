import type { Localized } from '../useCopy'

/**
 * Chrome for the working demo (Live Demo · D2).
 * This is DEVICE / UI content, not approved marketing copy.
 */

const en = {
  eyebrow: 'See it live',
  title: 'Ask it anything.',
  lead: 'This is the companion running against MarAzul Riviera Maya, our sample property. Speak or type — every answer resolves into something you can see.',
  open: 'See It Live',
  close: 'Close the demo',
  placeholder: 'Ask about the beach, the spa, dinner…',
  send: 'Send',
  mic: 'Hold to speak',
  micStop: 'Stop listening',
  states: {
    idle: 'Ready',
    listening: 'Listening',
    thinking: 'Thinking',
    speaking: 'Speaking',
  },
  /** Spoken-language labels shown beneath the big orb. */
  orbStates: {
    idle: "Talk or type — I'm listening",
    listening: 'Listening…',
    thinking: 'Thinking…',
    speaking: 'Speaking…',
  },
  orbAction: 'Start speaking',
  orbActionStop: 'Stop listening',
  suggestions: [
    'What is the best beach near here?',
    'We would like dinner in the room tonight.',
    'Can we upgrade to an ocean view?',
    'Where do locals actually eat?',
  ],
  greeting:
    'Welcome to MarAzul Riviera Maya. I am Marina — ask me about the beach, dinner, the spa, or anything at all.',
  guest: 'Guest',
  companion: 'Marina',
  /** Standing disclosure — this is a real model on sample data. */
  disclosure: 'Live model · sample property · no real bookings are made',
  voiceUnsupported: 'Voice input needs Chrome or Safari — typing works everywhere.',
  muted: 'Mute replies',
  unmuted: 'Unmute replies',
  reset: 'Start over',
  confirm: {
    upgrade: 'Confirm the upgrade',
    roomservice: 'Send it to the kitchen',
    spa: 'Reserve it',
  },
  confirmed: {
    upgrade: 'Ocean-View Suite held',
    roomservice: 'Order sent to Casa Marina',
    spa: 'Spa Ixchel reserved',
  },
  confirmedMeta: {
    upgrade: 'The front desk will confirm at check-out.',
    roomservice: 'About 25 minutes to Suite 214.',
    spa: 'Today · Spa Ixchel · we will text a reminder.',
  },
  mockNote: 'Demonstration only — nothing was charged and nothing was sent.',
  cards: {
    beach: 'Beach',
    suite: 'Suite',
    'dish-grid': 'In-room dining',
    spa: 'Spa',
    map: 'Nearby',
    upgrade: 'Upgrade',
    confirmation: 'Confirmed',
  },
}

const es: typeof en = {
  eyebrow: 'Véalo en vivo',
  title: 'Pregúntele lo que sea.',
  lead: 'Este es el companion corriendo sobre MarAzul Riviera Maya, nuestra propiedad de muestra. Hable o escriba — cada respuesta se resuelve en algo que puede ver.',
  open: 'Ver el Demo',
  close: 'Cerrar el demo',
  placeholder: 'Pregunte por la playa, el spa, la cena…',
  send: 'Enviar',
  mic: 'Mantenga para hablar',
  micStop: 'Dejar de escuchar',
  states: {
    idle: 'Listo',
    listening: 'Escuchando',
    thinking: 'Pensando',
    speaking: 'Hablando',
  },
  orbStates: {
    idle: 'Habla o toca — te escucho',
    listening: 'Escuchando…',
    thinking: 'Pensando…',
    speaking: 'Hablando…',
  },
  orbAction: 'Empezar a hablar',
  orbActionStop: 'Dejar de escuchar',
  suggestions: [
    '¿Cuál es la mejor playa cerca de aquí?',
    'Nos gustaría cenar en la habitación esta noche.',
    '¿Podemos mejorar a una vista al mar?',
    '¿Dónde comen realmente los locales?',
  ],
  greeting:
    'Bienvenido a MarAzul Riviera Maya. Soy Marina — pregúnteme por la playa, la cena, el spa, o lo que guste.',
  guest: 'Huésped',
  companion: 'Marina',
  disclosure: 'Modelo en vivo · propiedad de muestra · no se realizan reservas reales',
  voiceUnsupported: 'La voz requiere Chrome o Safari — escribir funciona en todos.',
  muted: 'Silenciar respuestas',
  unmuted: 'Activar respuestas',
  reset: 'Empezar de nuevo',
  confirm: {
    upgrade: 'Confirmar la mejora',
    roomservice: 'Enviar a la cocina',
    spa: 'Reservar',
  },
  confirmed: {
    upgrade: 'Suite Vista al Mar apartada',
    roomservice: 'Pedido enviado a Casa Marina',
    spa: 'Spa Ixchel reservado',
  },
  confirmedMeta: {
    upgrade: 'Recepción confirmará al momento de la salida.',
    roomservice: 'Unos 25 minutos a la Suite 214.',
    spa: 'Hoy · Spa Ixchel · enviaremos un recordatorio.',
  },
  mockNote: 'Solo demostración — no se cobró nada y no se envió nada.',
  cards: {
    beach: 'Playa',
    suite: 'Suite',
    'dish-grid': 'Comedor en la habitación',
    spa: 'Spa',
    map: 'Cerca',
    upgrade: 'Mejora',
    confirmation: 'Confirmado',
  },
}

export const liveDemoCopy: Localized<typeof en> = { en, es }
