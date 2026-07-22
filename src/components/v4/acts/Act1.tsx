'use client'

import { ArcOrb } from '@/components/cds/SunArc'
import { AskBarV4 } from '../AskBarV4'
import { V4, V4Reveal, monoStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'

/** ACT I · SUNRISE — reference geometry 1:1: chrome bar, eyebrow, nowrap H1
    over the rising dome, ask-bar on the dome, proof row at the fold. */
export function Act1() {
  const c = useCopy(v4Copy).actI
  return (
    <section
      id="act-i"
      data-v4-act=""
      className="v4-act-i"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 110,
        boxSizing: 'border-box',
      }}
    >
      {/* top bar — page chrome (the v4 homepage's nav band) */}
      <header
        data-v4-chrome=""
        className="v4-topbar"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '34px 56px',
          zIndex: 20,
        }}
      >
        <div style={monoStyle(12, '.42em', V4.text)}>{c.wordmark}</div>
        <div
          style={{
            ...monoStyle(10, '.28em', 'rgba(201,139,78,.85)'),
            border: '1px solid rgba(201,139,78,.3)',
            borderRadius: 999,
            padding: '8px 16px',
          }}
        >
          {c.coords}
        </div>
      </header>

      <div className="v4-act1-eyebrow" style={{ ...monoStyle(10, '.5em', 'rgba(226,155,86,.75)'), marginTop: 130, zIndex: 20, textAlign: 'center' }}>
        {c.eyebrow}
      </div>

      {/* the dome — shared ember orb, sunrise ramp, rising behind the headline */}
      <div aria-hidden="true" className="v4-dome v4-breathe" style={{ position: 'absolute', left: '50%', top: '44%', width: 760, height: 760, marginLeft: -380, zIndex: 1 }}>
        <ArcOrb size={760} core="sunrise" />
        <div className="v4-ring-breathe" style={{ position: 'absolute', inset: '-9%', borderRadius: '50%', border: '1px solid rgba(205,132,68,.32)', boxShadow: '0 0 90px 20px rgba(178,106,53,.14) inset, 0 0 120px 30px rgba(178,106,53,.1)' }} />
        <div className="v4-ring-drift" style={{ position: 'absolute', inset: '-24%', borderRadius: '50%', border: '1px solid rgba(205,132,68,.16)' }} />
      </div>

      <h1
        className="v4-h1"
        style={{
          position: 'relative',
          zIndex: 10,
          margin: '26px 0 0',
          textAlign: 'center',
          fontWeight: 400,
          fontFamily: V4.serif,
          fontSize: 'clamp(38px, 7.6vw, 118px)',
          lineHeight: 0.98,
          letterSpacing: '-.01em',
        }}
      >
        <span style={{ display: 'block', color: V4.text }}>{c.h1Line1}</span>
        <span style={{ display: 'block', fontStyle: 'italic', color: V4.champagne }}>{c.h1Line2}</span>
      </h1>

      <V4Reveal style={{ position: 'relative', zIndex: 10, marginTop: 96, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%', paddingInline: 20, boxSizing: 'border-box' }}>
        <div style={{ ...monoStyle(10, '.4em', V4.textSoft), textAlign: 'center' }}>{c.strip}</div>
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
          ...monoStyle(10, '.32em', V4.textFaint),
          transform: 'translateY(76px)',
        }}
      >
        {c.proof}
      </div>
    </section>
  )
}
