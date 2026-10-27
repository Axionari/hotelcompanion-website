'use client'

import Image from 'next/image'
import { ArrowUpRight, Check, HeartHandshake, Plus, Sparkles, Target } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useCopy } from '@/lib/i18n/useCopy'
import { companyCopy } from '@/lib/i18n/marketing/company'
import { Button, Label, SectionHead, useText } from './Atelier'
import './atelier-support.css'

export default function CompanyPage() {
  const t = useText()
  const { leadership } = useCopy(companyCopy)
  const principles = [
    { Icon: Sparkles, title:t('Useful by design.', 'Útil por diseño.'), body:t('Make the next step easier for the guest and the people who serve them.', 'Facilita el siguiente paso para el huésped y para quienes lo atienden.') },
    { Icon: HeartHandshake, title:t('Personal, with permission.', 'Personal, con permiso.'), body:t('Remember the details that help. Let the guest decide what carries forward.', 'Recuerda los detalles que ayudan. El huésped decide qué conservar.') },
    { Icon: Target, title:t('Value that can be measured.', 'Valor que se puede medir.'), body:t('Respect the hotel’s standards. Measure completed outcomes and additional contribution.', 'Respeta los estándares del hotel. Mide resultados completados y contribución adicional.') },
  ]

  return <div className="at-company">
    <header className="at-company-hero at-wrap">
      <div className="at-company-intro">
        <Label>{t('Hotel Companion · By Axionari', 'Hotel Companion · Por Axionari')}</Label>
        <h1>{t('For the human', 'Por el lado humano')}<br/>{t('side of hospitality.', 'de la hospitalidad.')}</h1>
        <div className="at-company-intro-copy"><p>{t('We build Hotel Companion to help hotels welcome more business, ease pressure on their teams and give guests a more attentive stay.', 'Creamos Hotel Companion para ayudar a los hoteles a recibir más negocio, reducir la presión sobre sus equipos y atender mejor a sus huéspedes.')}</p><Link href="#leadership" className="at-text-link">{t('Meet the team', 'Conoce al equipo')}<ArrowUpRight size={16}/></Link></div>
      </div>
      <div className="at-company-visual"><figure className="at-company-photo"><Image src="/assets/editorial/hc-caribbean-lobby.webp" alt={t('A considered hotel lounge opening onto the sea', 'Una cuidada sala de hotel abierta al mar')} fill priority sizes="(max-width:750px) 100vw, 92vw"/></figure><div className="at-company-editorial-note"><span>{t('A simple conviction', 'Una convicción sencilla')}</span><p>{t('The best technology makes more room for people.', 'La mejor tecnología deja más espacio para las personas.')}</p><i>{t('Thoughtfully, by Axionari.', 'Con intención, por Axionari.')}</i></div><div className="at-company-image-caption"><span>{t('Hospitality is in the details.', 'La hospitalidad está en los detalles.')}</span><i>{t('Let them matter.', 'Dales su lugar.')}</i></div></div>
    </header>

    <section className="at-company-belief at-dark">
      <div className="at-wrap">
        <div className="at-company-belief-margin"><Label>{t('The way we build', 'Nuestra forma de crear')}</Label><p>{t('Less friction.', 'Menos fricción.')}<br/>{t('More feeling.', 'Más sensibilidad.')}</p></div><div className="at-company-belief-content"><h2>{t('Technology should give hospitality back its humanity.', 'La tecnología debe devolverle su humanidad a la hospitalidad.')}</h2><p>{t('Use intelligent assistance for routine questions, useful recommendations and clear handoffs. Give your people more room for judgment, reassurance and personal attention.', 'Usa asistencia inteligente para preguntas frecuentes, recomendaciones útiles y transferencias claras. Dale a tu gente más espacio para aportar criterio, tranquilidad y atención personal.')}</p><div className="at-company-principles">{principles.map(({Icon,title,body})=><article key={title}><Icon size={24} strokeWidth={1.4} aria-hidden="true"/><h3>{title}</h3><p>{body}</p></article>)}</div></div>
      </div>
    </section>

    <section className="at-company-team at-section at-wrap" id="leadership">
      <SectionHead label={t('Leadership', 'Liderazgo')} title={leadership.title} body={t('Experience in hospitality, enterprise technology and building businesses. One team, from the guest experience to the systems behind it.', 'Experiencia en hospitalidad, tecnología empresarial y creación de negocios. Un equipo, desde la experiencia del huésped hasta los sistemas que la hacen posible.')}/>
      <div className="at-company-people">{leadership.members.map((member,index)=><details key={member.name} className="at-company-person">
        <summary><span className="at-company-person-index">0{index+1}</span><span><strong>{member.name}</strong><span className="at-company-role">{member.role}</span></span><Plus size={18} aria-hidden="true"/></summary>
        <div className="at-company-bio"><p>{member.bio}</p><ul aria-label={t('Areas of expertise', 'Áreas de experiencia')}>{member.skills.map(skill=><li key={skill}>{skill}</li>)}</ul></div>
      </details>)}</div>
    </section>

    <section className="at-company-contact at-sage"><div className="at-wrap">
      <div><Label>{t('Let’s talk', 'Conversemos')}</Label><h2>{t('Bring us your hotel.', 'Cuéntanos de tu hotel.')}</h2><p>{t('A first conversation about the guest experience you want to create.', 'Una primera conversación sobre la experiencia que quieres crear.')}</p></div>
      <div><Button>{t('Request a demo', 'Solicita una demo')}</Button><a href="mailto:sales@axionari.com" className="at-text-link">sales@axionari.com<ArrowUpRight size={15}/></a><Link href="/trust" className="at-company-trust"><Check size={15}/>{t('Our approach to trust and responsibility', 'Nuestro enfoque de confianza y responsabilidad')}</Link></div>
    </div></section>
  </div>
}
