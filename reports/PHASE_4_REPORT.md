# Phase 4 report — Demo Upgrade + AskBar wiring

## Plan (written before executing)

- New `demoV3.ts` copy module (deck {#demo} verbatim: D2 greeting, Scenario A
  anatomy strings, Scenario B day-planner, ask-close headline).
- `DemoCards.tsx`: beach card → full D1 anatomy (context `MonoChip` → serif
  title → gold insider caption → mono metadata → `<strong>`-speakable reply →
  solid+ghost actions → `ReceiptCard` on action); new scripted `dayplan` card
  (D3: three rows w/ real-asset thumbs, route line, speakable closer, book
  button → receipt).
- `useCompanion.ts`: `sendScripted()` (no fetch) + `Turn.card` widened with
  `'dayplan'` (never model-emitted — the wire protocol is untouched).
- `LiveDemo.tsx`: D2 recognition greeting in the at-rest slot; day-planner chip
  appended to the suggestion row; scripted intercept in `submit`.
- `HomeClient.tsx`: old section 15 → the AskBar close (deck {#13} headline with
  champagne-italic `Pregúntale algo.` / `Ask it something.`, AskBar, existing
  `Agenda una Demo` button beside); `finalCta` deleted from `home.ts` (both
  locales).

## What changed

- `[P4] demo anatomy D1–D3 + recognition greeting; AskBar replaces old 15`
  (single commit).

## Gate results (dev build; re-verified on the preview below)

All checks ran **keyboard-only** (focus + Enter, no mouse) in **both locales**;
screen recordings attached.

- **[Scenario A start→receipt, both locales]** → **PASS.** Nav "See It Live" →
  Enter → beach chip → Enter → anatomy card (context chip ✓ · `20 MIN · TAXI
  $10` ✓ · speakable `<strong>` ✓) → `Reservar taxi`/`Book a taxi` → Enter →
  `✓ TAXI RESERVADO · 9:00 · A LA CUENTA DE LA HABITACIÓN` ✓.
  `img/p4-scenarioA-{en,es}.png`, `img/p4-demo-run-{en,es}.webm`.
- **[Scenario B start→receipt, both locales]** → **PASS.** `Planea nuestro
  último día` chip → itinerary rows (Cenote Dos Ojos · pueblo lunch · chocolate
  ritual, with `Chofer reservado`/`Apartado para ti` chips) → route line
  `78 KM · UN CHOFER TODO EL DÍA · $95` → speakable closer → `Reservar el día`
  → `✓ DÍA RESERVADO · 3 PARADAS · UN CHOFER · $95` ✓. Fully scripted — no
  model call. `img/p4-scenarioB-{en,es}.png`.
- **[Keyboard-only; focus order; aria-live]** → **PASS.** Entire flows above
  completed via focus+Enter; transcript region is the existing
  `aria-live="polite"` log; chips/buttons are native buttons.
- **[Speakable phrases render bold]** → **PASS.** `<strong>` verified around
  `"resérvalo"`/`"book it"` (A), `"reserva el día"`/`"book the day"` (B) —
  ask-bar answers already carry theirs from Phase 2.
- **[Old 15 strings gone]** → **PASS.** `Cada Conversación con un Huésped Es
  una Oportunidad` (and EN) = 0 matches in both hydrated locales; the ask-bar
  close renders with the deck headline (`img/p4-askbar-close-{en,es}.png`).
- **[Demo regression]** → **PASS.** From SITE_MAP: suggestion chips → answer +
  card (model, or written-in-voice fallback on timeout — by design) ✓ · mock
  action confirm (upgrade → `Suite Vista al Mar apartada` confirmation card) ✓
  · reset ↺ ✓ · text input + send ✓ · orb/voice controls unchanged (Web Speech
  paths untouched; not exercisable headless — code untouched) ✓ · greeting slot
  now carries D2 above Marina's existing greeting ✓.
- Build: `tsc` clean · `next build` green · 33/33 tests (incl. marazul parser).
- D2 note: the recognition greeting `Buenas tardes, Maya · Suite 214` renders
  in the demo's existing at-rest greeting slot, above the standing greeting.

## Open questions raised

- none.

## Status: GREEN — continuous run proceeds to Phase 5 (final QA)
