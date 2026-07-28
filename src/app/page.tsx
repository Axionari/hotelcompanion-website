import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Hotel Companion — A concierge that never forgets, built on Companion OS',
  /* v3 G5: "Powered by Companion OS." dropped from the meta description so the
     homepage's Companion OS mentions stay at two (band + footer line). */
  description:
    'Understand Every Guest. Capture Every Opportunity. Hotel Companion transforms natural conversations into personalized guest experiences, operational intelligence, and coordinated execution.',
}

export default function HomePage() {
  return <HomeClient />
}
