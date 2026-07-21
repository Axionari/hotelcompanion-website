import type { Metadata } from 'next'
import PlatformClient from './PlatformClient'

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'One Platform. Every Guest Interaction. The Voice-First Guest Intelligence Platform built for modern hospitality.',
}

export default function PlatformPage() {
  return <PlatformClient />
}
