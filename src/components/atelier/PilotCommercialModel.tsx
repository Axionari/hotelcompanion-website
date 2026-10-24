'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { pilotCommercial } from '@/lib/i18n/marketing/pilotCommercial'
import { Label, useText } from './Atelier'
import './pilot-commercial.css'

export function PilotCommercialModel() {
  const t = useText()
  const { lang } = useLang()
  const commercial = pilotCommercial[lang]
  const feePresentation = [
    { title: t('Setup & integration', 'Configuración e integración'), cadence: t('One-time fee', 'Pago único'), note: t('A foundation built around your hotel.', 'Una base adaptada a tu hotel.') },
    { title: t('Monthly platform', 'Plataforma mensual'), cadence: t('Monthly minimum', 'Cuota mensual mínima'), note: t('A defined scope. A predictable commitment.', 'Un alcance definido. Un compromiso previsible.') },
    { title: t('Success fee', 'Comisión por resultados'), cadence: t('Tied to performance', 'Ligada a resultados'), note: t('Our upside grows with yours.', 'Crecemos con tus resultados.') },
  ]
  const measurement = [
    { title: t('Agree the baseline', 'Acordar la referencia'), body: t('Define the comparison, eligible services and costs before launch.', 'Definir la comparación, los servicios elegibles y los costos antes de lanzar.') },
    { title: t('Verify the contribution', 'Verificar la contribución'), body: t('Reconcile completed sales, costs, cancellations and refunds.', 'Conciliar ventas completadas, costos, cancelaciones y devoluciones.') },
    { title: t('Review it together', 'Revisarlo juntos'), body: t('Apply the agreed share to positive additional contribution.', 'Aplicar el porcentaje acordado a la contribución adicional positiva.') },
  ]

  return (
    <section className="at-commercial" id="pilot-terms" aria-labelledby="commercial-title">
      <div className="at-wrap">
        <header className="at-commercial-heading">
          <div>
            <Label>{t('The commercial model', 'El modelo comercial')}</Label>
            <h2 id="commercial-title">{commercial.title[0]}<br />{commercial.title[1]}</h2>
          </div>
          <p>{t('Three parts, tailored to your hotel. A foundation to launch, a platform to run, and a shared incentive to grow.', 'Tres partes, adaptadas a tu hotel. Una base para lanzar, una plataforma para operar y un incentivo compartido para crecer.')}</p>
        </header>

        <ol className="at-commercial-fees" aria-label={t('The three components of your proposal', 'Los tres componentes de tu propuesta')}>
          {commercial.fees.map((fee, index) => (
            <li className={`at-commercial-fee at-commercial-fee--${fee.id}`} key={fee.id}>
              <div className="at-commercial-fee-top"><span aria-hidden="true">0{index + 1}</span><span>{feePresentation[index].cadence}</span></div>
              <h3>{feePresentation[index].title}</h3>
              <p>{fee.description}</p>
              <div className="at-commercial-fee-note">{feePresentation[index].note}</div>
            </li>
          ))}
        </ol>
        <p className="at-commercial-agreement"><Check size={15} strokeWidth={1.5} aria-hidden="true" />{commercial.tailored}</p>

        <div className="at-commercial-measurement">
          <div className="at-commercial-measurement-intro">
            <span>{t('Measuring success', 'Medir los resultados')}</span>
            <h3>{t('Clear from day one.', 'Claro desde el inicio.')}</h3>
          </div>
          <ol className="at-commercial-measurement-steps">
            {measurement.map((step, index) => (
              <li key={step.title}>
                <div className="at-commercial-step-heading"><span className="at-commercial-step-dot" aria-hidden="true" /><h4>{step.title}</h4>{index < measurement.length - 1 && <ArrowRight size={15} strokeWidth={1.3} aria-hidden="true" />}</div>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
