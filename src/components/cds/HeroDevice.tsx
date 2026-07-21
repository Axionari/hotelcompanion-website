'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'

/**
 * The in-room tablet — Hotel Companion's hero artifact and its differentiator
 * over Restaurant Companion's phone (Design & Interaction Spec §2, §7).
 *
 * Landscape device frame using the --device-* tokens, a breathing copper mic
 * orb, property + language pills, and a rotating sample of real guest questions
 * resolving into a reply.
 *
 * Three states: animated; prefers-reduced-motion (orb still, first question
 * shown, no rotation); no-JS (server renders the composed still — the first
 * question and its reply are in the markup).
 */

const SAMPLES = {
  en: [
    { q: 'Where is breakfast served?', a: 'La Palapa, 7–11 each morning. I can hold a table.' },
    { q: 'Best beach near here?', a: 'Akumal, 20 minutes south — clear water this week.' },
    { q: 'Can we stay one more night?', a: 'Yes — I can have the front desk extend your stay.' },
  ],
  es: [
    { q: '¿Dónde se sirve el desayuno?', a: 'La Palapa, de 7 a 11 cada mañana. Puedo apartarle una mesa.' },
    { q: '¿La mejor playa cerca?', a: 'Akumal, 20 minutos al sur — agua clara esta semana.' },
    { q: '¿Podemos quedarnos una noche más?', a: 'Sí — puedo pedir a recepción que extienda su estancia.' },
  ],
}

export function HeroDevice() {
  const { lang } = useLang()
  const samples = SAMPLES[lang]
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((n) => (n + 1) % samples.length), 4600)
    return () => window.clearInterval(t)
  }, [samples.length])

  const active = samples[Math.min(i, samples.length - 1)]

  return (
    <div className="relative w-full">
      {/* Warm ambient glow behind the device.
          NEEDS REAL DATA: RC backs its hero with hospitality photography;
          Hotel has none in public/ yet, so the bed is a composed CSS wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 55% at 62% 42%, rgba(200,106,58,0.22) 0%, rgba(200,106,58,0.07) 42%, transparent 72%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Landscape in-room tablet */}
      <div
        className="relative mx-auto w-full"
        style={{
          maxWidth: '540px',
          background: 'var(--device-frame)',
          borderRadius: 'var(--device-radius)',
          padding: 'var(--bezel)',
          border: '1px solid rgba(251,248,242,0.08)',
          boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(200,106,58,0.06)',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'calc(var(--device-radius) - var(--bezel))',
            background: 'linear-gradient(168deg, #191410 0%, #12100e 58%, #0f0d0c 100%)',
            aspectRatio: '4 / 3',
          }}
        >
          {/* Property + language pills */}
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 pt-4">
            <span
              className="eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ border: '1px solid var(--accent-hairline)', color: 'var(--accent)', fontSize: '9px' }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: 'var(--accent)',
                  animation: 'pc-dot-pulse 2s ease-in-out infinite',
                }}
              />
              MarAzul Riviera Maya
            </span>
            <span
              className="eyebrow rounded-full px-2.5 py-1.5"
              style={{ border: '1px solid var(--border)', color: 'var(--text-faint)', fontSize: '9px' }}
            >
              {lang === 'es' ? 'ES' : 'EN'}
            </span>
          </div>

          {/* Mic orb */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div
              aria-hidden="true"
              className="flex items-center justify-center rounded-full"
              style={{
                width: 84,
                height: 84,
                background: 'radial-gradient(circle at 50% 38%, #e08a52 0%, #b4551f 55%, #7d3a12 100%)',
                animation: 'orb-breathe 4.5s ease-in-out infinite',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a1207" strokeWidth="1.8">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0M12 17v5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="eyebrow mt-5" style={{ color: 'var(--accent)', fontSize: '9px' }}>
              {lang === 'es' ? 'Escuchando' : 'Listening'}
            </div>

            {/* Live exchange */}
            <div className="mt-6 w-full" style={{ maxWidth: 380 }}>
              <p
                className="rounded-2xl px-4 py-2.5 text-right"
                style={{
                  background: 'rgba(251,248,242,0.06)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  transition: 'opacity var(--dur-slow) var(--ease-emphasis)',
                }}
              >
                {active.q}
              </p>
              <p
                className="mt-2 rounded-2xl px-4 py-2.5"
                style={{
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--accent-hairline)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  transition: 'opacity var(--dur-slow) var(--ease-emphasis)',
                }}
              >
                {active.a}
              </p>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 text-center">
            <span className="eyebrow" style={{ fontSize: '9px' }}>
              {lang === 'es' ? 'Habla o escribe — en tu idioma' : 'Talk or type — in your language'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
