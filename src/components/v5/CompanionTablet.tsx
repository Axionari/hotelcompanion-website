'use client'

import { useEffect, useMemo, useRef, useState, CSSProperties } from 'react'
import { titaniumFrame, titaniumScreenShadow } from '@/components/v5/deviceFrame'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { intelExecCopy } from '@/lib/i18n/marketing/intelExec'

/**
 * The Companion desktop surface — the pre-arrival experience where a guest can
 * speak or type. Voice + text live together on the left rail (the RC model);
 * the right side answers. The answer ALTERNATES layout so a GM sees the range
 * at a glance: full-bleed hero cards (one outcome, big and readable) and a
 * choices grid (it can merchandise every service). Context pills under the
 * device name what you're looking at — click to jump, or let it cycle.
 * Reduced motion holds the first screen and stills the orb.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const SERIF = "var(--font-serif), Georgia, serif"
const TERRA = '#C86A3A'
const CREAM = '#F5EDDE'

type Layout = 'hero' | 'choices' | 'cards'

type Screen = {
  key: string
  layout: Layout
  rail: number
  pill: string
  // hero
  image?: string
  ask?: string
  title?: string
  meta?: string
  primary?: string
  secondary?: string
  badge?: string
  // choices
  choicesAsk?: string
  choicesTitle?: string
  choices?: { name: string; meta: string; price: string; image: string }[]
  // cards
  cardsTitle?: string
  reserve?: string
  note?: string
  cards?: { name: string; meta: string; image: string; badge?: string; featured?: boolean }[]
}

function useScreens(): Screen[] {
  const s = useCopy(deviceScreens).screens
  const mem = useCopy(intelExecCopy).memory
  return useMemo(
    () => [
      // 1 · hero — the revenue outcome, one item, full-bleed
      {
        key: 'upgrade',
        layout: 'hero',
        rail: 2,
        pill: 'Suite upgrade',
        image: '/assets/ui/suite-ocean.webp',
        ask: s.upgrade.ask,
        title: s.upgrade.title,
        meta: s.upgrade.meta,
        primary: s.upgrade.confirm,
        badge: '$71 LESS THAN THE OTA',
      },
      // 2 · cards — a service menu, three treatments to merchandise
      {
        key: 'spa',
        layout: 'cards',
        rail: 1,
        pill: 'Spa booking',
        ask: s.spa.ask,
        cardsTitle: s.spa.title,
        reserve: s.spa.book,
        note: 'The Cacao Ceremony has a 5:30 opening today — say “book it” and it’s yours. You’d be back for dinner at 7:30.',
        cards: [
          { name: s.spa.items[0].name, meta: '90 min · signature', image: '/assets/ui/spa-1.webp', badge: '5:30 open', featured: true },
          { name: 'Deep tissue', meta: '60 min · from 6:45', image: '/assets/ui/spa-2.webp' },
          { name: 'Sunrise yoga', meta: '45 min · 6:30 AM', image: '/assets/ui/spa-3.webp' },
        ],
      },
      // 3 · hero — a whole bookable day
      {
        key: 'cenote',
        layout: 'hero',
        rail: 3,
        pill: 'Experiences',
        image: '/assets/lux/exp-cenote.webp',
        ask: 'Plan our last day',
        title: 'Cenote Dos Ojos',
        meta: '40 min · driver booked',
        secondary: 'Directions',
        primary: 'Book the day',
        badge: 'DRIVER INCLUDED · $95',
      },
      // 4 · choices — it can merchandise every service
      {
        key: 'dining',
        layout: 'choices',
        rail: 0,
        pill: 'Room service',
        choicesAsk: 'What’s good tonight?',
        choicesTitle: 'In-room dining',
        choices: [
          { name: 'Ceviche verde', meta: 'Local catch · lime · serrano', price: '$18', image: '/assets/ui/dish-1.webp' },
          { name: 'Pescado a la talla', meta: 'Grilled · guajillo · citrus', price: '$32', image: '/assets/ui/dish-2.webp' },
          { name: 'Tres leches', meta: 'The one everyone orders', price: '$12', image: '/assets/ui/dish-3.webp' },
        ],
      },
      // 5 · hero — the moat: she returns, it already knows her. No service
      //     rail lights up: recognition isn't a category (Concierge re-lighting
      //     here read as a glitch).
      {
        key: 'memory',
        layout: 'hero',
        rail: -1,
        pill: 'Guest memory',
        image: '/assets/ui/suite-2.webp',
        ask: '',
        title: 'Welcome back, Maya',
        meta: mem.chips.slice(0, 4).join(' · '),
        primary: 'Her usual suite',
        badge: mem.title,
      },
    ],
    [s, mem]
  )
}

export function CompanionTablet({ className = '', askBar = true }: { className?: string; askBar?: boolean }) {
  const d = useCopy(deviceScreens)
  const screens = useScreens()
  const rail = d.tiles.slice(0, 4)
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(false)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tick = () => {
      timer.current = window.setTimeout(() => {
        setFade(true)
        window.setTimeout(() => {
          setI((n) => (n + 1) % screens.length)
          setFade(false)
          tick()
        }, 460)
      }, 4600)
    }
    tick()
    return () => window.clearTimeout(timer.current)
  }, [screens.length, paused])

  const go = (n: number) => {
    setPaused(true)
    setFade(true)
    window.setTimeout(() => {
      setI(n)
      setFade(false)
    }, 260)
  }

  const sc = screens[i]
  const activeRail = sc.rail

  return (
    <div className={className}>
      <div
        data-device-ui=""
        style={{
          width: '100%',
          maxWidth: 800,
          aspectRatio: '7 / 5',
          ...titaniumFrame({ radius: 22, bezel: 5, drop: '0 50px 110px -30px rgba(0,0,0,0.8)' }),
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            borderRadius: 17,
            overflow: 'hidden',
            background: 'radial-gradient(120% 100% at 30% 0%, #17130f 0%, #100e0c 60%, #0c0b0a 100%)',
            boxShadow: titaniumScreenShadow(),
            display: 'grid',
            gridTemplateColumns: '30% 1fr',
          }}
        >
          {/* ── left panel — voice + type on one refined rail ── */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '6% 5.5% 5.5%', borderRight: '1px solid rgba(243,236,226,0.07)', minHeight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <VoiceOrb size="clamp(34px, 4.8vw, 56px)" state="listening" ripples showMic micScale={0.34} />
              <div style={{ ...MONO, fontSize: 'clamp(9px, 0.82vw, 9.5px)', letterSpacing: '.2em', color: TERRA, textAlign: 'center', marginTop: '7%' }}>SPEAK OR TYPE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(9px, 0.8vw, 9.5px)', width: '100%', marginTop: 'clamp(12px,1.8vw,20px)' }}>
              {rail.map((t, idx) => {
                const on = idx === activeRail
                return (
                  <div
                    key={t.id}
                    style={{
                      borderRadius: 999,
                      padding: 'clamp(9px, 1vw, 10px) clamp(9px, 1.2vw, 14px)',
                      textAlign: 'center',
                      fontSize: 'clamp(9px, 1vw, 12px)',
                      fontWeight: on ? 600 : 500,
                      fontFamily: SANS,
                      color: on ? CREAM : 'rgba(242,233,218,0.82)',
                      background: on ? 'rgba(200,106,58,0.16)' : 'rgba(243,236,226,0.06)',
                      border: `1px solid ${on ? 'rgba(200,106,58,0.6)' : 'rgba(243,236,226,0.14)'}`,
                      transition: 'all .45s var(--ease-standard)',
                    }}
                  >
                    {t.label}
                  </div>
                )
              })}
            </div>
            {askBar && (
              <div style={{ marginTop: 'auto', paddingTop: 'clamp(10px,1.6vw,18px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid rgba(243,236,226,0.16)', background: 'rgba(243,236,226,0.05)', borderRadius: 999, padding: 'clamp(9px, 0.6vw, 9.5px) clamp(9px, 0.7vw, 9.5px) clamp(9px, 0.6vw, 9.5px) clamp(10px,1.2vw,14px)' }}>
                  <span style={{ flex: 1, minWidth: 0, fontFamily: SANS, fontSize: 'clamp(9px, 0.9vw, 11px)', color: 'rgba(242,233,218,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.askAnything}</span>
                  <span aria-hidden style={{ flexShrink: 0, width: 'clamp(17px,2vw,23px)', height: 'clamp(17px,2vw,23px)', display: 'grid', placeItems: 'center', borderRadius: '50%', background: TERRA, color: '#1a1207', fontSize: 'clamp(9px,1vw,12px)', fontWeight: 700 }}>↑</span>
                </div>
              </div>
            )}
          </div>

          {/* ── right content — cross-fades; layout alternates ── */}
          <div style={{ position: 'relative', overflow: 'hidden', opacity: fade ? 0 : 1, transition: 'opacity .45s var(--ease-standard)' }}>
            {sc.layout === 'hero' && <HeroScreen sc={sc} listening={d.listening} />}
            {sc.layout === 'choices' && <ChoicesScreen sc={sc} listening={d.listening} />}
            {sc.layout === 'cards' && <CardsScreen sc={sc} listening={d.listening} property={d.property} />}
          </div>
        </div>
      </div>

      {/* ── context pills — name what you're seeing; click to jump ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 'clamp(14px,1.8vw,22px)' }}>
        {screens.map((scr, idx) => {
          const on = idx === i
          return (
            <button
              key={scr.key}
              type="button"
              onClick={() => go(idx)}
              style={{
                fontFamily: SANS,
                fontSize: 'clamp(11px,1vw,13px)',
                fontWeight: on ? 600 : 500,
                color: on ? CREAM : 'var(--text-dim, rgba(242,233,218,0.6))',
                background: on ? 'rgba(200,106,58,0.14)' : 'transparent',
                border: `1px solid ${on ? 'rgba(200,106,58,0.6)' : 'var(--border-soft, rgba(243,236,226,0.14))'}`,
                borderRadius: 999,
                padding: '7px 15px',
                cursor: 'pointer',
                transition: 'all .35s var(--ease-standard)',
              }}
            >
              {scr.pill}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Listening chip, shared ── */
function Listening({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: TERRA, boxShadow: '0 0 8px rgba(200,106,58,0.8)' }} />
      <span style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 9.5px)', letterSpacing: '.18em', color: 'rgba(242,233,218,0.62)', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{label.toUpperCase()}</span>
    </div>
  )
}

/* ── Layout A: hero — one outcome, full-bleed, one-line title ── */
function HeroScreen({ sc, listening }: { sc: Screen; listening: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={sc.key} alt={sc.title} src={sc.image} className="v5-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,9,8,0.24) 0%, transparent 30%, transparent 42%, rgba(11,9,8,0.95) 100%)' }} />
      <div style={{ position: 'absolute', top: '5.5%', left: '5%', zIndex: 3 }}><Listening label={listening} /></div>
      {sc.ask && (
        <div style={{ position: 'absolute', top: '5%', right: '5%', maxWidth: '64%', textAlign: 'right', zIndex: 3 }}>
          <span style={{ fontFamily: SANS, fontSize: 'clamp(10px,1.15vw,15px)', color: CREAM, textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>{sc.ask}</span>
        </div>
      )}
      <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: '6%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'clamp(10px,1.8vw,24px)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {sc.badge && <span style={{ ...MONO, display: 'inline-block', whiteSpace: 'nowrap', fontSize: 'clamp(9px, 0.78vw, 9.5px)', letterSpacing: '.1em', color: TERRA, border: '1px solid rgba(200,106,58,0.45)', background: 'rgba(11,9,8,0.5)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '3px 9px', marginBottom: 'clamp(9px, 0.9vw, 10px)' }}>{sc.badge}</span>}
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(17px,1.85vw,26px)', lineHeight: 1.08, color: CREAM, textWrap: 'balance' } as CSSProperties}>{sc.title}</div>
          <div style={{ fontFamily: SANS, fontSize: 'clamp(9px,1vw,12.5px)', lineHeight: 1.35, color: 'rgba(242,233,218,0.82)', marginTop: 'clamp(9px, 0.6vw, 9.5px)' }}>{sc.meta}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {sc.secondary && (
            <span style={{ fontFamily: SANS, fontSize: 'clamp(9px,1vw,12px)', fontWeight: 500, color: CREAM, border: '1px solid rgba(243,236,226,0.4)', background: 'rgba(11,9,8,0.35)', borderRadius: 999, padding: 'clamp(9px, 0.8vw, 9.5px) clamp(9px,1.2vw,14px)', whiteSpace: 'nowrap' }}>{sc.secondary}</span>
          )}
          <span style={{ fontFamily: SANS, fontSize: 'clamp(9px,1vw,12px)', fontWeight: 600, color: '#1a1207', background: TERRA, borderRadius: 999, padding: 'clamp(9px, 0.8vw, 9.5px) clamp(9px,1.2vw,14px)', whiteSpace: 'nowrap' }}>{sc.primary}</span>
        </div>
      </div>
    </>
  )
}

/* ── Layout B: choices — it can merchandise every service ── */
function ChoicesScreen({ sc, listening }: { sc: Screen; listening: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #16120e 0%, #100d0b 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(12px,1.8vw,22px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(16px,1.8vw,26px)', lineHeight: 1, color: CREAM }}>{sc.choicesTitle}</div>
          <div style={{ fontFamily: SANS, fontSize: 'clamp(9px,1vw,12.5px)', color: TERRA, marginTop: 5 }}>{sc.choicesAsk}</div>
        </div>
        <Listening label={listening} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(9px, 1vw, 11px)', marginTop: 'clamp(10px,1.6vw,18px)' }}>
        {sc.choices?.map((it) => (
          <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(9px,1.2vw,14px)', background: 'rgba(243,236,226,0.05)', border: '1px solid rgba(243,236,226,0.1)', borderRadius: 14, padding: 'clamp(9px, 0.8vw, 9.5px)' }}>
            <div style={{ position: 'relative', flexShrink: 0, width: 'clamp(44px,6vw,74px)', height: 'clamp(44px,6vw,74px)', borderRadius: 10, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={it.name} src={it.image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.2vw,15px)', color: CREAM, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.95vw, 12px)', color: 'rgba(242,233,218,0.6)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.meta}</div>
            </div>
            <div style={{ ...MONO, fontSize: 'clamp(10px,1.1vw,14px)', color: CREAM, flexShrink: 0 }}>{it.price}</div>
            <span aria-hidden style={{ flexShrink: 0, width: 'clamp(22px,2.6vw,30px)', height: 'clamp(22px,2.6vw,30px)', display: 'grid', placeItems: 'center', borderRadius: '50%', background: TERRA, color: '#1a1207', fontSize: 'clamp(13px,1.5vw,18px)', fontWeight: 700 }}>+</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Layout C: cards — a service menu, three treatments to reserve ── */
function CardsScreen({ sc, listening, property }: { sc: Screen; listening: string; property: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #16120e 0%, #100d0b 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(12px,1.7vw,22px)' }}>
      {/* status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ ...MONO, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'clamp(9px, 0.82vw, 9.5px)', letterSpacing: '.18em', color: TERRA, border: '1px solid rgba(200,106,58,0.4)', background: 'rgba(11,9,8,0.4)', borderRadius: 999, padding: '4px 10px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: TERRA }} />{property.toUpperCase()}
        </span>
        <span style={{ ...MONO, fontSize: 'clamp(9px, 0.8vw, 9.5px)', letterSpacing: '.18em', color: 'rgba(242,233,218,0.5)' }}>{listening.toUpperCase()}</span>
      </div>
      {/* title + question */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexShrink: 0, marginTop: 'clamp(9px, 1.2vw, 14px)' }}>
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(18px,2vw,30px)', lineHeight: 1, color: CREAM }}>{sc.cardsTitle}</div>
        <span style={{ fontFamily: SANS, fontSize: 'clamp(9px,1.05vw,14px)', color: 'rgba(242,233,218,0.75)' }}>{sc.ask}</span>
      </div>
      {/* three treatment cards */}
      <div style={{ display: 'flex', gap: 'clamp(9px, 1vw, 12px)', marginTop: 'clamp(9px,1.4vw,16px)', flex: 1, minHeight: 0 }}>
        {sc.cards?.map((c) => (
          <div key={c.name} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden', background: 'rgba(243,236,226,0.04)', border: `1px solid ${c.featured ? 'rgba(200,106,58,0.55)' : 'rgba(243,236,226,0.1)'}` }}>
            <div style={{ position: 'relative', flex: 1, minHeight: 'clamp(40px,4.4vw,78px)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={c.name} src={c.image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,9,8,0.05) 0%, transparent 50%, rgba(11,9,8,0.4) 100%)' }} />
              {c.badge && <span style={{ position: 'absolute', top: 8, right: 8, ...MONO, fontSize: 'clamp(9px, 0.78vw, 9.5px)', letterSpacing: '.06em', color: '#1a1207', background: TERRA, borderRadius: 999, padding: '4px 9px' }}>{c.badge}</span>}
            </div>
            <div style={{ padding: 'clamp(9px, 0.9vw, 12px)', display: 'flex', flexDirection: 'column', gap: 'clamp(9px, 0.7vw, 9.5px)', flexShrink: 0 }}>
              <div>
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(9.5px,1vw,13px)', lineHeight: 1.15, color: CREAM }}>{c.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.9vw, 11.5px)', color: 'rgba(242,233,218,0.6)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.meta}</div>
              </div>
              <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(9px, 0.95vw, 12px)', textAlign: 'center', color: c.featured ? '#1a1207' : CREAM, background: c.featured ? TERRA : 'transparent', border: c.featured ? '1px solid transparent' : '1px solid rgba(243,236,226,0.35)', borderRadius: 999, padding: 'clamp(9px, 0.75vw, 9.5px) 0' }}>{sc.reserve}</span>
            </div>
          </div>
        ))}
      </div>
      {/* companion note */}
      {sc.note && (
        <div style={{ flexShrink: 0, marginTop: 'clamp(9px,1.3vw,15px)', fontFamily: SANS, fontSize: 'clamp(9px,1.05vw,14px)', lineHeight: 1.4, color: 'rgba(242,233,218,0.82)', border: '1px solid rgba(243,236,226,0.1)', background: 'rgba(243,236,226,0.03)', borderRadius: 12, padding: 'clamp(9px,1.1vw,14px) clamp(11px,1.3vw,16px)' }}>{sc.note}</div>
      )}
    </div>
  )
}
