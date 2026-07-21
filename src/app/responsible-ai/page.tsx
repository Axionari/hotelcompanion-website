import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { responsibleAiDoc } from '@/lib/i18n/marketing/legal'

export const metadata: Metadata = {
  title: 'Responsible AI',
  description:
    'Artificial intelligence should make hospitality more human—not less. Our principles for building AI responsibly.',
}

export default function Page() {
  return (
    <LegalLayout
      eyebrow={responsibleAiDoc.eyebrow}
      title={responsibleAiDoc.title}
      lastUpdated={responsibleAiDoc.lastUpdated}
      intro={responsibleAiDoc.intro}
      blocks={responsibleAiDoc.blocks}
    />
  )
}
