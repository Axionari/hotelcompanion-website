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

/** Compose each turn on the shared visible-time clock. Reserve every bubble's
 * final height, and expose the complete transcript to assistive technology. */
export function useThreadMotion(ref: RefObject<HTMLDivElement | null>, serialized: string, persist: number) {
 useEffect(() => {
  const thread = ref.current, sequence = thread?.closest<HTMLElement>('.hc-sequence')
  if (!thread || !sequence) return
  const messages: string[] = JSON.parse(serialized)
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  const segment = (text: string) => typeof Intl.Segmenter === 'function'
   ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), part => part.segment)
   : Array.from(text)
  let cursor = 200
  const turns = messages.map((text, index) => {
   const node = thread.querySelector<HTMLElement>(`[data-turn="${index}"]`)!
   const ink = node.querySelector<HTMLElement>('.hc-live-ink')!
   const letters = segment(text), duration = Math.min(2200, Math.max(650, letters.length * 23))
   const visible = cursor, start = cursor + (index % 2 ? 650 : 0), end = start + duration
   if (index >= persist) cursor = end + 650
   return { node, ink, text, letters, visible, start, end, duration, last: -1, existing: index < persist }
  })
  const scene = thread.closest<HTMLElement>('.sj-scene')
  const flag = (node: HTMLElement, name: string, value: boolean) => {
   if (node.dataset[name] !== String(value)) node.dataset[name] = String(value)
  }
  const draw = (elapsed: number) => {
   flag(thread, 'threadMotion', !media.matches)
   for (const turn of turns) {
    const complete = media.matches || turn.existing
    const count = complete ? turn.letters.length : Math.floor(turn.letters.length * Math.max(0, Math.min(1, (elapsed - turn.start) / turn.duration)))
    if (count !== turn.last) { turn.ink.textContent = turn.letters.slice(0, count).join(''); turn.last = count }
    flag(turn.node, 'visible', complete || elapsed >= turn.visible)
    flag(turn.node, 'typing', !complete && elapsed >= turn.visible && elapsed < turn.start)
   }
   flag(thread, 'complete', media.matches || elapsed >= cursor - 300)
   if (scene) {
    flag(scene, 'conversationMotion', !media.matches)
    flag(scene, 'teamVisible', media.matches || elapsed >= 700)
    flag(scene, 'teamContext', media.matches || elapsed >= 1300)
    flag(scene, 'teamFacts', media.matches || elapsed >= 1800)
    flag(scene, 'statusVisible', media.matches || elapsed >= cursor - 300)
    flag(scene, 'outcomeVisible', media.matches || elapsed >= cursor - 300)
   }
  }
  const refresh = () => draw(Number(sequence.style.getPropertyValue('--sequence-progress') || 0) * Number(sequence.dataset.sequenceDuration || 18000))
  const tick = (event: Event) => draw((event as CustomEvent<number>).detail)
  sequence.addEventListener('hc-sequence-tick', tick)
  media.addEventListener('change', refresh)
  refresh()
  return () => { sequence.removeEventListener('hc-sequence-tick', tick); media.removeEventListener('change', refresh) }
 }, [ref, serialized, persist])
}
