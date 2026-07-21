'use client'

import { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** Body paragraph at the CDS reading measure. */
export function Lead({
  children,
  center = true,
  reveal = true,
  tone = 'secondary',
  className = '',
}: {
  children: ReactNode
  center?: boolean
  reveal?: boolean
  tone?: 'secondary' | 'primary'
  className?: string
}) {
  const el = (
    <p
      className={`font-sans leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl ${className}`}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
        color: tone === 'primary' ? 'var(--text)' : 'var(--text-secondary)',
      }}
    >
      {children}
    </p>
  )
  return reveal ? <Reveal>{el}</Reveal> : el
}

/** Display-serif closing line — the editorial punctuation of a section. */
export function Coda({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal>
      <p
        className={`font-serif italic mx-auto max-w-2xl ${className}`}
        style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}
      >
        {children}
      </p>
    </Reveal>
  )
}

/** Card used for department / segment / capability blocks. */
export function Card({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  id?: string
}) {
  return (
    <Reveal>
      <div
        id={id}
        className="rounded-2xl p-6 md:p-8 h-full scroll-mt-24"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
      >
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h3 className="font-serif heading-card mb-4" style={{ color: 'var(--text)' }}>
          {title}
        </h3>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </Reveal>
  )
}

/** Body copy inside a Card. */
export function CardText({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans leading-relaxed" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
      {children}
    </p>
  )
}
