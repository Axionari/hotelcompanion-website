import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Guest experience',
  description:
    'Telephone, desktop web, mobile web and optional in-room tablets for a connected hotel guest experience.',
  path: '/solutions',
})

export default function SolutionsPage() {
  return <ExperiencePage page="solutions" />
}
