import type { Metadata } from 'next'
import PlatformClient from './PlatformClient'

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'One Platform. Every Guest Interaction. Built on Companion OS — one shared intelligence layer beneath every department.',
}

export default function PlatformPage() {
  return <PlatformClient />
}
