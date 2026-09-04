import { LegalLayout } from '@/components/cds/LegalLayout'
import { privacyDoc } from '@/lib/i18n/marketing/legal'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'How Hotel Companion collects, uses, and protects information. Privacy, security, and responsible AI are foundational principles.',
  path: '/privacy',
})

export default function Page() {
  return <LegalLayout doc={privacyDoc} />
}
