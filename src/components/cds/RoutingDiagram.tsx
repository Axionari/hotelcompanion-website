'use client'

import { Reveal } from './Reveal'

/**
 * "Request → department" mapping (#home-execution, #platform-request-action).
 * Rows reveal in a stagger; the arrow carries the signature pc-arrow-pulse.
 * Reduced motion: static, fully composed (globals.css disables the pulse).
 */
export function RoutingDiagram({
  pairs,
}: {
  pairs: ReadonlyArray<{ from: string; to: string }>
}) {
  return (
    <div className="max-w-2xl mx-auto flex flex-col" role="list">
      {pairs.map((p, i) => (
        <Reveal key={i} delay={Math.min(i, 7) * 50}>
          <div
            role="listitem"
            className="flex items-center justify-between gap-4 py-4"
            style={{ borderBottom: i < pairs.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <span className="font-sans text-left" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--text)' }}>
              {p.from}
            </span>
            <span
              aria-hidden="true"
              className="flex-shrink-0"
              style={{
                color: 'var(--accent)',
                animation: 'pc-arrow-pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }}
            >
              →
            </span>
            <span
              className="font-sans text-right"
              style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', color: 'var(--text-secondary)' }}
            >
              {p.to}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
