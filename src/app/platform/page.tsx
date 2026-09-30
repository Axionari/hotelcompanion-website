import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Product',
  description:
    'AI voice and text guest service, approved actions, Companion Control and useful guest memory.',
  path: '/platform',
})

export default function PlatformPage() {
  return <ExperiencePage page="platform" />
}
