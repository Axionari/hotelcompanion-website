'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'

/**
 * Hotel Companion's signature animation — the scrolling guest-question
 * marquees, extracted from the original homepage. Two full-bleed rows
 * (left/right), pause on hover, static wrap under prefers-reduced-motion
 * (globals.css). Question rows come from the existing i18n deck
 * (t.realQuestions) so EN/ES both ship real copy.
 */
export function QuestionMarquee({ rows }: { rows?: [string[], string[]] }) {
  const { lang, t } = useLang()
  const row1 = rows?.[0] ?? t.realQuestions.row1
  const row2 = rows?.[1] ?? t.realQuestions.row2
  const questions = [...row1, ...row2]
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const [pausedByGuest, setPausedByGuest] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.01 },
    )
    const onVisibility = () => setPageVisible(!document.hidden)

    observer.observe(root)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const running = inView && pageVisible && !pausedByGuest
  const pauseLabel = lang === 'es' ? 'Pausar preguntas' : 'Pause questions'
  const resumeLabel = lang === 'es' ? 'Reanudar preguntas' : 'Resume questions'

  const chips = (questionsInRow: string[]) => questionsInRow.map((question) => (
    <span key={question} className="marquee-chip">{question}</span>
  ))

  return (
    <div
      ref={rootRef}
      className={`question-marquee ${running ? 'is-running' : 'is-paused'}`}
    >
      <ul className="question-marquee-accessible">
        {questions.map((question, index) => <li key={`${index}-${question}`}>{question}</li>)}
      </ul>
      <div className="question-marquee-viewport" aria-hidden="true">
        <div className="marquee-row animate-scroll-left">
          <div className="marquee-group">{chips(row1)}</div>
          <div className="marquee-group marquee-group-copy">{chips(row1)}</div>
        </div>
      </div>
      <div className="question-marquee-viewport" aria-hidden="true">
        <div className="marquee-row animate-scroll-right">
          <div className="marquee-group">{chips(row2)}</div>
          <div className="marquee-group marquee-group-copy">{chips(row2)}</div>
        </div>
      </div>
      <button
        type="button"
        className="question-marquee-control"
        aria-pressed={pausedByGuest}
        onClick={() => setPausedByGuest((paused) => !paused)}
      >
        <span aria-hidden="true">{pausedByGuest ? '▶' : 'Ⅱ'}</span>
        {pausedByGuest ? resumeLabel : pauseLabel}
      </button>
    </div>
  )
}
