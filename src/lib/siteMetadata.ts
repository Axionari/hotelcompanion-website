import type { Metadata } from 'next'

const SITE_URL = 'https://www.hotelcompanion.ai'
const SOCIAL_IMAGE = {
  url: `${SITE_URL}/og/hotel-companion-og.jpg`,
  width: 1200,
  height: 630,
  alt: 'Hotel Companion',
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string
  description: string
  path: `/${string}`
  type?: 'website' | 'article'
}): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: 'Hotel Companion',
      title,
      description,
      url,
      type,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  }
}
