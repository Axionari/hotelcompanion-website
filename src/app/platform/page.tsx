import NarrativePage from '@/components/editorial/NarrativePage'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Product',
  description:
    'One conversation across booking, arrival, service, revenue, and return — grounded in hotel knowledge and carried through to a verified outcome.',
  path: '/platform',
})

export default function PlatformPage() {
  return <NarrativePage page="platform" />
}
