import type { Localized } from '../useCopy'

/**
 * Restaurant Companion italicises one phrase per headline. These are the
 * phrases to accent, per language — a STYLING map, deliberately separate from
 * the copy modules so no approved string is ever edited. A phrase that does not
 * appear in its headline is simply ignored (see AccentHeadline).
 */
const en = {
  homeHero: ['Every Guest', 'Every Opportunity'],
  companyHero: ['Intelligent Hospitality'],
  platformHero: ['Every Guest Interaction'],
  enterpriseHero: ['Modern Hospitality Enterprises'],
  companionOsHero: ['Unlimited Companions'],
  solutionsHero: ['Every Department'],
  resourcesHero: ['Future of Hospitality'],
  demoHero: ['Personalized Demonstration'],
  contactHero: ['Future of Hospitality'],
}

const es: typeof en = {
  homeHero: ['Cada Huésped', 'Cada Oportunidad'],
  companyHero: ['Hospitalidad Inteligente'],
  platformHero: ['Cada Interacción'],
  enterpriseHero: ['Empresas Hoteleras Modernas'],
  companionOsHero: ['Companions Ilimitados'],
  solutionsHero: ['Cada Departamento'],
  resourcesHero: ['Futuro de la Hospitalidad'],
  demoHero: ['Demostración Personalizada'],
  contactHero: ['Futuro de la Hospitalidad'],
}

export const accents: Localized<typeof en> = { en, es }
