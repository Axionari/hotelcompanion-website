"use client"

import { useLang } from '@/lib/i18n/LanguageContext'
import { ConversationThread } from './ConversationThread'
import { conversationStory, type ConversationKind } from './conversation-stories'

export function ValueScene({ index, kind = 'capability' }: { index: number; kind?: ConversationKind }) {
 const { lang } = useLang(), story = conversationStory(kind, index, lang)
 const voice = kind === 'capability' && index === 2 || kind === 'channel' && index === 0
 return <div className="hc-value-scene" key={`${kind}-${index}-${lang}`}><ConversationThread messages={story.messages} outcome={story.outcome} voice={voice}/></div>
}
