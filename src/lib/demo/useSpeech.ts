'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Web Speech API bindings for the live demo (Live Demo · D3).
 *
 * Both halves are progressive enhancements and both degrade independently:
 * a browser with no `SpeechRecognition` still gets text chat, and a browser
 * with no `speechSynthesis` still gets the written reply. Nothing here is
 * required for the demo to work — it is required for the demo to feel alive.
 */

/* The Web Speech API is not in lib.dom, so declare the surface we touch. */
type SpeechAlt = { transcript: string }
type SpeechResult = { isFinal: boolean; 0: SpeechAlt; length: number }
type SpeechEvent = { resultIndex: number; results: ArrayLike<SpeechResult> }
type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: SpeechEvent) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}
type RecognitionCtor = new () => Recognition

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor
    webkitSpeechRecognition?: RecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export type UseSpeech = {
  /** Recognition is available in this browser. */
  canListen: boolean
  /** Synthesis is available in this browser. */
  canSpeak: boolean
  listening: boolean
  speaking: boolean
  /** Live partial transcript, for showing the guest they are being heard. */
  interim: string
  start: () => void
  stop: () => void
  speak: (text: string) => void
  cancel: () => void
}

export function useSpeech({
  lang,
  onFinal,
  muted,
}: {
  lang: 'en' | 'es'
  /** Called once per completed utterance. */
  onFinal: (text: string) => void
  muted: boolean
}): UseSpeech {
  const [canListen, setCanListen] = useState(false)
  const [canSpeak, setCanSpeak] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [interim, setInterim] = useState('')

  const recRef = useRef<Recognition | null>(null)
  const onFinalRef = useRef(onFinal)
  onFinalRef.current = onFinal

  const locale = lang === 'es' ? 'es-MX' : 'en-US'

  useEffect(() => {
    setCanListen(getRecognitionCtor() !== null)
    setCanSpeak(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  /* Recognition lives for the life of the component, re-created on language
     change so the guest is transcribed in the language they are reading. */
  useEffect(() => {
    const Ctor = getRecognitionCtor()
    if (!Ctor) return

    const rec = new Ctor()
    rec.lang = locale
    rec.continuous = false
    rec.interimResults = true
    rec.maxAlternatives = 1

    rec.onresult = (e) => {
      let partial = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]
        const t = r[0]?.transcript ?? ''
        if (r.isFinal) {
          const final = t.trim()
          setInterim('')
          if (final) onFinalRef.current(final)
        } else {
          partial += t
        }
      }
      if (partial) setInterim(partial)
    }
    // A denied mic or a no-speech timeout must not strand the orb in
    // "listening" — every error path resets the visible state.
    rec.onerror = () => {
      setListening(false)
      setInterim('')
    }
    rec.onend = () => {
      setListening(false)
      setInterim('')
    }

    recRef.current = rec
    return () => {
      rec.onresult = null
      rec.onerror = null
      rec.onend = null
      try {
        rec.abort()
      } catch {
        /* already stopped */
      }
      recRef.current = null
    }
  }, [locale])

  const start = useCallback(() => {
    const rec = recRef.current
    if (!rec) return
    // Speaking over ourselves would feed the reply back into the mic.
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
    try {
      rec.start()
      setListening(true)
    } catch {
      /* start() throws if already running — the state is already correct */
    }
  }, [])

  const stop = useCallback(() => {
    try {
      recRef.current?.stop()
    } catch {
      /* not running */
    }
    setListening(false)
    setInterim('')
  }, [])

  const cancel = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (muted) return
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
      const clean = text.trim()
      if (!clean) return

      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(clean)
      u.lang = locale
      u.rate = 1.02
      u.pitch = 1
      u.onend = () => setSpeaking(false)
      u.onerror = () => setSpeaking(false)
      setSpeaking(true)
      window.speechSynthesis.speak(u)
    },
    [locale, muted]
  )

  useEffect(() => {
    if (muted) cancel()
  }, [muted, cancel])

  // Chrome keeps utterances queued across navigation otherwise.
  useEffect(() => cancel, [cancel])

  return { canListen, canSpeak, listening, speaking, interim, start, stop, speak, cancel }
}
