import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/cds/ArticleLayout'
import { ESSAYS, ESSAYS_BY_LANG, getEssay, readEssayBody } from '@/lib/library'
import type { Language } from '@/lib/i18n/translations'
import { createPageMetadata } from '@/lib/siteMetadata'

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
  return createPageMetadata({
    title: essay.title,
    description: essay.subtitle,
    path: `/resources/library/${essay.slug}`,
    type: 'article',
  })
}

/** Builds the per-language payload the client picks from at render time. */
function bundle(slug: string, lang: Language) {
  const essay = getEssay(slug, lang)
  if (!essay) return null
  const next = essay.next ? (getEssay(essay.next, lang) ?? null) : null
  return {
    essay,
    blocks: readEssayBody(slug, lang),
    next,
    others: ESSAYS_BY_LANG[lang].filter((e) => e.slug !== slug && e.slug !== next?.slug),
  }
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const en = bundle(slug, 'en')
  const es = bundle(slug, 'es')
  if (!en || !es) notFound()

  return <ArticleLayout content={{ en, es }} />
}
