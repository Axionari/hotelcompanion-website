import type { Metadata } from 'next'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { termsDoc } from '@/lib/i18n/marketing/legal'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The Terms governing access to and use of Hotel Companion, Companion OS, and related services.',
}

export default function Page() {
  return <LegalLayout doc={termsDoc} />
}
