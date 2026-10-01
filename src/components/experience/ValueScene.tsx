'use client'

import { Check, Heart, Mic, Sparkles, Users } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

/** A short illustrative story layered over the real interface preview. */
export function ValueScene({ index, kind = 'capability' }: { index: number; kind?: 'capability' | 'gallery' | 'channel' }) {
  const { lang } = useLang(), t = (en: string, es: string) => lang === 'es' ? es : en
  const stories = kind === 'gallery' ? [
    [t('What can we do at the hotel?', '¿Qué podemos hacer en el hotel?'), t('Rooms · Dining · Wellness', 'Habitaciones · Gastronomía · Bienestar'), t('Your hotel, ready to explore', 'Tu hotel, listo para explorar')],
    [t('A balcony for morning coffee?', '¿Un balcón para el café?'), t('Private balcony · Garden view', 'Balcón privado · Vista al jardín'), t('An upgrade that fits', 'Una mejora que encaja')],
    [t('Something special for our anniversary.', 'Algo especial para nuestro aniversario.'), t('Terrace dinner for two', 'Cena en la terraza para dos'), t('A relevant hotel-approved offer', 'Una oferta relevante aprobada')],
    [t('We have an hour before dinner.', 'Tenemos una hora antes de cenar.'), t('45-minute spa treatment', 'Tratamiento de spa de 45 minutos'), t('Keep the opportunity alive', 'Conserva la oportunidad')],
    [t('We’re coming back.', 'Vamos a volver.'), t('Quiet evenings · Saved with permission', 'Noches tranquilas · Guardado con permiso'), t('A familiar welcome', 'Una bienvenida familiar')],
  ] : kind === 'channel' ? [
    [t('“We’d love a special dinner.”', '«Nos gustaría una cena especial».') ,t('A natural voice conversation', 'Una conversación natural'),t('Relevant options, ready to discuss', 'Opciones relevantes para conversar')],
    [t('Which room has a balcony?', '¿Qué habitación tiene balcón?'),t('Rooms with a private balcony', 'Habitaciones con balcón privado'),t('Discover. Ask. Choose.', 'Descubre. Pregunta. Elige.')],
    [t('Could we have extra towels?', '¿Podrían traer toallas extra?'),t('Room 204 · Housekeeping', 'Habitación 204 · Limpieza'),t('Request sent to the right team', 'Solicitud enviada al equipo correcto')],
    [t('Dinner in the room tonight?', '¿Cena en la habitación esta noche?'),t('Your hotel’s dining options', 'Opciones gastronómicas de tu hotel'),t('Hotel services, close at hand', 'Los servicios del hotel, a mano')],
  ] : [
    [t('It’s our anniversary.', 'Es nuestro aniversario.'),t('Terrace dinner + wine', 'Cena en la terraza + vino'),t('A relevant hotel-approved package', 'Un paquete relevante aprobado')],
    [t('Somewhere peaceful for dinner?', '¿Un lugar tranquilo para cenar?'),t('Quiet evenings · Guest-approved memory', 'Noches tranquilas · Memoria autorizada'),t('Private dining, matched to the guest', 'Cena privada según sus preferencias')],
    [t('Can you help us plan tonight?', '¿Nos ayudas a planear esta noche?'),t('Voice → Context → Next step', 'Voz → Contexto → Siguiente paso'),t('Speak naturally. Get useful options.', 'Habla naturalmente. Recibe opciones útiles.')],
    [t('Extra towels before dinner, please.', 'Toallas extra antes de cenar, por favor.'),t('Room 204 · Housekeeping', 'Habitación 204 · Limpieza'),t('Request sent with room and timing', 'Solicitud enviada con habitación y horario')],
  ]
  const story = stories[index], Icon = kind === 'capability' && index === 1 ? Heart : kind === 'capability' && index === 2 || kind === 'channel' && index === 0 ? Mic : kind === 'capability' && index === 3 ? Users : Sparkles
  const voice = kind === 'capability' && index === 2 || kind === 'channel' && index === 0
  return <div className="hc-value-scene" key={`${kind}-${index}-${lang}`}>
    <div className="hc-value-guest"><span className="hc-value-avatar">G</span><p>{story[0]}</p></div>
    <div className="hc-value-path" aria-hidden="true">{voice ? <span className="hc-value-voice-wave">{[7,13,20,12,25,17,9,22,14,26,11,18,8,21,15,7].map((height,i)=><i key={i} style={{height,animationDelay:`${i*-.08}s`}}/>)}</span> : <><i/><span/><i/></>}</div>
    <div className="hc-value-response"><span className="hc-value-icon"><Icon size={17}/></span><div><small>HOTEL COMPANION</small><strong>{story[1]}</strong></div></div>
    <div className="hc-value-result"><Check size={13}/><span>{story[2]}</span></div>
  </div>
}
