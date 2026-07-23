'use client'

import { useEffect, useMemo, useRef, useState, CSSProperties } from 'react'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'

/**
 * The in-room Companion tablet — the award-winning product surface from the
 * Claude Design exploration, built for real: the RC voice-orb (VoiceOrb) alive
 * at centre-rail, SPEAK OR TOUCH, the Room Service / Spa / Concierge / Explore
 * rail, a full-bleed REAL photograph answering the guest's question, one result
 * card, terracotta actions, and the Ask-anything bar. The orb animates
 * (listening rings + ripples); screens cross-fade on a gentle cycle. Reduced
 * motion holds the first screen and stills the orb. All strings are approved
 * device-UI copy (deviceScreens); photography is the repo's real hospitality
 * imagery, swap-ready.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SERIF = "var(--font-serif), Georgia, serif"
const TERRA = '#C86A3A'

type Screen = {
  key: string
  rail: number
  image: string
  ask: string
  title: string
  meta: string
  primary: string
  secondary?: string
  badge?: string
}

function useScreens(): Screen[] {
  const s = useCopy(deviceScreens).screens
  return useMemo(
    () => [
      {
        key: 'beach',
        rail: 3,
        image: '/assets/ui/beach-akumal.webp',
        ask: s.beach.ask,
        title: s.beach.title,
        meta: s.beach.meta,
        secondary: s.beach.actions[0],
        primary: s.beach.actions[1],
        badge: 'SEA TURTLES BEFORE 11 AM',
      },
      {
        key: 'upgrade',
        rail: 0,
        image: '/assets/ui/suite-1.webp',
        ask: s.upgrade.ask,
        title: s.upgrade.title,
        meta: s.upgrade.meta,
        primary: s.upgrade.confirm,
        badge: 'DIRECT RATE · $71 LESS THAN THE OTA',
      },
      {
        key: 'spa',
        rail: 1,
        image: '/assets/ui/spa-1.webp',
        ask: s.spa.ask,
        title: s.spa.title,
        meta: s.spa.meta,
        primary: s.spa.book,
        badge: '5:30 OPEN TODAY',
      },
    ],
    [s]
  )
}

export function CompanionTablet({ className = '' }: { className?: string }) {
  const d = useCopy(deviceScreens)
  const screens = useScreens()
  const rail = d.tiles.slice(0, 4)
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(false)
  const [reduce, setReduce] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduce(r)
    if (r) return
    const tick = () => {
      timer.current = window.setTimeout(() => {
        setFade(true)
        window.setTimeout(() => {
          setI((n) => (n + 1) % screens.length)
          setFade(false)
          tick()
        }, 520)
      }, 4200)
    }
    tick()
    return () => window.clearTimeout(timer.current)
  }, [screens.length])

  const sc = screens[i]
  const activeRail = sc.rail

  return (
    <div
      data-device-ui=""
      className={className}
      style={{
        width: '100%',
        maxWidth: 640,
        aspectRatio: '4 / 3',
        background: '#0C0B0A',
        border: '1px solid rgba(190,185,175,0.28)',
        borderRadius: 26,
        padding: 12,
        boxShadow: '0 50px 110px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,106,58,0.05)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'radial-gradient(120% 100% at 30% 0%, #17130f 0%, #100e0c 60%, #0c0b0a 100%)',
          display: 'grid',
          gridTemplateColumns: '30% 1fr',
        }}
      >
        {/* left rail */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5% 4% 4%', borderRight: '1px solid rgba(243,236,226,0.06)', minHeight: 0 }}>
          <VoiceOrb size="clamp(40px, 7.5vw, 68px)" state="listening" ripples showMic micScale={0.34} />
          <div style={{ ...MONO, fontSize: 'clamp(6.5px,1vw,9px)', letterSpacing: '.2em', color: TERRA, textAlign: 'center', marginTop: '5%' }}>SPEAK OR TOUCH</div>
          <div style={{ ...MONO, fontSize: 'clamp(6px,0.9vw,8px)', letterSpacing: '.12em', color: 'rgba(242,233,218,0.4)', textAlign: 'center', lineHeight: 1.5, marginTop: 6 }}>{d.property}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1vw,9px)', width: '100%', marginTop: 'auto' }}>
            {rail.map((t, idx) => (
              <div
                key={t.id}
                style={{
                  borderRadius: 10,
                  padding: 'clamp(5px,1.1vw,9px) 6px',
                  textAlign: 'center',
                  fontSize: 'clamp(8px,1.15vw,12px)',
                  fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
                  color: idx === activeRail ? '#F5EDDE' : 'rgba(242,233,218,0.6)',
                  background: idx === activeRail ? 'rgba(200,106,58,0.12)' : 'rgba(243,236,226,0.03)',
                  border: `1px solid ${idx === activeRail ? 'rgba(200,106,58,0.55)' : 'rgba(243,236,226,0.06)'}`,
                  transition: 'all .5s var(--ease-standard)',
                }}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* content — full-bleed real photo answering the question */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* top status row */}
          <div style={{ position: 'absolute', top: '4%', left: '4%', right: '4%', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ ...MONO, fontSize: 'clamp(6.5px,0.95vw,9px)', letterSpacing: '.16em', color: TERRA, border: '1px solid rgba(200,106,58,0.4)', borderRadius: 999, padding: '4px 10px' }}>
              ● {d.property}
            </span>
            <span style={{ ...MONO, fontSize: 'clamp(6.5px,0.95vw,9px)', letterSpacing: '.18em', color: 'rgba(242,233,218,0.5)' }}>{d.listening.toUpperCase()}</span>
          </div>

          {/* screens cross-fade */}
          <div style={{ position: 'absolute', inset: '12% 4% 4%', borderRadius: 14, overflow: 'hidden', opacity: fade ? 0 : 1, transition: 'opacity .5s var(--ease-standard)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={sc.key} alt={sc.title} src={sc.image} className="v5-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,9,8,0.15) 0%, transparent 32%, transparent 45%, rgba(11,9,8,0.9) 100%)' }} />
            {/* guest question, top-right */}
            <div style={{ position: 'absolute', top: '5%', right: '5%', maxWidth: '78%', textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-sans), sans-serif', fontSize: 'clamp(10px,1.55vw,16px)', color: '#F5EDDE', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{sc.ask}</span>
            </div>
            {/* answer block, bottom — stacked so nothing crushes at hero scale */}
            <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: '5%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(6px,1vw,10px)' }}>
              {sc.badge && <span style={{ ...MONO, fontSize: 'clamp(6px,0.85vw,8px)', letterSpacing: '.1em', color: TERRA, border: '1px solid rgba(200,106,58,0.45)', background: 'rgba(11,9,8,0.5)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '3px 8px' }}>{sc.badge}</span>}
              <div>
                <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(22px,3.6vw,40px)', lineHeight: 1, color: '#F5EDDE' }}>{sc.title}</div>
                <div style={{ fontSize: 'clamp(9px,1.25vw,13px)', color: 'rgba(242,233,218,0.75)', marginTop: 5, whiteSpace: 'nowrap' }}>{sc.meta}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                {sc.secondary && (
                  <span style={{ fontFamily: 'var(--font-sans), sans-serif', fontSize: 'clamp(9px,1.15vw,13px)', fontWeight: 500, color: '#F5EDDE', border: '1px solid rgba(243,236,226,0.4)', borderRadius: 999, padding: 'clamp(6px,0.9vw,10px) clamp(11px,1.6vw,18px)', whiteSpace: 'nowrap' }}>{sc.secondary}</span>
                )}
                <span style={{ fontFamily: 'var(--font-sans), sans-serif', fontSize: 'clamp(9px,1.15vw,13px)', fontWeight: 600, color: '#1a1207', background: TERRA, borderRadius: 999, padding: 'clamp(6px,0.9vw,10px) clamp(11px,1.6vw,18px)', whiteSpace: 'nowrap' }}>{sc.primary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
