import type { Localized } from '../useCopy'

/**
 * "Not another app. One intelligent layer." — the operating-model diagram
 * (RC's §03 concept applied to hotels): the guest on one side, the hotel's
 * existing systems on the other, the Companion as the single intelligent
 * layer connecting every conversation into one continuous experience.
 */

const en = {
  eyebrow: 'THE CATEGORY',
  h2Pre: 'Not another app. ',
  h2Hi: 'The intelligence operating layer.',
  body:
    'The next generation of hotel technology is not another application to add to the stack. It is the layer beneath them — connecting every guest conversation, every department, and every operational decision, on top of the systems your hotel already relies on.',
  guest: 'The guest',
  center: 'One intelligent layer',
  centerSub: 'EVERY CONVERSATION · EVERY DEPARTMENT',
  systems: ['PMS', 'Booking engine', 'POS', 'Spa & wellness', 'Housekeeping', 'Engineering', 'CRM', 'Loyalty'],
}

const es: typeof en = {
  eyebrow: 'LA CATEGORÍA',
  h2Pre: 'No otra aplicación. ',
  h2Hi: 'La capa operativa de inteligencia.',
  body:
    'La próxima generación de tecnología hotelera no es otra aplicación que sumar al stack. Es la capa que va debajo — conectando cada conversación del huésped, cada departamento y cada decisión operativa, sobre los sistemas en los que tu hotel ya confía.',
  guest: 'El huésped',
  center: 'Una capa inteligente',
  centerSub: 'CADA CONVERSACIÓN · CADA DEPARTAMENTO',
  systems: ['PMS', 'Motor de reservas', 'POS', 'Spa y bienestar', 'Housekeeping', 'Ingeniería', 'CRM', 'Lealtad'],
}

export const intelLayerCopy: Localized<typeof en> = { en, es }
