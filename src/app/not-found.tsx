import type { Metadata } from 'next'
import NotFoundClient from './NotFoundClient'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you’re looking for doesn’t exist—or it may have moved.',
}

export default function NotFound() {
  return <NotFoundClient />
}
