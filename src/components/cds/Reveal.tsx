'use client'

import { useEffect, useRef, ReactNode } from 'react'

/**
 * CDS scroll reveal (brief §3.4).
 * Server-rendered fully visible; on mount, elements below the first viewport
 * get the .reveal (hidden) class and an IntersectionObserver flips them to
 * .is-visible with rootMargin "0px 0px -10% 0px". A 100ms safety net keeps
 * anything already in view from ever flashing hidden. No-JS and
 * prefers-reduced-motion render the composed still (see globals.css).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
}: {
  children: ReactNode
  as?: 'div' | 'section' | 'li' | 'span'
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Exclude first-viewport elements: render full-opacity on load.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return

    el.classList.add('reveal')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)

    // Safety net: if the observer never fires (edge layouts), reveal anyway.
    const safety = window.setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-visible')
      }
    }, 100)

    return () => {
      observer.disconnect()
      window.clearTimeout(safety)
    }
  }, [delay])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}
