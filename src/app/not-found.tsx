import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you’re looking for doesn’t exist—or it may have moved.',
}

/* Copy source: HotelCompanion__Site_Copy.md {#not-found}. Verbatim. */

const CARDS = [
  {
    title: 'Looking for Hotel Companion?',
    body: 'Discover how we’re helping hotels understand every guest through conversational intelligence.',
    cta: { label: 'Explore Hotel Companion', href: '/' },
  },
  {
    title: 'Interested in Companion OS?',
    body: 'Learn about the intelligence platform powering Hotel Companion and the next generation of organizational intelligence.',
    cta: { label: 'Explore Companion OS', href: '/companion-os' },
  },
  {
    title: 'Want to See It in Action?',
    body: 'Experience Hotel Companion through a personalized executive demonstration.',
    cta: { label: 'Book a Demo', href: '/demo' },
  },
]

const POPULAR = [
  { label: 'Home', dek: 'Understand Every Guest. Capture Every Opportunity.', href: '/' },
  { label: 'Platform', dek: 'Discover the capabilities behind Hotel Companion.', href: '/platform' },
  {
    label: 'Solutions',
    dek: 'See how Hotel Companion supports every department and every property type.',
    href: '/solutions',
  },
  {
    label: 'Enterprise',
    dek: 'Learn how Companion OS scales across multi-property hospitality organizations.',
    href: '/enterprise',
  },
  {
    label: 'Resources',
    dek: 'Explore our essays on Guest Intelligence, AI, and the future of hospitality.',
    href: '/resources',
  },
  {
    label: 'Company',
    dek: 'Learn about our mission, philosophy, and the team behind Hotel Companion.',
    href: '/company',
  },
]

export default function NotFound() {
  return (
    <main>
      <SiteNav />

      <section className="pt-16 md:pt-24 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="eyebrow mb-6" style={{ color: 'var(--accent)' }}>
            404
          </div>
          <h1 className="heading-page font-serif font-normal text-balance" style={{ color: 'var(--text)' }}>
            Looks Like We Lost Our Way.
          </h1>
          <p className="font-sans mt-8 mx-auto max-w-xl" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            The page you’re looking for doesn’t exist—or it may have moved.
          </p>
          <p className="font-sans mt-3 mx-auto max-w-xl" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            But since you’re here, let’s help you get where you wanted to go.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-5 text-left">
            {CARDS.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <h2 className="font-serif mb-3" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                  {c.title}
                </h2>
                <p
                  className="font-sans flex-1 leading-relaxed"
                  style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
                >
                  {c.body}
                </p>
                <Link
                  href={c.cta.href}
                  className="font-sans mt-5 text-sm transition-colors hover:text-[#D4784A]"
                  style={{ color: 'var(--accent)', fontWeight: 500 }}
                >
                  {c.cta.label} →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-left max-w-2xl mx-auto">
            <div className="eyebrow mb-5">POPULAR PAGES</div>
            <ul>
              {POPULAR.map((p) => (
                <li key={p.href} style={{ borderBottom: '1px solid var(--border)' }}>
                  <Link
                    href={p.href}
                    className="block py-4 transition-colors hover:text-[#D4784A]"
                    style={{ color: 'var(--text)' }}
                  >
                    <span className="font-sans block" style={{ fontSize: '16px' }}>
                      {p.label}
                    </span>
                    <span className="font-sans block mt-1" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                      {p.dek}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p
            className="font-serif italic mt-16"
            style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', color: 'var(--text)' }}
          >
            Every Conversation Leads Somewhere. Even this one.
          </p>
          <p className="font-sans mt-4" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Let’s get you back on the right path.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="font-sans flex items-center justify-center text-white transition-colors hover:bg-[#D4784A]"
              style={{
                background: 'var(--accent)',
                borderRadius: '8px',
                height: '52px',
                padding: '0 32px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
