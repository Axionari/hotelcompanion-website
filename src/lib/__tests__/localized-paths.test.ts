import { describe, expect, it } from 'vitest'
import { languageFromPathname, localizeHref, stripLanguagePrefix } from '../i18n/paths'

describe('localized marketing paths', () => {
  it('detects Spanish only from the public URL prefix', () => {
    expect(languageFromPathname('/es')).toBe('es')
    expect(languageFromPathname('/es/platform')).toBe('es')
    expect(languageFromPathname('/platform')).toBe('en')
  })

  it('adds and removes the Spanish prefix without duplicating it', () => {
    expect(localizeHref('/platform', 'es')).toBe('/es/platform')
    expect(localizeHref('/es/platform', 'es')).toBe('/es/platform')
    expect(localizeHref('/es/platform', 'en')).toBe('/platform')
    expect(localizeHref('/', 'es')).toBe('/es')
  })

  it('preserves fragments and queries', () => {
    expect(localizeHref('/contact#founding', 'es')).toBe('/es/contact#founding')
    expect(localizeHref('/resources?category=voice#library', 'es')).toBe('/es/resources?category=voice#library')
  })

  it('leaves private app and external routes untouched', () => {
    expect(localizeHref('/dashboard', 'es')).toBe('/dashboard')
    expect(localizeHref('https://axionari.com', 'es')).toBe('https://axionari.com')
    expect(stripLanguagePrefix('/es/demo')).toBe('/demo')
  })
})
