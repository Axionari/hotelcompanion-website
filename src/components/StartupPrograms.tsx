'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCopy } from '@/lib/i18n/useCopy'
import './startup-programs.css'

const copy = {
  en: {
    title: 'Startup programs & accelerators',
    description: 'Axionari, the company behind Hotel Companion.',
    pause: 'Pause animation',
    resume: 'Resume animation',
  },
  es: {
    title: 'Programas de startups y aceleradoras',
    description: 'Axionari, la empresa detrás de Hotel Companion.',
    pause: 'Pausar animación',
    resume: 'Reanudar animación',
  },
}

const programs = [
  { id: 'nvidia', name: 'NVIDIA Inception Program', src: 'nvidia-inception.webp', width: 2084, height: 835 },
  { id: 'google', name: 'Google for Startups Cloud Program', src: 'google-cloud.svg', width: 123, height: 20 },
  { id: 'claude', name: 'Anthropic · Claude for Startups', src: 'claude.svg', width: 573, height: 125 },
  { id: 'livekit', name: 'LiveKit for Startups', src: 'livekit.svg', width: 793, height: 182 },
  { id: 'elevenlabs', name: 'ElevenLabs Grants', src: 'elevenlabs-grants.webp', width: 1496, height: 132 },
  { id: 'deepgram', name: 'Deepgram Startup Program', src: 'deepgram.svg', width: 130, height: 30 },
  { id: 'emprelatam', name: 'Emprelatam', src: 'emprelatam.png', width: 500, height: 200 },
  { id: 'boost', name: 'Startup Boost Lab', src: 'startup-boost-lab.png', width: 1080, height: 250 },
]

export function StartupPrograms({ featured = false }: { featured?: boolean }) {
  const c = useCopy(copy)
  const [paused, setPaused] = useState(false)
  if (featured) {
    return (
      <section className="hc-programs-featured" id="startup-programs" aria-labelledby="hc-programs-title" data-paused={paused}>
        <h2 id="hc-programs-title">{c.title}</h2>
        <div className="hc-programs-window" tabIndex={0} role="region" aria-labelledby="hc-programs-title">
          <div className="hc-programs-track" id="hc-programs-track">
            {[false, true].map(duplicate => (
              <ul className="hc-programs-track-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                {programs.map(program => (
                  <li className={`hc-program-feature hc-program-feature--${program.id}`} key={program.id}>
                    <span className="hc-program-feature-mark"><Image src={`/assets/programs/${program.src}`} alt="" width={program.width} height={program.height} unoptimized /></span>
                    <span className="hc-program-feature-caption">{program.name.replace('Anthropic · ', '')}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <button className="hc-programs-motion" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? c.resume : c.pause} title={paused ? c.resume : c.pause} aria-controls="hc-programs-track">
          {paused ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 7 5-7 5Z" fill="currentColor" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" /></svg>}
        </button>
      </section>
    )
  }
  return (
    <section className="hc-programs" id="startup-programs" aria-labelledby="hc-programs-title">
      <div className="hc-programs-inner">
        <div className="hc-programs-heading">
          <h2 id="hc-programs-title">{c.title}</h2>
          <p>{c.description}</p>
        </div>
        <ul className="hc-programs-logos">
          {programs.map(program => (
            <li className={`hc-program-logo hc-program-logo--${program.id}`} key={program.id}>
              <Image src={`/assets/programs/${program.src}`} alt={program.name} width={program.width} height={program.height} unoptimized />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
