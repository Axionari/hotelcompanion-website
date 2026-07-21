'use client'

import { useEffect, useState } from 'react'

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking'

/**
 * The animated voice orb, ported from Restaurant Companion's Features page.
 *
 * Structure and values were read from the live RC site rather than guessed:
 * two concentric rings (r1 inset 0, r2 inset 16%), a radial glow at inset 22%,
 * and a conic shimmer at inset 16% masked into a ring so it sweeps the rim.
 * `data-state` drives opacity per state; the `.live` class gates every
 * animation so reduced-motion simply renders the resting composition.
 *
 * Sizes are fluid — the same component serves the hero, the tablet screen and
 * the persistent launcher.
 */
export function VoiceOrb({
  state = 'idle',
  size = 220,
  showMic = true,
  className = '',
}: {
  state?: OrbState
  /** px, or any CSS length for fluid sizing. */
  size?: number | string
  showMic?: boolean
  className?: string
}) {
  const [live, setLive] = useState(false)

  useEffect(() => {
    setLive(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const micSize = typeof size === 'number' ? Math.max(14, Math.round(size * 0.16)) : 22

  return (
    <div
      className={`vmic ${live ? 'live' : ''} ${className}`}
      data-state={state}
      style={{ width: size, height: typeof size === 'number' ? size : undefined }}
      aria-hidden="true"
    >
      <span className="vstage">
        <span className="vring r1" />
        <span className="vring r2" />
        <span className="vglow" />
        <span className="vshimmer" />
      </span>

      {showMic && state !== 'speaking' && (
        <svg
          width={micSize}
          height={micSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text)"
          strokeWidth="1.6"
          style={{ position: 'relative', opacity: 0.92 }}
        >
          <rect x="9" y="2" width="6" height="11" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0M12 17v5" strokeLinecap="round" />
        </svg>
      )}

      {showMic && state === 'speaking' && (
        <span className="vwave" style={{ position: 'relative' }}>
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
    </div>
  )
}
