import { LegalLayout } from '@/components/cds/LegalLayout'
import { cookiesDoc } from '@/lib/i18n/marketing/legal'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Cookie Policy',
  description:
    'How Hotel Companion uses cookies and similar technologies, and how to manage your preferences.',
  path: '/cookies',
})

export default function Page() {
  return <LegalLayout doc={cookiesDoc} />
}
