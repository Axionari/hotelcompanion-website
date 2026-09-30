'use client'

import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { SectionHeading, VoiceSample, useWords } from '@/components/experience/Experience'
import { CommercialScene, EditorialHero, GuestExperienceStage } from '@/components/experience/EditorialHome'
import { ServiceJourney } from '@/components/experience/ServiceJourney'
import { FocusedPilot, HotelConnections, OnboardingTimeline } from '@/components/experience/HomeClarity'

export default function HomeExperienceClient(){
 const t=useWords()
 return <div className="xp-site eh-home"><a className="xp-skip" href="#main-content">{t('Skip to content','Saltar al contenido')}</a><SiteNav/><main id="main-content"><EditorialHero/>
 <section className="eh-section xp-wrap" id="guest-experience"><SectionHeading eyebrow={t('THE GUEST EXPERIENCE','LA EXPERIENCIA DEL HUÉSPED')} title={t('Understand the guest. Offer what fits.','Entiende al huésped. Ofrece lo que encaja.')} body={t('Relevant offers, natural conversations and remembered preferences. Explore the experience below.','Ofertas relevantes, conversaciones naturales y preferencias recordadas. Explora la experiencia.')}/><GuestExperienceStage/></section>
 <CommercialScene/>
 <section className="eh-section eh-voice-section"><div className="xp-wrap"><VoiceSample/></div></section>
 <section className="eh-section eh-control-section"><div className="xp-wrap"><SectionHeading eyebrow="COMPANION CONTROL" title={t('A conversation. A clear next step.','Una conversación. Un siguiente paso claro.')} body={t('See how guest context reaches your team—and how a request becomes a confirmed outcome.','Mira cómo el contexto llega al equipo y una solicitud se convierte en un resultado confirmado.')}/><ServiceJourney/><Link className="xp-inline-link" href="/platform#control">{t('Explore offers, rules & Companion Control','Explora ofertas, reglas y Companion Control')} →</Link></div></section>
 <OnboardingTimeline/>
 <HotelConnections/>
 <FocusedPilot/>
 </main><SiteFooter/></div>
}
