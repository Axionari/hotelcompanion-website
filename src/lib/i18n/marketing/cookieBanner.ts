import type { Localized } from '../useCopy'

/* Cookie-consent banner — RC's exact strings, HC-localized (client-side locale
   like the rest of the site; the Cookie Notice link is HC's existing /cookies). */

const en = {
  ariaLabel: 'Cookie preferences',
  bodyPre: 'We use cookies to improve your experience. Read our ',
  linkText: 'Cookie Notice',
  bodyPost: '.',
  customize: 'Customize',
  save: 'Save Preferences',
  reject: 'Reject Non-Essential',
  accept: 'Accept All',
  necessary: 'Necessary',
  alwaysOn: 'Always on',
  analytics: 'Analytics',
  marketing: 'Marketing',
  /* Re-open control on the /cookies page */
  manage: 'Manage Cookie Preferences',
}

const es: typeof en = {
  ariaLabel: 'Preferencias de cookies',
  bodyPre: 'Usamos cookies para mejorar tu experiencia. Consulta nuestro ',
  linkText: 'Aviso de Cookies',
  bodyPost: '.',
  customize: 'Personalizar',
  save: 'Guardar preferencias',
  reject: 'Rechazar las no esenciales',
  accept: 'Aceptar todo',
  necessary: 'Necesarias',
  alwaysOn: 'Siempre activas',
  analytics: 'Analítica',
  marketing: 'Marketing',
  manage: 'Administrar Preferencias de Cookies',
}

export const cookieBannerCopy: Localized<typeof en> = { en, es }
