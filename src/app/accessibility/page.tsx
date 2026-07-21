import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { accessibilityDoc } from '@/lib/i18n/marketing/accessibility'

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'Accessibility Is Part of Hospitality. Hotel Companion is designed to be usable, readable, and navigable by as many people as possible — targeting WCAG 2.1 Level AA.',
}

export default function Page() {
  return <LegalLayout doc={accessibilityDoc} />
}
