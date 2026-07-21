'use client'

import { useCopy } from '@/lib/i18n/useCopy'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import type { CardId } from '@/lib/demo/marazulDemo'

/**
 * Picture cards for the live demo (Live Demo · D4).
 *
 * Every card is built from `deviceScreens` — the same localized device content
 * the static tablet already renders — so the live demo and the marketing
 * mockups can never drift apart, and no new copy is introduced.
 */

function Photo({ src, alt, height }: { src: string; alt: string; height: number }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ height, borderRadius: 10, border: '1px solid rgba(251,248,242,0.1)' }}
    >
      <div
        role="img"
        aria-label={alt}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,13,12,0.5) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="demo-card flex flex-col gap-2 p-2.5"
      style={{
        border: '1px solid var(--accent-hairline)',
        background: 'var(--surface-2)',
        borderRadius: 14,
      }}
    >
      {children}
    </div>
  )
}

function Caption({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="px-0.5">
      <div className="font-serif" style={{ fontSize: 14, fontWeight: 530, color: 'var(--text)' }}>
        {title}
      </div>
      <div className="font-sans" style={{ fontSize: 11.5, color: 'var(--text-faint)', marginTop: 1 }}>
        {meta}
      </div>
    </div>
  )
}

/** name + price + thumbnail row, used by the dish and spa grids */
function ItemRow({ name, price, image }: { name: string; price: string; image: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        role="img"
        aria-label={name}
        className="flex-shrink-0"
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(251,248,242,0.1)',
        }}
      />
      <span className="font-sans flex-1 min-w-0 truncate" style={{ fontSize: 12.5, color: 'var(--text)' }}>
        {name}
      </span>
      <span className="font-sans flex-shrink-0" style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>
        {price}
      </span>
    </div>
  )
}

export function DemoCard({
  id,
  confirmed,
}: {
  id: CardId
  /** Only for the confirmation card, which has no counterpart in deviceScreens. */
  confirmed?: { title: string; meta: string; note: string }
}) {
  const s = useCopy(deviceScreens).screens

  switch (id) {
    case 'beach':
      return (
        <Shell>
          <Photo src={s.beach.image} alt={s.beach.title} height={104} />
          <Caption title={s.beach.title} meta={s.beach.meta} />
        </Shell>
      )

    case 'map':
      return (
        <Shell>
          <Photo src={s.concierge.image} alt={s.concierge.title} height={104} />
          <Caption title={s.concierge.title} meta={s.concierge.meta} />
        </Shell>
      )

    case 'suite':
    case 'upgrade':
      return (
        <Shell>
          <Photo src={s.upgrade.images[0]} alt={s.upgrade.title} height={104} />
          <div className="grid grid-cols-2 gap-2">
            {s.upgrade.images.slice(1).map((src, i) => (
              <Photo key={src} src={src} alt={`${s.upgrade.title} ${i + 2}`} height={54} />
            ))}
          </div>
          <Caption title={s.upgrade.title} meta={s.upgrade.meta} />
        </Shell>
      )

    case 'dish-grid':
      return (
        <Shell>
          <div className="flex flex-col gap-2">
            {s.roomservice.items.map((it) => (
              <ItemRow key={it.name} {...it} />
            ))}
          </div>
          <Caption title={s.roomservice.title} meta={s.roomservice.meta} />
        </Shell>
      )

    case 'spa':
      return (
        <Shell>
          <div className="flex flex-col gap-2">
            {s.spa.items.map((it) => (
              <ItemRow key={it.name} {...it} />
            ))}
          </div>
          <Caption title={s.spa.title} meta={s.spa.meta} />
        </Shell>
      )

    case 'confirmation':
      return (
        <Shell>
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="grid place-items-center flex-shrink-0"
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                background: 'var(--accent)',
                color: '#1a1207',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ✓
            </span>
            <div className="min-w-0">
              <div className="font-serif" style={{ fontSize: 14, fontWeight: 530, color: 'var(--text)' }}>
                {confirmed?.title}
              </div>
              <div className="font-sans" style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 2 }}>
                {confirmed?.meta}
              </div>
              <div className="eyebrow" style={{ fontSize: 8, marginTop: 7 }}>
                {confirmed?.note}
              </div>
            </div>
          </div>
        </Shell>
      )

    default:
      return null
  }
}
