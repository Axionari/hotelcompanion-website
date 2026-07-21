import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { securityDoc } from '@/lib/i18n/marketing/legal'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Enterprise-grade security for enterprise hospitality — encryption, access control, secure infrastructure, and responsible AI security.',
}

export default function Page() {
  return (
    <LegalLayout
      eyebrow={securityDoc.eyebrow}
      title={securityDoc.title}
      lastUpdated={securityDoc.lastUpdated}
      intro={securityDoc.intro}
      blocks={securityDoc.blocks}
    />
  )
}
