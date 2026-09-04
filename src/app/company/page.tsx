import NarrativePage from '@/components/editorial/NarrativePage'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Company',
  description:
    'Why Axionari built Hotel Companion: to preserve hospitality judgment, make ownership visible, and turn guest intent into measurable operating value.',
  path: '/company',
})

export default function CompanyPage() {
  return <NarrativePage page="company" />
}
