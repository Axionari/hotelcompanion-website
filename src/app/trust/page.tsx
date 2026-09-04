import { LegalLayout } from '@/components/cds/LegalLayout'
import { trustDoc } from '@/lib/i18n/marketing/legal'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Trust Center',
  description:
    'Security, privacy, responsible AI, terms, and cookies — how Hotel Companion protects information and operates with transparency.',
  path: '/trust',
})

export default function Page() {
  return <LegalLayout doc={trustDoc} />
}
