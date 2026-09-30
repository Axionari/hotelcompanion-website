'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { type Localized, useCopy } from '@/lib/i18n/useCopy'
import type { EssayMeta } from '@/lib/library'
import { articleVisuals } from '@/lib/i18n/marketing/articleVisuals'
import { ExperienceFrame } from '@/components/experience/ExperiencePages'
import { useWords } from '@/components/experience/Experience'
import { PageIntro } from '@/components/experience/PageSections'
import { FocusedPilot } from '@/components/experience/HomeClarity'
export interface ResourcesContent { essays:EssayMeta[]; categories:string[] }
const photos=articleVisuals.map(visual=>visual.en.src)
export default function ResourcesClient({content}:{content:Localized<ResourcesContent>}) {
 const t=useWords(),{essays,categories}=useCopy(content),[active,setActive]=useState('')
 const selected=categories.includes(active)?active:'',visible=selected?essays.filter(e=>e.category===selected):essays
 return <ExperienceFrame><PageIntro eyebrow={t('THE HC JOURNAL','EL JOURNAL DE HC')} title={t('Ideas for better hospitality.','Ideas para una mejor hospitalidad.')} body={t('Guest experience, hotel revenue and the thoughtful use of AI.','Experiencia del huésped, ingresos del hotel y uso atento de la IA.')}/><section className="hc-library xp-wrap" id="library" aria-label={t('Essay library','Biblioteca de ensayos')}><div className="hc-library-toolbar"><p aria-live="polite">{visible.length} {t('essays','ensayos')}</p><label>{t('Explore','Explora')}<select value={selected} onChange={e=>setActive(e.target.value)}><option value="">{t('All topics','Todos los temas')}</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label></div><ol className="hc-library-grid">{visible.map(e=><li key={e.slug}><Link href={`/resources/library/${e.slug}`}><Image src={photos[(e.order-1)%photos.length]} alt="" width={760} height={470} sizes="(max-width:800px) 90vw, 45vw"/><div><small>{e.category}</small><h2>{e.title}</h2><span>{e.readingTime}<ArrowUpRight size={17}/></span></div></Link></li>)}</ol></section><FocusedPilot/></ExperienceFrame>
}
