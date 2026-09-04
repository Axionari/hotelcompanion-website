import DemoClient from './DemoClient'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import { createPageMetadata } from '@/lib/siteMetadata'

export const metadata = createPageMetadata({
  title: 'Book a Demo',
  description:
    'Book a Personalized Demonstration. A working session tailored to your hotel, your guests, and your operational goals — not a product tour.',
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
