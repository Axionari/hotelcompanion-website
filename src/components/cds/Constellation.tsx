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
 * v3 Phase 3B — THE CONSTELLATION, re-composed per P3.2 F3
 * (docs/v3/PANEL_INSPECTION_AND_CORRECTIONS.md): deterministic 1200×760 stage,
 * device boxes and overlap topology from the panel's table, captions in clear
 * stage space (G-4c), no connector lines (G-4d), grounded puck with a contact
 * shadow (G-4f), and every orb instance via the shared ArcOrb (F4/G-5).
 * Materials (2px silver rim → #0b0908 bezel → screen, radii, shadow) are
 * ADDENDUM_2's and unchanged. Copy is the v3 deck's; screens use real repo
 * assets — the striped placeholders of the reference never ship.
 *
 * Desktop: the stage scales to the container. Devices rise+fade staggered
 * 80ms. Reduced motion: static. Mobile: scroll-snap row of the same devices.
 */

/* ---------------------------------------------------------- materials */

const RIM = 'linear-gradient(180deg, #d9d9d9, #9c9c9c)' // pale silver edge, top-lit
const BEZEL = '#0b0908'
const SHADOW = '0 34px 70px -24px rgba(0,0,0,0.65), 0 0 0 1px rgba(243,236,226,0.06)'
const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }

/** Outer metallic rim (exactly 2px per side, G-4e) → near-black inner bezel →
    screen. `data-cframe` marks the visible hardware box for the rect audits. */
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
      data-cframe=""
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
      {/* answer block — starts right of the watch's overlap zone (G-4b: the
          watch fronts the tablet at its lower-left seam; only imagery may sit
          under it) */}
      <div className="absolute bottom-4" style={{ left: 64, maxWidth: '78%' }}>
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

/** P3.2 F3.1 — the booking UI lives in the RIGHT 65% of the screen; the left
    35% is imagery/margin only, so the tablet's overlap never cuts a word. */
function MonitorScreen() {
  const s = useCopy(surfaceWall).laptop
  const up = useCopy(deviceScreens).screens.upgrade
  return (
    <div className="absolute inset-0 font-sans" style={{ background: 'var(--surface-1)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={s.room}
        src="/assets/ui/suite-1.webp"
        loading="lazy"
        decoding="async"
        className="absolute"
        style={{ left: 0, top: 0, bottom: 0, width: '35%', height: '100%', objectFit: 'cover' }}
      />
      <div className="absolute" style={{ left: '38%', right: 0, top: 0, bottom: 0 }}>
        <div className="flex items-center justify-between pr-4" style={{ height: 42, borderBottom: '1px solid var(--hairline)' }}>
          <span style={{ ...MONO, fontSize: 9.5, color: 'var(--text-faint)', background: 'var(--surface-3)', borderRadius: 999, padding: '4px 12px' }}>
            {s.tab}
          </span>
          <span style={{ ...MONO, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--success)' }}>{s.badge}</span>
        </div>
        <div className="pr-4" style={{ paddingTop: 18 }}>
          <div className="font-serif" style={{ fontSize: 26, fontWeight: 530, color: 'var(--text)' }}>{s.room}</div>
          <div style={{ fontSize: 13.5, color: 'var(--champagne)', marginTop: 5 }}>{s.price}</div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>{up.meta}</div>
          <span style={{ display: 'inline-block', marginTop: 16, background: 'var(--accent)', color: 'var(--bg)', borderRadius: 999, fontSize: 12.5, fontWeight: 600, padding: '8px 18px' }}>
            {s.cta}
          </span>
        </div>
      </div>
    </div>
  )
}

/** P3.2 F3.4 — orb + listening line + pills + ghost input distributed to fill
    the screen (no dead band); the orb is the shared ArcOrb, never a disc. */
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
    maxWidth: 165, // clears the watch's overlap zone at the screen's right edge
  }
  return (
    <div className="absolute inset-0 font-sans flex flex-col items-center" style={{ background: 'var(--bg)', padding: '38px 16px 16px' }}>
      {/* notch/island bar */}
      <div className="absolute" style={{ top: 10, left: '50%', marginLeft: -45, width: 90, height: 22, borderRadius: 999, background: BEZEL }} />
      <div className="flex-1 self-stretch flex flex-col items-center justify-evenly">
        <ArcOrb size={116} />
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{demo.orbStates.idle}</div>
        <div className="flex flex-col items-start gap-2.5 self-stretch" style={{ paddingLeft: 2 }}>
          <span style={pill}>{demo.suggestions[0]}</span>
          <span style={pill}>{demo.suggestions[1]}</span>
        </div>
      </div>
      <div
        className="self-stretch"
        style={{
          border: '1px solid var(--hairline)',
          borderRadius: 999,
          padding: '10px 16px',
          marginRight: 34, // stays clear of the watch's overlap zone (G-4b)
          fontSize: 11.5,
          color: 'var(--text-faint)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
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
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'var(--bg)', gap: 4 }}>
      {/* P3.2 F4 — the watch dot is the shared orb, never a flat circle */}
      <ArcOrb size={20} />
      <div className="font-serif" style={{ fontSize: 21, fontWeight: 530, color: 'var(--text)', lineHeight: 1 }}>{s.time}</div>
      <div style={{ ...MONO, fontSize: 8, letterSpacing: '0.18em', color: 'var(--eyebrow-warm)' }}>{s.glance.toUpperCase()}</div>
    </div>
  )
}

/** P3.2 F3.3 — TV text starts ≥48px inside the screen so the tablet's overlap
    never touches its eyebrow or copy. */
function TvScreen() {
  const tv = useCopy(surfaceWall).tv
  const greeting = useCopy(deviceScreens).greeting
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={tv.greeting} src="/assets/img/luxury-lobby.webp" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,9,8,0.1), rgba(11,9,8,0.78))' }} />
      <div className="absolute" style={{ left: 52, bottom: 16 }}>
        <div style={{ ...MONO, fontSize: 8.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--champagne)' }}>{greeting}</div>
        <div className="font-serif" style={{ fontSize: 22, fontWeight: 530, color: 'var(--text)', marginTop: 4 }}>{tv.greeting}</div>
        <div className="font-sans" style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 2 }}>{tv.meta}</div>
      </div>
    </>
  )
}

/* --------------------------------------------------- hardware objects */

function MonitorStand() {
  return (
    <div className="flex flex-col items-center" data-cframe="" aria-hidden="true">
      <div
        style={{
          width: 128,
          height: 50,
          background: 'linear-gradient(180deg, #6a6a6a, #3a3a3a)',
          clipPath: 'polygon(18% 0, 82% 0, 100% 100%, 0 100%)',
        }}
      />
      <div style={{ width: 230, height: 12, borderRadius: 999, background: 'linear-gradient(180deg, #6a6a6a, #3a3a3a)' }} />
    </div>
  )
}

/** The domed hardware puck — grounded: its top overlaps the tablet's bottom
    edge and an elliptical contact shadow sits beneath it (P3.2 F3.2/G-4f). */
function Puck() {
  return (
    <div className="relative" data-cframe="" style={{ width: 144, height: 91 }} aria-hidden="true">
      <div
        className="absolute"
        style={{
          left: '4%',
          right: '4%',
          bottom: -9,
          height: 20,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.5), rgba(0,0,0,0.18) 55%, transparent 78%)',
          filter: 'blur(5px)',
        }}
      />
      <div
        data-puck-body=""
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
          boxShadow: '0 0 18px 6px rgba(232,166,106,0.4)',
        }}
      />
    </div>
  )
}

function WatchBody() {
  const stub: CSSProperties = { width: 62, height: 22, borderRadius: 12, background: '#241c14', marginInline: 'auto' }
  return (
    <div className="flex flex-col items-center">
      <div data-cframe="" style={{ ...stub, marginBottom: -8 }} />
      <Frame screenW={76} screenH={88} bezel={8} radius={30}>
        <WatchScreen />
      </Frame>
      <div data-cframe="" style={{ ...stub, marginTop: -8 }} />
    </div>
  )
}

/* ------------------------------------------------------------- stage */

const STAGE_W = 1200
const STAGE_H = 760

interface Placed {
  key: 'web' | 'tv' | 'tablet' | 'watch' | 'phone' | 'voice'
  x: number
  y: number
  z: number
  node: ReactNode
  captionAt: { x: number; y: number; align?: 'left' | 'center' | 'right' }
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
      data-caption=""
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
        ...(at.align === 'right' ? { transform: 'translateX(-100%)' } : {}),
      }}
    >
      {text}
    </figcaption>
  )

  /* P3.2 F3 re-composition — the panel's deterministic table on a 1200×760
     stage. Outer boxes (rim included): monitor 552→1152 / 15→330 (+stand to
     ~392) · phone 144→402 / 106→608 · TV 744→1104 / 471→669 · tablet 378→768
     / 61→638 · watch 348→444 / 441→577 · puck 564→708 / 608→699. Overlaps:
     phone/TV tuck 24px under the tablet; watch nests at the phone/tablet lower
     seam in front of both; the puck's top overlaps the tablet's bottom ~30px.
     Caption slots sit in clear stage space (G-4c audits every pair). */
  const devices: Placed[] = [
    {
      key: 'web',
      x: 552,
      y: 15,
      z: 1,
      node: (
        <div className="flex flex-col items-center">
          <Frame screenW={580} screenH={295} bezel={8} radius={22}>
            <MonitorScreen />
          </Frame>
          <MonitorStand />
        </div>
      ),
      captionAt: { x: 1152, y: 402, align: 'right' },
    },
    {
      key: 'phone',
      x: 144,
      y: 106,
      z: 2,
      node: (
        <Frame screenW={234} screenH={478} bezel={10} radius={44}>
          <PhoneScreen />
        </Frame>
      ),
      captionAt: { x: 40, y: 628 },
    },
    {
      key: 'tv',
      x: 744,
      y: 471,
      z: 2,
      node: (
        <Frame screenW={340} screenH={178} bezel={8} radius={22}>
          <TvScreen />
        </Frame>
      ),
      captionAt: { x: 924, y: 692, align: 'center' },
    },
    {
      key: 'tablet',
      x: 378,
      y: 61,
      z: 3,
      node: (
        <Frame screenW={362} screenH={549} bezel={12} radius={40}>
          <TabletScreen />
        </Frame>
      ),
      captionAt: { x: 380, y: 712 },
    },
    {
      key: 'watch',
      x: 348,
      y: 441,
      z: 4,
      node: <WatchBody />,
      captionAt: { x: 396, y: 652, align: 'center' },
    },
    {
      key: 'voice',
      x: 564,
      y: 608,
      z: 4,
      node: <Puck />,
      captionAt: { x: 636, y: 736, align: 'center' },
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
      {/* P3.2 F3.6 — the reference has no connector lines; the gold thread was
          removed (G-4d: zero SVG paths in the section). */}
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
              { key: 'tablet', w: 390, s: 0.72, node: <Frame screenW={362} screenH={549} bezel={12} radius={40}><TabletScreen /></Frame> },
              { key: 'web', w: 600, s: 0.52, node: <div className="flex flex-col items-center"><Frame screenW={580} screenH={295} bezel={8} radius={22}><MonitorScreen /></Frame><MonitorStand /></div> },
              { key: 'phone', w: 258, s: 0.8, node: <Frame screenW={234} screenH={478} bezel={10} radius={44}><PhoneScreen /></Frame> },
              { key: 'tv', w: 360, s: 0.62, node: <Frame screenW={340} screenH={178} bezel={8} radius={22}><TvScreen /></Frame> },
              { key: 'watch', w: 96, s: 1, node: <WatchBody /> },
              { key: 'voice', w: 144, s: 1, node: <Puck /> },
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
