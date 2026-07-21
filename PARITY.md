# PARITY.md — Restaurant Companion visual parity

Branch `feat/hotel-companion`. Re-skin per `HotelCompanion__Visual_Parity_Spec.md` +
`HotelCompanion__Design_Interaction_Spec.md`, which supersede §3 of the Build Brief.
**Styling and layout only — approved EN/ES copy is not touched.**

## 1 · RC ground truth (read from the live site, not assumed)

Both specs require reading restaurantcompanion.ai directly before writing tokens. Values below are
**computed styles** captured from `https://restaurantcompanion.ai/` and `/company` at 1280px.

### Typography — actual families in use

| Role | Family | Evidence |
|---|---|---|
| Display / headlines | **Fraunces** | `h1` computed `Fraunces, "Fraunces Fallback", Georgia, serif`, 58.88px, **weight 530**, line-height 61.2px, letter-spacing −0.88px |
| Headline italic accent | **Fraunces italic, weight 480** | `<em>` inside h1 ("*future interface*") |
| Body / UI | **General Sans** | dominant family across the page — 89 nodes at 17px/400, plus 15px/400, 14px/500, 13px/500, 12px/600 |
| Mono eyebrow | **Spline Sans Mono** | 10–11px, letter-spacing 2.73px (~0.26em), `rgba(251,248,242,0.55)` |
| Small caps / labels | Archivo | 9px/600, 11px/800 — device-UI microcopy only |

> **Correction to the Visual Parity Spec.** §3 of that spec says body/UI should be **Inter**. The live site
> does **not** use Inter anywhere — it uses **General Sans**. The spec also offered Fraunces as a *guess* to be
> flagged for confirmation; it is in fact RC's exact display face, so no confirmation is needed. Following the
> spec's own instruction that "the authoritative source is the live RC site," this build adopts
> **Fraunces + General Sans + Spline Sans Mono**.
>
> **General Sans is not on Google Fonts** (it is a Fontshare face). See §3 for how it is loaded and the
> fallback if that is not acceptable.

### Color — measured

| Token | Value | Where seen |
|---|---|---|
| body bed | `#171717` (`rgb(23,23,23)`) | `body` background |
| warm section | `#181512` (`rgb(24,21,18)`) | section backgrounds |
| deep warm | `#181109` (`rgb(24,16,9)`) | large warm panels |
| device frame | `#0D0D0F` (`rgb(13,13,15)`) | phone bezel |
| **accent (bright)** | **`#C86A3A`** (`rgb(200,106,58)`) | buttons, eyebrows, orb glow, active states |
| accent secondary | `#C9804A` (`rgb(201,128,74)`) | lighter copper detail |
| accent washes | `rgba(200,106,58,0.06 → 0.55)` | glows, hairlines, tints |
| text | `#F7F6F1` / `rgba(251,248,242,0.94)` | headline / body |
| text dim | `rgba(251,248,242,0.70)` | support copy |
| text faint | `rgba(251,248,242,0.55)` | eyebrows |

The spec's token ladder is close but not identical (spec `--accent: #A9541F` as primary; RC actually leads with
`#C86A3A` and uses the deeper tone only for pressed/depth). This build uses **`#C86A3A` as the working accent**
and keeps `#A9541F` as the deep/pressed step.

### Layout — measured

- Container **`max-width: 1200px`** (not `max-w-6xl`/1152px).
- Section vertical padding **≈ 96–130px** (`py-24` … `py-32`).
- Headlines, eyebrows, body, CTAs all `text-align: start` — **left-aligned throughout**. No centered sections.
- Sections are card-less: content sits directly on the bed. No bordered panels used decoratively.
- Primary button is a **fully-rounded pill**, solid copper, dark text. Secondary is a hairline outline pill.
- Nav: fixed, wordmark left in tracked uppercase General Sans, text links, one solid copper pill CTA.

### Composition notes not in the spec

- **The RC hero sits on a full-bleed photograph** (dark restaurant interior) with the text over it — the spec
  describes only "a warm radial copper glow." Hotel Companion has **no photography** in `public/` (still the
  standing `NEEDS REAL DATA` item), so the Hotel hero is composed with a warm ambient/vignette treatment in CSS
  and a device that carries the right column. Real hospitality photography would close the remaining gap.
- RC `/company` is the cleanest reference for the Hotel `/company` rebuild: copper mono eyebrow `COMPANY`,
  very large left-aligned Fraunces H1, several General Sans paragraphs at `--text-dim` on a ~950px measure,
  and a short bold Fraunces line as the closing beat ("Beginning with hospitality."). Entirely card-less.

## 2 · What has been re-skinned so far

**Done:** foundation (tokens, type, layout law, nav, buttons, endorsement lockup),
the Home hero (§2), and `/company` (§5).

**Not yet done:** the rest of the Home composition (§4 items 2–17) and the other page
maps (§5 Platform / Solutions / Enterprise / Companion OS / Resources / Demo / Contact).
Those sections still carry the old centered, card-based treatment.

### Foundation
- `tokens.css` rebuilt on the measured RC ladder; single copper accent `#C86A3A`.
- Fonts swapped: **Fraunces** (display, weight 530; italic accent 480) + **General Sans**
  (body/UI, self-hosted from `public/fonts`) + **Spline Sans Mono** (eyebrows).
  Zero Cormorant / DM Sans references remain.
- `Section` primitive is now **left-aligned and card-less by default**, on the 1200px
  container with `py-24 md:py-36`; `center` survives only for the rare statement line.
  Added `SectionSplit` for the asymmetric content/visual shape.
- Buttons are RC pills (solid copper primary, hairline secondary). Nav wordmark is
  tracked uppercase General Sans with a copper pill CTA. `EndorsementMark` is now a
  mono lockup rather than serif italic.
- `AccentHeadline` / `MultiAccentHeadline` apply the italic accent **as styling only** —
  the approved copy strings are untouched, and a phrase that does not appear in a given
  language is simply skipped rather than guessed. Accent phrases live in
  `marketing/accents.ts`, deliberately outside the copy modules.

### Home hero (§2)
Asymmetric: eyebrow → italic-accented Fraunces H1 → two support lines → copper pill +
hairline pill → mono `POWERED BY COMPANION OS` lockup on the left; the **in-room tablet**
device on the right with a breathing copper mic orb, property/language pills and a live
guest exchange that rotates. Marquee sits full-bleed beneath. Three states shipped.

### `/company` (§5)
Card-less editorial. Copper `COMPANY` eyebrow, large left-aligned italic-accented H1,
General Sans body on a ~58ch measure. `#company-why-hotels` is set as the emotional peak:
the passage runs in a 7-col left column with the **"walked out the door…" line pulled out
as an italic copper blockquote** in the 5-col right column, closing on "Hotel Companion
exists to keep it." in display serif. Contact channels are hairline rows, not cards.
Final CTA band sits on `--surface-5`.

## 3 · Gates (Design & Interaction Spec §8 / Visual Parity §8)

Measured in-browser at 1280 (computed styles, not eyeballed):

| # | Gate | `/company` | `/` |
|---|---|---|---|
| 1 | No centered sections | **PASS** — 0 of 11 | **FAIL** — 17 of 18 still centered (Home body not yet rebuilt) |
| 2 | Every major section has a visual | partial — the editorial pull-quote carries the peak | **FAIL** — only the hero has a visual so far |
| 3 | Display serif + italic accent; zero Cormorant/DM Sans | **PASS** — Fraunces 530, `<em>` accent present, grep clean | **PASS** |
| 4 | Asymmetric grid present | **PASS** | **PASS** (hero) |
| 5 | Ambient banding, no two adjacent sections share a surface | **PASS** — 0 collisions | **FAIL** — 2 collisions in the un-rebuilt body |
| 6 | Reads as the same family as RC | **PASS** at 390 and at the pane's desktop width | hero yes; page no |

Type check on both pages: `h1` = Fraunces, weight 530, `text-align: start`; body = General Sans;
eyebrow = Spline Sans Mono. Headline holds measure at 390 with no overflow or hyphenation.

### Screenshot note
The in-app browser pane reliably captures at its native width and at 390, but its compositor
intermittently mis-renders after a programmatic resize to 1440 (paints only the top-left
region while the DOM measures correctly at full width). The 1440 gate was therefore verified
by **computed-style and geometry measurement** rather than by image at that exact width;
390 and desktop-native were verified visually. Worth re-shooting on a real browser at 1440
before sign-off.
