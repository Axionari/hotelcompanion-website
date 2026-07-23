import type { Localized } from '../useCopy'

/**
 * Content for the in-room tablet's screen states (Visual Interface Level-Up §A).
 * This is DEVICE UI content, not marketing copy — the spec explicitly scopes
 * "styling/UX + device-content only". Every answer resolves into a picture card.
 */

export type ScreenId =
  | 'home'
  | 'beach'
  | 'roomservice'
  | 'upgrade'
  | 'spa'
  | 'concierge'
  | 'issue'
  | 'followup'

const en = {
  greeting: 'Good afternoon · Suite 214',
  orbHint: 'Speak or touch',
  listening: 'Listening',
  property: 'MarAzul Riviera Maya',
  askAnything: 'Ask anything…',
  tiles: [
    { id: 'roomservice', label: 'Room Service' },
    { id: 'spa', label: 'Spa' },
    { id: 'concierge', label: 'Concierge' },
    { id: 'beach', label: 'Explore' },
    { id: 'upgrade', label: 'Check-out' },
  ],
  screens: {
    beach: {
      ask: 'Best cenote near here?',
      title: 'Gran Cenote',
      meta: '20 min inland · glass-clear water',
      actions: ['Directions', 'Book a taxi'],
      image: '/assets/lux/cenote-wild.webp',
    },
    roomservice: {
      ask: 'Room service, please',
      title: 'In-room dining',
      meta: 'Kitchen open until 11pm',
      total: 'Order total',
      send: 'Send to kitchen',
      items: [
        { name: 'Ceviche verde', price: '$18', image: '/assets/ui/dish-1.webp' },
        { name: 'Pescado a la talla', price: '$32', image: '/assets/ui/dish-2.webp' },
        { name: 'Tres leches', price: '$12', image: '/assets/ui/dish-3.webp' },
      ],
    },
    upgrade: {
      ask: 'Can we upgrade to an ocean view?',
      title: 'Ocean-View Suite',
      meta: '$250/night · private terrace',
      confirm: 'Confirm upgrade',
      confirmed: 'The front desk will confirm.',
      badge: 'DIRECT RATE · NO OTA FEE',
      images: ['/assets/ui/suite-ocean.webp', '/assets/ui/suite-2.webp', '/assets/ui/suite-3.webp'],
    },
    spa: {
      ask: 'Do you have a spa?',
      title: 'Spa Ixchel',
      meta: 'Open 9am – 8pm',
      book: 'Reserve',
      items: [
        { name: 'Cacao Ceremony', price: '90 min', image: '/assets/ui/spa-1.webp' },
        { name: 'Deep tissue massage', price: '60 min', image: '/assets/ui/spa-2.webp' },
        { name: 'Sunrise yoga', price: '45 min', image: '/assets/ui/spa-3.webp' },
      ],
    },
    concierge: {
      ask: 'Where do locals eat?',
      title: 'El Pirata',
      meta: 'Town centre · 15 min by taxi',
      actions: ['Directions', 'Reserve a table'],
      image: '/assets/lux/breather-thatch-beach.webp',
      mapLabel: 'Riviera Maya',
    },
    issue: {
      ask: 'The air conditioning has stopped working.',
      reply: 'I am alerting Engineering now. Could you confirm your room number?',
      stages: ['Engineering alerted', 'Room 214 confirmed'],
    },
    followup: {
      ask: 'Thank you — we loved it.',
      title: 'How was your stay?',
      meta: 'A note from MarAzul, two days after checkout',
      reply: 'It was a pleasure having you. If you have a moment, we would love your review — and your rate is held for next time.',
      actions: ['Leave a review', 'Book direct again'],
      image: '/assets/lux/footer-aerial-cove.webp',
    },
  },
  chat: {
    placeholder: 'Ask anything…',
    send: 'Send',
    mic: 'Speak',
  },
  surfaces: {
    tablet: 'In-room tablet',
    phone: 'Smartphone',
    call: 'Voice call',
    callNote: 'Described aloud — no image',
    laptop: 'Laptop',
    watch: 'Watch',
    glasses: 'AR glasses',
    tv: 'In-room TV',
    kiosk: 'Lobby kiosk',
    watchAnswer: '20 min south',
    kioskHint: 'Tap to explore',
  },
}

const es: typeof en = {
  greeting: 'Buenas tardes · Suite 214',
  orbHint: 'Habla o toca',
  listening: 'Escuchando',
  property: 'MarAzul Riviera Maya',
  askAnything: 'Pregunta lo que sea…',
  tiles: [
    { id: 'roomservice', label: 'Servicio a Cuarto' },
    { id: 'spa', label: 'Spa' },
    { id: 'concierge', label: 'Concierge' },
    { id: 'beach', label: 'Explorar' },
    { id: 'upgrade', label: 'Salida' },
  ],
  screens: {
    beach: {
      ask: '¿El mejor cenote cerca?',
      title: 'Gran Cenote',
      meta: '20 min tierra adentro · agua cristalina',
      actions: ['Cómo llegar', 'Reservar taxi'],
      image: '/assets/lux/cenote-wild.webp',
    },
    roomservice: {
      ask: 'Servicio a cuarto, por favor',
      title: 'Comedor en la habitación',
      meta: 'Cocina abierta hasta las 11pm',
      total: 'Total del pedido',
      send: 'Enviar a la cocina',
      items: [
        { name: 'Ceviche verde', price: '$18', image: '/assets/ui/dish-1.webp' },
        { name: 'Pescado a la talla', price: '$32', image: '/assets/ui/dish-2.webp' },
        { name: 'Tres leches', price: '$12', image: '/assets/ui/dish-3.webp' },
      ],
    },
    upgrade: {
      ask: '¿Podemos mejorar a vista al mar?',
      title: 'Suite Vista al Mar',
      meta: '$250/noche · terraza privada',
      confirm: 'Confirmar mejora',
      confirmed: 'Recepción confirmará.',
      badge: 'TARIFA DIRECTA · SIN OTA',
      images: ['/assets/ui/suite-ocean.webp', '/assets/ui/suite-2.webp', '/assets/ui/suite-3.webp'],
    },
    spa: {
      ask: '¿Tienen spa?',
      title: 'Spa Ixchel',
      meta: 'Abierto 9am – 8pm',
      book: 'Reservar',
      items: [
        { name: 'Ceremonia de Cacao', price: '90 min', image: '/assets/ui/spa-1.webp' },
        { name: 'Masaje de tejido profundo', price: '60 min', image: '/assets/ui/spa-2.webp' },
        { name: 'Yoga al amanecer', price: '45 min', image: '/assets/ui/spa-3.webp' },
      ],
    },
    concierge: {
      ask: '¿Dónde comen los locales?',
      title: 'El Pirata',
      meta: 'Centro del pueblo · 15 min en taxi',
      actions: ['Cómo llegar', 'Reservar mesa'],
      image: '/assets/lux/breather-thatch-beach.webp',
      mapLabel: 'Riviera Maya',
    },
    issue: {
      ask: 'El aire acondicionado dejó de funcionar.',
      reply: 'Estoy alertando a Mantenimiento. ¿Me confirma su número de habitación?',
      stages: ['Mantenimiento alertado', 'Habitación 214 confirmada'],
    },
    followup: {
      ask: 'Gracias — nos encantó.',
      title: '¿Cómo estuvo su estancia?',
      meta: 'Un mensaje de MarAzul, dos días después de la salida',
      reply: 'Fue un placer recibirlos. Si tiene un momento, nos encantaría su reseña — y su tarifa queda apartada para la próxima.',
      actions: ['Dejar reseña', 'Reservar directo otra vez'],
      image: '/assets/lux/footer-aerial-cove.webp',
    },
  },
  chat: {
    placeholder: 'Pregunta lo que sea…',
    send: 'Enviar',
    mic: 'Hablar',
  },
  surfaces: {
    tablet: 'Tablet en la habitación',
    phone: 'Teléfono',
    call: 'Llamada de voz',
    callNote: 'Descrito en voz alta — sin imagen',
    laptop: 'Portátil',
    watch: 'Reloj',
    glasses: 'Gafas AR',
    tv: 'TV en la habitación',
    kiosk: 'Kiosco del lobby',
    watchAnswer: '20 min al sur',
    kioskHint: 'Toca para explorar',
  },
}

export const deviceScreens: Localized<typeof en> = { en, es }
