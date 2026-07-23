'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { deviceScreens, type ScreenId } from '@/lib/i18n/marketing/deviceScreens'
import { VoiceOrb, type OrbState } from './VoiceOrb'

/**
 * The in-room tablet as an image-rich hospitality display OS
 * (Visual Interface Level-Up §A) — the headline change of this tier.
 *
 * Restaurant Companion's device is a voice/text agent. Hotel Companion's guest is
 * *in the room* and should SEE: the suite, the dish, the beach, the spa. So every
 * answer here resolves into a picture card rather than a sentence.
 *
 * Three states, as always:
 *  - motion: screens cross-fade + scale (~420ms --ease-emphasis); hero auto-cycles
 *  - prefers-reduced-motion: no cycling, no cross-fade — screens swap instantly and
 *    `filmstrip` renders the states side by side instead
 *  - no-JS: the first screen is server-rendered complete, images included
 */

const FRAME = {
  background: 'var(--device-frame)',
  borderRadius: 'var(--device-radius)',
  padding: 'var(--bezel)',
  border: '1px solid rgba(251,248,242,0.08)',
  boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(200,106,58,0.05)',
} as const

/* aspect-ratio lives in CSS (.tos-screen) so phones can go portrait — a 4/3
   frame at 390px is ~290px tall and the absolute internals collide. */
const SCREEN = {
  borderRadius: 'calc(var(--device-radius) - var(--bezel))',
  background: 'linear-gradient(168deg, #191410 0%, #12100e 58%, #0f0d0c 100%)',
} as const

/** Photo inside the UI: rounded, faint inner border, slow Ken-Burns. */
function UiImage({
  src,
  alt,
  height,
  kenBurns = true,
}: {
  src: string
  alt: string
  height: number | string
  kenBurns?: boolean
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height, borderRadius: 12, border: '1px solid rgba(251,248,242,0.1)' }}
    >
      <div
        role="img"
        aria-label={alt}
        className={kenBurns ? 'tablet-kenburns' : ''}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,13,12,0.55) 0%, transparent 55%)',
        }}
      />
    </div>
  )
}

function AskChip({ text }: { text: string }) {
  return (
    <p
      className="rounded-full px-3.5 py-2 ml-auto"
      style={{
        background: 'rgba(251,248,242,0.07)',
        color: 'var(--text)',
        fontSize: 12,
        width: 'fit-content',
        maxWidth: '85%',
      }}
    >
      {text}
    </p>
  )
}

function ActionRow({ labels }: { labels: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((l, i) => (
        <span
          key={l}
          className="rounded-full px-3 py-1.5"
          style={{
            fontSize: 11,
            border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--border)',
            background: i === 0 ? 'var(--accent)' : 'transparent',
            color: i === 0 ? '#1a1207' : 'var(--text-dim)',
            fontWeight: i === 0 ? 600 : 400,
          }}
        >
          {l}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------ the screens */

/**
 * A full-bleed canvas: the image fills the whole area (object-cover, slow pan)
 * and is darkened only at the top and bottom, where text actually sits. The
 * previous layout inset the photo as a rounded card, which read as a thin
 * image band rather than an immersive answer.
 */
function Canvas({ image, alt, children }: { image: string; alt: string; children?: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        role="img"
        aria-label={alt}
        className="tablet-kenburns absolute inset-0"
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,10,9,0.62) 0%, rgba(12,10,9,0.06) 26%, rgba(12,10,9,0.08) 58%, rgba(12,10,9,0.82) 100%)',
        }}
      />
      {children}
    </div>
  )
}

function ScreenBody({ id }: { id: ScreenId }) {
  const d = useCopy(deviceScreens)
  const s = d.screens

  if (id === 'home') {
    return (
      <Canvas image="/assets/lux/hero-ocean-pool.webp" alt={d.property}>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="font-serif" style={{ fontSize: 17, fontWeight: 530, color: 'var(--text)' }}>
            {d.greeting}
          </div>
        </div>
      </Canvas>
    )
  }

  if (id === 'beach') {
    return (
      <Canvas image={s.beach.image} alt={s.beach.title}>
        <div className="absolute inset-x-0 top-0 p-3">
          <AskChip text={s.beach.ask} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="font-serif" style={{ fontSize: 17, fontWeight: 530, color: 'var(--text)' }}>
              {s.beach.title}
            </div>
            <div className="font-sans" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {s.beach.meta}
            </div>
          </div>
          <ActionRow labels={s.beach.actions} />
        </div>
      </Canvas>
    )
  }

  if (id === 'roomservice') {
    return (
      <div className="flex h-full flex-col p-4">
        <AskChip text={s.roomservice.ask} />
        <div className="mt-3 grid grid-cols-3 gap-2 flex-1">
          {s.roomservice.items.map((it) => (
            <div key={it.name} className="flex flex-col">
              <UiImage src={it.image} alt={it.name} height="66%" kenBurns={false} />
              <div className="mt-1.5 font-sans" style={{ fontSize: 10, color: 'var(--text)', lineHeight: 1.25 }}>
                {it.name}
              </div>
              <div className="font-sans" style={{ fontSize: 10, color: 'var(--accent)' }}>
                {it.price}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="eyebrow" style={{ fontSize: 9 }}>
            {s.roomservice.total} · $62
          </span>
          <ActionRow labels={[s.roomservice.send]} />
        </div>
      </div>
    )
  }

  if (id === 'upgrade') {
    // Full-bleed hero — the revenue moment, one big beautiful suite (mirrors the
    // CompanionTablet hero). The previous inset-card layout with a twin-bed photo
    // read as a budget listing, not an ocean-view upsell.
    return (
      <Canvas image={s.upgrade.images[0]} alt={s.upgrade.title}>
        <div className="absolute inset-x-0 top-0 p-3">
          <AskChip text={s.upgrade.ask} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            {s.upgrade.badge && (
              <span
                className="eyebrow inline-block"
                style={{
                  fontSize: 9,
                  letterSpacing: '.12em',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent-hairline)',
                  background: 'rgba(11,9,8,0.5)',
                  borderRadius: 999,
                  padding: '3px 8px',
                  marginBottom: 7,
                }}
              >
                {s.upgrade.badge}
              </span>
            )}
            <div className="font-serif" style={{ fontSize: 17, fontWeight: 530, color: 'var(--text)' }}>
              {s.upgrade.title}
            </div>
            <div className="font-sans" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {s.upgrade.meta}
            </div>
          </div>
          <ActionRow labels={[s.upgrade.confirm]} />
        </div>
      </Canvas>
    )
  }

  if (id === 'spa') {
    return (
      <div className="flex h-full flex-col p-4">
        <AskChip text={s.spa.ask} />
        <div className="mt-3 flex flex-col gap-2 flex-1">
          {s.spa.items.map((it) => (
            <div key={it.name} className="flex items-center gap-3">
              <div style={{ width: 74, flexShrink: 0 }}>
                <UiImage src={it.image} alt={it.name} height={46} kenBurns={false} />
              </div>
              <div className="flex-1">
                <div className="font-sans" style={{ fontSize: 11, color: 'var(--text)' }}>
                  {it.name}
                </div>
                <div className="font-sans" style={{ fontSize: 10, color: 'var(--text-faint)' }}>
                  {it.price}
                </div>
              </div>
              <span
                className="rounded-full px-2.5 py-1"
                style={{ fontSize: 10, border: '1px solid var(--accent-hairline)', color: 'var(--accent)' }}
              >
                {s.spa.book}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'concierge') {
    return (
      <div className="flex h-full flex-col p-4">
        <AskChip text={s.concierge.ask} />
        <div className="mt-3 grid grid-cols-5 gap-2 flex-1">
          <div className="col-span-3">
            <UiImage src={s.concierge.image} alt={s.concierge.title} height="100%" />
          </div>
          <div
            className="col-span-2 relative overflow-hidden"
            style={{
              borderRadius: 12,
              border: '1px solid rgba(251,248,242,0.1)',
              background:
                'repeating-linear-gradient(45deg, rgba(200,106,58,0.07) 0 8px, transparent 8px 16px), var(--surface-3)',
            }}
          >
            <span
              className="eyebrow absolute"
              style={{ left: 8, bottom: 8, fontSize: 9, color: 'var(--accent)' }}
            >
              {s.concierge.mapLabel}
            </span>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '46%',
                top: '42%',
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'var(--accent)',
                boxShadow: '0 0 0 4px rgba(200,106,58,0.25)',
              }}
            />
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="font-serif" style={{ fontSize: 15, fontWeight: 530, color: 'var(--text)' }}>
              {s.concierge.title}
            </div>
            <div className="font-sans" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {s.concierge.meta}
            </div>
          </div>
          <ActionRow labels={s.concierge.actions} />
        </div>
      </div>
    )
  }

  if (id === 'followup') {
    return (
      <div className="flex h-full flex-col p-4">
        <div className="flex-1">
          <UiImage src={s.followup.image} alt={s.followup.title} height="100%" />
        </div>
        <div className="mt-3">
          <div className="font-serif" style={{ fontSize: 15, fontWeight: 530, color: 'var(--text)' }}>
            {s.followup.title}
          </div>
          <div className="eyebrow mt-1" style={{ fontSize: 9 }}>
            {s.followup.meta}
          </div>
          <p
            className="mt-2.5 rounded-2xl px-3.5 py-2.5"
            style={{
              background: 'var(--accent-soft)',
              border: '1px solid var(--accent-hairline)',
              color: 'var(--text)',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            {s.followup.reply}
          </p>
          <div className="mt-2.5">
            <ActionRow labels={s.followup.actions} />
          </div>
        </div>
      </div>
    )
  }

  // issue — deliberately sparse: this is an ops moment, not a merchandising one
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <AskChip text={s.issue.ask} />
      <p
        className="mt-3 rounded-2xl px-4 py-3"
        style={{
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-hairline)',
          color: 'var(--text)',
          fontSize: 12,
          lineHeight: 1.55,
        }}
      >
        {s.issue.reply}
      </p>
      <div className="mt-4 flex flex-col gap-1.5">
        {s.issue.stages.map((st) => (
          <div key={st} className="flex items-center gap-2">
            <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)' }} />
            <span className="eyebrow" style={{ fontSize: 9 }}>
              {st}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- the device */

export function TabletOS({
  screen,
  cycle,
  orbState = 'idle',
  className = '',
}: {
  /** Controlled screen (walkthroughs drive this). */
  screen?: ScreenId
  /** Auto-cycle these screens (hero). Ignored under reduced motion. */
  cycle?: ScreenId[]
  /** Drives the in-device mic; it is always rendered, never hidden. */
  orbState?: OrbState
  className?: string
}) {
  const d = useCopy(deviceScreens)
  const [i, setI] = useState(0)
  const [fading, setFading] = useState(false)
  const [reduce, setReduce] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const list = useMemo(() => cycle ?? [], [cycle])

  /* A controlled `screen` used to swap instantly, which read as a flicker next
     to a stepper. It now cross-fades on the same ~420ms curve as the cycle. */
  const [shown, setShown] = useState<ScreenId | undefined>(screen)
  useEffect(() => {
    if (screen === undefined || screen === shown) return
    if (reduce) {
      setShown(screen)
      return
    }
    setFading(true)
    const t = window.setTimeout(() => {
      setShown(screen)
      setFading(false)
    }, 210)
    return () => window.clearTimeout(t)
  }, [screen, shown, reduce])

  useEffect(() => {
    if (!list.length || reduce) return
    const t = window.setInterval(() => {
      setFading(true)
      window.setTimeout(() => {
        setI((n) => (n + 1) % list.length)
        setFading(false)
      }, 210)
    }, 4800)
    return () => window.clearInterval(t)
  }, [list, reduce])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const active: ScreenId = shown ?? screen ?? list[i] ?? 'home'

  return (
    /* data-device-ui: OQ-6 ruling — device-screen text is excluded from the
       reading-copy word measure. */
    <div className={`relative w-full ${className}`} data-device-ui="">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(58% 52% at 60% 42%, rgba(200,106,58,0.2) 0%, rgba(200,106,58,0.06) 44%, transparent 72%)',
          filter: 'blur(14px)',
        }}
      />
      <div className="relative mx-auto w-full" style={{ maxWidth: 560, ...FRAME }}>
        <div className="relative overflow-hidden tos-screen" style={SCREEN}>
          {/* status bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 pt-3.5">
            <span
              className="eyebrow inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ border: '1px solid var(--accent-hairline)', color: 'var(--accent)', fontSize: 9 }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: 'var(--accent)',
                  animation: reduce ? 'none' : 'pc-dot-pulse 2s ease-in-out infinite',
                }}
              />
              {d.property}
            </span>
            <span className="eyebrow inline-flex items-center gap-1.5" style={{ fontSize: 9 }}>
              <span
                aria-hidden="true"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: 'var(--accent)',
                  boxShadow: '0 0 6px rgba(200,106,58,0.8)',
                  animation: reduce ? 'none' : 'pc-dot-pulse 2s ease-in-out infinite',
                }}
              />
              {d.listening}
            </span>
          </div>

          {/* -------------------------------------------- rail + canvas

              A large surface has room to give the orb its own column, so the
              control stops floating over the content and the answer gets the
              whole canvas. Phones and watches keep the centred orb (see
              DeviceWall) — a 120px rail inside a 9:18 screen is not a layout,
              it is a stripe. That difference IS the "adapts to the surface"
              claim, made structurally rather than asserted. */}
          <div className="tos-shell absolute inset-x-0 top-9 bottom-[52px] flex">
            <aside
              className="tos-rail flex flex-col items-center flex-shrink-0 px-2.5 pt-3 pb-3"
              style={{
                width: '22%',
                minWidth: 108,
                maxWidth: 160,
                borderRight: '1px solid var(--border-soft)',
                background: 'rgba(251,248,242,0.025)',
              }}
            >
              <div className="device-orb">
                <VoiceOrb state={orbState} size={72} showMic keepMic micScale={0.3} />
              </div>
              <span
                className="eyebrow mt-2.5 text-center"
                style={{ fontSize: 9, color: 'var(--accent)', lineHeight: 1.35 }}
              >
                {d.orbHint}
              </span>

              <span
                className="tos-property eyebrow mt-3 text-center"
                style={{ fontSize: 9, color: 'var(--text-faint)', lineHeight: 1.3 }}
              >
                {d.property}
              </span>

              <div className="tos-tiles mt-3 w-full flex flex-col gap-1">
                {d.tiles.slice(0, 4).map((t) => {
                  // The tab for the service on screen lights up — the rail reads
                  // as live navigation, not decoration (mirrors CompanionTablet).
                  const on = t.id === active
                  return (
                    <div
                      key={t.id}
                      className="rounded px-1.5 py-1.5 text-center"
                      style={{
                        background: on ? 'rgba(200,106,58,0.16)' : 'rgba(251,248,242,0.05)',
                        border: `1px solid ${on ? 'rgba(200,106,58,0.6)' : 'var(--border-soft)'}`,
                        fontSize: 9,
                        fontWeight: on ? 600 : 400,
                        color: on ? 'var(--text)' : 'var(--text-dim)',
                        lineHeight: 1.2,
                        transition: reduce ? 'none' : 'all .45s var(--ease-standard)',
                      }}
                    >
                      {t.label}
                    </div>
                  )
                })}
              </div>
            </aside>

            {/* the canvas cross-fades; the rail never does */}
            <div
              className="relative flex-1 min-w-0"
              style={{
                opacity: fading ? 0 : 1,
                transform: fading ? 'scale(0.985)' : 'scale(1)',
                transition: reduce
                  ? 'none'
                  : 'opacity var(--dur-slow) var(--ease-emphasis), transform var(--dur-slow) var(--ease-emphasis)',
              }}
            >
              <ScreenBody id={active} />
            </div>
          </div>

          {/* Chat spans the full bottom, under both rail and canvas. */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-3 py-2.5"
            style={{ borderTop: '1px solid var(--border-soft)', background: 'rgba(15,13,12,0.72)' }}
          >
            <div
              className="flex-1 flex items-center rounded-full px-3"
              style={{ height: 28, background: 'rgba(251,248,242,0.06)', border: '1px solid var(--border-soft)' }}
            >
              <span className="font-sans" style={{ fontSize: 10, color: 'var(--text-faint)' }}>
                {d.chat.placeholder}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="grid place-items-center rounded-full flex-shrink-0"
              style={{ width: 28, height: 28, background: 'var(--accent)', color: '#1a1207', fontSize: 13 }}
            >
              ↑
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Reduced-motion / no-JS alternative: the screens as a static filmstrip. */
export function TabletFilmstrip({ screens }: { screens: ScreenId[] }) {
  return (
    <div className="grid grid-cols-2 gap-3" data-device-ui="">
      {screens.map((s) => (
        <div key={s} style={{ ...FRAME, padding: 6 }}>
          <div className="relative overflow-hidden" style={{ ...SCREEN, aspectRatio: '4 / 3' }}>
            <div className="absolute inset-x-0 top-0 bottom-[40px]">
              <ScreenBody id={s} />
            </div>
            {/* the mic stays visible in the static state too */}
            <FilmstripChrome />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Static version of the device chrome, for the filmstrip / no-JS state. */
function FilmstripChrome() {
  const d = useCopy(deviceScreens)
  return (
    <div
      className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-2 py-1.5"
      style={{ borderTop: '1px solid var(--border-soft)', background: 'rgba(15,13,12,0.72)' }}
    >
      <VoiceOrb state="idle" size={24} showMic />
      <div
        className="flex-1 rounded-full"
        style={{ height: 20, background: 'rgba(251,248,242,0.06)', border: '1px solid var(--border-soft)' }}
      />
      <span
        aria-hidden="true"
        className="grid place-items-center rounded-full flex-shrink-0"
        style={{ width: 20, height: 20, background: 'var(--accent)', color: '#1a1207', fontSize: 10 }}
      >
        ↑
      </span>
      <span className="sr-only">{d.chat.placeholder}</span>
    </div>
  )
}
