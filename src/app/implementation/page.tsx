import ExperiencePage from '@/components/experience/ExperiencePages'
import { createPageMetadata } from '@/lib/siteMetadata'
export const metadata=createPageMetadata({ title: 'Implementation & pilot', description: 'A focused hotel rollout with initial setup and integration, a minimum monthly platform fee and a success fee tied to additional contribution. Pricing scoped for your hotel.', path: '/implementation' })
export default function Page(){return <ExperiencePage page="implementation"/>}
