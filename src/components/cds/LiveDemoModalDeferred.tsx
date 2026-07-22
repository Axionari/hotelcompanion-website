'use client'

import { ComponentType, useEffect, useState } from 'react'

/**
 * v4 G-7 — the authorized demo-engine bundle split (v3.1): the layout no
 * longer ships the LiveDemo modal (and its demo engine) in the initial
 * bundle. This shell listens for the open event immediately and pulls the
 * real modal on demand — or after a post-load idle delay so it is warm
 * before a user reaches a trigger. Behavior is unchanged: every entry point
 * still opens the same modal via `openLiveDemo()`.
 */

const OPEN_EVENT = 'hc:open-live-demo'

export function LiveDemoModalDeferred() {
  const [Modal, setModal] = useState<ComponentType | null>(null)
  const [pendingOpen, setPendingOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = () =>
      import('./LiveDemoModal').then((m) => {
        if (mounted) setModal(() => m.LiveDemoModal)
      })
    const onOpen = () => {
      setPendingOpen(true)
      load()
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    const warm = window.setTimeout(load, 3500)
    return () => {
      mounted = false
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.clearTimeout(warm)
    }
  }, [])

  // the freshly mounted modal registers its own listener; replay the open
  useEffect(() => {
    if (!Modal || !pendingOpen) return
    const id = window.setTimeout(() => window.dispatchEvent(new CustomEvent(OPEN_EVENT)), 60)
    setPendingOpen(false)
    return () => window.clearTimeout(id)
  }, [Modal, pendingOpen])

  return Modal ? <Modal /> : null
}
