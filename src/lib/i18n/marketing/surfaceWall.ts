import type { Localized } from '../useCopy'

/**
 * Device-screen content for the multi-surface section.
 * DEVICE UI content, not approved marketing copy.
 *
 * v3 Phase 3B (copy deck {#05}): the old 8-vignette bento (DeviceWall) is
 * retired — kiosk, AR glasses, voice-call, phone-upsell vignettes and the
 * surface labels are deleted with it. What remains feeds the constellation's
 * screens: the laptop booking card, the TV greeting, and the watch glance.
 * ES tv.meta kept as the site shipped it ("Su terraza…" — usted register).
 */

const en = {
  laptop: {
    tab: 'marazul.com/book',
    badge: '0% commission',
    room: 'Ocean-View Suite',
    price: '$250 · night',
    cta: 'Reserve',
  },
  watch: {
    time: '20 min',
    glance: 'Spa Ixchel',
  },
  tv: {
    greeting: 'Welcome, Maya',
    room: 'Room 214',
    meta: 'Your terrace faces the sunset',
  },
}

const es: typeof en = {
  laptop: {
    tab: 'marazul.com/reservar',
    badge: '0% comisión',
    room: 'Suite Vista al Mar',
    price: '$250 · noche',
    cta: 'Reservar',
  },
  watch: {
    time: '20 min',
    glance: 'Spa Ixchel',
  },
  tv: {
    greeting: 'Bienvenida, Maya',
    room: 'Habitación 214',
    meta: 'Su terraza mira al atardecer',
  },
}

export const surfaceWall: Localized<typeof en> = { en, es }
