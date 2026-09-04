'use client'

import { useEffect, useId, useMemo, useRef, useState, CSSProperties } from 'react'
import Image from 'next/image'
import { DeviceVoiceBar } from './DeviceVoiceBar'
import { useCopy } from '@/lib/i18n/useCopy'
import { useLang } from '@/lib/i18n/LanguageContext'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { intelExecCopy } from '@/lib/i18n/marketing/intelExec'

/**
 * The Companion in-room surface — the answer takes the whole screen and the
 * control sits along the bottom edge (DeviceVoiceBar), the standard every
 * tablet on the site now shares. The answer ALTERNATES layout so a GM sees the
 * range at a glance: full-bleed hero cards (one outcome, big and readable), a
 * choices list, and a cards grid (it can merchandise every service). Context
 * pills under the device name what you're looking at — click to jump, or let
 * it cycle. Reduced motion holds the first screen and stills the orb.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif'
const BRAND_SERIF = "var(--font-editorial), 'Instrument Serif', Georgia, serif"
const CARIBBEAN_INK = '#061F24'
const CARIBBEAN_PANEL = '#0B3034'
const SHELL = '#F7ECDD'
const CORAL = '#D97A4F'
const SEA_GLASS = '#86B9B7'
const SHELL_GOLD = '#D7B17A'

type Layout = 'hero' | 'choices' | 'cards'

type Screen = {
  key: string
  layout: Layout
  pill: string
  // hero
  image?: string
  ask?: string
  title?: string
  meta?: string
  primary?: string
  secondary?: string
  badge?: string
  // choices
  choicesAsk?: string
  choicesTitle?: string
  choices?: { name: string; meta: string; price: string; image: string }[]
  // cards
  cardsTitle?: string
  reserve?: string
  note?: string
  cards?: { name: string; meta: string; image: string; badge?: string; featured?: boolean }[]
}

const TABLET_UI = {
  en: {
    brand: 'MARAZUL', destination: 'RIVIERA MAYA', guest: 'MAYA · SUITE 214',
    upgrade: 'Ocean suite', upgradeAction: 'Upgrade this stay', otaSaving: 'MARAZUL DIRECT · SAVE $71', spa: 'Spa Ixchel',
    spaNote: 'The Cacao Ceremony has a 5:30 opening today — say “book it” and it’s yours. You’d be back for dinner at 7:30.',
    spaMeta: ['90 min · signature', '60 min · from 6:45', '45 min · 6:30 AM'], spaOpen: '5:30 open',
    experiences: 'Cenotes & coast', dayAsk: 'Plan our last day', dayTitle: 'Cenote Dos Ojos', dayMeta: '40 min · driver booked',
    directions: 'Directions', bookDay: 'Book the day', driver: 'DRIVER INCLUDED · $95', roomService: 'MarAzul dining',
    dinnerAsk: 'What’s good tonight?', diningTitle: 'In-room dining', dishMeta: ['Local catch · lime · serrano', 'Grilled · guajillo · citrus', 'The one everyone orders'],
    memory: 'For your return', welcome: 'Welcome back, Maya', usualSuite: 'Your usual suite', roomChange: 'Quiet suites', poolBar: 'Pool after dark', pause: 'Pause preview', resume: 'Resume preview', voice: 'MARAZUL · LISTENING',
  },
  es: {
    brand: 'MARAZUL', destination: 'RIVIERA MAYA', guest: 'MAYA · SUITE 214',
    upgrade: 'Suite frente al mar', upgradeAction: 'Mejorar esta estancia', otaSaving: 'TARIFA MARAZUL · AHORRA $71', spa: 'Spa Ixchel',
    spaNote: 'La Ceremonia de Cacao tiene un espacio hoy a las 17:30 — di “resérvalo” y es tuyo. Estarás de vuelta para cenar a las 19:30.',
    spaMeta: ['90 min · firma', '60 min · desde 18:45', '45 min · 6:30'], spaOpen: '17:30 disponible',
    experiences: 'Cenotes y costa', dayAsk: 'Planea nuestro último día', dayTitle: 'Cenote Dos Ojos', dayMeta: '40 min · conductor reservado',
    directions: 'Cómo llegar', bookDay: 'Reservar el día', driver: 'CONDUCTOR INCLUIDO · $95', roomService: 'Cocina MarAzul',
    dinnerAsk: '¿Qué está bueno esta noche?', diningTitle: 'Comedor en la habitación', dishMeta: ['Pesca local · lima · serrano', 'A la parrilla · guajillo · cítricos', 'El que todos piden'],
    memory: 'Para tu regreso', welcome: 'Qué gusto verte, Maya', usualSuite: 'Tu suite habitual', roomChange: 'Suites tranquilas', poolBar: 'Alberca de noche', pause: 'Pausar vista', resume: 'Reanudar vista', voice: 'MARAZUL · ESCUCHANDO',
  },
} as const

function BrandSignature({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang()
  const ui = TABLET_UI[lang]

  return (
    <div
      aria-label={`${ui.brand}, ${ui.destination}`}
      style={{
        display: 'inline-grid',
        minWidth: 0,
        gap: 3,
        color: SHELL,
        textShadow: '0 2px 18px rgba(0,0,0,.55)',
      }}
    >
      <span style={{ fontFamily: BRAND_SERIF, fontSize: compact ? 'clamp(12px,1.25vw,16px)' : 'clamp(14px,1.5vw,19px)', letterSpacing: '.14em', lineHeight: 1 }}>
        {ui.brand}
      </span>
      <small style={{ ...MONO, overflow: 'hidden', color: 'rgba(247,236,221,.72)', fontSize: 'clamp(8px,.68vw,9px)', letterSpacing: '.15em', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {ui.destination}
      </small>
    </div>
  )
}

function useScreens(): Screen[] {
  const { lang } = useLang()
  const ui = TABLET_UI[lang]
  const s = useCopy(deviceScreens).screens
  const mem = useCopy(intelExecCopy).memory
  return useMemo(
    () => [
      // 1 · hero — the revenue outcome, one item, full-bleed
      {
        key: 'upgrade',
        layout: 'hero',
        pill: ui.upgrade,
        image: '/assets/ui/suite-ocean.webp',
        ask: s.upgrade.ask,
        title: s.upgrade.title,
        meta: s.upgrade.meta,
        primary: ui.upgradeAction,
        badge: ui.otaSaving,
      },
      // 2 · cards — a service menu, three treatments to merchandise
      {
        key: 'spa',
        layout: 'cards',
        pill: ui.spa,
        ask: s.spa.ask,
        cardsTitle: s.spa.title,
        reserve: s.spa.book,
        note: ui.spaNote,
        cards: [
          { name: s.spa.items[0].name, meta: ui.spaMeta[0], image: '/assets/ui/spa-1.webp', badge: ui.spaOpen, featured: true },
          { name: s.spa.items[1].name, meta: ui.spaMeta[1], image: '/assets/ui/spa-2.webp' },
          { name: s.spa.items[2].name, meta: ui.spaMeta[2], image: '/assets/ui/spa-3.webp' },
        ],
      },
      // 3 · hero — a whole bookable day
      {
        key: 'cenote',
        layout: 'hero',
        pill: ui.experiences,
        image: '/assets/lux/exp-cenote.webp',
        ask: ui.dayAsk,
        title: ui.dayTitle,
        meta: ui.dayMeta,
        secondary: ui.directions,
        primary: ui.bookDay,
        badge: ui.driver,
      },
      // 4 · choices — it can merchandise every service
      {
        key: 'dining',
        layout: 'choices',
        pill: ui.roomService,
        choicesAsk: ui.dinnerAsk,
        choicesTitle: ui.diningTitle,
        choices: [
          { name: s.roomservice.items[0].name, meta: ui.dishMeta[0], price: s.roomservice.items[0].price, image: '/assets/ui/dish-1.webp' },
          { name: s.roomservice.items[1].name, meta: ui.dishMeta[1], price: s.roomservice.items[1].price, image: '/assets/ui/dish-2.webp' },
          { name: s.roomservice.items[2].name, meta: ui.dishMeta[2], price: s.roomservice.items[2].price, image: '/assets/ui/dish-3.webp' },
        ],
      },
      // 5 · hero — the moat: she returns, it already knows her.
      {
        key: 'memory',
        layout: 'hero',
        pill: ui.memory,
        image: '/assets/ui/suite-sculpted.webp',
        ask: '',
        title: ui.welcome,
        meta: mem.chips.slice(0, 4).join(' · '),
        primary: ui.usualSuite,
        badge: mem.title,
      },
      // 6 · hero — a quiet room, the one photo nothing else on the site uses
      {
        key: 'nightsuite',
        layout: 'hero',
        pill: ui.roomChange,
        image: s.nightsuite.image,
        ask: s.nightsuite.ask,
        title: s.nightsuite.title,
        meta: s.nightsuite.meta,
        primary: s.nightsuite.confirm,
        badge: s.nightsuite.badge,
      },
      // 7 · hero — the late-night amenity
      {
        key: 'nightpool',
        layout: 'hero',
        pill: ui.poolBar,
        image: s.nightpool.image,
        ask: s.nightpool.ask,
        title: s.nightpool.title,
        meta: s.nightpool.meta,
        primary: s.nightpool.confirm,
        badge: s.nightpool.badge,
      },
    ],
    [s, mem, ui]
  )
}

/**
 * Which screens each page shows.
 *
 * EVERY PAGE SHOWS THE FULL RANGE. This tablet is the product demo — a GM has
 * to see that it books a suite, a treatment, a day out, dinner, and that it
 * remembers the guest. Never trim a page's set to make photography unique;
 * that trade was made once, cut the homepage from five screens to two, and was
 * wrong. Pages differ by WHICH SCREEN THEY OPEN ON and by the order after it.
 *
 *   home       opens on the suite upgrade — the revenue moment
 *   platform   opens on the late-night pool, then the room it moves you to
 *   solutions  opens on dinner, then the returning guest
 *
 * Consequence, stated plainly: the shared screens reuse their photography
 * across pages, because the library holds exactly three spa images and three
 * dish images and each of those screens uses all three at once. Closing that
 * needs more photographs, not a shorter list.
 */
const VARIANTS = {
  home: ['upgrade', 'spa', 'cenote', 'dining', 'memory'],
  platform: ['nightpool', 'nightsuite', 'cenote', 'dining', 'spa'],
  solutions: ['dining', 'memory', 'spa', 'cenote', 'nightpool'],
} as const

export type TabletVariant = keyof typeof VARIANTS

export function CompanionTablet({ className = '', variant = 'home' }: { className?: string; variant?: TabletVariant }) {
  const { lang } = useLang()
  const ui = TABLET_UI[lang]
  const all = useScreens()
  const screens = useMemo(() => {
    const want = VARIANTS[variant]
    return want.map((k) => all.find((x) => x.key === k)).filter(Boolean) as Screen[]
  }, [all, variant])
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(false)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const cycleFadeTimer = useRef<number | undefined>(undefined)
  const selectionTimer = useRef<number | undefined>(undefined)
  const screenId = useId()

  useEffect(() => {
    if (paused || interacting || !inView || !pageVisible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = window.setTimeout(() => {
      setFade(true)
      cycleFadeTimer.current = window.setTimeout(() => {
        setI((n) => (n + 1) % screens.length)
        setFade(false)
      }, 460)
    }, 4600)
    // Hovering, focusing, or pausing cancels only the next dwell. If a
    // cross-fade has already begun, it must finish so the screen cannot remain
    // stranded at low opacity.
    return () => window.clearTimeout(timer.current)
  }, [screens.length, paused, interacting, inView, pageVisible, i])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '240px 0px', threshold: 0.01 })
    const onVisibility = () => setPageVisible(!document.hidden)
    observer.observe(root)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!inView || !pageVisible || screens.length < 2) return
    const nextImage = screens[(i + 1) % screens.length]?.image
    if (!nextImage) return
    const preload = new window.Image()
    preload.src = nextImage
  }, [i, inView, pageVisible, screens])

  useEffect(() => () => {
    window.clearTimeout(timer.current)
    window.clearTimeout(cycleFadeTimer.current)
    window.clearTimeout(selectionTimer.current)
  }, [])

  const go = (n: number) => {
    setPaused(true)
    setFade(true)
    window.clearTimeout(timer.current)
    window.clearTimeout(cycleFadeTimer.current)
    window.clearTimeout(selectionTimer.current)
    selectionTimer.current = window.setTimeout(() => {
      setI(n)
      setFade(false)
    }, 260)
  }

  const togglePreview = () => {
    const next = !paused
    setPaused(next)
    if (!next) setInteracting(false)
  }

  const sc = screens[i]

  return (
    <div
      ref={rootRef}
      className={`${className} motion-gated ${inView && pageVisible ? 'is-in-view' : ''}`.trim()}
      style={{
        '--accent': CORAL,
        '--accent-bright': '#EC8B5D',
        '--gold': SEA_GLASS,
        '--text': SHELL,
      } as CSSProperties}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false)
      }}
    >
      <div
        data-device-ui=""
        className="marazul-hero-tablet"
        style={{
          width: '100%',
          maxWidth: 860,
          aspectRatio: '7 / 5',
          containerType: 'inline-size',
          background: '#071719',
          border: '1px solid rgba(134,185,183,.3)',
          borderRadius: 24,
          padding: 10,
          boxShadow: '0 50px 110px -30px rgba(2,17,19,.9), 0 0 100px -18px rgba(76,143,145,.32), inset 0 0 0 1px rgba(247,236,221,.04)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            borderRadius: 16,
            overflow: 'hidden',
            background: `radial-gradient(120% 100% at 30% 0%, ${CARIBBEAN_PANEL} 0%, ${CARIBBEAN_INK} 62%, #041417 100%)`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── the answer, full-bleed — cross-fades; layout alternates ── */}
          <div id={screenId} role="group" aria-label={sc.pill} style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', opacity: fade ? 0 : 1, transition: 'opacity .45s var(--ease-standard)' }}>
            {sc.layout === 'hero' && <HeroScreen sc={sc} eager={i === 0} />}
            {sc.layout === 'choices' && <ChoicesScreen sc={sc} />}
            {sc.layout === 'cards' && <CardsScreen sc={sc} guest={ui.guest} />}
          </div>

          {/* ── the control, along the bottom edge — the site-wide standard.
              Not optional: the bar IS the tablet's control surface, so a
              tablet without it is a screenshot, not the product. ── */}
          <DeviceVoiceBar label={ui.voice} tone="marazul" />
        </div>
      </div>

      {/* ── context pills — name what you're seeing; click to jump ── */}
      {/* gap 8 -> 6 and pill padding 15 -> 12 buy ~38px of slack in the 601px
          container, so the row cannot wrap on a font swap or on small metric
          differences between machines. Card width is load-bearing for the hero
          fold and is deliberately not touched. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 'clamp(14px,1.8vw,22px)' }}>
        {screens.map((scr, idx) => {
          const on = idx === i
          return (
            <button
              key={scr.key}
              type="button"
              aria-pressed={on}
              aria-controls={screenId}
              onClick={() => go(idx)}
              style={{
                fontFamily: SANS,
                fontSize: 'clamp(11px,1vw,13px)',
                fontWeight: on ? 600 : 500,
                color: on ? SHELL : 'rgba(247,236,221,.72)',
                background: on ? 'rgba(217,122,79,.2)' : 'rgba(6,31,36,.18)',
                border: `1px solid ${on ? 'rgba(217,122,79,.82)' : 'rgba(134,185,183,.4)'}`,
                borderRadius: 999,
                padding: '7px 12px',
                cursor: 'pointer',
                transition: 'all .35s var(--ease-standard)',
              }}
            >
              {scr.pill}
            </button>
          )
        })}
        <button
          type="button"
          onClick={togglePreview}
          className="product-preview-toggle"
          style={{
            fontFamily: MONO.fontFamily,
            fontSize: '10px',
            letterSpacing: '.12em',
            color: 'rgba(247,236,221,.72)',
            background: 'rgba(6,31,36,.18)',
            border: '1px solid rgba(134,185,183,.4)',
            borderRadius: 999,
            padding: '7px 12px',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>{' '}{paused ? ui.resume : ui.pause}
        </button>
      </div>
    </div>
  )
}

/* ── Layout A: hero — one outcome, full-bleed, one-line title ── */
function HeroScreen({ sc, eager }: { sc: Screen; eager: boolean }) {
  return (
    <>
      {sc.image && <Image key={sc.key} alt={sc.title ?? ''} src={sc.image} fill sizes="(max-width: 767px) calc(100vw - 48px), 760px" quality={74} loading={eager ? 'eager' : 'lazy'} className="v5-kenburns" style={{ objectFit: 'cover' }} />}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,25,28,.48) 0%, transparent 34%, transparent 45%, rgba(3,22,25,.96) 100%), linear-gradient(90deg, rgba(3,27,30,.25), transparent 55%)' }} />
      <div style={{ position: 'absolute', top: '5%', left: '5%', zIndex: 4 }}><BrandSignature /></div>
      {sc.ask && (
        <div style={{ position: 'absolute', top: '17%', right: '5%', maxWidth: '58%', textAlign: 'right', zIndex: 3 }}>
          <span style={{ fontFamily: SANS, fontSize: 'clamp(10px,1.15vw,15px)', color: SHELL, textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>{sc.ask}</span>
        </div>
      )}
      <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: '6%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'clamp(10px,1.8vw,24px)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {sc.badge && <span style={{ ...MONO, display: 'inline-block', whiteSpace: 'nowrap', fontSize: 'clamp(9px, 0.78vw, 9.5px)', letterSpacing: '.11em', color: SHELL_GOLD, border: '1px solid rgba(215,177,122,.55)', background: 'rgba(6,31,36,.6)', backdropFilter: 'blur(7px)', borderRadius: 999, padding: '4px 10px', marginBottom: 'clamp(9px, 0.9vw, 10px)' }}>{sc.badge}</span>}
          <div style={{ fontFamily: BRAND_SERIF, fontWeight: 400, fontSize: 'clamp(19px,2.1vw,30px)', letterSpacing: '-.01em', lineHeight: 1.03, color: SHELL, textWrap: 'balance', textShadow: '0 3px 22px rgba(0,0,0,.52)' } as CSSProperties}>{sc.title}</div>
          <div style={{ fontFamily: SANS, fontSize: 'clamp(10px,1vw,12.5px)', lineHeight: 1.35, color: 'rgba(247,236,221,.82)', marginTop: 'clamp(8px, 0.6vw, 9.5px)' }}>{sc.meta}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {sc.secondary && (
            <span style={{ fontFamily: SANS, fontSize: 'clamp(9px,1vw,12px)', fontWeight: 500, color: SHELL, border: '1px solid rgba(134,185,183,.62)', background: 'rgba(8,50,54,.48)', backdropFilter: 'blur(7px)', borderRadius: 9, padding: 'clamp(9px, 0.8vw, 10px) clamp(10px,1.2vw,15px)', whiteSpace: 'nowrap' }}>{sc.secondary}</span>
          )}
          <span style={{ fontFamily: SANS, fontSize: 'clamp(9px,1vw,12px)', fontWeight: 600, color: CARIBBEAN_INK, background: CORAL, border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 8px 20px rgba(3,22,25,.24)', borderRadius: 9, padding: 'clamp(9px, 0.8vw, 10px) clamp(10px,1.2vw,15px)', whiteSpace: 'nowrap' }}>{sc.primary}</span>
        </div>
      </div>
    </>
  )
}

/* ── Layout B: choices — it can merchandise every service ── */
function ChoicesScreen({ sc }: { sc: Screen }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 88% 4%, rgba(134,185,183,.16), transparent 30%), linear-gradient(155deg, ${CARIBBEAN_PANEL}, ${CARIBBEAN_INK})`, display: 'flex', flexDirection: 'column', padding: 'clamp(12px,1.8vw,22px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: BRAND_SERIF, fontWeight: 400, fontSize: 'clamp(18px,2vw,29px)', letterSpacing: '-.01em', lineHeight: 1, color: SHELL }}>{sc.choicesTitle}</div>
          <div style={{ fontFamily: SANS, fontSize: 'clamp(10px,1vw,12.5px)', color: SEA_GLASS, marginTop: 5 }}>{sc.choicesAsk}</div>
        </div>
        <BrandSignature compact />
      </div>
      {/* flex:1 + minHeight:0 and a smaller thumb: the bottom bar took height
          off this screen and the third row was sliding under it. */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: 'clamp(6px, 0.8vw, 9px)', marginTop: 'clamp(8px,1.2vw,14px)', flex: 1, minHeight: 0 }}>
        {/* The three rows SHARE the height the bar left, rather than each
            taking its natural size and pushing the last one underneath it. */}
        {sc.choices?.map((it) => (
          <div key={it.name} style={{ flex: '1 1 0', minHeight: 0, display: 'flex', alignItems: 'center', gap: 'clamp(9px,1.2vw,14px)', background: 'rgba(247,236,221,.055)', border: '1px solid rgba(134,185,183,.19)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.025)', borderRadius: 12, padding: 'clamp(6px, 0.7vw, 9px)' }}>
            <div style={{ position: 'relative', flexShrink: 0, height: '100%', aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
              <Image alt={it.name} src={it.image} width={160} height={160} sizes="(max-width: 767px) 84px, 120px" quality={68} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(11px,1.2vw,15px)', color: SHELL, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 'clamp(9px, 0.95vw, 12px)', color: 'rgba(247,236,221,.6)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.meta}</div>
            </div>
            <div style={{ ...MONO, fontSize: 'clamp(10px,1.1vw,14px)', color: SHELL_GOLD, flexShrink: 0 }}>{it.price}</div>
            <span aria-hidden style={{ flexShrink: 0, width: 'clamp(24px,2.7vw,32px)', height: 'clamp(24px,2.7vw,32px)', display: 'grid', placeItems: 'center', borderRadius: '50%', background: CORAL, color: CARIBBEAN_INK, boxShadow: '0 5px 14px rgba(2,17,19,.28)', fontSize: 'clamp(13px,1.5vw,18px)', fontWeight: 700 }}>+</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Layout C: cards — a service menu, three treatments to reserve ── */
function CardsScreen({ sc, guest }: { sc: Screen; guest: string }) {
  return (
    <div className="marazul-spa-screen" style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 88% 4%, rgba(134,185,183,.16), transparent 30%), linear-gradient(155deg, ${CARIBBEAN_PANEL}, ${CARIBBEAN_INK})`, display: 'flex', flexDirection: 'column', padding: 'clamp(10px,2.8cqi,18px)' }}>
      {/* status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ ...MONO, display: 'inline-flex', alignItems: 'center', gap: 'clamp(4px,1.1cqi,6px)', fontSize: 'clamp(7.5px,1.7cqi,9px)', letterSpacing: '.15em', color: SHELL_GOLD, border: '1px solid rgba(215,177,122,.46)', background: 'rgba(4,24,27,.38)', borderRadius: 999, padding: 'clamp(3px,.8cqi,4px) clamp(7px,1.7cqi,10px)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: SEA_GLASS, boxShadow: '0 0 10px rgba(134,185,183,.7)' }} />{guest}
        </span>
        <BrandSignature compact />
      </div>
      {/* title + question */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'clamp(8px,2cqi,12px)', flexShrink: 0, marginTop: 'clamp(6px,1.7cqi,10px)' }}>
        <div style={{ fontFamily: BRAND_SERIF, fontWeight: 400, fontSize: 'clamp(18px,5cqi,29px)', letterSpacing: '-.01em', lineHeight: 1, color: SHELL }}>{sc.cardsTitle}</div>
        <span style={{ fontFamily: SANS, fontSize: 'clamp(8.5px,1.9cqi,12px)', color: 'rgba(247,236,221,.75)', whiteSpace: 'nowrap' }}>{sc.ask}</span>
      </div>
      {/* three treatment cards */}
      <div className="marazul-spa-cards" style={{ display: 'flex', gap: 'clamp(6px,1.5cqi,11px)', marginTop: 'clamp(7px,1.8cqi,12px)', flex: 1, minHeight: 0 }}>
        {sc.cards?.map((c) => (
          <div className="marazul-spa-card" key={c.name} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', borderRadius: 'clamp(9px,2cqi,13px)', overflow: 'hidden', background: c.featured ? 'linear-gradient(180deg, rgba(217,122,79,.1), rgba(247,236,221,.055))' : 'rgba(247,236,221,.055)', border: `1px solid ${c.featured ? 'rgba(217,122,79,.72)' : 'rgba(134,185,183,.19)'}`, boxShadow: c.featured ? '0 12px 32px rgba(2,17,19,.28), inset 0 1px 0 rgba(247,236,221,.05)' : 'inset 0 1px 0 rgba(247,236,221,.025)' }}>
            {/* The image is absolute for clean cropping, so its wrapper needs a
                real floor. Device-relative sizing keeps the photographs visible
                in the compact homepage tablet without crowding the voice bar. */}
            <div className="marazul-spa-image" style={{ position: 'relative', flex: '0 0 clamp(68px,17cqi,116px)', overflow: 'hidden' }}>
              <Image alt={c.name} src={c.image} width={360} height={260} sizes="(max-width: 767px) 30vw, 220px" quality={68} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,25,28,.02) 0%, transparent 46%, rgba(3,22,25,.38) 100%), linear-gradient(90deg, rgba(6,31,36,.12), transparent 58%)' }} />
              {c.badge && <span style={{ position: 'absolute', top: 'clamp(5px,1.4cqi,8px)', right: 'clamp(5px,1.4cqi,8px)', ...MONO, fontSize: 'clamp(7px,1.55cqi,9px)', letterSpacing: '.07em', color: CARIBBEAN_INK, background: SHELL_GOLD, boxShadow: '0 5px 16px rgba(2,17,19,.22)', borderRadius: 999, padding: 'clamp(3px,.7cqi,4px) clamp(6px,1.5cqi,9px)' }}>{c.badge}</span>}
            </div>
            <div className="marazul-spa-card-copy" style={{ padding: 'clamp(6px,1.45cqi,10px)', display: 'flex', flex: 1, minHeight: 0, flexDirection: 'column', gap: 'clamp(4px,1cqi,7px)' }}>
              <div>
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(10px,2.3cqi,13.5px)', lineHeight: 1.12, color: SHELL }}>{c.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 'clamp(7.5px,1.75cqi,10.5px)', lineHeight: 1.2, color: 'rgba(247,236,221,.6)', marginTop: 'clamp(2px,.6cqi,4px)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.meta}</div>
              </div>
              <span style={{ marginTop: 'auto', fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(8px,1.8cqi,11px)', lineHeight: 1, textAlign: 'center', color: c.featured ? CARIBBEAN_INK : SHELL, background: c.featured ? CORAL : 'rgba(134,185,183,.06)', border: c.featured ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(134,185,183,.48)', borderRadius: 'clamp(6px,1.4cqi,8px)', padding: 'clamp(6px,1.25cqi,8px) 0' }}>{sc.reserve}</span>
            </div>
          </div>
        ))}
      </div>
      {/* companion note */}
      {sc.note && (
        <div className="marazul-spa-note" style={{ flexShrink: 0, marginTop: 'clamp(6px,1.5cqi,10px)', fontFamily: SANS, fontSize: 'clamp(8px,1.9cqi,12px)', lineHeight: 1.3, color: 'rgba(247,236,221,.82)', border: '1px solid rgba(134,185,183,.18)', background: 'linear-gradient(90deg, rgba(134,185,183,.07), rgba(134,185,183,.035))', borderRadius: 'clamp(8px,1.8cqi,11px)', padding: 'clamp(7px,1.5cqi,10px) clamp(9px,2cqi,14px)' }}>{sc.note}</div>
      )}
    </div>
  )
}
