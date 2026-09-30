import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact the Hotel Companion team for a tailored demonstration or a qualified outcome-based pilot.',
  path: '/contact',
})

export default function ContactPage() {
  return <ExperiencePage page="contact" />
}
