'use client'

import Image from 'next/image'
import { ArrowRight, Clock3, MessageCircle, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'
import './demand-insight.css'

/** A conceptual marketing example, with no customer counts or inferred ROI. */
export function DemandInsight({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang()
  const t = (en: string, es: string) => lang === 'es' ? es : en
  return <figure className={`hc-demand-insight ${compact ? 'hc-demand-compact' : ''}`}>
    <div className="hc-demand-scene">
      <div className="hc-demand-guest">
        <Image src="/assets/ui/spa-1.webp" alt="" fill sizes="(max-width:800px) 90vw, 440px"/>
        <div><span><MessageCircle size={14}/>{t('THE GUEST’S WORDS', 'LO QUE DIJO EL HUÉSPED')}</span><blockquote>{t('“We only have 45 minutes before dinner.”', '«Solo tenemos 45 minutos antes de cenar».')}</blockquote><small>{t('Interest in the spa. A limit on time.', 'Interés en el spa. Poco tiempo disponible.')}</small></div>
      </div>
      <ArrowRight className="hc-demand-bridge" size={23} aria-hidden="true"/>
      <div className="hc-demand-report">
        <header><span>COMPANION CONTROL</span><Clock3 size={17}/></header>
        <h3>{t('Shorter spa visits', 'Visitas más cortas al spa')}</h3>
        <dl><div><dt>{t('Guest need', 'Necesidad del huésped')}</dt><dd>{t('A treatment under an hour', 'Un tratamiento de menos de una hora')}</dd></div><div><dt>{t('What got in the way', 'Qué impidió la compra')}</dt><dd>{t('The full-day package did not fit', 'El paquete de día completo no encajaba')}</dd></div><div><dt>{t('Outcome', 'Resultado')}</dt><dd>{t('No suitable alternative', 'Sin una alternativa adecuada')}</dd></div></dl>
        <div className="hc-demand-action"><Sparkles size={19}/><div><small>{t('AN OPPORTUNITY TO REVIEW', 'UNA OPORTUNIDAD PARA REVISAR')}</small><p>{t('Consider a 30-minute treatment.', 'Considera un tratamiento de 30 minutos.')}</p></div></div>
      </div>
    </div>
    <figcaption>{t('Illustrative guest signal and commercial insight.', 'Ejemplo ilustrativo de una necesidad y oportunidad comercial.')}</figcaption>
  </figure>
}
