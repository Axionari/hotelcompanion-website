import ContactClient from './ContactClient'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Explore the Hotel Companion Founding Partner Program: one property, ninety days, and four operating measures agreed before launch.',
  path: '/contact',
})

export default function ContactPage() {
  return <ContactClient />
}
