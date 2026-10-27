import HomeExperienceClient from './HomeExperienceClient'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Hotel Companion — Smarter offers. More revenue.',
  description:
    'From the first question to the next stay: reservations, relevant recommendations and guest service, 24/7 by phone or web. More value from every stay.',
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
        'From the first question to the next stay, Hotel Companion helps guests get answers, make reservations and enjoy more of what your hotel offers. Available 24/7 by phone or web, it recommends relevant upgrades, dining and experiences, and connects service requests to the right team—helping you deliver more personal service and earn more from every stay.',
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
