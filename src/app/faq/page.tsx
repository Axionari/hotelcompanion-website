import type { Metadata } from 'next'
import FaqClient from './FaqClient'
import { faqPageCopy } from '@/lib/i18n/marketing/faqPage'
import { homeCopy } from '@/lib/i18n/marketing/home'

export const metadata: Metadata = {
  title: 'FAQ — Hotel Companion',
  description:
    'Frequently asked questions about Hotel Companion, the Voice-First Guest Intelligence Platform for Hotels.',
}

/* FAQPage JSON-LD (v3 Phase 1 {#12}): schema carries the full indexed set —
   the four Q&As on this page plus the four kept on the homepage — in EN, the
   language of the server-rendered HTML. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [...faqPageCopy.en.items, ...homeCopy.en.faq.items].map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  )
}
