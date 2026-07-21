'use client'

import { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { useEyebrow } from '@/lib/i18n/marketing/eyebrows'

export type SectionVariant = 'bg' | 'surface-1' | 'surface-2' | 'surface-3' | 'surface-4' | 'surface-5'

const VARIANT_BG: Record<SectionVariant, string> = {
  bg: 'var(--bg)',
  'surface-1': 'var(--surface-1)',
  'surface-2': 'var(--surface-2)',
  'surface-3': 'var(--surface-3)',
  'surface-4': 'var(--surface-4)',
  'surface-5': 'var(--surface-5)',
}

/**
 * CDS section primitive — Restaurant Companion parity.
 *
 * The layout law (Design & Interaction Spec §1): LEFT-ALIGNED by default,
 * card-less, on a 1200px container with generous vertical rhythm. `center` is
 * reserved for the rare full-bleed statement line (max one per page) and is
 * never used for a whole narrative section.
 *
 * Anatomy: mono eyebrow -> display-serif headline (one italic word) ->
 * up to two lines of support -> whitespace or a visual.
 */
export function Section({
  eyebrow,
  title,
  titleNode,
  support,
  children,
  variant = 'bg',
  reveal = true,
  center = false,
  id,
  tight = false,
}: {
  eyebrow?: string
  title?: string
  /** Use when the headline carries an italic accent word. Takes precedence over `title`. */
  titleNode?: ReactNode
  support?: ReactNode
  children?: ReactNode
  variant?: SectionVariant
  reveal?: boolean
  center?: boolean
  id?: string
  tight?: boolean
}) {
  const translateEyebrow = useEyebrow()
  const label = translateEyebrow(eyebrow)
  const heading = titleNode ?? title

  const header = (label || heading || support) && (
    <header className={center ? 'text-center' : ''}>
      {label && <div className="eyebrow eyebrow-accent mb-5">{label}</div>}
      {heading && (
        <h2 className={`heading-section ${center ? 'mx-auto' : ''}`} style={{ color: 'var(--text)', maxWidth: '20ch' }}>
          {heading}
        </h2>
      )}
      {support && (
        <div className={`body-lead mt-6 ${center ? 'mx-auto' : ''}`} style={{ maxWidth: '54ch' }}>
          {support}
        </div>
      )}
    </header>
  )

  return (
    <section
      id={id}
      className={`scroll-mt-20 ${tight ? 'py-14 md:py-20' : 'py-20 md:py-28'}`}
      style={{ background: VARIANT_BG[variant] }}
    >
      <div className={`container-rc ${center ? 'text-center' : ''}`}>
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

/**
 * Asymmetric two-column section body — the default RC shape.
 * Content six columns left, visual six columns right, vertically centred.
 */
export function SectionSplit({
  children,
  visual,
  reverse = false,
}: {
  children: ReactNode
  visual: ReactNode
  reverse?: boolean
}) {
  return (
    <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>{children}</div>
      <div className={`lg:col-span-6 ${reverse ? 'lg:order-1' : ''}`}>{visual}</div>
    </div>
  )
}
