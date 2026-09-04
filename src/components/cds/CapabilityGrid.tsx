'use client'

import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { COMPANION_OS_CAPABILITIES } from '@/lib/capabilities'
import { Reveal } from './Reveal'

/**
 * The 8 Companion OS capabilities (canonical taxonomy, brief §8).
 * Reused identically on Home, Platform, Solutions, Enterprise and
 * Companion OS. Each tile deep-links to its section on /companion-os.
 */
export function CapabilityGrid({ linked = true }: { linked?: boolean }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {COMPANION_OS_CAPABILITIES.map((cap, i) => {
        const inner = (
          <div
            className="rounded-xl p-5 md:p-6 h-full transition-colors text-left"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <div className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="font-serif" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: 'var(--text)' }}>
              {cap.name}
            </div>
          </div>
        )
        return (
          <Reveal key={cap.id} delay={Math.min(i, 6) * 40}>
            {linked ? (
              <Link href={`/companion-os#${cap.id}`} className="block h-full hover:opacity-90">
                {inner}
              </Link>
            ) : (
              inner
            )}
          </Reveal>
        )
      })}
    </div>
  )
}
