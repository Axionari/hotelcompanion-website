'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Progressive enhancement: server content is always visible, even without JS. */
export function PageMotion() {
  const path = usePathname()
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Set<Animation>()
    const cancel = () => { if (media.matches) { animations.forEach(a => a.cancel()); animations.clear() } }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        if (media.matches) continue
        const element = entry.target as HTMLElement
        // Entrance is coordinated, not a collection of independently bouncing cards.
        const parts = element.matches('[data-motion-scene]')
          ? [...element.querySelectorAll<HTMLElement>('[data-motion-beat]')]
          : [element]
        parts.forEach((part, index) => {
          const animation = part.animate([
            { opacity: .05, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 750, delay: element.matches('[data-motion-scene]') ? index * 650 : 0, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' })
          animations.add(animation)
          animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation))
        })
      }
    }, { threshold: .08 })
    const elements = document.querySelectorAll<HTMLElement>('main > section, main > header, main > .xp-wrap, main > article, main > div > section, .hc-page-intro, [data-motion-scene], .hc-clarity-heading, .hc-chapter-heading, .xp-section-head')
    const candidates = [...elements].filter(element => {
      if (element.matches('.eh-hero') || element.closest('.hc-sequence')) return false
      if (element.closest('[data-motion-scene]') !== (element.matches('[data-motion-scene]') ? element : null)) return false
      return !element.querySelector('[data-motion-scene]') || element.matches('[data-motion-scene]')
    })
    const observed = new Set(candidates)
    for (const element of candidates) {
      let parent = element.parentElement
      let nested = false
      while (parent) { if (observed.has(parent)) { nested = true; break } parent = parent.parentElement }
      if (!nested) observer.observe(element)
    }
    const focus = (event: FocusEvent) => { for (const animation of animations) { const effect = animation.effect as KeyframeEffect; if (effect.target?.contains(event.target as Node)) animation.finish() } }
    document.addEventListener('focusin', focus)
    media.addEventListener('change', cancel)
    return () => { observer.disconnect(); document.removeEventListener('focusin', focus); animations.forEach(a => a.cancel()); media.removeEventListener('change', cancel) }
  }, [path])
  return null
}
