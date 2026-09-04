'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { VoiceOrb, type OrbState } from '@/components/cds/VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { useLang } from '@/lib/i18n/LanguageContext'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'

/**
 * The standard tablet control bar — one bar, every tablet on the site.
 *
 * The device grammar is settled: the answer is a picture, so the picture gets
 * the whole screen and the control lives along the bottom edge. No left rail,
 * no service pills stacked beside the image, no floating ask field — those
 * competed with the answer for the same canvas and made each surface look like
 * a different product. Whatever a guest can say next belongs here, as prompts.
 *
 * Copy defaults to the shared device strings so a new tablet is correct
 * without deciding anything; pass `label`/`chips` only when a surface is
 * running its own script (SuiteShowcase's booking flow does).
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const DIM = 'rgba(242,233,218,0.6)'

/** Measured: below this the label and the prompts cannot share one line. */
const PROMPTS_MIN_WIDTH = 760

export function DeviceVoiceBar({
  label,
  chips,
  compact = false,
  state = 'listening',
  tone = 'default',
}: {
  label?: string
  chips?: readonly string[]
  /** Small frames (in-scene devices, filmstrip cells) — tighter, label only. */
  compact?: boolean
  state?: OrbState
  /** Property-specific surface styling without changing the shared behavior. */
  tone?: 'default' | 'marazul'
}) {
  const { lang } = useLang()
  const d = useCopy(deviceScreens)
  const text = label ?? (state === 'listening' || state === 'speaking'
    ? d.voiceBar.label
    : lang === 'es' ? 'LISTO · TOCA O HABLA' : 'READY · TAP OR SPEAK')
  const prompts = chips ?? d.voiceBar.chips
  const active = state === 'listening' || state === 'speaking'
  const isMarAzul = tone === 'marazul'

  /* These devices are laid out at wildly different widths — an 860px hero
     tablet, a 560px OS tablet, a filmstrip cell — so the bar sizes itself
     against its own box rather than the viewport. Everything metric is cqi.
     The one thing cqi cannot express is "drop the prompts entirely", and a
     container query for it did not survive the CSS pipeline, so that single
     decision is measured here instead. The label never truncates and the
     prompts never wrap: below the threshold the prompts simply go. */
  const bar = useRef<HTMLDivElement | null>(null)
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const el = bar.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWide(e.contentRect.width >= PROMPTS_MIN_WIDTH))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={bar}
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: compact ? 10 : 18,
        padding: compact ? 'clamp(6px,1.4cqi,9px) clamp(10px,2cqi,16px)' : 'clamp(9px,1.6cqi,14px) clamp(16px,3cqi,30px)',
        borderTop: isMarAzul ? '1px solid rgba(134,185,183,.22)' : '1px solid rgba(243,236,226,0.08)',
        background: isMarAzul
          ? 'linear-gradient(90deg, rgba(5,30,34,.96), rgba(8,47,51,.94))'
          : 'rgba(11,9,8,0.55)',
        containerType: 'inline-size',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 'clamp(6px,1.4cqi,10px)' : 'clamp(10px,2cqi,16px)', flexShrink: 0 }}>
        <VoiceOrb className={isMarAzul ? 'vmic-marazul' : ''} state={state} size={compact ? 'clamp(14px,3.2cqi,22px)' : 'clamp(20px,4.2cqi,36px)'} showMic={false} />
        <span className="v5-eq" aria-hidden>
          <i style={{ animationPlayState: active ? 'running' : 'paused', transform: active ? undefined : 'scaleY(.5)' }} />
          <i style={{ animationPlayState: active ? 'running' : 'paused', transform: active ? undefined : 'scaleY(.5)' }} />
          <i style={{ animationPlayState: active ? 'running' : 'paused', transform: active ? undefined : 'scaleY(.5)' }} />
          <i style={{ animationPlayState: active ? 'running' : 'paused', transform: active ? undefined : 'scaleY(.5)' }} />
          <i style={{ animationPlayState: active ? 'running' : 'paused', transform: active ? undefined : 'scaleY(.5)' }} />
        </span>
        <span
          style={{
            ...MONO,
            fontSize: compact ? 'clamp(8px,1.5cqi,9px)' : 'clamp(8.5px, 1.4cqi, 10.5px)',
            letterSpacing: '.18em',
            color: isMarAzul ? 'rgba(247,236,221,.72)' : DIM,
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </span>
      </span>
      {!compact && wide && (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'nowrap', gap: 'clamp(10px,2cqi,18px)', flexShrink: 0 }}>
          {prompts.map((ch, i) => (
            <span key={ch} style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'nowrap', gap: 'clamp(10px,2cqi,18px)' }}>
              {i > 0 && <span aria-hidden style={{ color: isMarAzul ? 'rgba(134,185,183,.38)' : 'rgba(242,233,218,0.3)' }}>·</span>}
              <span style={{ fontFamily: SANS, fontSize: 'clamp(10px,1.6cqi,14px)', color: isMarAzul ? 'rgba(247,236,221,.84)' : 'rgba(242,233,218,0.85)', whiteSpace: 'nowrap' }}>{ch}</span>
            </span>
          ))}
        </span>
      )}
    </div>
  )
}
