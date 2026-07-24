import { CSSProperties } from 'react'

/**
 * Titanium device frame — the machined-metal edge shared by the hero mockups.
 *
 * This is the desktop tablet counterpart to the phone frame in globals.css
 * (`.suite-frame` @ max-width:767px). Same graphite gradient (#9A9AA0 → #3A3A40)
 * so the phone and the tablet read as the same family of hardware; the only
 * differences are radius and bezel width, which scale with the device.
 *
 * Deliberately MUTED, not bright chrome. The gradient grounds the mockup as a
 * real iPad and catches a little light against the dark page, but never becomes
 * the loudest thing on the screen — the UI inside it stays the hero. Applied
 * only to the prominent heroes (CompanionTablet, SuiteShowcase), never to the
 * small tablets in the EverySurface device family, where a row of metal edges
 * would be noise.
 *
 * Matches EverySurface's device family exactly: the same two-stop gradient and
 * a THIN bezel, so the metal reads as a hairline edge catching light rather
 * than a wide chrome band. The black-glass rim does most of the framing.
 */

const TITANIUM = 'linear-gradient(150deg, #9A9AA0, #3A3A40)'

/** The outer machined edge. `radius`/`bezel` scale per device. */
export function titaniumFrame({
  radius,
  bezel,
  drop,
}: {
  radius: number
  bezel: number
  /** The device's existing drop shadow — kept, with the specular edge added. */
  drop: string
}): CSSProperties {
  return {
    background: TITANIUM,
    border: 'none',
    borderRadius: radius,
    padding: bezel,
    // drop shadow (grounding) + a bright top hairline (specular) + a faint
    // full-perimeter inner hairline so the metal edge reads as machined.
    boxShadow: `${drop}, inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)`,
    boxSizing: 'border-box',
  }
}

/**
 * The black-glass screen inset. The 3px inset rim is the black bezel between
 * the metal and the UI — the same trick as the phone's `.suite-screen`.
 * `radius` should be `frameRadius - bezel` so the corners stay concentric.
 */
export function titaniumScreenShadow(): string {
  return '0 0 0 3px #0B0B0D inset'
}
