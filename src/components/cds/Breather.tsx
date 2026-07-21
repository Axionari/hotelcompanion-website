'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A full-bleed image band used as a separator between text-heavy sections.
 *
 * Its job is to give the eye somewhere to rest, so it carries at most one line
 * of copy and often none. The image drifts slowly against the scroll, which
 * reads as depth without asking for attention.
 *
 * Three states:
 *  - motion: slow vertical parallax driven by a bounded rAF-throttled listener
 *  - prefers-reduced-motion: a still, correctly framed image
 *  - no-JS: identical to reduced motion (the image is a plain background)
 */
export function Breather({
  image,
  line,
  height = 'clamp(200px, 32vh, 360px)',
  darken = 0.34,
}: {
  /** Path under /public, e.g. /assets/img/luxury-lobby.webp */
  image: string
  /** At most one short line. Omit for a pure pause. */
  line?: string
  height?: string
  darken?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [reduce, setReduce] = useState(true)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return

    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      // -1 when the band is just below the fold, +1 when just above it.
      const progress = (window.innerHeight / 2 - (r.top + r.height / 2)) / (window.innerHeight / 2 + r.height / 2)
      const clamped = Math.max(-1, Math.min(1, progress))
      inner.style.transform = `translate3d(0, ${(clamped * 6).toFixed(2)}%, 0) scale(1.16)`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reduce])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height }}
      aria-hidden={line ? undefined : 'true'}
    >
      <div
        ref={innerRef}
        role={line ? 'img' : undefined}
        aria-label={line || undefined}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Overscaled so the parallax drift never exposes an edge.
          transform: 'scale(1.16)',
          willChange: reduce ? undefined : 'transform',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          // Feathered at the edges so the band melts into the sections above
          // and below, but light enough in the middle to actually read as an
          // image — the first pass was so dark it was just a black gap.
          background: `linear-gradient(180deg, rgba(10,8,7,0.96) 0%, rgba(10,8,7,${darken}) 38%, rgba(10,8,7,${darken}) 62%, rgba(10,8,7,0.96) 100%)`,
        }}
      />
      {line && (
        <div className="absolute inset-0 flex items-center">
          <div className="container-rc">
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
                fontWeight: 530,
                color: 'var(--text)',
                maxWidth: '26ch',
                lineHeight: 1.3,
              }}
            >
              {line}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
