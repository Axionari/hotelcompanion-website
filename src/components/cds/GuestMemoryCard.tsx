'use client'

import { MonoChip } from './MonoChip'
import { useCopy } from '@/lib/i18n/useCopy'
import { intelExecCopy } from '@/lib/i18n/marketing/intelExec'

/**
 * v3 GuestMemoryCard (copy deck {#07} Card B, from concept 2a):
 * mono title · sans body · lowercase MonoChips · faint footer line.
 */
export function GuestMemoryCard({ className = '' }: { className?: string }) {
  const c = useCopy(intelExecCopy).memory

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
      <p className="font-sans mt-4" style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--text)' }}>
        {c.body}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {c.chips.map((chip) => (
          <MonoChip key={chip} lowercase>
            {chip}
          </MonoChip>
        ))}
      </div>
      <p className="font-sans mt-5" style={{ fontSize: 13.5, color: 'var(--text-faint)' }}>
        {c.footer}
      </p>
    </div>
  )
}
