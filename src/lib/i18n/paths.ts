import type { Language } from './translations'

const LOCALIZED_ROOTS = new Set([
  'accessibility',
  'companion-os',
  'company',
  'contact',
  'cookies',
  'demo',
  'enterprise',
  'faq',
  'platform',
  'privacy',
  'resources',
  'responsible-ai',
  'security',
  'solutions',
  'terms',
  'trust',
])

export function languageFromPathname(pathname: string): Language {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en'
}

export function stripLanguagePrefix(pathname: string): string {
  if (pathname === '/es') return '/'
  return pathname.startsWith('/es/') ? pathname.slice(3) || '/' : pathname
}

/**
 * Adds or removes the public Spanish URL prefix while preserving hashes and
 * query strings. App, authentication and API routes deliberately stay outside
 * the bilingual marketing surface.
 */
export function localizeHref(href: string, lang: Language): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href

  const match = href.match(/^([^?#]*)([?#].*)?$/)
  const pathname = match?.[1] || '/'
  const suffix = match?.[2] || ''
  const unprefixed = stripLanguagePrefix(pathname)
  const root = unprefixed.split('/').filter(Boolean)[0]
  const localizable = unprefixed === '/' || (root ? LOCALIZED_ROOTS.has(root) : false)

  if (!localizable) return href
  if (lang === 'es') return `${unprefixed === '/' ? '/es' : `/es${unprefixed}`}${suffix}`
  return `${unprefixed}${suffix}`
}
