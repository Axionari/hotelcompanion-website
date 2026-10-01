'use client'

import { useEffect, type RefObject } from 'react'

/** The visible ink is a presentation only. Complete, stable copy remains
 * available to assistive technology, without announcing every character. */
export function LiveText({ text, speaker }: { text: string; speaker: 'guest' | 'reply' }) {
  return <><span className="xp-sr-only">{text}</span><span className="hc-live-text" aria-hidden="true"><span className="hc-live-measure">{text}</span><span className="hc-live-ink" data-conversation-text={speaker}>{text}</span></span></>
}

export function TypingIndicator({ label }: { label: string }) {
  return <span className="hc-chat-typing" aria-hidden="true"><span className="hc-chat-dots"><i/><i/><i/></span><span>{label}</span></span>
}

/** Shares the section's existing clock: no additional timers, per-frame React
 * updates or network requests. The reserved text measure prevents reflow. */
export function useConversationMotion(ref: RefObject<HTMLDivElement | null>, guest: string, reply: string, existingGuest = false) {
  useEffect(() => {
    const scene = ref.current, sequence = scene?.closest<HTMLElement>('.hc-sequence')
    if (!scene || !sequence) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const segment = (text: string) => typeof Intl.Segmenter === 'function'
      ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), part => part.segment)
      : Array.from(text)
    const guestLetters = segment(guest), replyLetters = segment(reply)
    const guestInk = scene.querySelector<HTMLElement>('[data-conversation-text=guest]')
    const replyInk = scene.querySelector<HTMLElement>('[data-conversation-text=reply]')
    const guestStart = 250, guestDuration = Math.min(1600, Math.max(650, guestLetters.length * 27))
    const guestEnd = existingGuest ? 0 : guestStart + guestDuration
    const replyStart = guestEnd + 950
    const replyDuration = Math.min(2600, Math.max(1000, replyLetters.length * 28))
    const replyEnd = replyStart + replyDuration
    let lastGuest = -1, lastReply = -1
    const flag = (name: string, value: boolean) => {
      if (scene.dataset[name] !== String(value)) scene.dataset[name] = String(value)
    }
    const draw = (elapsed: number) => {
      flag('conversationMotion', !media.matches)
      if (media.matches) {
        if (guestInk) guestInk.textContent = guest
        if (replyInk) replyInk.textContent = reply
        lastGuest = lastReply = -1
        return
      }
      const guestCount = existingGuest ? guestLetters.length : Math.floor(guestLetters.length * Math.max(0, Math.min(1, (elapsed - guestStart) / guestDuration)))
      const replyCount = Math.floor(replyLetters.length * Math.max(0, Math.min(1, (elapsed - replyStart) / replyDuration)))
      if (guestCount !== lastGuest && guestInk) { guestInk.textContent = guestLetters.slice(0, guestCount).join(''); lastGuest = guestCount }
      if (replyCount !== lastReply && replyInk) { replyInk.textContent = replyLetters.slice(0, replyCount).join(''); lastReply = replyCount }
      flag('guestVisible', existingGuest || elapsed >= 150)
      flag('guestWriting', !existingGuest && elapsed >= guestStart && elapsed < guestEnd)
      flag('replyVisible', elapsed >= guestEnd + 250)
      flag('replyWriting', elapsed >= replyStart)
      flag('outcomeVisible', elapsed >= replyEnd + 450)
      flag('teamVisible', elapsed >= guestEnd + 250)
      flag('teamContext', elapsed >= guestEnd + 700)
      flag('teamFacts', elapsed >= guestEnd + 1150)
      flag('statusVisible', elapsed >= replyEnd + 250)
    }
    const refresh = () => draw(Number(sequence.style.getPropertyValue('--sequence-progress') || 0) * Number(sequence.dataset.sequenceDuration || 10000))
    const tick = (event: Event) => draw((event as CustomEvent<number>).detail)
    sequence.addEventListener('hc-sequence-tick', tick)
    media.addEventListener('change', refresh)
    refresh()
    return () => { sequence.removeEventListener('hc-sequence-tick', tick); media.removeEventListener('change', refresh) }
  }, [ref, guest, reply, existingGuest])
}
