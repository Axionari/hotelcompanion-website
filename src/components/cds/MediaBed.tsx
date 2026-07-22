'use client'

import { ReactNode, useEffect, useState } from 'react'

/**
 * Full-bleed media bed — RC's treatment: warm darkened footage/stills behind
 * editorial type, never bright or "stock-y".
 *
 * Three states:
 *  - motion: the loop plays muted/inline
 *  - prefers-reduced-motion: the poster still is shown, video never mounts
 *  - no-JS: the poster still is the server-rendered background, so the section
 *    always has its image even if the client never hydrates
 *
 * Assets are pre-darkened at transcode time (see CREDITS.md); the scrim here is
 * the final legibility layer on top.
 */
export function MediaBed({
  video,
  poster,
  children,
  scrim = 0.62,
  className = '',
  minHeight,
  priority = false,
}: {
  /** Basename in /assets/video (without extension). Omit for a still-only bed. */
  video?: string
  /** Path in /assets/img. Always required — it is the no-JS and reduced-motion state. */
  poster: string
  children?: ReactNode
  scrim?: number
  className?: string
  minHeight?: string
  /**
   * v3 P5 (G9 — hero LCP): preload the poster. CSS background images are
   * invisible to the browser's preload scanner, which made the hero poster the
   * LCP element at ~4.7s. React hoists this <link> into <head>.
   */
  priority?: boolean
}) {
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Don't pull a loop onto a metered connection.
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection
    if (conn?.saveData) return
    setPlayVideo(true)
  }, [video])

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ minHeight }}>
      {/* Poster still — server-rendered, so it is present without JS.
          v3 P5 (G9): a real <img> instead of a CSS background, so the hero
          poster is an early, preload-scanner-visible LCP candidate
          (fetchpriority=high) and below-fold beds lazy-load natively. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden="true"
        alt=""
        src={poster}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {playVideo && video && (
        <video
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={`/assets/video/${video}.webm`} type="video/webm" />
          <source src={`/assets/video/${video}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* Warm scrim for type legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(100deg, rgba(16,14,12,${scrim + 0.2}) 0%, rgba(16,14,12,${scrim}) 45%, rgba(16,14,12,${Math.max(
            0,
            scrim - 0.22
          )}) 100%)`,
        }}
      />

      {children}
    </div>
  )
}
