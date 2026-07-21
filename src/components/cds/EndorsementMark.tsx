'use client'

import Link from 'next/link'
import { useLang } from '@/lib/i18n/LanguageContext'

/* Approved family lockups, EN and ES (copy decks, global rules). */
const LOCKUPS = {
  en: { 'companion-os': 'Powered by Companion OS.', axionari: 'Powered by Axionari.' },
  es: { 'companion-os': 'Impulsado por Companion OS.', axionari: 'Construido por Axionari.' },
} as const

/**
 * Family lockups (brief §6): Companion OS → /companion-os,
 * Axionari → axionari.com. No underline; accent-shift hover.
 */
export function EndorsementMark({
  variant = 'companion-os',
  className = '',
}: {
  variant?: 'companion-os' | 'axionari'
  className?: string
}) {
  const { lang } = useLang()
  const label = LOCKUPS[lang][variant]
  const style = {
    color: 'var(--text-secondary)',
    textDecoration: 'none' as const,
  }
  const cls = `font-serif italic text-base transition-colors hover:text-[#D4784A] ${className}`

  if (variant === 'axionari') {
    return (
      <a href="https://axionari.com" target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {label}
      </a>
    )
  }
  return (
    <Link href="/companion-os" className={cls} style={style}>
      {label}
    </Link>
  )
}
