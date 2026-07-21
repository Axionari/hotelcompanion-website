import type { Localized } from '../useCopy'

/**
 * Per-surface content for the multi-surface section.
 *
 * The point of the section is that one conversation adapts to each surface's
 * strength — so no two devices may show the same card. A laptop is where you
 * book direct, a watch is where you glance, a TV is where you are greeted.
 * DEVICE UI content, not approved marketing copy.
 */

const en = {
  laptop: {
    label: 'Laptop',
    tab: 'marazul.com/book',
    headline: 'Book direct',
    badge: '0% commission',
    room: 'Ocean-View Suite',
    price: '$250 · night',
    cta: 'Reserve',
    compare: 'Same room, $71 less than the OTA',
  },
  phone: {
    label: 'Smartphone',
    eyebrow: 'Before you arrive',
    title: 'Ocean-View Suite',
    price: '$250',
    meta: 'Private terrace · 2 nights left',
    cta: 'Add to stay',
  },
  watch: {
    label: 'Watch',
    time: '20 min',
    glance: 'Spa Ixchel',
    meta: '4pm',
  },
  tablet: {
    label: 'In-room tablet',
    title: 'In-room dining',
    meta: 'Kitchen open until 11pm',
    items: [
      { name: 'Ceviche verde', price: '$18', image: '/assets/ui/dish-1.webp' },
      { name: 'Pescado a la talla', price: '$32', image: '/assets/ui/dish-2.webp' },
      { name: 'Tres leches', price: '$12', image: '/assets/ui/dish-3.webp' },
    ],
  },
  tv: {
    label: 'In-room TV',
    greeting: 'Welcome, Maya',
    room: 'Room 214',
    meta: 'Your terrace faces the sunset',
  },
  kiosk: {
    label: 'Lobby kiosk',
    title: 'Find your way',
    dest: 'Spa Ixchel',
    meta: '2 min · past the pool',
    pins: ['Lobby', 'Pool', 'Spa'],
  },
  glasses: {
    label: 'AR glasses',
    card: 'Casa Marina',
    meta: '40 m ahead',
  },
  call: {
    label: 'Voice call',
    note: 'Described aloud — no image',
  },
  /** The single intent every surface is answering. */
  thread: 'One conversation, handed from screen to screen',
}

const es: typeof en = {
  laptop: {
    label: 'Portátil',
    tab: 'marazul.com/reservar',
    headline: 'Reserva directo',
    badge: '0% comisión',
    room: 'Suite Vista al Mar',
    price: '$250 · noche',
    cta: 'Reservar',
    compare: 'La misma habitación, $71 menos que la OTA',
  },
  phone: {
    label: 'Teléfono',
    eyebrow: 'Antes de llegar',
    title: 'Suite Vista al Mar',
    price: '$250',
    meta: 'Terraza privada · quedan 2 noches',
    cta: 'Añadir a la estancia',
  },
  watch: {
    label: 'Reloj',
    time: '20 min',
    glance: 'Spa Ixchel',
    meta: '4pm',
  },
  tablet: {
    label: 'Tablet en la habitación',
    title: 'Comedor en la habitación',
    meta: 'Cocina abierta hasta las 11pm',
    items: [
      { name: 'Ceviche verde', price: '$18', image: '/assets/ui/dish-1.webp' },
      { name: 'Pescado a la talla', price: '$32', image: '/assets/ui/dish-2.webp' },
      { name: 'Tres leches', price: '$12', image: '/assets/ui/dish-3.webp' },
    ],
  },
  tv: {
    label: 'TV en la habitación',
    greeting: 'Bienvenida, Maya',
    room: 'Habitación 214',
    meta: 'Su terraza mira al atardecer',
  },
  kiosk: {
    label: 'Kiosco del lobby',
    title: 'Encuentra tu camino',
    dest: 'Spa Ixchel',
    meta: '2 min · pasando la alberca',
    pins: ['Lobby', 'Alberca', 'Spa'],
  },
  glasses: {
    label: 'Gafas AR',
    card: 'Casa Marina',
    meta: 'a 40 m',
  },
  call: {
    label: 'Llamada de voz',
    note: 'Descrito en voz alta — sin imagen',
  },
  thread: 'Una conversación, entregada de pantalla en pantalla',
}

export const surfaceWall: Localized<typeof en> = { en, es }
