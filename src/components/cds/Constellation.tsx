'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { VoiceOrb } from './VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { constellationCopy } from '@/lib/i18n/marketing/constellation'
import { surfaceWall } from '@/lib/i18n/marketing/surfaceWall'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { homeCopy } from '@/lib/i18n/marketing/home'

/**
 * v3 Phase 3B — THE CONSTELLATION (docs/v3/specs/PHASE_3_HEROES.md, ref 7a).
 * One composed still: six devices overlapping in depth, one question rendered
 * once (on the tablet), a faint gold thread connecting them left→right.
 * Devices rise+fade in staggered 80ms; the thread draws once (600ms).
 * Reduced motion: everything static. Mobile: a scroll-snap row.
 * Photography: real assets only — no placeholder stripes.
 */

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

/* --------------------------------------------------------- device screens */

const frame: CSSProperties = {
  background: 'var(--device-frame)',
  border: '1px solid var(--hairline)',
  borderRadius: 14,
  overflow: 'hidden',
  boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
}

function Laptop({ w }: { w: number }) {
  const s = useCopy(surfaceWall).laptop
  return (
    <div className="font-sans" style={{ width: w }}>
      <div style={{ ...frame, borderRadius: '10px 10px 0 0' }}>
        <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: '1px solid var(--hairline)' }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--border)' }} />
          <span className="eyebrow" style={{ fontSize: 7.5 }}>{s.tab}</span>
        </div>
        <div className="flex gap-3 p-3">
          <div
            role="img"
            aria-label={s.room}
            style={{ width: '46%', height: 74, borderRadius: 8, backgroundImage: 'url(/assets/ui/suite-1.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div style={{ flex: 1 }}>
            <span className="eyebrow" style={{ fontSize: 7, color: 'var(--success)' }}>{s.badge}</span>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', marginTop: 3 }}>{s.room}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-dim)', marginTop: 2 }}>{s.price}</div>
            <span
              style={{ display: 'inline-block', marginTop: 7, background: 'var(--accent)', color: 'var(--bg)', borderRadius: 999, fontSize: 9.5, fontWeight: 600, padding: '3.5px 10px' }}
            >
              {s.cta}
            </span>
          </div>
        </div>
      </div>
      {/* laptop base */}
      <div style={{ height: 7, background: 'var(--surface-4)', borderRadius: '0 0 10px 10px' }} />
    </div>
  )
}

function Tv({ w }: { w: number }) {
  const s = useCopy(surfaceWall).tv
  return (
    <div style={{ width: w }}>
      <div style={{ ...frame, borderRadius: 8, borderWidth: 2 }}>
        <div
          className="relative"
          style={{ height: w * 0.55, backgroundImage: 'url(/assets/img/platform-pool-night.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,13,15,0.15), rgba(13,13,15,0.75))' }} />
          <div className="absolute left-4 bottom-3">
            <div className="font-serif" style={{ fontSize: 17, fontWeight: 530, color: 'var(--text)' }}>{s.greeting}</div>
            <div className="eyebrow" style={{ fontSize: 7.5, marginTop: 3 }}>{s.room} · {s.meta}</div>
          </div>
        </div>
      </div>
      <div style={{ width: 44, height: 8, margin: '0 auto', background: 'var(--surface-4)', borderRadius: '0 0 6px 6px' }} />
    </div>
  )
}

function Tablet({ w }: { w: number }) {
  const b = useCopy(deviceScreens).screens.beach
  const intent = useCopy(homeCopy).surfaces2029.intent
  return (
    <div className="font-sans" style={{ ...frame, width: w, borderRadius: 22, border: '6px solid var(--surface-4)' }}>
      <div className="relative">
        <div
          role="img"
          aria-label={b.title}
          style={{ height: w * 0.52, backgroundImage: `url(${b.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        {/* the one question, asked once */}
        <span
          className="absolute top-2.5 right-2.5"
          style={{
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
            fontSize: 9.5,
            color: 'var(--text)',
            background: 'color-mix(in srgb, var(--surface-1) 78%, transparent)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--hairline)',
            borderRadius: 999,
            padding: '4px 10px',
          }}
        >
          {intent}
        </span>
      </div>
      <div className="px-4 py-3">
        <div className="font-serif" style={{ fontSize: 19, fontWeight: 530, color: 'var(--text)' }}>{b.title}</div>
        <div style={{ fontSize: 11.5, color: 'var(--champagne)', marginTop: 2 }}>{b.meta}</div>
        <div className="flex gap-2" style={{ marginTop: 10 }}>
          <span style={{ border: '1px solid var(--hairline)', color: 'var(--text-dim)', borderRadius: 999, fontSize: 10.5, padding: '4.5px 11px' }}>{b.actions[0]}</span>
          <span style={{ background: 'var(--accent)', color: 'var(--bg)', borderRadius: 999, fontSize: 10.5, fontWeight: 600, padding: '4.5px 11px' }}>{b.actions[1]}</span>
        </div>
      </div>
    </div>
  )
}

function Phone({ w }: { w: number }) {
  const orb = useCopy(liveDemoCopy).orbStates.idle
  return (
    <div
      className="font-sans flex flex-col items-center"
      style={{ ...frame, width: w, borderRadius: 24, border: '5px solid var(--surface-4)', padding: '22px 12px 18px', background: 'var(--bg)' }}
    >
      <VoiceOrb size={w * 0.42} showMic={false} state="idle" />
      <div style={{ fontSize: 9.5, color: 'var(--text-dim)', marginTop: 12, textAlign: 'center' }}>{orb}</div>
    </div>
  )
}

function Watch({ w }: { w: number }) {
  const s = useCopy(surfaceWall).watch
  return (
    <div
      className="font-sans"
      style={{ ...frame, width: w, borderRadius: w * 0.3, border: '4px solid var(--surface-4)', padding: '16px 10px', textAlign: 'center', background: 'var(--bg)' }}
    >
      <div className="font-serif" style={{ fontSize: 20, fontWeight: 530, color: 'var(--text)' }}>{s.time}</div>
      <div className="eyebrow" style={{ fontSize: 7.5, marginTop: 4 }}>{s.glance.toUpperCase()}</div>
    </div>
  )
}

function Puck({ w }: { w: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: w, height: w * 0.62 }}>
      {/* amber glow rising from the disc */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          inset: '-30% -12% 20% -12%',
          background: 'radial-gradient(50% 60% at 50% 62%, rgba(232,166,106,0.28), transparent 70%)',
          filter: 'blur(6px)',
        }}
      />
      <div
        style={{
          width: w * 0.86,
          height: w * 0.34,
          borderRadius: w,
          background: 'radial-gradient(120% 160% at 50% 0%, var(--surface-4), var(--device-frame) 70%)',
          border: '1px solid var(--hairline)',
          boxShadow: '0 18px 44px rgba(0,0,0,0.5)',
        }}
      />
      <div className="absolute" style={{ top: '4%' }}>
        <VoiceOrb size={w * 0.3} showMic={false} state="idle" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- composed */

export function Constellation() {
  const c = useCopy(constellationCopy)
  const [ref, seen] = useSeen<HTMLDivElement>()

  const cap = (text: string, center = true): ReactNode => (
    <figcaption className="eyebrow" style={{ fontSize: 8.5, marginTop: 12, textAlign: center ? 'center' : 'left', whiteSpace: 'nowrap' }}>
      {text}
    </figcaption>
  )

  // Desktop absolute placement (percentages of the ~90vh stage).
  const devices: Array<{
    key: keyof typeof c.roles
    node: ReactNode
    style: CSSProperties
    z: number
  }> = [
    { key: 'tv', node: <Tv w={330} />, style: { left: '6%', top: '6%' }, z: 1 },
    { key: 'web', node: <Laptop w={320} />, style: { right: '5%', top: '10%' }, z: 1 },
    { key: 'tablet', node: <Tablet w={392} />, style: { left: '50%', top: '20%', marginLeft: -196 }, z: 3 },
    { key: 'phone', node: <Phone w={168} />, style: { left: '13%', bottom: '7%' }, z: 4 },
    { key: 'watch', node: <Watch w={126} />, style: { left: '56%', bottom: '5%' }, z: 4 },
    { key: 'voice', node: <Puck w={128} />, style: { right: '9%', bottom: '9%' }, z: 4 },
  ]

  return (
    <div ref={ref}>
      {/* ------------------------------------------------ desktop still */}
      <div className="hidden md:block relative" style={{ height: '90vh', minHeight: 640 }}>
        {/* the gold thread, drawn once */}
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 900">
          <path
            d="M 60 180 C 260 340, 420 300, 500 380 S 700 240, 940 220 M 500 380 C 420 640, 260 700, 190 760 M 500 380 C 620 620, 640 720, 620 790 M 500 380 C 760 560, 840 680, 880 740"
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
              ...d.style,
              zIndex: d.z,
              opacity: seen ? 1 : 0,
              transform: seen ? 'none' : 'translateY(14px)',
              transition: `opacity 600ms var(--ease-standard) ${i * 80}ms, transform 600ms var(--ease-emphasis) ${i * 80}ms`,
            }}
          >
            {d.node}
            {cap(c.roles[d.key])}
          </figure>
        ))}
      </div>

      {/* --------------------------------------------- mobile snap row */}
      <div className="md:hidden -mx-4 px-4" style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
        <div className="flex items-end gap-8" style={{ width: 'max-content', padding: '8px 8px 4px' }}>
          {[
            { key: 'tv' as const, node: <Tv w={280} /> },
            { key: 'web' as const, node: <Laptop w={280} /> },
            { key: 'tablet' as const, node: <Tablet w={300} /> },
            { key: 'phone' as const, node: <Phone w={160} /> },
            { key: 'watch' as const, node: <Watch w={120} /> },
            { key: 'voice' as const, node: <Puck w={128} /> },
          ].map((d) => (
            <figure key={d.key} style={{ scrollSnapAlign: 'center' }}>
              {d.node}
              {cap(c.roles[d.key])}
            </figure>
          ))}
        </div>
      </div>

      {/* closing line */}
      <p
        className="font-serif mt-12"
        style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', fontWeight: 530, color: 'var(--text)', textAlign: 'center' }}
      >
        {c.closing}
      </p>
    </div>
  )
}
