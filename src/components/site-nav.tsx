'use client'
import {useEffect,useRef,useState} from 'react'
import {ArrowUpRight,AudioLines,Bookmark,ChevronDown,Menu,Network,Sparkles,Users,X} from 'lucide-react'
import {usePathname} from 'next/navigation'
import {stripLanguagePrefix} from '@/lib/i18n/paths'
import {LocalizedLink as Link} from '@/components/LocalizedLink'
import LanguageToggle from '@/components/LanguageToggle'
import {useCopy} from '@/lib/i18n/useCopy'
import {siteChromeCopy} from '@/lib/i18n/marketing/siteChrome'
import {useLang} from '@/lib/i18n/LanguageContext'
import './site-chrome.css'
export function SiteNav({appearance='light'}:{appearance?:'light'|'dark'}){
 const c=useCopy(siteChromeCopy),{lang}=useLang(),path=stripLanguagePrefix(usePathname())
 const [open,setOpen]=useState(false),[product,setProduct]=useState(false)
 const header=useRef<HTMLElement>(null),toggle=useRef<HTMLButtonElement>(null),productToggle=useRef<HTMLButtonElement>(null)
 const t=(en:string,es:string)=>lang==='es'?es:en
 const features=[
 {name:t('Voice & text','Voz y texto'),body:t('A natural conversation, across channels.','Conversaciones naturales, en cada canal.'),id:'voice',icon:AudioLines},
 {name:t('Recommendations','Recomendaciones'),body:t('Relevant offers. Your hotel’s rules.','Ofertas relevantes. Las reglas de tu hotel.'),id:'recommendations',icon:Sparkles},
 {name:t('Guest memory','Memoria del huésped'),body:t('A familiar welcome on the next visit.','Una bienvenida familiar en la próxima visita.'),id:'memory',icon:Bookmark},
 {name:t('Team control','Control del equipo'),body:t('Every request has a next step.','Cada solicitud tiene un siguiente paso.'),id:'team-control',icon:Users},
 {name:t('Connections','Conexiones'),body:t('Your people, systems and standards.','Tus personas, sistemas y estándares.'),id:'connections',icon:Network}]
 const close=()=>{setOpen(false);setProduct(false)}
 useEffect(()=>{const key=(ev:KeyboardEvent)=>{if(open&&ev.key==='Tab'){const items=Array.from(header.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')??[]).filter(item=>item.offsetParent!==null);const first=items[0],last=items[items.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last?.focus()}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first?.focus()}}if(ev.key==='Escape'){if(product){setProduct(false);productToggle.current?.focus()}else{setOpen(false);toggle.current?.focus()}}};const outside=(ev:PointerEvent)=>{if(!header.current?.contains(ev.target as Node))close()};document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside)}},[product,open])
 useEffect(()=>{
  if(!open)return
  const prev=document.body.style.overflow
  const desktop=window.matchMedia('(min-width:1021px)')
  const closeOnDesktop=()=>{if(desktop.matches)setOpen(false)}
  document.body.style.overflow='hidden'
  desktop.addEventListener('change',closeOnDesktop)
  return()=>{document.body.style.overflow=prev;desktop.removeEventListener('change',closeOnDesktop)}
 },[open])
 return <header ref={header} className="hc-site-header" data-page-appearance={appearance} data-menu-open={open} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setProduct(false)}}>
 <nav className="hc-site-nav" aria-label={c.navLabel}>
 <Link href="/" className="hc-site-wordmark" onClick={close} aria-label="Hotel Companion home"><span className="hc-site-monogram">hc</span><span>HOTEL<small>COMPANION</small></span></Link>
 <div className="hc-site-desktop-links"><div className="hc-product-nav" onMouseEnter={()=>setProduct(true)}><Link href="/platform" aria-current={path==='/platform'?'page':undefined} onClick={close}>{c.links[0].label}</Link><button ref={productToggle} type="button" aria-label={t('Explore product features','Explorar funciones del producto')} aria-expanded={product} aria-controls="hc-product-menu" onClick={()=>setProduct(v=>!v)}><ChevronDown size={12}/></button></div>{c.links.slice(1).map(link=><Link key={link.href} href={link.href} aria-current={path===link.href?'page':undefined} onClick={close} onMouseEnter={()=>setProduct(false)}>{link.label}</Link>)}</div>
 <div className="hc-site-nav-actions"><div className="hc-header-language"><LanguageToggle/></div><Link href="/demo" className="hc-site-demo hc-site-desktop-cta" onClick={close}>{c.demo}<ArrowUpRight size={15}/></Link><button ref={toggle} type="button" className="hc-site-menu-toggle" aria-label={open?c.close:c.open} aria-expanded={open} aria-controls="hc-site-mobile-menu" onClick={()=>setOpen(v=>!v)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>
 </nav>
 <div className="hc-product-menu" id="hc-product-menu" hidden={!product} onMouseLeave={()=>setProduct(false)}><div><div className="hc-product-menu-intro"><small>{t('EXPLORE THE PRODUCT','EXPLORA EL PRODUCTO')}</small><h2>{t('Good service.','Buen servicio.')}<br/><em>{t('In every detail.','En cada detalle.')}</em></h2><Link href="/platform" onClick={close}>{t('Discover Hotel Companion','Descubre Hotel Companion')}<ArrowUpRight size={14}/></Link></div><div className="hc-product-feature-links">{features.map(f=><Link key={f.id} href={`/platform#${f.id}`} onClick={close}><f.icon size={20}/><span><strong>{f.name}<ArrowUpRight size={13}/></strong><small>{f.body}</small></span></Link>)}</div></div></div>
 <div id="hc-site-mobile-menu" className="hc-site-mobile-menu" hidden={!open}><div className="hc-menu-language"><LanguageToggle onChange={close}/></div>{c.links.map(link=><div key={link.href}><Link href={link.href} aria-current={path===link.href?'page':undefined} onClick={close}>{link.label}<ArrowUpRight size={18}/></Link>{link.href==='/platform'&&<div className="hc-mobile-features">{features.map(f=><Link key={f.id} href={`/platform#${f.id}`} onClick={close}>{f.name}</Link>)}</div>}</div>)}<Link href="/demo" className="hc-site-demo" onClick={close}>{c.demo}<ArrowUpRight size={17}/></Link></div>
 </header>
}
