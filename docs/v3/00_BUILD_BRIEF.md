# Hotel Companion v3 — Board Decisions & Claude Code Build Brief

**Mandate:** Decide, for the entire site, what gets applied where — integrating the Serus study, the transplant map (T1–T13), and three rounds of Claude Design exploration. Then hand a fork-based build plan to Claude Code. The live site stays untouched.
**Date:** July 22, 2026 · **Live site:** placecompanion-v2-ecru.vercel.app (Vercel project `placecompanion-v2`, Axionari team)
**Visual reference:** Claude Design file "Homepage Concepts" — sections 5a–c, 6a–c (device UIs), 7a (constellation), 8a (sun arc), 8b (four skies)
**Panel:** Brand/CEO · GTM/CMO · Enterprise B2B · UI/UX · Design Systems · Motion (Awwwards/FWA lens) · Restraint (Red Dot/iF lens) · UX-value (UX Design Awards lens) · Accessibility & Performance · SEO

---

## The fork protocol (do this first, before any design work)

1. Work in the existing repo behind `placecompanion-v2`. Create branch **`v3`**. All work lands there.
2. Vercel builds every push to `v3` as a **preview deployment** — that preview URL is the working site. Production (`main` → the live domain) is not touched until Eduardo explicitly promotes.
3. No new Vercel project needed. (If a separate project is ever wanted, it goes in the **Axionari team**, not the personal account.)
4. First commit on the branch: this document at `/docs/V3_BUILD_BRIEF.md`, so the plan travels with the code.

---

## How the board decided

Unanimous premise, from Eduardo's direction: **the site is already great; this is an upgrade, not a redesign.** Every decision below was tested against three questions: does it condense (the site says too much twice)? does it prove (show the product acting, not describe it)? does it keep the enterprise register (say all we must — once)?

Three deliberations worth recording:

**FrameCanvas (the Serus rounded-mat).** Design Systems argued for it (instant "designed object" signal). Brand vetoed for v3: the fork's premise is evolution of a working identity, and the frame is a structural re-skin that touches every page for diffuse benefit. **Ruling: not in v3.** Logged as a future A/B experiment.

**Merging the stat sections (02+03).** GTM wanted the two stats kept apart for scroll rhythm; Restraint wanted one stakes moment. **Ruling: merge** — one "Lo que está en juego" band carrying both figures. Two numbers, one caption, one scroll stop instead of two.

**Where the sun arc lives (the 05/06 question).** The two strongest new visuals both target "Every Surface." **Ruling: Option 2.** The **sun arc (8a)** becomes section 05 — re-scripted so the day carries revenue — because "Cada Conversación Es Ingreso" *is* a day in the life, and the arc gives the revenue story the site's single most distinctive image. The **constellation (7a)** keeps section 06, showing one moment across space. Time in 05, space in 06; one Maya narrative each, no repetition. **Four skies (8b) is banked** (strong candidate for Restaurant Companion or the product page — do not use twice in this family's homepage).

---

## Global rulings (apply across the whole site)

- **G1 · Caption discipline.** The rule from the exploration: mono caption + one sentence, never two paragraphs. Every section below lists its cuts.
- **G2 · The receipts system.** One shared `ReceiptCard` idiom (mono, ✓ in success green, money in gold, ID in high-contrast): used in the sun arc peaks, the demo, the ask-bar answers, and the execution card. Receipts always name a business outcome.
- **G3 · Speakable phrases.** Wherever the Companion replies, the phrase a guest can say is bold: «Di **"resérvalo"** y aparto la mesa.» Adopt as a copy rule site-wide (demo, sun arc, ask-bar).
- **G4 · Mono metadata.** Logistics render as compact mono chips (`12 MIN · TAXI $8`, `78 KM · UN CHOFER · $95`), never prose.
- **G5 · Companion OS appears exactly once.** Remove: the hero eyebrow "IMPULSADO POR COMPANION OS," the **nav item**, the FAQ entry, one of the two footer essays. Keep: one quiet band (new section 08) + one line in the footer. The platform story lives on axionari.com.
- **G6 · Endorsement.** The visible mark is **"Powered by AXIONARI"** (footer + section 08 band). Axionari is the brand that endorses; OS is architecture.
- **G7 · Photography over placeholders.** Every device mock uses the site's real assets (Akumal aerial, lobby, dusk pool, suites). No striped placeholders ship.
- **G8 · Motion.** Calm scroll reveals only; the sun-arc scrub is the page's one signature motion. Full `prefers-reduced-motion` fallbacks (arc renders static at noon; reveals become fades).
- **G9 · Accessibility & performance gates.** Amber/champagne text on warm black at WCAG AA minimum; keyboard access to demo and ask-bar; hero LCP under 2.5s; the arc animation on transform/opacity only.
- **G10 · ES/EN parity.** Every change lands in both languages in the same commit. ES remains the reference voice.

---

## Section-by-section (old numbering → new)

The page goes from 15 sections to 13. Nothing of substance is deleted — it is said once, or shown instead of said.

**Nav.** Remove "Companion OS" (G5). Keep: Plataforma · Soluciones · Enterprise · Recursos · Empresa · language toggle · one bright **Agenda una Demo**.

**01 · Hero — keep, one addition.** The orb hero works and stays. Add a single mono proof line under the CTAs: `+$402 POR ESTANCIA PROMEDIO · 0% COMISIÓN OTA · 24/7 EN CADA IDIOMA`. (UX-value seat: the hero currently promises; one line of proof anchors it.)

**02 · Lo que está en juego (merges old 02+03).** Two `StatBlock`s side by side — **2–3×** (FUENTE: KALIBRI LABS) and **$160B** (FUENTE: MCKINSEY) — keep the OTA bar comparison, and cut the two closing paragraphs to one line: *"Lo rutinario, resuelto automáticamente — tu equipo, libre para los momentos que importan."*

**03 · La conversación (old 04).** Keep the marquee; curate 16 questions → 10 best. Keep "Hotel Companion garantiza que esos momentos nunca se pierdan."

**04 · Cada Conversación Es Ingreso — THE SUN ARC (old 05, rebuilt from 8a).** The orb travels a dawn→2 AM arc; the sky warms and darkens with it; five moments hang from the arc as working mini-UIs, re-scripted for revenue:
- `3 SEMANAS ANTES · WEB` — reserva directa · receipt: `0% comisión · $71 menos que la OTA`
- `10:04 · TABLET, SUITE 214` — Akumal en pantalla, taxi en un toque
- `6:48 PM · RELOJ, ALBERCA` — golden hour desde tu terraza · upsell cabaña · receipt: `+$120 al folio`
- `2:14 AM · VOZ, A OSCURAS` — la fuga atendida antes de terminar la frase · receipt: `→ INGENIERÍA · HAB 214 · 02:14`
- `+2 DÍAS · TELÉFONO` — la nota de Marazul, tarifa apartada · receipt: `★5 · reserva directa capturada`
The existing revenue ticker closes the section as the epilogue: `INGRESOS DE ESTA ESTANCIA · +$402`. The five explanation paragraphs are deleted; the three-act cards are **not** used here (banked). The interactive tablet demo stays attached to this section (see Demo rulings). Motion: orb position scrubs with scroll (G8).

**05 · Una conversación, cada pantalla — THE CONSTELLATION (old 06, rebuilt from 7a).** One cinematic still: phone, in-room tablet, web/laptop, watch, in-room TV, voice puck, overlapping in depth, one question ("¿La mejor playa cerca?") flowing across all. Mono role captions in ES: `WEB · RESERVA ANTES DE LLEGAR` · `TV · SALUDA AL LLEGAR` · `RELOJ · LA TRAE DE VUELTA` · `SOLO VOZ · DESCRITO EN VOZ ALTA`. Fix the speaker puck (render a proper small device or the orb itself). Closing line replaces current copy: **"Cinco pantallas. Una memoria. Nunca tuvo que repetirse."** The old 8-vignette bento retires.

**06 · Conocimiento (old 07) — keep, tighten.** Dual lists stay. Add one "insider" flavor line per column in the 6a style (*"dónde comen los locales un martes"*) so the knowledge claim tastes like knowledge. Mono labels per G4.

**07 · Inteligencia y Ejecución (merges old 08+09).** Three proof cards, one section:
- **Centro de mando** (keep the 91% ring — it already works)
- **`GuestMemoryCard`** (new, from 2a): *"Maya vuelve en noviembre. El Companion ya sabe:"* + chips `vista al mar · vegetariana · aniversario · habla español · salida tardía`
- **`RequestExecutionCard`** (from 2a): four rows with timestamps — *"Hay agua en el piso del baño"* `02:14` `→ INGENIERÍA` — replacing the old 8-row list.
Intro paragraphs cut to one line each. (This merge is the second-biggest condensation on the page after the sun arc.)

**08 · Companion OS — one quiet band (old 10, compressed).** One line: *"Construido sobre Companion OS — la plataforma de inteligencia detrás de cada Companion."* + link to the platform story on axionari.com + the **Powered by AXIONARI** mark. The eight English capability names leave this page.

**09 · Implementación (old 11).** Keep the three steps; cut the two closing sentences to one: *"Tu equipo sigue haciendo lo que mejor sabe hacer — cada interacción, mejor."*

**10 · Límites (old 12) — untouched.** The board's unanimous "best-written section on the site." It is already caption-discipline.

**11 · Socios Fundadores (old 13) — keep.** Only change: render the four benefits as a mono list (G4 styling), no copy changes. Enterprise seat: this is the PMF learning loop; do not soften it.

**12 · Preguntas Frecuentes (old 14).** Prune 8 → 4 on-page: ¿Reemplaza al personal? · ¿Cómo interactúan los huéspedes? · ¿Aumenta ingresos? · ¿Qué tan rápido en marcha? The rest move to `/faq` (SEO seat: keep them indexed there; add FAQ schema).

**13 · Cierre — THE ASK-BAR (old 15, rebuilt).** **"Deja de leerlo. *Pregúntale algo.*"** — the ask-bar with three suggestion chips and scripted answers that each end in a receipt:
- «¿Qué venderías más en mi hotel?» → cabaña/spa/rooftop → `✓ en promedio +$402 por estancia`
- «¿Cómo manejas las 2 AM?» → the leak story → `✓ resuelto en minutos · nadie despierta molesto`
- «¿Qué sabes de mi destino?» → Akumal/Cielo Rooftop → `✓ cada respuesta incluye el siguiente paso`
Scripted demo mode — no live LLM in v3. "Agenda una Demo" sits beside it. (Unanimous: the site's thesis is "conversation is the interface"; the page should end by being one.)

**Footer.** Trim to 4 columns. The two mini-essays become one line each; the endorsement block becomes the **Powered by AXIONARI** mark + "Construido sobre Companion OS →" line. Newsletter stays. Legal stays.

## Demo rulings (the interactive tablet — attached to section 04)

- **D1 · Answer anatomy** (from 6a–c): every answer = mono context chip (`TORTUGAS ANTES DE LAS 11 AM`) → serif title → gold insider caption → concierge sentence → one solid + one ghost action → ask bar.
- **D2 · Speakable phrases** bold in every reply (G3).
- **D3 · Receipts** after actions: `✓ Taxi reservado · 6:15 · a la cuenta de la habitación`.
- **D4 · Second scenario:** the day-planner (6b) — cenote → pueblo → spa, `78 KM · UN CHOFER · $95`, "Di **'reserva el día'**." This is multi-venue orchestration made tangible.
- **D5 · Recognition greeting** on open: "Buenas tardes, *Maya* · Suite 214."

## Explicitly not in v3

FrameCanvas (logged experiment) · four skies 8b (banked for RC/product page) · three-act cards (banked) · relay 7b (mined, retired) · any teal/navy accent · "Companion OS" in nav · live LLM in the ask-bar · new pages (Soluciones/Enterprise/etc. get G1–G10 pass only, no restructuring in v3).

---

## Claude Code execution phases (each phase = mergeable, preview-deployed, reviewed)

**Phase 0 — Fork.** Branch `v3`; commit this brief; verify preview deploy. *Gate: preview URL renders identically to live.*
**Phase 1 — Words & structure (no new components).** G5 OS dedupe, nav/footer changes, all G1 caption cuts (02, 06 intro, 07 intros, 09, footer), FAQ prune + `/faq` page + schema, marquee trim, hero proof line, ES+EN. *Gate: body text down ≥30%, zero claims lost (checklist against this doc), both locales build.*
**Phase 2 — Component kit.** `ReceiptCard`, `StatBlock` (merged stakes), `GuestMemoryCard`, `RequestExecutionCard`, `AskBar` (scripted), mono-chip primitives. Storybook-or-page of states incl. empty/loading/reduced-motion. *Gate: components match reference screenshots; AA contrast verified.*
**Phase 3 — The two heroes.** Section 04 sun arc (scroll-scrubbed orb, five mini-UIs, receipts, ticker epilogue; static-noon fallback) and section 05 constellation (real photography, role captions, closing line). *Gate: 60fps scroll on mid hardware; reduced-motion audit; mobile layouts (arc stops stack vertically, constellation becomes a swipeable row).*
**Phase 4 — Demo upgrade.** D1–D5 on the tablet demo. *Gate: both scenarios playable start-to-receipt by keyboard alone.*
**Phase 5 — Full-site QA.** Screenshot pass vs this doc, Lighthouse (perf ≥ 85 mobile, a11y ≥ 95), ES/EN diff, cross-device (375/768/1440), then Eduardo review on the preview URL.

**Reference materials for the builder:** the Claude Design share link (sections 8a, 7a, 5a–c, 6a–c) · the live site as content source of truth · `HotelCompanion__Surgical_Transplant_Map.md` (rationale) · house tokens: warm black `#0E0B09/#201A12`, champagne `#E7CE86`, gold `#9C7220`, amber ramp `#E8A66A→#C56A3D`, success `#5B8C6E`, money `#D9A441`.

---

*Board note: v3's thesis in one line — same soul, half the words, twice the proof. When v3 is approved, the same rulings (G1–G10, receipts, ask-bar) become the template for Restaurant Companion's next pass and for axionari.com — that's where the banked concepts (8b, three-act cards) get their turn.*
