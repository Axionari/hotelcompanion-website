'use client'

import { type ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { useWords } from './Experience'
import './inner-clarity.css'
import CompanyPage from '../atelier/CompanyPage'
import SetupPage from '../atelier/SetupPage'
import ProductPage from '../atelier/ProductPage'
import GuestPage from '../atelier/GuestPage'
import EnterprisePage from '../atelier/EnterprisePage'
import RevenuePage from '../atelier/RevenuePage'
import ContactPage from '../atelier/ContactPage'
import { signatureFrameClass } from './SignatureSections'
import './interior-type.css'

export type ExperiencePageKey='platform'|'solutions'|'revenue'|'enterprise'|'implementation'|'company'|'contact'
export function ExperienceFrame({children,page}:{children:ReactNode;page?:ExperiencePageKey}) {
 const t=useWords()
 const appearance = page && ['platform','solutions','revenue'].includes(page) ? 'dark' : 'light'
 return <div className={`xp-site hc-inner ${page?signatureFrameClass:''}`} data-appearance={appearance} data-page={page}><a className="xp-skip" href="#main-content">{t('Skip to content','Saltar al contenido')}</a><SiteNav appearance={appearance}/><main id="main-content">{children}</main><SiteFooter/></div>
}

export default function ExperiencePage({page}:{page:ExperiencePageKey}) {
 const Page={platform:ProductPage,solutions:GuestPage,revenue:RevenuePage,enterprise:EnterprisePage,implementation:SetupPage,company:CompanyPage,contact:ContactPage}[page]
 return <ExperienceFrame page={page}><Page/></ExperienceFrame>
}
