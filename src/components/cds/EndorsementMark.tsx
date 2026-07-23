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
    color: 'var(--text-faint)',
    textDecoration: 'none' as const,
  }
  const cls = `eyebrow transition-colors hover:text-[#d4824f] ${className}`

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

/**
 * The Axionari wordmark glyph — the gold "A" with the white execution bar,
 * matching the mark used on the Restaurant Companion site (axionari-mark.svg).
 * Self-coloured (its own gold gradient), so it ignores the surrounding color.
 */
export function AxionariGlyph({ size = '1.05em', className = '' }: { size?: number | string; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      role="img"
      aria-label="Axionari"
      className={className}
      style={{ display: 'inline-block', verticalAlign: '-0.15em', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="axionari-mark-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4C87A" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      <path d="M 40 120 L 60 20 L 75 20 L 95 120" stroke="url(#axionari-mark-gold)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 105 120 L 85 20 L 100 20 L 120 120" stroke="url(#axionari-mark-gold)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="90" y="85" width="40" height="7" fill="#F4F4F2" rx="2" />
    </svg>
  )
}

/**
 * v3 endorsement mark (docs/v3/00_BUILD_BRIEF.md G6, copy deck {#08}/{#footer}):
 * mono CAPS `POWERED BY [glyph] AXIONARI`, `AXIONARI` in gold, with the Axionari
 * wordmark glyph as on the RC site. Locale-invariant.
 */
export function AxionariMark({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://axionari.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`eyebrow inline-flex items-center ${className}`}
      style={{ color: 'var(--text-faint)', textDecoration: 'none', gap: '0.5em' }}
    >
      <span>POWERED BY</span>
      <span className="inline-flex items-center" style={{ gap: '0.34em' }}>
        <AxionariGlyph />
        <span style={{ color: 'var(--gold)' }}>AXIONARI</span>
      </span>
    </a>
  )
}
