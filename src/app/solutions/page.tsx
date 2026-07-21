import type { Metadata } from 'next'
import SolutionsClient from './SolutionsClient'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'One Platform. Every Department. Hotel Companion becomes an intelligent layer across your entire hotel, helping every department respond faster, work smarter, and deliver exceptional hospitality.',
}

export default function SolutionsPage() {
  return <SolutionsClient />
}
