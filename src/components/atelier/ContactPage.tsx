'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Button, Label, useText } from './Atelier'
import './contact-page.css'

export default function ContactPage() {
  const t = useText()
  return <div className="at-contact">
    <section className="at-contact-welcome at-wrap">
      <figure className="at-contact-photo"><Image src="/assets/editorial/hc-caribbean-arrival.webp" alt={t('A welcoming arrival at a hotel by the sea', 'Una cálida llegada a un hotel junto al mar')} fill priority sizes="(max-width:800px) 100vw, 45vw"/><figcaption><span>HOTEL COMPANION</span><i>{t('Good hospitality starts with a conversation.', 'La buena hospitalidad empieza con una conversación.')}</i></figcaption></figure>
      <div className="at-contact-copy">
        <Label>{t('Let’s talk', 'Conversemos')}</Label>
        <h1>{t('Bring us', 'Cuéntanos')}<br/><span>{t('your hotel.', 'de tu hotel.')}</span></h1>
        <p>{t('Tell us where guests or your team meet friction. We’ll explore one useful journey, the connections it needs and how you would measure its value.', 'Cuéntanos dónde encuentran fricción tus huéspedes o tu equipo. Exploremos un recorrido útil, las conexiones necesarias y cómo medir su valor.')}</p>
        <div className="at-contact-sales" id="sales"><div><span>{t('Sales & pilots', 'Ventas y pilotos')}</span><h2>{t('A presentation shaped around you.', 'Una presentación pensada para ti.')}</h2></div><Button>{t('Request a demo', 'Solicita una demo')}</Button><a href="mailto:sales@axionari.com">sales@axionari.com<ArrowUpRight size={16} aria-hidden="true"/></a></div>
        <div className="at-contact-support" id="support"><div><span>{t('Already working with HC?', '¿Ya trabajas con HC?')}</span><h2>{t('Your team is here.', 'Tu equipo está aquí.')}</h2></div><a href="mailto:support@axionari.com">support@axionari.com<ArrowUpRight size={16} aria-hidden="true"/></a></div>
      </div>
    </section>
    <div className="at-contact-reassurance"><div className="at-wrap"><span>01 <strong>{t('Your guest journey', 'La experiencia de tus huéspedes')}</strong></span><span>02 <strong>{t('Your hotel’s priorities', 'Las prioridades de tu hotel')}</strong></span><span>03 <strong>{t('A clear next step', 'Un siguiente paso claro')}</strong></span></div></div>
  </div>
}
