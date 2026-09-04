import NarrativePage from '@/components/editorial/NarrativePage'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Enterprise',
  description:
    'Govern shared standards, local hotel identity, knowledge, roles, permissions, integrations, and portfolio insight from one hospitality intelligence layer.',
  path: '/enterprise',
})

export default function EnterprisePage() {
  return <NarrativePage page="enterprise" />
}
