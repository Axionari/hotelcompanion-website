'use client'

import { useLang } from '@/lib/i18n/LanguageContext'

/**
 * Hotel Companion's signature animation — the scrolling guest-question
 * marquees, extracted from the original homepage. Two full-bleed rows
 * (left/right), pause on hover, static wrap under prefers-reduced-motion
 * (globals.css). Question rows come from the existing i18n deck
 * (t.realQuestions) so EN/ES both ship real copy.
 */
export function QuestionMarquee({ rows }: { rows?: [string[], string[]] }) {
  const { t } = useLang()
  const row1 = rows?.[0] ?? t.realQuestions.row1
  const row2 = rows?.[1] ?? t.realQuestions.row2

  const chip = (q: string, i: number) => (
    <span
      key={i}
      className="font-sans flex-shrink-0 rounded-full marquee-chip"
      style={{
        background: '#242019',
        border: '1px solid rgba(232,227,220,0.10)',
        padding: '12px 28px',
        fontSize: '20px',
        fontWeight: 400,
        color: '#C4BDB6',
        whiteSpace: 'nowrap',
      }}
    >
      {q}
    </span>
  )

  return (
    <div aria-hidden="false">
      <div
        className="overflow-hidden mb-4"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="marquee-row animate-scroll-left">{[...row1, ...row1].map(chip)}</div>
      </div>
      <div
        className="overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="marquee-row animate-scroll-right">{[...row2, ...row2].map(chip)}</div>
      </div>
    </div>
  )
}
