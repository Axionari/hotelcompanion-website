export const OPEN_LIVE_DEMO_EVENT = 'hc:open-live-demo'

export function openLiveDemo() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_LIVE_DEMO_EVENT))
}
