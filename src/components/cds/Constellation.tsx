'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { ArcOrb } from './SunArc'
import { useCopy } from '@/lib/i18n/useCopy'
import { constellationCopy } from '@/lib/i18n/marketing/constellation'
import { surfaceWall } from '@/lib/i18n/marketing/surfaceWall'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { homeCopy } from '@/lib/i18n/marketing/home'

/**
 * v3 Phase 3B — THE CONSTELLATION, rebuilt to ADDENDUM_2 (A4): device frames,
 * materials, radii, shadows, overlap order and composition follow the forensic
 * spec of the Claude Design 7a reference 1:1 (no `.dc.html` export was present
 * at build time — tier 2 applies). Copy is the v3 deck's; screens use real
 * repo assets; the striped placeholders of the reference never ship.
 *
 * Desktop: a fixed 1200×820 stage, scaled to the container. Devices rise+fade
 * staggered 80ms; the gold thread (base §3B) draws once. Reduced motion:
 * static. Mobile: scroll-snap row of the same devices, scaled.
 */

/* ---------------------------------------------------------- materials */

const RIM = 'linear-gradient(180deg, #d9d9d9, #9c9c9c)' // pale silver edge, top-lit
const BEZEL = '#0b0908'
const SHADOW = '0 34px 70px -24px rgba(0,0,0,0.65), 0 0 0 1px rgba(243,236,226,0.06)'
const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }

/** Outer metallic rim (2px) → near-black inner bezel → screen. */
function Frame({
  screenW,
  screenH,
  bezel,
  radius,
  children,
  style,
}: {
  screenW: number
  screenH: number
  bezel: number
  radius: number
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    /* data-device-ui: OQ-6 — constellation screens are device-screen text */
    <div
      data-device-ui=""
      style={{
        padding: 2,
        background: RIM,
        borderRadius: radius,
        boxShadow: SHADOW,
        width: screenW + 2 * bezel + 4,
        ...style,
      }}
    >
      <div style={{ padding: bezel, background: BEZEL, borderRadius: radius - 2 }}>
        <div
          className="relative"
          style={{ width: screenW, height: screenH, borderRadius: radius - 2 - bezel / 2, overflow: 'hidden', background: 'var(--bg)' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ screens */

function TabletScreen() {
  const b = useCopy(deviceScreens)
  const intent = useCopy(homeCopy).surfaces2029.intent
  const beach = b.screens.beach
  const chip: CSSProperties = {
    ...MONO,
    fontSize: 9,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text)',
    background: 'color-mix(in srgb, var(--surface-1) 76%, transparent)',
    backdropFilter: 'blur(6px)',
    border: '1px solid var(--hairline)',
    borderRadius: 999,
    padding: '5px 11px',
  }
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={beach.title} src={beach.image} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,9,8,0.18), transparent 30%, transparent 55%, rgba(11,9,8,0.72))' }} />
      {/* status row */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span style={chip}>{b.property}</span>
        <span style={{ ...chip, color: 'var(--champagne)' }}>{b.listening}</span>
      </div>
      {/* the one question, asked once */}
      <span className="absolute top-3 right-3" style={chip}>{intent}</span>
      {/* answer block */}
      <div className="absolute left-4 bottom-4" style={{ maxWidth: '82%' }}>
        <div className="font-serif" style={{ fontSize: 30, fontWeight: 530, color: 'var(--text)' }}>{beach.title}</div>
        <div className="font-sans" style={{ fontSize: 13, color: 'var(--champagne)', marginTop: 3 }}>{beach.meta}</div>
        <div className="flex gap-2.5" style={{ marginTop: 12 }}>
          <span className="font-sans" style={{ background: 'var(--accent)', color: 'var(--bg)', borderRadius: 999, fontSize: 12, fontWeight: 600, padding: '7px 15px' }}>
            {beach.actions[1]}
          </span>
          <span className="font-sans" style={{ border: '1px solid rgba(243,236,226,0.28)', color: 'var(--text)', borderRadius: 999, fontSize: 12, padding: '7px 15px' }}>
            {beach.actions[0]}
          </span>
        </div>
      </div>
    </>
  )
}

function MonitorScreen() {
  const s = useCopy(surfaceWall).laptop
  const up = useCopy(deviceScreens).screens.upgrade
  return (
    <div className="absolute inset-0 font-sans" style={{ background: 'var(--surface-1)' }}>
      <div className="flex items-center justify-between px-4" style={{ height: 40, borderBottom: '1px solid var(--hairline)' }}>
        <span style={{ ...MONO, fontSize: 9.5, color: 'var(--text-faint)', background: 'var(--surface-3)', borderRadius: 999, padding: '4px 12px' }}>
          {s.tab}
        </span>
        <span style={{ ...MONO, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--success)' }}>{s.badge}</span>
      </div>
      <div className="flex gap-5 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={s.room}
          src="/assets/ui/suite-1.webp"
          loading="lazy"
          decoding="async"
          style={{ width: 210, height: 150, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
        />
        <div>
          <div className="font-serif" style={{ fontSize: 24, fontWeight: 530, color: 'var(--text)' }}>{s.room}</div>
          <div style={{ fontSize: 13.5, color: 'var(--champagne)', marginTop: 4 }}>{s.price}</div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 3 }}>{up.meta}</div>
          <span style={{ display: 'inline-block', marginTop: 14, background: 'var(--accent)', color: 'var(--bg)', borderRadius: 999, fontSize: 12.5, fontWeight: 600, padding: '8px 18px' }}>
            {s.cta}
          </span>
        </div>
      </div>
    </div>
  )
}

function PhoneScreen() {
  const demo = useCopy(liveDemoCopy)
  const pill: CSSProperties = {
    fontSize: 11.5,
    color: 'var(--text-dim)',
    border: '1px solid var(--hairline)',
    background: 'var(--surface-1)',
    borderRadius: 999,
    padding: '7px 13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 200,
  }
  return (
    <div className="absolute inset-0 font-sans flex flex-col items-center" style={{ background: 'var(--bg)', paddingTop: 46 }}>
      {/* notch/island bar */}
      <div className="absolute" style={{ top: 10, left: '50%', marginLeft: -45, width: 90, height: 22, borderRadius: 999, background: BEZEL }} />
      <div style={{ marginTop: 26 }}>
        <ArcOrb size={104} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>{demo.orbStates.idle}</div>
      <div className="flex flex-col items-center gap-2.5" style={{ marginTop: 26 }}>
        <span style={pill}>{demo.suggestions[0]}</span>
        <span style={pill}>{demo.suggestions[1]}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 16,
          right: 16,
          border: '1px solid var(--hairline)',
          borderRadius: 999,
          padding: '10px 16px',
          fontSize: 11.5,
          color: 'var(--text-faint)',
        }}
      >
        {demo.placeholder}
      </div>
    </div>
  )
}

function WatchScreen() {
  const s = useCopy(surfaceWall).watch
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'var(--bg)', gap: 5 }}>
      <span
        aria-hidden="true"
        style={{ width: 12, height: 12, borderRadius: 999, background: 'radial-gradient(circle at 40% 32%, #e8a66a, #c56a3d)' }}
      />
      <div className="font-serif" style={{ fontSize: 24, fontWeight: 530, color: 'var(--text)', lineHeight: 1 }}>{s.time}</div>
      <div style={{ ...MONO, fontSize: 8, letterSpacing: '0.22em', color: 'var(--eyebrow-warm)' }}>{s.glance.toUpperCase()}</div>
    </div>
  )
}

function TvScreen() {
  const tv = useCopy(surfaceWall).tv
  const greeting = useCopy(deviceScreens).greeting
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={tv.greeting} src="/assets/img/luxury-lobby.webp" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,9,8,0.1), rgba(11,9,8,0.78))' }} />
      <div className="absolute left-5 bottom-4">
        <div style={{ ...MONO, fontSize: 8.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--champagne)' }}>{greeting}</div>
        <div className="font-serif" style={{ fontSize: 24, fontWeight: 530, color: 'var(--text)', marginTop: 4 }}>{tv.greeting}</div>
        <div className="font-sans" style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{tv.meta}</div>
      </div>
    </>
  )
}

/* --------------------------------------------------- hardware objects */

function MonitorStand() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div
        style={{
          width: 128,
          height: 56,
          background: 'linear-gradient(180deg, #6a6a6a, #3a3a3a)',
          clipPath: 'polygon(18% 0, 82% 0, 100% 100%, 0 100%)',
        }}
      />
      <div style={{ width: 230, height: 12, borderRadius: 999, background: 'linear-gradient(180deg, #6a6a6a, #3a3a3a)' }} />
    </div>
  )
}

function Puck() {
  return (
    <div className="relative" style={{ width: 150, height: 85 }} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 70% 60% at 50% 26%, #b9b9b9, #7c7c7c 62%, #565656 100%)',
          boxShadow: '0 26px 44px -14px rgba(0,0,0,0.6), inset 0 -14px 22px rgba(0,0,0,0.35)',
        }}
      />
      {/* amber orb lens on the upper surface */}
      <span
        className="absolute"
        style={{
          top: 14,
          left: '50%',
          marginLeft: -11,
          width: 22,
          height: 22,
          borderRadius: 999,
          background: 'radial-gradient(circle at 42% 34%, #e8a66a, #c56a3d)',
          boxShadow: '0 0 18px 4px rgba(232,166,106,0.4)',
        }}
      />
    </div>
  )
}

function WatchBody({ children }: { children: ReactNode }) {
  const stub: CSSProperties = { width: 62, height: 24, borderRadius: 12, background: '#241c14', marginInline: 'auto' }
  return (
    <div className="flex flex-col items-center">
      <div style={{ ...stub, marginBottom: -8 }} />
      <Frame screenW={95} screenH={110} bezel={8} radius={30}>
        <WatchScreen />
      </Frame>
      <div style={{ ...stub, marginTop: -8 }} />
    </div>
  )
}

/* ------------------------------------------------------------- stage */

const STAGE_W = 1200
const STAGE_H = 830

interface Placed {
  key: 'web' | 'tv' | 'tablet' | 'watch' | 'phone' | 'voice'
  x: number
  y: number
  z: number
  node: ReactNode
  captionAt: { x: number; y: number; align?: 'left' | 'center' }
}

function useSeen<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSeen(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    )
    io.observe(el)
    const failsafe = window.setTimeout(() => setSeen(true), 3500)
    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])
  return [ref, seen]
}

export function Constellation() {
  const c = useCopy(constellationCopy)
  const sectionTitle = useCopy(homeCopy).surfaces2029.title
  const [ref, seen] = useSeen<HTMLDivElement>()
  const [scale, setScale] = useState(1)
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const measure = () => {
      const w = hostRef.current?.clientWidth ?? STAGE_W
      setScale(Math.min(1, w / (STAGE_W + 40)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const caption = (text: string, at: Placed['captionAt']): ReactNode => (
    <figcaption
      style={{
        ...MONO,
        position: 'absolute',
        left: at.x,
        top: at.y,
        fontSize: 10,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--text-lo)',
        opacity: 0.65,
        whiteSpace: 'nowrap',
        ...(at.align === 'center' ? { transform: 'translateX(-50%)' } : {}),
      }}
    >
      {text}
    </figcaption>
  )

  /* Forensic composition — rear→front: monitor(1) · TV/phone(2) · tablet(3) ·
     watch/puck(4). Screen sizes and materials per ADDENDUM_2. */
  const devices: Placed[] = [
    {
      key: 'web',
      x: 470,
      y: 26,
      z: 1,
      node: (
        <div className="flex flex-col items-center">
          <Frame screenW={560} screenH={260} bezel={8} radius={22}>
            <MonitorScreen />
          </Frame>
          <MonitorStand />
        </div>
      ),
      captionAt: { x: 900, y: 372, align: 'center' },
    },
    {
      key: 'phone',
      x: 150,
      y: 140,
      z: 2,
      node: (
        <Frame screenW={250} screenH={500} bezel={10} radius={44}>
          <PhoneScreen />
        </Frame>
      ),
      captionAt: { x: 150, y: 690 },
    },
    {
      key: 'tv',
      x: 745,
      y: 468,
      z: 2,
      node: (
        <Frame screenW={420} screenH={205} bezel={8} radius={22}>
          <TvScreen />
        </Frame>
      ),
      captionAt: { x: 965, y: 712, align: 'center' },
    },
    {
      key: 'tablet',
      x: 408,
      y: 56,
      z: 3,
      node: (
        <Frame screenW={360} screenH={550} bezel={12} radius={40}>
          <TabletScreen />
        </Frame>
      ),
      captionAt: { x: 408, y: 662 },
    },
    {
      key: 'watch',
      x: 326,
      y: 566,
      z: 4,
      node: <WatchBody>{null}</WatchBody>,
      captionAt: { x: 384, y: 758, align: 'center' },
    },
    {
      key: 'voice',
      x: 618,
      y: 700,
      z: 4,
      node: <Puck />,
      captionAt: { x: 693, y: 800, align: 'center' },
    },
  ]

  const stage = (
    <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
      {/* faint amber radial vignette behind the cluster, bottom-center */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: '20%',
          right: '20%',
          top: '30%',
          bottom: 0,
          background: 'radial-gradient(60% 55% at 50% 70%, rgba(232,166,106,0.10), transparent 72%)',
          filter: 'blur(24px)',
        }}
      />
      {/* the gold thread (base §3B), drawn once */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}>
        <path
          d="M 150 430 C 300 660, 400 640, 470 560 S 560 300, 620 330 S 760 620, 700 700 M 620 330 C 780 250, 860 180, 1040 200 M 700 700 C 830 660, 900 620, 980 580"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity="0.15"
          className={seen ? 'constellation-thread drawn' : 'constellation-thread'}
        />
      </svg>
      {devices.map((d, i) => (
        <figure
          key={d.key}
          className="absolute"
          style={{
            left: d.x,
            top: d.y,
            zIndex: d.z,
            opacity: seen ? 1 : 0,
            transform: seen ? 'none' : 'translateY(14px)',
            transition: `opacity 600ms var(--ease-standard) ${i * 80}ms, transform 600ms var(--ease-emphasis) ${i * 80}ms`,
          }}
        >
          {d.node}
        </figure>
      ))}
      {devices.map((d) => (
        <span key={`${d.key}-cap`}>{caption(c.roles[d.key], d.captionAt)}</span>
      ))}
    </div>
  )

  return (
    <div ref={ref}>
      {/* ------------------------------------------------ desktop still */}
      <div ref={hostRef} className="hidden md:flex justify-center overflow-hidden">
        <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>{stage}</div>
        </div>
      </div>

      {/* --------------------------------------------- mobile snap row */}
      <div
        className="md:hidden -mx-4 px-4"
        role="region"
        aria-label={sectionTitle}
        tabIndex={0}
        style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex items-end gap-10" style={{ width: 'max-content', padding: '8px 8px 4px' }}>
          {(
            [
              { key: 'tablet', w: 384, s: 0.72, node: <Frame screenW={360} screenH={550} bezel={12} radius={40}><TabletScreen /></Frame> },
              { key: 'web', w: 580, s: 0.52, node: <div className="flex flex-col items-center"><Frame screenW={560} screenH={260} bezel={8} radius={22}><MonitorScreen /></Frame><MonitorStand /></div> },
              { key: 'phone', w: 274, s: 0.8, node: <Frame screenW={250} screenH={500} bezel={10} radius={44}><PhoneScreen /></Frame> },
              { key: 'tv', w: 440, s: 0.62, node: <Frame screenW={420} screenH={205} bezel={8} radius={22}><TvScreen /></Frame> },
              { key: 'watch', w: 115, s: 1, node: <WatchBody>{null}</WatchBody> },
              { key: 'voice', w: 150, s: 1, node: <Puck /> },
            ] as Array<{ key: keyof typeof c.roles; w: number; s: number; node: ReactNode }>
          ).map((d) => (
            <figure key={d.key} style={{ scrollSnapAlign: 'center' }}>
              <div style={{ width: d.w * d.s, overflow: 'visible' }}>
                <div style={{ transform: `scale(${d.s})`, transformOrigin: 'top left' }}>{d.node}</div>
              </div>
              <figcaption
                style={{ ...MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text-lo)', opacity: 0.65, marginTop: 12, whiteSpace: 'nowrap' }}
              >
                {c.roles[d.key]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* hairline divider + centered closing line */}
      <div aria-hidden="true" className="mt-12" style={{ height: 1, background: 'var(--hairline)' }} />
      <p
        className="font-serif mt-10"
        style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', fontWeight: 530, color: 'var(--text)', textAlign: 'center' }}
      >
        {c.closing}
      </p>
    </div>
  )
}
