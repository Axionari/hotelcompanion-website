'use client'

import { CSSProperties } from 'react'
import { Reveal } from '@/components/cds/Reveal'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { useCopy } from '@/lib/i18n/useCopy'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'

/**
 * Every Surface — "One conversation. Every screen in the guest's world."
 * The device family as one cinematic still (Claude Design handoff, Turn 7),
 * built for real: one question — "Best beach near here?" — flowing across a
 * laptop (books before arrival, 0% commission), the in-room tablet (the answer
 * is a picture), a smartphone (talk or type), a watch, an in-room display (greets
 * on arrival), and a voice-only puck. Real hospitality photography; the RC VoiceOrb
 * alive on the voice surfaces. The stage is a container-query composition: every
 * dimension is em/cqw against the stage width, so it scales as one still and can
 * scroll on narrow screens without reflow. Reduced motion stills the orbs.
 *
 * Model: the in-room tablet is voice-first (fixed in the room); the phone and
 * laptop are the pre-arrival surfaces where a guest can tap, type, or speak.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS: CSSProperties = { fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }
const SERIF = "var(--font-serif), Georgia, serif"
const TERRA = '#C86A3A'
const GOLD = '#C9A15A'
const CREAM = '#F2EEE6'

/** px on the 1240-wide design stage → em (stage font-size is 1cqw = 12.4px). */
const u = (px: number) => `${(px / 12.4).toFixed(3)}em`
/** px → cqw, for orb sizes (independent of local font-size). */
const c = (px: number) => `${(px / 12.4).toFixed(2)}cqw`

const bezel: CSSProperties = { background: 'linear-gradient(150deg,#9A9AA0,#3A3A40)' }
const glass: CSSProperties = { background: '#0B0B0D' }
const screen: CSSProperties = { background: '#14100C' }

/** A VoiceOrb with a scoped amber halo behind it, so the small surfaces glow
 *  like the reference without touching the shared RC orb CSS. `halo` is the
 *  halo diameter in design-px (converted to em, so it scales with the stage). */
function GlowOrb({ size, halo, state = 'listening' }: { size: string; halo: number; state?: 'listening' | 'speaking' }) {
  return (
    <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: u(halo),
          height: u(halo),
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224,150,80,.55) 0%, rgba(200,106,58,.28) 42%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative' }}>
        <VoiceOrb size={size} state={state} showMic={false} />
      </div>
    </div>
  )
}

function Chip({ label, tag = false, muted = false }: { label: string; tag?: boolean; muted?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: u(7),
        border: `${u(1)} solid rgba(200,106,58,${tag ? 0.4 : 0})`,
        borderRadius: 999,
        padding: `${u(6)} ${u(12)}`,
        ...MONO,
        fontSize: u(9.5),
        letterSpacing: '.22em',
        color: muted ? 'rgba(242,233,220,.45)' : TERRA,
        background: tag ? 'rgba(9,6,4,.4)' : 'transparent',
      }}
    >
      {tag && <span style={{ width: u(6), height: u(6), borderRadius: '50%', background: TERRA }} />}
      {label}
    </span>
  )
}

export function EverySurface() {
  const c4 = useCopy(v4Copy).actIV
  const ds = useCopy(deviceScreens)
  const beach = ds.screens.beach // ask/title/meta/actions/image (approved device copy)
  const label = (t: string): CSSProperties => ({ textAlign: 'center', ...MONO, fontSize: u(10), letterSpacing: '.24em', color: 'rgba(242,233,220,.35)', marginTop: u(12) })

  return (
    <section id="every-surface" className="scroll-mt-20" style={{ paddingBlock: 'clamp(88px, 12vw, 150px)' }}>
      <div className="container-rc">
        {/* header */}
        <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap', marginBottom: 'clamp(28px, 4vw, 52px)' }}>
          <div>
            <div className="eyebrow eyebrow-accent mb-6">{c4.eyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)', maxWidth: '16ch' }}>
              {c4.statementPre}
              <em style={{ fontStyle: 'italic', fontWeight: 480, color: CREAM }}>{c4.statementHi}</em>
            </h2>
          </div>
          <p style={{ ...SANS, fontSize: 'clamp(14px, 1.4vw, 16px)', color: 'var(--text-dim, rgba(242,233,220,.55))', maxWidth: '32ch', lineHeight: 1.55, textAlign: 'right' }}>
            {c4.closingPre}
            <em style={{ fontStyle: 'italic', color: CREAM }}>{c4.closingHi}</em>
          </p>
        </div>
        </Reveal>

        {/* device stage — scrolls on narrow screens, scales as one still.
            minWidth is the FULL design stage (1240): below it the em/cqw scale
            shrinks text faster than the fixed-height screens, so lines re-wrap
            and collide. Rendering at design width keeps the composition exact
            and lets the wall be swiped instead. */}
        <Reveal delay={120}>
        <div className="surface-scroller" style={{ overflowX: 'auto', overflowY: 'hidden', margin: '0 -4px', padding: '0 4px' }}>
          <div style={{ containerType: 'inline-size', width: '100%', minWidth: 1240 } as CSSProperties}>
            <div style={{ position: 'relative', fontSize: '1cqw', aspectRatio: '1240 / 800', background: 'radial-gradient(ellipse 80% 60% at 50% 28%, #1C120B 0%, #0D0805 74%)', borderRadius: u(20) }}>

              {/* ── LAPTOP & WEB — books before arrival, top-right ── */}
              <div style={{ position: 'absolute', right: 0, top: u(10), width: u(560) }}>
                <div style={{ ...bezel, borderRadius: u(22), padding: u(3), boxShadow: '0 30px 70px rgba(0,0,0,.55)' }}>
                  <div style={{ ...glass, borderRadius: u(20), padding: u(12) }}>
                    <div style={{ ...screen, borderRadius: u(12), overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(12)} ${u(16)}` }}>
                        <Chip label="MARAZUL.COM/BOOK" tag />
                        <span style={{ ...MONO, fontSize: u(9.5), letterSpacing: '.18em', color: 'rgba(242,233,220,.45)' }}>0% COMMISSION</span>
                      </div>
                      <div style={{ display: 'flex', gap: u(12), padding: `${u(4)} ${u(16)} ${u(16)}` }}>
                        <div style={{ flex: 1.2, height: u(190), borderRadius: u(10), overflow: 'hidden', position: 'relative' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="Ocean-view suite" src="/assets/ui/suite-ocean.webp" className="v5-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: u(8), justifyContent: 'center' }}>
                          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: u(22), color: CREAM }}>Ocean-View Suite</div>
                          <div style={{ ...SANS, fontSize: u(12), color: TERRA }}>$250 · night — $71 less than the OTA</div>
                          <div style={{ ...SANS, fontSize: u(11.5), color: 'rgba(242,233,220,.5)' }}>Private terrace · 2 nights left in March</div>
                          <div style={{ ...SANS, background: TERRA, color: '#fff', borderRadius: 999, padding: `${u(9)} 0`, fontSize: u(12.5), fontWeight: 600, textAlign: 'center', marginTop: u(4) }}>Book direct</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* stand */}
                <div style={{ width: u(120), height: u(70), margin: '0 auto', background: 'linear-gradient(180deg,#6E6E74,#2E2E33)', clipPath: 'polygon(32% 0,68% 0,100% 100%,0 100%)' }} />
                <div style={{ width: u(220), height: u(10), margin: '0 auto', background: 'linear-gradient(180deg,#8A8A90,#3A3A40)', borderRadius: u(6) }} />
                <div style={label('')}>LAPTOP &amp; WEB · BOOKS BEFORE THEY ARRIVE</div>
              </div>

              {/* ── IN-ROOM TABLET — the answer is a picture, centre ── */}
              <div style={{ position: 'absolute', left: u(330), top: u(60), width: u(370), zIndex: 5 }}>
                <div style={{ ...bezel, borderRadius: u(34), padding: u(3), boxShadow: '0 36px 80px rgba(0,0,0,.6)' }}>
                  <div style={{ ...glass, borderRadius: u(32), padding: u(14) }}>
                    <div style={{ ...screen, borderRadius: u(20), overflow: 'hidden', height: u(520), position: 'relative', display: 'flex', flexDirection: 'column' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt={beach.title} src={beach.image} className="v5-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(9,6,4,.5) 0%,transparent 30%,transparent 45%,rgba(9,6,4,.96) 100%)' }} />
                      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(14)} ${u(16)}` }}>
                        <Chip label="MARAZUL" tag />
                        <span style={{ ...MONO, fontSize: u(9), letterSpacing: '.2em', color: 'rgba(242,233,220,.6)' }}>{ds.listening.toUpperCase()}</span>
                      </div>
                      <div style={{ position: 'relative', textAlign: 'right', padding: `${u(4)} ${u(16)}`, ...SANS, fontSize: u(13.5), color: CREAM, textShadow: '0 2px 10px rgba(0,0,0,.6)' }}>{beach.ask}</div>
                      <div style={{ position: 'relative', marginTop: 'auto', padding: `0 ${u(16)} ${u(16)}`, display: 'flex', flexDirection: 'column', gap: u(9) }}>
                        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: u(30), lineHeight: 1, color: CREAM }}>{beach.title}</div>
                        <div style={{ ...SANS, fontSize: u(12.5), color: TERRA }}>{beach.meta}</div>
                        <div style={{ display: 'flex', gap: u(8) }}>
                          <span style={{ flex: 1, ...SANS, background: TERRA, color: '#fff', borderRadius: 999, padding: `${u(10)} 0`, fontSize: u(12), fontWeight: 600, textAlign: 'center' }}>{beach.actions[1]}</span>
                          <span style={{ flex: 1, ...SANS, border: `${u(1)} solid rgba(242,233,220,.35)`, color: CREAM, borderRadius: 999, padding: `${u(10)} 0`, fontSize: u(12), textAlign: 'center' }}>{beach.actions[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={label('')}>IN-ROOM TABLET · THE ANSWER IS A PICTURE</div>
              </div>

              {/* ── SMARTPHONE — a concierge outcome: books the taxi, upsells the spot ── */}
              <div style={{ position: 'absolute', left: u(20), top: u(120), width: u(250), zIndex: 3 }}>
                <div style={{ ...bezel, borderRadius: u(38), padding: u(3), boxShadow: '0 32px 70px rgba(0,0,0,.6)' }}>
                  <div style={{ ...glass, borderRadius: u(36), padding: u(10) }}>
                    <div style={{ ...screen, borderRadius: u(27), overflow: 'hidden', height: u(470), position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Rooftop at golden hour" src="/assets/lux/band-clifftop-ocean.webp" className="v5-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9,6,4,.42) 0%, transparent 24%, transparent 38%, rgba(9,6,4,.97) 100%)' }} />
                      {/* notch */}
                      <div style={{ position: 'absolute', top: u(9), left: '50%', transform: 'translateX(-50%)', width: u(70), height: u(18), background: '#0B0B0D', borderRadius: u(11), zIndex: 4 }} />
                      {/* status: property + a small always-on orb */}
                      <div style={{ position: 'absolute', top: u(30), left: u(14), right: u(14), zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip label="MARAZUL" tag />
                        <GlowOrb size={c(20)} halo={50} />
                      </div>
                      {/* guest question */}
                      <div style={{ position: 'absolute', top: u(66), left: u(16), right: u(14), textAlign: 'right', zIndex: 3 }}>
                        <span style={{ ...SANS, fontSize: u(12.5), color: CREAM, textShadow: '0 2px 10px rgba(0,0,0,.7)' }}>Best spot for sunset cocktails?</span>
                      </div>
                      {/* answer + outcome */}
                      <div style={{ position: 'absolute', left: u(14), right: u(14), bottom: u(58), zIndex: 3, display: 'flex', flexDirection: 'column', gap: u(6) }}>
                        <span style={{ ...MONO, alignSelf: 'flex-start', whiteSpace: 'nowrap', fontSize: u(8), letterSpacing: '.14em', color: TERRA, border: '1px solid rgba(200,106,58,.45)', background: 'rgba(9,6,4,.5)', borderRadius: 999, padding: `${u(3)} ${u(8)}` }}>IN TOWN · GOLDEN HOUR 6:48</span>
                        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: u(27), lineHeight: 1, color: CREAM }}>Cielo Rooftop</div>
                        <div style={{ ...SANS, fontSize: u(11), color: TERRA }}>a mezcal list the hotel bar can&apos;t match</div>
                        <div style={{ ...SANS, fontSize: u(10.5), lineHeight: 1.4, color: 'rgba(242,233,220,.72)', border: '1px solid rgba(242,233,220,.12)', background: 'rgba(9,6,4,.5)', borderRadius: u(10), padding: `${u(8)} ${u(10)}`, marginTop: u(2) }}>Leave by 6:15 for the light — back in time for your 8:00 table.</div>
                        <div style={{ display: 'flex', gap: u(7), marginTop: u(2) }}>
                          <span style={{ flex: 1, ...SANS, background: TERRA, color: '#fff', borderRadius: 999, padding: `${u(9)} 0`, fontSize: u(11.5), fontWeight: 600, textAlign: 'center' }}>Taxi at 6:15</span>
                          <span style={{ flex: 1, ...SANS, border: '1px solid rgba(242,233,220,.35)', color: CREAM, borderRadius: 999, padding: `${u(9)} 0`, fontSize: u(11.5), textAlign: 'center' }}>More spots</span>
                        </div>
                      </div>
                      {/* ask bar — the phone is a tap/type/speak surface */}
                      <div style={{ position: 'absolute', left: u(14), right: u(14), bottom: u(13), zIndex: 3, display: 'flex', alignItems: 'center', gap: u(6), border: '1px solid rgba(242,233,220,.14)', background: 'rgba(9,6,4,.6)', borderRadius: 999, padding: `${u(6)} ${u(6)} ${u(6)} ${u(12)}` }}>
                        <span style={{ flex: 1, minWidth: 0, ...SANS, fontSize: u(10), color: 'rgba(242,233,220,.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ds.askAnything}</span>
                        <span aria-hidden style={{ flexShrink: 0, width: u(22), height: u(22), display: 'grid', placeItems: 'center', borderRadius: '50%', background: TERRA, color: '#1a1207', fontSize: u(12), fontWeight: 700 }}>↑</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={label('')}>SMARTPHONE · CONCIERGE THAT BOOKS</div>
              </div>

              {/* ── WATCH — a glanceable nudge ── */}
              <div style={{ position: 'absolute', left: u(210), top: u(512), zIndex: 1 }}>
                <div style={{ width: u(44), height: u(60), background: 'linear-gradient(180deg,#241710,#14100C)', borderRadius: u(10), margin: '0 auto' }} />
                <div style={{ ...bezel, borderRadius: u(34), padding: u(3), boxShadow: '0 26px 60px rgba(0,0,0,.65)', marginTop: u(-8) }}>
                  <div style={{ ...glass, borderRadius: u(32), padding: u(8) }}>
                    <div style={{ ...screen, borderRadius: u(24), width: u(130), height: u(150), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: u(7) }}>
                      <GlowOrb size={c(30)} halo={78} />
                      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: u(20), color: CREAM }}>20 min</div>
                      <div style={{ ...MONO, fontSize: u(8.5), letterSpacing: '.2em', color: TERRA }}>SPA&nbsp;IXCHEL</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: u(44), height: u(56), background: 'linear-gradient(180deg,#14100C,#241710)', borderRadius: u(10), margin: `${u(-8)} auto 0` }} />
                <div style={label('')}>WATCH</div>
              </div>

              {/* ── IN-ROOM DISPLAY — greets on arrival, bottom-right ── */}
              <div style={{ position: 'absolute', right: u(10), top: u(548), width: u(450), zIndex: 2 }}>
                <div style={{ ...bezel, borderRadius: u(14), padding: u(2.5), boxShadow: '0 30px 70px rgba(0,0,0,.55)' }}>
                  <div style={{ ...glass, borderRadius: u(12), padding: u(8) }}>
                    <div style={{ ...screen, borderRadius: u(8), overflow: 'hidden', height: u(200), position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Suite terrace at golden hour" src="/assets/ui/suite-2.webp" className="v5-kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(9,6,4,.94) 0%,rgba(9,6,4,.5) 58%,transparent 100%)' }} />
                      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: u(8), padding: `0 ${u(24)}` }}>
                        <div style={{ ...MONO, fontSize: u(9.5), letterSpacing: '.24em', color: GOLD }}>GOOD AFTERNOON · SUITE 214</div>
                        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: u(30), lineHeight: 1.1, color: CREAM }}>
                          Welcome, <em style={{ fontStyle: 'italic', color: '#E0A566' }}>Maya</em>
                        </div>
                        <div style={{ ...SANS, fontSize: u(13), color: 'rgba(242,233,220,.68)' }}>Your terrace faces the sunset · golden hour 6:48</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={label('')}>IN-ROOM DISPLAY · GREETS ON ARRIVAL</div>
              </div>

              {/* ── VOICE PUCK — voice only, described aloud ── */}
              <div style={{ position: 'absolute', left: u(450), bottom: 0, width: u(190), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u(12), zIndex: 3 }}>
                <div style={{ position: 'relative', width: u(150), height: u(96), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 32%,#8A8A90,#3A3A40 70%)', borderRadius: '50%', boxShadow: '0 24px 50px rgba(0,0,0,.6)' }} />
                  <div style={{ position: 'relative', marginTop: u(-14) }}>
                    <GlowOrb size={c(44)} halo={104} state="speaking" />
                  </div>
                </div>
                <div style={{ textAlign: 'center', ...MONO, fontSize: u(10), letterSpacing: '.24em', color: 'rgba(242,233,220,.35)' }}>VOICE ONLY · DESCRIBED ALOUD</div>
              </div>

            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
