import Image from 'next/image'
import { useCopy } from '@/lib/i18n/useCopy'
import './startup-programs.css'

const copy = {
  en: {
    title: 'Startup programs & accelerators',
    description: 'Axionari, the company behind Hotel Companion.',
  },
  es: {
    title: 'Programas de startups y aceleradoras',
    description: 'Axionari, la empresa detrás de Hotel Companion.',
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

export function StartupPrograms() {
  const c = useCopy(copy)
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
