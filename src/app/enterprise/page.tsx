import type { Metadata } from 'next'
import EnterpriseClient from './EnterpriseClient'

export const metadata: Metadata = {
  title: 'Enterprise',
  description:
    'Built for Modern Hospitality Enterprises. Enterprise-grade security, centralized governance, operational intelligence, and scalable deployment — from independent hotels to global brands.',
}

export default function EnterprisePage() {
  return <EnterpriseClient />
}
