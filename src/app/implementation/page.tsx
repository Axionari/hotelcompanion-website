import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'
export const metadata=createPageMetadata({ title: 'Implementation & pilot', description: 'A focused hotel rollout with validated connections, approved rules and a qualified outcome-based pilot.', path: '/implementation' })
export default function Page(){return <ExperiencePage page="implementation"/>}
