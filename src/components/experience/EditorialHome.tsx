'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Heart, Mic, Pause, Play } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useLang } from '@/lib/i18n/LanguageContext'
import { Action, Eyebrow, Tabs, useWords } from './Experience'
import { guestCapture } from './SalesDemoShowcase'
import './editorial-home.css'

const moments = {
 en: [
  {title:'A reason to add more.',image:'/assets/lux/hotel-companion-hero-v2.webp',ask:'It’s our anniversary. We’d love a special dinner.',reply:'Your hotel’s anniversary offer pairs a terrace dinner with wine. Would you like the price and available times?',result:'Guest occasion → Relevant approved package'},
  {title:'Keep the opportunity alive.',image:'/assets/ui/dish-1.webp',ask:'The full spa day is too much. We only have an hour.',reply:'There’s a 45-minute treatment that fits. Shall I check the price and availability?',result:'Guest need → Alternative → Recorded outcome'},
  {title:'Context makes it personal.',image:'/assets/ui/suite-garden.webp',ask:'We’re coming back. What would you recommend this time?',reply:'You saved a preference for quiet evenings. Would you like to see the private dining options for your dates?',result:'Guest-approved memory → A more relevant recommendation'},
  {title:'Service, around the clock.',image:'/assets/img/company-reception.webp',ask:'Could we have extra towels before dinner?',reply:'I’ve sent your request to housekeeping with the room and timing. I’ll keep you updated.',result:'Guest request → Responsible team'},
 ],
 es: [
  {title:'Una razón para añadir más.',image:'/assets/lux/hotel-companion-hero-v2.webp',ask:'Es nuestro aniversario. Nos gustaría una cena especial.',reply:'La oferta de aniversario del hotel combina una cena en la terraza con vino. ¿Te muestro el precio y los horarios?',result:'Ocasión del huésped → Paquete aprobado relevante'},
  {title:'Conserva la oportunidad.',image:'/assets/ui/dish-1.webp',ask:'El día completo de spa es demasiado. Solo tenemos una hora.',reply:'Hay un tratamiento de 45 minutos que encaja. ¿Consulto el precio y la disponibilidad?',result:'Necesidad → Alternativa → Resultado registrado'},
  {title:'El contexto lo hace personal.',image:'/assets/ui/suite-garden.webp',ask:'Vamos a volver. ¿Qué nos recomiendas esta vez?',reply:'Guardaste tu preferencia por noches tranquilas. ¿Te muestro las opciones de cena privada para tus fechas?',result:'Memoria autorizada → Una recomendación más relevante'},
  {title:'Atención, a cualquier hora.',image:'/assets/img/company-reception.webp',ask:'¿Podrían traer toallas extra antes de cenar?',reply:'Envié tu solicitud a limpieza con la habitación y el horario. Te mantendré informado.',result:'Solicitud del huésped → Equipo responsable'},
 ],
}

export function EditorialHero(){
 const {lang}=useLang(),t=useWords()
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false)
 const hero=useRef<HTMLElement>(null),moment=moments[lang][active]
 useEffect(()=>{
  if(paused)return
  let visible=false
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)')
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:.3})
  if(hero.current)observer.observe(hero.current)
  const timer=setInterval(()=>{if(visible&&!document.hidden&&!motion.matches)setActive(index=>(index+1)%4)},10000)
  return()=>{observer.disconnect();clearInterval(timer)}
 },[paused])
 function move(direction:number){setActive(index=>(index+direction+4)%4);setPaused(true)}
 return <section className="eh-hero" data-paused={paused} ref={hero} aria-label={t('Hotel Companion in a guest’s day','Hotel Companion en el día del huésped')}>
  <div className="eh-hero-photo" key={moment.image}><Image src={moment.image} fill sizes="100vw" priority={active===0} loading="eager" alt=""/></div>
  <div className="eh-hero-shade"/>
  <div className="eh-hero-inner">
   <div className="eh-hero-copy"><Eyebrow>{t('TURN GUEST INTEREST INTO HOTEL REVENUE.','CONVIERTE INTERÉS EN INGRESOS PARA TU HOTEL.')}</Eyebrow><h1>{t('Smarter offers.','Mejores ofertas.')}<br/>{t('More revenue.','Más ingresos.')}</h1><p>{t('Turn guest conversations into relevant upgrades, experiences and packages. Natural voice, useful memory and 24/7 service—with your hotel controlling the offers.','Convierte conversaciones en mejoras, experiencias y paquetes relevantes. Voz natural, memoria útil y atención 24/7, con tu hotel al mando de las ofertas.')}</p><div className="eh-hero-actions"><Action>{t('Request a demo','Solicita una demo')}</Action><Link href="#guest-experience">{t('Explore the experience','Explora la experiencia')}<ArrowRight size={16}/></Link></div></div>
   <div className="eh-hero-conversation" key={`${lang}-${active}`}><p className="eh-moment-title">{moment.title}</p><div className="eh-guest-line"><p>{moment.ask}</p></div><div className="eh-companion-line"><span><Mic size={15}/>{t('Your hotel’s companion','El companion de tu hotel')}</span><p>{moment.reply}</p></div><p className="eh-moment-result"><Check size={14}/>{moment.result}</p></div>
   <div className="eh-hero-bottom"><span>{t('Telephone · Web & mobile · In-Room Tablets','Teléfono · Web y móvil · Tablets en la habitación')}</span><div className="eh-hero-controls"><button type="button" onClick={()=>move(-1)} aria-label={t('Previous guest example','Ejemplo anterior')}><ArrowLeft size={16}/></button><button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused?t('Resume guest examples','Reanudar ejemplos'):t('Pause guest examples','Pausar ejemplos')}>{paused?<Play size={15}/>:<Pause size={15}/>}</button><button type="button" onClick={()=>move(1)} aria-label={t('Next guest example','Siguiente ejemplo')}><ArrowRight size={16}/></button><span>0{active+1} / 04</span></div></div>
  </div><small className="eh-hero-caption">{t('Illustrative guest scenarios','Escenarios ilustrativos')}</small>
 </section>
}

export function GuestExperienceStage(){
 const {lang}=useLang(),t=useWords(),[active,setActive]=useState(0)
 const features=[
  {label:t('Smart recommendations','Recomendaciones inteligentes'),title:t('The right offer.\nAt the right moment.','La oferta adecuada.\nEn el momento adecuado.'),body:t('A balcony for morning coffee. A treatment before dinner. Match the offer to what the guest wants, with your hotel controlling prices and margins.','Un balcón para el café. Un tratamiento antes de cenar. Ofertas según lo que busca el huésped, con tu hotel al mando de precios y márgenes.'),view:'dining',href:'/revenue'},
  {label:t('Memory & context','Memoria y contexto'),title:t('Recommendations\nthat remember.','Recomendaciones\ncon memoria.'),body:t('Remember what matters to the guest—with permission. Use their preferences and conversation context to make the next recommendation more relevant.','Recuerda lo que importa al huésped, con permiso. Usa sus preferencias y el contexto para hacer más relevante la próxima recomendación.'),view:'context',href:'/platform#memory'},
  {label:t('Conversational voice','Voz conversacional'),title:t('Speak naturally.\nMove things forward.','Habla con naturalidad.\nAvanza la conversación.'),body:t('Guests speak or type naturally. HC understands the conversation, suggests the next step and brings in your team when needed.','El huésped habla o escribe naturalmente. HC entiende la conversación, sugiere el siguiente paso e involucra al equipo cuando hace falta.'),view:'home',href:'/platform#hear-it'},
  {label:t('24/7 guest service','Atención 24/7'),title:t('Everyday service.\nAlways available.','Atención cotidiana.\nSiempre disponible.'),body:t('Multilingual answers, day or night. Coordinate guest requests with your team and hotel systems. Keep the context, confirmations and next steps together.','Respuestas multilingües, a cualquier hora. Coordina solicitudes con tu equipo y sistemas. Conserva contexto, confirmaciones y siguientes pasos en un mismo lugar.'),view:'context',href:'/solutions'},
 ]
 const item=features[active]
 return <div className="eh-guest-stage"><Tabs name="home-experience" labels={features.map(feature=>feature.label)} active={active} onChange={setActive}/><div className="eh-guest-stage-grid" id="home-experience-panel" role="tabpanel" aria-labelledby={`home-experience-tab-${active}`}><div className="eh-guest-stage-copy" key={active}><h3>{item.title}</h3><p>{item.body}</p><Link className="xp-inline-link" href={item.href}>{t('See how it works','Conoce cómo funciona')}<ArrowRight size={16}/></Link></div><div className="eh-product-screen"><Image key={`${lang}-${item.view}`} src={guestCapture(item.view,lang)} alt={t('Actual Hotel Companion guest interface','Interfaz real del huésped de Hotel Companion')} width={1024} height={768} sizes="(max-width:800px) 95vw, 760px"/><small>{t('Actual interface preview · Full presentation by appointment','Vista previa de la interfaz real · Presentación completa con cita')}</small></div></div></div>
}

export function CommercialScene(){
 const t=useWords()
 return <section className="eh-commercial xp-wrap" id="revenue"><div className="eh-commercial-art"><Image src="/assets/ui/dish-1.webp" fill sizes="(max-width:800px) 100vw, 50vw" alt={t('A beautifully presented hotel dining experience','Una experiencia gastronómica del hotel')}/><div className="eh-commercial-message"><Heart size={19}/><p>{t('“Something special\nfor our anniversary.”','«Algo especial\npara nuestro aniversario».')}</p></div></div><div className="eh-commercial-copy"><Eyebrow>{t('DON’T LET GUEST INTEREST GO TO WASTE.','APROVECHA EL INTERÉS DEL HUÉSPED.')}</Eyebrow><h2>{t('Offer what fits.','Ofrece lo que encaja.')}<br/>{t('Measure what it adds.','Mide lo que aporta.')}</h2><p>{t('Offer an approved alternative when timing, budget or availability gets in the way. See what guests wanted, what they bought and what the hotel gained.','Ofrece una alternativa aprobada cuando tiempo, presupuesto o disponibilidad no encajan. Conoce qué buscaban, qué compraron y qué ganó el hotel.')}</p><div className="eh-commercial-proof"><span>{t('Relevant offer','Oferta relevante')}</span><ArrowRight size={16}/><span>{t('Fulfilled sale','Venta completada')}</span><ArrowRight size={16}/><span>{t('Verified lift','Incremento verificado')}</span></div><Link className="xp-inline-link" href="/revenue">{t('Explore the revenue approach','Explora el enfoque de ingresos')}<ArrowRight size={16}/></Link></div></section>
}
