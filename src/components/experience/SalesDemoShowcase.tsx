'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CheckCheck, Heart, Mic, Pause, Play } from 'lucide-react'
import { Sequence, SequenceTabs, useSequence } from './Sequence'
import { ValueScene } from './ValueScene'
import { ProductCapture } from './ProductCapture'
import { useLang } from '@/lib/i18n/LanguageContext'

const views={
 en:[{id:'home',label:'Welcome',title:'Your hotel. Beautifully presented.',body:'A guest experience shaped around the hotel’s identity, with rooms, dining, wellness and a voice companion close at hand.'},{id:'rooms',label:'Rooms & suites',title:'A room worth discovering.',body:'Explore the room browsing interface, with rich photography and useful details. See the full reservation journey in a scheduled presentation.'},{id:'dining',label:'Dining',title:'A table. A tasting. A reason to stay.',body:'The dining experience makes the hotel’s services easy to discover and discuss with the companion.'},{id:'wellness',label:'Wellness',title:'A little time for yourself.',body:'Spa and wellness options are presented as part of the guest experience, with useful details and a natural next step.'},{id:'context',label:'Continuity',title:'The conversation carries forward.',body:'The returning-guest demonstration opens with previous messages and arrival context, instead of starting from a blank conversation.'}],
 es:[{id:'home',label:'Bienvenida',title:'Tu hotel. Presentado con cuidado.',body:'Una experiencia con la identidad del hotel, habitaciones, gastronomía, bienestar y un companion de voz siempre a mano.'},{id:'rooms',label:'Habitaciones',title:'Una habitación para descubrir.',body:'Explora la interfaz de habitaciones, con fotografías y detalles útiles. Conoce el recorrido completo de reservas en una presentación agendada.'},{id:'dining',label:'Gastronomía',title:'Una mesa. Un sabor. Una razón para quedarse.',body:'La experiencia gastronómica facilita descubrir los servicios del hotel y conversar sobre ellos con el companion.'},{id:'wellness',label:'Bienestar',title:'Un momento para ti.',body:'Opciones de spa y bienestar como parte de la experiencia, con detalles útiles y un siguiente paso natural.'},{id:'context',label:'Continuidad',title:'La conversación continúa.',body:'La demostración de regreso incluye mensajes previos y contexto de llegada, en lugar de empezar una conversación en blanco.'}]
}
export { guestCapture } from './ProductCapture'
function Capture({view,lang,priority=false}:{view:string;lang:'en'|'es';priority?:boolean}){
 return <ProductCapture priority={priority} className="xp-sales-capture" key={`${view}-${lang}`} view={view} lang={lang} alt={lang==='es'?`Interfaz real de la demo de Hotel Companion: ${views.es.find(v=>v.id===view)?.label}`:`Actual Hotel Companion sales demo interface: ${views.en.find(v=>v.id===view)?.label}`} />
}
const journeys = {
 en: [
  {label:'Ask',view:'home',tag:'01 · THE GUEST ASKS',guest:'We’re celebrating our anniversary. Could you help with dinner?',reply:'Of course. What would make the evening special for you?',context:'Anniversary · Dinner for two',outcome:'The occasion becomes useful context.'},
  {label:'Recommend',view:'dining',tag:'02 · A RELEVANT OFFER',guest:'Something intimate. One of us is vegetarian.',reply:'La Rosa’s tasting menu could be a lovely fit. I’ll ask the restaurant about a vegetarian option.',context:'Anniversary · Vegetarian option requested',outcome:'A hotel service offered for a reason.'},
  {label:'Arrange',view:'dining',tag:'03 · THE TEAM TAKES OWNERSHIP',guest:'That sounds perfect. Could we do 8pm?',reply:'I’ve sent the restaurant your request for two at 8pm, including the dietary preference.',context:'Restaurant · Two guests · 8pm requested',outcome:'Request sent → Restaurant confirmation pending'},
  {label:'Confirm',view:'dining',tag:'04 · THE GUEST GETS CONFIRMATION',guest:'Has the restaurant confirmed?',reply:'Yes. Your table for two is confirmed for 8pm, with the vegetarian option arranged.',context:'Restaurant confirmed · Guest informed',outcome:'Confirmed dinner · Eligible sale tracked'},
  {label:'Remember',view:'context',tag:'05 · THE NEXT VISIT STARTS AHEAD',guest:'We’d love to come back for our anniversary.',reply:'Welcome back. Shall I help plan another dinner? You can update your saved preferences at any time.',context:'Recognized guest · Preferences saved with permission',outcome:'The stay remembers. The conversation continues.'},
 ],
 es: [
  {label:'Preguntar',view:'home',tag:'01 · EL HUÉSPED PREGUNTA',guest:'Celebramos nuestro aniversario. ¿Nos ayudas con la cena?',reply:'Claro. ¿Qué haría especial la noche para ustedes?',context:'Aniversario · Cena para dos',outcome:'La ocasión se convierte en contexto útil.'},
  {label:'Recomendar',view:'dining',tag:'02 · UNA OFERTA RELEVANTE',guest:'Algo íntimo. Uno de nosotros es vegetariano.',reply:'El menú degustación de La Rosa podría ser ideal. Consultaré al restaurante por una opción vegetariana.',context:'Aniversario · Opción vegetariana solicitada',outcome:'Un servicio del hotel con una razón para ofrecerlo.'},
  {label:'Coordinar',view:'dining',tag:'03 · EL EQUIPO SE HACE CARGO',guest:'Perfecto. ¿Podría ser a las 8pm?',reply:'Envié al restaurante la solicitud para dos a las 8pm, con la preferencia alimentaria.',context:'Restaurante · Dos personas · 8pm solicitadas',outcome:'Solicitud enviada → Confirmación pendiente'},
  {label:'Confirmar',view:'dining',tag:'04 · EL HUÉSPED RECIBE CONFIRMACIÓN',guest:'¿Ya confirmó el restaurante?',reply:'Sí. Su mesa para dos está confirmada a las 8pm, con la opción vegetariana acordada.',context:'Restaurante confirmó · Huésped informado',outcome:'Cena confirmada · Venta elegible registrada'},
  {label:'Recordar',view:'context',tag:'05 · LA PRÓXIMA VISITA EMPIEZA MEJOR',guest:'Nos gustaría volver para nuestro aniversario.',reply:'Bienvenidos de nuevo. ¿Planeamos otra cena? Pueden actualizar sus preferencias guardadas cuando quieran.',context:'Huésped reconocido · Preferencias autorizadas',outcome:'La estancia recuerda. La conversación continúa.'},
 ],
}

export function SalesDemoTeaser(){
 const {lang}=useLang(),t=(en:string,es:string)=>lang==='es'?es:en
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),ref=useRef<HTMLDivElement>(null)
 const scene=journeys[lang][active]
 useEffect(()=>{
  if(paused)return
  let visible=false
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)')
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:.2})
  if(ref.current)observer.observe(ref.current)
  const timer=setInterval(()=>{if(visible&&!document.hidden&&!reduce.matches)setActive(i=>(i+1)%5)},6000)
  return()=>{observer.disconnect();clearInterval(timer)}
 },[paused])
 return <div className="xp-sales-teaser xp-journey-teaser" ref={ref} data-paused={paused}>
  <div className="xp-sales-teaser-art">
   <div className="xp-sales-halo"/>
   <div className="xp-sales-browser xp-sales-browser-preview">
    <div className="xp-sales-browser-bar"><span aria-hidden="true"><i/><i/><i/></span><small>Casa Rosada · Hotel Companion</small><small>{t('Preview','Vista previa')}</small></div>
    <Capture view={scene.view} lang={lang} priority={active===0}/>
   </div>
   <div className="xp-sales-phone"><Image src={`/assets/experience/sales-mobile-home${lang==='es'?'-es':''}.jpg`} width={390} height={844} alt={t('The real guest interface on mobile','La interfaz real del huésped en móvil')} sizes="140px" priority/></div>
   <div className="xp-journey-context"><Heart size={14}/><span>{scene.context}</span></div>
   <div className="xp-journey-card" key={`${lang}-${active}`}>
    <div className="xp-journey-card-top"><span>{scene.tag}</span><Mic size={16}/></div>
    <div className="xp-journey-guest"><small>{t('Guest','Huésped')}</small><p>{scene.guest}</p></div>
    <div className="xp-journey-reply"><span><span className="xp-hc-symbol">h</span>Hotel Companion</span><p>{scene.reply}</p></div>
    <div className="xp-journey-outcome"><CheckCheck size={16}/><span>{scene.outcome}</span></div>
   </div>
  </div>
  <div className="xp-sales-teaser-controls">
   <div className="xp-journey-steps" role="group" aria-label={t('Explore the guest interaction','Explorar la interacción del huésped')}>
    {journeys[lang].map((v,i)=><button key={v.label} type="button" aria-pressed={active===i} onClick={()=>{setActive(i);setPaused(true)}}><span>0{i+1}</span>{v.label}</button>)}
   </div>
   <button type="button" className="xp-icon-button" aria-label={paused?t('Resume guest journey','Reanudar el recorrido'):t('Pause guest journey','Pausar el recorrido')} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
  </div>
  <p className="xp-demo-caption">{t('Actual sales interface · Illustrative conversation and outcomes','Interfaz real de ventas · Conversación y resultados ilustrativos')}</p>
 </div>
}
export function SalesDemoShowcase(){
 const {lang}=useLang(),t=(en:string,es:string)=>lang==='es'?es:en,playback=useSequence(5,10000,0,true),active=playback.active,view=views[lang][active]
 return <section className="hc-gallery" id="guest-companion"><div className="xp-wrap"><div className="hc-chapter-heading"><p className="xp-eyebrow">{t('THE GUEST INTERFACE','LA INTERFAZ DEL HUÉSPED')}</p><h2>{t('See the experience.','Conoce la experiencia.')}</h2></div><Sequence playback={playback} className="hc-gallery-story"><div className="hc-gallery-tabs"><SequenceTabs labels={views[lang].map(v=>v.label)} name="sales-view" active={active} onChange={playback.select} playback={playback}/></div><div key={active} id="sales-view-panel" role="tabpanel" aria-labelledby={`sales-view-tab-${active}`} className="hc-gallery-screen hc-demonstration-screen"><Capture view={view.id} lang={lang}/><ValueScene index={active} kind="gallery"/></div></Sequence><p className="hc-visual-caption">{t('Actual interface preview · Illustrative conversations · Full presentation by appointment','Vista previa real · Conversaciones ilustrativas · Presentación completa con cita')}</p></div></section>
}
