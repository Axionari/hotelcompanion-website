'use client'

import { useCopy } from '@/lib/i18n/useCopy'
import { surfaceWall } from '@/lib/i18n/marketing/surfaceWall'
import { VoiceOrb } from './VoiceOrb'

/**
 * One conversation, eight surfaces — each showing what it is actually good at.
 *
 * The first pass repeated the same beach card eight times, which argued the
 * opposite of the section's point. Now the laptop books direct, the phone sells
 * the upgrade before arrival, the watch glances, the tablet takes the dinner
 * order, the TV greets by name, the kiosk gives directions, the glasses overlay
 * a card on the world, and the voice call has no screen at all.
 *
 * Composition is a 12-column grid, baseline-aligned, scaled TV -> watch, with a
 * copper thread along the caption line and one spark handing off across it —
 * a single moving object rather than eight static repetitions.
 *
 * The orb adapts rather than repeating at one size: prominent where the guest
 * is meant to speak (tablet/phone/kiosk/TV), a dot on the watch, and on the
 * voice call the waveform IS the orb.
 *
 * Three states: motion (Ken-Burns, spark handoff) / reduced-motion (no spark,
 * no pan) / no-JS (all of it is server-rendered markup).
 */

function Cell({
  span,
  label,
  children,
  align = 'stretch',
}: {
  span: string
  label: string
  children: React.ReactNode
  align?: 'stretch' | 'center'
}) {
  return (
    <figure className={`${span} flex flex-col ${align === 'center' ? 'items-center' : ''}`}>
      {children}
      <figcaption className="eyebrow mt-3" style={{ fontSize: 7.5 }}>
        {label}
      </figcaption>
    </figure>
  )
}

function Photo({ src, alt, h, radius = 6 }: { src: string; alt: string; h: number | string; radius?: number }) {
  return (
    <div className="relative overflow-hidden" style={{ height: h, borderRadius: radius }}>
      <div
        className="tablet-kenburns absolute inset-0"
        role="img"
        aria-label={alt}
        style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </div>
  )
}

function Orb({ size }: { size: number }) {
  return (
    <div className="device-orb">
      <VoiceOrb size={size} showMic keepMic micScale={0.32} />
    </div>
  )
}

const T = (size: number) => ({ fontSize: size, fontWeight: 530, color: 'var(--text)' })
const M = (size: number) => ({ fontSize: size, color: 'var(--text-faint)' })

export function DeviceWall({ intent }: { intent: string }) {
  const c = useCopy(surfaceWall)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <p
          className="rounded-full px-4 py-2"
          style={{ background: 'rgba(251,248,242,0.07)', color: 'var(--text)', fontSize: 13, width: 'fit-content' }}
        >
          {intent}
        </p>
        <span className="eyebrow" style={{ fontSize: 8 }}>
          {c.thread}
        </span>
      </div>

      {/* ============================== row 1 — the shared, larger surfaces */}
      <div className="dw-row">
        <span className="dw-thread" aria-hidden="true" />
        <span className="dw-spark" aria-hidden="true" />

        {/* ------------------------------------------------------------ TV */}
        <Cell span="col-span-12 md:col-span-5" label={c.tv.label}>
          <div className="dw-frame" style={{ borderRadius: 7, padding: 6 }}>
            <div className="dw-screen" style={{ borderRadius: 3, aspectRatio: '16 / 9' }}>
              <Photo src="/assets/img/luxury-lobby.webp" alt={c.tv.greeting} h="100%" radius={3} />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,8,7,0.9) 0%, rgba(10,8,7,0.45) 38%, transparent 68%)' }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-3.5">
                <div className="self-start">
                  <Orb size={40} />
                </div>
                <div>
                  <div className="font-serif" style={T(19)}>
                    {c.tv.greeting}
                  </div>
                  <div className="font-sans mt-0.5" style={{ fontSize: 11, color: 'var(--accent)' }}>
                    {c.tv.room}
                  </div>
                  <div className="font-sans" style={M(9.5)}>
                    {c.tv.meta}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="dw-tv-neck mx-auto block" style={{ width: 46, height: 9 }} />
          <span className="dw-tv-foot mx-auto block" style={{ width: 132, height: 5 }} />
        </Cell>

        {/* -------------------------------------------------------- laptop */}
        <Cell span="col-span-12 md:col-span-5" label={c.laptop.label}>
          <div className="dw-frame" style={{ borderRadius: 9, padding: 6, paddingBottom: 7 }}>
            <div className="dw-screen flex flex-col" style={{ borderRadius: 4, aspectRatio: '16 / 10' }}>
              {/* browser chrome — this is the open web, not an app */}
              <div
                className="flex items-center gap-1.5 px-2 flex-shrink-0"
                style={{ height: 15, background: 'rgba(255,255,255,0.06)' }}
              >
                <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.22)' }} />
                <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.22)' }} />
                <span
                  className="flex-1 rounded-full px-1.5 font-sans truncate"
                  style={{ background: 'rgba(255,255,255,0.07)', fontSize: 6, color: 'var(--text-faint)', lineHeight: '9px' }}
                >
                  {c.laptop.tab}
                </span>
              </div>

              <div className="flex-1 flex gap-2.5 p-2.5 min-h-0">
                <div className="flex flex-col justify-between flex-shrink-0" style={{ width: 96 }}>
                  <div>
                    <div className="font-serif" style={T(12)}>
                      {c.laptop.headline}
                    </div>
                    <span
                      className="inline-block rounded-full px-1.5 mt-1"
                      style={{ background: 'var(--accent)', color: '#1a1207', fontSize: 6.5, fontWeight: 700, lineHeight: '12px' }}
                    >
                      {c.laptop.badge}
                    </span>
                    <p className="font-sans mt-1.5" style={{ fontSize: 6.5, lineHeight: 1.45, color: 'var(--text-dim)' }}>
                      {c.laptop.compare}
                    </p>
                  </div>
                  <Orb size={30} />
                </div>

                {/* the booking result */}
                <div className="flex-1 rounded min-w-0" style={{ border: '1px solid var(--accent-hairline)', padding: 4 }}>
                  <Photo src="/assets/ui/suite-1.webp" alt={c.laptop.room} h={54} radius={4} />
                  <div className="flex items-end justify-between mt-1.5 gap-1">
                    <div className="min-w-0">
                      <div className="font-serif truncate" style={T(9)}>
                        {c.laptop.room}
                      </div>
                      <div className="font-sans" style={M(7)}>
                        {c.laptop.price}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-2 flex-shrink-0"
                      style={{ background: 'var(--accent)', color: '#1a1207', fontSize: 7, fontWeight: 600, lineHeight: '15px' }}
                    >
                      {c.laptop.cta}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* base wedge, wider than the lid — the silhouette that says laptop */}
          <div className="dw-laptop-base mx-auto" style={{ width: '112%', height: 9 }} />
        </Cell>

        {/* --------------------------------------------------------- kiosk */}
        <Cell span="col-span-12 md:col-span-2" label={c.kiosk.label} align="center">
          <div className="dw-frame" style={{ borderRadius: 12, padding: 5, width: '100%', maxWidth: 132 }}>
            <div className="dw-screen flex flex-col" style={{ borderRadius: 8, aspectRatio: '9 / 17' }}>
              <div className="flex justify-center pt-3 pb-1.5">
                <Orb size={38} />
              </div>
              <div className="px-2 flex-1 flex flex-col">
                <div className="font-serif" style={T(8.5)}>
                  {c.kiosk.title}
                </div>
                {/* a wayfinding map, not a photo */}
                <div
                  className="relative flex-1 mt-1.5 rounded overflow-hidden"
                  style={{ background: 'rgba(251,248,242,0.045)', border: '1px solid var(--border-soft)' }}
                >
                  <svg viewBox="0 0 60 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <path
                      d="M10 88 L10 56 L32 56 L32 26 L50 26"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy="88" r="3.5" fill="rgba(251,248,242,0.5)" />
                    <circle cx="32" cy="56" r="3" fill="rgba(251,248,242,0.32)" />
                    <circle cx="50" cy="26" r="4.5" fill="var(--accent)" />
                  </svg>
                </div>
                <div className="mt-1.5 mb-2">
                  <div className="font-serif" style={T(8)}>
                    {c.kiosk.dest}
                  </div>
                  <div className="font-sans" style={M(6.5)}>
                    {c.kiosk.meta}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="dw-kiosk-foot block mx-auto" style={{ width: 62, height: 7 }} />
        </Cell>
      </div>

      {/* ============================ row 2 — the personal, smaller surfaces */}
      <div className="dw-row mt-16">
        <span className="dw-thread" aria-hidden="true" />
        <span className="dw-spark" aria-hidden="true" />

        {/* -------------------------------------------------------- tablet */}
        <Cell span="col-span-12 md:col-span-4" label={c.tablet.label}>
          <div className="dw-frame" style={{ borderRadius: 15, padding: 7 }}>
            <div className="dw-screen flex flex-col pb-2.5" style={{ borderRadius: 9, aspectRatio: '4 / 3' }}>
              <div className="flex justify-center pt-2 pb-1">
                <Orb size={34} />
              </div>
              <div className="px-3 flex-1 min-h-0 overflow-hidden">
                <div className="font-serif" style={T(10)}>
                  {c.tablet.title}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {c.tablet.items.map((it) => (
                    <div key={it.name} className="flex items-center gap-2">
                      <div
                        role="img"
                        aria-label={it.name}
                        className="flex-shrink-0"
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 4,
                          backgroundImage: `url(${it.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <span className="font-sans flex-1 min-w-0 truncate" style={{ fontSize: 8, color: 'var(--text)' }}>
                        {it.name}
                      </span>
                      <span className="font-sans flex-shrink-0" style={M(7.5)}>
                        {it.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Cell>

        {/* --------------------------------- glasses + watch, stacked to fill */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
        {/* ------------------------------------------------------- glasses */}
        <Cell span="" label={c.glasses.label} align="center">
          <div className="flex items-center w-full" style={{ gap: 5 }}>
            <span aria-hidden="true" style={{ width: 12, height: 3, background: '#1a1a1d', borderRadius: 2, flexShrink: 0 }} />
            {[0, 1].map((lens) => (
              <div key={lens} className="dw-frame flex-1" style={{ borderRadius: 13, padding: 4 }}>
                <div className="dw-screen" style={{ borderRadius: 10, aspectRatio: '4 / 3' }}>
                  <Photo src="/assets/img/lobby-modern.webp" alt={c.glasses.card} h="100%" radius={10} />
                  {/* the overlaid card — the entire point of AR */}
                  <div
                    className="absolute left-1.5 right-1.5 bottom-1.5 rounded px-1.5 py-1"
                    style={{
                      background: 'rgba(14,12,11,0.82)',
                      border: '1px solid var(--accent-hairline)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <div className="font-serif" style={{ ...T(6.5), lineHeight: 1.2 }}>
                      {c.glasses.card}
                    </div>
                    <div className="font-sans" style={{ fontSize: 5.5, color: 'var(--accent)' }}>
                      {c.glasses.meta}
                    </div>
                  </div>
                  {lens === 1 && (
                    <div className="absolute right-1 top-1">
                      <Orb size={14} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <span aria-hidden="true" style={{ width: 12, height: 3, background: '#1a1a1d', borderRadius: 2, flexShrink: 0 }} />
          </div>
        </Cell>
        {/* --------------------------------------------------------- watch */}
        <Cell span="" label={c.watch.label} align="center">
          <span className="dw-watch-lug block mx-auto" style={{ width: 22, height: 10, borderRadius: '5px 5px 0 0' }} />
          <div className="dw-frame" style={{ borderRadius: 19, padding: 3.5, width: '100%', maxWidth: 76 }}>
            <div
              className="dw-screen flex flex-col items-center justify-center"
              style={{ borderRadius: 16, aspectRatio: '1 / 1.16' }}
            >
              {/* a dot, not an orb: nobody holds a conversation with a watch face */}
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px 2px rgba(245,163,74,0.55)',
                }}
              />
              <div className="font-serif mt-1" style={{ ...T(12), lineHeight: 1 }}>
                {c.watch.time}
              </div>
              {/* Two lines only: a watch face has room for a value and a label. */}
              <div className="font-sans px-1 text-center truncate w-full mt-0.5" style={{ fontSize: 6, color: 'var(--accent)' }}>
                {c.watch.glance}
              </div>
            </div>
          </div>
          <span className="dw-watch-lug block mx-auto" style={{ width: 22, height: 10, borderRadius: '0 0 5px 5px' }} />
        </Cell>
        </div>

        {/* --------------------------------------------------------- phone */}
        <Cell span="col-span-6 md:col-span-2" label={c.phone.label} align="center">
          <div className="dw-frame" style={{ borderRadius: 22, padding: 4, width: '100%', maxWidth: 118 }}>
            <div className="dw-screen flex flex-col" style={{ borderRadius: 18, aspectRatio: '9 / 18' }}>
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{ top: 5, width: 30, height: 3.5, background: 'rgba(255,255,255,0.18)' }}
              />
              <div className="flex justify-center pt-5 pb-1">
                <Orb size={30} />
              </div>
              <div className="px-2 flex-1 min-h-0 overflow-hidden">
                <div className="eyebrow" style={{ fontSize: 5.5, color: 'var(--accent)' }}>
                  {c.phone.eyebrow}
                </div>
                <div className="mt-1">
                  <Photo src="/assets/ui/suite-2.webp" alt={c.phone.title} h={46} />
                </div>
                {/* ES runs longer than EN here, so the title is clamped rather
                    than allowed to push the CTA out of the screen. */}
                <div
                  className="font-serif mt-1"
                  style={{ ...T(8), lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {c.phone.title}
                </div>
                <div className="font-serif" style={{ fontSize: 10, fontWeight: 530, color: 'var(--accent)', lineHeight: 1.2 }}>
                  {c.phone.price}
                </div>
                <div
                  className="font-sans"
                  style={{ ...M(5.5), lineHeight: 1.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {c.phone.meta}
                </div>
              </div>
              <div
                className="mx-2 mb-2 rounded-full grid place-items-center flex-shrink-0"
                style={{ height: 15, background: 'var(--accent)', color: '#1a1207', fontSize: 6.5, fontWeight: 700 }}
              >
                {c.phone.cta}
              </div>
            </div>
          </div>
        </Cell>

        {/* ---------------------------------------------------- voice call */}
        <Cell span="col-span-12 md:col-span-3" label={c.call.label} align="center">
          <div className="dw-frame" style={{ borderRadius: 22, padding: 4, width: '100%', maxWidth: 112 }}>
            <div
              className="dw-screen flex flex-col items-center justify-center gap-3"
              style={{ borderRadius: 18, aspectRatio: '9 / 17' }}
            >
              {/* On a call the waveform IS the orb — there is nothing to look at */}
              <div className="flex items-end gap-1" style={{ height: 36 }} aria-hidden="true">
                {[11, 21, 31, 25, 36, 23, 15, 27, 13].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: 2.5,
                      height: h,
                      borderRadius: 2,
                      background: 'var(--accent)',
                      opacity: 0.5 + (i % 3) * 0.18,
                    }}
                  />
                ))}
              </div>
              <p className="eyebrow px-3 text-center" style={{ fontSize: 6, lineHeight: 1.55 }}>
                {c.call.note}
              </p>
            </div>
          </div>
        </Cell>
      </div>
    </div>
  )
}
