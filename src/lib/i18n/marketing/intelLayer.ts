import type { Localized } from '../useCopy'

/**
 * "Not another app. One intelligent layer." — the operating-model diagram
 * (RC's §03 concept applied to hotels): the guest on one side, the hotel's
 * existing systems on the other, the Companion as the single intelligent
 * layer connecting every conversation into one continuous experience.
 */

const en = {
  eyebrow: 'A NEW OPERATING MODEL',
  h2Pre: 'Not another app. ',
  h2Hi: 'One intelligent layer.',
  body:
    "The next generation of hotel technology won't be another application. It's one intelligent layer connecting every guest conversation into a single continuous experience — working with the systems your hotel already relies on.",
  guest: 'The guest',
  center: 'One intelligent layer',
  centerSub: 'ONE CONTINUOUS EXPERIENCE',
  systems: ['PMS', 'Booking engine', 'POS', 'Spa & wellness', 'Housekeeping', 'Engineering', 'CRM', 'Loyalty'],
}

const es: typeof en = {
  eyebrow: 'UN NUEVO MODELO OPERATIVO',
  h2Pre: 'No otra aplicación. ',
  h2Hi: 'Una capa inteligente.',
  body:
    'La próxima generación de tecnología hotelera no será otra aplicación. Es una capa inteligente que conecta cada conversación del huésped en una sola experiencia continua — trabajando con los sistemas en los que tu hotel ya confía.',
  guest: 'El huésped',
  center: 'Una capa inteligente',
  centerSub: 'UNA EXPERIENCIA CONTINUA',
  systems: ['PMS', 'Motor de reservas', 'POS', 'Spa y bienestar', 'Housekeeping', 'Ingeniería', 'CRM', 'Lealtad'],
}

export const intelLayerCopy: Localized<typeof en> = { en, es }
