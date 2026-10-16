import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function guestCapture(view: string, lang: 'en' | 'es', device: 'desktop' | 'phone' = 'desktop') {
  return `/assets/experience/sales-current-${device}-${view}-${lang}.jpg`
}

/** Art direction uses real phone captures, rather than shrinking a desktop UI.
 * The browser selects one source; hidden alternate images are never loaded. */
export function ProductCapture({ view, lang, alt, className = '', priority = false, device = 'responsive' }: {
  view: string; lang: 'en' | 'es'; alt: string; className?: string; priority?: boolean; device?: 'responsive' | 'phone'
}) {
  const phone = device === 'phone', desktopSrc = guestCapture(view, lang), phoneSrc = guestCapture(view, lang, 'phone')
  return <div className="hc-capture-shell" data-device={device}>
    <picture className="hc-product-capture" data-view={view}>
      {!phone && <source media="(max-width:700px)" srcSet={phoneSrc} width={433} height={938}/>}
      <Image unoptimized className={className} src={phone ? phoneSrc : desktopSrc} alt={alt} width={phone ? 433 : 1422} height={phone ? 938 : 1000} priority={priority} sizes={phone ? '(max-width:700px) 88vw, 320px' : '(max-width:700px) 88vw, 1100px'}/>
    </picture>
    <a className="hc-capture-expand hc-capture-expand-desktop" href={phone ? phoneSrc : desktopSrc} target="_blank" rel="noreferrer">{lang === 'es' ? 'Ver interfaz completa' : 'View full interface'}<ArrowUpRight size={14}/></a>
    {!phone && <a className="hc-capture-expand hc-capture-expand-phone" href={phoneSrc} target="_blank" rel="noreferrer">{lang === 'es' ? 'Ver interfaz completa' : 'View full interface'}<ArrowUpRight size={14}/></a>}
  </div>
}
