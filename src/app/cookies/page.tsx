import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { cookiesDoc } from '@/lib/i18n/marketing/legal'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Hotel Companion uses cookies and similar technologies, and how to manage your preferences.',
}

export default function Page() {
  return <LegalLayout doc={cookiesDoc} />
}
