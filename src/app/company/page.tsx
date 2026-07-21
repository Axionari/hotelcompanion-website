import type { Metadata } from 'next'
import CompanyClient from './CompanyClient'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'We’re Building the Future of Intelligent Hospitality. Hotel Companion is built by Axionari to help hospitality organizations transform conversations into intelligence, execution, and measurable business outcomes.',
}

export default function CompanyPage() {
  return <CompanyClient />
}
