'use client'

import { Reveal } from './Reveal'

/**
 * Renders the copy deck's stacked short-line noun lists as vertical
 * editorial beats — never bullets (copy file global rule).
 */
export function RhythmStack({
  lines,
  center = false,
  serif = false,
  size = 'md',
  stagger = true,
}: {
  lines: ReadonlyArray<string>
  center?: boolean
  serif?: boolean
  size?: 'md' | 'lg'
  stagger?: boolean
}) {
  const fontSize = size === 'lg' ? 'clamp(1.25rem, 2.6vw, 1.75rem)' : 'clamp(1.05rem, 2vw, 1.25rem)'
  return (
    <div className={`flex flex-col ${size === 'lg' ? 'gap-2.5' : 'gap-2'} ${center ? 'items-center text-center' : ''}`}>
      {lines.map((line, i) => (
        <Reveal key={i} delay={stagger ? Math.min(i, 6) * 40 : 0}>
          <p
            className={serif ? 'font-serif' : 'font-sans'}
            style={{ fontSize, lineHeight: 1.4, color: 'var(--text)' }}
          >
            {line}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
