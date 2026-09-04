import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/assistant/', '/auth/', '/dashboard/', '/onboarding/', '/v3-kit', '/kitchen-sink'],
    },
    sitemap: 'https://www.hotelcompanion.ai/sitemap.xml',
  }
}
