import NarrativePage from '@/components/editorial/NarrativePage'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Capabilities',
  description:
    'Give every hotel team the context it needs — from arrival and service recovery to tasteful revenue and the morning operating view.',
  path: '/solutions',
})

export default function SolutionsPage() {
  return <NarrativePage page="solutions" />
}
