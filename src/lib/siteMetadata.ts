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
  lang = 'en',
}: {
  title: string
  description: string
  path: `/${string}`
  type?: 'website' | 'article'
  lang?: 'en' | 'es'
}): Metadata {
  const basePath = path === '/' ? '' : path
  const englishUrl = `${SITE_URL}${basePath}`
  const spanishUrl = `${SITE_URL}/es${basePath}`
  const url = lang === 'es' ? spanishUrl : englishUrl
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en-US': englishUrl,
        'es-MX': spanishUrl,
        'x-default': englishUrl,
      },
    },
    openGraph: {
      siteName: 'Hotel Companion',
      title,
      description,
      url,
      type,
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: [lang === 'es' ? 'en_US' : 'es_MX'],
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
