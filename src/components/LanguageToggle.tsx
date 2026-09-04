'use client'
import { useLang } from '@/lib/i18n/LanguageContext'

const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
] as const

/**
 * Segmented language pill (RC nav pattern): one hairline capsule holding both
 * options, the active one filled. Reads as a control rather than two links —
 * the old "EN · ES" text pair looked like navigation.
 *
 * Sized to 44px so it matches the CTA it sits beside, which also clears the
 * minimum tap target on mobile.
 */
export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <div
      role="group"
      aria-label="Language"
      className="language-toggle inline-flex items-center font-sans"
      style={{
        border: '1px solid rgba(243,236,226,0.16)',
        borderRadius: 999,
        padding: 3,
        gap: 2,
      }}
    >
      {LANGS.map(({ code, label, name }) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={name}
            style={{
              fontSize: '13px',
              fontWeight: active ? 600 : 500,
              letterSpacing: '.04em',
              lineHeight: 1.2,
              color: active ? 'var(--text, #F7F6F1)' : 'var(--text-faint, rgba(251,248,242,.52))',
              background: active ? 'rgba(243,236,226,0.10)' : 'transparent',
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
              padding: '10px 14px',
              transition: 'color .2s var(--ease-standard), background .2s var(--ease-standard)',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
