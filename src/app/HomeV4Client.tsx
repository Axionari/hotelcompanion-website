'use client'

import { useRef } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { instrumentSerif, ibmPlexMono } from '@/components/v4/v4fonts'
import { useDayModel } from '@/components/v4/shared'
import { Act1 } from '@/components/v4/acts/Act1'
import { Act2 } from '@/components/v4/acts/Act2'
import { Act3 } from '@/components/v4/acts/Act3'
import { Act4 } from '@/components/v4/acts/Act4'
import { Act5 } from '@/components/v4/acts/Act5'
import { Act6 } from '@/components/v4/acts/Act6'
import { Act7 } from '@/components/v4/acts/Act7'

/**
 * Home — v4 (docs/v4/V4_BUILD_KIT.md): the seven-act homepage. The reference
 * export is the geometry/materials source of truth; §3 is the verbatim copy
 * deck; §4's `--day` scroll variable runs the sun lighting model. The site
 * footer below Act VII is v3 chrome, unchanged. All other routes keep their
 * v3 pages (the FAQ moved to /resources#faq — kit §3).
 */
export default function HomeV4Client() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  useDayModel(rootRef)

  return (
    <main>
      <div
        ref={rootRef}
        className={`v4-root ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
        style={{
          fontFamily: "var(--font-v4-serif), 'Instrument Serif', serif",
          color: '#F2E9DA',
          background: 'var(--v4-day-bg, #0E0B09)',
          overflowX: 'clip',
          /* the layout shell pads every route for the fixed v3 nav; the v4
             homepage is full-bleed (reference has its own chrome bar) */
          marginTop: '-4rem',
        }}
      >
        {/* film grain — static (kit §4 allows no ambient motion) */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: '-4%',
            zIndex: 80,
            pointerEvents: 'none',
            opacity: 0.055,
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\'/></filter><rect width=\'240\' height=\'240\' filter=\'url(%23n)\'/></svg>")',
            backgroundSize: '240px 240px',
          }}
        />
        <Act1 />
        <Act2 />
        <Act3 />
        <Act4 />
        <Act5 />
        <Act6 />
        <Act7 />
      </div>
      <SiteFooter />
    </main>
  )
}
