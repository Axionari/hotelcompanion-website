/**
 * Cookie-consent storage (mirrors Restaurant Companion's model, namespaced to
 * HC). One localStorage key holds the whole decision; the banner renders only
 * while no decision exists. The custom event lets same-tab listeners (the
 * banner, future analytics) react to writes/clears — `storage` events do not
 * fire in the tab that made the change.
 *
 * HC loads no analytics scripts today; `hasConsent()` exists so the future
 * analytics/UTM pass can gate on it without rewiring this module.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

export interface Consent {
  necessary: true
  analytics: boolean
  marketing: boolean
  decided: true
}

export const CONSENT_KEY = 'hc_consent'
export const CONSENT_EVENT = 'hc-consent-change'

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.decided !== true) return null
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decided: true,
    }
  } catch {
    return null
  }
}

export function writeConsent(prefs: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    decided: true,
  }
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  } catch {
    /* storage unavailable (private mode etc.) — the banner will simply return */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT))
  return consent
}

/** Clears the stored decision and re-opens the banner (the manage control). */
export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT))
}

/** Gate for future analytics/marketing scripts. False until a decision grants it. */
export function hasConsent(category: ConsentCategory): boolean {
  const c = readConsent()
  if (!c) return false
  return category === 'necessary' ? true : c[category]
}
