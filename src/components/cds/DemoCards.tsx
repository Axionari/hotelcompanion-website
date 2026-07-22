'use client'

import { useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { deviceScreens } from '@/lib/i18n/marketing/deviceScreens'
import { demoV3Copy } from '@/lib/i18n/marketing/demoV3'
import { MonoChip } from './MonoChip'
import { ReceiptCard } from './ReceiptCard'
import { Speakable } from './AskBar'
import type { CardId } from '@/lib/demo/marazulDemo'

/**
 * Picture cards for the live demo (Live Demo · D4).
 *
 * Every card is built from `deviceScreens` — the same localized device content
 * the static tablet already renders — so the live demo and the marketing
 * mockups can never drift apart, and no new copy is introduced.
 *
 * v3 Phase 4: the beach card carries the full answer anatomy (D1 — context
 * MonoChip → serif title → gold insider caption → mono metadata → concierge
 * reply with the speakable phrase → solid + ghost actions → ReceiptCard on
 * action), and the scripted day-planner card (D3) renders Scenario B.
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

const solidBtn: React.CSSProperties = {
  background: 'var(--accent)',
  color: '#1a1207',
  borderRadius: 999,
  padding: '0 16px',
  minHeight: 40,
  fontSize: 12.5,
  fontWeight: 600,
}

const ghostBtn: React.CSSProperties = {
  border: '1px solid var(--border)',
  color: 'var(--text-dim)',
  borderRadius: 999,
  padding: '0 16px',
  minHeight: 40,
  fontSize: 12.5,
}

/** D1 — Scenario A answer anatomy on the beach card. */
function BeachAnatomyCard() {
  const s = useCopy(deviceScreens).screens.beach
  const v3 = useCopy(demoV3Copy).scenarioA
  const [booked, setBooked] = useState(false)

  return (
    <Shell>
      <Photo src={s.image} alt={s.title} height={104} />
      <div className="px-0.5 flex flex-col gap-1.5">
        <div>
          <MonoChip>{v3.contextChip}</MonoChip>
        </div>
        <div className="font-serif" style={{ fontSize: 17, fontWeight: 530, color: 'var(--text)' }}>
          {s.title}
        </div>
        {/* gold insider caption */}
        <div className="font-sans" style={{ fontSize: 11.5, color: 'var(--champagne)' }}>{s.meta}</div>
        <div
          style={{
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--eyebrow-warm)',
          }}
        >
          {v3.metadata}
        </div>
        <p className="font-sans" style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--text-dim)', marginTop: 2 }}>
          <Speakable text={v3.reply} />
        </p>
        {booked ? (
          <ReceiptCard size="sm" appear lines={v3.receipt} className="mt-1 self-start" />
        ) : (
          <div className="flex gap-2 mt-1">
            <button type="button" className="font-sans" style={solidBtn} onClick={() => setBooked(true)}>
              {s.actions[1]}
            </button>
            <button type="button" className="font-sans" style={ghostBtn}>
              {s.actions[0]}
            </button>
          </div>
        )}
      </div>
    </Shell>
  )
}

/** D3 — Scenario B: the scripted day-planner. */
function DayPlanCard() {
  const v3 = useCopy(demoV3Copy).scenarioB
  const [booked, setBooked] = useState(false)

  return (
    <Shell>
      <div className="flex flex-col">
        {v3.rows.map((row, i) => (
          <div
            key={row.time}
            className="flex items-center gap-2.5 py-2"
            style={{ borderBottom: i < v3.rows.length - 1 ? '1px solid var(--hairline)' : 'none' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), ui-monospace, monospace',
                fontSize: 10.5,
                color: 'var(--eyebrow-warm)',
                width: 36,
                flexShrink: 0,
              }}
            >
              {row.time}
            </span>
            <div
              role="img"
              aria-label={row.title}
              className="flex-shrink-0"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundImage: `url(${row.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(251,248,242,0.1)',
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="font-sans truncate" style={{ fontSize: 12.5, color: 'var(--text)' }}>{row.title}</div>
              <div className="font-sans truncate" style={{ fontSize: 11, color: 'var(--champagne)' }}>{row.note}</div>
            </div>
            {row.chip && <MonoChip lowercase>{row.chip}</MonoChip>}
          </div>
        ))}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: 'var(--eyebrow-warm)',
        }}
      >
        {v3.route}
      </div>
      <p className="font-sans" style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--text-dim)' }}>
        <Speakable text={v3.closer} />
      </p>
      {booked ? (
        <ReceiptCard size="sm" appear lines={v3.receipt} className="self-start" />
      ) : (
        <button type="button" className="font-sans self-start" style={solidBtn} onClick={() => setBooked(true)}>
          {v3.button}
        </button>
      )}
    </Shell>
  )
}

export function DemoCard({
  id,
  confirmed,
}: {
  id: CardId | 'dayplan'
  /** Only for the confirmation card, which has no counterpart in deviceScreens. */
  confirmed?: { title: string; meta: string; note: string }
}) {
  const s = useCopy(deviceScreens).screens

  switch (id) {
    case 'beach':
      return <BeachAnatomyCard />

    case 'dayplan':
      return <DayPlanCard />

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
