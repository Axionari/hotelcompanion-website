'use client'

import { useCallback, useRef, useState } from 'react'
import {
  buildMarazulPrompt,
  parseReply,
  pickFallback,
  type ActionId,
  type CardId,
} from './marazulDemo'

/**
 * The live demo's conversation runtime (Live Demo · D2).
 *
 * It calls the repo's existing `/api/preview-chat` route unchanged — no new
 * endpoint, no auth, no persistence. Nothing the guest types is stored anywhere:
 * the transcript lives in component state and dies with the tab.
 *
 * The one hard requirement is that it must never show an error. A demo that
 * breaks in front of a prospect is worse than a demo that is slightly canned,
 * so every failure path (network, rate limit, timeout, empty stream) resolves
 * into a written-in-voice fallback answer with a card attached.
 */

export type Turn = {
  id: number
  role: 'guest' | 'companion'
  text: string
  card?: CardId
  action?: ActionId
  /** Set once the guest confirms a mock action — the action is then spent. */
  actionDone?: boolean
  /** True while tokens are still arriving. */
  streaming?: boolean
  /** True when this answer came from the canned pool rather than the model. */
  fallback?: boolean
}

const TIMEOUT_MS = 15_000
/** Client-side floor between sends; the route also rate-limits at 20/min. */
const COOLDOWN_MS = 700
const MAX_TURNS = 24

export function useCompanion(lang: 'en' | 'es', greeting: string) {
  const [turns, setTurns] = useState<Turn[]>([
    { id: 0, role: 'companion', text: greeting },
  ])
  const [busy, setBusy] = useState(false)

  const nextId = useRef(1)
  const lastSend = useRef(0)
  const fallbackCount = useRef(0)
  const abortRef = useRef<AbortController | null>(null)

  const reset = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    nextId.current = 1
    fallbackCount.current = 0
    setBusy(false)
    setTurns([{ id: 0, role: 'companion', text: greeting }])
  }, [greeting])

  /**
   * Confirms a sandboxed mock action. Deliberately local: no fetch, no order
   * id, no guest details. It renders a confirmation card and marks the
   * originating action spent so it cannot be double-confirmed.
   */
  const confirmAction = useCallback((turnId: number, confirmedText: string) => {
    setTurns((t) => [
      ...t.map((x) => (x.id === turnId ? { ...x, actionDone: true } : x)),
      {
        id: nextId.current++,
        role: 'companion' as const,
        text: confirmedText,
        card: 'confirmation' as CardId,
      },
    ])
  }, [])

  const send = useCallback(
    async (raw: string, opts?: { onReply?: (text: string) => void }) => {
      const question = raw.trim().slice(0, 500)
      if (!question || busy) return

      const now = Date.now()
      if (now - lastSend.current < COOLDOWN_MS) return
      lastSend.current = now

      const guestTurn: Turn = { id: nextId.current++, role: 'guest', text: question }
      const replyId = nextId.current++

      // Build the model's view of the conversation from what is on screen,
      // trimmed so a long demo cannot grow the request without bound.
      const history = [...turns, guestTurn]
        .slice(-MAX_TURNS)
        .filter((t) => t.text)
        .map((t) => ({
          role: t.role === 'guest' ? 'user' : 'assistant',
          content: t.text,
        }))

      setTurns((t) => [
        ...t,
        guestTurn,
        { id: replyId, role: 'companion', text: '', streaming: true },
      ])
      setBusy(true)

      const settle = (reply: { text: string; card?: CardId; action?: ActionId }, fell: boolean) => {
        setTurns((t) =>
          t.map((x) =>
            x.id === replyId
              ? { ...x, ...reply, streaming: false, fallback: fell || undefined }
              : x
          )
        )
        setBusy(false)
        opts?.onReply?.(reply.text)
      }

      const fallback = () => {
        settle(pickFallback(lang, fallbackCount.current++), true)
      }

      const controller = new AbortController()
      abortRef.current = controller
      const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

      try {
        const res = await fetch('/api/preview-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history,
            conversationalStyle: 'barefoot_luxury',
            extracted: {
              hotelName: 'MarAzul Riviera Maya',
              systemPrompt: buildMarazulPrompt(lang),
            },
          }),
        })

        if (!res.ok || !res.body) {
          window.clearTimeout(timer)
          fallback()
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let acc = ''

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          acc += decoder.decode(value, { stream: true })
          const partial = parseReply(acc)
          // Stream the prose; hold the card until the tag has fully arrived.
          setTurns((t) =>
            t.map((x) => (x.id === replyId ? { ...x, text: partial.text } : x))
          )
        }

        window.clearTimeout(timer)
        const final = parseReply(acc)
        if (!final.text) {
          fallback()
          return
        }
        settle(final, false)
      } catch {
        window.clearTimeout(timer)
        fallback()
      } finally {
        abortRef.current = null
      }
    },
    [busy, lang, turns]
  )

  return { turns, busy, send, reset, confirmAction }
}
