import type { MetadataRoute } from 'next'
import { ESSAYS } from '@/lib/library'

const routes = [
  '',
  '/platform',
  '/solutions',
  '/enterprise',
  '/companion-os',
  '/resources',
  '/company',
  '/demo',
  '/contact',
  '/trust',
  '/security',
  '/responsible-ai',
  '/accessibility',
  '/privacy',
  '/terms',
  '/cookies',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = routes.flatMap((route) => {
    const en = `https://www.hotelcompanion.ai${route}`
    const es = `https://www.hotelcompanion.ai/es${route}`
    const shared = {
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : route === '/demo' ? 0.9 : 0.7,
      alternates: { languages: { en, es } },
    }
    return [{ url: en, ...shared }, { url: es, ...shared }]
  })

  const essays = ESSAYS.flatMap((essay) => {
    const en = `https://www.hotelcompanion.ai/resources/library/${essay.slug}`
    const es = `https://www.hotelcompanion.ai/es/resources/library/${essay.slug}`
    const shared = {
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: { languages: { en, es } },
    }
    return [{ url: en, ...shared }, { url: es, ...shared }]
  })

  return [...pages, ...essays]
}
