'use client'

import { useLang } from '../LanguageContext'

/**
 * Section eyebrows are written in the page components as "NN · LABEL".
 * Rather than threading every label through its page's copy module, the
 * Section primitive translates the LABEL half through this dictionary.
 * A label with no entry (e.g. one already supplied in Spanish by a copy
 * module) passes through unchanged.
 */
const ES_LABELS: Record<string, string> = {
  // Home
  'THE STAKE': 'LO QUE ESTÁ EN JUEGO',
  BOUNDARIES: 'LÍMITES',
  CONVERSATION: 'CONVERSACIÓN',
  'ALWAYS ON': 'SIEMPRE ACTIVO',
  'VOICE-FIRST': 'PRIMERO LA VOZ',
  'IN EVERY ROOM': 'EN CADA HABITACIÓN',
  REVENUE: 'INGRESOS',
  KNOWLEDGE: 'CONOCIMIENTO',
  INTELLIGENCE: 'INTELIGENCIA',
  EXECUTION: 'EJECUCIÓN',
  ENTERPRISE: 'ENTERPRISE',
  'COMPANION OS': 'COMPANION OS',
  DEPLOYMENT: 'IMPLEMENTACIÓN',
  'FOUNDING PARTNERS': 'SOCIOS FUNDADORES',
  FAQ: 'PREGUNTAS FRECUENTES',
  'NEXT STEP': 'SIGUIENTE PASO',

  // Platform
  'BRAND VOICE': 'VOZ DE MARCA',
  'NOT GENERIC AI': 'NO ES IA GENÉRICA',
  LIFECYCLE: 'CICLO DE LA ESTANCIA',
  'ISSUE DETECTION': 'DETECCIÓN DE PROBLEMAS',
  'PROPERTY KNOWLEDGE': 'CONOCIMIENTO DE LA PROPIEDAD',
  DESTINATION: 'DESTINO',
  RESERVATIONS: 'RESERVAS',
  'REVENUE INTELLIGENCE': 'INTELIGENCIA DE INGRESOS',
  'GUEST MEMORY': 'MEMORIA DEL HUÉSPED',
  'GUEST INTELLIGENCE': 'INTELIGENCIA DE HUÉSPEDES',
  DASHBOARDS: 'TABLEROS',
  'MULTI-PROPERTY': 'MULTIPROPIEDAD',
  'ENTERPRISE-READY': 'LISTO PARA ENTERPRISE',

  // Companion OS
  WHY: 'POR QUÉ',
  'ONE PLATFORM': 'UNA PLATAFORMA',
  ECOSYSTEM: 'ECOSISTEMA',
  AXIONARI: 'AXIONARI',

  // Demo
  'THE SESSION': 'LA SESIÓN',
  ATTENDEES: 'ASISTENTES',
  TOPICS: 'TEMAS',
  'WHAT TO EXPECT': 'QUÉ ESPERAR',
  AGENDA: 'AGENDA',
  REQUEST: 'SOLICITUD',

  // Contact / Company
  HEADQUARTERS: 'OFICINAS',
  SCHEDULE: 'AGENDA UNA CONVERSACIÓN',
  CLOSING: 'CIERRE',
  CONTACT: 'CONTACTO',
}

/** Translates the label half of an "NN · LABEL" eyebrow for the active language. */
export function useEyebrow(): (eyebrow?: string) => string | undefined {
  const { lang } = useLang()
  return (eyebrow?: string) => {
    if (!eyebrow || lang !== 'es') return eyebrow
    const parts = eyebrow.split(' · ')
    if (parts.length !== 2) return ES_LABELS[eyebrow] ?? eyebrow
    const [num, label] = parts
    return `${num} · ${ES_LABELS[label] ?? label}`
  }
}
