"use client";

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { stripLanguagePrefix } from '@/lib/i18n/paths'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import LanguageToggle from '@/components/LanguageToggle'
import { useCopy } from '@/lib/i18n/useCopy'
import { siteChromeCopy } from '@/lib/i18n/marketing/siteChrome'
import './site-chrome.css'

/** The optional appearance prop preserves existing page callers. */
export function SiteNav({ appearance = 'light' }: { appearance?: 'dark' | 'light' }) {
  const c = useCopy(siteChromeCopy)
  const pathname = stripLanguagePrefix(usePathname())
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width:1201px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', onResize)
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const controls = Array.from(header.current?.querySelectorAll<HTMLElement>('a, button') ?? []).filter(el => el.getClientRects().length > 0)
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    function onPointer(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => { document.body.style.overflow = previousOverflow; desktop.removeEventListener('change', onResize); document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer) }
  }, [open])
  return (
    <header ref={header} className="hc-site-header" data-page-appearance={appearance}>
      <nav className="hc-site-nav" aria-label={c.navLabel}>
        <Link href="/" className="hc-site-wordmark" onClick={() => setOpen(false)}>Hotel Companion</Link>
        <div className="hc-site-desktop-links">{c.links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</div>
        <div className="hc-site-nav-actions">
          <div className="hc-header-language"><LanguageToggle /></div>
          <Link href="/demo" className="hc-site-demo hc-site-desktop-cta">{c.demo}</Link>
          <Link href="/demo" className="hc-site-phone-demo">{c.demo}</Link>
          <button ref={toggle} type="button" className="hc-site-menu-toggle" aria-expanded={open} aria-controls="hc-site-mobile-menu" aria-label={open ? c.close : c.open} onClick={() => setOpen(value => !value)}>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
        <div id="hc-site-mobile-menu" className="hc-site-mobile-menu" hidden={!open}>
          <div className="hc-menu-language"><LanguageToggle onChange={() => setOpen(false)} /></div>
          {c.links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/demo" className="hc-site-demo" onClick={() => setOpen(false)}>{c.demo}</Link>
        </div>
      </nav>
    </header>
  )
}
