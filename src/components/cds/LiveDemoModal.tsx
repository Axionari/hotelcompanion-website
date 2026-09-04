'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { liveDemoCopy } from '@/lib/i18n/marketing/liveDemo'
import { LiveDemo } from './LiveDemo'
import { OPEN_LIVE_DEMO_EVENT, openLiveDemo } from './liveDemoEvents'

/**
 * The large modal view of the working demo (Live Demo · D6).
 *
 * Opened by a window event rather than React context so that any entry point —
 * the nav, the hero CTA, the hero tablet, a future page — can trigger it with a
 * one-line import and no provider plumbing across the server/client boundary.
 */

export function LiveDemoModal() {
  const c = useCopy(liveDemoCopy)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function onOpen() {
      restoreRef.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    window.addEventListener(OPEN_LIVE_DEMO_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_LIVE_DEMO_EVENT, onOpen)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    restoreRef.current?.focus()
  }, [])

  // Esc, focus trap, and a scroll lock while the dialog owns the screen.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      )
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  if (!open) return null

  return (
    <div
      className="live-demo-overlay fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(8,7,6,0.86)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        className="live-demo-panel w-full overflow-y-auto"
        style={{ maxWidth: 620 }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <div className="eyebrow eyebrow-accent mb-2.5">{c.eyebrow}</div>
            <h2 className="heading-card" style={{ color: 'var(--text)' }}>
              {c.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={c.close}
            className="grid place-items-center flex-shrink-0 rounded-full"
            style={{
              width: 44,
              height: 44,
              border: '1px solid var(--border)',
              color: 'var(--text-dim)',
            }}
          >
            ✕
          </button>
        </div>

        <LiveDemo autoFocus />
      </div>
    </div>
  )
}

/** Convenience trigger used by the nav and the hero. */
export function LiveDemoTrigger({
  className,
  style,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  const c = useCopy(liveDemoCopy)
  return (
    <button type="button" onClick={openLiveDemo} className={className} style={style}>
      {children ?? c.open}
    </button>
  )
}
