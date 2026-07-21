'use client'

import { useCopy } from '@/lib/i18n/useCopy'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { VoiceOrb, type OrbState } from './VoiceOrb'

/**
 * One intent, eight genuinely different devices (Goal 3).
 *
 * The previous section fanned out repeated tablet rectangles, which made the
 * multi-surface claim look like a copy-paste rather than a product truth. Each
 * frame here has its own silhouette, its own proportions and its own adaptation
 * of the same guest question — a watch gets a glanceable line, a voice call gets
 * a waveform and no image at all, AR glasses get cards floating over the world.
 *
 * The orb rides in every visual surface as the control (Goal 2); the voice-call
 * surface is the single deliberate exception, because there is no screen.
 *
 * Three states: motion (Ken-Burns on photos, orb states) / reduced-motion
 * (stills) / no-JS (everything here is server-rendered markup).
 */

const PHOTO = '/assets/img/hero-poolside.webp'

function Frame({
  label,
  children,
  className = '',
  style,
}: {
  label: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <figure className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={style}>
        {children}
      </div>
      <figcaption className="eyebrow mt-3" style={{ fontSize: 7.5 }}>
        {label}
      </figcaption>
    </figure>
  )
}

/** Shared device shell: dark glass, copper rim, soft drop shadow (Goal 6). */
const shell = (radius: number): React.CSSProperties => ({
  background: 'var(--device-frame)',
  borderRadius: radius,
  border: '1px solid rgba(251,248,242,0.09)',
  boxShadow:
    '0 30px 60px -24px rgba(0,0,0,0.9), 0 0 0 1px rgba(200,106,58,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
})

const screenBg = 'linear-gradient(168deg, #191410 0%, #12100e 58%, #0f0d0c 100%)'

function Photo({ h, radius = 8 }: { h: number | string; radius?: number }) {
  return (
    <div className="relative overflow-hidden" style={{ height: h, borderRadius: radius }}>
      <div
        className="tablet-kenburns absolute inset-0"
        role="img"
        aria-label="Akumal"
        style={{ backgroundImage: `url(${PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </div>
  )
}

function MiniOrb({ size, state = 'idle' }: { size: number; state?: OrbState }) {
  return (
    <div className="device-orb">
      <VoiceOrb state={state} size={size} showMic keepMic micScale={0.32} />
    </div>
  )
}

function Title({ size = 11 }: { size?: number }) {
  return (
    <div className="font-serif" style={{ fontSize: size, fontWeight: 530, color: 'var(--text)' }}>
      Akumal
    </div>
  )
}

export function DeviceWall({ intent }: { intent: string }) {
  const d = useCopy(deviceScreens)
  const s = d.surfaces

  return (
    <div>
      <p
        className="rounded-full px-4 py-2 mb-10"
        style={{
          background: 'rgba(251,248,242,0.07)',
          color: 'var(--text)',
          fontSize: 13,
          width: 'fit-content',
        }}
      >
        {intent}
      </p>

      {/* Two rows on purpose: the personal, glanceable surfaces first, then
          the larger shared ones. A single wrap left a half-empty band. */}
      <div className="flex flex-wrap items-end gap-x-8 gap-y-10">
        {/* ---------------------------------------------------- smartphone */}
        <Frame label={s.phone} style={{ ...shell(26), width: 116, padding: 5 }}>
          <div className="relative overflow-hidden flex flex-col" style={{ borderRadius: 21, background: screenBg, height: 232 }}>
            <span
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 top-1.5 rounded-full"
              style={{ width: 34, height: 4, background: 'rgba(255,255,255,0.14)' }}
            />
            <div className="flex justify-center pt-5 pb-2">
              <MiniOrb size={38} />
            </div>
            <div className="px-2">
              <Photo h={86} />
              <div className="mt-1.5">
                <Title size={10} />
                <div className="font-sans" style={{ fontSize: 7.5, color: 'var(--text-faint)' }}>
                  {s.watchAnswer}
                </div>
              </div>
            </div>
            <div className="mt-auto mx-2 mb-2 rounded-full" style={{ height: 18, background: 'rgba(251,248,242,0.06)' }} />
          </div>
        </Frame>

        {/* --------------------------------------------------------- watch */}
        <Frame label={s.watch}>
          <span
            aria-hidden="true"
            className="block mx-auto"
            style={{ width: 26, height: 12, background: '#17171a', borderRadius: '6px 6px 0 0' }}
          />
          <div style={{ ...shell(22), width: 72, padding: 4 }}>
            <div className="overflow-hidden flex flex-col items-center justify-center" style={{ borderRadius: 18, background: screenBg, height: 84 }}>
              <MiniOrb size={26} />
              <div className="font-serif mt-1" style={{ fontSize: 9, fontWeight: 530, color: 'var(--text)' }}>
                Akumal
              </div>
              <div className="font-sans" style={{ fontSize: 6.5, color: 'var(--text-faint)' }}>
                {s.watchAnswer}
              </div>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="block mx-auto"
            style={{ width: 26, height: 12, background: '#17171a', borderRadius: '0 0 6px 6px' }}
          />
        </Frame>

        {/* ---------------------------------------------------- voice call */}
        <Frame label={s.call} style={{ ...shell(26), width: 108, padding: 5 }}>
          <div className="overflow-hidden flex flex-col items-center justify-center gap-3" style={{ borderRadius: 21, background: screenBg, height: 214 }}>
            {/* No orb-as-control and no image: there is no screen to look at. */}
            <div className="flex items-end gap-1" style={{ height: 34 }} aria-hidden="true">
              {[10, 20, 30, 24, 34, 22, 14, 26, 12].map((h, i) => (
                <span
                  key={i}
                  style={{
                    width: 2.5,
                    height: h,
                    borderRadius: 2,
                    background: 'var(--accent)',
                    opacity: 0.55 + (i % 3) * 0.15,
                  }}
                />
              ))}
            </div>
            <p className="eyebrow px-3 text-center" style={{ fontSize: 6.5, lineHeight: 1.5 }}>
              {s.callNote}
            </p>
          </div>
        </Frame>

        {/* ----------------------------------------------------- AR glasses */}
        <Frame label={s.glasses}>
          <div className="flex items-center" style={{ gap: 6 }}>
            <span aria-hidden="true" style={{ width: 14, height: 3, background: '#1a1a1d', borderRadius: 2 }} />
            {[0, 1].map((lens) => (
              <div
                key={lens}
                style={{
                  ...shell(lens === 0 ? 14 : 14),
                  width: 104,
                  height: 66,
                  padding: 4,
                  borderRadius: 14,
                }}
              >
                <div className="relative overflow-hidden h-full" style={{ borderRadius: 10, background: screenBg }}>
                  <div
                    className="absolute inset-0 opacity-70"
                    role="img"
                    aria-label="Akumal"
                    style={{ backgroundImage: `url(${PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                  {/* the overlaid card — the whole point of AR */}
                  <div
                    className="absolute left-1.5 bottom-1.5 right-1.5 rounded px-1.5 py-1"
                    style={{
                      background: 'rgba(16,14,12,0.74)',
                      border: '1px solid var(--accent-hairline)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <div className="font-serif" style={{ fontSize: 7.5, fontWeight: 530, color: 'var(--text)' }}>
                      Akumal
                    </div>
                  </div>
                  {lens === 0 && (
                    <div className="absolute right-1 top-1 device-orb">
                      <VoiceOrb size={18} showMic keepMic micScale={0.34} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <span aria-hidden="true" style={{ width: 14, height: 3, background: '#1a1a1d', borderRadius: 2 }} />
          </div>
        </Frame>


      </div>

      <div className="flex flex-wrap items-end gap-x-8 gap-y-10 mt-12">
        {/* ------------------------------------------------ in-room tablet */}
        <Frame label={s.tablet} style={{ ...shell(18), width: 250, padding: 7 }}>
          <div className="overflow-hidden flex flex-col" style={{ borderRadius: 12, background: screenBg, height: 188 }}>
            <div className="flex justify-center pt-3 pb-1.5">
              <MiniOrb size={44} />
            </div>
            <div className="px-3 flex-1">
              <Photo h={92} />
              <div className="mt-1.5 flex items-end justify-between">
                <Title />
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ fontSize: 7, background: 'var(--accent)', color: '#1a1207', fontWeight: 600 }}
                >
                  {s.kioskHint}
                </span>
              </div>
            </div>
            <div className="mx-3 mb-2.5 rounded-full" style={{ height: 16, background: 'rgba(251,248,242,0.06)' }} />
          </div>
        </Frame>

        {/* -------------------------------------------------------- laptop */}
        <Frame label={s.laptop}>
          <div style={{ ...shell(10), width: 244, padding: 6 }}>
            <div className="overflow-hidden" style={{ borderRadius: 6, background: screenBg, height: 152 }}>
              {/* browser chrome */}
              <div className="flex items-center gap-1 px-2" style={{ height: 14, background: 'rgba(255,255,255,0.05)' }}>
                <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.2)' }} />
                <span className="ml-1 flex-1 rounded-full" style={{ height: 6, background: 'rgba(255,255,255,0.06)' }} />
              </div>
              <div className="flex items-center gap-3 p-2.5">
                <MiniOrb size={40} />
                <div className="flex-1 grid grid-cols-3 gap-1.5">
                  <Photo h={54} radius={5} />
                  <Photo h={54} radius={5} />
                  <Photo h={54} radius={5} />
                </div>
              </div>
              <div className="px-2.5">
                <Title size={10} />
              </div>
            </div>
          </div>
          {/* base wedge — the silhouette that says "laptop" */}
          <div
            className="mx-auto"
            style={{
              width: 292,
              height: 7,
              background: 'linear-gradient(180deg,#1a1a1d,#0d0d0f)',
              borderRadius: '0 0 8px 8px',
              boxShadow: '0 10px 20px -10px rgba(0,0,0,0.9)',
            }}
          />
        </Frame>

        {/* --------------------------------------------------------- TV */}
        <Frame label={s.tv}>
          <div style={{ ...shell(8), width: 244, padding: 5 }}>
            <div className="relative overflow-hidden" style={{ borderRadius: 4, background: screenBg, height: 137 }}>
              <Photo h="100%" radius={4} />
              <div className="absolute left-3 top-3 device-orb">
                <MiniOrb size={36} />
              </div>
              <div
                className="absolute left-3 bottom-3 rounded px-2 py-1"
                style={{ background: 'rgba(16,14,12,0.72)', border: '1px solid var(--accent-hairline)' }}
              >
                <Title size={11} />
              </div>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="block mx-auto"
            style={{ width: 54, height: 8, background: '#141417', borderRadius: '0 0 4px 4px' }}
          />
          <span
            aria-hidden="true"
            className="block mx-auto"
            style={{ width: 110, height: 4, background: '#101013', borderRadius: 3 }}
          />
        </Frame>

        {/* ------------------------------------------------------ kiosk */}
        <Frame label={s.kiosk}>
          <div style={{ ...shell(14), width: 116, padding: 6 }}>
            <div className="overflow-hidden flex flex-col" style={{ borderRadius: 9, background: screenBg, height: 244 }}>
              <div className="flex justify-center pt-4 pb-2">
                <MiniOrb size={46} />
              </div>
              <div className="px-2.5 flex-1">
                <Photo h={132} />
                <div className="mt-2">
                  <Title size={10} />
                  <div className="font-sans" style={{ fontSize: 7, color: 'var(--text-faint)' }}>
                    {s.kioskHint}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="block mx-auto"
            style={{ width: 76, height: 10, background: '#141417', borderRadius: '0 0 6px 6px' }}
          />
        </Frame>
      </div>
    </div>
  )
}
