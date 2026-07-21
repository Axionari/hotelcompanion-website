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

## 2 · Build state — every page re-skinned

The full Level-Up plan has been executed: foundation, media pipeline, block vocabulary,
and all nine marketing pages. Approved EN/ES copy was never edited; the only authorized
change was the `$47B`/Medallia → `$160B`/McKinsey stake swap, and long noun-stacks are
chipped **at render time** (`.slice(0,10)`, sentence-boundary detection) rather than by
touching the copy modules.

### Media
`handoff/fetch-assets.sh` was read before running (it only curls Pexels media into
`public/assets`). Raw downloads were **245 MB**, which is unshippable, so every asset was
processed locally: loops cut to 8s at 1280w, audio stripped, darkened ~16% with a warm
copper grade, encoded VP9 webm + H.264 mp4 with poster frames; stills to webp. **Total
committed media: 7.1 MB.** Source URLs recorded per asset in `CREDITS.md`.

### Block vocabulary built
StatBlock (count-up), IconChipGrid, RoutingFlow, JourneyTimeline, ConvergenceDiagram,
NodeDiagram, CapabilitySurface, DashboardMockup (91/9 donut), Accordion, MediaBed,
AccentHeadline — plus the two interactive moments RC does not have: **VoiceMorph**
(five named voices, one reply) and **TabbedDeviceWalkthrough**, and the **TwoStageAlert**.

### Per-page composition

| Page | Sections | Signature visuals |
|---|---|---|
| `/` | 13 | hero video loop + in-room tablet, $160B stat block, marquee, tabbed device walkthrough, knowledge chips, dashboard, routing flow, convergence, timeline, accordion, CTA band |
| `/platform` | 16 | tablet hero, VoiceMorph, knowledge split, NodeDiagram, lifecycle timeline, TwoStageAlert, RoutingFlow, DashboardMockup |
| `/solutions` | 6 | interactive 9-department index (rail swaps panel), photography band, hairline segment index |
| `/enterprise` | 16 | convergence, chip grids, DashboardMockup, deploy/grow timelines, "Not a…" quadrant — warmest banding |
| `/companion-os` | 15 | NodeDiagram, ConvergenceDiagram signature, 8 deep-dives, workflow step flow, ecosystem family row |
| `/company` | 11 | lobby still in the hero right column, reception photo behind the copper pull-quote |
| `/resources` | 8 | essay card grid + filter pills, ambient hero bed |
| `/demo` | 10 | photographic hero, FAQ accordion, real form states |
| `/contact` | 7 | lobby hero bed, channel rows, FAQ accordion |

## 3 · Gates — final result

Measured in-browser at 1280 (computed styles and geometry, not eyeballed):

| Page | Centered sections | Adjacent same surface | H1 left + italic accent | Visuals |
|---|---|---|---|---|
| `/` | **0** | 0 | ✓ | 8 |
| `/platform` | **0** | 0 | ✓ | 6 |
| `/solutions` | **0** | 0 | ✓ | 5 |
| `/enterprise` | **0** | 0 | ✓ | 6 |
| `/companion-os` | **0** | 0 | ✓ | 7 |
| `/company` | **0** | 0 | ✓ | 3 |
| `/resources` | **0** | 0 | ✓ | 2 |
| `/demo` | **0** | 0 | ✓ | 2 |
| `/contact` | **0** | 0 | ✓ | 2 |

- **Type:** every page renders Fraunces (display) / General Sans (body) / Spline Sans Mono
  (eyebrow). `grep` confirms zero Cormorant and zero DM Sans references remain.
- **Spanish:** spot-checked in-browser on `/`, `/platform`, `/company` — italic accents,
  zero centered sections and full visual parity hold in ES. The automated ES parity gate
  (`scripts/check-es.mjs`) reports every module 89–100% translated; each remaining identical
  string is a proper noun, a numeral, or a deliberately-English brand term.
- **Three states:** server HTML carries full text and poster imagery with **zero**
  server-hidden reveal elements, so no-JS renders composed stills. `prefers-reduced-motion`
  is handled in `globals.css` plus six components (marquee static-wraps, video never mounts,
  cross-fades become instant swaps).
- **Mobile 390:** verified visually — headline holds measure with no overflow in EN and ES,
  thumb-zone CTA present.
- **Stats:** exactly two unverified figures on the site, both `NEEDS CONFIRM` in EN and ES —
  `$160B` (McKinsey) and `91%/9%`. Dashboard sample metrics carry `NEEDS REAL DATA`.

### Screenshot caveat (unchanged, and worth acting on)
The in-app browser pane captures reliably at 390 and at its native desktop width, but its
compositor intermittently mis-paints after a programmatic resize to 1440 — and returns black
frames for content below the first viewport. The 1440 gate and all below-fold blocks were
therefore verified by **computed-style and geometry measurement**, which is stronger evidence
for the structural gates but is *not* a substitute for a human eyeball on the mid-page
composition. **Recommend one pass on a real browser at 1440 before sign-off.**

## 4 · Superseded sections below (kept for the record)

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

## 5 · Voice interface tier (mic always visible · chat everywhere · sequenced revenue)

### The mic, ported from RC
Values were read from the live Restaurant Companion Features page rather than guessed:
two concentric rings (`r1` inset 0, `r2` inset 16%), a radial glow at inset 22%, and a
conic shimmer at inset 16% masked into a ring, all driven by `data-state` across
**idle → listening → thinking → speaking**, with waveform bars while speaking. Every
animation sits behind a `.live` class, so `prefers-reduced-motion` renders the static glow.

RC shows this orb inside one section of `/features`. Here it is everywhere:

- **In-device, always.** The mic moved out of the tablet's home screen and into its
  persistent chrome, so it is present on every screen the device shows and is never
  hidden behind a state. The filmstrip used for reduced-motion and no-JS carries the
  same chrome.
- **Chat beside it, always.** The same chrome carries a chat affordance (input + send).
- **Persistent launcher.** A standing mic on every page opens a chat panel with the orb,
  a message thread, a text input and suggestions. Responses are a scripted sample of the
  exchanges the tablet shows, labelled "sample responses" — a demo, not a live model.
- **Voice-only is the call surface alone.** Verified by stepping all eight surfaces in
  `SurfaceFan`: tablet, phone, web, watch, QR and both emerging surfaces render mic +
  chat; the voice-call surface renders a waveform and "described aloud — no image" with
  neither.

### The revenue block
"Every Conversation Is Revenue" is one pinned two-column showcase — tablet left, stages
right, one at a time — replacing a scroll-synced version that gave each of six steps its
own viewport. It auto-advances with a dwell bar, pauses on hover or focus, and offers
step dots (44×44) and click-to-jump. Stage → screen mapping verified end to end:

| Stage | Screen shown |
|---|---|
| 01 · PRE — They book direct. | property / home |
| 02 · PRE — The first upsell, before arrival. | Ocean-View Suite carousel ($250) |
| 03 · DURING — Every answer is a picture. | Akumal beach image answer |
| 04 · DURING — Room service, tapped not typed. | dish grid + order total |
| 05 · DURING — Wellness, booked in one tap. | spa cards |
| 06 · AFTER — The review earns the next booking. | follow-up + review link |

A copper revenue tally rises across the acts. **Height: 1.13 viewports at 1440**
(1.41 at 390), against roughly six for the version it replaced.

### Gates for this tier

| Check | Result |
|---|---|
| Mic present in every device instance | **PASS** — all 9 pages |
| Chat on every visual surface | **PASS** — 7 of 8 surfaces; call is voice-only by design |
| Launcher present site-wide | **PASS** — all 9 pages |
| No centered sections / no adjacent-surface collisions | **PASS** — all 9 pages |
| Fonts | Fraunces / General Sans / Spline Sans Mono only |
| EN + ES parity | **PASS** — verified on `/` and `/platform` in both languages |
| Reduced-motion / no-JS | orb static, sequence frozen with every stage expanded, filmstrip beside the tablet |

One note carried forward unchanged: the in-app browser pane mis-paints below the fold and
after resizing to 1440, so the sequenced block and the surface fan were verified by
stepping them programmatically and reading computed state, plus hero screenshots at 390
and desktop width. A human pass at 1440 on a real browser is still the last step.
