'use client'

import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { CompanionTablet } from '@/components/v5/CompanionTablet'
import { SuiteShowcase } from '@/components/v5/SuiteShowcase'
import { QuestionMarquee } from '@/components/cds/QuestionMarquee'
import {
  FragmentationDiagram,
  IntelligenceLayerDiagram,
  ProcessDiagram,
} from '@/components/editorial/TechnicalDiagrams'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useCopy } from '@/lib/i18n/useCopy'
import { homeCopy } from '@/lib/i18n/marketing/home'
import { intelLayerCopy } from '@/lib/i18n/marketing/intelLayer'
import './home-editorial.css'

const COPY = {
  en: {
    skip: 'Skip to main content',
    hero: {
      eyebrow: 'The hospitality layer for hotel brands',
      title: 'The stay', titleEm: 'remembers.',
      lede: 'One conversation for booking, arrival, every request and the return — personal before the guest arrives, and useful long after they leave.',
      request: 'Request a demo', see: 'See the guest journey',
      time: '15:42 · Arrival', question: '“The ocean-view suite. Like last time?”',
      answerLead: 'Welcome back, Maya.', answer: 'It is ready now — and your sunrise yoga mat is already upstairs.',
      label: 'Guided demo · Demo property · Sample data',
      imageAlt: 'An intimate limestone resort beside an infinity pool and the Caribbean Sea',
      strip: ['Direct bookings', 'Verified service', 'Guest memory', 'Revenue with taste', 'English & Spanish'],
    },
    leaks: {
      eyebrow: '02 · Four leaks, every stay', title: 'You already know them.', titleEm: 'Nobody has connected them for you.',
      context: 'Industry context', stakeLabel: 'AI value at stake', distributionLabel: 'Distribution economics',
      items: [
        { time: '08:14', title: 'The booking that went OTA', body: 'A ready guest met a generic answer.' },
        { time: '15:42', title: 'The upgrade never offered', body: 'The reason was obvious. The context was not.' },
        { time: '02:07', title: 'The request nobody owned', body: '“Sent” was mistaken for resolved.' },
        { time: 'NEXT', title: 'The returning guest who starts over', body: 'The hotel knew. The experience forgot.' },
      ],
      close: 'Hotel Companion closes each gap — and preserves the proof.', cta: 'The founding hotel program →',
    },
    journey: {
      eyebrow: '03 · One stay, one voice', title: 'From “we just landed”', titleEm: 'to “welcome back.”',
      productLead: 'Follow the guest from discovery to a confirmed stay. The same context carries through every decision, handoff and revenue moment.',
      firstKicker: 'Direct', first: 'The guest books with the hotel — not around it.',
      quote: 'We land at three. Can the room be ready?', quoteBody: 'Arrival time becomes context the whole hotel can use.',
      chip: 'Arrival · preference · permission',
      thirdKicker: 'Revenue', third: 'The right addition, offered with taste — not pressure.',
    },
    loop: {
      eyebrow: '05 · Two in the morning', title: 'Sent is not', titleEm: 'resolved.',
      body: 'The Companion keeps the guest informed until the hotel verifies the outcome.',
      cardEyebrow: '02:07 · Room 214', quote: 'The air conditioning stopped.', cardLabel: 'Guided demonstration · Sample workflow',
      reply: 'I’m sorry, Maya. Engineering has accepted the request. Rafael is on the way, and I’ll stay with it until the room is comfortable again.',
      deviceLabel: 'MARAZUL · SUITE 214', ticketTag: 'ENGINEERING REQUEST', ticketStatus: 'LIVE',
      steps: [
        { name: 'Understood', detail: 'The request is grounded in the room, the stay and the property’s real service capability.' },
        { name: 'Accepted', detail: 'Engineering accepts ownership. The guest sees a promise the hotel can actually keep.' },
        { name: 'In progress', detail: 'Rafael is on the way. Status comes from the work—not from a generated reassurance.' },
        { name: 'Completed', detail: 'Engineering records the work as complete and returns operational evidence.' },
        { name: 'Verified', detail: 'Maya confirms the room is comfortable. Only now does the request become resolved.' },
      ],
    },
    revenue: {
      eyebrow: '05 · Revenue that feels like hospitality', title: 'The right offer', titleEm: 'feels like service.',
      body: 'Useful first. Timely by design. Measured without turning the stay into a sales funnel.',
      cards: [
        { time: '08:14', label: 'Direct booking', title: 'The room they wanted.', detail: 'No OTA in between.' },
        { time: '15:42', label: 'Suite', title: 'More space when it matters.', detail: 'An upgrade shaped around the stay.' },
        { time: '19:10', label: 'Experience', title: 'A table by the water.', detail: 'Recommended at the right moment.' },
      ],
      note: 'Illustrative moments · Availability and price are always verified before an offer',
    },
    morning: {
      eyebrow: '06 · The morning briefing', title: 'What happened.', titleEm: 'What was verified.', titleLast: 'Where the hotel grows.',
      body: 'Every conversation becomes a briefing the team can act on — and context that makes the next stay better.',
      briefTitle: 'Morning briefing', briefScope: 'Sample · Demo property',
      k1: 'What changed', v1: 'Late-arrival dining requests are clustering after the kitchen closes.',
      k2: 'What was verified', v2: 'Front desk recovered the requests with a simple cold menu.',
      k3: 'Recommended', v3: 'Create a verified late-arrival menu and test it for one week.',
      label: 'Illustrative · Sample insight', proof: ['White-label', 'Works with your stack', 'Secure by design', 'Measured from day one'], trust: 'Trust center →',
    },
    systems: {
      flowTitle: 'REQUEST → OUTCOME', flowMeta: '06 MOVEMENTS · ONE CONTINUOUS LOOP',
      flowLoop: 'VERIFIED OUTCOME → A SHARPER NEXT ANSWER', flowCaption: 'THE OPERATING LOGIC BEHIND EVERY GUEST MOMENT',
      fragmentedTitle: 'CURRENT STATE · FRAGMENTED CONTEXT', fragmentedMeta: '08 SYSTEMS · 01 GUEST',
      layerTitle: 'TARGET STATE · SHARED CONTEXT', layerMeta: '01 LAYER · EVERY TEAM',
      systemsLabel: 'HOTEL SYSTEMS & TEAMS', layerCaption: 'ONE CONTEXT · SHARED ACROSS THE STAY',
      transition: 'From scattered signals to one accountable operating context',
    },
    close: {
      eyebrow: 'A private introduction', title: 'See your hotel', titleEm: 'remember.',
      body: 'A working session with your team — the guest journey, the service loop and the commercial logic, under your name.',
      request: 'Request a demo', pilot: 'The founding hotel program',
      imageAlt: 'A candlelit Caribbean boutique hotel courtyard at blue hour',
    },
  },
  es: {
    skip: 'Saltar al contenido principal',
    hero: {
      eyebrow: 'La capa de hospitalidad para marcas hoteleras',
      title: 'La estancia', titleEm: 'recuerda.',
      lede: 'Una conversación para reservar, llegar, pedir y volver — personal antes de la llegada, y útil mucho después de partir.',
      request: 'Solicita una demo', see: 'Mira la experiencia',
      time: '15:42 · Llegada', question: '“La suite con vista al mar. ¿Como la última vez?”',
      answerLead: 'Qué gusto verte de nuevo, Maya.', answer: 'Ya está lista — y tu tapete para yoga al amanecer te espera arriba.',
      label: 'Demo guiada · Propiedad demo · Datos de muestra',
      imageAlt: 'Un resort íntimo de piedra caliza junto a una alberca infinita y el mar Caribe',
      strip: ['Reservas directas', 'Servicio verificado', 'Memoria del huésped', 'Ingresos con buen gusto', 'Español e inglés'],
    },
    leaks: {
      eyebrow: '02 · Cuatro fugas, cada estancia', title: 'Ya las conoces.', titleEm: 'Nadie las ha conectado por ti.',
      context: 'Contexto del sector', stakeLabel: 'Valor potencial de la IA', distributionLabel: 'Economía de distribución',
      items: [
        { time: '08:14', title: 'La reserva que terminó en una OTA', body: 'Un huésped listo encontró una respuesta genérica.' },
        { time: '15:42', title: 'La mejora que nadie ofreció', body: 'La razón era obvia. El contexto no.' },
        { time: '02:07', title: 'La solicitud sin dueño', body: 'Se confundió “enviado” con resuelto.' },
        { time: 'SIG.', title: 'El huésped que vuelve a empezar', body: 'El hotel sabía. La experiencia olvidó.' },
      ],
      close: 'Hotel Companion cierra cada brecha — y conserva la evidencia.', cta: 'El programa para hoteles fundadores →',
    },
    journey: {
      eyebrow: '03 · Una estancia, una sola voz', title: 'De “acabamos de aterrizar”', titleEm: 'a “qué gusto verte de nuevo.”',
      productLead: 'Sigue al huésped desde el descubrimiento hasta una estancia confirmada. El mismo contexto acompaña cada decisión, relevo y momento de ingreso.',
      firstKicker: 'Directo', first: 'El huésped reserva con el hotel — no alrededor de él.',
      quote: 'Llegamos a las tres. ¿Puede estar lista la habitación?', quoteBody: 'La hora de llegada se vuelve contexto para todo el hotel.',
      chip: 'Llegada · preferencia · permiso',
      thirdKicker: 'Ingresos', third: 'La adición correcta, ofrecida con gusto — no con presión.',
    },
    loop: {
      eyebrow: '05 · Dos de la mañana', title: 'Enviado no es', titleEm: 'resuelto.',
      body: 'El Companion mantiene informado al huésped hasta que el hotel verifica el resultado.',
      cardEyebrow: '02:07 · Habitación 214', quote: 'El aire acondicionado dejó de funcionar.', cardLabel: 'Demostración guiada · Flujo de muestra',
      reply: 'Lo siento, Maya. Mantenimiento ya aceptó la solicitud. Rafael va en camino y seguiré contigo hasta que la habitación vuelva a estar cómoda.',
      deviceLabel: 'MARAZUL · SUITE 214', ticketTag: 'SOLICITUD DE MANTENIMIENTO', ticketStatus: 'EN VIVO',
      steps: [
        { name: 'Entendido', detail: 'La solicitud se vincula con la habitación, la estancia y la capacidad real de la propiedad.' },
        { name: 'Aceptado', detail: 'Mantenimiento acepta la responsabilidad. El huésped ve una promesa que el hotel puede cumplir.' },
        { name: 'En progreso', detail: 'Rafael va en camino. El estado viene del trabajo, no de una tranquilidad generada.' },
        { name: 'Completado', detail: 'Mantenimiento registra el trabajo como completo y devuelve evidencia operativa.' },
        { name: 'Verificado', detail: 'Maya confirma que la habitación está cómoda. Solo entonces queda resuelta la solicitud.' },
      ],
    },
    revenue: {
      eyebrow: '05 · Ingresos que se sienten como hospitalidad', title: 'La oferta correcta', titleEm: 'se siente como servicio.',
      body: 'Útil primero. Oportuna por diseño. Medida sin convertir la estancia en un embudo de ventas.',
      cards: [
        { time: '08:14', label: 'Reserva directa', title: 'La habitación que querían.', detail: 'Sin una OTA de por medio.' },
        { time: '15:42', label: 'Suite', title: 'Más espacio cuando importa.', detail: 'Una mejora pensada para la estancia.' },
        { time: '19:10', label: 'Experiencia', title: 'Una mesa junto al mar.', detail: 'Recomendada en el momento preciso.' },
      ],
      note: 'Momentos ilustrativos · Disponibilidad y precio siempre se verifican antes de ofrecer',
    },
    morning: {
      eyebrow: '06 · El informe de la mañana', title: 'Qué pasó.', titleEm: 'Qué se verificó.', titleLast: 'Dónde crece el hotel.',
      body: 'Cada conversación se convierte en un informe accionable — y en contexto que mejora la siguiente estancia.',
      briefTitle: 'Informe matutino', briefScope: 'Muestra · Propiedad demo',
      k1: 'Qué cambió', v1: 'Las solicitudes de cena de llegadas tardías se concentran después del cierre de cocina.',
      k2: 'Qué se verificó', v2: 'Recepción recuperó las solicitudes con un menú frío sencillo.',
      k3: 'Recomendación', v3: 'Crear un menú verificado para llegadas tardías y probarlo durante una semana.',
      label: 'Ilustrativo · Insight de muestra', proof: ['White-label', 'Funciona con tus sistemas', 'Seguro por diseño', 'Medido desde el primer día'], trust: 'Centro de confianza →',
    },
    systems: {
      flowTitle: 'SOLICITUD → RESULTADO', flowMeta: '06 MOVIMIENTOS · UN CICLO CONTINUO',
      flowLoop: 'RESULTADO VERIFICADO → UNA MEJOR SIGUIENTE RESPUESTA', flowCaption: 'LA LÓGICA OPERATIVA DETRÁS DE CADA MOMENTO',
      fragmentedTitle: 'ESTADO ACTUAL · CONTEXTO FRAGMENTADO', fragmentedMeta: '08 SISTEMAS · 01 HUÉSPED',
      layerTitle: 'ESTADO OBJETIVO · CONTEXTO COMPARTIDO', layerMeta: '01 CAPA · CADA EQUIPO',
      systemsLabel: 'SISTEMAS Y EQUIPOS DEL HOTEL', layerCaption: 'UN CONTEXTO · COMPARTIDO EN TODA LA ESTANCIA',
      transition: 'De señales dispersas a un contexto operativo único y responsable',
    },
    close: {
      eyebrow: 'Una presentación privada', title: 'Mira a tu hotel', titleEm: 'recordar.',
      body: 'Una sesión de trabajo con tu equipo — la experiencia del huésped, el ciclo de servicio y la lógica comercial, bajo tu nombre.',
      request: 'Solicita una demo', pilot: 'El programa para hoteles fundadores',
      imageAlt: 'El patio de un hotel boutique caribeño iluminado con velas durante la hora azul',
    },
  },
} as const

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="hc-eyebrow">{children}</span>
}

export default function HomeEditorialClient() {
  const { lang } = useLang()
  const c = COPY[lang]
  const original = useCopy(homeCopy)
  const layer = useCopy(intelLayerCopy)

  return (
    <div className="hc-stay">
      <a className="ed-skip-link" href="#main-content">{c.skip}</a>
      <SiteNav appearance="light" />

      <main id="main-content">
      <section className="hc-hero" aria-labelledby="hc-hero-title">
        <div className="hc-wrap hc-hero-grid">
          <div className="hc-hero-copy">
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 id="hc-hero-title">{c.hero.title}<br /><em>{c.hero.titleEm}</em></h1>
            <p className="hc-lede">{c.hero.lede}</p>
            <div className="hc-actions">
              <Link className="hc-button hc-button-solid" href="/demo">{c.hero.request}</Link>
              <a className="hc-button hc-button-quiet" href="#guest-journey">{c.hero.see}</a>
            </div>
          </div>
          <div className="hc-hero-photo">
            <Image src="/assets/lux/hotel-companion-hero-v2.webp" alt={c.hero.imageAlt} fill priority fetchPriority="high" sizes="(max-width: 920px) 100vw, 58vw" style={{ objectFit: 'cover' }} />
            <div className="hc-hero-device"><CompanionTablet variant="home" /><small className="hc-product-disclosure">{c.hero.label}</small></div>
          </div>
        </div>
        <div className="hc-wrap"><ul className="hc-proof-strip">{c.hero.strip.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="hc-questions" id="questions" aria-labelledby="hc-questions-title">
        <div className="hc-question-heading">
          <Eyebrow>{original.marquee.eyebrow}</Eyebrow>
          <h2 id="hc-questions-title">{original.marquee.statement}</h2>
        </div>
        <QuestionMarquee />
        <a className="hc-question-cue" href="#how-it-works">
          <span>{original.howItWorks.eyebrow}</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="hc-act hc-leaks" aria-labelledby="hc-leaks-title">
        <div className="hc-wrap">
          <Eyebrow>{c.leaks.eyebrow}</Eyebrow>
          <h2 id="hc-leaks-title">{c.leaks.title}<br /><em>{c.leaks.titleEm}</em></h2>
          <ol className="hc-leak-grid">{c.leaks.items.map((item) => <li key={item.time + item.title}><span className="hc-time">{item.time}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
          <aside className="hc-benchmark-rail" aria-label={c.leaks.context}>
            <div className="hc-benchmark-heading"><span>{c.leaks.context}</span><i aria-hidden="true" /></div>
            <article>
              <small>{c.leaks.stakeLabel}</small>
              <strong>{original.stake.figure}</strong>
              <p>{original.stake.caption}</p>
              <cite>{original.stake.source}</cite>
            </article>
            <article>
              <small>{c.leaks.distributionLabel}</small>
              <strong>{original.otaStake.figure}</strong>
              <p>{original.otaStake.caption}</p>
              <div className="hc-benchmark-bars" aria-hidden="true">
                {original.otaStake.compare.map((entry) => (
                  <span key={entry.label} style={{ '--benchmark-width': `${Math.max(entry.pct * 3.1, 24)}%` } as React.CSSProperties}>
                    <i className={entry.accent ? 'is-accent' : ''} />
                  </span>
                ))}
              </div>
              <cite>{original.otaStake.source}</cite>
            </article>
          </aside>
          <p className="hc-section-close">{c.leaks.close} <Link href="/contact#founding">{c.leaks.cta}</Link></p>
        </div>
      </section>

      <section className="hc-act hc-how" id="how-it-works" aria-labelledby="hc-how-title">
        <div className="hc-wrap">
          <div className="hc-technical-intro">
            <div>
              <Eyebrow>{original.howItWorks.eyebrow}</Eyebrow>
              <h2 id="hc-how-title">{original.howItWorks.statement}</h2>
            </div>
            <p>{original.howItWorks.lead}</p>
          </div>
          <div className="hc-technical-figure">
            <ProcessDiagram
              labels={{ title: c.systems.flowTitle, meta: c.systems.flowMeta, caption: c.systems.flowCaption }}
              steps={original.howItWorks.steps}
              loop={c.systems.flowLoop}
            />
          </div>
        </div>
      </section>

      <section className="hc-act hc-journey" id="guest-journey" aria-labelledby="hc-journey-title">
        <div className="hc-wrap">
          <div className="hc-product-head">
            <div>
              <Eyebrow>{c.journey.eyebrow}</Eyebrow>
              <h2 id="hc-journey-title">{c.journey.title}<br /><em>{c.journey.titleEm}</em></h2>
            </div>
            <p>{c.journey.productLead}</p>
          </div>
          <div className="hc-suite-product"><SuiteShowcase /></div>
        </div>
      </section>

      <section className="hc-act hc-systems" aria-labelledby="hc-fragmentation-title">
        <div className="hc-wrap">
          <div id="fragmentation" className="hc-system-proof">
            <div className="hc-technical-intro">
              <div>
                <Eyebrow>{original.fragmentation.eyebrow}</Eyebrow>
                <h2 id="hc-fragmentation-title">{original.fragmentation.statementPre}<em>{original.fragmentation.statementHi}</em></h2>
              </div>
              <p>{original.fragmentation.deck}</p>
            </div>
            <div className="hc-technical-figure">
              <FragmentationDiagram
                labels={{
                  title: c.systems.fragmentedTitle,
                  meta: c.systems.fragmentedMeta,
                  caption: original.fragmentation.position,
                }}
                center={original.fragmentation.center}
                systems={original.fragmentation.systems}
                markers={original.fragmentation.markers}
              />
            </div>
          </div>

          <div id="intelligent-layer" className="hc-system-proof hc-system-proof-layer">
            <div className="hc-system-transition" aria-hidden="true"><span>{c.systems.transition}</span><i /></div>
            <div className="hc-technical-intro">
              <div>
                <Eyebrow>{layer.eyebrow}</Eyebrow>
                <h2>{layer.h2Pre}<em>{layer.h2Hi}</em></h2>
              </div>
              <p>{layer.body}</p>
            </div>
            <div className="hc-technical-figure">
              <IntelligenceLayerDiagram
                labels={{
                  title: c.systems.layerTitle,
                  meta: c.systems.layerMeta,
                  caption: c.systems.layerCaption,
                }}
                guest={layer.guest}
                node={layer.center}
                nodeSub={layer.centerSub}
                systemsLabel={c.systems.systemsLabel}
                systems={layer.systems}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hc-close" aria-labelledby="hc-close-title">
        <Image src="/assets/lux/hotel-companion-closing-blue-hour-v2.webp" alt={c.close.imageAlt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className="hc-close-scrim" />
        <div className="hc-wrap hc-close-copy"><Eyebrow>{c.close.eyebrow}</Eyebrow><h2 id="hc-close-title">{c.close.title}<br /><em>{c.close.titleEm}</em></h2><p>{c.close.body}</p><div className="hc-actions"><Link className="hc-button hc-button-solid" href="/demo">{c.close.request}</Link><Link className="hc-button hc-button-quiet hc-button-light" href="/contact#founding">{c.close.pilot}</Link></div></div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
