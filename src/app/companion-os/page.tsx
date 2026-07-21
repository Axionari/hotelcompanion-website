import type { Metadata } from 'next'
import CompanionOsClient from './CompanionOsClient'

export const metadata: Metadata = {
  title: 'Companion OS',
  description:
    'One Intelligence Platform. Unlimited Companions. Companion OS is the shared intelligence platform powering Hotel Companion, Restaurant Companion, and every future Companion.',
}

export default function CompanionOsPage() {
  return <CompanionOsClient />
}
