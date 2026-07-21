import type { Metadata } from 'next'
import DemoClient from './DemoClient'

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Book a Personalized Demonstration. A working session tailored to your hotel, your guests, and your operational goals — not a product tour.',
}

export default function DemoPage() {
  return <DemoClient />
}
