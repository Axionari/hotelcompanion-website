import { notFound } from 'next/navigation'
import KitchenSinkClient from './KitchenSinkClient'

/** Dev-only CDS component gallery (P1-1 DoD). Not linked; 404s in production. */
export default function KitchenSinkPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <KitchenSinkClient />
}
