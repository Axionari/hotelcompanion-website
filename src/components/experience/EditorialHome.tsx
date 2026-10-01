'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Heart, Pause, Play } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useLang } from '@/lib/i18n/LanguageContext'
import { Action, Eyebrow, Tabs, useWords } from './Experience'
import { Sequence, useSequence } from './Sequence'
import { ValueScene } from './ValueScene'
import { ConversationThread } from './ConversationThread'
import { conversationStory } from './conversation-stories'
import { ProductCapture } from './ProductCapture'
import './editorial-home.css'

const moments = {
 en: [
  {title:'A reason to add more.',image:'/assets/lux/hotel-companion-hero-v2.webp',ask:'It’s our anniversary. We’d love a special dinner.',reply:'Your hotel’s anniversary offer pairs a terrace dinner with wine. Would you like the price and available times?',result:'Guest occasion → Relevant approved package'},
  {title:'Keep the opportunity alive.',image:'/assets/ui/spa-1.webp',ask:'The full spa day is too much. We only have an hour.',reply:'There’s a 45-minute treatment that fits. Shall I check the price and availability?',result:'Guest need → Alternative → Recorded outcome'},
  {title:'Context makes it personal.',image:'/assets/ui/suite-garden.webp',ask:'We’re coming back. What would you recommend this time?',reply:'You saved a preference for quiet evenings. Would you like to see the private dining options for your dates?',result:'Guest-approved memory → A more relevant recommendation'},
  {title:'Service, around the clock.',image:'/assets/img/company-reception.webp',ask:'Could we have extra towels before dinner?',reply:'I’ve sent your request to housekeeping with the room and timing. I’ll keep you updated.',result:'Guest request → Responsible team'},
 ],
 es: [
  {title:'Una razón para añadir más.',image:'/assets/lux/hotel-companion-hero-v2.webp',ask:'Es nuestro aniversario. Nos gustaría una cena especial.',reply:'La oferta de aniversario del hotel combina una cena en la terraza con vino. ¿Te muestro el precio y los horarios?',result:'Ocasión del huésped → Paquete aprobado relevante'},
  {title:'Conserva la oportunidad.',image:'/assets/ui/spa-1.webp',ask:'El día completo de spa es demasiado. Solo tenemos una hora.',reply:'Hay un tratamiento de 45 minutos que encaja. ¿Consulto el precio y la disponibilidad?',result:'Necesidad → Alternativa → Resultado registrado'},
  {title:'El contexto lo hace personal.',image:'/assets/ui/suite-garden.webp',ask:'Vamos a volver. ¿Qué nos recomiendas esta vez?',reply:'Guardaste tu preferencia por noches tranquilas. ¿Te muestro las opciones de cena privada para tus fechas?',result:'Memoria autorizada → Una recomendación más relevante'},
  {title:'Atención, a cualquier hora.',image:'/assets/img/company-reception.webp',ask:'¿Podrían traer toallas extra antes de cenar?',reply:'Envié tu solicitud a limpieza con la habitación y el horario. Te mantendré informado.',result:'Solicitud del huésped → Equipo responsable'},
 ],
}

export function EditorialHero(){
 const {lang}=useLang(),t=useWords()
 const {attach:heroRef,...playback}=useSequence(4,18000,0,true), active=playback.active, paused=playback.paused
 const moment=moments[lang][active], story=conversationStory('capability',[0,2,1,3][active],lang)
 function move(direction:number){playback.select((active+direction+4)%4)}
 return <section className="eh-hero hc-sequence" data-sequence-duration={playback.duration} data-animate-selection="true" data-paused={paused} ref={heroRef} data-sequence-mode={playback.manual?'manual':'auto'} aria-label={t('Hotel Companion in a guest’s day','Hotel Companion en el día del huésped')}>
  <div className="eh-hero-photo" key={moment.image}><Image src={moment.image} fill sizes="100vw" priority={active===0} loading="eager" alt=""/></div>
  <div className="eh-hero-shade"/>
  <div className="eh-hero-inner">
   <div className="eh-hero-copy"><Eyebrow>{t('TURN GUEST INTEREST INTO HOTEL REVENUE.','CONVIERTE INTERÉS EN INGRESOS PARA TU HOTEL.')}</Eyebrow><h1>{t('Smarter offers.','Mejores ofertas.')}<br/>{t('More revenue.','Más ingresos.')}</h1><p><span className="hc-desktop-copy">{t('Turn guest conversations into relevant upgrades, experiences and packages. Natural voice, useful memory and 24/7 service—with your hotel controlling the offers.','Convierte conversaciones en mejoras, experiencias y paquetes relevantes. Voz natural, memoria útil y atención 24/7, con tu hotel al mando de las ofertas.')}</span><span className="hc-phone-copy">{t('Turn guest conversations into upgrades and experiences. Natural voice, useful memory and 24/7 service. Your hotel sets the rules.','Convierte conversaciones en mejoras y experiencias. Voz natural, memoria útil y atención 24/7. Tu hotel define las reglas.')}</span></p><div className="eh-hero-actions"><Action>{t('Request a demo','Solicita una demo')}</Action><Link href="#guest-experience">{t('Explore the experience','Explora la experiencia')}<ArrowRight size={16}/></Link></div></div>
   <div className="eh-hero-conversation" key={`${lang}-${active}`}><p className="eh-moment-title">{moment.title}</p><ConversationThread messages={story.messages} outcome={story.outcome} voice={active===1}/></div>
   <div className="eh-hero-bottom"><span>{t('Telephone · Web & mobile · In-Room Tablets','Teléfono · Web y móvil · Tablets en la habitación')}</span><div className="eh-hero-controls"><button type="button" onClick={()=>move(-1)} aria-label={t('Previous guest example','Ejemplo anterior')}><ArrowLeft size={16}/></button>{!playback.reduced && <button type="button" onClick={playback.toggle} aria-label={paused?t('Resume guest examples','Reanudar ejemplos'):t('Pause guest examples','Pausar ejemplos')}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>}<button type="button" onClick={()=>move(1)} aria-label={t('Next guest example','Siguiente ejemplo')}><ArrowRight size={16}/></button><span>0{active+1} / 04</span></div><div className="eh-hero-progress" aria-hidden="true">{moments[lang].map((_,i)=><span key={i}><i data-active={active===i}/></span>)}</div></div>
  </div><small className="eh-hero-caption">{t('Illustrative guest scenarios','Escenarios ilustrativos')}</small>
 </section>
}

export function GuestExperienceStage(){
 const {lang}=useLang(),t=useWords(),playback=useSequence(4,18000,0,true),active=playback.active,setActive=playback.select
 const features=[
  {label:t('Smart recommendations','Recomendaciones inteligentes'),title:t('The right offer.\nAt the right moment.','La oferta adecuada.\nEn el momento adecuado.'),body:t('Match upgrades and experiences to the guest’s interests. Your hotel sets prices and margins.','Mejoras y experiencias según los intereses del huésped. Tu hotel define precios y márgenes.'),view:'dining',href:'/revenue'},
  {label:t('Memory & context','Memoria y contexto'),title:t('Recommendations\nthat remember.','Recomendaciones\ncon memoria.'),body:t('Carry useful preferences into the next conversation, with guest permission.','Conserva preferencias útiles para la siguiente conversación, con permiso del huésped.'),view:'context',href:'/platform#memory'},
  {label:t('Conversational voice','Voz conversacional'),title:t('Speak naturally.\nMove things forward.','Habla con naturalidad.\nAvanza la conversación.'),body:t('Speak or type naturally. Get relevant options and a clear next step.','Habla o escribe naturalmente. Recibe opciones relevantes y un siguiente paso claro.'),view:'home',href:'/platform#hear-it'},
  {label:t('24/7 guest service','Atención 24/7'),title:t('Everyday service.\nAlways available.','Atención cotidiana.\nSiempre disponible.'),body:t('Answer in the guest’s language, day or night. Route requests with their context.','Responde en el idioma del huésped, a cualquier hora. Envía solicitudes con su contexto.'),view:'context',href:'/solutions'},
 ]
 const item=features[active]
 return <Sequence playback={playback} className="eh-guest-stage"><Tabs name="home-experience" labels={features.map(feature=>feature.label)} active={active} onChange={setActive} playback={playback}/><div key={active} className="eh-guest-stage-grid" id="home-experience-panel" role="tabpanel" aria-labelledby={`home-experience-tab-${active}`}><div className="eh-guest-stage-copy" key={active}><h3>{item.title}</h3><p>{item.body}</p><Link className="xp-inline-link" href={item.href}>{t('See how it works','Conoce cómo funciona')}<ArrowRight size={16}/></Link></div><div className="eh-product-screen hc-demonstration-screen"><ProductCapture key={`${lang}-${item.view}`} view={item.view} lang={lang} alt={t('Actual Hotel Companion guest interface','Interfaz real del huésped de Hotel Companion')}/><ValueScene index={active}/><small>{t('Actual interface preview · Illustrative conversation','Vista previa real · Conversación ilustrativa')}</small></div></div></Sequence>
}

export function CommercialScene(){
 const t=useWords()
 return <section className="eh-commercial xp-wrap" id="revenue" data-motion-scene><div className="eh-commercial-art" data-motion-beat><Image src="/assets/ui/dish-1.webp" fill sizes="(max-width:800px) 100vw, 50vw" alt={t('A beautifully presented hotel dining experience','Una experiencia gastronómica del hotel')}/><div className="eh-commercial-message"><Heart size={19}/><p>{t('“Something special\nfor our anniversary.”','«Algo especial\npara nuestro aniversario».')}</p></div></div><div className="eh-commercial-copy" data-motion-beat><Eyebrow>{t('DON’T LET GUEST INTEREST GO TO WASTE.','APROVECHA EL INTERÉS DEL HUÉSPED.')}</Eyebrow><h2>{t('Offer what fits.','Ofrece lo que encaja.')}<br/>{t('Measure what it adds.','Mide lo que aporta.')}</h2><p>{t('Offer an approved alternative when timing, budget or availability gets in the way. See what guests wanted, what they bought and what the hotel gained.','Ofrece una alternativa aprobada cuando tiempo, presupuesto o disponibilidad no encajan. Conoce qué buscaban, qué compraron y qué ganó el hotel.')}</p><div className="eh-commercial-proof"><span>{t('Relevant offer','Oferta relevante')}</span><ArrowRight size={16}/><span>{t('Fulfilled sale','Venta completada')}</span><ArrowRight size={16}/><span>{t('Verified lift','Incremento verificado')}</span></div><Link className="xp-inline-link" href="/revenue">{t('Explore the revenue approach','Explora el enfoque de ingresos')}<ArrowRight size={16}/></Link></div></section>
}
