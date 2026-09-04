import { LegalLayout } from '@/components/cds/LegalLayout'
import { securityDoc } from '@/lib/i18n/marketing/legal'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Security',
  description:
    'Enterprise-grade security for enterprise hospitality — encryption, access control, secure infrastructure, and responsible AI security.',
  path: '/security',
})

export default function Page() {
  return <LegalLayout doc={securityDoc} />
}
