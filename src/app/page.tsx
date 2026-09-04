import HomeEditorialClient from './HomeEditorialClient'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Hotel Companion — The stay remembers',
  description:
    'One conversation for booking, arrival, service, revenue and the return — personal before the guest arrives, and useful long after they leave.',
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
        'A hospitality intelligence layer that connects hotel booking, arrival, service, revenue and guest memory in one conversation.',
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
      <HomeEditorialClient />
    </>
  )
}
