'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import { useLang } from '@/lib/i18n/LanguageContext'

/** One clock for the tab, progress rail and scene. No React render per frame. */
export function useSequence(count: number, duration = 10000, initial = 0, animateSelection = false) {
  const ref = useRef<HTMLElement>(null)
  const attach = useCallback((element: HTMLElement | null) => { ref.current = element }, [])
  const [active, setActive] = useState(initial)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  const [reduced, setReduced] = useState(false)
  const elapsed = useRef(0)
  const [replay, setReplay] = useState(0)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReduced(media.matches)
    change()
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const reading = (node: Element | null) => !!node && element.contains(node) && !node.closest(animateSelection ? '.hc-sequence-controls, .eh-hero-controls, [role=tablist]' : '.hc-sequence-controls, .eh-hero-controls')
    let visible = false, focused = reading(document.activeElement), frame = 0, previous = 0
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      const running = visible && !document.hidden && !focused && !paused && (!manual || animateSelection) && !motion.matches
      element.dataset.sequenceRunning = String(running)
      if (animateSelection) element.dispatchEvent(new CustomEvent('hc-sequence-tick', { detail: elapsed.current }))
      if (running && !frame) { previous = 0; frame = requestAnimationFrame(tick) }
      if (!running && frame) { cancelAnimationFrame(frame); frame = 0; previous = 0 }
    }
    const tick = (now: number) => {
      frame = 0
      if (previous) elapsed.current += Math.min(now - previous, 100)
      previous = now
      element.style.setProperty('--sequence-progress', String(Math.min(elapsed.current / duration, 1)))
      if (animateSelection) element.dispatchEvent(new CustomEvent('hc-sequence-tick', { detail: elapsed.current }))
      if (elapsed.current >= duration) {
        if (manual && animateSelection) { setPaused(true); return }
        elapsed.current = 0
        element.style.setProperty('--sequence-progress', '0')
        setActive(index => (index + 1) % count)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      if (visible) element.dataset.storyReady = 'true'
      update()
    }, { threshold: .12 })
    // Watch the illustration rather than starting the clock while only its heading is visible.
    observer.observe(element.querySelector('.hc-value-scene') || element.querySelector('.sj-scene') || element.querySelector('.hc-conversation-thread') || element.querySelector('[role="tabpanel"]') || element)
    const focusIn = (event: FocusEvent) => { focused = reading(event.target as Element); update() }
    const focusOut = (event: FocusEvent) => { focused = reading(event.relatedTarget as Element | null); update() }
    element.addEventListener('focusin', focusIn)
    element.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', update)
    motion.addEventListener('change', update)
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame)
      element.removeEventListener('focusin', focusIn); element.removeEventListener('focusout', focusOut)
      document.removeEventListener('visibilitychange', update); motion.removeEventListener('change', update)
    }
  }, [active, count, duration, paused, manual, reduced, animateSelection, replay])

  const select = (index: number) => {
    elapsed.current = 0
    ref.current?.style.setProperty('--sequence-progress', '0')
    if (animateSelection) ref.current?.dispatchEvent(new CustomEvent('hc-sequence-tick', { detail: 0 }))
    setManual(true); setPaused(!animateSelection); setActive(index); setReplay(value => value + 1)
  }
  const toggle = () => {
    if (manual && animateSelection && !paused) { setPaused(true) }
    else if (manual) {
      if (elapsed.current >= duration) { elapsed.current = 0; ref.current?.style.setProperty('--sequence-progress', '0') }
      setManual(false); setPaused(false)
    }
    else setPaused(value => !value)
  }
  return { attach, active, select, toggle, reduced, paused: paused || reduced, manual: manual || reduced, count, duration, animateSelection }
}

export type SequencePlayback = ReturnType<typeof useSequence>

export function Sequence({ playback, children, className = '' }: { playback: SequencePlayback; children: ReactNode; className?: string }) {
  const { attach: containerRef, manual, active } = playback
  return <div ref={containerRef} className={`hc-sequence ${className}`} data-sequence-mode={manual ? 'manual' : 'auto'} data-sequence-active={active} data-sequence-duration={playback.duration} data-animate-selection={playback.animateSelection}>{children}</div>
}

export function SequenceControls({ playback }: { playback: SequencePlayback }) {
  const { lang } = useLang(), stopped = playback.paused || (playback.manual && !playback.animateSelection)
  return <div className="hc-sequence-controls"><span aria-hidden="true">{String(playback.active + 1).padStart(2, '0')} <i>/</i> {String(playback.count).padStart(2, '0')}</span>{!playback.reduced && <button type="button" onClick={playback.toggle} aria-label={lang === 'es' ? stopped ? 'Reanudar recorrido automático' : 'Pausar recorrido automático' : stopped ? 'Resume automatic walkthrough' : 'Pause automatic walkthrough'}>{stopped ? <Play size={13}/> : <Pause size={13}/>}</button>}</div>
}

export function SequenceRail({ active }: { active: boolean }) {
  return <span className="hc-sequence-rail" aria-hidden="true"><i data-active={active}/></span>
}

export function SequenceTabs({ labels, active, onChange, name, playback }: { labels: string[]; active: number; onChange: (i: number) => void; name: string; playback?: SequencePlayback }) {
  const strip = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const list = strip.current
    if (!list || !window.matchMedia('(max-width:700px)').matches) return
    const tab = list.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!tab) return
    const left = tab.offsetLeft - list.offsetLeft - (list.clientWidth - tab.clientWidth) / 2
    // Scroll only the tab strip, never the page or the visitor's reading position.
    list.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' })
  }, [active])
  return <div className={playback ? "hc-sequence-navigation" : undefined}><div ref={strip} className="xp-tabs" role="tablist" aria-label={name}>{labels.map((label,i)=><button key={label} id={`${name}-tab-${i}`} role="tab" type="button" aria-selected={active===i} aria-controls={`${name}-panel`} tabIndex={active===i?0:-1} onClick={()=>onChange(i)} onKeyDown={event=>{
    let next=i
    if(event.key==='ArrowRight') next=(i+1)%labels.length
    else if(event.key==='ArrowLeft') next=(i+labels.length-1)%labels.length
    else if(event.key==='Home') next=0
    else if(event.key==='End') next=labels.length-1
    else return
    event.preventDefault(); onChange(next); document.getElementById(`${name}-tab-${next}`)?.focus()
  }}>{playback && <span className="hc-sequence-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>}<span>{label}</span>{playback && <SequenceRail active={active===i}/>}</button>)}</div>{playback && <SequenceControls playback={playback}/>}</div>
}

