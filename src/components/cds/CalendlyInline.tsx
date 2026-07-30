'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { CONSENT_EVENT, readConsent } from '@/lib/consent'

/**
 * Inline Calendly embed for the demo-form confirmation state.
 *
 * NOTE ON THE EVENT URL: the brief specified
 * `calendly.com/axionari-ai/executive-briefing`, which 404s. The event exists
 * on the same profile under the slug `new-meeting` — verified by loading the
 * profile page, where it is titled "AXIONARI Executive Briefing" (45 min).
 * One constant to change if the slug is later renamed.
 *
 * PREFILL: `a{N}` maps to the event's `question_{N-1}` in rendered order, read
 * off the live booking form rather than assumed. This event carries duplicate
 * required Name/Email custom questions ahead of Company/Title, so Company is
 * a3 and Title is a4 — not a1/a2. See the report.
 *
 * CONSENT: Calendly is a third-party that sets its own cookies (the site's
 * Cookie Policy lists "Scheduling platforms" under Third-Party Cookies). The
 * embed is therefore withheld until the visitor has accepted a non-essential
 * category; otherwise they get a plain link, which sets nothing until clicked.
 * Nothing here runs on the server — the script is injected after mount.
 */

const CALENDLY_EVENT = 'https://calendly.com/axionari-ai/new-meeting'
const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
/** If the third-party script hasn't initialised by now, fall back to the link. */
const LOAD_TIMEOUT_MS = 8000

export interface CalendlyPrefill {
  name: string
  email: string
  /** Maps to the event's "Company" question. */
  company: string
  /** Maps to the event's "Title" question. */
  title: string
}

/** Builds the booking URL. URLSearchParams percent-encodes UTF-8, so accented
 *  company names ("Hotel Misión León") survive intact. */
export function buildCalendlyUrl(p: CalendlyPrefill, lang: 'en' | 'es'): string {
  const qs = new URLSearchParams({
    name: p.name,
    email: p.email,
    a1: p.name, // question_0 — "Name" (required duplicate of the native field)
    a2: p.email, // question_1 — "Email" (required duplicate)
    a3: p.company, // question_2 — "Company"
    a4: p.title, // question_3 — "Title"
    locale: lang,
    utm_source: 'site',
    utm_medium: 'demo_form',
    utm_campaign: 'hc',
    utm_content: lang,
  })
  return `${CALENDLY_EVENT}?${qs.toString()}`
}

export function CalendlyInline({ prefill, fallbackLabel, blockedLabel }: {
  prefill: CalendlyPrefill
  fallbackLabel: string
  blockedLabel: string
}) {
  const { lang } = useLang()
  const url = buildCalendlyUrl(prefill, lang)
  const holder = useRef<HTMLDivElement | null>(null)
  const [allowed, setAllowed] = useState(false)
  const [failed, setFailed] = useState(false)

  // Third-party embed: only once a non-essential category has been accepted.
  useEffect(() => {
    const sync = () => {
      const c = readConsent()
      setAllowed(Boolean(c && (c.analytics || c.marketing)))
    }
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  useEffect(() => {
    if (!allowed) return
    let done = false
    const settle = (ok: boolean) => { if (!done) { done = true; if (!ok) setFailed(true) } }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`)
    const s = existing ?? document.createElement('script')
    if (!existing) {
      s.src = WIDGET_SCRIPT
      s.async = true
      document.body.appendChild(s)
    }
    s.addEventListener('error', () => settle(false))

    // The widget replaces the holder's contents with an iframe; if that hasn't
    // happened by the deadline (blocked script, CSP, offline), show the link.
    const deadline = window.setTimeout(() => {
      if (!holder.current?.querySelector('iframe')) settle(false)
      else settle(true)
    }, LOAD_TIMEOUT_MS)

    return () => { window.clearTimeout(deadline); done = true }
  }, [allowed, url])

  const link = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary"
      style={{ minHeight: 44 }}
    >
      {fallbackLabel}
    </a>
  )

  if (!allowed) {
    return (
      <div className="mt-8 text-left">
        <p className="font-sans" style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>{blockedLabel}</p>
        <div className="mt-4">{link}</div>
      </div>
    )
  }

  if (failed) return <div className="mt-8">{link}</div>

  return (
    <div className="mt-8">
      {/* Calendly's own minimum for the inline widget is ~700px; below that the
          month grid clips. Height is reported in the viewport table. */}
      <div
        ref={holder}
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: 0, width: '100%', height: 700, borderRadius: 12, overflow: 'hidden' }}
      />
      <div className="mt-4">{link}</div>
    </div>
  )
}
