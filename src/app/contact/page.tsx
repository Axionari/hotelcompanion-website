import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Let’s Build the Future of Hospitality Together. Talk to the Hotel Companion team about the platform, a pilot, partnerships, or the Founding Partner Program.',
}

export default function ContactPage() {
  return <ContactClient />
}
