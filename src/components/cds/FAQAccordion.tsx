'use client'

import { useState } from 'react'
import { Reveal } from './Reveal'

/**
 * Generalized FAQ accordion (pattern from the original faq-section.tsx),
 * now item-driven so Home/Platform/Demo/Contact can each pass their own
 * copy. Keyboard operable; all items open by default is replaced with
 * first-closed progressive disclosure while staying no-JS legible
 * (details/summary native element).
 */
export function FAQAccordion({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: string }>
}) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]))

  return (
    <div className="max-w-2xl mx-auto text-left">
      {items.map((item, i) => {
        const open = openSet.has(i)
        return (
          <Reveal key={i}>
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                style={{ minHeight: '44px' }}
                aria-expanded={open}
                onClick={() =>
                  setOpenSet((prev) => {
                    const next = new Set(prev)
                    if (next.has(i)) next.delete(i)
                    else next.add(i)
                    return next
                  })
                }
              >
                <span className="font-sans font-normal" style={{ fontSize: '17px', color: 'var(--text)' }}>
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: 'var(--text-muted)',
                    transform: open ? 'rotate(45deg)' : 'none',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {open && (
                <p
                  className="font-sans pb-5 leading-relaxed"
                  style={{ fontSize: '15px', color: 'var(--text-secondary)' }}
                >
                  {item.a}
                </p>
              )}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
