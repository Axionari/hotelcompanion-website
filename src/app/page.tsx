import HomeExperienceClient from './HomeExperienceClient'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Hotel Companion — More direct revenue. A better stay.',
  description:
    'Help more guests book directly, choose relevant upgrades and arrange their stay. Around-the-clock assistance, clear team handoffs and a measured pilot for your hotel.',
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
