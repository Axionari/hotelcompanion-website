import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Hotel groups',
  description:
    'Shared service standards, local hotel identity and an evidence-based portfolio rollout.',
  path: '/enterprise',
})

export default function EnterprisePage() {
  return <ExperiencePage page="enterprise" />
}
