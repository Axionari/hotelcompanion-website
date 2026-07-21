import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Hotel Companion — The Voice-First Guest Intelligence Platform for Hotels',
  description:
    'Understand Every Guest. Capture Every Opportunity. Hotel Companion transforms natural conversations into personalized guest experiences, operational intelligence, and coordinated execution. Powered by Companion OS.',
}

export default function HomePage() {
  return <HomeClient />
}
