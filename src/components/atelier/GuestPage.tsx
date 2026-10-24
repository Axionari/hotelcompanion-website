'use client'

import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, ArrowUpRight, Bookmark, MessageCircle, Phone, Tablet, Users } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { OutcomeDemo } from '@/components/experience/OutcomeDemo'
import { guestCapture } from '@/components/experience/ProductCapture'
import { Closing, Label, photos, useText } from './Atelier'
import './guest-page.css'

type JourneySelection = { index: number; run: number }

function StayJourney({ selection, onChoose }: { selection: JourneySelection; onChoose: (index: number) => void }) {
  const t = useText()
  const { lang } = useLang()
  const id = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const stages = [
    {
      label: t('Before arrival', 'Antes de llegar'),
      promise: t('Find the right stay.', 'Encuentra la estancia ideal.'),
      title: t('A room for the way they want to stay.', 'Una habitación para su forma de viajar.'),
      body: t('A guest asks for a terrace. The companion brings a relevant suite into view and helps prepare the reservation around their dates and plans.', 'Un huésped pide una terraza. El companion presenta una suite relevante y ayuda a preparar la reserva con sus fechas y planes.'),
      outcome: 0,
      steps: [t('Understand the request', 'Entender la solicitud'), t('Explore the room', 'Explorar la habitación'), t('Prepare the reservation', 'Preparar la reserva')],
    },
    {
      label: t('During the stay', 'Durante la estancia'),
      promise: t('Feel taken care of.', 'Sentirse bien atendido.'),
      title: t('Ask once. Follow what happens next.', 'Pregunta una vez. Sigue lo que sucede.'),
      body: t('The air conditioning needs attention. The conversation fills in the request, the team gets the details, and the guest can follow it from received to resolved.', 'El aire acondicionado necesita atención. La conversación completa la solicitud, el equipo recibe los detalles y el huésped puede seguirla desde recibida hasta resuelta.'),
      outcome: 1,
      steps: [t('Capture the details', 'Capturar los detalles'), t('Keep the guest informed', 'Informar al huésped'), t('Record the resolution', 'Registrar la resolución')],
    },
    {
      label: t('On the next visit', 'En la próxima visita'),
      promise: t('Begin somewhere familiar.', 'Volver a algo familiar.'),
      title: t('A new reservation. A familiar welcome.', 'Una nueva reserva. Una bienvenida familiar.'),
      body: t('The previous stay is complete. When the guest returns to book again, the companion recalls their suite, dining, spa and experiences—and the preferences that make the next visit personal.', 'La estancia anterior terminó. Cuando el huésped vuelve a reservar, el companion recuerda su suite, gastronomía, spa y experiencias, además de las preferencias que hacen personal su próxima visita.'),
      outcome: 3,
      steps: [t('Previous completed stay', 'Estancia anterior completada'), t('Preferences remembered', 'Preferencias recordadas'), t('A new reservation begins', 'Comienza una nueva reserva')],
    },
  ]
  const current = stages[selection.index]
  const choose = onChoose
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % stages.length; break
      case 'ArrowLeft': next = (index + stages.length - 1) % stages.length; break
      case 'Home': next = 0; break
      case 'End': next = stages.length - 1; break
      default: return
    }
    event.preventDefault()
    choose(next)
    buttons.current[next]?.focus({ preventScroll: true })
  }

  return <section className="ag-journey" aria-label={t('Follow the guest journey', 'Sigue la experiencia del huésped')}>
    <div className="at-wrap">
      <div className="ag-journey-intro"><div><Label>{t('The experience, in motion', 'La experiencia, en acción')}</Label><h2>{t('Every stay has a story.', 'Cada estancia tiene una historia.')}<br/><span>{t('Follow the conversation.', 'Sigue la conversación.')}</span></h2></div><p>{t('A wish becomes a room choice. A request reaches the team. A return visit begins with recognition. See it happen inside Hotel Companion.', 'Un deseo se convierte en una elección. Una solicitud llega al equipo. Una nueva visita comienza con un recuerdo. Mira cómo sucede dentro de Hotel Companion.')}</p></div>
      <div className="ag-stages" id="guest-journey" role="tablist" aria-label={t('Choose a moment in the stay', 'Elige un momento de la estancia')}>
        {stages.map((stage, index) => <button
          key={stage.outcome}
          ref={element => { buttons.current[index] = element }}
          type="button"
          role="tab"
          id={`${id}-stage-${index}`}
          aria-selected={selection.index === index}
          aria-controls={`${id}-panel`}
          tabIndex={selection.index === index ? 0 : -1}
          onClick={() => choose(index)}
          onKeyDown={event => navigate(event, index)}
        ><span className="ag-stage-number">0{index + 1}</span><span><small>{stage.label}</small><strong>{stage.promise}</strong></span><ArrowUpRight size={18} aria-hidden="true"/></button>)}
      </div>

      <div className="ag-story-panel" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-stage-${selection.index}`} tabIndex={0}>
        <div className="ag-story-copy"><div className="ag-story-heading"><h2>{current.title}</h2><p>{current.body}</p></div><ol className="ag-thread" aria-label={t('The steps in this journey', 'Los pasos de esta experiencia')}>{current.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}{index < current.steps.length - 1 && <ArrowRight size={16} aria-hidden="true"/>}</li>)}</ol></div>
        <div className="ag-film"><OutcomeDemo key={`${current.outcome}-${selection.run}-${lang}`} outcome={current.outcome} lang={lang}/></div>
      </div>
    </div>
  </section>
}

function GuestAccess() {
  const t = useText(), { lang } = useLang()
  const channels = [
    { Icon: Phone, title: t('A call', 'Una llamada'), body: t('A natural voice conversation before arrival or during the stay.', 'Una conversación natural por voz antes de llegar o durante la estancia.') },
    { Icon: MessageCircle, title: t('A link or QR', 'Un enlace o QR'), body: t('Open the hotel’s companion on web or mobile. No app to download.', 'Abre el companion del hotel en web o móvil. Sin descargar una app.') },
    { Icon: Tablet, title: t('In the room', 'En la habitación'), body: t('Optional tablets put the same service within easy reach.', 'Tablets opcionales ponen el mismo servicio al alcance.') },
  ]
  return <section className="ag-access" id="channels"><div className="at-wrap">
    <div className="ag-access-grid"><figure className="ag-access-visual"><div className="ag-access-photo"><Image src={photos.group} alt={t('A welcoming hotel lounge', 'Un acogedor salón de hotel')} fill sizes="(max-width:750px) 90vw, 42vw"/></div><div className="ag-access-phone"><Image src={guestCapture('home', lang, 'phone')} alt={t('Hotel Companion on a guest’s phone', 'Hotel Companion en el teléfono del huésped')} width={433} height={938} sizes="(max-width:750px) 165px, 205px"/></div><figcaption>{t('Your hotel. Within reach.', 'Tu hotel. Al alcance.')}</figcaption></figure>
    <div className="ag-access-heading"><Label>{t('Easy to begin', 'Fácil de empezar')}</Label><h2>{t('A familiar', 'Una forma familiar')}<br/><span>{t('way in.', 'de entrar.')}</span></h2><p>{t('The guest chooses how to ask. The companion keeps the next step clear.', 'El huésped elige cómo preguntar. El companion hace claro el siguiente paso.')}</p><div className="ag-channels">{channels.map(({ Icon, title, body }, index) => <article key={title}><span>0{index + 1}</span><div><h3><Icon size={18} strokeWidth={1.4} aria-hidden="true"/>{title}</h3><p>{body}</p></div></article>)}</div></div></div>
    <div className="ag-care"><div><Users size={24} strokeWidth={1.4} aria-hidden="true"/><h3>{t('Your people remain part of the welcome.', 'Tu equipo sigue siendo parte de la bienvenida.')}</h3></div><p>{t('When a person is needed, the request and its context reach the team. Guests get a clear next step; your people have what they need to help.', 'Cuando se necesita una persona, la solicitud y su contexto llegan al equipo. El huésped conoce el siguiente paso y tu gente tiene lo necesario para ayudar.')}</p></div>
  </div></section>
}

export default function GuestPage() {
  const t = useText()
  const [selection, setSelection] = useState<JourneySelection>({ index: 0, run: 0 })
  const choose = (index: number) => setSelection(previous => ({ index, run: previous.run + 1 }))
  const watch = (index: number) => {
    choose(index)
    document.getElementById('guest-journey')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <div className="ag-guest-page">
    <header className="ag-hero at-wrap"><div className="ag-hero-copy"><Label>{t('The guest experience', 'La experiencia del huésped')}</Label><h1>{t('From first hello', 'Del primer saludo')}<br/><span>{t('to welcome back.', 'a volver a casa.')}</span></h1><p>{t('Help guests find the stay they want, get the care they need and return to a hotel that remembers what they enjoyed.', 'Ayuda a tus huéspedes a encontrar la estancia que desean, recibir la atención que necesitan y volver a un hotel que recuerda lo que disfrutaron.')}</p><button className="ag-watch-button" type="button" onClick={() => watch(0)}>{t('Follow the guest journey', 'Sigue la experiencia del huésped')}<ArrowUpRight size={16}/></button><div className="ag-hero-foot"><span>01 — 03</span><p>{t('One companion, throughout the journey.', 'Un companion, a lo largo de su experiencia.')}</p></div></div>
      <figure className="ag-hero-visual"><div className="ag-hero-photo"><Image src={photos.anniversary} alt={t('A quiet hotel room opening onto a private sea-view terrace', 'Una tranquila habitación de hotel abierta a una terraza frente al mar')} fill priority sizes="(max-width:750px) 95vw, 92vw"/></div><figcaption><Bookmark size={18} strokeWidth={1.35}/><span>{t('THE NEXT VISIT BEGINS HERE', 'LA PRÓXIMA VISITA EMPIEZA AQUÍ')}</span><blockquote>{t('“We loved the room with the terrace. Could we stay again?”', '«Nos encantó la habitación con terraza. ¿Podemos volver?»')}</blockquote><button type="button" onClick={() => watch(2)}>{t('See a returning guest’s journey', 'Ve cómo vuelve un huésped')}<ArrowUpRight size={15}/></button></figcaption></figure>
    </header>
    <div className="ag-chapter-line at-wrap"><span>{t('Before arrival', 'Antes de llegar')}</span><i/><span>{t('During the stay', 'Durante la estancia')}</span><i/><span>{t('The next visit', 'La próxima visita')}</span></div>
    <StayJourney selection={selection} onChoose={choose}/>
    <section className="ag-remember at-wrap"><div className="ag-remember-photos"><div className="ag-remember-dining"><Image src={photos.dining} alt={t('An intimate dinner overlooking the sea', 'Una cena íntima con vista al mar')} fill sizes="(max-width:750px) 80vw, 42vw"/></div><div className="ag-remember-detail"><Image src={photos.anniversary} alt="" fill sizes="(max-width:750px) 35vw, 18vw"/></div><span>{t('The details are the difference.', 'Los detalles hacen la diferencia.')}</span></div><div className="ag-remember-copy"><Label>{t('When the guest returns', 'Cuando el huésped regresa')}</Label><h2>{t('Some things', 'Hay detalles que')}<br/><span>{t('stay with you.', 'se quedan contigo.')}</span></h2><p>{t('The room they loved. The dinner they still talk about. The treatment that helped them unwind. A completed stay gives the next conversation somewhere meaningful to begin.', 'La habitación que les encantó. La cena que aún recuerdan. El tratamiento que les ayudó a descansar. Una estancia completada le da a la próxima conversación un punto de partida significativo.')}</p><div className="ag-memory-thread"><span>{t('A previous stay', 'Una estancia anterior')}</span><ArrowRight size={16}/><span>{t('A personal new beginning', 'Un nuevo comienzo personal')}</span></div><button className="ag-inline-watch" type="button" onClick={() => watch(2)}>{t('Watch the return visit', 'Ve la próxima visita')}<ArrowUpRight size={16}/></button></div></section>
    <GuestAccess/>
    <Closing/>
  </div>
}
