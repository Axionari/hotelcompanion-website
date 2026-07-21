'use client'

import { ReactNode } from 'react'
import { Reveal } from './Reveal'

export type SectionVariant = 'bg' | 'surface-1' | 'surface-2'

const VARIANT_BG: Record<SectionVariant, string> = {
  bg: 'var(--bg)',
  'surface-1': 'var(--surface-1)',
  'surface-2': 'var(--surface-2)',
}

/**
 * CDS numbered-section primitive (brief §3.5): mono eyebrow + display-serif
 * title + fade-up reveal, on a layered surface for ambient banding.
 */
export function Section({
  eyebrow,
  title,
  children,
  variant = 'bg',
  reveal = true,
  center = false,
  id,
  tight = false,
}: {
  eyebrow?: string
  title?: string
  children?: ReactNode
  variant?: SectionVariant
  reveal?: boolean
  center?: boolean
  id?: string
  tight?: boolean
}) {
  const header = (eyebrow || title) && (
    <header className={center ? 'text-center' : ''}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      {title && (
        <h2
          className={`heading-section font-serif font-normal ${center ? 'mx-auto max-w-3xl' : 'max-w-3xl'}`}
          style={{ color: 'var(--text)' }}
        >
          {title}
        </h2>
      )}
    </header>
  )

  return (
    <section
      id={id}
      className={`scroll-mt-20 ${tight ? 'py-14 md:py-20' : 'py-24 md:py-32'}`}
      style={{ background: VARIANT_BG[variant] }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {reveal ? (
          <>
            {header && <Reveal>{header}</Reveal>}
            {children}
          </>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  )
}
