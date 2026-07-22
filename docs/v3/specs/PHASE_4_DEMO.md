# PHASE 4 — Demo Upgrade (the interactive tablet) + AskBar wiring

## Goal
The existing tablet demo adopts the answer anatomy; a second scenario (day-planner) is added; the ask-bar replaces old section 15. All strings from the copy deck.

## D1 — Answer anatomy (Scenario A: Akumal)
Restructure the Akumal answer card to render, in order: `MonoChip` context (`TORTUGAS ANTES DE LAS 11 AM`) → serif title `Akumal` → gold insider caption → mono metadata (`20 MIN · TAXI $10`) → concierge reply with `<strong>` speakable phrase → one solid + one ghost action → on action, `ReceiptCard` (copy deck). Keep the existing photo, layout language, voice-orb behavior, and entry points.

## D2 — Greeting
On demo open: `Buenas tardes, Maya · Suite 214` (locale-aware) in the demo's existing header/greeting slot.

## D3 — Scenario B: the day-planner
New suggestion chip `Planea nuestro último día` in the demo's chip row. Flow: chip → itinerary view: three rows (copy deck: cenote / pueblo lunch / spa ritual, with `Chofer reservado` and `Apartado para ti` chips) + route line `78 KM · UN CHOFER TODO EL DÍA · $95` + closer with speakable phrase + `Reservar el día` button → `ReceiptCard` (`✓ DÍA RESERVADO · 3 PARADAS · UN CHOFER · $95`). Visual: reuse demo card language; rows are compact cards on the tablet screen; no new photography required (small thumbs optional from existing assets).

## D4 — AskBar section
Replace old section 15 with the `AskBar` component (built in Phase 2) under the headline `Deja de leerlo. Pregúntale algo.`; `Agenda una Demo` button beside/below per existing CTA styling. Delete old 15 copy.

## Gate
- [ ] Scenario A plays start→receipt; Scenario B plays start→receipt; both locales (screen recordings attached).
- [ ] Keyboard-only: both scenarios and the ask-bar completable without a mouse; focus order logical; answers in `aria-live` region.
- [ ] Speakable phrases render bold in every reply (grep for `<strong>` around the deck's marked phrases).
- [ ] Old 15 strings gone: `Cada Conversación con un Huésped Es una Oportunidad` → 0 matches.
- [ ] Demo regression: all pre-existing demo interactions still work (list them from SITE_MAP; check each).
- STOP for approval.
