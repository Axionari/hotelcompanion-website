import { LegalLayout } from '@/components/cds/LegalLayout'
import { termsDoc } from '@/lib/i18n/marketing/legal'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Terms of Service',
  description:
    'The Terms governing access to and use of Hotel Companion, Companion OS, and related services.',
  path: '/terms',
})

export default function Page() {
  return <LegalLayout doc={termsDoc} />
}
