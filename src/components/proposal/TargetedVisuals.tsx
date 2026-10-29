'use client'

import Image from 'next/image'
import { useId } from 'react'
import { Check, CheckCheck, ChevronLeft, LockKeyhole, MessageCircle, MoreVertical, Phone } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { useText } from '@/components/atelier/Atelier'
import { guestCapture } from '@/components/experience/ProductCapture'
import './targeted-visuals.css'

// Editorial crops of existing product captures. The interface pixels are unchanged.
function CaptureRegion({ src, box, size = [1280, 800], alt, className = '' }: {
  src: string; box: [number, number, number, number]; size?: [number, number]; alt: string; className?: string
}) {
  const id = useId().replace(/:/g, '')
  const [x, y, width, height] = box
  return <svg className={`tv-capture ${className}`} viewBox={`${x} ${y} ${width} ${height}`} preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby={id}>
    <title id={id}>{alt}</title>
    <defs><clipPath id={`${id}-clip`}><rect x={x} y={y} width={width} height={height}/></clipPath></defs>
    <image href={src} width={size[0]} height={size[1]} clipPath={`url(#${id}-clip)`}/>
  </svg>
}

export function HomeBookingVisual() {
  const t = useText()
  return <div className="at-hero-art tv-home-art">
    <div className="at-hero-photo tv-home-photo"><Image src="/assets/proposal/phone-call-at-home-v1.webp" alt={t('A guest calling the hotel from his apartment before travelling', 'Un huésped llama al hotel desde su departamento antes de viajar')} fill priority sizes="(max-width:750px) 100vw, 50vw"/><span className="tv-photo-label"><Phone size={14}/>{t('Before arrival · A call from home', 'Antes de llegar · Una llamada desde casa')}</span></div>
    <div className="tv-suite-recommendation">
      <div className="tv-suite-request"><MessageCircle size={17}/><span>{t('“A private terrace for two.”', '«Una terraza privada para dos».')}</span></div>
      <div className="tv-suite-result">
        <CaptureRegion src="/assets/experience/chat-outcomes/revenue-03.webp" box={[51,263,362,258]} alt={t('Parroquia Suite and its private terrace', 'Suite Parroquia con su terraza privada')}/>
        <CaptureRegion src="/assets/experience/chat-outcomes/revenue-03.webp" box={[52,534,360,184]} alt={t('The recommended Parroquia Suite: king bed, 38 square metres, private terrace, MX$7,200 per night', 'Suite Parroquia recomendada: cama king, 38 metros cuadrados, terraza privada, MX$7,200 por noche')}/>
      </div>
    </div>
    <div className="at-image-caption"><span>{t('A better stay begins with a conversation.', 'Una mejor estancia empieza con una conversación.')}</span></div>
  </div>
}

export function DesktopChannelVisual() {
  const t = useText(), { lang } = useLang()
  return <div className="tv-desktop-setting">
    <Image className="tv-setting-photo" src="/assets/proposal/booking-at-home.png" alt="" fill sizes="(max-width:750px) 90vw, 60vw"/>
    <div className="tv-laptop">
      <div className="tv-laptop-screen"><div className="tv-browser-bar"><span aria-hidden="true">● ● ●</span><span><LockKeyhole size={9}/>Casa Rosada</span></div><CaptureRegion src={guestCapture('rooms', lang)} box={[0,0,1422,918]} size={[1422,1000]} alt={t('The hotel’s rooms and suites website on a laptop, with room photographs, features and rates', 'Web de habitaciones y suites del hotel en una laptop, con fotos, detalles y tarifas')}/></div>
      <div className="tv-laptop-base" aria-hidden="true"/>
    </div>
  </div>
}

export function MobileChannelVisual() {
  const t = useText(), { lang } = useLang()
  return <div className="tv-mobile-setting"><div className="tv-mobile-device"><div className="tv-mobile-camera" aria-hidden="true"/><Image src={guestCapture('home', lang, 'phone')} alt={t('The actual Hotel Companion mobile website, open on a guest’s phone', 'La web móvil de Hotel Companion abierta en el teléfono del huésped')} width={433} height={938} sizes="220px"/></div></div>
}

export function TelephoneChannelVisual() {
  const t = useText()
  return <div className="tv-telephone-photo"><Image src="/assets/proposal/phone-call-at-home-v1.webp" alt={t('A guest speaking to the hotel by telephone from home', 'Un huésped habla por teléfono con el hotel desde casa')} fill sizes="(max-width:750px) 90vw, 30vw"/><div><Phone size={16}/><span>{t('Your hotel companion', 'Tu hotel companion')}</span><span className="tv-call-wave" aria-hidden="true">{[9,17,12,22,14,19,8].map((height,i)=><i key={i} style={{height,animationDelay:`${i*.13}s`}}/>)}</span></div><small>{t('A conversation, not a phone menu.', 'Una conversación, no un menú telefónico.')}</small></div>
}

export function WhatsAppChannelVisual() {
  const t = useText()
  return <div className="tv-whatsapp" aria-label={t('A guest message in WhatsApp', 'Un mensaje del huésped en WhatsApp')}>
    <div className="tv-wa-header"><ChevronLeft size={16}/><span className="tv-wa-avatar">CR</span><strong>Casa Rosada</strong><Phone size={15}/><MoreVertical size={16}/></div>
    <div className="tv-wa-chat"><span className="tv-wa-day">{t('Before arrival', 'Antes de llegar')}</span><blockquote>{t('“Could you help us arrange an airport transfer?”', '«¿Nos ayudan a organizar un traslado del aeropuerto?»')}<small>09:41 <CheckCheck size={14}/></small></blockquote></div>
    <div className="tv-wa-composer" aria-hidden="true"><span>+</span><div/><span>⌁</span></div>
  </div>
}

export function JourneyContext({ stage }: { stage: number }) {
  const t = useText()
  if (stage === 2) return null
  const service = stage === 1
  return <figure className="tv-journey-context">
    <div className="tv-journey-photo"><Image src={service ? '/assets/proposal/service-in-room.png' : '/assets/proposal/booking-at-home.png'} alt={service ? t('A guest in the hotel room uses her phone to request help with the air conditioning', 'Una huésped usa su teléfono desde la habitación para solicitar ayuda con el aire acondicionado') : t('Planning a hotel stay from home', 'Planeando una estancia desde casa')} fill sizes="(max-width:750px) 90vw, 280px"/></div>
    {service && <div className="tv-journey-task"><span>{t('The team receives the request', 'El equipo recibe la solicitud')}</span><CaptureRegion src="/assets/experience/chat-outcomes/team-13.webp" box={[270,183,307,149]} alt={t('Air conditioning, Room 214. Engineering. In progress.', 'Aire acondicionado, habitación 214. Ingeniería. En curso.')}/></div>}
  </figure>
}

export function RecommendationVisual({ image, offer, tag }: { image: string; offer: string; tag: string }) {
  return <div className="tv-recommendation"><Image src={image} alt={offer} width={700} height={600} sizes="(max-width:800px) 90vw, 480px"/><div className="tv-recommendation-caption"><small><Check size={14}/>{tag}</small><h3>{offer}</h3></div></div>
}

export function DiningSelectionVisual() {
  const t = useText(), { lang } = useLang()
  return <figure className="tv-dining-visual">
    <div className="tv-dining-photo"><CaptureRegion src={guestCapture('dining', lang)} size={[1422,1000]} box={[970,250,414,380]} alt={t('Wine and fine dining at La Rosa', 'Vino y alta cocina en La Rosa')}/></div>
    <div className="tv-dining-selection"><span className="tv-media-label">Casa Rosada · {t('Dining', 'Gastronomía')}</span><CaptureRegion src={guestCapture('dining', lang)} size={[1422,1000]} box={lang === 'es' ? [965,645,422,178] : [965,665,422,158]} alt={t('La Rosa tasting menu: seasonal dining, dietary preferences considered, explore the menu, MX$3,200', 'Menú degustación La Rosa: cocina de temporada, necesidades alimentarias consideradas, explorar el menú, MX$3,200')}/></div>
    <figcaption>{t('Considered, not pushed.', 'Pensado, sin presionar.')}</figcaption>
  </figure>
}

export function TeamOwnershipVisual() {
  const t = useText()
  return <figure className="tv-team-workspace">
    <figcaption><span className="tv-team-mark">CR</span><div><strong>Casa Rosada</strong><span>{t('Request queue', 'Cola de solicitudes')}</span></div><small className="tv-team-status">{t('In progress', 'En curso')}</small></figcaption>
    <div className="tv-team-request"><CaptureRegion src="/assets/experience/chat-outcomes/team-13.webp" box={[600,58,330,66]} alt={t('Air conditioning request, Room 214, in progress', 'Solicitud de aire acondicionado, habitación 214, en curso')}/></div>
    <div className="tv-team-record"><CaptureRegion src="/assets/experience/chat-outcomes/team-13.webp" box={[621,277,313,167]} alt={t('Engineering owns the response. House team is the assigned colleague. Verify the summary before acting.', 'Ingeniería es responsable. House team es el equipo asignado. Verificar el resumen antes de actuar.')}/><CaptureRegion src="/assets/experience/chat-outcomes/team-13.webp" box={[990,173,232,241]} alt={t('Audit timeline: request recorded, acknowledged by Ana G., work started', 'Historial: solicitud registrada, reconocida por Ana G., trabajo iniciado')}/></div>
  </figure>
}
