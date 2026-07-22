# V4 BUILD KIT — The Seven-Act Homepage
**Place this folder at `docs/v4/` on a new branch `v4` (branched from `v3`). Panel-authored, July 22, 2026. This kit is the complete build authority for the v4 homepage. The rules of `docs/v3/01_RULES.md` remain binding except where amended in §1.**

---

## 0 · What this is

Eduardo rejected the v3 grammar at the strategic level (approved build, wrong architecture: too much text, too many voices, competing signatures). The panel re-convened from first principles (`V4_FIRST_PRINCIPLES__The_200K_Rebuild.md`, in the project folder) and ran a doctrine-seeded Claude Design cycle. **Round 2 was approved by the panel in-browser.** Its export is in this kit at `reference/Hotel Companion Homepage.dc.html` (+ `support.js`) and is the geometry/materials source of truth.

v4 replaces ONLY the homepage. All other routes keep their v3 pages and the site nav. v3 remains intact on its branch — fallback and parts bin. Nothing merges, nothing deploys to production; preview deploys only, exactly like the v3 cycle.

## 1 · Build laws (v3 rules, amended)

1. **The hero lock is lifted.** v4 is a new homepage; there is no diff-identical constraint. Lighthouse target rises accordingly (G-7).
2. **Verbatim copy.** Every reading string on the page comes from §3 of this kit, character-for-character. No copy may be added, reworded, or "improved." Device-UI strings (marked `UI`) may be abbreviated only to fit screens; wrap ALL device-UI text in `data-device-ui` (v3 convention) — it is excluded from word gates.
3. **Two typefaces on the marketing layer:** `Instrument Serif` (roman + italic) and `IBM Plex Mono` — exactly as the reference. The neutral sans (`ui-sans-serif` stack) may compute ONLY inside `[data-device-ui]` subtrees (G-2).
4. **Source-of-truth hierarchy** for any visual question: (1) `reference/Hotel Companion Homepage.dc.html` rendered at 1280 — port its geometry, spacing, type scale, and materials 1:1; (2) this kit's specs; (3) v3 components as implementation vehicles. Deliberate deviations (responsiveness, real assets, hydration) are enumerated in the report. There is no forensic tier this cycle — the file exists; use it.
5. **The palette is v3's tokens.** Warm blacks #0E0B09/#17120E, champagne #E7CE86, ember/terracotta ramp, hairline. Nights warm — a computed-style scan for cool hues (teal/navy/marine ranges) must return zero outside real photographs (G-5).
6. **Orbs are the shared ember component** (v3 `ArcOrb`/VoiceOrb) at every size — hero dome, Act III sun, Act IV phone orb + watch dot, ask-bar dot, Act VII setting sun. Never a hand-rolled flat ball (G-6).
7. **Illustrative numbers** ($160B is sourced; 14 conversations, $250, 10:04 etc. are narrative) carry the `/* ILLUSTRATIVE — audit before production promotion */` comment and the report's table — v3 convention, unchanged.
8. **Smallest interpretation + OPEN_QUESTIONS** logging, phase loop, and STOP discipline: identical to v3.

## 2 · What v4 reuses from v3 (the parts bin)

- **i18n system** (useCopy/LanguageContext; ES gates run on the hydrated DOM — method documented in the v3 Phase 1 report).
- **The ember orb component** and its material.
- **The AskBar** (scripted answers, no LLM) — powers Act I and Act VII bars; suggestion chips wired to the two v3 scripted responses closest to the chip labels.
- **Real photography:** `beach-akumal.webp` (Act IV tablet), `suite-1.webp` (Act IV monitor screen card), `luxury-lobby.webp` (Act IV TV). The reference's striped `PHOTO:` slots are BUILD INSTRUCTIONS — they never ship (standing law). Act III's three moment cards use the same treatments as the corresponding v3 arc stops (Akumal card, suite upsell card, 2:14 receipt) — port the v3 card content into the reference's card geometry.
- **The gate harness** (`reports/p3_2-gates.mjs` patterns: computed-style assertions, rect audits, word-count with `data-device-ui` exclusion, screenshot capture).
- **Act IV may be implemented by restyling the approved v3 `Constellation` component to the reference's geometry** (same six devices, same materials) — implementer's choice, but the G-4 overlay is judged against the reference file, not against v3.

## 3 · Copy deck — VERBATIM (EN + ES) with per-act word budgets

Reading copy only (device-UI excluded). Budgets are HARD gates per act and language; the EN strings are already final in the reference file — the build must match them, and ES must mirror them. Where a line exists in `docs/v3/02_COPY_DECK.md`, the v3 ES string is authoritative (marked *[v3]*); new ES strings are defined here.

### ACT I · SUNRISE — budget ≤ 35 words
| Slot | EN | ES |
|---|---|---|
| Eyebrow (mono) | `THE VOICE-FIRST GUEST INTELLIGENCE PLATFORM FOR HOTELS` | *[v3]* `LA PLATAFORMA DE INTELIGENCIA DE HUÉSPEDES POR VOZ PARA HOTELES` |
| Coordinates chip (mono) | `N 20.2114° · W 87.4654°` | same |
| H1 (serif; second sentence italic champagne) | `Understand Every Guest. Capture Every Opportunity.` | *[v3]* `Entiende a Cada Huésped. Captura Cada Oportunidad.` |
| Strip (mono) | `NO FORM · NO BROCHURE · THIS IS THE PRODUCT` | `SIN FORMULARIO · SIN FOLLETO · ESTO ES EL PRODUCTO` |
| Ask-bar placeholder `UI` | `Ask anything…` | *[v3]* `Pregunta lo que quieras…` |
| Proof row (mono) | `0% OTA COMMISSION · 24/7 · IN EVERY LANGUAGE · LIVE IN DAYS` | *[v3 strings]* `0% COMISIÓN OTA · 24/7 · EN TODOS LOS IDIOMAS · EN LÍNEA EN DÍAS` |

### ACT II · THE ARITHMETIC — budget ≤ 40
| Slot | EN | ES |
|---|---|---|
| Eyebrow | `02 · WHAT'S AT STAKE` | *[v3]* `02 · LO QUE ESTÁ EN JUEGO` |
| Figure 1 (outlined stroke serif) | `2–3×` | same |
| Line 1 (serif) | `What an OTA booking costs versus direct.` | `Lo que cuesta una reserva por OTA frente a una directa.` |
| Source 1 (mono) | `SOURCE: KALIBRI LABS.` | `FUENTE: KALIBRI LABS.` |
| Figure 2 (italic champagne + glow) | `$160B` | *[v3]* `$160 mil millones` |
| Line 2 (serif) | `Waiting inside AI-run hospitality operations.` | `Esperando dentro de la hospitalidad operada con IA.` |
| Source 2 (mono) | `SOURCE: MCKINSEY.` | `FUENTE: MCKINSEY.` |
A2 treatments as built in v3 (stroke ≥180px 2–3×; italic champagne glow $160B) + sr-only plain values. The stacked figure-over-copy layout from P3.2 carries over; no collisions 1280–2600 (G-3).

### ACT III · ONE DAY, ONE VOICE — budget ≤ 70
Statement (serif, final phrase italic champagne): EN `The booking, the upsell, the 2AM save — each begins as a question. The Companion closes what it answers. No OTA in between.` · ES *[v3 A1, adapted opening]* `La reserva, la mejora, el rescate de las 2AM — cada uno empieza como una pregunta. El Companion las responde y las cierra. Sin OTA de por medio.`
Three moments (times serif; tags mono; card contents `UI`, ported from v3 arc stops):
1. `10:04 · TABLET` — `"Best beach near here?"` / *[v3]* `"¿La mejor playa cerca?"` → Akumal card (real asset).
2. `18:40 · DUSK · PHONE` — `"Can we upgrade to an ocean view?"` / *[v3]* `"¿Podemos mejorar a vista al mar?"` → `Suite Vista al Mar · $250/night · Confirm upgrade` (v3 strings).
3. `02:14 · VOICE · LIGHTS OFF` — `"There's water on the bathroom floor."` / *[v3]* → receipt chip `→ ENGINEERING · ROOM 214 · 02:14 · GUEST'S EXACT WORDS ATTACHED` / *[v3]* `→ INGENIERÍA · HAB 214 · 02:14 · PALABRAS EXACTAS DEL HUÉSPED`.
The sun sits ON the drawn arc above the moments, per the reference.

### ACT IV · EVERY SURFACE — budget ≤ 30
Statement: `One conversation. Every screen in the guest's world.` / *[v3]* `Una conversación. Cada pantalla del mundo del huésped.` (second phrase italic champagne per reference)
Captions (mono, v3 strings both languages): PHONE · TABLET · WEB · TV · WATCH · VOICE ONLY set.
Closing (serif): `Five screens. One memory. She never repeated herself once.` / *[v3]* `Cinco pantallas. Una memoria. Nunca tuvo que repetirse.`
Screens: real assets per §2. Watch face: v3's `20 min / SPA IXCHEL`. Phone: v3 orb home state.

### ACT V · THE RECEIPT — budget ≤ 45
Statement: `Every conversation becomes intelligence — and execution.` (italic `intelligence`) / *[v3]* `Cada conversación se convierte en inteligencia — y ejecución.`
Receipt rows `UI` (from reference): FRONT DESK·LATE CHECKOUT·10:04 / CONCIERGE·TAXI TO AKUMAL·10:12 / RESERVATIONS·SUITE UPGRADE·18:40 / ENGINEERING·ROOM 214·WORDS ATTACHED·02:14 — ES from v3 request-execution card.
Footer (serif; `0 woke your staff` champagne): *[v3 A3]* EN `Tracked from creation to completion. Tonight: 14 conversations · 0 woke your staff.` ES `Rastreado de inicio a fin. Esta noche: 14 conversaciones · 0 despertaron a tu equipo.`

### ACT VI · LIVE IN DAYS — budget ≤ 25
Statement: `Live in Days. Not Months.` (italic `Not Months.`) / *[v3]* `En Línea en Días. No en Meses.`
Line: `It doesn't replace your systems. It understands the conversations between them.` / *[v3]* `No reemplaza tus sistemas. Entiende las conversaciones entre ellos.`
Chips (mono): `LIVE IN DAYS · ROLE-BASED ACCESS · ENCRYPTED · PRIVACY-FIRST · WORKS WITH YOUR PMS` / *[v3 trust strings]*.

### ACT VII · 2AM — budget ≤ 35
Statement: `Stop reading about it.` + italic champagne `Ask it something.` / *[v3]* `Deja de leer sobre esto. Pregúntale algo.`
Ask-bar `UI` + chips `UI`: `What would you upsell at my hotel?` · `How do you handle 2AM?` / *[v3]*.
Partner line (serif italic): `Now partnering with a limited number of visionary hotel groups.` / `Ahora nos asociamos con un número limitado de grupos hoteleros visionarios.`
Action: `BECOME A FOUNDING PARTNER` / *[v3]* `CONVIÉRTETE EN FOUNDING PARTNER`. Sign-off (mono, in the dome): `POWERED BY AXIONARI`.
Below Act VII: the site footer (v3 footer, unchanged — it is chrome, not an act).

**Total reading-copy ceiling: ≤ 320 words per language** (G-1). Everything else that existed on the v3 homepage (marquee, knowledge lists, FAQ, boundaries essay, OS band, deployment cards, memory card) does NOT appear; FAQ content moves to the Resources route in this same phase (one file move, no redesign).

## 4 · The sun lighting model (the one global system)

A page-level scroll progress variable `--day` (0 at top, 1 at footer) drives each act's background luminance per the reference's exported gradients: I sunrise (dome below the fold line, brightest), II–III midday-to-dusk warm neutrals, IV–V dusk, VI late night, VII 2AM (darkest, ember below horizon). Implement by porting the reference's per-act background values as the keyframes; `--day` interpolates between adjacent acts so scrolling reads as one continuous day. Motion: entrance transitions only, one per act, plus the orb's existing 6s breathe. `prefers-reduced-motion` disables all of it.

## 5 · Gates (all must be green before STOP)

- **G-1 (words):** per-act and total budgets (§3), EN + hydrated-DOM ES, `data-device-ui` excluded. Report per-act tables.
- **G-2 (two typefaces):** computed `font-family` audit across every rendered text node at 1280: serif/mono only outside `[data-device-ui]`; zero other families.
- **G-3 (verbatim + A2):** string-diff of rendered reading copy vs §3 = zero deviations; A2 computed-style assertions (stroke/italic/glow/sr-only) both languages; no figure/copy rect collisions 1280/1440/1600/2000/2600.
- **G-4 (geometry fidelity):** side-by-side of each act at 1280 vs the reference file rendered at 1280 — layout, type scale, spacing, and Act IV cluster topology match; deviations enumerated (real assets, hydration, responsive only). Act IV additionally passes the v3 G-4 rect audit (overlap pairs, caption clearance, zero connector SVGs, 2px rims, puck shadow).
- **G-5 (palette):** computed background/color scan — zero cool-hue values (teal/cyan/navy/marine ranges) outside `<img>` content.
- **G-6 (orbs):** every orb instance renders via the shared component; zoomed captures show gradient-fade boundaries.
- **G-7 (quality):** Lighthouse mobile ≥ 90 perf (hero lock lifted; the v3.1 bundle-split authorization applies here) · a11y ≥ 95 · SEO ≥ 95. Screenshots 1440 + 2000 + 390, EN + ES, all seven acts.
- **G-8 (site integrity):** all non-home routes render unchanged (v3 pages); nav and footer work; FAQ reachable at its new home; no dead links.
- **G-9 (responsive):** at 390px each act remains one readable idea; Act III moments stack; Act IV uses the v3 constellation's mobile treatment; no horizontal overflow anywhere (overflow-x: clip law).

## 6 · Loop & deliverables

READ (this kit + reference render) → PLAN (files to touch, ≤15 lines) → EXECUTE (Acts I–VII + FAQ relocation) → VERIFY (G-1…G-9, machine where possible) → REPORT (`reports/V4_REPORT.md`: per-gate evidence, per-act screenshots, deviations, illustrative-numbers table) → STOP. Then deploy a preview with a share link and print the URL — the panel re-inspects in-browser and issues the verdict. A failed gate loops; an interpretation question goes to OPEN_QUESTIONS with the smallest reading taken. Nothing merges; production untouched; promotion remains a separate, explicit order from Eduardo.

## 7 · Fresh-session bootstrap prompt (Eduardo pastes this into a new Code session)

```
You are building Hotel Companion v4 — a seven-act homepage rebuild — in this
repo. Create branch v4 from v3. The complete build authority is docs/v4/
(V4_BUILD_KIT.md + reference/). I am providing the docs-v4 folder now if it
is not yet in the repo — commit it to docs/v4/ first.

Read, in order: docs/v4/V4_BUILD_KIT.md, then render
docs/v4/reference/"Hotel Companion Homepage.dc.html" at 1280 and study all
seven acts. docs/v3/01_RULES.md remains binding as amended by the kit's §1.
Do not re-derive strategy; do not reopen v3 decisions; the kit's copy deck
is verbatim law.

Execute the kit's §6 loop: PLAN → EXECUTE → VERIFY (gates G-1…G-9) →
reports/V4_REPORT.md → STOP → deploy preview + share link and print the URL.
v3 pages on non-home routes stay untouched except the FAQ relocation (§3).
Nothing merges or promotes.
```
