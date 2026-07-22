'use client'

import { CSSProperties } from 'react'
import { ArcOrb } from '@/components/cds/SunArc'
import { V4, V4Reveal, monoStyle, DeferredImg } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'

/** ACT III · ONE DAY, ONE VOICE — statement, the sun ON its drawn arc, three
    moment columns. Card contents ported from the v3 arc stops (kit §2/§3);
    real assets replace the reference's striped placeholders (standing law). */

const bubble: CSSProperties = {
  alignSelf: 'flex-end',
  background: 'rgba(231,206,134,.14)',
  border: '1px solid rgba(231,206,134,.22)',
  borderRadius: '16px 16px 4px 16px',
  padding: '10px 16px',
  fontSize: 14,
  color: V4.text,
}

const card: CSSProperties = {
  background: V4.cardBg,
  border: `1px solid ${V4.cardBorder}`,
  borderRadius: 18,
  overflow: 'hidden',
  boxShadow: '0 24px 60px rgba(0,0,0,.45)',
}

function Moment({ i, children, extraTop = 0 }: { i: number; children: React.ReactNode; extraTop?: number }) {
  const c = useCopy(v4Copy).actIII
  return (
    <div className="v4-moment" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginTop: extraTop }}>
      <div style={{ fontFamily: V4.serif, fontSize: 58, color: V4.champagne, lineHeight: 1 }}>{c.moments[i].time}</div>
      <div style={monoStyle(10, '.35em', 'rgba(242,233,218,.5)')}>{c.moments[i].tag}</div>
      {/* device-UI: the moment's screen content (bubble + card + receipt) */}
      <div data-device-ui="" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        {children}
      </div>
    </div>
  )
}

export function Act3() {
  const c = useCopy(v4Copy).actIII
  const screens = useCopy(deviceScreens).screens
  return (
    <section
      id="act-iii"
      data-v4-act=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        padding: '120px 0 140px',
        boxSizing: 'border-box',
      }}
    >
      <div className="v4-w1160" style={{ position: 'relative', zIndex: 5 }}>
        <div style={monoStyle(10, '.45em', V4.emberEyebrow)}>{c.eyebrow}</div>
        <div className="v4-statement" style={{ fontFamily: V4.serif, fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.14, maxWidth: 820, marginTop: 30, textWrap: 'balance', color: V4.text }}>
          {c.statementPre}
          <span style={{ fontStyle: 'italic', color: V4.champagne }}>{c.statementHi}</span>
        </div>
      </div>

      {/* the arc, and the sun ON it */}
      <div aria-hidden="true" className="v4-sunarc-line" style={{ position: 'absolute', left: '50%', top: 470, width: 3000, height: 3000, marginLeft: -1500, borderRadius: '50%', border: '1px solid rgba(200,130,70,.22)', zIndex: 1 }} />
      <div aria-hidden="true" className="v4-breathe v4-sunarc-sun" style={{ position: 'absolute', left: '50%', top: 412, width: 110, height: 110, marginLeft: -55, zIndex: 2 }}>
        <ArcOrb size={110} core="sunrise" />
      </div>

      <V4Reveal className="v4-w1160 v4-moments" style={{ margin: '190px auto 0', position: 'relative', zIndex: 5, alignItems: 'start' }}>
        {/* 10:04 · tablet — the v3 Akumal card (real asset) */}
        <Moment i={0}>
          <div style={bubble}>{c.bubble1}</div>
          <div style={card}>
            <DeferredImg alt={screens.beach.title} src="/assets/ui/beach-akumal-band.webp" style={{ height: 130, width: '100%', objectFit: 'cover', display: 'block', background: '#241B10' }} />
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#F5EDDE' }}>{screens.beach.title}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(242,233,218,.6)' }}>{screens.beach.meta}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
                <div style={{ border: '1px solid rgba(242,233,218,.25)', borderRadius: 999, padding: '8px 16px', fontSize: 12, color: V4.text }}>{screens.beach.actions[0]}</div>
                <div style={{ background: '#C97B3D', borderRadius: 999, padding: '8px 16px', fontSize: 12, color: '#1A0F06', fontWeight: 600 }}>{screens.beach.actions[1]}</div>
              </div>
            </div>
          </div>
        </Moment>

        {/* 18:40 · phone — the v3 suite upsell card */}
        <Moment i={1} extraTop={70}>
          <div style={{ width: '78%', display: 'flex', flexDirection: 'column', gap: 12, marginInline: 'auto' }}>
            <div style={bubble}>{c.bubble2}</div>
            <div style={card}>
              <DeferredImg alt="Suite Vista al Mar" src="/assets/ui/suite-1-900.webp" style={{ height: 96, width: '100%', objectFit: 'cover', display: 'block', background: '#241B10' }} />
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#F5EDDE' }}>Suite Vista al Mar</div>
                <div style={{ fontSize: 12.5, color: 'rgba(242,233,218,.6)' }}>{c.suitePrice}</div>
                <div style={{ background: '#C97B3D', borderRadius: 999, padding: '9px 16px', fontSize: 12, color: '#1A0F06', fontWeight: 600, textAlign: 'center', marginTop: 6 }}>
                  {screens.upgrade.confirm}
                </div>
              </div>
            </div>
          </div>
        </Moment>

        {/* 02:14 · voice — the v3 2:14 receipt */}
        <Moment i={2} extraTop={140}>
          <div style={{ ...bubble, background: 'rgba(231,206,134,.1)', border: '1px solid rgba(231,206,134,.18)', color: 'rgba(242,233,218,.85)' }}>{c.bubble3}</div>
          <div
            style={{
              background: '#14100B',
              border: '1px solid rgba(201,139,78,.3)',
              borderRadius: 12,
              padding: '14px 18px',
              ...monoStyle(11, '.14em', V4.receiptText),
              lineHeight: 2,
            }}
          >
            {c.receipt214[0]}
            <span style={{ color: V4.text }}>{c.receipt214[1]}</span>
            {c.receipt214[2]}
            <br />
            {c.receipt214[3]}
          </div>
        </Moment>
      </V4Reveal>
    </section>
  )
}
