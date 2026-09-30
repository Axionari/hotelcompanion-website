'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, BookOpen, Check, Mic, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { Action, Eyebrow, useWords } from './Experience'
import './home-clarity.css'

// Each illustration enters once. The full message remains visible without motion.
function useEntrance() {
  const ref = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setReady(true)
        observer.disconnect()
      }
    }, { threshold: .2 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return { ref, ready }
}

export function OnboardingTimeline() {
  const t = useWords(), { ref, ready } = useEntrance()
  const steps = [
    { title: t('Share your hotel', 'Comparte tu hotel'), body: t('Room features, services, prices and guest information.', 'Detalles de habitaciones, servicios, precios e información para huéspedes.') },
    { title: t('Set the rules', 'Define las reglas'), body: t('Approve offers, channels and team responsibilities.', 'Aprueba ofertas, canales y responsables del equipo.') },
    { title: t('Try it together', 'Pruébalo con nosotros'), body: t('Rehearse offers, combined requests and confirmations.', 'Prueba ofertas, solicitudes combinadas y confirmaciones.') },
    { title: t('Launch & measure', 'Lanza y mide'), body: t('Start at one hotel. Review results before expanding.', 'Empieza en un hotel. Revisa resultados antes de ampliar.') },
  ]
  return <section className="hc-onboarding" id="setup" ref={ref} data-ready={ready} aria-labelledby="setup-title">
    <div className="xp-wrap">
      <div className="hc-clarity-heading"><Eyebrow>{t('GETTING STARTED', 'PARA EMPEZAR')}</Eyebrow><h2 id="setup-title">{t('Your first hotel.','Tu primer hotel.')}<br/>{t('Four clear steps.','Cuatro pasos claros.')}</h2></div>
      <ol className="hc-launch-timeline">
        {steps.map((step, i) => <li key={i} style={{ '--step': i } as CSSProperties}>
          <div className="hc-step-mark"><span>0{i + 1}</span><i aria-hidden="true"/></div>
          <div className={`hc-step-art hc-step-art-${i}`} aria-hidden="true">
            {i === 0 ? <div className="hc-knowledge-sheet"><div className="hc-sheet-photo"><Image src="/assets/lux/hotel-companion-hero-v2.webp" alt="" fill sizes="155px"/></div><div className="hc-sheet-name"><BookOpen size={13}/>{t('Your hotel','Tu hotel')}</div><i/><i/><div className="hc-sheet-tags"><span>{t('Services','Servicios')}</span><span>{t('Prices','Precios')}</span></div><span className="hc-sheet-stamp"><Check size={14}/></span></div>
            : i === 1 ? <div className="hc-approved-card"><span className="hc-art-icon"><ShieldCheck size={22}/></span><strong>{t('Hotel-approved','Aprobado por el hotel')}</strong><div><span>{t('Offers','Ofertas')}</span><Check size={13}/></div><div><span>{t('Margin rules','Reglas de margen')}</span><Check size={13}/></div></div>
            : i === 2 ? <div className="hc-test-conversation"><div className="hc-test-guest"><Mic size={14}/><span>{t('A dinner for two?','¿Una cena para dos?')}</span></div><div className="hc-test-answer"><span className="hc-test-wave">{[8,15,22,12,28,19,10,23,16,8].map((height,n)=><i key={n} style={{height}}/>)}</span><span className="hc-test-check"><Check size={14}/></span></div><small>{t('Reviewed with your team','Revisado con tu equipo')}</small></div>
            : <div className="hc-launch-report"><div><span>{t('Pilot results','Resultados del piloto')}</span><ArrowRight size={13}/></div><div className="hc-launch-bars">{[30,45,37,62,76,90].map((height,n)=><i key={n} style={{height:`${height}%`,'--bar':n} as CSSProperties}/>)}</div><span className="hc-launch-baseline"/><small>{t('Measure. Review. Expand.','Medir. Revisar. Ampliar.')}</small></div>}
          </div>
          <h3>{step.title}</h3><p>{step.body}</p>
        </li>)}
      </ol>
      <div className="hc-timeline-foot"><p>{t('Launch timing depends on the agreed scope and connections.','El plazo depende del alcance y las conexiones acordadas.')}</p><Link className="xp-inline-link" href="/implementation">{t('See the setup plan','Conoce el plan de implementación')}<ArrowRight size={16}/></Link></div>
    </div>
  </section>
}

export function HotelConnections() {
  const t = useWords(), { ref, ready } = useEntrance()
  const systems = [
    {name:'Oracle OPERA',file:'opera-v2',kind:t('Property management','Gestión hotelera')},
    {name:'Mews',file:'mews',kind:t('Property management','Gestión hotelera')},
    {name:'Cloudbeds',file:'cloudbeds',kind:t('Property management','Gestión hotelera')},
    {name:'OpenTable',file:'opentable',kind:t('Dining','Restauración')},
    {name:'Toast',file:'toast',kind:'POS'},
    {name:'Stripe',file:'stripe',kind:t('Payments','Pagos')},
    {name:'Salesforce',file:'salesforce',kind:'CRM'},
    {name:'Twilio',file:'twilio',kind:t('Communications','Comunicación')},
  ]
  return <section className="hc-connected hc-logo-connections" id="connections" ref={ref} data-ready={ready} aria-labelledby="connections-title">
    <div className="xp-wrap hc-logo-stage">
      <div className="hc-logo-copy"><Eyebrow>{t('CONNECTED TO YOUR HOTEL','CONECTADO A TU HOTEL')}</Eyebrow><h2 id="connections-title">{t('Your systems.','Tus sistemas.')}<br/>{t('Working together.','Trabajando juntos.')}</h2><p>{t('Secure APIs where available. Browser automation where needed.','API seguras cuando existen. Automatización en navegador cuando se necesita.')}</p><Action>{t('Let’s connect your hotel','Conectemos tu hotel')}</Action></div>
      {systems.map((system,i)=><div className={`hc-system-logo hc-system-logo-${i}`} key={system.file} style={{'--node':i} as CSSProperties}><div><Image src={`/assets/connections/${system.file}.png`} alt={system.name} width={64} height={64} sizes="64px"/></div><span>{system.name}</span></div>)}
    </div>
    <details className="hc-connection-method"><summary>{t('How we connect','Cómo nos conectamos')}<span aria-hidden="true">+</span></summary><p>{t('We configure connections around your hotel’s workflows: secure APIs, authorized browser agents and existing processes. The logos show examples of hotel software; the connection method and supported actions are confirmed for your setup.','Configuramos conexiones según los flujos de tu hotel: API seguras, agentes autorizados en navegador y procesos existentes. Los logotipos muestran ejemplos de software hotelero; el método y las acciones se confirman para tu configuración.')}</p></details>
  </section>
}

export function FocusedPilot() {
  const t = useWords()
  return <section className="hc-focused-pilot" id="pilot" aria-labelledby="pilot-title"><div className="xp-wrap"><Eyebrow>{t('THE OUTCOME-BASED PILOT','EL PILOTO BASADO EN RESULTADOS')}</Eyebrow><h2 id="pilot-title">{t('Start with one hotel.','Empieza con un hotel.')}<br/>{t('Pay for proven value.','Paga por valor demostrado.')}</h2><p>{t('No upfront software or standard setup fee for a qualified pilot. Agree how value is measured before launch. No verified lift means no success fee.','Sin pago inicial de software ni configuración estándar para un piloto elegible. Acordamos la medición antes de lanzar. Sin incremento verificado, no hay comisión de éxito.')}</p><div className="hc-focused-pilot-actions"><Action>{t('Discuss your pilot','Hablemos de tu piloto')}</Action><Link href="/implementation#pilot-terms">{t('See the pilot terms','Ver condiciones del piloto')}<ArrowRight size={15}/></Link></div><small>{t('Success fee: an agreed share of additional contribution after costs. Custom connections and optional hardware priced separately.','Comisión: un porcentaje acordado de la contribución adicional después de costos. Conexiones especiales y hardware opcional cotizados aparte.')}</small></div></section>
}
