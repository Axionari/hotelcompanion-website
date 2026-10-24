'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useLang } from '@/lib/i18n/LanguageContext'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { useWords } from './Experience'
import { ProductCapture, guestCapture } from './ProductCapture'
import { OutcomeDemo } from './OutcomeDemo'
import { FocusedPilot } from './HomeClarity'
import { OperatingStory } from './OperatingStory'
import styles from './signature-home.module.css'

function SignatureHero() {
  const t = useWords(), { lang } = useLang()
  return <section className={`${styles.cover} sg-cover`} aria-labelledby="signature-title">
    <Image className={styles.coverImage} src="/assets/editorial/hc-caribbean-lobby.webp" alt={t('An open hotel lounge, natural stone and linen curtains overlooking the sea','Un salón de hotel abierto al mar, con piedra natural y cortinas de lino')} fill priority sizes="100vw"/>
    <div className={styles.coverShade}/>
    <div className={`${styles.container} ${styles.coverContent}`}>
      <div className={styles.coverCopy}>
        <p className={styles.eyebrow}>{t('TURN GUEST INTEREST INTO HOTEL REVENUE.','CONVIERTE INTERÉS EN INGRESOS PARA TU HOTEL.')}</p>
        <h1 id="signature-title">{t('Smarter offers.','Mejores ofertas.')}<br/>{t('More revenue.','Más ingresos.')}</h1>
        <p className={styles.coverLead}><span className={styles.desktopCopy}>{t('Turn guest conversations into relevant upgrades, experiences and packages. Natural voice, useful memory and 24/7 service—with your hotel controlling the offers.','Convierte conversaciones en mejoras, experiencias y paquetes relevantes. Voz natural, memoria útil y atención 24/7, con tu hotel al mando de las ofertas.')}</span><span className={styles.phoneCopy}>{t('Turn guest conversations into upgrades and experiences. Natural voice, useful memory and 24/7 service. Your hotel sets the rules.','Convierte conversaciones en mejoras y experiencias. Voz natural, memoria útil y atención 24/7. Tu hotel define las reglas.')}</span></p>
        <div className={styles.coverActions}><Link href="/demo" className={styles.button}>{t('Plan a pilot','Planea un piloto')}<ArrowUpRight size={18}/></Link><Link href="#outcomes" className={styles.textLink}>{t('See what it changes','Descubre qué cambia')}<ArrowDown size={17}/></Link></div>
      </div>
      <a href="#guest-experience" className={styles.coverProduct} aria-label={t('Explore the current guest experience','Explora la experiencia actual del huésped')}>
        <div className={styles.productLabel}><span>{t('YOUR HOTEL. IN THEIR HANDS.','TU HOTEL. EN SUS MANOS.')}</span><ArrowUpRight size={15}/></div>
        <div className={styles.phoneFrame}><Image src={guestCapture('home',lang,'phone')} alt={t('Current Hotel Companion guest experience on a phone','Experiencia actual del huésped de Hotel Companion en un teléfono')} width={433} height={938} sizes="(max-width:800px) 190px, 234px" unoptimized priority/></div>
        <span className={styles.productNote}>{t('Actual sales demo · Sample hotel','Demo de ventas actual · Hotel de ejemplo')}</span>
      </a>
      <div className={styles.coverFoot}><p>{t('By handling routine requests, the Companion gives your team more time for personal service.','Al atender solicitudes rutinarias, el Companion deja a tu equipo más tiempo para un servicio personal.')}</p><span>{t('One companion · four outcomes','Un companion · cuatro resultados')}</span></div>
    </div>
  </section>
}

function OutcomeNavigator() {
  const t=useWords(),{lang}=useLang()
  const [selection,setSelection]=useState({index:0,run:0})
  const active=selection.index
  const select=(index:number)=>setSelection(previous=>({index,run:previous.run+1}))
  const outcomes=[
    {label:t('Direct revenue','Ingresos directos'),title:t('Turn intent into an approved offer.','Convierte intención en una oferta aprobada.'),body:t('Match what the guest asks for with rooms, experiences and services the hotel has chosen to sell.','Relaciona lo que pide el huésped con habitaciones, experiencias y servicios que el hotel ha decidido vender.'),proof:t('Completed sales and additional contribution remain distinct from interest.','Las ventas completadas y la contribución adicional se separan del simple interés.'),view:'rooms',kind:'guest'},
    {label:t('Guest service','Servicio al huésped'),title:t('Useful answers, whenever guests ask.','Respuestas útiles cuando el huésped pregunta.'),body:t('Natural voice and text help guests find hotel information and take the next step without waiting for the front desk.','Voz y texto naturales ayudan a encontrar información y dar el siguiente paso sin esperar a recepción.'),proof:t('Your approved knowledge and service rules define every answer.','Tu conocimiento aprobado y reglas de servicio definen cada respuesta.'),view:'guest-services',kind:'guest'},
    {label:t('Team ownership','Responsabilidad del equipo'),title:t('Every request has a clear next step.','Cada solicitud tiene un siguiente paso claro.'),body:t('Conversation context reaches the right hotel team with the status needed to confirm, fulfil or take over.','El contexto llega al equipo adecuado con el estado necesario para confirmar, atender o intervenir.'),proof:t('Guest language follows the verified operational state.','El lenguaje al huésped sigue el estado operativo verificado.'),view:'staff-request',kind:'staff'},
    {label:t('Guest memory','Memoria del huésped'),title:t('Make the next visit feel familiar.','Haz que la próxima visita se sienta familiar.'),body:t('Recall a previous stay, the experiences enjoyed and the preferences the guest shared. Then let the guest choose what comes next.','Recuerda una estancia anterior, las experiencias disfrutadas y las preferencias compartidas. Después, el huésped decide qué sigue.'),proof:t('Previous arrangements inform the conversation. They are not booked again automatically.','Los planes anteriores orientan la conversación. No se reservan de nuevo automáticamente.'),view:'memory',kind:'memory'},
  ]
  const item=outcomes[active]
  return <section className={styles.outcomes} id="outcomes" aria-labelledby="outcome-title"><div className={styles.container}>
    <div className={styles.outcomeHeading}><p className={styles.eyebrow}>01 / {t('THE VALUE AT A GLANCE','EL VALOR DE UN VISTAZO')}</p><h2 id="outcome-title">{t('One companion.','Un companion.')}<br/><span>{t('Four hotel outcomes.','Cuatro resultados para el hotel.')}</span></h2><p>{t('Choose an outcome. Watch the Companion turn a guest’s request into the next right action.','Elige un resultado. Mira cómo el Companion convierte una solicitud en la siguiente acción correcta.')}</p></div>
    <div className={styles.outcomeWorkspace} id="outcome-demo">
      <div className={styles.outcomeTabs} role="tablist" aria-label={t('Hotel outcomes','Resultados para el hotel')}>{outcomes.map((outcome,index)=><button key={outcome.label} id={`outcome-tab-${index}`} type="button" role="tab" aria-selected={active===index} aria-controls="outcome-panel" tabIndex={active===index?0:-1} onClick={()=>select(index)} onKeyDown={event=>{
        const direction=['ArrowRight','ArrowDown'].includes(event.key)?1:['ArrowLeft','ArrowUp'].includes(event.key)?-1:0
        const next=event.key==='Home'?0:event.key==='End'?3:direction?(index+direction+4)%4:null
        if(next!==null){event.preventDefault();select(next);document.getElementById(`outcome-tab-${next}`)?.focus({preventScroll:true})}
      }}><span>0{index+1}</span><strong>{outcome.label}</strong><ArrowUpRight size={16}/></button>)}</div>
      <div className={styles.outcomePanel} id="outcome-panel" role="tabpanel" aria-labelledby={`outcome-tab-${active}`}>
        <div className={styles.outcomeCopy} key={active}><span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p><small><Check size={15}/>{item.proof}</small></div>
        <div className={styles.outcomeVisual}><OutcomeDemo key={`${active}-${selection.run}-${lang}`} outcome={active} lang={lang}/></div>
      </div>
    </div>
  </div></section>
}

function GuestExhibit() {
  const t=useWords(),{lang}=useLang(),[active,setActive]=useState(0)
  const views=[
    {name:t('Rooms & suites','Habitaciones y suites'),tag:t('A stay that fits','Una estancia a su medida'),copy:t('Match the guest’s plans to the right room and the features that matter to them. Your hotel approves the offer.','Relaciona los planes del huésped con la habitación y los detalles que le importan. Tu hotel aprueba la oferta.'),view:'rooms'},
    {name:t('Dining','Gastronomía'),tag:t('A table worth remembering','Una mesa para recordar'),copy:t('Turn a celebration or a simple question into a relevant dining recommendation. Your hotel sets the price and availability.','Convierte una celebración o una pregunta en una recomendación gastronómica relevante. Tu hotel define precio y disponibilidad.'),view:'dining'},
    {name:t('Wellness','Bienestar'),tag:t('A little time for themselves','Un momento para sí mismos'),copy:t('Find an experience that fits the guest’s interests, time and budget—with an approved alternative when plans change.','Encuentra una experiencia acorde con intereses, tiempo y presupuesto, con una alternativa aprobada cuando cambian los planes.'),view:'wellness'},
    {name:t('The whole stay','Toda la estancia'),tag:t('The details, together','Los detalles, juntos'),copy:t('Keep stay details and everyday requests close at hand. Carry useful preferences forward with the guest’s permission.','Conserva los detalles de la estancia y las solicitudes a la mano. Recuerda preferencias útiles con permiso del huésped.'),view:'context'},
  ]
  const item=views[active]
  return <section className={styles.exhibit} id="guest-experience" aria-labelledby="exhibit-title"><div className={styles.container}>
    <div className={styles.sectionLine}><span>02 / {t('THE GUEST EXPERIENCE','LA EXPERIENCIA DEL HUÉSPED')}</span><span>{t('Telephone · Web & mobile · In-room tablets','Teléfono · Web y móvil · Tablets en la habitación')}</span></div>
    <div className={styles.exhibitHeading}><h2 id="exhibit-title">{t('Your hotel.','Tu hotel.')}<br/><span>{t('Beautifully connected.','Todo conectado.')}</span></h2><p>{t('One experience for the moments that make a stay. Explore the current product, in your guest’s hands.','Una experiencia para los momentos que hacen una estancia. Explora el producto actual, en manos de tu huésped.')}</p></div>
    <div className={styles.exhibitBody}>
      <div className={styles.exhibitIndex}><div className={styles.exhibitChoices} aria-label={t('Choose a guest experience','Elige una experiencia del huésped')}>{views.map((view,i)=><button key={view.view} type="button" aria-pressed={active===i} aria-controls="guest-exhibit-screen" onClick={()=>setActive(i)}><span>0{i+1}</span><strong>{view.name}</strong><ArrowUpRight size={16}/></button>)}</div><div className={styles.exhibitDescription} aria-live="polite"><h3>{item.tag}</h3><p>{item.copy}</p></div></div>
      <div className={styles.exhibitScreen} id="guest-exhibit-screen"><ProductCapture key={`${lang}-${item.view}`} view={item.view} lang={lang} alt={t(`Current Hotel Companion sales demo — ${item.name}`,`Demo de ventas actual de Hotel Companion — ${item.name}`)}/><p className={styles.evidenceNote}>{t('Actual sales demo · Sample hotel · Illustrative data','Demo de ventas actual · Hotel de ejemplo · Datos ilustrativos')}</p></div>
    </div>
  </div></section>
}

function RevenueInterlude() {
  const t=useWords()
  return <section className={styles.interlude} id="revenue"><div className={styles.interludePhoto}><Image src="/assets/editorial/hc-anniversary-dining-v1.webp" alt={t('An intimate coastal dining terrace at blue hour, set for two','Una terraza íntima junto al mar al anochecer, preparada para dos')} fill sizes="100vw"/></div><div className={styles.interludeShade}/><div className={`${styles.container} ${styles.interludeContent}`}><span className={styles.eyebrow}>{t('A GUEST’S OCCASION. YOUR HOTEL’S OPPORTUNITY.','UNA OCASIÓN DEL HUÉSPED. UNA OPORTUNIDAD PARA TU HOTEL.')}</span><h2>{t('“Something special','«Algo especial')}<br/>{t('for our anniversary.”','para nuestro aniversario».')}</h2><div className={styles.interludeBottom}><p>{t('Offer what fits. Measure what it adds.','Ofrece lo que encaja. Mide lo que aporta.')}<small>{t('Relevant hotel-approved offers. Completed sales. Verified additional contribution.','Ofertas relevantes aprobadas. Ventas completadas. Contribución adicional verificada.')}</small></p><span className={styles.interludeMarker}>{t('REVENUE, MADE VISIBLE','INGRESOS VISIBLES')}</span></div></div></section>
}

function StartAtOneHotel() {
  const t=useWords()
  const steps=[
    [t('Share your hotel','Comparte tu hotel'),t('Room features, services, prices and guest information.','Detalles de habitaciones, servicios, precios e información para huéspedes.')],
    [t('Set the rules','Define las reglas'),t('Approve offers, channels and team responsibilities.','Aprueba ofertas, canales y responsables del equipo.')],
    [t('Try it together','Pruébalo con nosotros'),t('Rehearse offers, combined requests and confirmations.','Prueba ofertas, solicitudes combinadas y confirmaciones.')],
    [t('Launch & measure','Lanza y mide'),t('Start at one hotel. Review results before expanding.','Empieza en un hotel. Revisa resultados antes de ampliar.')],
  ]
  return <section className={`${styles.setup} ${styles.container}`} id="setup"><div className={styles.sectionLine}><span>04 / {t('A CONSIDERED START','UN INICIO BIEN PENSADO')}</span></div><div className={styles.setupHeading}><h2>{t('One hotel first.','Primero, un hotel.')}<br/><span>{t('The next chapter, together.','El siguiente capítulo, juntos.')}</span></h2><p>{t('A defined guest journey, approved rules and a clear way to measure value.','Una experiencia definida, reglas aprobadas y una forma clara de medir valor.')}</p></div><ol className={styles.setupSteps}>{steps.map(([title,body],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol><div className={styles.connectionLine}><span><Check size={16}/>{t('Your systems. Your people. Your hotel.','Tus sistemas. Tu gente. Tu hotel.')}</span><p>{t('Connections and launch timing are confirmed for the scope of the pilot.','Las conexiones y los plazos se confirman según el alcance del piloto.')}</p></div></section>
}

export default function SignatureHome() {
  const t=useWords()
  return <div className={`xp-site eh-home ${styles.home}`}><a className="xp-skip" href="#main-content">{t('Skip to content','Saltar al contenido')}</a><SiteNav appearance="dark"/><main id="main-content"><SignatureHero/><OutcomeNavigator/><GuestExhibit/><RevenueInterlude/><OperatingStory/><StartAtOneHotel/><div className={styles.closing}><Image src="/assets/lux/hotel-companion-closing-blue-hour-v2.webp" fill sizes="100vw" alt=""/><div className={styles.closingShade}/><FocusedPilot/></div></main><SiteFooter/></div>
}
