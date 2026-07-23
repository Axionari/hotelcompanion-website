'use client'

import Link from 'next/link'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { AskBarV4 } from '../AskBarV4'
import { V4, V4Reveal, eyebrowStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { askBarCopy } from '@/lib/i18n/marketing/askBar'
import { useLang } from '@/lib/i18n/LanguageContext'
import { globalCopy } from '@/lib/i18n/marketing/global'

/** ACT VII · 2AM — stop reading, ask it something; ember below the horizon. */
export function Act7() {
  const c = useCopy(v4Copy).actVII
  const ask = useCopy(askBarCopy)
  const g = useCopy(globalCopy)
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
      <div style={{ ...eyebrowStyle('var(--accent)'), position: 'relative', zIndex: 10 }}>{c.eyebrow}</div>
      <h2
        className="v4-act7-head"
        style={{
          fontFamily: V4.serif,
          fontWeight: 530,
          fontSize: 'clamp(34px, 6vw, 80px)', /* P4 §2: one display scale */
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
        <span style={{ fontStyle: 'italic', fontWeight: 480, color: V4.cream }}>{c.statementLine2}</span>
      </h2>

      <V4Reveal style={{ position: 'relative', zIndex: 10, marginTop: 70, width: '100%', display: 'flex', justifyContent: 'center', paddingInline: 20, boxSizing: 'border-box' }}>
        <AskBarV4 chips={chips} />
      </V4Reveal>

      <div style={{ position: 'relative', zIndex: 10, marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, paddingInline: 20 }}>
        <div style={{ fontFamily: V4.serif, fontWeight: 480, fontSize: 'clamp(19px, 1.9vw, 24px)', color: 'rgba(242,233,218,.7)', fontStyle: 'italic', textAlign: 'center' }}>{c.partnerLine}</div>
        {/* ADDENDUM 2 — partner signal above, Book a Demo as the primary
            action: the homepage's job is customers */}
        <Link href="/demo" className="btn-primary">
          {g.nav.bookDemo}
        </Link>
      </div>

      {/* ADDENDUM 1 §B2 — no setting sun: the act closes on warm black with
          the voice-orb in a dim resting state above the sign-off */}
      <div style={{ position: 'relative', width: '100%', height: 340, marginTop: 90, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 44, paddingBottom: 30, boxSizing: 'border-box' }}>
        <div aria-hidden="true" style={{ opacity: 0.55 }}>
          <VoiceOrb size={150} state="idle" showMic={false} />
        </div>
        <div style={{ textAlign: 'center', zIndex: 5, ...eyebrowStyle('var(--text-faint)') }}>{c.signoff}</div>
      </div>
    </section>
  )
}
