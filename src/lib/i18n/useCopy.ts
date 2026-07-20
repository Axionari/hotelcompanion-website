'use client'
import { useLang } from './LanguageContext'

export interface Localized<T> {
  en: T
  es: T
}

/**
 * Selects the active-language variant of a page copy module.
 * All new marketing copy flows through this so the existing
 * LanguageContext / LanguageToggle keep working unchanged.
 */
export function useCopy<T>(copy: Localized<T>): T {
  const { lang } = useLang()
  return copy[lang]
}
