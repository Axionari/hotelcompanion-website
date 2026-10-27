import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Product',
  description:
    'Help guests act through voice, text and visual controls. Keep approved offers, team ownership and guest context together across the stay.',
  path: '/platform',
})

export default function PlatformPage() {
  return <ExperiencePage page="platform" />
}
