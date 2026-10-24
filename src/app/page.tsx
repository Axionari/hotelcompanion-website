import HomeExperienceClient from './HomeExperienceClient'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Hotel Companion — Smarter offers. More revenue.',
  description:
    'A smart companion that turns calls, messages and web inquiries into bookings, upgrades and experiences, around the clock. Faster guest service. More value from every stay.',
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.hotelcompanion.ai/#organization',
      name: 'Hotel Companion',
      url: 'https://www.hotelcompanion.ai',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.hotelcompanion.ai/#product',
      name: 'Hotel Companion',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://www.hotelcompanion.ai',
      description:
        'A smart hotel companion that uses conversation and guest-approved context to recommend relevant upgrades, experiences and packages, answer questions and coordinate service requests.',
      provider: { '@id': 'https://www.hotelcompanion.ai/#organization' },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <HomeExperienceClient />
    </>
  )
}
