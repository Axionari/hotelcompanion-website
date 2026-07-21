'use client'

import { useEffect, useRef, ReactNode } from 'react'

/**
 * CDS scroll reveal (brief §3.4).
 *
 * Server-rendered fully visible; on mount, elements below the first viewport
 * get the .reveal (hidden) class and are revealed when they scroll into view.
 *
 * FAIL-OPEN by design. Because the hidden state is applied by JS, anything that
 * stops the reveal from running would leave copy permanently invisible — so
 * there are three independent ways an element becomes visible:
 *   1. IntersectionObserver (the normal path, rootMargin "0px 0px -10% 0px"),
 *   2. a passive scroll/resize listener, which covers environments where the
 *      observer exists but never delivers callbacks,
 *   3. a hard deadline that reveals unconditionally.
 * Whichever fires first wins and the rest are torn down. No-JS and
 * prefers-reduced-motion render the composed still (see globals.css).
 */

/** Elements in the bottom 10% of the viewport have not "arrived" yet. */
const REVEAL_LINE = 0.9

/** Backstop: never leave content hidden longer than this, whatever went wrong. */
const FAILSAFE_MS = 3000

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

    let done = false
    const show = () => {
      if (done) return
      done = true
      el.classList.add('is-visible')
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(failsafe)
    }

    const inView = () => el.getBoundingClientRect().top < window.innerHeight * REVEAL_LINE

    // 2. Scroll fallback — also covers the case where the element is already in
    //    view on mount but the observer never delivers its initial callback.
    const onScroll = () => {
      if (inView()) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // 1. Preferred path.
    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) if (entry.isIntersecting) show()
        },
        { rootMargin: '0px 0px -10% 0px' }
      )
      observer.observe(el)
    }

    // 3. Hard deadline. If nothing else fired and the element is on screen,
    //    show it; otherwise keep waiting on scroll.
    const failsafe = window.setTimeout(() => {
      if (inView()) show()
    }, FAILSAFE_MS)

    // Immediate check for anything already past the line at mount.
    onScroll()

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(failsafe)
    }
  }, [delay])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}
