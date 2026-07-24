'use client'

import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { AskBarV4 } from '../AskBarV4'
import { V4, V4Reveal, monoStyle, eyebrowStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'

/** ACT I · SUNRISE — ADDENDUM 1: the standard site nav is the chrome; the
    coordinates chip lives in the act's upper-right (part of the composition).
    §B2: no sunrise dome — the hero's proof object is the vux voice-orb at
    RC-features scale over faint hairline arcs. */
export function Act1() {
  const c = useCopy(v4Copy).actI
  return (
    <section
      id="act-i"
      data-v4-act=""
      className="v4-act-i"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 4rem)',
        overflow: 'hidden',
        background: 'transparent', /* the §4 day layer paints the act's value */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 110,
        boxSizing: 'border-box',
      }}
    >
      {/* coordinates chip — in-act mono data label (ADDENDUM 1 §D) */}
      <div
        data-device-ui=""
        className="v4-coords"
        style={{
          position: 'absolute',
          top: 34,
          right: 56,
          zIndex: 20,
          ...monoStyle(10, '.28em', 'rgba(201,139,78,.85)'),
          border: '1px solid rgba(201,139,78,.3)',
          borderRadius: 999,
          padding: '8px 16px',
        }}
      >
        {c.coords}
      </div>

      {/* No hero eyebrow by design — a category label stacked above the H1 is
          the generic SaaS move. Removed from the live v5 hero; dropped here too
          so the retired v4 acts do not keep the string alive. */}

      <h1
        className="v4-h1"
        style={{
          position: 'relative',
          zIndex: 10,
          margin: '26px 0 0',
          textAlign: 'center',
          fontWeight: 530,
          fontFamily: V4.serif,
          fontSize: 'clamp(34px, 6.6vw, 100px)', /* P4 §1: −13% — the interface is the hero */
          lineHeight: 0.98,
          letterSpacing: '-.01em',
        }}
      >
        <span style={{ display: 'block', color: V4.text }}>{c.h1Line1}</span>
        {/* §B2 — emphasis: Fraunces italic in cream, not color */}
        <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 480, color: V4.cream }}>{c.h1Line2}</span>
      </h1>

      {/* the voice-orb (vux stack, RC features page) behind the ask area;
          faint concentric hairline arcs remain as backdrop texture. The orb
          sits between the H1 and the bar: mic centered in the glow, the bar
          crossing its lower rings. */}
      <div aria-hidden="true" className="v4-hero-orb" style={{ position: 'absolute', left: '50%', top: 306, width: 400, height: 400, marginLeft: -200, zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: '-9%', borderRadius: '50%', border: '1px solid rgba(205,132,68,.18)' }} />
        <div style={{ position: 'absolute', inset: '-24%', borderRadius: '50%', border: '1px solid rgba(205,132,68,.1)' }} />
        <VoiceOrb size={400} state="listening" showMic micScale={0.115} />
      </div>

      <V4Reveal style={{ position: 'relative', zIndex: 10, marginTop: 'min(26vh, 236px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%', paddingInline: 20, boxSizing: 'border-box' }}>
        <div style={{ ...eyebrowStyle('var(--text-faint)'), textAlign: 'center' }}>{c.strip}</div>
        <AskBarV4 />
      </V4Reveal>

      <div
        className="v4-proofrow"
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 'auto',
          paddingTop: 70,
          textAlign: 'center',
          ...eyebrowStyle('var(--text-faint)'),
        }}
      >
        {c.proof}
      </div>
    </section>
  )
}
