'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/cds/Reveal'
import { VoiceOrb } from '@/components/cds/VoiceOrb'
import { DeviceVoiceBar } from './DeviceVoiceBar'
import { useCopy } from '@/lib/i18n/useCopy'
import { useLang } from '@/lib/i18n/LanguageContext'
import { v4Copy } from '@/lib/i18n/marketing/v4'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'

/**
 * Every Surface — "One conversation. Every screen in the guest’s world."
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
const SERIF = "var(--font-editorial), 'Instrument Serif', Georgia, serif"
const CARIBBEAN_INK = '#061F24'
const CARIBBEAN_PANEL = '#0B3034'
const SHELL = '#F7ECDD'
const CORAL = '#D97A4F'
const SEA_GLASS = '#86B9B7'
const SHELL_GOLD = '#D7B17A'

/** px on the 1240-wide design stage → em (stage font-size is 1cqw = 12.4px). */
const u = (px: number) => `${(px / 12.4).toFixed(3)}em`
/** px → cqw, for orb sizes (independent of local font-size). */
const c = (px: number) => `${(px / 12.4).toFixed(2)}cqw`

const bezel: CSSProperties = {
  background: 'linear-gradient(145deg,#7FA9A7 0%,#173E42 9%,#071719 47%,#041417 80%,#4B7778 100%)',
  border: '1px solid rgba(134,185,183,.3)',
  boxShadow: 'inset 0 0 0 1px rgba(247,236,221,.05)',
}
const glass: CSSProperties = { background: '#041417' }
const screen: CSSProperties = { background: CARIBBEAN_PANEL }

const SURFACE_UI = {
  en: {
    ratePromise: 'BEST DIRECT RATE', guestThread: 'MAYA · SUITE 214', suiteAlt: 'Ocean-view suite at blue hour', suiteTitle: 'Ocean-View Suite',
    suiteRate: '$250 · night — save $71 direct', suiteMeta: 'Private terrace · 2 nights left in March', bookDirect: 'Reserve with MarAzul', directUrl: 'MARAZUL.COM/STAY',
    webLabel: 'WEB · DIRECT BOOKING · 0% OTA COMMISSION', tabletLabel: 'IN-ROOM TABLET · THE ANSWER IS A PICTURE',
    tabletAlt: 'A secluded Caribbean cove at MarAzul', tabletQuestion: 'Where can we swim without a crowd?', tabletTitle: 'The MarAzul cove',
    tabletMeta: 'Private beach · cart in 4 minutes', tabletPrimary: 'Send a cart', tabletSecondary: 'Save for later',
    phoneAlt: 'MarAzul grounds opening onto the Caribbean', phoneQuestion: 'Best spot for sunset cocktails?', phoneTag: 'ON PROPERTY · GOLDEN HOUR 6:48',
    phoneTitle: 'MarAzul Sunset Bar', phoneSub: 'Terrace · corner table available', phoneBody: 'I can hold the 6:30 table now and add it to your evening plan.',
    taxi: 'Hold the table', more: 'See the menu', phoneLabel: 'SMARTPHONE · CONCIERGE THAT BOOKS', watchLabel: 'WATCH', watchEvent: 'CACAO CEREMONY',
    displayAlt: 'MarAzul arrival path overlooking the Caribbean', displayMeta: 'OCEAN SUITE 214 · READY', welcome: 'Welcome,',
    terrace: 'Sunset 6:48 · your dinner table is held for 8:00', displayLabel: 'IN-ROOM DISPLAY · GREETS ON ARRIVAL',
    voiceLabel: 'VOICE ONLY · DESCRIBED ALOUD', voiceActive: 'MARAZUL · LISTENING',
    swipeCue: 'Swipe the device family · arrow keys also work', surfaceLabel: 'Hotel Companion across guest devices',
  },
  es: {
    ratePromise: 'MEJOR TARIFA DIRECTA', guestThread: 'MAYA · SUITE 214', suiteAlt: 'Suite con vista al mar durante la hora azul', suiteTitle: 'Suite con Vista al Mar',
    suiteRate: '$250 · noche — ahorra $71 directo', suiteMeta: 'Terraza privada · quedan 2 noches en marzo', bookDirect: 'Reservar con MarAzul', directUrl: 'MARAZUL.COM/ESTANCIA',
    webLabel: 'WEB · RESERVA DIRECTA · 0% COMISIÓN OTA', tabletLabel: 'TABLET EN LA HABITACIÓN · LA RESPUESTA ES UNA IMAGEN',
    tabletAlt: 'Una caleta caribeña privada en MarAzul', tabletQuestion: '¿Dónde podemos nadar sin gente?', tabletTitle: 'La caleta MarAzul',
    tabletMeta: 'Playa privada · carrito en 4 minutos', tabletPrimary: 'Enviar carrito', tabletSecondary: 'Guardar',
    phoneAlt: 'Los jardines de MarAzul frente al Caribe', phoneQuestion: '¿El mejor lugar para cocteles al atardecer?', phoneTag: 'EN LA PROPIEDAD · ATARDECER 18:48',
    phoneTitle: 'Bar Atardecer MarAzul', phoneSub: 'Terraza · mesa esquinera disponible', phoneBody: 'Puedo apartar la mesa de las 18:30 y agregarla a tu plan de esta noche.',
    taxi: 'Apartar la mesa', more: 'Ver el menú', phoneLabel: 'SMARTPHONE · CONCIERGE QUE RESERVA', watchLabel: 'RELOJ', watchEvent: 'RITUAL DE CACAO',
    displayAlt: 'El sendero de llegada a MarAzul frente al Caribe', displayMeta: 'SUITE MAR 214 · LISTA', welcome: 'Bienvenida,',
    terrace: 'Atardecer 18:48 · tu mesa está apartada para las 20:00', displayLabel: 'PANTALLA EN LA HABITACIÓN · RECIBE AL LLEGAR',
    voiceLabel: 'SOLO VOZ · DESCRITO EN VOZ ALTA', voiceActive: 'MARAZUL · ESCUCHANDO',
    swipeCue: 'Desliza la familia de dispositivos · también puedes usar las flechas', surfaceLabel: 'Hotel Companion en los dispositivos del huésped',
  },
} as const

/** A VoiceOrb with a scoped sea-glass/coral halo behind it, so the small
 *  surfaces carry MarAzul's light without touching the shared orb CSS. `halo` is the
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
          background: 'radial-gradient(circle, rgba(134,185,183,.52) 0%, rgba(217,122,79,.24) 42%, transparent 72%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative' }}>
        <VoiceOrb size={size} state={state} showMic={false} className="vmic-marazul" />
      </div>
    </div>
  )
}

/** The property's identity stays constant while the interaction changes by
 *  surface. Keeping this as a true wordmark—not a generic app pill—is the
 *  visual bridge back to the hero tablet. */
function MarAzulMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-label="MarAzul, Riviera Maya"
      style={{ display: 'inline-grid', gap: u(compact ? 2 : 3), color: SHELL, textShadow: '0 2px 16px rgba(0,0,0,.55)' }}
    >
      <strong style={{ fontFamily: SERIF, fontSize: u(compact ? 13 : 17), fontWeight: 400, letterSpacing: '.15em', lineHeight: 1 }}>MARAZUL</strong>
      <small style={{ ...MONO, color: 'rgba(247,236,221,.7)', fontSize: u(compact ? 6.2 : 7.5), letterSpacing: '.17em', lineHeight: 1.1 }}>RIVIERA MAYA</small>
    </span>
  )
}

function Chip({ label, tag = false, muted = false }: { label: string; tag?: boolean; muted?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: u(7),
        border: `${u(1)} solid rgba(215,177,122,${tag ? 0.46 : 0})`,
        borderRadius: u(8),
        padding: `${u(6)} ${u(12)}`,
        ...MONO,
        fontSize: u(9.5),
        letterSpacing: '.22em',
        color: muted ? 'rgba(247,236,221,.46)' : SHELL_GOLD,
        background: tag ? 'rgba(6,31,36,.58)' : 'transparent',
      }}
    >
      {tag && <span style={{ width: u(6), height: u(6), borderRadius: '50%', background: CORAL }} />}
      {label}
    </span>
  )
}

export function EverySurface({
  id = 'every-surface',
  showHeader = true,
  compact = false,
}: {
  id?: string
  showHeader?: boolean
  compact?: boolean
} = {}) {
  const { lang } = useLang()
  const ui = SURFACE_UI[lang]
  const c4 = useCopy(v4Copy).actIV
  const ds = useCopy(deviceScreens)
  const label = (): CSSProperties => ({ textAlign: 'center', ...MONO, fontSize: u(10), letterSpacing: '.24em', color: 'rgba(247,236,221,.68)', marginTop: u(12) })
  const Wrapper: 'section' | 'div' = showHeader ? 'section' : 'div'

  return (
    <Wrapper id={id} className="scroll-mt-20" style={{ paddingBlock: compact ? 0 : 'clamp(88px, 12vw, 150px)' }}>
      <div className="container-rc">
        {/* header */}
        {showHeader ? <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap', marginBottom: 'clamp(28px, 4vw, 52px)' }}>
          <div>
            <div className="eyebrow eyebrow-accent mb-6">{c4.eyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)', maxWidth: '16ch' }}>
              {c4.statementPre}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: SHELL }}>{c4.statementHi}</em>
            </h2>
          </div>
          <p style={{ ...SANS, fontSize: 'clamp(14px, 1.4vw, 16px)', color: 'var(--text-dim, rgba(247,236,221,.58))', maxWidth: '32ch', lineHeight: 1.55, textAlign: 'right' }}>
            {c4.closingPre}
            <em style={{ fontStyle: 'italic', color: SHELL }}>{c4.closingHi}</em>
          </p>
        </div>
        </Reveal> : null}

        {/* device stage — scrolls on narrow screens, scales as one still.
            minWidth is the FULL design stage (1240): below it the em/cqw scale
            shrinks text faster than the fixed-height screens, so lines re-wrap
            and collide. Rendering at design width keeps the composition exact
            and lets the wall be swiped instead. */}
        <Reveal delay={120}>
        <div
          className="surface-scroller"
          role="region"
          tabIndex={0}
          aria-label={ui.surfaceLabel}
          aria-describedby={`${id}-surface-hint`}
          style={{ overflowX: 'auto', overflowY: 'hidden', margin: '0 -4px', padding: '0 4px' }}
        >
          <div className="surface-stage-shell" style={{ containerType: 'inline-size', width: '100%', minWidth: 1240 } as CSSProperties}>
            <div
              className="surface-stage"
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1240 / 800',
                background: 'radial-gradient(ellipse 78% 62% at 52% 18%, rgba(134,185,183,.2) 0%, transparent 64%), linear-gradient(155deg,#0D373B 0%,#061F24 51%,#031316 100%)',
                border: `${u(1)} solid rgba(134,185,183,.22)`,
                borderRadius: u(20),
                boxShadow: 'inset 0 0 90px rgba(1,13,15,.5), 0 34px 80px -42px rgba(2,24,27,.72)',
                '--accent': CORAL,
                '--accent-bright': '#EC8B5D',
                '--gold': SEA_GLASS,
                '--text': SHELL,
              } as CSSProperties}
            >
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(112deg, transparent 0 43%, rgba(247,236,221,.025) 43.1% 43.3%, transparent 43.4%), radial-gradient(circle at 18% 76%, rgba(217,122,79,.1), transparent 23%)', pointerEvents: 'none' }} />

              {/* ── WEB — direct booking before arrival, top-right ── */}
              <div style={{ position: 'absolute', right: 0, top: u(10), width: u(560) }}>
                <div style={{ ...bezel, borderRadius: u(22), padding: u(3), boxShadow: '0 30px 70px rgba(0,15,18,.64), 0 0 44px rgba(134,185,183,.08)' }}>
                  <div style={{ ...glass, borderRadius: u(20), padding: u(12) }}>
                    <div style={{ ...screen, border: `${u(1)} solid rgba(134,185,183,.13)`, borderRadius: u(12), overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(12)} ${u(16)}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: u(12) }}>
                          <MarAzulMark compact />
                          <span aria-hidden style={{ width: u(1), height: u(22), background: 'rgba(134,185,183,.24)' }} />
                          <Chip label={ui.directUrl} />
                        </div>
                        <span style={{ display: 'grid', gap: u(3), textAlign: 'right' }}>
                          <small style={{ ...MONO, fontSize: u(9.5), letterSpacing: '.17em', color: 'rgba(247,236,221,.74)' }}>{ui.ratePromise}</small>
                          <small style={{ ...MONO, fontSize: u(7.5), letterSpacing: '.13em', color: 'rgba(134,185,183,.88)' }}>{ui.guestThread}</small>
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: u(12), padding: `${u(4)} ${u(16)} ${u(16)}` }}>
                        <div style={{ flex: 1.2, height: u(190), borderRadius: u(10), overflow: 'hidden', position: 'relative' }}>
                          <Image alt={ui.suiteAlt} src="/assets/editorial/hc-boutique-suite-blue-hour.webp" fill sizes="(max-width: 767px) 68vw, 300px" quality={72} className="v5-kenburns" style={{ objectFit: 'cover', objectPosition: '64% 58%' }} />
                          <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 46%,rgba(4,25,28,.42))' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: u(8), justifyContent: 'center' }}>
                          <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: u(23), lineHeight: 1.05, color: SHELL }}>{ui.suiteTitle}</div>
                          <div style={{ ...SANS, fontSize: u(12), color: SHELL_GOLD }}>{ui.suiteRate}</div>
                          <div style={{ ...SANS, fontSize: u(11.5), color: 'rgba(247,236,221,.62)' }}>{ui.suiteMeta}</div>
                          <div style={{ ...SANS, background: CORAL, color: CARIBBEAN_INK, border: `${u(1)} solid rgba(255,255,255,.12)`, borderRadius: u(8), padding: `${u(9)} 0`, fontSize: u(12.5), fontWeight: 650, textAlign: 'center', marginTop: u(4), boxShadow: '0 10px 24px rgba(2,17,19,.28)' }}>{ui.bookDirect}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* stand */}
                <div style={{ width: u(120), height: u(70), margin: '0 auto', background: 'linear-gradient(180deg,#416E70,#102F33)', clipPath: 'polygon(32% 0,68% 0,100% 100%,0 100%)' }} />
                <div style={{ width: u(220), height: u(10), margin: '0 auto', background: 'linear-gradient(180deg,#79A8A6,#20494C)', border: `${u(1)} solid rgba(134,185,183,.28)`, borderRadius: u(6) }} />
                <div style={label()}>{ui.webLabel}</div>
              </div>

              {/* ── IN-ROOM TABLET — the answer is a picture, centre ── */}
              <div className="surface-focal" style={{ position: 'absolute', left: u(330), top: u(60), width: u(370), zIndex: 5 }}>
                <div style={{ ...bezel, borderRadius: u(34), padding: u(3), boxShadow: '0 36px 80px rgba(0,15,18,.7), 0 0 54px rgba(134,185,183,.09)' }}>
                  <div style={{ ...glass, borderRadius: u(32), padding: u(14) }}>
                    <div style={{ ...screen, borderRadius: u(20), overflow: 'hidden', height: u(520), position: 'relative', display: 'flex', flexDirection: 'column' }}>
                      <Image alt={ui.tabletAlt} src="/assets/editorial/hc-secluded-cove.webp" fill sizes="370px" quality={72} className="v5-kenburns" style={{ objectFit: 'cover', objectPosition: '64% center' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(4,25,28,.58) 0%,transparent 29%,transparent 43%,rgba(3,22,25,.97) 100%), linear-gradient(90deg,rgba(6,31,36,.22),transparent 68%)' }} />
                      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(14)} ${u(16)}` }}>
                        <MarAzulMark />
                        <span style={{ ...MONO, fontSize: u(8), letterSpacing: '.15em', color: 'rgba(247,236,221,.78)' }}>{ui.guestThread}</span>
                      </div>
                      <div style={{ position: 'relative', textAlign: 'right', padding: `${u(4)} ${u(16)}`, ...SANS, fontSize: u(13.5), color: SHELL, textShadow: '0 2px 10px rgba(0,0,0,.68)' }}>{ui.tabletQuestion}</div>
                      <div style={{ position: 'relative', marginTop: 'auto', padding: `0 ${u(16)} ${u(16)}`, display: 'flex', flexDirection: 'column', gap: u(9) }}>
                        <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: u(31), lineHeight: 1, color: SHELL }}>{ui.tabletTitle}</div>
                        <div style={{ ...SANS, fontSize: u(12.5), color: SHELL_GOLD }}>{ui.tabletMeta}</div>
                        <div style={{ display: 'flex', gap: u(8) }}>
                          <span style={{ flex: 1, ...SANS, background: CORAL, color: CARIBBEAN_INK, border: `${u(1)} solid rgba(255,255,255,.12)`, borderRadius: u(8), padding: `${u(10)} 0`, fontSize: u(12), fontWeight: 650, textAlign: 'center' }}>{ui.tabletPrimary}</span>
                          <span style={{ flex: 1, ...SANS, border: `${u(1)} solid rgba(134,185,183,.58)`, background: 'rgba(6,31,36,.42)', color: SHELL, borderRadius: u(8), padding: `${u(10)} 0`, fontSize: u(12), textAlign: 'center' }}>{ui.tabletSecondary}</span>
                        </div>
                      </div>
                      {/* the standard control bar — same one on every tablet */}
                      <div style={{ position: 'relative' }}><DeviceVoiceBar compact label={ui.voiceActive} tone="marazul" /></div>
                    </div>
                  </div>
                </div>
                <div style={label()}>{ui.tabletLabel}</div>
              </div>

              {/* ── SMARTPHONE — a concierge outcome: holds an on-property table ── */}
              <div style={{ position: 'absolute', left: u(20), top: u(120), width: u(250), zIndex: 3 }}>
                <div style={{ ...bezel, borderRadius: u(38), padding: u(3), boxShadow: '0 32px 70px rgba(0,15,18,.72), 0 0 42px rgba(134,185,183,.08)' }}>
                  <div style={{ ...glass, borderRadius: u(36), padding: u(10) }}>
                    <div style={{ ...screen, borderRadius: u(27), overflow: 'hidden', height: u(470), position: 'relative' }}>
                      <Image alt={ui.phoneAlt} src="/assets/lux/hotel-companion-closing-blue-hour-v2.webp" fill sizes="250px" quality={70} className="v5-kenburns" style={{ objectFit: 'cover', objectPosition: '66% center' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,25,28,.5) 0%, transparent 25%, transparent 34%, rgba(3,22,25,.98) 100%), linear-gradient(90deg,rgba(6,31,36,.15),transparent)' }} />
                      {/* notch */}
                      <div style={{ position: 'absolute', top: u(9), left: '50%', transform: 'translateX(-50%)', width: u(70), height: u(18), background: '#041417', border: `${u(.5)} solid rgba(134,185,183,.18)`, borderRadius: u(11), zIndex: 4 }} />
                      {/* status: property + a small always-on orb */}
                      <div style={{ position: 'absolute', top: u(30), left: u(14), right: u(14), zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MarAzulMark compact />
                        <span style={{ ...MONO, fontSize: u(7), letterSpacing: '.1em', color: 'rgba(247,236,221,.78)' }}>{ui.guestThread}</span>
                        <GlowOrb size={c(20)} halo={50} />
                      </div>
                      {/* guest question */}
                      <div style={{ position: 'absolute', top: u(66), left: u(16), right: u(14), textAlign: 'right', zIndex: 3 }}>
                        <span style={{ ...SANS, fontSize: u(12.5), color: SHELL, textShadow: '0 2px 10px rgba(0,0,0,.72)' }}>{ui.phoneQuestion}</span>
                      </div>
                      {/* answer + outcome */}
                      <div style={{ position: 'absolute', left: u(14), right: u(14), bottom: u(58), zIndex: 3, display: 'flex', flexDirection: 'column', gap: u(6) }}>
                        <span style={{ ...MONO, alignSelf: 'flex-start', whiteSpace: 'nowrap', fontSize: u(8), letterSpacing: '.14em', color: SHELL_GOLD, border: `${u(1)} solid rgba(215,177,122,.48)`, background: 'rgba(6,31,36,.58)', borderRadius: u(7), padding: `${u(3)} ${u(8)}` }}>{ui.phoneTag}</span>
                        <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: u(27), lineHeight: 1, color: SHELL }}>{ui.phoneTitle}</div>
                        <div style={{ ...SANS, fontSize: u(11), color: SEA_GLASS }}>{ui.phoneSub}</div>
                        <div style={{ ...SANS, fontSize: u(10.5), lineHeight: 1.4, color: 'rgba(247,236,221,.78)', border: `${u(1)} solid rgba(134,185,183,.2)`, background: 'rgba(6,31,36,.68)', backdropFilter: 'blur(8px)', borderRadius: u(9), padding: `${u(8)} ${u(10)}`, marginTop: u(2) }}>{ui.phoneBody}</div>
                        <div style={{ display: 'flex', gap: u(7), marginTop: u(2) }}>
                          <span style={{ flex: 1, ...SANS, background: CORAL, color: CARIBBEAN_INK, borderRadius: u(8), padding: `${u(9)} 0`, fontSize: u(11.5), fontWeight: 650, textAlign: 'center' }}>{ui.taxi}</span>
                          <span style={{ flex: 1, ...SANS, border: `${u(1)} solid rgba(134,185,183,.55)`, background: 'rgba(6,31,36,.42)', color: SHELL, borderRadius: u(8), padding: `${u(9)} 0`, fontSize: u(11.5), textAlign: 'center' }}>{ui.more}</span>
                        </div>
                      </div>
                      {/* ask bar — the phone is a tap/type/speak surface */}
                      <div style={{ position: 'absolute', left: u(14), right: u(14), bottom: u(13), zIndex: 3, display: 'flex', alignItems: 'center', gap: u(6), border: `${u(1)} solid rgba(134,185,183,.24)`, background: 'rgba(4,25,28,.78)', backdropFilter: 'blur(9px)', borderRadius: 999, padding: `${u(6)} ${u(6)} ${u(6)} ${u(12)}` }}>
                        <span style={{ flex: 1, minWidth: 0, ...SANS, fontSize: u(10), color: 'rgba(247,236,221,.68)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ds.askAnything}</span>
                        <span aria-hidden style={{ flexShrink: 0, width: u(22), height: u(22), display: 'grid', placeItems: 'center', borderRadius: '50%', background: CORAL, color: CARIBBEAN_INK, fontSize: u(12), fontWeight: 700 }}>↑</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={label()}>{ui.phoneLabel}</div>
              </div>

              {/* ── WATCH — a glanceable nudge ── */}
              <div style={{ position: 'absolute', left: u(210), top: u(496), zIndex: 1 }}>
                <div style={{ width: u(44), height: u(60), background: 'linear-gradient(180deg,#1C5053,#061F24)', borderRadius: u(10), margin: '0 auto' }} />
                <div style={{ ...bezel, borderRadius: u(34), padding: u(3), boxShadow: '0 26px 60px rgba(0,0,0,.65)', marginTop: u(-8) }}>
                  <div style={{ ...glass, borderRadius: u(32), padding: u(8) }}>
                    <div style={{ ...screen, borderRadius: u(24), width: u(130), height: u(150), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: u(7) }}>
                      <span aria-hidden style={{ width: u(18), height: u(2), borderRadius: 99, background: CORAL, boxShadow: `0 0 ${u(18)} rgba(217,122,79,.7)` }} />
                      <div style={{ ...SANS, fontWeight: 500, fontSize: u(22), letterSpacing: '-.03em', color: SHELL }}>20 min</div>
                      <div style={{ ...MONO, maxWidth: u(104), fontSize: u(7.5), letterSpacing: '.16em', lineHeight: 1.45, textAlign: 'center', color: SHELL_GOLD }}>{ui.watchEvent}<br />SPA&nbsp;IXCHEL</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: u(44), height: u(56), background: 'linear-gradient(180deg,#061F24,#1C5053)', borderRadius: u(10), margin: `${u(-8)} auto 0` }} />
                <div style={label()}>{ui.watchLabel}</div>
              </div>

              {/* ── IN-ROOM DISPLAY — greets on arrival, bottom-right ── */}
              <div style={{ position: 'absolute', right: u(10), top: u(548), width: u(450), zIndex: 2 }}>
                <div style={{ ...bezel, borderRadius: u(14), padding: u(2.5), boxShadow: '0 30px 70px rgba(0,0,0,.55)' }}>
                  <div style={{ ...glass, borderRadius: u(12), padding: u(8) }}>
                    <div style={{ ...screen, borderRadius: u(8), overflow: 'hidden', height: u(200), position: 'relative' }}>
                      <Image alt={ui.displayAlt} src="/assets/editorial/hc-caribbean-arrival.webp" fill sizes="450px" quality={70} className="v5-kenburns" style={{ objectFit: 'cover', objectPosition: '64% center' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(3,22,25,.96) 0%,rgba(4,31,34,.7) 54%,rgba(4,25,28,.16) 100%), linear-gradient(180deg,rgba(4,25,28,.12),rgba(4,25,28,.36))' }} />
                      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: u(8), padding: `0 ${u(24)}` }}>
                        <MarAzulMark compact />
                        <div style={{ ...MONO, fontSize: u(9.5), letterSpacing: '.21em', color: SHELL_GOLD }}>{ui.displayMeta}</div>
                        <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: u(30), lineHeight: 1.1, color: SHELL }}>
                          {ui.welcome} <em style={{ fontStyle: 'italic', color: CORAL }}>Maya</em>
                        </div>
                        <div style={{ ...SANS, fontSize: u(13), color: 'rgba(247,236,221,.76)' }}>{ui.terrace}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={label()}>{ui.displayLabel}</div>
              </div>

              {/* ── VOICE PUCK — voice only, described aloud ── */}
              <div style={{ position: 'absolute', left: u(450), bottom: 0, width: u(190), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u(12), zIndex: 3 }}>
                <div style={{ position: 'relative', width: u(150), height: u(96), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 28%,#F0E4D2 0%,#C9B79D 38%,#42696A 72%,#173A3D 100%)', border: `${u(1)} solid rgba(247,236,221,.34)`, borderRadius: '50%', boxShadow: '0 24px 50px rgba(0,10,12,.7), inset 0 -12px 26px rgba(6,31,36,.28)' }} />
                  <div style={{ position: 'relative', marginTop: u(-14) }}>
                    <GlowOrb size={c(44)} halo={104} state="speaking" />
                  </div>
                </div>
                <div style={{ textAlign: 'center', ...MONO, fontSize: u(10), letterSpacing: '.24em', color: 'rgba(247,236,221,.68)' }}>{ui.voiceLabel}</div>
              </div>

            </div>
          </div>
        </div>
        <p id={`${id}-surface-hint`} className="surface-swipe-cue">{ui.swipeCue}</p>
        </Reveal>
      </div>
    </Wrapper>
  )
}
