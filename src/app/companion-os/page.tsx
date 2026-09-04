import NarrativePage from '@/components/editorial/NarrativePage'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Companion OS',
  description:
    'The shared operating foundation beneath Hotel Companion and Restaurant Companion — connecting context, approved knowledge, accountable action, and verified outcomes.',
  path: '/companion-os',
})

export default function CompanionOsPage() {
  return <NarrativePage page="companion-os" />
}
