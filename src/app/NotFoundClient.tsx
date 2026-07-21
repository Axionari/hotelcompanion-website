'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { useCopy } from '@/lib/i18n/useCopy'
import { notFoundCopy } from '@/lib/i18n/marketing/notFound'

export default function NotFoundClient() {
  const c = useCopy(notFoundCopy)

  return (
    <main>
      <SiteNav />

      <section className="pt-16 md:pt-24 pb-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="eyebrow mb-6" style={{ color: 'var(--accent)' }}>
            {c.code}
          </div>
          <h1 className="heading-page font-serif font-normal text-balance" style={{ color: 'var(--text)' }}>
            {c.title}
          </h1>
          <p className="font-sans mt-8 mx-auto max-w-xl" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.body1}
          </p>
          <p className="font-sans mt-3 mx-auto max-w-xl" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.body2}
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-5 text-left">
            {c.cards.map((card) => (
              <div
                key={card.href}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <h2 className="font-serif mb-3" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                  {card.title}
                </h2>
                <p
                  className="font-sans flex-1 leading-relaxed"
                  style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
                >
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  className="font-sans mt-5 text-sm transition-colors hover:text-[#D4784A]"
                  style={{ color: 'var(--accent)', fontWeight: 500 }}
                >
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-left max-w-2xl mx-auto">
            <div className="eyebrow mb-5">{c.popularTitle}</div>
            <ul>
              {c.popular.map((p) => (
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
            {c.closing}
          </p>
          <p className="font-sans mt-4" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {c.closingBody}
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
              {c.cta}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
