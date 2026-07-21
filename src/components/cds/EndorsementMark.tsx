'use client'

import Link from 'next/link'

/**
 * Family lockups (brief §6): "Powered by Companion OS." → /companion-os,
 * "Powered by Axionari." → axionari.com. No underline; accent-shift hover.
 */
export function EndorsementMark({
  variant = 'companion-os',
  className = '',
}: {
  variant?: 'companion-os' | 'axionari'
  className?: string
}) {
  const label = variant === 'companion-os' ? 'Powered by Companion OS.' : 'Powered by Axionari.'
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
