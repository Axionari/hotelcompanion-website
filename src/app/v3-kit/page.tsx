import type { Metadata } from 'next'
import V3KitClient from './V3KitClient'

/* v3 Phase 2 — hidden component-kit review route. Not linked from any nav. */
export const metadata: Metadata = {
  title: 'v3 Component Kit — internal review',
  robots: { index: false, follow: false },
}

export default function V3KitPage() {
  return <V3KitClient />
}
