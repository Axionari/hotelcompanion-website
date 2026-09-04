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
const HIDE_ON = [
  '/demo',
  '/contact',
  '/resources',
  '/auth',
  '/dashboard',
  '/onboarding',
  '/assistant',
  '/kitchen-sink',
  '/trust',
  '/security',
  '/responsible-ai',
  '/accessibility',
  '/privacy',
  '/terms',
  '/cookies',
]

export function StickyCta() {
  const pathname = usePathname()
  const { nav } = useCopy(globalCopy)
  const [shown, setShown] = useState(false)
  const [quietZone, setQuietZone] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduce(motion.matches)
    const motionFrame = window.requestAnimationFrame(syncMotion)
    motion.addEventListener('change', syncMotion)
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
    return () => {
      window.cancelAnimationFrame(motionFrame)
      motion.removeEventListener('change', syncMotion)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const zones = document.querySelectorAll([
      '.ed-image-break',
      '.ep-photo',
      '.ed-close',
      '.hc-story-photo',
      '.hc-close',
      '.hc-suite-product',
      '.hc-surfaces-product',
      '.hc-resolution-product',
      '.hc-dashboard-product',
      '.ep-product-hero',
      '.ep-platform-thread',
      '.ep-every-surface-stage',
      '.ep-loop-product',
      '.ep-journey-product',
      '.ep-dashboard-product',
      '.ep-solutions-revenue-product',
      '.ep-solutions-morning-product',
      '.ep-enterprise-hero-dashboard',
      '.ep-os-model-product',
      '#white-label',
    ].join(', '))
    if (!zones.length) {
      const frame = window.requestAnimationFrame(() => setQuietZone(false))
      return () => window.cancelAnimationFrame(frame)
    }

    const visibleZones = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleZones.add(entry.target)
        else visibleZones.delete(entry.target)
      }
      setQuietZone(visibleZones.size > 0)
    }, { threshold: 0.08 })

    zones.forEach((zone) => observer.observe(zone))
    return () => observer.disconnect()
  }, [pathname])

  const hidden = HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + '/'))
  if (hidden) return null

  const visible = shown && !quietZone
  const enter = visible ? 'translateY(0)' : 'translateY(140%)'
  const transition = reduce ? 'opacity .3s ease' : 'transform .45s var(--ease-emphasis), opacity .45s var(--ease-standard)'

  return (
    <>
      {/* desktop — floating pill, bottom-right */}
      <Link
        href="/demo"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className="sticky-cta sticky-cta-desktop btn-primary hidden sm:inline-flex items-center gap-2 whitespace-nowrap"
        style={{
          position: 'fixed',
          right: 'clamp(18px, 2vw, 28px)',
          bottom: 'clamp(18px, 2vw, 28px)',
          zIndex: 40,
          minHeight: 48,
          fontSize: 15,
          boxShadow: '0 18px 48px -14px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,106,58,0.14), 0 0 44px -18px rgba(200,106,58,0.6)',
          opacity: visible ? 1 : 0,
          transform: reduce ? 'none' : enter,
          transition,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {nav.bookDemo}
        <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>→</span>
      </Link>

      {/* mobile — bottom bar (sticky-cta: suppressed while the cookie banner is up) */}
      <div
        className="sticky-cta sticky-cta-mobile sm:hidden"
        aria-hidden={!visible}
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
          opacity: visible ? 1 : 0,
          transition,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <Link
          href="/demo"
          tabIndex={visible ? 0 : -1}
          className="btn-primary w-full"
          style={{ minHeight: 48, fontSize: 15 }}
        >
          {nav.bookDemo}
        </Link>
      </div>
    </>
  )
}
