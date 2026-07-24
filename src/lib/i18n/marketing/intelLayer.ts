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
  h2Hi: 'An intelligence operating system.',
  body:
    'Hotel Companion is the Hospitality Intelligence Platform, powered by a Hospitality Intelligence Operating System — the layer beneath your existing tools that connects every guest conversation, every department, and every operational decision. Not another application to add to the stack.',
  guest: 'The guest',
  center: 'One intelligent layer',
  centerSub: 'EVERY CONVERSATION · EVERY DEPARTMENT',
  systems: ['PMS', 'Booking engine', 'POS', 'Spa & wellness', 'Housekeeping', 'Engineering', 'CRM', 'Loyalty'],
}

const es: typeof en = {
  eyebrow: 'LA CATEGORÍA',
  h2Pre: 'No otra aplicación. ',
  h2Hi: 'Un sistema operativo de inteligencia.',
  body:
    'Hotel Companion es la Plataforma de Inteligencia Hotelera, impulsada por un Sistema Operativo de Inteligencia Hotelera — la capa debajo de tus herramientas actuales que conecta cada conversación con el huésped, cada departamento y cada decisión operativa. No otra aplicación que sumar al stack.',
  guest: 'El huésped',
  center: 'Una capa inteligente',
  centerSub: 'CADA CONVERSACIÓN · CADA DEPARTAMENTO',
  systems: ['PMS', 'Motor de reservas', 'POS', 'Spa y bienestar', 'Housekeeping', 'Ingeniería', 'CRM', 'Lealtad'],
}

export const intelLayerCopy: Localized<typeof en> = { en, es }
