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
  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `https://www.hotelcompanion.ai${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/demo' ? 0.9 : 0.7,
  }))

  const essays = ESSAYS.map((essay) => ({
    url: `https://www.hotelcompanion.ai/resources/library/${essay.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...pages, ...essays]
}
