'use client'

import LanguageToggle from '@/components/LanguageToggle'
import { ReceiptCard } from '@/components/cds/ReceiptCard'
import { MonoChip } from '@/components/cds/MonoChip'
import { GuestMemoryCard } from '@/components/cds/GuestMemoryCard'
import { RequestExecutionCard } from '@/components/cds/RequestExecutionCard'
import { AskBar } from '@/components/cds/AskBar'
import { StatBlock, CommissionCompare } from '@/components/cds/blocks'
import { useCopy } from '@/lib/i18n/useCopy'
import { homeCopy } from '@/lib/i18n/marketing/home'

/**
 * v3 Phase 2 — component kit in every state, both locales (toggle top-right).
 * Review-only page: nothing here ships to the homepage until Phase 3/4 wiring.
 */

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="eyebrow eyebrow-accent mb-6">{label}</div>
      {children}
    </section>
  )
}

export default function V3KitClient() {
  const home = useCopy(homeCopy)

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="container-rc py-16">
        <div className="flex items-center justify-between mb-14">
          <h1 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 530, color: 'var(--text)' }}>
            v3 Component Kit
          </h1>
          <LanguageToggle />
        </div>

        <Spec label="RECEIPTCARD · MD · STATIC · ALL SEGMENT TYPES">
          <ReceiptCard
            size="md"
            lines={[
              [
                { t: 'check', s: '✓' },
                { t: 'text', s: 'CABAÑA RESERVADA ·' },
                { t: 'money', s: '+$120' },
                { t: 'text', s: 'AL FOLIO' },
              ],
              [
                { t: 'route', s: '→' },
                { t: 'text', s: 'INGENIERÍA ·' },
                { t: 'id', s: 'HAB 214' },
                { t: 'text', s: '· 02:14' },
              ],
            ]}
          />
        </Spec>

        <Spec label="RECEIPTCARD · SM · APPEAR (FADE+RISE ONCE; STATIC UNDER REDUCED MOTION)">
          <ReceiptCard
            size="sm"
            appear
            lines={[[{ t: 'check', s: '✓' }, { t: 'text', s: '★5 PÚBLICA · RESERVA DIRECTA CAPTURADA' }]]}
          />
        </Spec>

        <Spec label="MONOCHIP · ON-DARK / LOWERCASE / ON-PHOTO (BLUR BACKDROP)">
          <div className="flex flex-wrap items-center gap-3">
            <MonoChip>12 MIN · TAXI $8</MonoChip>
            <MonoChip>TORTUGAS ANTES DE LAS 11 AM</MonoChip>
            <MonoChip lowercase>vista al mar</MonoChip>
          </div>
          <div
            className="mt-5 flex items-end p-5 rounded-2xl"
            style={{
              backgroundImage: 'url(/assets/ui/beach-akumal.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 140,
              maxWidth: 420,
            }}
          >
            <MonoChip variant="on-photo">78 KM · UN CHOFER · $95</MonoChip>
          </div>
        </Spec>

        <Spec label="STATBLOCK · DEFAULT (PIXEL-EQUIVALENT REFACTOR)">
          <StatBlock figure={home.stake.figure} caption={home.stake.caption} source={home.stake.source} />
        </Spec>

        <Spec label="STATBLOCK · ART=OUTLINE (A2 — STROKE TYPE, SOLID FALLBACK, SR-ONLY VALUE)">
          <StatBlock art="outline" figure={home.otaStake.figure} caption={home.otaStake.caption} source={home.otaStake.source}>
            <div className="mt-4" style={{ maxWidth: 460 }}>
              <CommissionCompare rows={home.otaStake.compare} />
            </div>
          </StatBlock>
        </Spec>

        <Spec label="STATBLOCK · ART=GLOW (A2 — CHAMPAGNE ITALIC, AMBER GLOW)">
          <StatBlock art="glow" figure={home.stake.figure} caption={home.stake.caption} source={home.stake.source} />
        </Spec>

        <Spec label="GUESTMEMORYCARD (DECK 07 · CARD B)">
          <div style={{ maxWidth: 460 }}>
            <GuestMemoryCard />
          </div>
        </Spec>

        <Spec label="REQUESTEXECUTIONCARD (DECK 07 · CARD C · A3 FOOTER)">
          <div style={{ maxWidth: 560 }}>
            <RequestExecutionCard />
          </div>
        </Spec>

        <Spec label="ASKBAR · EMPTY → CHIP TYPES QUESTION → SCRIPTED ANSWER + RECEIPT · FREE TEXT → FALLBACK · KEYBOARD + ARIA-LIVE">
          <AskBar />
        </Spec>
      </div>
    </main>
  )
}
