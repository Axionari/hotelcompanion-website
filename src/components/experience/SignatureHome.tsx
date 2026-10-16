'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Mic } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useLang } from '@/lib/i18n/LanguageContext'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { useWords, VoiceSample } from './Experience'
import { ProductCapture, guestCapture } from './ProductCapture'
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
        <div className={styles.coverActions}><Link href="/demo" className={styles.button}>{t('Request a demo','Solicita una demo')}<ArrowUpRight size={18}/></Link><Link href="#guest-experience" className={styles.textLink}>{t('Explore the experience','Explora la experiencia')}<ArrowDown size={17}/></Link></div>
      </div>
      <a href="#guest-experience" className={styles.coverProduct} aria-label={t('Explore the current guest experience','Explora la experiencia actual del huésped')}>
        <div className={styles.productLabel}><span>{t('YOUR HOTEL. IN THEIR HANDS.','TU HOTEL. EN SUS MANOS.')}</span><ArrowUpRight size={15}/></div>
        <div className={styles.phoneFrame}><Image src={guestCapture('home',lang,'phone')} alt={t('Current Hotel Companion guest experience on a phone','Experiencia actual del huésped de Hotel Companion en un teléfono')} width={433} height={938} sizes="(max-width:800px) 190px, 234px" unoptimized priority/></div>
        <span className={styles.productNote}>{t('Actual sales demo · Sample hotel','Demo de ventas actual · Hotel de ejemplo')}</span>
      </a>
      <div className={styles.coverFoot}><p>{t('By handling routine requests, the Companion gives your team more time for personal service.','Al atender solicitudes rutinarias, el Companion deja a tu equipo más tiempo para un servicio personal.')}</p><a href="#hospitality" aria-label={t('Discover a more personal stay','Descubre una estancia más personal')}><span>{t('Discover a more personal stay','Descubre una estancia más personal')}</span><ArrowDown size={17}/></a></div>
    </div>
  </section>
}

function HospitalityStatement() {
  const t=useWords()
  const points=[
    [t('Immediate assistance','Ayuda inmediata'),t('A useful answer in the guest’s language, whenever they need it.','Una respuesta útil en el idioma del huésped, cuando la necesita.')],
    [t('Thoughtful recommendations','Recomendaciones con sentido'),t('Rooms, dining and experiences that fit the person and the moment.','Habitaciones, gastronomía y experiencias que encajan con la persona y el momento.')],
    [t('More time for people','Más tiempo para las personas'),t('Less routine work. More personal attention from your team.','Menos tareas rutinarias. Más atención personal de tu equipo.')],
  ]
  return <section className={`${styles.statement} ${styles.container}`} id="hospitality">
    <div className={styles.sectionLine}><span>01 / {t('THE HUMAN SIDE OF HOSPITALITY','EL LADO HUMANO DE LA HOSPITALIDAD')}</span><span>{t('An AI companion. A more personal stay.','Un companion con IA. Una estancia más personal.')}</span></div>
    <h2>{t('Technology should give hospitality','La tecnología debe devolverle')} <span>{t('back its humanity.','su lado humano a la hospitalidad.')}</span></h2>
    <div className={styles.principles}>{points.map(([title,body],i)=><div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
  </section>
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
      <div className={styles.exhibitIndex}><div className={styles.exhibitChoices} aria-label={t('Choose a guest experience','Elige una experiencia del huésped')}>{views.map((view,i)=><button key={view.view} type="button" aria-pressed={active===i} aria-controls="guest-exhibit-screen" onClick={()=>setActive(i)}><span>0{i+1}</span><strong>{view.name}</strong><ArrowUpRight size={16}/></button>)}</div><div className={styles.exhibitDescription} aria-live="polite"><h3>{item.tag}</h3><p>{item.copy}</p><Link href="/platform">{t('Explore the product','Explora el producto')}<ArrowRight size={15}/></Link></div></div>
      <div className={styles.exhibitScreen} id="guest-exhibit-screen"><ProductCapture key={`${lang}-${item.view}`} view={item.view} lang={lang} alt={t(`Current Hotel Companion sales demo — ${item.name}`,`Demo de ventas actual de Hotel Companion — ${item.name}`)}/><p className={styles.evidenceNote}>{t('Actual sales demo · Sample hotel · Illustrative data','Demo de ventas actual · Hotel de ejemplo · Datos ilustrativos')}</p></div>
    </div>
  </div></section>
}

function RevenueInterlude() {
  const t=useWords()
  return <section className={styles.interlude} id="revenue"><div className={styles.interludePhoto}><Image src="/assets/editorial/hc-anniversary-dining-v1.webp" alt={t('An intimate coastal dining terrace at blue hour, set for two','Una terraza íntima junto al mar al anochecer, preparada para dos')} fill sizes="100vw"/></div><div className={styles.interludeShade}/><div className={`${styles.container} ${styles.interludeContent}`}><span className={styles.eyebrow}>{t('A GUEST’S OCCASION. YOUR HOTEL’S OPPORTUNITY.','UNA OCASIÓN DEL HUÉSPED. UNA OPORTUNIDAD PARA TU HOTEL.')}</span><h2>{t('“Something special','«Algo especial')}<br/>{t('for our anniversary.”','para nuestro aniversario».')}</h2><div className={styles.interludeBottom}><p>{t('Offer what fits. Measure what it adds.','Ofrece lo que encaja. Mide lo que aporta.')}<small>{t('Relevant hotel-approved offers. Completed sales. Verified additional contribution.','Ofertas relevantes aprobadas. Ventas completadas. Contribución adicional verificada.')}</small></p><Link href="/revenue" className={styles.roundLink} aria-label={t('Explore revenue','Explora los ingresos')}><span>{t('Explore revenue','Explora los ingresos')}</span><ArrowUpRight size={24}/></Link></div></div></section>
}

function StartAtOneHotel() {
  const t=useWords()
  const steps=[
    [t('Share your hotel','Comparte tu hotel'),t('Room features, services, prices and guest information.','Detalles de habitaciones, servicios, precios e información para huéspedes.')],
    [t('Set the rules','Define las reglas'),t('Approve offers, channels and team responsibilities.','Aprueba ofertas, canales y responsables del equipo.')],
    [t('Try it together','Pruébalo con nosotros'),t('Rehearse offers, combined requests and confirmations.','Prueba ofertas, solicitudes combinadas y confirmaciones.')],
    [t('Launch & measure','Lanza y mide'),t('Start at one hotel. Review results before expanding.','Empieza en un hotel. Revisa resultados antes de ampliar.')],
  ]
  return <section className={`${styles.setup} ${styles.container}`} id="setup"><div className={styles.sectionLine}><span>04 / {t('A CONSIDERED START','UN INICIO BIEN PENSADO')}</span><Link href="/implementation">{t('The setup plan','El plan de implementación')}<ArrowUpRight size={15}/></Link></div><div className={styles.setupHeading}><h2>{t('One hotel first.','Primero, un hotel.')}<br/><span>{t('The next chapter, together.','El siguiente capítulo, juntos.')}</span></h2><p>{t('A defined guest journey, approved rules and a clear way to measure value.','Una experiencia definida, reglas aprobadas y una forma clara de medir valor.')}</p></div><ol className={styles.setupSteps}>{steps.map(([title,body],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol><div className={styles.connectionLine}><span><Check size={16}/>{t('Your systems. Your people. Your hotel.','Tus sistemas. Tu gente. Tu hotel.')}</span><p>{t('Connections and launch timing confirmed for your scope.','Conexiones y plazos confirmados según tu alcance.')}</p><Link href="/implementation#connections">{t('How we connect','Cómo nos conectamos')}<ArrowRight size={15}/></Link></div></section>
}

export default function SignatureHome() {
  const t=useWords()
  return <div className={`xp-site eh-home ${styles.home}`}><a className="xp-skip" href="#main-content">{t('Skip to content','Saltar al contenido')}</a><SiteNav appearance="dark"/><main id="main-content"><SignatureHero/><HospitalityStatement/><GuestExhibit/><RevenueInterlude/><section className={styles.listening}><div className={styles.container}><div className={styles.listeningLabel}><Mic size={16}/>{t('HEAR THE DIFFERENCE','ESCUCHA LA DIFERENCIA')}</div><VoiceSample/></div></section><OperatingStory/><StartAtOneHotel/><div className={styles.closing}><Image src="/assets/lux/hotel-companion-closing-blue-hour-v2.webp" fill sizes="100vw" alt=""/><div className={styles.closingShade}/><FocusedPilot/></div></main><SiteFooter/></div>
}
