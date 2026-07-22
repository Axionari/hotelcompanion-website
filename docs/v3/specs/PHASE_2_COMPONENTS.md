# PHASE 2 — Component Kit

## Goal
Six reusable components, built to tokens, with all states, demonstrated on a hidden route `/v3-kit` (both locales) for review. No homepage wiring yet except where noted.

## Components

1. **`ReceiptCard`** — per the receipt idiom in `03_TOKENS.md`. Props: lines (array of segments typed `check|route|money|id|text`), size (`sm|md`). States: static; `appear` (fade+rise once). Used later in: sun arc stops, demo, ask-bar.
2. **`MonoChip`** — mono CAPS pill for context/metadata (`TORTUGAS ANTES DE LAS 11 AM`, `12 MIN · TAXI $8`). Variants: on-dark, on-photo (adds blur backdrop).
3. **`StatBlock`** — extracted from the existing stakes markup (serif figure + mono source + optional bars). Must render the two existing stats pixel-equivalent; this is a refactor-in-place, not a redesign.
4. **`GuestMemoryCard`** — copy deck 07/Card B. Title mono, body sans, chips as `MonoChip` (lowercase variant allowed per existing site chip style), footer line `--text-lo`.
5. **`RequestExecutionCard`** — copy deck 07/Card C. Four rows: quote (sans, `--text-hi`) · time (mono, `--eyebrow`) · route (mono, arrow in `--eyebrow`). Hairline separators. Footer line.
6. **`AskBar`** — copy deck 13. Rounded bar (surface, hairline, blur), left pulsing amber dot (or 24px orb), input (non-functional free text: on submit of unrecognized text, show ES `Esa es buena — agéndala para tu demo.` / EN `That's a good one — bring it to your demo.`), right circular submit. Three `MonoChip` suggestion chips above. Clicking a chip types the question character-by-character (~24ms/char), then renders the scripted answer (sans reply with `<strong>` speakable phrase) + `ReceiptCard`. Keyboard: chips tabbable, Enter activates, answer region `aria-live="polite"`. Scripted only — no network calls.

Also in this phase: restyle **Socios Fundadores** benefits list to mono (`G4`), copy unchanged.

## Gate
- [ ] `/v3-kit` shows every component in every state, both locales.
- [ ] Zero colors outside `03_TOKENS.md` (grep the new CSS for hex values; every hit must be a token value).
- [ ] AA contrast verified for: `--text-lo` on `--bg`, `--eyebrow` on `--surface`, `--money` on `--surface` (report the measured ratios; if any fails, bump lightness minimally and record in OPEN_QUESTIONS).
- [ ] AskBar full flow works keyboard-only; screen-reader announcement verified (axe or equivalent, zero critical violations on `/v3-kit`).
- [ ] `prefers-reduced-motion`: chip typing renders instantly, no pulse.
- [ ] Homepage diff vs Phase 1 = only the Socios Fundadores list restyle.
- STOP for approval.
