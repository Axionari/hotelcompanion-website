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

const SCREEN = {
  borderRadius: 'calc(var(--device-radius) - var(--bezel))',
  background: 'linear-gradient(168deg, #191410 0%, #12100e 58%, #0f0d0c 100%)',
  aspectRatio: '4 / 3',
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

function ScreenBody({ id }: { id: ScreenId }) {
  const d = useCopy(deviceScreens)
  const s = d.screens

  if (id === 'home') {
    return (
      <div className="flex h-full flex-col p-4">
        <UiImage src="/assets/img/luxury-lobby.webp" alt={d.property} height="52%" />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-serif" style={{ fontSize: 15, fontWeight: 530, color: 'var(--text)' }}>
            {d.greeting}
          </span>
          <span className="eyebrow flex-shrink-0" style={{ fontSize: 8 }}>
            {d.orbHint}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {d.tiles.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-center rounded-lg px-1 py-2.5 text-center"
              style={{
                background: 'rgba(251,248,242,0.05)',
                border: '1px solid var(--border-soft)',
                fontSize: 9,
                color: 'var(--text-dim)',
                lineHeight: 1.2,
              }}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'beach') {
    return (
      <div className="flex h-full flex-col p-4">
        <AskChip text={s.beach.ask} />
        <div className="mt-3 flex-1">
          <UiImage src={s.beach.image} alt={s.beach.title} height="100%" />
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="font-serif" style={{ fontSize: 16, fontWeight: 530, color: 'var(--text)' }}>
              {s.beach.title}
            </div>
            <div className="font-sans" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {s.beach.meta}
            </div>
          </div>
          <ActionRow labels={s.beach.actions} />
        </div>
      </div>
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
          <span className="eyebrow" style={{ fontSize: 8 }}>
            {s.roomservice.total} · $62
          </span>
          <ActionRow labels={[s.roomservice.send]} />
        </div>
      </div>
    )
  }

  if (id === 'upgrade') {
    return (
      <div className="flex h-full flex-col p-4">
        <AskChip text={s.upgrade.ask} />
        <div className="mt-3 flex-1">
          <UiImage src={s.upgrade.images[0]} alt={s.upgrade.title} height="100%" />
        </div>
        <div className="mt-2 flex gap-1.5">
          {s.upgrade.images.slice(1).map((img) => (
            <UiImage key={img} src={img} alt={s.upgrade.title} height={34} kenBurns={false} />
          ))}
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="font-serif" style={{ fontSize: 16, fontWeight: 530, color: 'var(--text)' }}>
              {s.upgrade.title}
            </div>
            <div className="font-sans" style={{ fontSize: 11, color: 'var(--accent)' }}>
              {s.upgrade.meta}
            </div>
          </div>
          <ActionRow labels={[s.upgrade.confirm]} />
        </div>
      </div>
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
              style={{ left: 8, bottom: 8, fontSize: 8, color: 'var(--accent)' }}
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
          <div className="eyebrow mt-1" style={{ fontSize: 8 }}>
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
            <span className="eyebrow" style={{ fontSize: 8 }}>
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

  const active: ScreenId = screen ?? list[i] ?? 'home'

  return (
    <div className={`relative w-full ${className}`}>
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
        <div className="relative overflow-hidden" style={SCREEN}>
          {/* status bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 pt-3.5">
            <span
              className="eyebrow inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ border: '1px solid var(--accent-hairline)', color: 'var(--accent)', fontSize: 8 }}
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
            <span className="eyebrow" style={{ fontSize: 8 }}>
              {d.listening}
            </span>
          </div>

          {/* the screen content cross-fades; the chrome below never does */}
          <div
            className="absolute inset-x-0 top-9 bottom-[58px]"
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

          {/* Persistent chrome — the mic is always visible, chat always available.
              Voice-only is reserved for the phone-call surface (see SurfaceFan). */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-3 py-2.5"
            style={{ borderTop: '1px solid var(--border-soft)', background: 'rgba(15,13,12,0.72)' }}
          >
            <VoiceOrb state={orbState} size={34} showMic />
            <div
              className="flex-1 flex items-center rounded-full px-3"
              style={{ height: 30, background: 'rgba(251,248,242,0.06)', border: '1px solid var(--border-soft)' }}
            >
              <span className="font-sans" style={{ fontSize: 10, color: 'var(--text-faint)' }}>
                {d.chat.placeholder}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="grid place-items-center rounded-full flex-shrink-0"
              style={{ width: 30, height: 30, background: 'var(--accent)', color: '#1a1207', fontSize: 13 }}
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
    <div className="grid grid-cols-2 gap-3">
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
