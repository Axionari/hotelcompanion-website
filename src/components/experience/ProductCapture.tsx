import Image from 'next/image'

export function guestCapture(view: string, lang: 'en' | 'es') {
  const refreshed = view !== 'context'
  return `/assets/experience/sales-desktop-${view}${refreshed ? '-v2' : ''}${lang === 'es' ? '-es' : ''}.${refreshed ? 'webp' : 'jpg'}`
}

/** Art direction uses real phone captures, rather than shrinking a desktop UI.
 * The browser selects one source; hidden alternate images are never loaded. */
export function ProductCapture({ view, lang, alt, className = '', priority = false }: {
  view: string; lang: 'en' | 'es'; alt: string; className?: string; priority?: boolean
}) {
  return <picture className="hc-product-capture" data-view={view}>
    <source media="(max-width:700px)" srcSet={`/assets/experience/sales-phone-${view}${lang === 'es' ? '-es' : ''}.webp`} />
    <Image className={className} src={guestCapture(view, lang)} alt={alt} width={1024} height={768} priority={priority} sizes="(max-width:800px) 90vw, 850px" />
  </picture>
}
