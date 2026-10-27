import type { Metadata } from 'next'

const SITE_URL = 'https://www.hotelcompanion.ai'
export function getSocialImage(lang: 'en' | 'es' = 'en') {
  return {
    url: `${SITE_URL}/og/hotel-companion-guest-journey-${lang}.png?v=20261027`,
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: lang === 'es'
      ? 'Hotel Companion — Mejores ofertas. Más ingresos.'
      : 'Hotel Companion — Smarter offers. More revenue.',
  }
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
  const socialImage = getSocialImage(lang)
  return {
    title: path === '/' ? { absolute: title } : title,
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
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  }
}
