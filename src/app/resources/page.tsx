import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'
import { ESSAYS, ESSAYS_ES } from '@/lib/library'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Insights for the Future of Hospitality. Essays on guest intelligence, AI, operational excellence, and the future of hospitality — written for hotel leaders.',
}

/** Category filter options come from each language's own essay index. */
function categoriesOf(essays: { category: string }[]) {
  return [...new Set(essays.map((e) => e.category))]
}

export default function ResourcesPage() {
  return (
    <ResourcesClient
      content={{
        en: { essays: ESSAYS, categories: categoriesOf(ESSAYS) },
        es: { essays: ESSAYS_ES, categories: categoriesOf(ESSAYS_ES) },
      }}
    />
  )
}
