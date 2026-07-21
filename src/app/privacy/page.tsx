import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { privacyDoc } from '@/lib/i18n/marketing/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Hotel Companion collects, uses, and protects information. Privacy, security, and responsible AI are foundational principles.',
}

export default function Page() {
  return (
    <LegalLayout
      eyebrow={privacyDoc.eyebrow}
      title={privacyDoc.title}
      lastUpdated={privacyDoc.lastUpdated}
      intro={privacyDoc.intro}
      blocks={privacyDoc.blocks}
    />
  )
}
