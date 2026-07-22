'use client'

import Link from 'next/link'
import { ArcOrb } from '@/components/cds/SunArc'
import { AskBarV4 } from '../AskBarV4'
import { V4, V4Reveal, monoStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { askBarCopy } from '@/lib/i18n/marketing/askBar'
import { useLang } from '@/lib/i18n/LanguageContext'

/** ACT VII · 2AM — stop reading, ask it something; ember below the horizon. */
export function Act7() {
  const c = useCopy(v4Copy).actVII
  const ask = useCopy(askBarCopy)
  const { lang } = useLang()
  /* kit §3 chips `UI` — EN labels from the reference; ES = the v3 chips */
  const chips = lang === 'es' ? [ask.items[0].chip, ask.items[1].chip] : ['What would you upsell at my hotel?', 'How do you handle 2AM?']
  return (
    <section
      id="act-vii"
      data-v4-act=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        padding: '150px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ ...monoStyle(10, '.45em', 'rgba(226,155,86,.7)'), position: 'relative', zIndex: 10 }}>{c.eyebrow}</div>
      <h2
        className="v4-act7-head"
        style={{
          fontFamily: V4.serif,
          fontWeight: 400,
          fontSize: 'clamp(42px, 7.2vw, 92px)',
          lineHeight: 1.05,
          margin: '30px 0 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          color: V4.text,
          paddingInline: 20,
        }}
      >
        {c.statementLine1}
        <br />
        <span style={{ fontStyle: 'italic', color: V4.champagne }}>{c.statementLine2}</span>
      </h2>

      <V4Reveal style={{ position: 'relative', zIndex: 10, marginTop: 70, width: '100%', display: 'flex', justifyContent: 'center', paddingInline: 20, boxSizing: 'border-box' }}>
        <AskBarV4 chips={chips} />
      </V4Reveal>

      <div style={{ position: 'relative', zIndex: 10, marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, paddingInline: 20 }}>
        <div style={{ fontFamily: V4.serif, fontSize: 'clamp(19px, 1.9vw, 24px)', color: 'rgba(242,233,218,.7)', fontStyle: 'italic', textAlign: 'center' }}>{c.partnerLine}</div>
        <Link
          href="/contact#founding"
          className="v4-cta"
          style={{
            background: V4.champagne,
            color: V4.ink,
            borderRadius: 999,
            padding: '16px 36px',
            ...monoStyle(11, '.24em', V4.ink),
            boxShadow: '0 0 50px rgba(231,206,134,.2)',
            textAlign: 'center',
          }}
        >
          {c.cta}
        </Link>
      </div>

      {/* ember below the horizon */}
      <div style={{ position: 'relative', width: '100%', height: 340, marginTop: 90, overflow: 'hidden' }}>
        <div aria-hidden="true" className="v4-breathe" style={{ position: 'absolute', left: '50%', top: 110, width: 900, height: 900, marginLeft: -450, opacity: 0.55 }}>
          <ArcOrb size={900} core="sunrise" />
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 76, width: 1030, height: 1030, marginLeft: -515, borderRadius: '50%', border: '1px solid rgba(205,132,68,.2)' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', zIndex: 5, ...monoStyle(10, '.4em', 'rgba(242,233,218,.4)') }}>{c.signoff}</div>
      </div>
    </section>
  )
}
