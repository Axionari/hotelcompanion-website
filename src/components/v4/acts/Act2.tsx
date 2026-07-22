'use client'

import { V4, V4Reveal, monoStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { useLang } from '@/lib/i18n/LanguageContext'
import { v4Copy } from '@/lib/i18n/marketing/v4'

/** ACT II · THE ARITHMETIC — the two stakes as numbers-as-art (A2 treatments:
    outline stroke / italic champagne glow, sr-only plain values). */
export function Act2() {
  const c = useCopy(v4Copy).actII
  const { lang } = useLang()
  return (
    <section
      id="act-ii"
      data-v4-act=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        padding: '110px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div className="v4-w1080">
        <div style={monoStyle(10, '.45em', V4.emberEyebrow)}>{c.eyebrow}</div>
        <V4Reveal>
          <div className="v4-act2-grid" style={{ marginTop: 40, alignItems: 'start' }}>
            <div>
              <div data-v4-outline="">
                <span
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    fontFamily: V4.serif,
                    fontSize: 'min(270px, 21vw)',
                    lineHeight: 1,
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(231,206,134,.5)',
                    letterSpacing: '-.02em',
                  }}
                >
                  {c.figure1}
                </span>
                <span className="sr-only">{c.figure1}</span>
              </div>
              <div style={{ fontFamily: V4.serif, fontSize: 25, color: '#EFE3D0', marginTop: 18, maxWidth: 380, lineHeight: 1.35, textWrap: 'pretty' }}>
                {c.line1}
              </div>
              <div style={{ ...monoStyle(10, '.3em', 'rgba(242,233,218,.4)'), marginTop: 16 }}>{c.source1}</div>
            </div>
            <div className="v4-act2-right" style={{ marginTop: 230, textAlign: 'right' }}>
              <div data-v4-glow="">
                <span
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    fontFamily: V4.serif,
                    fontStyle: 'italic',
                    fontSize: lang === 'es' ? 'min(120px, 9.4vw)' : 'min(210px, 16.4vw)',
                    lineHeight: 1,
                    color: V4.champagne,
                    textShadow: '0 0 50px rgba(231,206,134,.35), 0 0 130px rgba(226,155,86,.22)',
                    letterSpacing: '-.02em',
                  }}
                >
                  {c.figure2}
                </span>
                <span className="sr-only">{c.figure2}</span>
              </div>
              <div style={{ fontFamily: V4.serif, fontSize: 25, color: '#EFE3D0', marginTop: 18, lineHeight: 1.35, marginLeft: 'auto', maxWidth: 400, textWrap: 'pretty' }}>
                {c.line2}
              </div>
              <div style={{ ...monoStyle(10, '.3em', 'rgba(242,233,218,.4)'), marginTop: 16 }}>{c.source2}</div>
            </div>
          </div>
        </V4Reveal>
      </div>
    </section>
  )
}
