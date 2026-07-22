'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { VoiceOrb } from './VoiceOrb'
import { ReceiptCard } from './ReceiptCard'
import { useCopy } from '@/lib/i18n/useCopy'
import { sunArcCopy } from '@/lib/i18n/marketing/sunArc'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { useEyebrow } from '@/lib/i18n/marketing/eyebrows'

/**
 * v3 Phase 3A — THE SUN ARC (docs/v3/specs/PHASE_3_HEROES.md, reference 8a).
 *
 * Desktop ≥1024: the section pins for 250vh; scroll progress p ∈ [0,1] scrubs
 * the orb along a circular arc from stop 1 (dawn, left) to stop 5 (2 AM,
 * right). The sky is layered gradients whose opacities interpolate with p —
 * dawn #241B10 → noon #2A1D10 (amber glow behind the orb) → golden #2B1810 →
 * night #171310, warm, never navy. Each stop's mini-UI + receipt fades in when
 * p crosses its position − 0.06 and stays. Transform/opacity only; the rAF
 * loop writes styles through refs (no per-frame React render).
 *
 * Reduced motion: no pin — a static stage, orb at noon, all five stops
 * visible, sky at the mid gradient.
 *
 * <1024: no pin — a vertical timeline rail (gold hairline), orb at the top,
 * stops stacked in time order, sky running dawn→night top to bottom.
 */

const STOP_F = [-1, -0.5, 0, 0.5, 1] // fraction of the arc's half-angle
const STOP_POS = [0, 0.25, 0.5, 0.75, 1] // scrub position of each stop
const REVEAL_EARLY = 0.06
const ORB = 84 // px, within the spec's 72–96

/** The sun: tokens' reference orb core (docs/v3/03_TOKENS.md) under the site's
    VoiceOrb ring/shimmer chrome — never a flat disc. Also used by the
    constellation's phone screen (ADDENDUM_2 forensic spec). */
export function ArcOrb({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 32%, #b98c58, #8a5f38 45%, #4a3520 78%, #241a11 100%)',
          boxShadow: '0 0 80px 10px rgba(176,118,64,0.22), inset 0 -20px 46px rgba(20,12,6,0.55)',
        }}
      />
      <div className="absolute inset-0">
        <VoiceOrb size={size} showMic={false} state="idle" />
      </div>
    </div>
  )
}

type Geom = {
  W: number
  H: number
  cx: number
  cy: number
  R: number
  thetaMax: number
}

function computeGeom(W: number, H: number): Geom {
  const halfChord = 0.43 * W // arc spans ~86% of the stage width
  const y0 = 0.34 * H // arc apex
  const y1 = 0.59 * H // horizon endpoints, toward the section's lower third
  const sag = y1 - y0
  const R = (halfChord * halfChord + sag * sag) / (2 * sag)
  return { W, H, cx: W / 2, cy: y0 + R, R, thetaMax: Math.asin(halfChord / R) }
}

function pointAt(g: Geom, f: number) {
  const th = f * g.thetaMax
  return { x: g.cx + g.R * Math.sin(th), y: g.cy - g.R * Math.cos(th) }
}

/* ------------------------------------------------------------- mini-UIs */

const cardBase: CSSProperties = {
  background: 'var(--surface-2)',
  border: '1px solid var(--hairline)',
  borderRadius: 18,
  overflow: 'hidden',
  width: 236,
  textAlign: 'left',
}

const solidBtn: CSSProperties = {
  background: 'var(--accent)',
  color: 'var(--bg)',
  borderRadius: 999,
  fontSize: 11.5,
  fontWeight: 600,
  padding: '6px 13px',
  display: 'inline-block',
}

const ghostBtn: CSSProperties = {
  border: '1px solid var(--hairline)',
  color: 'var(--text-dim)',
  borderRadius: 999,
  fontSize: 11.5,
  fontWeight: 500,
  padding: '6px 13px',
  display: 'inline-block',
}

function StopUi({ i }: { i: number }) {
  const c = useCopy(sunArcCopy)
  const screens = useCopy(deviceScreens)
  const s = c.stops[i]
  const mono: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }

  if (s.web)
    return (
      <div style={cardBase} className="font-sans">
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid var(--hairline)' }}>
          {[0, 1, 2].map((d) => (
            <span key={d} style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--border)' }} />
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={s.web.room} src="/assets/ui/suite-1.webp" loading="lazy" decoding="async" style={{ height: 56, width: '100%', objectFit: 'cover' }} />
        <div className="px-4 py-3">
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{s.web.room}</div>
          <div style={{ ...mono, fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{s.web.price}</div>
          <span style={{ ...solidBtn, marginTop: 10 }}>{s.web.cta}</span>
        </div>
      </div>
    )

  if (i === 1) {
    const b = screens.screens.beach
    return (
      <div style={{ ...cardBase, borderRadius: 20 }} className="font-sans">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={b.title} src={b.image} loading="lazy" decoding="async" style={{ height: 84, width: '100%', objectFit: 'cover' }} />
        <div className="px-4 py-3">
          <div className="font-serif" style={{ fontSize: 16, fontWeight: 530, color: 'var(--text)' }}>{b.title}</div>
          <div style={{ fontSize: 11.5, color: 'var(--champagne)', marginTop: 2 }}>{b.meta}</div>
          <div className="flex gap-2" style={{ marginTop: 10 }}>
            <span style={ghostBtn}>{b.actions[0]}</span>
            <span style={solidBtn}>{b.actions[1]}</span>
          </div>
        </div>
      </div>
    )
  }

  if (s.watch)
    return (
      <div
        className="font-sans"
        style={{
          width: 148,
          borderRadius: 34,
          background: 'var(--device-frame)',
          border: '3px solid var(--surface-4)',
          padding: '18px 14px',
          textAlign: 'center',
        }}
      >
        <div className="font-serif" style={{ fontSize: 26, fontWeight: 530, color: 'var(--text)' }}>{s.watch.big}</div>
        <div style={{ ...mono, fontSize: 8.5, letterSpacing: '0.14em', color: 'var(--champagne)', marginTop: 6 }}>
          {s.watch.line}
        </div>
        <span style={{ ...solidBtn, marginTop: 12, fontSize: 10.5 }}>{s.watch.cta}</span>
      </div>
    )

  if (s.voice)
    return (
      <div style={{ ...cardBase, background: 'var(--surface-1)', padding: '14px 14px' }} className="font-sans">
        <div
          style={{
            background: 'var(--surface-3)',
            borderRadius: '14px 14px 14px 4px',
            padding: '8px 12px',
            fontSize: 12.5,
            color: 'var(--text)',
            maxWidth: '92%',
          }}
        >
          {s.voice.guest}
        </div>
        <div
          style={{
            background: 'var(--accent-soft)',
            borderRadius: '14px 14px 4px 14px',
            padding: '8px 12px',
            fontSize: 12.5,
            color: 'var(--text)',
            maxWidth: '92%',
            marginTop: 8,
            marginLeft: 'auto',
          }}
        >
          {s.voice.reply}
        </div>
      </div>
    )

  if (s.phone)
    return (
      <div
        className="font-sans"
        style={{
          width: 176,
          borderRadius: 26,
          background: 'var(--device-frame)',
          border: '3px solid var(--surface-4)',
          padding: '12px 14px',
        }}
      >
        <div style={{ ...mono, fontSize: 8.5, letterSpacing: '0.18em', color: 'var(--eyebrow-warm)' }}>{s.phone.header}</div>
        <p className="font-serif" style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--text)', marginTop: 8 }}>
          {s.phone.body}
        </p>
        <div className="flex flex-col gap-2" style={{ marginTop: 12 }}>
          <span style={{ ...solidBtn, textAlign: 'center' }}>{s.phone.cta1}</span>
          <span style={{ ...ghostBtn, textAlign: 'center' }}>{s.phone.cta2}</span>
        </div>
      </div>
    )

  return null
}

function StopBlock({ i, center = false }: { i: number; center?: boolean }) {
  const c = useCopy(sunArcCopy)
  const s = c.stops[i]
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : ''}`} style={{ gap: 10 }}>
      <div>
        <div className="font-serif" style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 530, color: 'var(--champagne)', lineHeight: 1 }}>
          {s.time}
        </div>
        <div className="eyebrow" style={{ marginTop: 6 }}>{s.tag}</div>
      </div>
      {/* data-device-ui: OQ-6 — mini-UI + its receipt are device text */}
      <div data-device-ui="" className={`flex flex-col ${center ? 'items-center' : ''}`} style={{ gap: 10 }}>
        <div className={center ? 'flex justify-center' : ''}>
          <StopUi i={i} />
        </div>
        {s.receipt && <ReceiptCard size="sm" lines={s.receipt} className={center ? 'self-center' : 'self-start'} />}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- the arc */

export function SunArc({
  eyebrow,
  title,
  thesisPre,
  thesisHi,
}: {
  eyebrow: string
  title: string
  thesisPre: string
  thesisHi: string
}) {
  const c = useCopy(sunArcCopy)
  const translateEyebrow = useEyebrow()
  const [reduce, setReduce] = useState(true) // static until proven otherwise (no-JS safe)
  const [geom, setGeom] = useState<Geom | null>(null)
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false, false])
  const [orbLabel, setOrbLabel] = useState<string | null>(null)

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)
  const duskRef = useRef<HTMLDivElement | null>(null)
  const nightRef = useRef<HTMLDivElement | null>(null)
  const pRef = useRef(0)
  const targetRef = useRef(0)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Measure the pinned stage.
  useEffect(() => {
    const measure = () => {
      if (window.innerWidth < 1024) return setGeom(null)
      setGeom(computeGeom(Math.min(window.innerWidth, 1600), Math.max(window.innerHeight, 840)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Scrub loop — reads scroll, damps p, writes transforms/opacities via refs.
  useEffect(() => {
    if (reduce || !geom) {
      setRevealed([true, true, true, true, true])
      return
    }
    setRevealed([true, false, false, false, false])
    let raf = 0
    const track = () => {
      const wrap = wrapRef.current
      if (wrap) {
        const rect = wrap.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        targetRef.current = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)))
        // damped per-frame smoothing toward the scroll target
        const p = (pRef.current += (targetRef.current - pRef.current) * 0.14)

        const f = -1 + 2 * p
        const pt = pointAt(geom, f)
        if (orbRef.current) orbRef.current.style.transform = `translate3d(${pt.x - ORB / 2}px, ${pt.y - ORB / 2}px, 0)`
        if (glowRef.current) {
          // noon glow peaks mid-scrub and follows the orb horizontally
          const noon = Math.max(0, 1 - Math.abs(p - 0.5) * 3)
          glowRef.current.style.opacity = String(0.85 * noon)
          glowRef.current.style.transform = `translate3d(${pt.x - geom.W / 2}px, 0, 0)`
        }
        if (duskRef.current) duskRef.current.style.opacity = String(Math.max(0, Math.min(1, (p - 0.45) * 2.2)))
        if (nightRef.current) nightRef.current.style.opacity = String(Math.max(0, Math.min(1, (p - 0.7) * 3)))

        // reveal stops as p crosses (position − 0.06); label swaps to the last stop reached
        let last = 0
        setRevealed((prev) => {
          let changed = false
          const next = prev.map((v, i) => {
            const on = v || p >= STOP_POS[i] - REVEAL_EARLY
            if (on !== v) changed = true
            return on
          })
          return changed ? next : prev
        })
        for (let i = 0; i < STOP_POS.length; i++) if (p >= STOP_POS[i] - REVEAL_EARLY) last = i
        const label = `${c.stops[last].time} · ${c.stops[last].tag.split(' · ')[0]}`
        setOrbLabel((prevLabel) => (prevLabel === label ? prevLabel : label))
        // Near a stop the stop's own serif time takes over — fade the
        // traveling label so the two never overlap. Opacity only.
        if (labelRef.current) {
          const nearest = Math.min(
            ...STOP_F.map((sf) => Math.abs(pt.x - Math.min(Math.max(pointAt(geom, sf).x, 150), geom.W - 150)))
          )
          labelRef.current.style.opacity = nearest < 120 ? '0' : '1'
        }
      }
      raf = requestAnimationFrame(track)
    }
    raf = requestAnimationFrame(track)
    return () => cancelAnimationFrame(raf)
  }, [reduce, geom, c])

  const header = (
    <div className="container-rc" style={{ paddingTop: 56, position: 'relative', zIndex: 3 }}>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="eyebrow eyebrow-accent mb-5">{translateEyebrow(eyebrow)}</div>
          <h2 className="heading-section" style={{ color: 'var(--text)', maxWidth: '16ch' }}>
            {title}
          </h2>
        </div>
        <p
          className="font-sans"
          style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '30ch', textAlign: 'right', marginTop: 34 }}
        >
          {c.caption}
        </p>
      </div>
      {/* A1 thesis — final sentence in champagne */}
      <p className="font-sans mt-5" style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '52ch' }}>
        {thesisPre}
        <span style={{ color: 'var(--champagne)' }}>{thesisHi}</span>
      </p>
    </div>
  )

  /* ---------- sky layers (base runs dawn→night left→right; overlays scrub) */
  const sky = (vertical = false): ReactNode => (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: vertical
            ? 'linear-gradient(180deg, #241b10 0%, #2a1d10 34%, #2b1810 66%, #171310 100%)'
            : 'linear-gradient(90deg, #241b10 0%, #2a1d10 34%, #2b1810 66%, #171310 100%)',
        }}
      />
      {!vertical && (
        <>
          <div
            ref={glowRef}
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(46% 40% at 50% 38%, rgba(232,166,106,0.16), rgba(232,166,106,0.05) 55%, transparent 75%)',
              opacity: reduce ? 0.6 : 0,
              willChange: 'transform, opacity',
            }}
          />
          <div
            ref={duskRef}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #2b1810 70%)', opacity: reduce ? 0.45 : 0 }}
          />
          <div
            ref={nightRef}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: '#171310', opacity: 0 }}
          />
        </>
      )}
    </>
  )

  /* ------------------------------------------------- desktop pinned stage */
  const desktop = geom && (
    <div ref={wrapRef} style={{ height: reduce ? 'auto' : '250vh' }}>
      <div
        className="overflow-hidden"
        style={{
          position: reduce ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          minHeight: 840,
        }}
      >
        {sky()}
        {header}

        {/* the arc */}
        <svg
          aria-hidden="true"
          className="absolute inset-0"
          width={geom.W}
          height={geom.H}
          style={{ left: '50%', transform: 'translateX(-50%)', maxWidth: 'none' }}
        >
          <path
            d={`M ${pointAt(geom, -1).x} ${pointAt(geom, -1).y} A ${geom.R} ${geom.R} 0 0 1 ${pointAt(geom, 1).x} ${pointAt(geom, 1).y}`}
            fill="none"
            stroke="rgba(197,124,66,0.18)"
            strokeWidth="1"
          />
        </svg>

        {/* the orb, ON the arc */}
        <div
          ref={orbRef}
          className="absolute"
          style={{
            left: `calc(50% - ${geom.W / 2}px)`,
            top: 0,
            width: ORB,
            willChange: 'transform',
            zIndex: 2,
            transform: (() => {
              const pt = pointAt(geom, reduce ? 0 : -1)
              return `translate3d(${pt.x - ORB / 2}px, ${pt.y - ORB / 2}px, 0)`
            })(),
          }}
        >
          <ArcOrb size={ORB} />
          <div
            ref={labelRef}
            className="eyebrow"
            style={{
              width: 240,
              marginLeft: (ORB - 240) / 2,
              textAlign: 'center',
              marginTop: 10,
              whiteSpace: 'nowrap',
              transition: 'opacity 200ms var(--ease-standard)',
            }}
          >
            {reduce || !orbLabel ? c.orbLabel : orbLabel}
          </div>
        </div>

        {/* the five stops */}
        {STOP_F.map((f, i) => {
          const pt = pointAt(geom, f)
          const outer = i === 0 || i === STOP_F.length - 1
          const colW = outer ? 330 : 260 // outer receipts stay on one line
          const x = Math.min(Math.max(pt.x, colW / 2 + 12), geom.W - colW / 2 - 12)
          // Clear the traveling orb + its label at every stop position.
          const topOffset = i === 2 ? 122 : 44
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: `calc(50% - ${geom.W / 2}px + ${x}px)`,
                top: pt.y + topOffset,
                transform: 'translateX(-50%)',
                width: colW,
                gap: 10,
                zIndex: 1,
                opacity: revealed[i] ? 1 : 0,
                translate: revealed[i] ? '0 0' : '0 8px',
                transition: 'opacity 300ms var(--ease-standard), translate 300ms var(--ease-standard)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: 250, marginInline: 'auto' }}>
                <div className="font-serif" style={{ fontSize: 'clamp(28px, 2.6vw, 40px)', fontWeight: 530, color: 'var(--champagne)', lineHeight: 1 }}>
                  {c.stops[i].time}
                </div>
                <div className="eyebrow" style={{ marginTop: 6 }}>{c.stops[i].tag}</div>
              </div>
              {/* data-device-ui: OQ-6 — mini-UI + its receipt are device text */}
              <div data-device-ui="" className="flex flex-col items-center" style={{ gap: 10 }}>
                <StopUi i={i} />
                {c.stops[i].receipt && <ReceiptCard size="sm" lines={c.stops[i].receipt!} />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  /* ---------------------------------------------------- mobile: the rail */
  const mobile = (
    <div className="relative lg:hidden" style={{ overflow: 'hidden' }}>
      {sky(true)}
      <div className="relative">
        {header}
        <div className="container-rc" style={{ paddingBottom: 48 }}>
          <div
            className="relative mt-10"
            style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 26, display: 'flex', flexDirection: 'column', gap: 40 }}
          >
            <div style={{ marginLeft: -26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, transform: 'translateX(-28px)' }}>
                <ArcOrb size={56} />
                <span className="eyebrow">{c.orbLabel}</span>
              </div>
            </div>
            {c.stops.map((_, i) => (
              <StopBlock key={i} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden lg:block" style={{ background: '#171310' }}>
        {geom ? desktop : null}
      </div>
      {mobile}
    </>
  )
}
