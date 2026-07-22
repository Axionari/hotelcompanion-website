# Phase 2 report — Component Kit

## Plan (written before executing)

- New components under `src/components/cds/`: `ReceiptCard` (typed segments,
  sm/md, appear), `MonoChip` (on-dark/on-photo/lowercase), `GuestMemoryCard`,
  `RequestExecutionCard` (A3 footer), `AskBar` (scripted, typed chips,
  aria-live, keyboard, reduced-motion). `StatBlock` gains the A2 `art` variants
  in place (`blocks.tsx`), pixel-equivalent by default.
- New i18n modules: `intelExec.ts` (cards B/C), `askBar.ts` (deck {#13}).
- `tokens.css`: `--text-lo`; `globals.css`: A2 classes + ask-bar pulse (with
  reduced-motion guard).
- `/v3-kit` hidden route (noindex) with every component/state, both locales.
- Homepage: ONLY the Socios Fundadores mono-list restyle (G4).
- ILLUSTRATIVE comments at +$402 tallies, 91% ring, A3's 14-conversations, and
  the ask-bar's +$402 (ADDENDUM_1 standing rule).

## What changed

- `[P2] component kit: ReceiptCard, MonoChip, StatBlock art (A2), GuestMemory/
  RequestExecution (A3), AskBar, /v3-kit; Socios mono restyle` (single commit).

## Gate results

- **[/v3-kit shows every component in every state, both locales]** → **PASS.**
  `img/p2-kit-1280-en.png` + `img/p2-kit-1280-es.png` (full-page). States:
  ReceiptCard md static (all 5 segment types) + sm appear; MonoChip
  on-dark/lowercase/on-photo(blur over Akumal photo); StatBlock default +
  art=outline + art=glow; GuestMemoryCard; RequestExecutionCard (A3 footer);
  AskBar empty → chip-typed → answered+receipt → fallback.
- **[Zero colors outside 03_TOKENS.md in new CSS]** → **PASS.** Full grep of the
  new files finds: `#d4824f` (site `--accent-bright`, existing hover idiom),
  `rgba(232,166,106,.25)` (A2's specified glow — `--accent-1` at 25%),
  `#a99c8c` (the kit's `--text-lo`, added as a token). Everything else is
  `var(--…)`.
- **[AA contrast, measured]** → **PASS** — computed from the served tokens:
  `--text-lo` #a99c8c on `--bg` #100e0c = **7.17:1** · `--eyebrow-warm` #d08a54
  on `--surface-1` #141210 = **6.63:1** · `--money` #d9a441 on `--surface-1` =
  **8.31:1**. All ≥ 4.5:1; no lightness bumps needed.
- **[AskBar keyboard-only + SR announcement; axe zero critical]** → **PASS.**
  Playwright run: chip focusable ✓ → Enter types the question (24ms/char) →
  answer + ✓-receipt render inside the single `aria-live="polite"` region ✓ →
  free text shows the scripted fallback ✓. axe on `/v3-kit`: **0 critical**
  (fixed `aria-allowed-attr` by dropping the chips' list roles). One remaining
  *serious* `color-contrast` node is the pre-existing site-wide
  `LanguageToggle` (inactive-language label), present on production — not
  introduced by the kit; left for the Phase 5 sweep to decide.
- **[Reduced motion: instant typing, no pulse]** → **PASS.** With
  `reducedMotion: 'reduce'`: input holds the full question within 60ms, answer
  renders immediately, dot `animation-name: none`. `img/p2-kit-reduced-motion.png`.
- **[Homepage diff vs Phase 1 = only Socios restyle]** → **PASS.** The diff
  touches the founding-partners list (IconChipGrid → mono list, copy unchanged;
  `img/p2-founding-mono-1280.png`) plus one required ILLUSTRATIVE code comment
  (ADDENDUM_1 standing rule; no rendered change).
- Build/typecheck/tests: `tsc` clean, `next build` green (`/v3-kit` static),
  33/33 tests pass.

## Screenshots

- `img/p2-kit-1280-en.png`, `img/p2-kit-1280-es.png`, `img/p2-kit-reduced-motion.png`, `img/p2-founding-mono-1280.png`.

## Open questions raised

- none (LanguageToggle contrast noted above as pre-existing, deferred to Phase 5).

## Status: GREEN — continuous run proceeds to Phase 3
