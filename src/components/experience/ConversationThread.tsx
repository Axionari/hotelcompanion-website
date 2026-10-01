"use client"

import { useRef } from 'react'
import { Check, Mic, Sparkles } from 'lucide-react'
import { LiveText, TypingIndicator, useThreadMotion } from './ConversationMotion'
import { useLang } from '@/lib/i18n/LanguageContext'

/** A complete, accessible conversation. The walkthrough owns its single clock. */
export function ConversationThread({ messages, outcome, voice = false, persist = 0 }: {
 messages: readonly string[]; outcome?: string; voice?: boolean; persist?: number
}) {
 const { lang } = useLang(), ref = useRef<HTMLDivElement>(null)
 useThreadMotion(ref, JSON.stringify(messages), persist)
 return <div ref={ref} className="hc-conversation-thread" aria-label={lang === 'es' ? 'Conversación de ejemplo' : 'Example conversation'}>
  <header className="hc-thread-header"><span className="hc-thread-symbol">{voice ? <Mic size={14}/> : <Sparkles size={14}/>}</span><span>Hotel Companion</span><small>{voice ? (lang === 'es' ? 'Llamada de voz' : 'Voice call') : (lang === 'es' ? 'Conversación' : 'Conversation')}</small></header>
  <ol className="hc-thread-messages">{messages.map((text, index) => <li key={index} className="hc-thread-message" data-role={index % 2 ? 'companion' : 'guest'} data-turn={index}>
   <span className="xp-sr-only">{index % 2 ? 'Hotel Companion: ' : lang === 'es' ? 'Huésped: ' : 'Guest: '}</span>
   <div className="hc-thread-bubble"><LiveText text={text} speaker={index % 2 ? 'reply' : 'guest'}/>{index % 2 ? <TypingIndicator label={voice ? (lang === 'es' ? 'Respondiendo…' : 'Responding…') : (lang === 'es' ? 'Escribiendo…' : 'Typing…')}/> : null}</div>
  </li>)}</ol>
  {outcome ? <div className="hc-thread-outcome"><Check size={13}/><span>{outcome}</span></div> : null}
 </div>
}
