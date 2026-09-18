'use client'

import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type FilmId = 'guest-experience' | 'companion-control'

type FilmCopy = {
  eyebrow: string
  title: string
  body: string
}

type ProductFilmsProps = {
  lang: 'en' | 'es'
  playLabel: string
  films: readonly [FilmCopy, FilmCopy]
}

function ProductFilm({
  id,
  lang,
  copy,
  playLabel,
  activeFilm,
  onPlay,
}: {
  id: FilmId
  lang: 'en' | 'es'
  copy: FilmCopy
  playLabel: string
  activeFilm: FilmId | null
  onPlay: (id: FilmId) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [requested, setRequested] = useState(false)
  const asset = `/assets/video/hotel-companion/${id}-${lang}`

  useEffect(() => {
    if (activeFilm !== id) videoRef.current?.pause()
  }, [activeFilm, id])

  const start = () => {
    const video = videoRef.current
    if (!video) return

    onPlay(id)
    if (requested) {
      void video.play()
      return
    }

    video.src = `${asset}.mp4`
    video.controls = true
    video.preload = 'metadata'
    video.load()
    setRequested(true)
    // A few privacy-focused browsers decline programmatic playback even after
    // a trusted click. Keep the loaded player and native controls visible so
    // the same interaction still succeeds without downloading the film twice.
    void video.play().catch(() => undefined)
  }

  return (
    <article className="hc-film-card">
      <div className="hc-film-player">
        <video
          ref={videoRef}
          aria-label={copy.title}
          controls={requested}
          playsInline
          preload={requested ? 'metadata' : 'none'}
          poster={`${asset}.jpg`}
          src={requested ? `${asset}.mp4` : undefined}
          onPlay={() => onPlay(id)}
          onError={() => setRequested(false)}
        />
        {!requested && (
          <button type="button" className="hc-film-start" onClick={start} aria-label={`${playLabel}: ${copy.title}`}>
            <span className="hc-film-play-icon" aria-hidden="true"><Play size={21} fill="currentColor" /></span>
            <span>{playLabel}</span>
          </button>
        )}
      </div>
      <div className="hc-film-copy">
        <span>{copy.eyebrow}</span>
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
      </div>
    </article>
  )
}

export function ProductFilms({ lang, playLabel, films }: ProductFilmsProps) {
  const [activeFilm, setActiveFilm] = useState<FilmId | null>(null)
  const ids: readonly FilmId[] = ['guest-experience', 'companion-control']

  return (
    <div className="hc-film-grid">
      {ids.map((id, index) => (
        <ProductFilm
          key={`${lang}-${id}`}
          id={id}
          lang={lang}
          copy={films[index]}
          playLabel={playLabel}
          activeFilm={activeFilm}
          onPlay={setActiveFilm}
        />
      ))}
    </div>
  )
}
