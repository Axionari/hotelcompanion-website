import { LegalLayout } from '@/components/cds/LegalLayout'
import { responsibleAiDoc } from '@/lib/i18n/marketing/legal'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Responsible AI',
  description:
    'Artificial intelligence should make hospitality more human—not less. Our principles for building AI responsibly.',
  path: '/responsible-ai',
})

export default function Page() {
  return <LegalLayout doc={responsibleAiDoc} />
}
