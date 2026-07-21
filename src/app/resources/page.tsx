import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'
import { ESSAYS, CATEGORY_ORDER } from '@/lib/library'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Insights for the Future of Hospitality. Essays on guest intelligence, AI, operational excellence, and the future of hospitality — written for hotel leaders.',
}

export default function ResourcesPage() {
  const used = CATEGORY_ORDER.filter((cat) => ESSAYS.some((e) => e.category === cat))
  return <ResourcesClient essays={ESSAYS} categories={used} />
}
