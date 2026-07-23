'use client'

import { V4, V4Reveal, monoStyle, eyebrowStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'

/** ACT VI · LIVE IN DAYS — deployment, one statement + trust chips. */
export function Act6() {
  const c = useCopy(v4Copy).actVI
  return (
    <section
      id="act-vi"
      data-v4-act=""
      style={{
        position: 'relative',
        minHeight: '88vh',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        padding: '130px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div style={eyebrowStyle('var(--accent)')}>{c.eyebrow}</div>
      <h2 className="v4-act6-head" style={{ fontFamily: V4.serif, fontWeight: 530, fontSize: 'clamp(40px, 6.9vw, 88px)', lineHeight: 1.04, margin: '30px 0 0', textAlign: 'center', color: V4.text, paddingInline: 20 }}>
        {c.statementPre}
        <span style={{ fontStyle: 'italic', fontWeight: 480, color: V4.cream }}>{c.statementHi}</span>
      </h2>
      <div style={{ fontFamily: V4.serif, fontWeight: 530, fontSize: 'clamp(20px, 2vw, 26px)', marginTop: 36, maxWidth: 640, textAlign: 'center', color: 'rgba(242,233,218,.75)', lineHeight: 1.4, textWrap: 'balance', paddingInline: 20 }}>
        {c.line}
      </div>
      <V4Reveal>
        {/* trust chips — badge chrome, excluded from the reading measure (OQ-11) */}
        <div data-device-ui="" style={{ display: 'flex', gap: 14, marginTop: 60, flexWrap: 'wrap', justifyContent: 'center', paddingInline: 20 }}>
          {c.chips.map((chip) => (
            <div key={chip} style={{ ...monoStyle(10, '.24em', 'rgba(242,233,218,.6)'), border: '1px solid rgba(201,139,78,.3)', borderRadius: 999, padding: '11px 20px' }}>
              {chip}
            </div>
          ))}
        </div>
      </V4Reveal>
    </section>
  )
}
