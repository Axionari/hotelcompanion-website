'use client'

import Image from 'next/image'
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, Check, CreditCard, Fingerprint, Layers3, LockKeyhole, ShieldCheck, Users } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { Button, Label, SectionHead, photos, useText } from './Atelier'
import './enterprise-page.css'

export default function EnterprisePage() {
  const t = useText()
  const properties = [
    { image: '/assets/editorial/hc-boutique-suite-blue-hour.webp', title: t('Coastal resort', 'Resort costero'), detail: t('A slower rhythm. A stay by the sea.', 'Otro ritmo. Una estancia junto al mar.') },
    { image: '/assets/editorial/hc-white-label-mexico-city.webp', title: t('City hotel', 'Hotel urbano'), detail: t('Local knowledge. A well-connected stay.', 'Conocimiento local. Una estancia bien conectada.') },
    { image: '/assets/editorial/hc-white-label-san-miguel.webp', title: t('Boutique retreat', 'Hotel boutique'), detail: t('Its own character. Its own welcome.', 'Su propio carácter. Su propia bienvenida.') },
  ]
  const governance = [
    { icon: ShieldCheck, title: t('Standards with an owner.', 'Estándares con un responsable.'), body: t('Assign hotel or department owners to policies, services and prices. Review updates before publishing and keep a record of important changes.', 'Asigna responsables de políticas, servicios y precios por hotel o departamento. Revisa las actualizaciones antes de publicarlas y conserva un registro de cambios importantes.') },
    { icon: Users, title: t('Access with a clear scope.', 'Acceso con un alcance claro.'), body: t('Define who can view, approve and change information. Validate property boundaries and group reporting during setup.', 'Define quién puede consultar, aprobar y modificar información. Valida los límites de cada hotel y los reportes del grupo durante la configuración.') },
    { icon: Layers3, title: t('A common view of progress.', 'Una visión común del avance.'), body: t('Bring conversations, open requests, stay inquiries and accepted offers together for the properties you manage. Measure revenue lift separately against the pilot’s agreed method.', 'Reúne conversaciones, solicitudes abiertas, consultas de estancia y ofertas aceptadas de los hoteles que administras. Mide el incremento de ingresos con el método acordado para el piloto.') },
  ]
  const rollout = [
    { number: '01', label: t('Start with one hotel', 'Empieza con un hotel'), title: t('Make the first stay better.', 'Mejora la primera estancia.'), body: t('Agree the scope, baseline and owners. Launch hotel and destination knowledge, guest conversations and team workflows.', 'Acuerda el alcance, la línea base y los responsables. Activa conocimiento del hotel y del destino, conversaciones y flujos de trabajo.'), detail: t('Initial value in 1–3 weeks', 'Valor inicial en 1–3 semanas') },
    { number: '02', label: t('Establish the standard', 'Establece el estándar'), title: t('Learn. Connect. Refine.', 'Aprende. Conecta. Ajusta.'), body: t('Review the pilot against agreed outcomes. Add PMS, POS and payment connections in stages, based on system access and provider requirements.', 'Revisa el piloto según los resultados acordados. Incorpora PMS, POS y pagos por etapas, según el acceso a sistemas y los requisitos de cada proveedor.'), detail: t('A measured rollout', 'Un despliegue medido') },
    { number: '03', label: t('Expand with confidence', 'Expande con confianza'), title: t('Carry forward what works.', 'Replica lo que funciona.'), body: t('Take the shared standards to the next property. Adapt its knowledge, offers, voice and team ownership before going live.', 'Lleva los estándares compartidos al siguiente hotel. Adapta su conocimiento, ofertas, voz y responsables antes del lanzamiento.'), detail: t('Property by property', 'Hotel por hotel') },
  ]

  return <div className="at-enterprise">
    <header className="at-enterprise-hero at-wrap">
      <div className="at-enterprise-hero-copy"><Label>{t('For hotel groups', 'Para grupos hoteleros')}</Label><h1>{t('Shared standards.', 'Estándares compartidos.')}<br/><span>{t('Distinctive hotels.', 'Hoteles con identidad propia.')}</span></h1><div className="at-enterprise-hero-summary"><p>{t('One approach across your portfolio. Each hotel keeps its own voice, knowledge, offers and team.', 'Un enfoque para todo el portafolio. Cada hotel conserva su propia voz, conocimiento, ofertas y equipo.')}</p><Button>{t('Plan your pilot', 'Planea tu piloto')}</Button></div></div>
      <div className="at-enterprise-hero-composition"><figure className="at-enterprise-hero-photo"><Image src={photos.group} alt={t('A hotel with a distinctive architectural character', 'Un hotel con un carácter arquitectónico propio')} fill priority sizes="(max-width:750px) 95vw, 72vw"/><figcaption><span>{t('One portfolio.', 'Un portafolio.')}</span><i>{t('Many ways to welcome.', 'Muchas formas de dar la bienvenida.')}</i></figcaption></figure><figure className="at-enterprise-hero-inset"><Image src="/assets/editorial/hc-boutique-suite-blue-hour.webp" alt={t('A coastal hotel with its own setting and character', 'Un hotel costero con su propio entorno y carácter')} fill sizes="(max-width:750px) 35vw, 23vw"/></figure><div className="at-enterprise-hero-caption"><span>01 / 03</span><p>{t('Independent spirit. Shared standards.', 'Espíritu independiente. Estándares compartidos.')}</p></div></div>
    </header>

    <section className="at-enterprise-architecture at-section" id="portfolio">
      <div className="at-wrap">
        <SectionHead label={t('The portfolio architecture', 'La arquitectura del portafolio')} title={<>{t('Consistency at the center.', 'Consistencia en el centro.')}<br/>{t('Character at every hotel.', 'Carácter en cada hotel.')}</>} body={t('Set what the group shares. Keep what makes each property worth coming back to.', 'Define lo que comparte el grupo. Conserva lo que hace que valga la pena volver a cada hotel.')}/>
        <figure className="at-enterprise-map" aria-label={t('Portfolio architecture: shared group standards connect to three distinct property configurations.', 'Arquitectura del portafolio: los estándares del grupo se conectan con tres configuraciones de hotel distintas.')}>
          <div className="at-enterprise-map-caption"><span>01</span><span>{t('THE GROUP DEFINES THE STANDARD', 'EL GRUPO DEFINE EL ESTÁNDAR')}</span><i/></div>
          <div className="at-enterprise-map-center">
            <div className="at-enterprise-map-brand"><span className="at-enterprise-mark">h</span><div><span>{t('Shared across the group', 'Compartido por el grupo')}</span><h3>Hotel Companion</h3></div></div>
            <ul><li>{t('Offer rules', 'Reglas de ofertas')}</li><li>{t('Service standards', 'Estándares de servicio')}</li><li>{t('Outcome definitions', 'Definiciones de resultados')}</li></ul>
          </div>
          <div className="at-enterprise-branches" aria-hidden="true"><span/><span/><span/></div>
          <div className="at-enterprise-map-local"><span>02</span><span>{t('EACH HOTEL MAKES IT ITS OWN', 'CADA HOTEL LE DA SU IDENTIDAD')}</span></div><div className="at-enterprise-properties">
            {properties.map((property, index)=><article key={property.image} className="at-enterprise-property">
              <div className="at-enterprise-property-photo"><Image src={property.image} alt="" fill sizes="(max-width:750px) 100vw, 30vw"/><span>0{index+1}</span></div>
              <div className="at-enterprise-property-body"><h4>{property.title}</h4><p>{property.detail}</p><div><Building2 size={15} aria-hidden="true"/><span>{t('Local knowledge · offers · voice · team', 'Conocimiento · ofertas · voz · equipo locales')}</span></div></div>
            </article>)}
          </div>
          <figcaption>{t('Shared standards. Separate property configuration and access.', 'Estándares compartidos. Configuración y acceso separados por hotel.')}</figcaption>
        </figure>
      </div>
    </section>

    <section className="at-enterprise-governance at-section at-wrap" id="governance">
      <div className="at-enterprise-governance-intro">
        <Label>{t('Group control. Local ownership.', 'Control del grupo. Responsabilidad local.')}</Label>
        <h2>{t('Keep the standard.', 'Conserva el estándar.')}<br/>{t('Know who owns it.', 'Conoce al responsable.')}</h2>
        <p>{t('The group sets the direction. Each property keeps the context and accountability to deliver it.', 'El grupo marca la dirección. Cada hotel conserva el contexto y la responsabilidad para llevarla a la práctica.')}</p>
        <figure className="at-enterprise-governance-photo"><Image src={photos.anniversary} alt={t('An individual room, shaped by its own setting', 'Una habitación con la identidad de su entorno')} fill sizes="(max-width:750px) 90vw, 40vw"/></figure>

      </div>
      <div className="at-enterprise-governance-list">{governance.map(({icon:Icon,title,body},index)=><article key={title}><div><Icon size={21} strokeWidth={1.4} aria-hidden="true"/><span>0{index+1}</span></div><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="at-enterprise-insight" id="shared-intel"><span>{t('A better feedback loop', 'Aprendizaje continuo')}</span><h3>{t('Listen across the portfolio.', 'Escucha a todo el portafolio.')}</h3><p>{t('See what guests ask for, decline or cannot find. Use those patterns to improve approved offers, with local availability, costs and preferences in view.', 'Observa qué piden, rechazan o no encuentran los huéspedes. Usa esos patrones para mejorar las ofertas aprobadas, considerando disponibilidad, costos y preferencias locales.')}</p></div>
    </section>

    <section className="at-enterprise-boundaries at-section" id="payments">
      <div className="at-wrap">
        <SectionHead label={t('Clear boundaries', 'Límites claros')} title={t('Trust, built into the operation.', 'Confianza en la operación.')} body={t('Be precise about what can be remembered, who can access it and where payment details go.', 'Define qué se puede recordar, quién puede consultarlo y dónde se procesan los datos de pago.')}/>
        <div className="at-enterprise-boundary-grid">
          <article className="at-enterprise-memory"><Fingerprint size={26} strokeWidth={1.3} aria-hidden="true"/><h3>{t('A familiar welcome.', 'Una bienvenida familiar.')}</h3><p>{t('Current-stay context and saved preferences have different purposes. Agree identity, guest permission, retention and deletion before reusing context across visits or channels.', 'El contexto de la estancia actual y las preferencias guardadas tienen propósitos distintos. Acuerda identidad, permiso, retención y eliminación antes de reutilizar contexto entre visitas o canales.')}</p><ul><li><Check size={16} aria-hidden="true"/>{t('Identity before continuity', 'Identidad antes de dar continuidad')}</li><li><Check size={16} aria-hidden="true"/>{t('Permission before reuse', 'Permiso antes de reutilizar')}</li><li><Check size={16} aria-hidden="true"/>{t('Access defined by role and property', 'Acceso por rol y hotel')}</li></ul></article>
          <figure className="at-enterprise-payment"><figcaption><CreditCard size={22} strokeWidth={1.4} aria-hidden="true"/><div><h3>{t('A separate path for card details.', 'Una ruta separada para datos de tarjeta.')}</h3><p>{t('Where Stripe checkout is enabled', 'Cuando el checkout de Stripe está habilitado')}</p></div></figcaption><div className="at-enterprise-payment-path"><div><Users size={20} strokeWidth={1.4} aria-hidden="true"/><strong>{t('Guest', 'Huésped')}</strong><span>{t('Card details', 'Datos de tarjeta')}</span></div><ArrowRight size={22} aria-hidden="true"/><div><LockKeyhole size={20} strokeWidth={1.4} aria-hidden="true"/><strong>Stripe</strong><span>{t('Checkout', 'Checkout')}</span></div></div><div className="at-enterprise-payment-reference"><ArrowDown size={20} aria-hidden="true"/><span>{t('Tokenized reference', 'Referencia tokenizada')}</span></div><div className="at-enterprise-payment-hc"><span className="at-enterprise-mark">h</span><strong>Hotel Companion</strong><span>{t('Card details stay with Stripe', 'Los datos de tarjeta permanecen en Stripe')}</span></div><p className="at-enterprise-payment-note">{t('Payment actions use a validated connection.', 'Las acciones de pago utilizan una conexión validada.')}</p></figure>
        </div>
        <Link href="/trust" className="at-text-link at-enterprise-trust-link">{t('Review controls and procurement information', 'Consulta controles e información para la evaluación')}<ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <section className="at-enterprise-rollout" id="rollout">
      <span id="deploy" className="at-enterprise-anchor"/>
      <div className="at-wrap at-enterprise-rollout-layout"><div className="at-enterprise-rollout-intro"><Label>{t('One hotel first', 'Un hotel primero')}</Label><h2>{t('Prove it at one hotel.', 'Valídalo en un hotel.')}<br/><span>{t('Then make it a standard.', 'Después, conviértelo en estándar.')}</span></h2><p>{t('Build the first launch around useful guest and team experiences. Let the results guide the next property.', 'Diseña el primer lanzamiento alrededor de experiencias útiles para huéspedes y equipos. Deja que los resultados guíen al siguiente hotel.')}</p><figure><Image src={photos.group} alt={t('A considered welcome begins at one hotel', 'Una bienvenida cuidada empieza en un hotel')} fill sizes="(max-width:750px) 90vw, 40vw"/></figure></div><div className="at-enterprise-rollout-plan">

      <ol className="at-enterprise-rollout-steps">{rollout.map(step=><li key={step.number}><div className="at-enterprise-rollout-label"><span>{step.number}</span><span>{step.label}</span></div><h3>{step.title}</h3><p>{step.body}</p><strong>{step.detail}</strong></li>)}</ol>
      <div className="at-rollout-action"><Button>{t('Plan your first property', 'Planea tu primer hotel')}</Button></div>
      </div></div>
    </section>
  </div>
}
