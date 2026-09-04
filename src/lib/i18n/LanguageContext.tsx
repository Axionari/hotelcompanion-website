'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Language, translations, TranslationKey } from './translations'
import { languageFromPathname, localizeHref } from './paths'

interface LanguageContextType {
  lang: Language
  t: TranslationKey
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const routeLang = languageFromPathname(pathname)
  const [lang, setLangState] = useState<Language>(routeLang)

  useEffect(() => {
    setLangState(routeLang)
    localStorage.setItem('pc_lang', routeLang)
  }, [routeLang])

  // Keep <html lang> in sync with the active language for a11y and SEO — the
  // document ships as lang="en" and the toggle is a client-side button, so
  // without this it never updates. Covers restore, browser-detect, and toggle.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(newLang: Language) {
    setLangState(newLang)
    localStorage.setItem('pc_lang', newLang)
    const suffix = `${window.location.search}${window.location.hash}`
    router.push(localizeHref(`${pathname}${suffix}`, newLang))
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
