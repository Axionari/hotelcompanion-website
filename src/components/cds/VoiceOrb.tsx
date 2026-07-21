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
  ripples = false,
  keepMic = false,
  micScale = 0.16,
  className = '',
}: {
  state?: OrbState
  /** px, or any CSS length for fluid sizing. */
  size?: number | string
  showMic?: boolean
  /** Rings that expand outward while listening. For the large hero orb. */
  ripples?: boolean
  /** Keep the mic glyph centred while speaking instead of swapping in bars. */
  keepMic?: boolean
  /** Mic glyph size as a fraction of the orb. */
  micScale?: number
  className?: string
}) {
  const [live, setLive] = useState(false)

  useEffect(() => {
    setLive(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const micSize = typeof size === 'number' ? Math.max(14, Math.round(size * micScale)) : 26

  return (
    <div
      className={`vmic ${live ? 'live' : ''} ${className}`}
      data-state={state}
      style={{ width: size, height: typeof size === 'number' ? size : undefined }}
      aria-hidden="true"
    >
      {ripples && (
        <>
          <span className="vripple" />
          <span className="vripple" />
          <span className="vripple" />
        </>
      )}

      <span className="vstage">
        <span className="vring r1" />
        <span className="vring r2" />
        <span className="vglow" />
        <span className="vshimmer" />
      </span>

      {showMic && (keepMic || state !== 'speaking') && (
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

      {showMic && !keepMic && state === 'speaking' && (
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

/**
 * The orb as the primary voice control (Live Demo · D11).
 *
 * On Restaurant Companion's Features page the orb is the hero of the
 * interaction, not an icon inside a text field — so here it is a real button:
 * pressing it starts and stops listening, and it reflects the genuine Web
 * Speech state. The waveform sits beneath the orb so the mic glyph stays
 * centred throughout, and the label names the current state in words.
 *
 * Three states: motion (rings pulse, ripples expand, bars animate) /
 * reduced-motion (static glow, no ripples, no bars) / no-JS (the button is
 * inert but the orb still renders, and the text field beside it still works).
 */
export function VoiceOrbControl({
  state = 'idle',
  size,
  label,
  ariaLabel,
  pressed,
  onToggle,
  disabled = false,
  className = '',
}: {
  state?: OrbState
  size: number | string
  /** Human-readable state, shown beneath the orb. */
  label: string
  ariaLabel: string
  pressed: boolean
  onToggle: () => void
  disabled?: boolean
  className?: string
}) {
  const [live, setLive] = useState(false)

  useEffect(() => {
    setLive(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={pressed}
      className={`vctl ${live ? 'live' : ''} ${className}`}
      data-state={state}
      style={{ cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.55 : 1 }}
    >
      <VoiceOrb state={state} size={size} showMic ripples keepMic micScale={0.13} />

      <span className="vctl-wave" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>

      <span className="vctl-label">{label}</span>
    </button>
  )
}
