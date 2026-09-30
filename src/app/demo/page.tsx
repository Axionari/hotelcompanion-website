import DemoClient from './DemoClient'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Request a Demo',
  description:
    'See guest conversations, relevant recommendations and approved offers. Explore a scoped Hotel Companion pilot and agree how to measure results.',
  path: '/demo',
})

/* FAQPage JSON-LD — the site's only FAQ lives here (PRODUCT_ARCHITECTURE
   §10); schema in EN, the language of the server-rendered HTML. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: demoCopy.en.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function DemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DemoClient />
    </>
  )
}
