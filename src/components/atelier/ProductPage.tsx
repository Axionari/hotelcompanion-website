'use client'

import Image from 'next/image'
import { useState, useSyncExternalStore } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, AudioLines, Bookmark, Check, Globe2, MessageCircle, Phone, Smartphone, Tablet, Users } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { OutcomeDemo } from '@/components/experience/OutcomeDemo'
import { guestCapture } from '@/components/experience/ProductCapture'
import { Button, Label, SectionHead, Wave, photos, useText } from './Atelier'
import './product-page.css'

const featureIds = ['voice', 'recommendations', 'memory', 'team-control', 'connections'] as const
type Feature = typeof featureIds[number]
function readFeature(): Feature {
  const value = window.location.hash.slice(1)
  return featureIds.includes(value as Feature) ? value as Feature : 'recommendations'
}
function subscribeFeature(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
const serverFeature = (): Feature => 'recommendations'

function ConnectionStory() {
  const t = useText()
  return <div className="ap-connections">
    <div className="ap-connection-inputs"><span><MessageCircle size={17}/>{t('Guest conversation', 'Conversación del huésped')}</span><span><Bookmark size={17}/>{t('Useful context', 'Contexto útil')}</span><span><Check size={17}/>{t('Your hotel’s rules', 'Las reglas de tu hotel')}</span></div>
    <ArrowDown className="ap-connector" size={23}/>
    <div className="ap-connection-hub"><span className="at-seal">hc</span><h3>Hotel Companion</h3><p>{t('The right next step, with the context to take it.', 'El siguiente paso, con el contexto para darlo.')}</p></div>
    <div className="ap-connection-branches">
      <div><ArrowDown size={22}/><Users size={24}/><h4>{t('Your people', 'Tu equipo')}</h4><p>{t('Requests reach the right team. Ownership, updates and resolution stay together.', 'Las solicitudes llegan al equipo indicado. Responsables, avances y resolución permanecen juntos.')}</p></div>
      <div><ArrowDown size={22}/><Globe2 size={24}/><h4>{t('Your systems', 'Tus sistemas')}</h4><p>{t('PMS, POS and payment connections support the actions agreed for your hotel.', 'Las conexiones PMS, POS y pagos respaldan las acciones acordadas para tu hotel.')}</p></div>
    </div>
    <Link className="at-text-link" href="/implementation#connections">{t('See the staged rollout', 'Ver la implementación por etapas')}<ArrowUpRight size={16}/></Link>
  </div>
}

function VoiceStory() {
  const t = useText(), { lang } = useLang()
  return <div className="ap-voice-story">
    <div className="ap-voice-guest"><span><Phone size={18}/>{t('A guest calls', 'Un huésped llama')}</span><blockquote>{t('“We’re coming for our anniversary. I’d love an ocean view, but somewhere quiet.”', '«Venimos por nuestro aniversario. Me gustaría una vista al mar, pero en un lugar tranquilo.»')}</blockquote><Wave/><small>{t('One request. Several things that matter.', 'Una solicitud. Varios detalles que importan.')}</small></div>
    <div className="ap-voice-understood"><Label>{t('The conversation keeps its meaning', 'La conversación conserva su sentido')}</Label><h3>{t('Listen to the person.\nUnderstand the occasion.', 'Escucha a la persona.\nEntiende la ocasión.')}</h3><div className="ap-context-tags"><span>{t('Anniversary', 'Aniversario')}</span><span>{t('Ocean view', 'Vista al mar')}</span><span>{t('A quiet room', 'Una habitación tranquila')}</span></div><p>{t('Carry those details into the next recommendation. When the conversation turns to dinner or an airport pickup, the companion keeps the thread.', 'Lleva esos detalles a la siguiente recomendación. Cuando la conversación pasa a una cena o un traslado, el companion conserva el hilo.')}</p><div className="ap-audio"><span><AudioLines size={18}/>{t('Hear the conversation', 'Escucha la conversación')}</span><audio controls preload="none" src={`/assets/experience/voice-${lang}.mp3`} aria-label={t('Hotel Companion voice conversation', 'Conversación por voz con Hotel Companion')}/></div></div>
  </div>
}

/** A single, stable product stage. Every film uses the captured application. */
function FeatureExplorer() {
  const t = useText(), { lang } = useLang()
  const active = useSyncExternalStore(subscribeFeature, readFeature, serverFeature)
  const [run, setRun] = useState(0)
  const [teamView, setTeamView] = useState<'guest' | 'team'>('team')
  const features = [
    { id: 'voice' as const, label: t('Voice & text', 'Voz y texto'), title: t('Say it naturally.\nOr simply type.', 'Dilo naturalmente.\nO simplemente escribe.'), body: t('Guests tell you what they need. Your companion understands the request and helps them move forward, in a natural conversation.', 'El huésped dice lo que necesita. Tu companion entiende la solicitud y le ayuda a avanzar en una conversación natural.') },
    { id: 'recommendations' as const, label: t('Recommendations', 'Recomendaciones'), title: t('The right offer.\nFor the right reason.', 'La oferta adecuada.\nPor la razón correcta.'), body: t('A private terrace. A quieter room. More space for two. Turn what matters to the guest into a relevant choice from your hotel’s own offers.', 'Una terraza privada. Una habitación tranquila. Más espacio para dos. Convierte lo que importa al huésped en una opción relevante de las ofertas de tu hotel.') },
    { id: 'memory' as const, label: t('Guest memory', 'Memoria del huésped'), title: t('A new reservation.\nA familiar welcome.', 'Una nueva reserva.\nUna bienvenida familiar.'), body: t('Remember the room they loved, the experiences they enjoyed and the preferences they shared. Begin the next visit with a more personal conversation.', 'Recuerda la habitación que les encantó, las experiencias que disfrutaron y las preferencias que compartieron. Empieza su próxima visita con una conversación más personal.') },
    { id: 'team-control' as const, label: t('Team control', 'Control del equipo'), title: t('Every request.\nA clear next step.', 'Cada solicitud.\nUn siguiente paso claro.'), body: t('The guest’s words reach the right people. Your team takes ownership, records progress and closes the loop with the guest.', 'Las palabras del huésped llegan a las personas indicadas. Tu equipo se hace cargo, registra avances y cierra el ciclo con el huésped.') },
    { id: 'connections' as const, label: t('Connections', 'Conexiones'), title: t('Fit your operation.\nKeep your standards.', 'Encaja en tu operación.\nConserva tus estándares.'), body: t('Bring guest conversations, hotel knowledge and your operational tools together. Start with the team; add system connections in a deliberate rollout.', 'Reúne conversaciones, conocimiento del hotel y herramientas operativas. Empieza con el equipo y añade conexiones por etapas.') },
  ]
  const current = features.find(feature => feature.id === active)!
  function choose(feature: Feature) {
    window.history.replaceState(window.history.state, '', `#${feature}`)
    window.dispatchEvent(new Event('hashchange'))
    setRun(value => value + 1)
  }
  function focusTab(index: number) {
    const feature = features[(index + features.length) % features.length]
    choose(feature.id)
    document.getElementById(`ap-tab-${feature.id}`)?.focus({ preventScroll: true })
  }
  return <section className="ap-explorer" id="platform-model">
    <div className="ap-feature-anchors" aria-hidden="true">{featureIds.map(id => <span id={id} key={id}/>)}</div>
    <div className="ap-feature-navigation"><div className="at-wrap ap-feature-tabs" role="tablist" aria-label={t('Explore product features', 'Explora las funciones del producto')}>{features.map((feature, index) => <button key={feature.id} id={`ap-tab-${feature.id}`} type="button" role="tab" aria-selected={feature.id === active} aria-controls="ap-feature-panel" tabIndex={feature.id === active ? 0 : -1} onClick={() => choose(feature.id)} onKeyDown={event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); focusTab(index + (event.key === 'ArrowRight' ? 1 : -1)) }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); focusTab(event.key === 'Home' ? 0 : features.length - 1) }
    }}><small>0{index + 1}</small>{feature.label}<ArrowUpRight size={15}/></button>)}</div></div>
    <div className="at-wrap ap-feature-panel" id="ap-feature-panel" role="tabpanel" aria-labelledby={`ap-tab-${active}`} data-feature={active}>
      <div className="ap-feature-copy">
        <div className="ap-feature-heading" key={active}><div><Label>{current.label}</Label><h2>{current.title}</h2></div><p>{current.body}</p></div>
        {active !== 'voice' && active !== 'connections' && <div className="ap-feature-takeaways">{(active === 'memory' ? [t('Previous stay', 'Estancia anterior'), t('Useful preferences', 'Preferencias útiles'), t('A new choice', 'Una nueva elección')] : active === 'team-control' ? [t('Context stays with the request', 'El contexto acompaña la solicitud'), t('An owner at every step', 'Un responsable en cada paso'), t('Progress the guest can follow', 'Avances que el huésped puede seguir')] : [t('Understand what matters', 'Entender lo que importa'), t('Match your approved offers', 'Relacionar tus ofertas aprobadas'), t('Prepare the next step', 'Preparar el siguiente paso')]).map((item, index) => <span key={item}><small>0{index + 1}</small>{item}{index < 2 && <ArrowRight size={15}/>}</span>)}</div>}
        {active === 'team-control' && <div className="ap-perspectives" role="group" aria-label={t('Choose a perspective', 'Elige una perspectiva')}><span>{t('Follow the same request', 'Sigue la misma solicitud')}</span><button type="button" aria-pressed={teamView === 'guest'} onClick={() => { setTeamView('guest'); setRun(value => value + 1) }}><MessageCircle size={15}/>{t('Guest view', 'Vista del huésped')}</button><button type="button" aria-pressed={teamView === 'team'} onClick={() => { setTeamView('team'); setRun(value => value + 1) }}><Users size={15}/>{t('Team view', 'Vista del equipo')}</button></div>}
      </div>
      <div className="ap-feature-stage">
        {active === 'voice' ? <VoiceStory/> : active === 'connections' ? <ConnectionStory/> : <div className="ap-authentic-film"><OutcomeDemo key={`${active}-${run}-${teamView}-${lang}`} outcome={active === 'memory' ? 3 : active === 'team-control' ? teamView === 'team' ? 2 : 1 : 0} lang={lang}/></div>}
      </div>
    </div>
  </section>
}

function EveryChannel() {
  const t = useText(), { lang } = useLang()
  return <section className="ap-channel-section at-section at-wrap" id="channels">
    <SectionHead label={t('Every channel. One companion.', 'Cada canal. Un companion.')} title={<>{t('Meet guests','Encuentra a tus huéspedes')}<br/><span>{t('where they are.','donde estén.')}</span></>} body={t('A question on your website. A call before arrival. A message during the stay. The conversation belongs wherever the guest feels most at home.', 'Una pregunta en tu web. Una llamada antes de llegar. Un mensaje durante la estancia. La conversación pertenece al canal más cómodo para el huésped.')}/>
    <div className="ap-channel-grid">
      <article className="ap-channel ap-channel-web"><div className="ap-channel-heading"><Globe2 size={21}/><h3>Web</h3><span>01</span></div><p>{t('Turn browsing into a useful conversation around rooms, dining and experiences.', 'Convierte la navegación en una conversación útil sobre habitaciones, gastronomía y experiencias.')}</p><div className="ap-web-capture"><Image src={guestCapture('home', lang)} alt={t('Hotel Companion guest website', 'Web para huéspedes de Hotel Companion')} width={1422} height={1000} sizes="(max-width:700px) 90vw, 58vw"/></div></article>
      <article className="ap-channel ap-channel-mobile"><div className="ap-channel-heading"><Smartphone size={21}/><h3>{t('Mobile', 'Móvil')}</h3><span>02</span></div><p>{t('Your hotel, in their hands. Open a link or scan a QR—no app download.', 'Tu hotel, en sus manos. Un enlace o QR, sin descargar una app.')}</p><div className="ap-mobile-capture"><Image src={guestCapture('home', lang, 'phone')} alt={t('Hotel Companion on mobile', 'Hotel Companion en móvil')} width={433} height={938} sizes="(max-width:700px) 185px, 220px"/></div></article>
      <article className="ap-channel ap-channel-chat"><div className="ap-channel-heading"><MessageCircle size={21}/><h3>Chat</h3><span>03</span></div><p>{t('Ask in your own words. Get a helpful answer and a clear next step.', 'Pregunta con tus propias palabras. Recibe una respuesta útil y un siguiente paso claro.')}</p><blockquote>{t('“A room with a terrace,\nfor the two of us.”', '«Una habitación con terraza,\npara los dos.»')}</blockquote><div className="ap-chat-understood"><Check size={14}/>{t('Private terrace · Two guests', 'Terraza privada · Dos huéspedes')}</div></article>
      <article className="ap-channel ap-channel-voice"><div className="ap-channel-heading"><AudioLines size={21}/><h3>{t('Voice agents', 'Agentes de voz')}</h3><span>04</span></div><p>{t('Natural conversation that understands the intention behind the words.', 'Una conversación natural que entiende la intención detrás de las palabras.')}</p><Wave/><div className="ap-channel-foot">{t('Speak freely. Keep the thread.', 'Habla con naturalidad. Conserva el hilo.')}</div></article>
      <article className="ap-channel ap-channel-telephone"><div className="ap-channel-heading"><Phone size={21}/><h3>{t('Telephone', 'Teléfono')}</h3><span>05</span></div><p>{t('A welcoming first response, with a route to your team when a person is needed.', 'Una primera respuesta atenta, con acceso a tu equipo cuando se necesita una persona.')}</p><div className="ap-call-visual"><span><Phone size={24}/></span><div><strong>{t('Your hotel companion', 'Tu hotel companion')}</strong><small>{t('A conversation, not a phone menu.', 'Una conversación, no un menú telefónico.')}</small></div></div></article>
      <article className="ap-channel ap-channel-whatsapp"><div className="ap-channel-heading"><MessageCircle size={21}/><h3>WhatsApp</h3><span>06</span></div><p>{t('Keep practical details close in the messaging app guests already know.', 'Mantén los detalles prácticos a mano en la aplicación de mensajes que el huésped conoce.')}</p><div className="ap-whatsapp-note"><span>{t('Before arrival', 'Antes de llegar')}</span><blockquote>{t('“Could you help us arrange\nan airport transfer?”', '«¿Nos ayudan a organizar\nun traslado del aeropuerto?»')}</blockquote></div></article>
    </div>
    <div className="ap-tablet-note"><Tablet size={25}/><div><h3>{t('A companion in the room, too.', 'Un companion también en la habitación.')}</h3><p>{t('Optional in-room tablets bring the same service closer, with hardware tailored to your hotel.', 'Tablets opcionales acercan el mismo servicio, con dispositivos adaptados a tu hotel.')}</p></div><Link href="/solutions#channels" className="at-text-link">{t('Explore the guest experience', 'Explora la experiencia del huésped')}<ArrowUpRight size={16}/></Link></div>
  </section>
}

export default function ProductPage() {
  const t = useText()
  return <div className="ap-product">
    <header className="ap-hero at-wrap">
      <div className="ap-hero-copy">
        <Label>{t('The product, thoughtfully connected', 'El producto, conectado con intención')}</Label>
        <h1>{t('One companion.', 'Un companion.')}<br/>{t('The whole stay.', 'Toda la estancia.')}</h1>
        <p>{t('From a guest’s first question to their next visit. Turn natural conversations into relevant offers, personal service and clear next steps for your team.', 'De la primera pregunta del huésped a su próxima visita. Convierte conversaciones naturales en ofertas relevantes, servicio personal y siguientes pasos claros para tu equipo.')}</p>
        <div className="ap-hero-actions"><Link className="at-button" href="#recommendations">{t('Explore the product', 'Explora el producto')}<ArrowDown size={16}/></Link><Link className="at-text-link" href="#channels">{t('Every way in', 'Todos los canales')}<ArrowUpRight size={16}/></Link></div>
        <div className="ap-hero-footnote"><span>01—05</span><p>{t('Five capabilities. One considered experience.', 'Cinco capacidades. Una experiencia bien pensada.')}</p></div>
      </div>
      <figure className="ap-hero-art">
        <div className="ap-hero-photo"><Image src={photos.dining} alt={t('An intimate hotel terrace set for dinner by the sea', 'Una terraza de hotel junto al mar, preparada para cenar')} fill priority sizes="(max-width:700px) 100vw, 50vw"/></div>
        <figcaption><span>{t('HOSPITALITY, IN EVERY DETAIL', 'HOSPITALIDAD EN CADA DETALLE')}</span></figcaption>
        <div className="ap-hero-note"><span>{t('A wish becomes a possibility.', 'Un deseo se convierte en posibilidad.')}</span><p>{t('“Somewhere special\nfor dinner tonight?”', '«¿Un lugar especial\npara cenar esta noche?»')}</p><div><i/>{t('Understood. Recommended. Taken care of.', 'Entendido. Recomendado. Atendido.')}</div></div>
      </figure>
    </header>
    <FeatureExplorer/>
    <EveryChannel/>
    <section className="at-context-close at-wrap" id="pilot"><div><h2>{t('See Hotel Companion at your hotel.', 'Descubre Hotel Companion en tu hotel.')}</h2><p>{t('Your channels, your offers and your team’s workflows, brought together.', 'Tus canales, tus ofertas y los flujos de tu equipo, conectados.')}</p></div><Button>{t('Request a demo', 'Solicita una demo')}</Button></section>
  </div>
}
