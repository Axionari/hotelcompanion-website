import type { Metadata } from 'next'
import PlatformClient from './PlatformClient'

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'One Platform. Every Guest Interaction. Built on the Hospitality Intelligence Operating System — one shared intelligence layer beneath every department.',
}

export default function PlatformPage() {
  return <PlatformClient />
}
