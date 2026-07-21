'use client'

import { Fragment } from 'react'

/**
 * Restaurant Companion's signature headline treatment: one phrase per headline
 * set in the display-serif italic (RC: "The *future interface* between…").
 *
 * This is STYLING ONLY. The headline string still comes verbatim from the
 * approved copy module — this component just wraps a matching phrase in <em>.
 * If the phrase isn't found (e.g. in the Spanish string), the headline renders
 * unchanged rather than guessing, so copy can never be altered or dropped.
 */
export function AccentHeadline({
  text,
  accent,
  className = '',
  as: Tag = 'h2',
  style,
}: {
  text: string
  /** Phrase to italicise, per language. Falls back to plain text when absent. */
  accent?: string
  className?: string
  as?: 'h1' | 'h2' | 'p'
  style?: React.CSSProperties
}) {
  if (!accent) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    )
  }

  const idx = text.indexOf(accent)
  if (idx === -1) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag className={className} style={style}>
      {text.slice(0, idx)}
      <em className="accent-italic">{accent}</em>
      {text.slice(idx + accent.length)}
    </Tag>
  )
}

/** Splits on multiple accent phrases, italicising each occurrence in order. */
export function MultiAccentHeadline({
  text,
  accents = [],
  className = '',
  as: Tag = 'h1',
  style,
}: {
  text: string
  accents?: string[]
  className?: string
  as?: 'h1' | 'h2' | 'p'
  style?: React.CSSProperties
}) {
  const found = accents.filter((a) => a && text.includes(a))
  if (found.length === 0) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    )
  }

  // Build a split pattern from the phrases actually present in this string.
  const escaped = found.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'))

  return (
    <Tag className={className} style={style}>
      {parts.map((part, i) =>
        found.includes(part) ? (
          <em key={i} className="accent-italic">
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </Tag>
  )
}
