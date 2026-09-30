import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'
export const metadata=createPageMetadata({ title: 'Revenue', description: 'Contextual recommendations, approved packages and measurable additional contribution for hotels.', path: '/revenue' })
export default function Page(){return <ExperiencePage page="revenue"/>}
