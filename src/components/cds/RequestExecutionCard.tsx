'use client'

import { useCopy } from '@/lib/i18n/useCopy'
import { intelExecCopy } from '@/lib/i18n/marketing/intelExec'

/**
 * v3 RequestExecutionCard (copy deck {#07} Card C, from concept 2a):
 * four rows of quote (sans, hi-contrast) · time (mono, warm) · route (mono,
 * arrow warm), hairline separators, A3 trust footer.
 */
export function RequestExecutionCard({ className = '' }: { className?: string }) {
  const c = useCopy(intelExecCopy).execution
  const mono = { fontFamily: 'var(--font-mono), ui-monospace, monospace' } as const

  return (
    <div
      className={className}
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--hairline)',
        borderRadius: 22,
        padding: '26px 28px',
      }}
    >
      <div className="eyebrow eyebrow-accent">{c.title}</div>
      <ul className="mt-4">
        {c.rows.map((row, i) => (
          <li
            key={i}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
            style={{ borderBottom: i < c.rows.length - 1 ? '1px solid var(--hairline)' : 'none' }}
          >
            <span className="font-sans flex-1" style={{ fontSize: 14.5, color: 'var(--text)', minWidth: '14ch' }}>
              {row.quote}
            </span>
            <span style={{ ...mono, fontSize: 12, color: 'var(--eyebrow-warm)' }}>{row.time}</span>
            <span style={{ ...mono, fontSize: 11, letterSpacing: '0.12em', color: 'var(--eyebrow-warm)' }}>
              {row.route}
            </span>
          </li>
        ))}
      </ul>
      {/* ADDENDUM_1 A3 — trust line; the zero-claim in hi-contrast */}
      <p className="font-sans mt-5" style={{ fontSize: 13.5, color: 'var(--text-faint)' }}>
        {c.footerPre}
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>{c.footerHi}</span>
        {c.footerPost}
      </p>
    </div>
  )
}
