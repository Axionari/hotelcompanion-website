'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { V4, V4Reveal, monoStyle, DeferredImg, eyebrowStyle } from '../shared'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { constellationCopy } from '@/lib/i18n/marketing/constellation'
import { surfaceWall } from '@/lib/i18n/marketing/surfaceWall'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'

/**
 * ACT IV · EVERY SURFACE — the approved v3 Constellation restyled to the
 * reference's cluster topology (kit §2): same six devices, v3 materials
 * (2px silver rim → near-black bezel → screen, ADDENDUM_2), reference stage
 * boxes on a 1160×800 stage. Real assets per §2; watch face = v3
 * `20 min / SPA IXCHEL`; phone = v3 orb home state. Captions are the v3 role
 * strings, placed in the reference's clear-space slots.
 */

const RIM = 'linear-gradient(180deg, #d9d9d9, #9c9c9c)'
const BEZEL = '#0b0908'
const SHADOW = '0 34px 70px -24px rgba(0,0,0,0.65), 0 0 0 1px rgba(243,236,226,0.06)'

function Frame({
  screenW,
  screenH,
  bezel,
  radius,
  children,
}: {
  screenW: number
  screenH: number
  bezel: number
  radius: number
  children: ReactNode
}) {
  return (
    <div data-device-ui="" data-cframe="" style={{ padding: 2, background: RIM, borderRadius: radius, boxShadow: SHADOW, width: screenW + 2 * bezel + 4, boxSizing: 'border-box' }}>
      <div style={{ padding: bezel, background: BEZEL, borderRadius: radius - 2 }}>
        <div className="relative" style={{ width: screenW, height: screenH, borderRadius: Math.max(2, radius - 2 - bezel / 2), overflow: 'hidden', background: V4.bg }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function MonitorScreen() {
  const s = useCopy(surfaceWall).laptop
  /* photo-only, per the reference's monitor slot (PHOTO: SUITE → real asset);
     no screen text — the phone fronts this screen's left edge (G-4b). */
  return (
    <>
      <DeferredImg alt={s.room} src="/assets/ui/suite-1-900.webp" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,9,8,0.05), transparent 40%, rgba(11,9,8,0.4))' }} />
    </>
  )
}

function PhoneScreen() {
  const demo = useCopy(liveDemoCopy)
  return (
    /* right padding keeps every text node clear of the tablet's 35px overlap
       zone at the phone's right edge (G-4b) */
    <div className="absolute inset-0 flex flex-col items-center" style={{ background: 'linear-gradient(180deg, #1C1510, #120E0A)', padding: '30px 44px 12px 8px', fontFamily: V4.sans, boxSizing: 'border-box' }}>
      <div className="flex-1 flex flex-col items-center justify-center" style={{ gap: 12 }}>
        <VoiceOrb size={56} state="idle" showMic={false} />
        <div style={{ fontSize: 10, color: 'rgba(242,233,218,.6)', textAlign: 'center' }}>{demo.orbStates.idle}</div>
      </div>
      <div className="self-stretch" style={{ border: '1px solid rgba(243,236,226,0.12)', borderRadius: 999, padding: '7px 10px', fontSize: 9.5, color: 'rgba(242,233,218,.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {demo.placeholder}
      </div>
    </div>
  )
}

function TvScreen() {
  const tv = useCopy(surfaceWall).tv
  const greeting = useCopy(deviceScreens).greeting
  return (
    <>
      <DeferredImg alt={tv.greeting} src="/assets/img/luxury-lobby-800.webp" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,9,8,0.1), rgba(11,9,8,0.72))' }} />
      <div className="absolute" style={{ left: 20, bottom: 14, fontFamily: V4.sans }}>
        <div style={monoStyle(8.5, '.24em', V4.brass)}>{greeting.toUpperCase()}</div>
        <div style={{ fontFamily: V4.serif, fontSize: 20, color: V4.text, marginTop: 4 }}>{tv.greeting}</div>
        <div style={{ fontSize: 11, color: 'rgba(242,233,218,.6)', marginTop: 2 }}>{tv.meta}</div>
      </div>
    </>
  )
}

function TabletScreen() {
  const beach = useCopy(deviceScreens).screens.beach
  return (
    <>
      <DeferredImg alt={beach.title} src="/assets/ui/beach-akumal-band.webp" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,9,8,0.14), transparent 38%, rgba(11,9,8,0.7))' }} />
      {/* text block clears the watch's overlap zone (x < 48) and the puck's
          (y past bottom-26) — G-4b */}
      <div className="absolute" style={{ left: 48, bottom: 26, fontFamily: V4.sans }}>
        <div style={{ fontFamily: V4.serif, fontSize: 30, color: V4.text }}>{beach.title}</div>
        <div style={{ fontSize: 12.5, color: V4.brass, marginTop: 3 }}>{beach.meta}</div>
      </div>
    </>
  )
}

function WatchScreen() {
  const s = useCopy(surfaceWall).watch
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(180deg, #17110C, #0E0B08)', gap: 4 }}>
      <VoiceOrb size={16} state="idle" showMic={false} />
      <div style={{ fontFamily: V4.serif, fontSize: 17, color: V4.text, lineHeight: 1 }}>{s.time}</div>
      <div style={monoStyle(6.5, '.16em', V4.brass)}>{s.glance.toUpperCase()}</div>
    </div>
  )
}

function Puck() {
  return (
    /* hardware object, not a framed screen — no data-device-ui so the rim
       audit (G-4e) keys on screen frames only, as in v3 */
    <div className="relative" data-cframe="" style={{ width: 160, height: 90 }} aria-hidden="true">
      <div
        className="absolute"
        style={{ left: '5%', right: '5%', bottom: -8, height: 18, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.5), rgba(0,0,0,0.18) 55%, transparent 78%)', filter: 'blur(5px)' }}
      />
      <div
        data-puck-body=""
        className="absolute inset-0"
        style={{
          borderRadius: '80px 80px 22px 22px',
          background: 'linear-gradient(180deg, #26201A 0%, #131009 85%)',
          border: '1px solid rgba(190,185,175,.35)',
          boxShadow: '0 26px 50px rgba(0,0,0,.55)',
        }}
      />
      <div className="absolute" style={{ left: '50%', top: 12, marginLeft: -11 }}>
        <VoiceOrb size={22} state="idle" showMic={false} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- stage */

const STAGE_W = 1160
const STAGE_H = 800

interface Placed {
  key: 'web' | 'phone' | 'tv' | 'tablet' | 'watch' | 'voice'
  x: number
  y: number
  z: number
  node: ReactNode
}

export function Act4() {
  const c = useCopy(v4Copy).actIV
  const roles = useCopy(constellationCopy).roles
  const [scale, setScale] = useState(1)
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const measure = () => {
      const w = hostRef.current?.clientWidth ?? STAGE_W
      setScale(Math.min(1, w / (STAGE_W + 20)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* reference cluster boxes on the 1160×800 stage (source of truth §1.4) */
  const devices: Placed[] = [
    {
      key: 'web',
      x: 320,
      y: 0,
      z: 1,
      node: (
        <div className="flex flex-col items-center">
          <Frame screenW={494} screenH={250} bezel={12} radius={14}>
            <MonitorScreen />
          </Frame>
          <div data-cframe="" aria-hidden="true" style={{ width: 54, height: 38, background: 'linear-gradient(180deg, #1A1713, #0F0D0B)' }} />
          <div data-cframe="" aria-hidden="true" style={{ width: 150, height: 14, background: '#14110E', clipPath: 'polygon(18% 0, 82% 0, 100% 100%, 0 100%)' }} />
        </div>
      ),
    },
    { key: 'phone', x: 215, y: 130, z: 2, node: <Frame screenW={130} screenH={280} bezel={8} radius={26}><PhoneScreen /></Frame> },
    { key: 'tv', x: 690, y: 120, z: 2, node: <Frame screenW={366} screenH={206} bezel={10} radius={10}><TvScreen /></Frame> },
    { key: 'tablet', x: 330, y: 340, z: 4, node: <Frame screenW={444} screenH={314} bezel={16} radius={24}><TabletScreen /></Frame> },
    { key: 'watch', x: 295, y: 480, z: 5, node: <Frame screenW={75} screenH={95} bezel={8} radius={26}><WatchScreen /></Frame> },
    { key: 'voice', x: 575, y: 650, z: 6, node: <Puck /> },
  ]

  /* reference caption slots — clear stage space; text = v3 role strings */
  const captions: Array<{ key: Placed['key']; at: CSSProperties }> = [
    { key: 'web', at: { left: 0, top: 20, width: 250, textAlign: 'right' } },
    { key: 'phone', at: { left: 0, top: 190, width: 180, textAlign: 'right' } },
    { key: 'watch', at: { left: 0, top: 520, width: 180, textAlign: 'right' } },
    { key: 'tv', at: { right: 0, top: 14, width: 200, textAlign: 'right' } },
    { key: 'tablet', at: { left: 0, top: 760, width: 220, textAlign: 'left' } },
    { key: 'voice', at: { left: 790, top: 760, width: 240, textAlign: 'left' } },
  ]

  const stage = (
    <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
      <div
        aria-hidden="true"
        className="absolute"
        style={{ left: '50%', top: 340, width: 800, height: 800, marginLeft: -400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,106,53,.14) 0%, rgba(178,106,53,0) 65%)', zIndex: 0 }}
      />
      {devices.map((d) => (
        <figure key={d.key} className="absolute" style={{ left: d.x, top: d.y, zIndex: d.z, margin: 0 }}>
          {d.node}
        </figure>
      ))}
      {captions.map(({ key, at }) => (
        <figcaption key={key} data-caption="" data-device-ui="" style={{ position: 'absolute', zIndex: 7, ...monoStyle(9, '.22em', 'rgba(242,233,218,.5)'), lineHeight: 1.9, ...at }}>
          {roles[key]}
        </figcaption>
      ))}
    </div>
  )

  return (
    <section
      id="act-iv"
      data-v4-act=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'transparent', /* the §4 day layer paints the act's reference value */
        padding: '130px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div className="v4-w1200" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={eyebrowStyle('var(--accent)')}>{c.eyebrow}</div>
        <div className="v4-statement" style={{ fontFamily: V4.serif, fontWeight: 530, fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.1, marginTop: 26, textAlign: 'center', textWrap: 'balance', color: V4.text }}>
          {c.statementPre}
          <span style={{ fontStyle: 'italic', fontWeight: 480, color: V4.cream }}>{c.statementHi}</span>
        </div>

        {/* desktop cluster */}
        <V4Reveal className="v4-cluster-desktop" style={{ width: '100%', marginTop: 70 }}>
          <div ref={hostRef} className="flex justify-center overflow-hidden">
            <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>{stage}</div>
            </div>
          </div>
        </V4Reveal>

        {/* mobile — the v3 constellation's snap-row treatment */}
        <div
          className="v4-cluster-mobile -mx-4 px-4"
          role="region"
          aria-label={c.eyebrow}
          tabIndex={0}
          style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', marginTop: 48, maxWidth: '100%' }}
        >
          <div className="flex items-end gap-10" style={{ width: 'max-content', padding: '8px 8px 4px' }}>
            {(
              [
                { key: 'tablet', w: 480, s: 0.66, node: <Frame screenW={444} screenH={314} bezel={16} radius={24}><TabletScreen /></Frame> },
                { key: 'web', w: 522, s: 0.6, node: <Frame screenW={494} screenH={250} bezel={12} radius={14}><MonitorScreen /></Frame> },
                { key: 'phone', w: 150, s: 0.9, node: <Frame screenW={130} screenH={280} bezel={8} radius={26}><PhoneScreen /></Frame> },
                { key: 'tv', w: 390, s: 0.7, node: <Frame screenW={366} screenH={206} bezel={10} radius={10}><TvScreen /></Frame> },
                { key: 'watch', w: 95, s: 1, node: <Frame screenW={75} screenH={95} bezel={8} radius={26}><WatchScreen /></Frame> },
                { key: 'voice', w: 160, s: 1, node: <Puck /> },
              ] as Array<{ key: Placed['key']; w: number; s: number; node: ReactNode }>
            ).map((d) => (
              <figure key={d.key} style={{ scrollSnapAlign: 'center', margin: 0 }}>
                <div style={{ width: d.w * d.s, overflow: 'visible' }}>
                  <div style={{ transform: `scale(${d.s})`, transformOrigin: 'top left' }}>{d.node}</div>
                </div>
                <figcaption data-device-ui="" style={{ ...monoStyle(9, '.22em', 'rgba(242,233,218,.5)'), marginTop: 12, whiteSpace: 'nowrap' }}>
                  {roles[d.key]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="v4-act4-close" style={{ fontFamily: V4.serif, fontWeight: 530, fontSize: 'clamp(22px, 2.5vw, 32px)', marginTop: 60, textAlign: 'center', color: '#EFE3D0', textWrap: 'balance' }}>
          {c.closingPre}
          <span style={{ fontStyle: 'italic', fontWeight: 480, color: V4.cream }}>{c.closingHi}</span>
        </div>
      </div>
    </section>
  )
}
