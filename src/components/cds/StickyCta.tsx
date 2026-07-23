'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'

/**
 * Persistent conversion CTA — RC keeps "See It Live" pinned in its sticky
 * header; HC's nav auto-hides on scroll-down, so this floating CTA carries the
 * always-available path to /demo once the reader is past the hero.
 *
 *  - desktop (sm+): a pill, bottom-right
 *  - mobile: a full-width bar pinned to the bottom (safe-area aware)
 *  - reveals after ~640px of scroll; reduced motion drops the slide, keeps fade
 *  - hidden on the demo page itself and on the product app routes
 */
const HIDE_ON = ['/demo', '/auth', '/dashboard', '/onboarding', '/assistant', '/kitchen-sink']

export function StickyCta() {
  const pathname = usePathname()
  const { nav } = useCopy(globalCopy)
  const [shown, setShown] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setShown(window.scrollY > 640)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hidden = HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + '/'))
  if (hidden) return null

  const enter = shown ? 'translateY(0)' : 'translateY(140%)'
  const transition = reduce ? 'opacity .3s ease' : 'transform .45s var(--ease-emphasis), opacity .45s var(--ease-standard)'

  return (
    <>
      {/* desktop — floating pill, bottom-right */}
      <Link
        href="/demo"
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className="btn-primary hidden sm:inline-flex items-center gap-2 whitespace-nowrap"
        style={{
          position: 'fixed',
          right: 'clamp(18px, 2vw, 28px)',
          bottom: 'clamp(18px, 2vw, 28px)',
          zIndex: 40,
          minHeight: 48,
          fontSize: 15,
          boxShadow: '0 18px 48px -14px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,106,58,0.14), 0 0 44px -18px rgba(200,106,58,0.6)',
          opacity: shown ? 1 : 0,
          transform: reduce ? 'none' : enter,
          transition,
          pointerEvents: shown ? 'auto' : 'none',
        }}
      >
        {nav.bookDemo}
        <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>→</span>
      </Link>

      {/* mobile — bottom bar */}
      <div
        className="sm:hidden"
        aria-hidden={!shown}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(16,14,12,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border)',
          transform: reduce ? 'none' : enter,
          opacity: shown ? 1 : 0,
          transition,
          pointerEvents: shown ? 'auto' : 'none',
        }}
      >
        <Link
          href="/demo"
          tabIndex={shown ? 0 : -1}
          className="btn-primary w-full"
          style={{ minHeight: 48, fontSize: 15 }}
        >
          {nav.bookDemo}
        </Link>
      </div>
    </>
  )
}
