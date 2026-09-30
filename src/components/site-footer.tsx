"use client";

import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useCopy } from '@/lib/i18n/useCopy'
import { siteChromeCopy } from '@/lib/i18n/marketing/siteChrome'
import './site-chrome.css'

export function SiteFooter() {
  const c = useCopy(siteChromeCopy)
  return (
    <footer className="hc-site-footer">
      <div className="hc-site-footer-inner">
        <div className="hc-site-footer-top">
          <div className="hc-site-footer-brand"><Link prefetch={false} href="/">Hotel Companion</Link><p>{c.signature}</p><span>{c.footerSummary}</span></div>
          <div className="hc-site-footer-links">
            {c.footer.map(group => <div key={group.title}><h2>{group.title}</h2><ul>{group.links.map(link => <li key={link.href}><Link prefetch={false} href={link.href}>{link.label}</Link></li>)}</ul></div>)}
          </div>
        </div>
        <div className="hc-site-footer-grand" aria-hidden="true">Hotel Companion</div>
        <div className="hc-site-footer-bottom"><p>{c.copyright}</p><p>{c.builtOn} <a href="https://www.axionari.com">Axionari</a></p><Link prefetch={false} href="/accessibility">{c.accessibility}</Link></div>
      </div>
    </footer>
  )
}
