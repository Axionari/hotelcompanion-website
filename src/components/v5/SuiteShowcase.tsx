'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { suitesCopy } from '@/lib/i18n/marketing/suites'

/**
 * SuiteShowcase — the homepage's big in-room tablet, running the full guided
 * booking flow (the RC ordering demo's logic, applied to a hotel stay):
 * welcome → browse → suite → your stay → review → payment → confirming →
 * confirmed → loyalty. Auto-advances; phase pills jump; reduced motion holds
 * the suite detail. Near full-width on desktop.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const SERIF = 'var(--font-serif), Georgia, serif'
const TERRA = '#C86A3A'
const CREAM = '#F5EDDE'
const DIM = 'rgba(242,233,218,0.6)'

type SuiteCopy = (typeof suitesCopy)['en']

/* ── shared bits ─────────────────────────────────────────────────────── */

/** Persistent voice bar — orb + live frequency + listening label + prompts.
 *  Sits under every screen: the whole flow is voice-first. */
function VoiceBar({ c }: { c: SuiteCopy }) {
  return (
    <div
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        padding: 'clamp(9px,1vw,14px) clamp(16px,2vw,30px)',
        borderTop: '1px solid rgba(243,236,226,0.08)',
        background: 'rgba(11,9,8,0.55)',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(10px,1.2vw,16px)', minWidth: 0 }}>
        <VoiceOrb state="listening" size="clamp(24px,2.5vw,36px)" showMic={false} />
        <span className="v5-eq" aria-hidden>
          <i /><i /><i /><i /><i />
        </span>
        <span style={{ ...MONO, fontSize: 'clamp(9px, 0.75vw, 10.5px)', letterSpacing: '.18em', color: DIM, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {c.voiceBar.label}
        </span>
      </span>
      <span className="hidden md:inline-flex" style={{ alignItems: 'center', gap: 'clamp(10px,1.3vw,18px)', flexShrink: 0 }}>
        {c.voiceBar.chips.map((ch, i) => (
          <span key={ch} style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(10px,1.3vw,18px)' }}>
            {i > 0 && <span aria-hidden style={{ color: 'rgba(242,233,218,0.3)' }}>·</span>}
            <span style={{ fontFamily: SANS, fontSize: 'clamp(10px,1vw,14px)', color: 'rgba(242,233,218,0.85)', whiteSpace: 'nowrap' }}>{ch}</span>
          </span>
        ))}
      </span>
    </div>
  )
}

function TopBar({ c, count }: { c: SuiteCopy; count: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <span
        style={{ ...MONO, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'clamp(9px, 0.72vw, 10.5px)', letterSpacing: '.16em', color: TERRA, border: '1px solid rgba(200,106,58,0.4)', background: 'rgba(11,9,8,0.4)', borderRadius: 999, padding: '6px 13px' }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: TERRA }} />
        {c.property.toUpperCase()}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ ...MONO, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'clamp(9px, 0.7vw, 10px)', letterSpacing: '.1em', color: DIM, border: '1px solid rgba(243,236,226,0.14)', borderRadius: 999, padding: '5px 11px' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: TERRA }} /> EN
        </span>
        <span style={{ ...MONO, fontSize: 'clamp(9px, 0.72vw, 10.5px)', letterSpacing: '.06em', color: CREAM, border: '1px solid rgba(243,236,226,0.16)', background: 'rgba(243,236,226,0.05)', borderRadius: 999, padding: '5px 12px' }}>
          ▤ {count} · {c.total}
        </span>
      </div>
    </div>
  )
}

/** Big terracotta action bar. */
function Cta({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: TERRA, borderRadius: 14, padding: 'clamp(11px,1.3vw,17px)', fontFamily: SANS, fontWeight: 700, fontSize: 'clamp(11px,1.1vw,15px)', color: '#1a1207', letterSpacing: '.01em' }}>
      {children}
    </div>
  )
}

const pad: CSSProperties = { position: 'absolute', inset: 0, padding: 'clamp(16px,2vw,32px)', display: 'flex', flexDirection: 'column' }

/* ── 1 · welcome ─────────────────────────────────────────────────────── */
function WelcomeScreen({ c }: { c: SuiteCopy }) {
  return (
    <div style={{ ...pad, alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 'clamp(10px,1.4vw,20px)' }}>
      <VoiceOrb state="listening" size="clamp(120px,14vw,190px)" ripples showMic micScale={0.22} />
      <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(22px,2.6vw,40px)', color: CREAM, lineHeight: 1 }}>{c.property}</div>
      <div style={{ ...MONO, fontSize: 'clamp(9px, 0.85vw, 12px)', letterSpacing: '.22em', color: TERRA }}>{c.tagline}</div>
      <div style={{ marginTop: 'clamp(9px, 0.8vw, 12px)', fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(18px,2vw,30px)', color: CREAM, lineHeight: 1.15 }}>
        {c.welcome.hello}
        <span style={{ color: DIM }}> · {c.welcome.hello2}</span>
      </div>
      <div style={{ display: 'flex', gap: 'clamp(9px, 1vw, 14px)', marginTop: 'clamp(9px, 1vw, 16px)', width: 'min(420px, 80%)' }}>
        <span style={{ flex: 1, fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.1vw,15px)', color: '#1a1207', background: TERRA, borderRadius: 12, padding: 'clamp(10px,1.2vw,15px)' }}>{c.welcome.en}</span>
        <span style={{ flex: 1, fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.1vw,15px)', color: CREAM, border: '1px solid rgba(243,236,226,0.28)', borderRadius: 12, padding: 'clamp(10px,1.2vw,15px)' }}>{c.welcome.es}</span>
      </div>
    </div>
  )
}

/* ── 2 · browse ──────────────────────────────────────────────────────── */
function BrowseScreen({ c }: { c: SuiteCopy }) {
  return (
    <div style={pad}>
      <TopBar c={c} count={5} />
      <div style={{ marginTop: 'clamp(12px,1.6vw,22px)', display: 'flex', alignItems: 'baseline', gap: 12, flexShrink: 0 }}>
        <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(20px,2.3vw,34px)', color: CREAM, lineHeight: 1 }}>{c.browseTitle}</span>
        <span style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '.14em', color: 'rgba(242,233,218,0.5)' }}>{c.browseMeta}</span>
      </div>
      <div className="suite-cols" style={{ marginTop: 'clamp(11px,1.5vw,20px)', flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(9px,1.1vw,16px)' }}>
        {c.list.map((s) => (
          <div key={s.key} style={{ position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', background: 'rgba(243,236,226,0.04)', border: `1px solid ${s.featured ? 'rgba(200,106,58,0.6)' : 'rgba(243,236,226,0.1)'}`, boxShadow: s.featured ? '0 0 40px -12px rgba(200,106,58,0.5)' : 'none' }}>
            <div style={{ position: 'relative', flex: 1, minHeight: 'clamp(80px,10vw,180px)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={s.name} src={s.image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,9,8,0.05) 0%, transparent 40%, rgba(11,9,8,0.6) 100%)' }} />
              {s.featured && <span style={{ position: 'absolute', top: 10, left: 10, ...MONO, fontSize: 'clamp(9px, 0.7vw, 9.5px)', letterSpacing: '.08em', color: '#1a1207', background: TERRA, borderRadius: 999, padding: '4px 9px' }}>{c.featured}</span>}
            </div>
            <div style={{ padding: 'clamp(9px,1.1vw,15px)', display: 'flex', flexDirection: 'column', gap: 'clamp(9px, 0.7vw, 9.5px)', flexShrink: 0 }}>
              <div>
                <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(12px,1.15vw,18px)', lineHeight: 1.15, color: CREAM }}>{s.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.85vw, 12px)', color: DIM, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.meta}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(12px,1.15vw,18px)', color: CREAM }}>{s.price}<span style={{ ...MONO, fontSize: 'clamp(9px, 0.7vw, 10px)', color: 'rgba(242,233,218,0.5)' }}> {c.nightShort}</span></span>
                <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(9px, 0.85vw, 12px)', color: s.featured ? '#1a1207' : CREAM, background: s.featured ? TERRA : 'transparent', border: s.featured ? '1px solid transparent' : '1px solid rgba(243,236,226,0.35)', borderRadius: 999, padding: 'clamp(9px, 0.6vw, 9.5px) clamp(11px,1.2vw,16px)' }}>{c.view}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 3 · detail — per-room content; tabs switch the room ─────────────── */
function DetailScreen({ c }: { c: SuiteCopy }) {
  const [room, setRoom] = useState(1) // default: Ocean-View (most booked)
  const d = c.details[room]
  const [img, setImg] = useState(0)
  useEffect(() => setImg(0), [room])
  useEffect(() => {
    if (d.images.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setImg((n) => (n + 1) % d.images.length), 2400)
    return () => window.clearInterval(t)
  }, [d.images.length, room])
  return (
    <div style={pad}>
      <TopBar c={c} count={5} />
      {/* room tabs — the detail content is per room */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(9px, 0.6vw, 9.5px)', marginTop: 'clamp(9px,1.1vw,14px)', flexShrink: 0 }}>
        {c.details.map((r, idx) => {
          const on = idx === room
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => setRoom(idx)}
              style={{ fontFamily: SANS, fontSize: 'clamp(9px,0.85vw,12px)', fontWeight: on ? 600 : 500, color: on ? CREAM : DIM, background: on ? 'rgba(200,106,58,0.15)' : 'transparent', border: `1px solid ${on ? 'rgba(200,106,58,0.6)' : 'rgba(243,236,226,0.14)'}`, borderRadius: 999, padding: 'clamp(9px, 0.55vw, 9.5px) clamp(11px,1.2vw,16px)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .3s var(--ease-standard)' }}
            >
              {r.name}
            </button>
          )
        })}
      </div>
      <div className="suite-cols" style={{ marginTop: 'clamp(10px,1.3vw,18px)', flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(14px,1.8vw,28px)' }}>
        <div className="suite-shot" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
          {d.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} alt={d.name} src={src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === img ? 1 : 0, transition: 'opacity 0.9s var(--ease-standard)' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(11,9,8,0.85) 100%)' }} />
          <div style={{ position: 'absolute', left: 'clamp(14px,1.5vw,22px)', bottom: 'clamp(14px,1.5vw,22px)', right: 16 }}>
            <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(18px,2.1vw,30px)', lineHeight: 1.05, color: CREAM }}>{d.name}</div>
            <div style={{ fontFamily: SANS, fontSize: 'clamp(9px,0.95vw,13px)', color: 'rgba(242,233,218,0.75)', marginTop: 4 }}>{d.tagline}</div>
          </div>
          {d.images.length > 1 && (
            <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 5 }}>
              {d.images.map((_, i) => <span key={i} style={{ width: i === img ? 16 : 6, height: 6, borderRadius: 999, background: i === img ? TERRA : 'rgba(242,233,218,0.4)', transition: 'width .4s' }} />)}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(22px,2.5vw,38px)', color: CREAM, lineHeight: 1 }}>{d.price}</span>
            <span style={{ ...MONO, fontSize: 'clamp(9px,0.9vw,12px)', color: 'rgba(242,233,218,0.55)' }}>{d.night}</span>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(11px,1.05vw,14.5px)', lineHeight: 1.5, color: 'rgba(242,233,218,0.82)', marginTop: 'clamp(9px, 1vw, 13px)' }}>{d.desc}</p>
          <div style={{ marginTop: 'clamp(9px,1.1vw,15px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(9px, 0.6vw, 9.5px)' }}>
            {d.features.map((f) => <span key={f} style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.82vw, 11.5px)', color: 'rgba(242,233,218,0.8)', border: '1px solid rgba(243,236,226,0.15)', background: 'rgba(243,236,226,0.04)', borderRadius: 999, padding: 'clamp(9px, 0.55vw, 9.5px) clamp(9px,1vw,13px)', whiteSpace: 'nowrap' }}>{f}</span>)}
          </div>
          <div style={{ marginTop: 'clamp(10px,1.2vw,16px)', display: 'flex', alignItems: 'center', gap: 'clamp(10px,1.2vw,15px)', border: '1px solid rgba(243,236,226,0.1)', background: 'rgba(243,236,226,0.03)', borderRadius: 14, padding: 'clamp(9px,1.1vw,15px)' }}>
            <span aria-hidden style={{ flexShrink: 0, width: 'clamp(26px,2.8vw,40px)', height: 'clamp(26px,2.8vw,40px)', display: 'grid', placeItems: 'center', borderRadius: 12, background: 'rgba(200,106,58,0.14)', border: '1px solid rgba(200,106,58,0.3)', fontSize: 'clamp(12px,1.3vw,18px)', color: TERRA }}>✦</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ ...MONO, fontSize: 'clamp(9px, 0.7vw, 9.5px)', letterSpacing: '.12em', color: TERRA }}>{d.includesLabel}</div>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.05vw,14px)', color: CREAM, marginTop: 2 }}>{d.includesTitle}</div>
              <div style={{ fontFamily: SANS, fontSize: 'clamp(9px,0.88vw,12px)', color: DIM }}>{d.includesNote}</div>
            </div>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 'clamp(11px,1.2vw,16px)' }}><Cta>{d.cta} · {d.price}</Cta></div>
        </div>
      </div>
    </div>
  )
}

/* ── 4 · cart ────────────────────────────────────────────────────────── */
function CartScreen({ c }: { c: SuiteCopy }) {
  return (
    <div style={pad}>
      <TopBar c={c} count={5} />
      <div style={{ textAlign: 'center', marginTop: 'clamp(9px, 1vw, 14px)', flexShrink: 0 }}>
        <div style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '.18em', color: TERRA }}>{c.cart.label}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(20px,2.2vw,34px)', color: CREAM, marginTop: 4 }}>{c.cart.title}</div>
      </div>
      <div style={{ marginTop: 'clamp(10px,1.3vw,18px)', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(9px, 0.9vw, 12px)', overflow: 'hidden' }}>
        {c.cart.items.map((it) => (
          <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1.2vw,16px)', background: 'rgba(243,236,226,0.04)', border: '1px solid rgba(243,236,226,0.1)', borderRadius: 14, padding: 'clamp(9px, 0.9vw, 12px)' }}>
            <div style={{ position: 'relative', flexShrink: 0, width: 'clamp(42px,4.6vw,66px)', height: 'clamp(42px,4.6vw,66px)', borderRadius: 10, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={it.name} src={it.image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.1vw,15px)', color: CREAM }}>{it.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.85vw, 12px)', color: DIM, marginTop: 2 }}>{it.meta}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(9px, 0.8vw, 11px)', flexShrink: 0 }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 'clamp(20px,2.2vw,28px)', height: 'clamp(20px,2.2vw,28px)', borderRadius: '50%', border: '1px solid rgba(243,236,226,0.2)', color: DIM, fontSize: 'clamp(12px,1.3vw,16px)' }}>−</span>
              <span style={{ ...MONO, fontSize: 'clamp(11px,1.1vw,14px)', color: CREAM, minWidth: 14, textAlign: 'center' }}>{it.qty}</span>
              <span style={{ display: 'grid', placeItems: 'center', width: 'clamp(20px,2.2vw,28px)', height: 'clamp(20px,2.2vw,28px)', borderRadius: '50%', border: '1px solid rgba(243,236,226,0.2)', color: DIM, fontSize: 'clamp(12px,1.3vw,16px)' }}>+</span>
            </div>
            <span style={{ ...MONO, fontSize: 'clamp(11px,1.1vw,15px)', color: CREAM, flexShrink: 0, minWidth: 52, textAlign: 'right' }}>{it.price}</span>
          </div>
        ))}
        <div style={{ textAlign: 'center', ...MONO, fontSize: 'clamp(9px,0.9vw,12px)', letterSpacing: '.06em', color: DIM, padding: '4px 0' }}>{c.cart.add}</div>
      </div>
      <div style={{ marginTop: 'clamp(9px, 1vw, 14px)', flexShrink: 0 }}><Cta>{c.cart.reviewCta} · {c.review.subtotal}</Cta></div>
    </div>
  )
}

/* ── 5 · availability — the PMS handshake, live inventory confirmed ──── */
function AvailabilityScreen({ c }: { c: SuiteCopy }) {
  const a = c.availability
  return (
    <div style={pad}>
      <TopBar c={c} count={5} />
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 'clamp(9px, 1vw, 14px)' }}>
        <span aria-hidden className="suite-spin" style={{ width: 'clamp(34px,3.8vw,52px)', height: 'clamp(34px,3.8vw,52px)', borderRadius: '50%', border: '2px solid rgba(243,236,226,0.12)', borderTopColor: TERRA }} />
        <div style={{ ...MONO, fontSize: 'clamp(9px, 0.78vw, 11px)', letterSpacing: '.2em', color: TERRA }}>{a.label}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(19px,2.1vw,30px)', color: CREAM }}>{a.title}</div>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(10px,1vw,13.5px)', color: DIM, maxWidth: '48ch', lineHeight: 1.5 }}>{a.sub}</p>
        <div style={{ width: '100%', maxWidth: 560, marginTop: 'clamp(9px, 0.6vw, 10px)', display: 'flex', flexDirection: 'column', gap: 'clamp(9px, 0.7vw, 9.5px)' }}>
          {a.checks.map((ck) => (
            <div key={ck.item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, border: '1px solid rgba(243,236,226,0.1)', background: 'rgba(243,236,226,0.03)', borderRadius: 12, padding: 'clamp(9px,1vw,13px) clamp(12px,1.4vw,18px)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span aria-hidden style={{ flexShrink: 0, display: 'grid', placeItems: 'center', width: 18, height: 18, borderRadius: '50%', background: 'rgba(45,158,107,0.14)', border: '1px solid rgba(45,158,107,0.4)', color: '#2D9E6B', fontSize: 10 }}>✓</span>
                <span style={{ fontFamily: SANS, fontSize: 'clamp(10px,1vw,13.5px)', color: 'rgba(242,233,218,0.85)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ck.item}</span>
              </span>
              <span style={{ ...MONO, flexShrink: 0, fontSize: 'clamp(9px, 0.82vw, 11px)', letterSpacing: '.04em', color: '#2D9E6B' }}>{ck.status}</span>
            </div>
          ))}
        </div>
        <div style={{ ...MONO, fontSize: 'clamp(9px, 0.7vw, 9.5px)', letterSpacing: '.18em', color: 'rgba(242,233,218,0.4)', marginTop: 'clamp(9px, 0.6vw, 9.5px)' }}>{a.caption}</div>
      </div>
    </div>
  )
}

/* ── 6 · review ──────────────────────────────────────────────────────── */
function ReviewScreen({ c }: { c: SuiteCopy }) {
  const r = c.review
  return (
    <div style={pad}>
      <TopBar c={c} count={5} />
      <div style={{ textAlign: 'center', marginTop: 'clamp(9px, 0.8vw, 12px)', flexShrink: 0 }}>
        <div style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '.18em', color: TERRA }}>{r.label}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(20px,2.2vw,32px)', color: CREAM, marginTop: 4 }}>{r.title}</div>
      </div>
      <div style={{ marginTop: 'clamp(10px,1.3vw,18px)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(9px, 1vw, 14px)', flexShrink: 0 }}>
        {r.options.map((o) => (
          <div key={o.title} style={{ textAlign: 'center', borderRadius: 14, padding: 'clamp(10px,1.2vw,16px)', border: `1px solid ${o.active ? 'rgba(200,106,58,0.6)' : 'rgba(243,236,226,0.12)'}`, background: o.active ? 'rgba(200,106,58,0.07)' : 'rgba(243,236,226,0.03)' }}>
            <div style={{ fontSize: 'clamp(14px,1.5vw,20px)', color: TERRA }}>{o.icon}</div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(10px,1vw,13px)', color: CREAM, marginTop: 5 }}>{o.title}</div>
            <div style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.85vw, 12px)', color: DIM, marginTop: 1 }}>{o.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'clamp(10px,1.3vw,18px)', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(9px, 0.7vw, 9.5px)' }}>
        {r.summary.map((s) => (
          <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 'clamp(10px,1vw,13.5px)', color: 'rgba(242,233,218,0.82)' }}>
            <span>{s.name}</span><span style={MONO}>{s.price}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(243,236,226,0.1)', marginTop: 6, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 'clamp(9.5px,0.95vw,12.5px)', color: DIM }}><span>{r.subtotalLabel}</span><span style={MONO}>{r.subtotal}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 'clamp(9.5px,0.95vw,12.5px)', color: DIM }}><span>{r.feesLabel}</span><span style={MONO}>{r.fees}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 3 }}>
            <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(13px,1.3vw,18px)', color: CREAM }}>{r.totalLabel}</span>
            <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(15px,1.6vw,22px)', color: TERRA }}>{r.total}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 'clamp(9px, 1vw, 14px)', flexShrink: 0 }}><Cta>{r.cta} →</Cta></div>
    </div>
  )
}

/* ── 6 · payment ─────────────────────────────────────────────────────── */
function PaymentScreen({ c }: { c: SuiteCopy }) {
  const p = c.payment
  return (
    <div style={{ ...pad, gap: 'clamp(10px,1.3vw,18px)' }}>
      <TopBar c={c} count={5} />
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ ...MONO, fontSize: 'clamp(9px, 0.78vw, 11px)', letterSpacing: '.18em', color: TERRA }}>{p.label}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(18px,2vw,28px)', color: CREAM, marginTop: 4 }}>
          {p.title} <span style={{ color: TERRA }}>· {p.amount}</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(9px, 1vw, 14px)', flexShrink: 0 }}>
        <span style={{ display: 'grid', placeItems: 'center', background: '#000', color: '#fff', borderRadius: 12, padding: 'clamp(11px,1.25vw,16px)', fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(12px,1.15vw,16px)' }}>{p.apple}</span>
        <span style={{ display: 'grid', placeItems: 'center', background: '#fff', color: '#111', borderRadius: 12, padding: 'clamp(11px,1.25vw,16px)', fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(12px,1.15vw,16px)' }}>{p.google}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...MONO, fontSize: 'clamp(9px, 0.72vw, 10px)', letterSpacing: '.14em', color: DIM, flexShrink: 0 }}>
        <span style={{ flex: 1, height: 1, background: 'rgba(243,236,226,0.12)' }} />{p.orCard}<span style={{ flex: 1, height: 1, background: 'rgba(243,236,226,0.12)' }} />
      </div>
      <div style={{ border: '1px solid rgba(200,106,58,0.28)', borderRadius: 14, padding: 'clamp(12px,1.4vw,20px)', background: 'rgba(200,106,58,0.04)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...MONO, fontSize: 'clamp(9px, 0.72vw, 10px)', letterSpacing: '.12em', marginBottom: 'clamp(9px,1vw,14px)' }}>
          <span style={{ color: TERRA }}>🔒 {p.secure}</span><span style={{ color: DIM }}>{p.stripe}</span>
        </div>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(10px,0.95vw,13px)', color: 'rgba(242,233,218,0.82)', lineHeight: 1.5, textAlign: 'center', maxWidth: '46ch', marginInline: 'auto' }}>{p.cardNote}</p>
        <p style={{ ...MONO, fontSize: 'clamp(9px, 0.7vw, 9.5px)', letterSpacing: '.1em', color: 'rgba(201,161,90,0.78)', marginTop: 'clamp(9px, 0.8vw, 11px)', textAlign: 'center', lineHeight: 1.5 }}>{p.trust}</p>
      </div>
      <div style={{ textAlign: 'center', ...MONO, fontSize: 'clamp(9px, 0.7vw, 9.5px)', letterSpacing: '.12em', color: DIM, flexShrink: 0 }}>🔒 {p.securedBy}</div>
      <div style={{ marginTop: 'auto', flexShrink: 0 }}><Cta>{p.pay} · {p.amount}</Cta></div>
    </div>
  )
}

/* ── 7 · verifying ───────────────────────────────────────────────────── */
function VerifyingScreen({ c }: { c: SuiteCopy }) {
  return (
    <div style={{ ...pad, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <span aria-hidden className="suite-spin" style={{ width: 'clamp(48px,5.5vw,78px)', height: 'clamp(48px,5.5vw,78px)', borderRadius: '50%', border: '2px solid rgba(243,236,226,0.12)', borderTopColor: TERRA }} />
      <div style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '.2em', color: TERRA, marginTop: 'clamp(16px,2vw,28px)' }}>{c.verifying.label}</div>
      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(20px,2.3vw,34px)', color: CREAM, marginTop: 8 }}>{c.verifying.title}</div>
      <div style={{ fontFamily: SANS, fontSize: 'clamp(11px,1.1vw,15px)', color: DIM, marginTop: 8 }}>{c.verifying.note}</div>
    </div>
  )
}

/* ── 8 · confirmed ───────────────────────────────────────────────────── */
function ConfirmedScreen({ c }: { c: SuiteCopy }) {
  const f = c.confirmed
  return (
    <div style={{ ...pad, alignItems: 'center' }}>
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <span aria-hidden style={{ display: 'grid', placeItems: 'center', width: 'clamp(44px,5vw,70px)', height: 'clamp(44px,5vw,70px)', borderRadius: '50%', background: TERRA, color: '#1a1207', fontSize: 'clamp(20px,2.2vw,34px)', margin: '0 auto' }}>✓</span>
        <div style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '.2em', color: TERRA, marginTop: 'clamp(10px,1.2vw,16px)' }}>{f.label}</div>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(20px,2.3vw,34px)', color: CREAM, marginTop: 6 }}>{f.title}</div>
        <div style={{ fontFamily: SANS, fontSize: 'clamp(9.5px,0.95vw,13px)', color: 'rgba(201,161,90,0.85)', marginTop: 6 }}>{f.paid}</div>
      </div>
      <div style={{ marginTop: 'clamp(12px,1.5vw,20px)', width: '100%', maxWidth: 620, border: '1px solid rgba(243,236,226,0.1)', background: 'rgba(243,236,226,0.03)', borderRadius: 14, padding: 'clamp(12px,1.4vw,20px)', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div><div style={{ ...MONO, fontSize: 'clamp(9px, 0.72vw, 10px)', letterSpacing: '.14em', color: DIM }}>{f.refLabel}</div><div style={{ ...MONO, fontSize: 'clamp(16px,1.7vw,24px)', letterSpacing: '.06em', color: TERRA, marginTop: 4 }}>{f.ref}</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ ...MONO, fontSize: 'clamp(9px, 0.72vw, 10px)', letterSpacing: '.14em', color: DIM }}>{f.whenLabel}</div><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.1vw,15px)', color: CREAM, marginTop: 3 }}>{f.when}</div></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(243,236,226,0.08)', marginTop: 'clamp(9px,1.1vw,14px)', paddingTop: 'clamp(9px,1.1vw,14px)', display: 'flex', flexDirection: 'column', gap: 5, flex: 1, justifyContent: 'center' }}>
          {f.summary.map((s) => <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 'clamp(9.5px,0.95vw,13px)', color: 'rgba(242,233,218,0.8)' }}><span>{s.name}</span><span style={MONO}>{s.price}</span></div>)}
        </div>
        <div style={{ borderTop: '1px solid rgba(243,236,226,0.08)', paddingTop: 'clamp(9px, 1vw, 12px)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(13px,1.3vw,18px)', color: CREAM }}>{f.totalLabel}</span>
          <span style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(16px,1.7vw,24px)', color: TERRA }}>{f.total}</span>
        </div>
      </div>
    </div>
  )
}

/* ── 9 · loyalty — the program, its benefits, one-tap join ───────────── */
function LoyaltyScreen({ c }: { c: SuiteCopy }) {
  const l = c.loyalty
  return (
    <div style={{ ...pad, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 620, border: '1px solid rgba(200,106,58,0.4)', background: 'radial-gradient(120% 100% at 50% 0%, rgba(200,106,58,0.1), transparent 60%)', borderRadius: 20, padding: 'clamp(20px,2.4vw,36px)', boxShadow: '0 0 80px -30px rgba(200,106,58,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,1.4vw,18px)' }}>
          <span aria-hidden style={{ flexShrink: 0, width: 'clamp(38px,4vw,54px)', height: 'clamp(38px,4vw,54px)', display: 'grid', placeItems: 'center', borderRadius: 14, background: 'rgba(200,106,58,0.16)', border: '1px solid rgba(200,106,58,0.45)', color: TERRA, fontSize: 'clamp(16px,1.8vw,24px)' }}>◆</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ ...MONO, fontSize: 'clamp(9px, 0.72vw, 10px)', letterSpacing: '.18em', color: TERRA }}>{l.label}</div>
            <div style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(18px,2vw,28px)', color: CREAM, lineHeight: 1.1, marginTop: 3 }}>{l.title}</div>
            <div style={{ fontFamily: SANS, fontSize: 'clamp(9.5px,0.95vw,13px)', color: DIM, marginTop: 3 }}>{l.note}</div>
          </div>
        </div>
        <div style={{ marginTop: 'clamp(12px,1.5vw,20px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(9px, 0.9vw, 11px)' }}>
          {l.benefits.map((b) => (
            <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, border: '1px solid rgba(243,236,226,0.1)', background: 'rgba(243,236,226,0.03)', borderRadius: 12, padding: 'clamp(9px,1vw,13px) clamp(11px,1.2vw,15px)' }}>
              <span aria-hidden style={{ color: TERRA, fontSize: 'clamp(10px,1vw,13px)', lineHeight: 1.5 }}>✦</span>
              <span style={{ fontFamily: SANS, fontSize: 'clamp(9.5px,0.95vw,13px)', lineHeight: 1.45, color: 'rgba(242,233,218,0.85)' }}>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'clamp(12px,1.5vw,20px)' }}>
          <Cta>{l.cta} ›</Cta>
        </div>
      </div>
    </div>
  )
}

/* ── driver ──────────────────────────────────────────────────────────── */
const FLOW: Array<{ key: string; dwell: number; render: (c: SuiteCopy) => React.ReactNode }> = [
  { key: 'welcome', dwell: 2600, render: (c) => <WelcomeScreen c={c} /> },
  { key: 'browse', dwell: 4200, render: (c) => <BrowseScreen c={c} /> },
  { key: 'detail', dwell: 4800, render: (c) => <DetailScreen c={c} /> },
  { key: 'cart', dwell: 4200, render: (c) => <CartScreen c={c} /> },
  { key: 'availability', dwell: 3000, render: (c) => <AvailabilityScreen c={c} /> },
  { key: 'review', dwell: 4400, render: (c) => <ReviewScreen c={c} /> },
  { key: 'payment', dwell: 4600, render: (c) => <PaymentScreen c={c} /> },
  { key: 'verifying', dwell: 2200, render: (c) => <VerifyingScreen c={c} /> },
  { key: 'confirmed', dwell: 4800, render: (c) => <ConfirmedScreen c={c} /> },
  { key: 'loyalty', dwell: 3600, render: (c) => <LoyaltyScreen c={c} /> },
]

export function SuiteShowcase() {
  const c = useCopy(suitesCopy)
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(false)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setI(2) // hold the suite detail
      return
    }
    timer.current = window.setTimeout(() => {
      setFade(true)
      window.setTimeout(() => {
        setI((n) => (n + 1) % FLOW.length)
        setFade(false)
      }, 460)
    }, FLOW[i].dwell)
    return () => window.clearTimeout(timer.current)
  }, [i, paused])

  const go = (idx: number) => {
    if (idx === i) return
    setPaused(true)
    setFade(true)
    window.setTimeout(() => {
      setI(idx)
      setFade(false)
    }, 280)
  }

  return (
    <div className="suite-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* step nav — above the screen on desktop. On mobile it drops BELOW the
          device (CSS order): a menu stacked on top of a phone-shaped mockup
          pushes the actual product below the fold and reads as chrome. */}
      <div className="suite-nav" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 'clamp(18px,2.2vw,30px)' }}>
        <div className="v5-suite-tabs">
          {c.pills.labels.map((label, idx) => {
            const on = idx === i
            return (
              <button key={label} type="button" onClick={() => go(idx)} className={`v5-suite-tab ${on ? 'on' : ''}`} aria-current={on}>
                {label}
              </button>
            )
          })}
        </div>
        <span className="eyebrow" style={{ color: 'var(--text-faint)', fontSize: 11 }}>{c.pills.hint}</span>
      </div>

      <div
        data-device-ui=""
        className="suite-frame suite-stage"
        style={{ width: '100%', background: '#0C0B0A', border: '1px solid rgba(190,185,175,0.28)', borderRadius: 26, padding: 12, boxShadow: '0 60px 130px -34px rgba(0,0,0,0.85), 0 0 0 1px rgba(200,106,58,0.05)', boxSizing: 'border-box' }}
      >
        <div className="suite-screen" style={{ height: '100%', borderRadius: 18, overflow: 'hidden', background: 'radial-gradient(120% 100% at 30% 0%, #17130f 0%, #100e0c 60%, #0c0b0a 100%)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
            <div style={{ position: 'absolute', inset: 0, opacity: fade ? 0 : 1, transition: 'opacity 0.46s var(--ease-standard)' }}>
              {FLOW[i].render(c)}
            </div>
          </div>
          <VoiceBar c={c} />
        </div>
      </div>
    </div>
  )
}
