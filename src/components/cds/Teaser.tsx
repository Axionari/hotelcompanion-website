'use client'

import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useCopy } from '@/lib/i18n/useCopy'
import { globalCopy } from '@/lib/i18n/marketing/global'

/**
 * A compressed stand-in for a section that lives in full somewhere else.
 *
 * The same themes were being argued at full length on three and four pages at
 * once — the Companion OS capability grid appeared on four. Repeating a section
 * does not reinforce it, it just makes the site feel like it is circling. So
 * each theme keeps one canonical home and everywhere else gets this: a couple
 * of lines drawn from the same canonical copy, plus a link.
 *
 * The lines passed in must come from the section's own approved copy — this
 * component shortens, it never rewrites.
 */
export function Teaser({
  lines,
  href,
  label,
  children,
  split = false,
}: {
  /** 2–3 lines lifted verbatim from the canonical section's copy. */
  lines: ReadonlyArray<string>
  href: string
  /** The destination's name, e.g. "Companion OS". */
  label: string
  /** Optional slim visual (a capability strip, a stat) shown beside the copy. */
  children?: React.ReactNode
  /**
   * Two columns: copy + link left, visual right. Without this a teaser that
   * replaced a two-column section leaves the right half of the band blank,
   * which reads as a broken layout rather than a deliberate compression.
   */
  split?: boolean
}) {
  const { nav } = useCopy(globalCopy)

  const copy = (
    <>
      <div className="flex flex-col gap-2" style={{ maxWidth: '54ch' }}>
        {lines.map((l) => (
          <p key={l} className="font-sans" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-dim)' }}>
            {l}
          </p>
        ))}
      </div>
      <Link
        href={href}
        className="font-sans inline-flex items-center gap-2 mt-6 transition-colors hover:text-[#d4824f]"
        style={{ color: 'var(--accent)', fontSize: 15, fontWeight: 500, minHeight: 44 }}
      >
        {nav.see} {label}
        <span aria-hidden="true">→</span>
      </Link>
    </>
  )

  if (split && children) {
    return (
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5">{copy}</div>
        <div className="lg:col-span-7">{children}</div>
      </div>
    )
  }

  return (
    <div>
      {lines.length > 0 && (
        <div className="flex flex-col gap-2" style={{ maxWidth: '54ch' }}>
          {lines.map((l) => (
            <p key={l} className="font-sans" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-dim)' }}>
              {l}
            </p>
          ))}
        </div>
      )}
      {children && <div className={lines.length ? 'mt-8' : ''}>{children}</div>}
      <Link
        href={href}
        className="font-sans inline-flex items-center gap-2 mt-6 transition-colors hover:text-[#d4824f]"
        style={{ color: 'var(--accent)', fontSize: 15, fontWeight: 500, minHeight: 44 }}
      >
        {nav.see} {label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

/**
 * The eight Companion OS capabilities as a single hairline strip.
 *
 * The full CapabilitySurface grid was rendering on four pages at once. This is
 * the compressed form for the three non-canonical ones: the same eight names,
 * one line, no tiles — enough to establish the surface area without restating
 * the whole argument.
 */
export function CapabilityStrip({ names }: { names: ReadonlyArray<string> }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2.5" role="list">
      {names.map((n, i) => (
        <li key={n} className="flex items-center gap-5">
          {i > 0 && (
            <span aria-hidden="true" style={{ width: 1, height: 11, background: 'var(--accent-hairline)' }} />
          )}
          <span className="font-sans" style={{ fontSize: 14, color: 'var(--text-dim)' }}>
            {n}
          </span>
        </li>
      ))}
    </ul>
  )
}
