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
  video,
  line,
  height = 'clamp(220px, 38vh, 420px)',
  darken = 0.16,
}: {
  /** Path under /public, e.g. /assets/breathers/aerial-seascape.webp */
  image: string
  /** Basename under /assets/video (no extension) for the largest pauses.
   *  The image is the poster and the reduced-motion / save-data fallback. */
  video?: string
  /** At most one short line. Omit for a pure pause. */
  line?: string
  height?: string
  darken?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [reduce, setReduce] = useState(true)

  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduce(reduced)
    // Never pull a video on a metered connection, and never over reduced
    // motion — the still is a complete answer in both cases.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    setPlayVideo(Boolean(video) && !reduced && !nav.connection?.saveData)
  }, [video])

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
      >
        {playVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={image}
          >
            <source src={`/assets/video/${video}.webm`} type="video/webm" />
            <source src={`/assets/video/${video}.mp4`} type="video/mp4" />
          </video>
        )}
      </div>
      <div
        className="absolute inset-0"
        style={{
          // Only the top and bottom edges are feathered, so the band melts
          // into the sections either side while the centre stays essentially
          // uncovered. The first pass scrimmed the middle into a black gap.
          background: `linear-gradient(180deg, rgba(10,8,7,0.97) 0%, rgba(10,8,7,${darken}) 26%, rgba(10,8,7,${darken}) 74%, rgba(10,8,7,0.97) 100%)`,
        }}
      />
      {line && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(10,8,7,0.72) 0%, rgba(10,8,7,0.3) 42%, transparent 68%)' }}
        />
      )}
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
