import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/cds/ArticleLayout'
import { ESSAYS, getEssay, readEssayBody } from '@/lib/library'

export function generateStaticParams() {
  return ESSAYS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const essay = getEssay(slug)
  if (!essay) return {}
  const url = `https://hotelcompanion.ai/resources/library/${essay.slug}`
  return {
    title: essay.title,
    description: essay.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: essay.title,
      description: essay.subtitle,
      url,
      type: 'article',
      siteName: 'Hotel Companion',
    },
    twitter: { card: 'summary_large_image', title: essay.title, description: essay.subtitle },
  }
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const essay = getEssay(slug)
  if (!essay) notFound()

  const blocks = readEssayBody(essay.slug)
  const next = essay.next ? (getEssay(essay.next) ?? null) : null
  const others = ESSAYS.filter((e) => e.slug !== essay.slug && e.slug !== next?.slug)

  return <ArticleLayout essay={essay} blocks={blocks} next={next} others={others} />
}
