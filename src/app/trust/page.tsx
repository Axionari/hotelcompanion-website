import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { trustDoc } from '@/lib/i18n/marketing/legal'

export const metadata: Metadata = {
  title: 'Trust Center',
  description:
    'Security, privacy, responsible AI, terms, and cookies — how Hotel Companion protects information and operates with transparency.',
}

export default function Page() {
  return (
    <LegalLayout
      eyebrow={trustDoc.eyebrow}
      title={trustDoc.title}
      lastUpdated={trustDoc.lastUpdated}
      intro={trustDoc.intro}
      blocks={trustDoc.blocks}
    />
  )
}
