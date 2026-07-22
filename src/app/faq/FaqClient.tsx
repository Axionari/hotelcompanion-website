'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Section } from '@/components/cds/Section'
import { Accordion } from '@/components/cds/blocks'
import { useCopy } from '@/lib/i18n/useCopy'
import { faqPageCopy } from '@/lib/i18n/marketing/faqPage'

export default function FaqClient() {
  const c = useCopy(faqPageCopy)

  return (
    <main>
      <SiteNav />
      <div className="pt-16">
        <Section eyebrow="FAQ" title={c.title} variant="bg">
          <div className="mt-12" style={{ maxWidth: 860 }}>
            <Accordion items={c.items} />
          </div>
          <p className="mt-10">
            <Link
              href="/"
              className="font-sans transition-colors hover:text-[#d4824f]"
              style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 15 }}
            >
              {c.backHome}
            </Link>
          </p>
        </Section>
      </div>
      <SiteFooter />
    </main>
  )
}
