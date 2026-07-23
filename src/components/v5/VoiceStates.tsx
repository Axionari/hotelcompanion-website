'use client'

import { useEffect, useRef, useState } from 'react'
import { VoiceOrb, type OrbState } from '@/components/cds/VoiceOrb'

/**
 * VoiceStates — RC's Features "Every way of speaking" orb: one big VoiceOrb
 * cycling idle → listening → thinking → speaking, the four state labels beneath
 * it with the active one lit. Cycles only once on screen; reduced motion holds
 * the resting (listening) composition.
 */
const STATES: OrbState[] = ['idle', 'listening', 'thinking', 'speaking']

export function VoiceStates({ labels }: { labels: ReadonlyArray<string> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(1)
  const [live, setLive] = useState(false)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    setLive(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) setSeen(true) }, { rootMargin: '0px 0px -20% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!live || !seen) return
    const t = window.setInterval(() => setI((n) => (n + 1) % STATES.length), 2300)
    return () => window.clearInterval(t)
  }, [live, seen])

  const active = live && seen ? i : 1

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div style={{ height: 'clamp(240px, 32vw, 400px)', display: 'grid', placeItems: 'center' }}>
        <VoiceOrb state={STATES[active]} size="clamp(180px, 25vw, 320px)" ripples showMic micScale={0.11} />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-x-9 gap-y-3">
        {STATES.map((s, idx) => (
          <span
            key={s}
            className="eyebrow"
            style={{ color: idx === active ? 'var(--accent)' : 'var(--text-faint)', transition: 'color 0.5s var(--ease-standard)' }}
          >
            {labels[idx] ?? s}
          </span>
        ))}
      </div>
    </div>
  )
}
