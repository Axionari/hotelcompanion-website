import type { Localized } from '../useCopy'

/**
 * "Not another app. One intelligent layer." — the operating-model diagram
 * (RC's §03 concept applied to hotels): the guest on one side, the hotel's
 * existing systems on the other, the Companion as the single intelligent
 * layer connecting every conversation into one continuous experience.
 */

const en = {
  /* Chapter kicker 04 — completes the visible 01–07 sequence on the homepage. */
  eyebrow: '04 · THE CATEGORY',
  h2Pre: 'Not another app. ',
  h2Hi: 'An intelligence operating system.',
  body:
    'Hotel Companion is the hospitality intelligence layer for your property — built on Companion OS, Axionari’s platform for white-label, voice-native AI Companions. It sits beneath your existing tools, connecting every guest conversation, every department, and every operational decision. Not another application to add to the stack.',
  guest: 'The guest',
  center: 'One intelligent layer',
  centerSub: 'EVERY CONVERSATION · EVERY DEPARTMENT',
  systems: ['PMS', 'Booking engine', 'POS', 'Spa & wellness', 'Housekeeping', 'Engineering', 'CRM', 'Loyalty'],
}

const es: typeof en = {
  eyebrow: '04 · LA CATEGORÍA',
  h2Pre: 'No otra aplicación. ',
  h2Hi: 'Un sistema operativo de inteligencia.',
  body:
    'Hotel Companion es la capa de inteligencia hotelera de tu propiedad — construida sobre Companion OS, la plataforma de Axionari para Companions de IA por voz, de marca blanca. Se coloca debajo de tus herramientas actuales, conectando cada conversación con el huésped, cada departamento y cada decisión operativa. No es otra aplicación más en tu stack.',
  guest: 'El huésped',
  center: 'Una capa inteligente',
  centerSub: 'CADA CONVERSACIÓN · CADA DEPARTAMENTO',
  systems: ['PMS', 'Motor de reservas', 'POS', 'Spa y bienestar', 'Housekeeping', 'Ingeniería', 'CRM', 'Lealtad'],
}

export const intelLayerCopy: Localized<typeof en> = { en, es }
