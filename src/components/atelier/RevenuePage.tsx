'use client'

import Image from 'next/image'
import { ArrowDown, Check, RotateCcw } from 'lucide-react'
import { ContributionExample, Details, RecoveryStory } from '@/components/experience/PageSections'
import { DemandInsight } from '@/components/experience/DemandInsight'
import { Button, Label, SectionHead, photos, useText } from './Atelier'
import './revenue-page.css'

export default function RevenuePage() {
  const t = useText()
  const journey = [
    [t('Listen for the occasion.', 'Escucha la ocasión.'), t('A room with a balcony. A special dinner. An hour to unwind.', 'Una habitación con balcón. Una cena especial. Una hora para relajarse.')],
    [t('Make a relevant offer.', 'Haz una oferta relevante.'), t('Match the moment to services, prices and availability your hotel approves.', 'Relaciona el momento con servicios, precios y disponibilidad que tu hotel aprueba.')],
    [t('Measure the added value.', 'Mide el valor adicional.'), t('A completed sale, after costs and an agreed comparison.', 'Una venta completada, después de costos y una comparación acordada.')],
  ]

  return <div className="at-revenue">
    <header className="at-revenue-hero at-wrap">
      <div className="at-revenue-hero-copy"><Label>{t('Revenue with relevance', 'Ingresos con relevancia')}</Label><h1>{t('Capture the interest.', 'Capta el interés.')}<br/><span>{t('Earn the value.', 'Genera valor.')}</span></h1><p>{t('Help more guest enquiries become direct bookings and relevant additions. Review completed sales, delivery costs and the contribution your hotel gains.', 'Ayuda a convertir más consultas en reservas directas y complementos relevantes. Revisa ventas completadas, costos del servicio y la contribución para tu hotel.')}</p><a className="at-text-link" href="#recommendations">{t('Follow the opportunity', 'Sigue la oportunidad')}<ArrowDown size={16}/></a></div>
      <figure className="at-revenue-hero-photo"><Image src={photos.anniversary} alt={t('A suite opening onto a terrace overlooking the sea', 'Una suite abierta a una terraza con vista al mar')} fill priority sizes="(max-width:750px) 100vw, 48vw"/><figcaption><span>{t('THE OCCASION IS THE OPPORTUNITY', 'LA OCASIÓN ES LA OPORTUNIDAD')}</span><blockquote>{t('“Something special for our anniversary.”', '«Algo especial para nuestro aniversario».')}</blockquote></figcaption></figure>
    </header>

    <div className="at-revenue-value-line"><ol className="at-wrap">{journey.map(([title,body],index)=><li key={title}><span>0{index+1}</span><div><h2>{title}</h2><p>{body}</p></div></li>)}</ol></div>

    <section className="at-revenue-recommendations at-section at-wrap" id="recommendations">
      <SectionHead label={t('Capture the opportunity', 'Aprovecha la oportunidad')} title={<>{t('An offer that fits.', 'Una oferta que encaja.')}<br/><span>{t('A reason to say yes.', 'Una razón para decir sí.')}</span></>} body={t('Listen to what matters, then make the next option useful. A different feature, a shorter treatment or another time can keep an opportunity open.', 'Escucha lo que importa y ofrece una alternativa útil. Otro detalle, un tratamiento más corto u otro horario pueden mantener abierta una oportunidad.')}/>
      <div className="at-revenue-recovery"><RecoveryStory/></div>
      <Details items={[{q:t('What makes a recommendation relevant?', '¿Qué hace relevante una recomendación?'),a:t('Start with the guest’s expressed needs. Match them to verified room features and hotel-approved services, prices and availability. Included benefits and past purchases stay out of sales prompts. Respect declines and pause offers during complaints. Confirm a specific room feature before promising it.', 'Parte de lo que expresa el huésped. Relaciónalo con detalles verificados y servicios, precios y disponibilidad aprobados. Los beneficios incluidos y compras anteriores no se vuelven a ofrecer. Respeta los rechazos y pausa las ofertas durante quejas. Confirma un detalle específico antes de prometerlo.')} ]}/>
    </section>

    <section className="at-revenue-packages" id="packages"><div className="at-wrap">
      <figure><Image src={photos.dining} alt={t('A thoughtfully prepared hotel dining experience', 'Una experiencia gastronómica cuidadosamente preparada')} fill sizes="(max-width:750px) 100vw, 42vw"/><figcaption>{t('Considered, not pushed.', 'Pensado, sin presionar.')}</figcaption></figure>
      <div className="at-revenue-package-copy"><Label>{t('Hotel-approved offers', 'Ofertas aprobadas por tu hotel')}</Label><h2>{t('Dinner for two.', 'Cena para dos.')}<br/><span>{t('A wine to match.', 'El vino adecuado.')}</span></h2><p>{t('Bring relevant services together in a package your hotel can deliver. Keep the price, availability and margin in your hands.', 'Reúne servicios relevantes en un paquete que tu hotel pueda ofrecer. Mantén el precio, la disponibilidad y el margen en tus manos.')}</p><ul><li><Check size={16}/>{t('Your services. Your pricing.', 'Tus servicios. Tus precios.')}</li><li><Check size={16}/>{t('Offers shaped by guest intent.', 'Ofertas según lo que busca el huésped.')}</li><li><Check size={16}/>{t('Included benefits stay included.', 'Los beneficios incluidos siguen incluidos.')}</li></ul><div className="at-revenue-return"><RotateCcw size={22} strokeWidth={1.4}/><div><span>{t('A reason to return', 'Una razón para volver')}</span><h3>{t('A credit toward the next stay.', 'Un crédito para la próxima estancia.')}</h3><p>{t('An optional benefit after an eligible purchase. Your hotel sets the terms and redemption limits; its cost stays in the contribution calculation.', 'Un beneficio opcional después de una compra elegible. Tu hotel define condiciones y límites; su costo se incluye en el cálculo de contribución.')}</p></div></div></div>
    </div></section>

    <section className="at-revenue-demand at-section at-wrap" id="guest-demand">
      <SectionHead label={t('Learn from guest demand', 'Aprende de tus huéspedes')} title={<>{t('The opportunity', 'La oportunidad')}<br/>{t('behind the “no.”', 'detrás del «no».')}</>} body={t('See what guests wanted, what got in the way and which alternatives deserve a place in your offers.', 'Conoce qué buscaban los huéspedes, qué impidió la compra y qué alternativas merecen estar en tus ofertas.')}/>
      <DemandInsight/>
      <div className="at-revenue-demand-note"><span>{t('FROM A GUEST SIGNAL TO A BETTER OFFER', 'DE UNA NECESIDAD A UNA MEJOR OFERTA')}</span><p>{t('Review the expressed need, the constraint and the outcome. Keep what the guest said separate from inferred reasons.', 'Revisa la necesidad expresada, la limitación y el resultado. Separa lo que dijo el huésped de los motivos inferidos.')}</p></div>
    </section>

    <section className="at-revenue-economics at-section" id="measurement"><div className="at-wrap">
      <div className="at-revenue-economics-intro"><Label>{t('The economics', 'Los resultados económicos')}</Label><h2>{t('Revenue is the start.', 'Los ingresos son el inicio.')}<br/><span>{t('Contribution is the measure.', 'La contribución es la medida.')}</span></h2><p>{t('Verify additional contribution against an agreed comparison, after service costs, discounts, cancellations and refunds. Then subtract Hotel Companion fees to review the hotel’s net benefit.', 'Verifica la contribución adicional con una comparación acordada, después de costos, descuentos, cancelaciones y reembolsos. Resta las tarifas de Hotel Companion para revisar el beneficio neto del hotel.')}</p><div className="at-revenue-measure"><span>{t('AGREED BEFORE LAUNCH', 'ACORDADO ANTES DE LANZAR')}</span><p>{t('Eligible outcomes. Source records. Costs. A comparison both teams can review.', 'Resultados elegibles. Registros de origen. Costos. Una comparación que ambos equipos puedan revisar.')}</p></div><Button>{t('Discuss your pilot', 'Hablemos de tu piloto')}</Button></div>
      <ContributionExample/>
    </div></section>
  </div>
}
