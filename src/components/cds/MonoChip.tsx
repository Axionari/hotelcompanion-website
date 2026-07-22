'use client'

/**
 * v3 MonoChip — mono metadata pill (G4): `12 MIN · TAXI $8`,
 * `TORTUGAS ANTES DE LAS 11 AM`. CAPS with ~0.2em tracking at ≤12px by
 * default; `lowercase` variant for guest-memory-style preference chips.
 * Variants: on-dark (surface + hairline) · on-photo (adds blur backdrop).
 */
export function MonoChip({
  children,
  variant = 'on-dark',
  lowercase = false,
  className = '',
}: {
  children: React.ReactNode
  variant?: 'on-dark' | 'on-photo'
  lowercase?: boolean
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        fontSize: lowercase ? 12 : 10.5,
        letterSpacing: lowercase ? '0.04em' : '0.2em',
        textTransform: lowercase ? 'none' : 'uppercase',
        color: lowercase ? 'var(--text-dim)' : 'var(--eyebrow-warm)',
        background:
          variant === 'on-photo'
            ? 'color-mix(in srgb, var(--surface-1) 72%, transparent)'
            : 'var(--surface-1)',
        backdropFilter: variant === 'on-photo' ? 'blur(8px)' : undefined,
        WebkitBackdropFilter: variant === 'on-photo' ? 'blur(8px)' : undefined,
        border: '1px solid var(--hairline)',
        borderRadius: 999,
        padding: '5px 12px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
