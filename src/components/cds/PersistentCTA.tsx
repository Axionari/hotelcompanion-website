'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'

/**
 * Mobile-only slim thumb-zone "Book a Demo" bar (brief §6/§9).
 * Appears after the hero scrolls past, hides when the footer is in view,
 * respects env(safe-area-inset-bottom), never covers the nav drawer (z below nav).
 */
export function PersistentCTA() {
  const { nav } = useCopy(globalCopy)
  const [pastHero, setPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setPastHero(window.scrollY > window.innerHeight * 0.85)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const footer = document.querySelector('footer')
    let observer: IntersectionObserver | undefined
    if (footer) {
      observer = new IntersectionObserver(
        (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
        { rootMargin: '0px 0px 0px 0px' }
      )
      observer.observe(footer)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  const visible = pastHero && !footerVisible

  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-0 z-40 px-4 transition-transform duration-300"
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 10px)',
        paddingTop: '10px',
        background: 'rgba(14,12,11,0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
      }}
      aria-hidden={!visible}
    >
      <Link
        href="/demo"
        tabIndex={visible ? 0 : -1}
        className="font-sans flex items-center justify-center text-white w-full"
        style={{
          background: 'var(--accent)',
          borderRadius: '10px',
          height: '48px',
          fontSize: '15px',
          fontWeight: 600,
        }}
      >
        {nav.bookDemo}
      </Link>
    </div>
  )
}
