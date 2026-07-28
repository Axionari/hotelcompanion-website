'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCopy } from '@/lib/i18n/useCopy'
import { cookieBannerCopy } from '@/lib/i18n/marketing/cookieBanner'
import { CONSENT_EVENT, clearConsent, readConsent, writeConsent } from '@/lib/consent'

/**
 * Cookie consent banner — Restaurant Companion's banner, in HC tokens
 * (see .cbanner… in globals.css). Renders only when no decision is stored;
 * consent is read after mount so the banner never appears in server HTML and
 * repeat visits get no flash. `clearConsent()` (the /cookies manage control)
 * fires CONSENT_EVENT, which re-opens it live.
 */
export function CookieBanner() {
  const c = useCopy(cookieBannerCopy)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const sync = () => {
      const undecided = readConsent() === null
      setVisible(undecided)
      if (undecided) {
        setExpanded(false)
        setAnalytics(false)
        setMarketing(false)
      }
    }
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  if (!visible) return null

  const decide = (prefs: { analytics: boolean; marketing: boolean }) => {
    writeConsent(prefs)
    setVisible(false)
  }

  return (
    <div className="cbanner" role="dialog" aria-modal="true" aria-label={c.ariaLabel}>
      <div className="cbin">
        <p className="cbtext">
          {c.bodyPre}
          <Link href="/cookies">{c.linkText}</Link>
          {c.bodyPost}
        </p>
        {expanded && (
          <div className="cbopts">
            <label className="cbopt">
              <input type="checkbox" checked disabled readOnly />
              <span>
                {c.necessary} <em>{c.alwaysOn}</em>
              </span>
            </label>
            <label className="cbopt">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
              <span>{c.analytics}</span>
            </label>
            <label className="cbopt">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              <span>{c.marketing}</span>
            </label>
          </div>
        )}
        <div className="cbrow">
          {expanded ? (
            <button type="button" className="cbtn" onClick={() => decide({ analytics, marketing })}>
              {c.save}
            </button>
          ) : (
            <button type="button" className="cbtn" onClick={() => setExpanded(true)}>
              {c.customize}
            </button>
          )}
          <button type="button" className="cbtn" onClick={() => decide({ analytics: false, marketing: false })}>
            {c.reject}
          </button>
          <button type="button" className="cbtn" onClick={() => decide({ analytics: true, marketing: true })}>
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * The /cookies re-open control (RC's "rmanage" equivalent, HC styling):
 * clears the stored decision, which re-opens the banner via CONSENT_EVENT.
 */
export function ManageCookiesButton() {
  const c = useCopy(cookieBannerCopy)
  return (
    <button type="button" className="btn-secondary" style={{ minHeight: 44 }} onClick={clearConsent}>
      {c.manage}
    </button>
  )
}
