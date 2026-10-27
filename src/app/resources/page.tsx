import ResourcesClient from './ResourcesClient'
import { ESSAYS, ESSAYS_ES } from '@/lib/library'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Resources',
  description:
    'Practical guides to better guest service, more profitable stays and a measured first deployment, written for hotel leaders.',
  path: '/resources',
})

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
