# V4 ADDENDUM 1 — Family Alignment: Typography, Color, Nav & Motion per restaurantcompanion.ai
Place at `docs/v4/V4_ADDENDUM_1.md`. Amends `V4_BUILD_KIT.md` §1.3/§1.5 and gate G-2. Eduardo's ruling (Jul 22): Hotel Companion adopts restaurantcompanion.ai's design system wholesale — typefaces, text colors, nav, CTA treatment, and animation style. **The seven-act layout is the only thing this family member experiments with.** All values below were measured by the panel on the live restaurantcompanion.ai (computed styles, Jul 22).

## A — Typefaces (replaces Instrument Serif + IBM Plex Mono)

| Role | Face | Notes (as measured on RC) |
|---|---|---|
| Serif display + statements + emphasis italics | **Fraunces** | display weight ≈530; italic for emphasis; fallback Georgia, serif |
| Mono labels / eyebrows / chips / data | **Spline Sans Mono** | letterspaced uppercase, as RC's `POWERED BY AXIONARI` |
| Device-UI + small supporting body lines | **General Sans** | RC's body face; stays out of display roles |

Swap is homepage-scoped (`v4fonts.ts`): same mechanism, new faces. Type scale, sizes, and the reference geometry are unchanged — faces only. If General Sans isn't already in the repo (v3 pages likely load it), self-host per current setup; no new CDNs beyond what RC/v3 already use.

## B — Text-color system (replaces champagne-on-display)

1. **Retire `#E7CE86` (champagne) from ALL text.** Zero occurrences as a computed text color on the page (new gate G-10).
2. **Emphasis italics** (hero second sentence, `Sin OTA de por medio.`, `No en Meses.`, `Pregúntale algo.`, Act IV second phrase, `inteligencia`) → **Fraunces italic in cream `#F2EEE6`**, exactly like RC's hero ("The *future interface*" pattern). Emphasis is carried by the italic, not by color.
3. **Numbers-as-art:** `2–3×` outlined stroke unchanged (stroke color stays the warm low-contrast neutral). `$160 mil millones / $160B` → Fraunces italic in **cream** with the existing soft warm glow (glow stays; gold fill goes).
4. **Solid actions** (`PREGUNTAR`/`ASK` button, `CONVIÉRTETE EN SOCIO FUNDADOR`) → **terracotta `#C86A3A`** solid with dark text, matching RC's "Request a Demo". No gold pills.
5. **Brass `#C9A15A` is permitted ONLY for micro-accents** — numbered eyebrows, the trust line's `0 despertaron a tu equipo`, chip borders — mirroring RC's sparse usage. Never at display sizes.
6. **Base surfaces:** anchor the darkest stops of the `--day` ramp to RC's neutral `#171717` family; the warm-brown midtones flatten toward neutral.

## B2 — The orb (new ruling: NO SUN, ever)

Eduardo's words: *"You keep making the orb like a sun. I don't want it like a sun — I want the one on restaurant companion's features page. Same exact one."* Measured on that page, the orb is the **vux voice-orb stack** (identical class vocabulary already in this repo's v3 VoiceOrb):

```
.vxstage
  .vring.r1  440px · border 1px rgba(200,106,58,.28) · shadows 0 0 60px -18px rgba(200,106,58,.35) + inset 0 0 60px -30px rgba(200,106,58,.30)
  .vring.r2  299px · border 1px rgba(200,106,58,.40) · shadows 0 0 44px -14px rgba(200,106,58,.40) + inset 0 0 44px -24px rgba(200,106,58,.35)
  .vglow     237px · radial-gradient(circle at 46% 42%, rgba(245,163,74,.5), rgba(200,106,58,.16) 62%, transparent 78%)
  .vshimmer  299px · conic-gradient(transparent 0–78%, rgba(245,163,74,.5) 89%, transparent 100%) — slow rotation
  .vbadge    46px mic SVG · .vwave 3px terracotta waveform bars
```

Rulings, binding on every act:
- **Every orb instance on v4 is this component** — the repo's existing VoiceOrb/vux stack, which IS the RC one. No filled spheres, no gradient balls, no domes.
- **Act I:** the giant sunrise dome / eclipse horizon is REMOVED. The hero's proof object is the voice-orb at RC-features scale (~440px ring stage) sitting above/behind the ask-bar. Faint concentric hairline arcs may remain as backdrop texture; no filled luminous horizon.
- **Act III:** the sun traveling the arc becomes the small voice-orb marker (the v3 arc's ~56px treatment) on the drawn arc line. The arc line and time stops are unchanged.
- **Act VII:** the setting-sun dome is removed; the act closes on warm black with the voice-orb in a dim RESTING state above `POWERED BY AXIONARI`.
- **"One day" survives as light, not as a sun:** the `--day` ramp keeps shifting background luminance and the act times still tell the day — there is simply no celestial body rendered anywhere.

## C — Gates (delta)

- **G-2 (updated):** computed-font census = Fraunces / Spline Sans Mono outside `[data-device-ui]`; General Sans only inside device UI and the designated small body lines (Act II figure sub-lines, Act VI boundary line may be General Sans per RC body usage — implementer picks ONE consistent choice and reports it).
- **G-10 (new):** zero elements with computed text color `#E7CE86`; ≤ a reported handful of `#C9A15A` micro-accent instances, none with font-size > 20px.
- **G-6 (updated):** every orb renders via the vux VoiceOrb stack per §B2 (rings + glow + shimmer + mic/waveform where scale permits); zero filled-sphere or dome orbs anywhere on the page; zoomed capture of the Act I orb side-by-side with the RC features orb.
- **G-11 (new, family check):** side-by-side screenshots — v4 hero vs restaurantcompanion.ai hero, AND v4 nav vs RC nav — in the report: same serif voice, same italic-in-cream emphasis, same CTA treatment, same nav pattern. This is the "one family" visual proof for Eduardo.
- **G-8 note:** with the standard nav restored on the homepage, re-verify anchor offsets and that every nav link works from the v4 page.
- All other gates (G-1, G-3…G-9) re-run unchanged after the swap; A2's assertion updates from champagne to cream-italic-with-glow.

## D — Nav bar (new)

The v4 homepage's minimal header (logo + coordinates chip) is replaced by the **standard site nav in the RC pattern** — which the v3 hotel nav already implements: logo wordmark left · the site's page links (Plataforma · Soluciones · Enterprise · Recursos · Empresa) · secondary text link (`Ver el Demo` / `See It Live` equivalent) · **solid terracotta CTA pill** (`Agenda una Demo`) · EN/ES toggle styled as RC's pill toggle. Reuse the v3 nav component restyled with §A faces; same nav on the v4 homepage as on every other route (one family, one chrome). The mono **coordinates chip moves into Act I's stage** (upper-right of the act, below the nav) — it is part of the eclipse composition, not the site chrome.

## E — Motion (new)

"Same animation styles" = the family's existing motion vocabulary, not the reference file's. Concretely: reuse the v3/site reveal utilities (durations, easings, distances) for the one-entrance-per-act rule; RC's observed character is soft, short fades/rises — no parallax theatrics, no new bespoke curves. The orb's 6s breathe and the `--day` lighting interpolation are unchanged. `prefers-reduced-motion` behavior unchanged.

## F — Out of scope

No copy changes, no layout changes, no act changes, no orb/sun changes. OQ-10/11/12 rulings: the panel AFFIRMS all three of Code's smallest readings (deck-first ES strings — `Aprovecha Cada Oportunidad`, `EN MARCHA EN DÍAS`, `Deja de leerlo.`, `SOCIO FUNDADOR` — are correct and now canonical; reference-derived overlap pairs; label/chrome exclusions with both counts reported). No string edits needed.

## Paste-ready prompt for the Code session

```
V4 ADDENDUM 1 has been added at docs/v4/V4_ADDENDUM_1.md (I'll provide the
file if not present). It amends the kit: align the v4 homepage to the
restaurantcompanion.ai design system — Fraunces / Spline Sans Mono /
General Sans, champagne retired from all text (new gate G-10), emphasis
italics in cream, terracotta solid actions, brass micro-accents only,
darkest --day stops anchored to #171717, the standard site nav (v3 nav
restyled per the addendum, RC pattern) replacing the minimal v4 header
with the coordinates chip relocated into Act I, the family's existing
reveal/motion utilities instead of bespoke ones, and — critically — §B2:
every orb becomes the vux VoiceOrb stack exactly as on restaurantcompanion.ai's
features page; the Act I sunrise dome, the Act III sun ball, and the Act VII
setting dome are all removed per the addendum (no celestial body anywhere;
the --day luminance ramp stays). The seven-act layout and copy are unchanged.
OQ-10/11/12 are affirmed as ruled — no string edits. Re-run the full gate
suite including updated G-6 and new G-10/G-11 (family side-by-sides vs RC,
including the orb), amend reports/V4_REPORT.md, commit, deploy a fresh
preview + share link, and print the URL. STOP after.
```
