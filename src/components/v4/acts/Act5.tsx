'use client'

import { V4, V4Reveal, monoStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'

/** ACT V · THE RECEIPT — the routing ledger, tracked creation → completion. */
export function Act5() {
  const c = useCopy(v4Copy).actV
  return (
    <section
      id="act-v"
      data-v4-act=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        padding: '130px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div style={monoStyle(10, '.45em', V4.brass)}>{c.eyebrow}</div>
      <div className="v4-statement" style={{ fontFamily: V4.serif, fontWeight: 530, fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, marginTop: 26, maxWidth: 840, textAlign: 'center', textWrap: 'balance', color: V4.text, paddingInline: 20 }}>
        {c.statementPre}
        <span style={{ fontStyle: 'italic', fontWeight: 480, color: V4.cream }}>{c.statementHi}</span>
        {c.statementPost}
      </div>

      {/* the ledger — device UI */}
      <V4Reveal style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          data-device-ui=""
          className="v4-ledger"
          style={{
            width: 620,
            maxWidth: 'calc(100% - 40px)',
            marginTop: 70,
            background: '#16100B',
            border: '1px solid rgba(201,139,78,.28)',
            borderRadius: 14,
            boxShadow: '0 40px 90px rgba(0,0,0,.5)',
            ...monoStyle(11.5, '.14em', V4.receiptText),
          }}
        >
          {c.rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                padding: '16px 24px',
                borderBottom: i < c.rows.length - 1 ? '1px solid rgba(201,139,78,.18)' : 'none',
              }}
            >
              <span>
                {r.route}
                <span style={{ color: V4.text }}>{r.item}</span>
                {r.tail}
              </span>
              <span>{r.time}</span>
            </div>
          ))}
        </div>
      </V4Reveal>

      <div className="v4-act5-close" style={{ fontFamily: V4.serif, fontWeight: 530, fontSize: 'clamp(22px, 2.4vw, 30px)', marginTop: 70, maxWidth: 760, textAlign: 'center', color: '#EFE3D0', lineHeight: 1.4, textWrap: 'balance', paddingInline: 20 }}>
        {c.footerPre}
        <span style={{ fontStyle: 'italic', fontWeight: 480, color: V4.cream, textShadow: '0 0 30px rgba(231,206,134,.4)' }}>{c.footerHi}</span>
      </div>
    </section>
  )
}
