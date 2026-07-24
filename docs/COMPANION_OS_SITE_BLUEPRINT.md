# Companion OS — Site Blueprint

**The reusable playbook for building an Axionari "Companion OS" marketing site**
(Hotel Companion, Restaurant Companion, and the next verticals).

This is the distilled system behind hotelcompanion.ai. Follow it to stand up a
new Companion site — same editorial grammar, same design language, same
device-UI vocabulary — with a fraction of the effort. It documents the *why*
and the *exact values*, not just the *what*.

> Source of truth in code: `src/app/tokens.css` (tokens), `src/app/globals.css`
> (animations/utilities), `src/components/v5/*` + `src/components/cds/*`
> (components), `src/lib/i18n/marketing/*` (copy).

---

## 0. First principles (the RC editorial grammar)

Everything derives from one rule, measured off restaurantcompanion.ai:

> **One section = one message + one artifact.**
> A section states a single idea (a serif headline), supports it with one line
> of deck copy, and proves it with exactly one designed artifact (a device
> screen, a diagram, a chip cluster, a ledger). No section does two jobs.

Supporting principles:

- **Calm register.** Near-black bed, one warm accent, generous whitespace,
  serif display + mono eyebrows. The design never shouts; the *content* lands.
- **Show, don't assert.** "It adapts to every surface" is proven by a device
  that structurally changes per surface, not by a bullet. "Tracked from
  creation to completion" is a live ticket, not a claim.
- **Numbered acts.** Pages read as a narrative: `01 · THE VOICE`,
  `02 · THE KNOWLEDGE`, … Each act is one `<Act>`.
- **Bilingual by construction (EN + ES).** Every string lives in a copy module
  with enforced parity. Never hard-code visible text in a component.
- **Fail-open motion.** Animations are progressive enhancement. Reduced-motion
  and no-JS always render the composed, readable still.

---

## 1. Brand tokens

All tokens live in `src/app/tokens.css` as CSS custom properties on `:root`.
Never inline a raw hex that duplicates a token — reference the variable.

### Color — near-black bed, one copper accent, one gold

| Token | Value | Use |
|---|---|---|
| `--bg` | `#100e0c` | page bed (everything sits on this) |
| `--surface-1..5` | `#141210 → #261e15` | tonal ladder; adjacent sections step one level (ambient banding). `--surface-5` is the warmest lift (CTA/enterprise bands) |
| `--device-frame` | `#0d0d0f` | device bezels |
| `--accent` | `#c86a3a` (rgb 200,106,58) | **the** copper accent — CTAs, eyebrows-accent, active states, diagram lines |
| `--accent-bright` | `#d4824f` | hover/emphasis |
| `--accent-deep` | `#a9541f` | pressed |
| `--accent-soft` | `rgba(200,106,58,.13)` | tinted fills (reply bubbles, badges) |
| `--accent-hairline` | `rgba(200,106,58,.28)` | 1px accent borders |
| `--text` | `#f7f6f1` | primary warm off-white |
| `--text-dim` | `rgba(251,248,242,.7)` | body/secondary |
| `--text-faint` | `rgba(251,248,242,.52)` | tertiary/microcopy (use sparingly — see Legibility) |
| `--border` / `--border-soft` | `rgba(251,248,242,.1)` / `.06` | hairlines |
| `--gold` | `#c9a15a` | **one** brand gold — Axionari wordmark, gold captions. Not a second accent. |
| `--champagne` | `#e7ce86` | serif-italic emphasis, gold captions |
| `--success` `#5b8c6e` / green `#2D9E6B` | revenue/positive figures (ledgers, dashboards) |
| `--money` `#d9a441` | receipt amounts |

**Rule:** one accent (copper), one gold, near-black everything else. Green only
for money/positive outcomes. Never introduce a new hue for decoration.

### Typography — three faces, loaded via `next/font`

Configured in `src/app/layout.tsx` (`display: swap`, `preload: false`, exposed
as CSS variables). Never add a runtime font `<link>`.

| Role | Family | Variable | Notes |
|---|---|---|---|
| Display / serif | **Fraunces** (variable) | `--font-serif` | Headlines at weight **530**; italic accent at **480**. This is the voice of the brand. |
| Body / UI | **General Sans** (self-hosted woff2 in `public/fonts`) | `--font-sans` | 400/500/600/700. Decks, chips, device UI. |
| Eyebrow / mono | **Spline Sans Mono** | `--font-mono` | ~10.5px, letter-spacing `.18–.26em`, UPPERCASE. Labels, statuses, `01 · THE ACT`. |

Type scale (fluid `clamp`):
- Act headline: `clamp(30px, 4vw, 52px)`, weight 530, `line-height 1.1`, `letter-spacing -0.012em`, `max-width 22ch`.
- Hero headline: `clamp(34px, 5vw, 64px)`.
- Deck (`.body-lead`): `~clamp(16px,1.7vw,21px)`, `color var(--text-dim)`, `max-width 52ch`.
- Closing/coda line: serif `clamp(20px, 2.2vw, 27px)`, `max-width ~26ch`.
- Eyebrow: mono `~11px` / `.eyebrow-accent` colors it `--accent`.

### Spacing & layout

- Container: `--container: 1200px` (RC width). Reading measure `--measure: 62ch`.
- **Section rhythm** (the `<Band>` component):
  - normal `paddingBlock: clamp(104px, 14vw, 190px)`
  - `tight`  `paddingBlock: clamp(72px, 9vw, 128px)`
- Device radii: `--device-radius: 44px` (`38px` mobile), `--bezel: 10px` (`7px` mobile).
- Motion tokens: `--ease-standard: cubic-bezier(.22,.61,.36,1)`, `--ease-emphasis: cubic-bezier(.2,.8,.2,1)`, `--dur-fast/base/slow: 180/240/420ms`.
- Reveal travel: `--reveal-distance-mobile: 16px`, `--reveal-distance-desktop: 24px`.

---

## 2. Layout system & narrative architecture

### The building blocks (`src/components/v5/Editorial.tsx`)

- **`<Band id tight>`** — the section wrapper. Owns vertical rhythm + `id` for
  scroll anchors. Everything is inside a `container-rc`.
- **`<Act no label statement deck>{artifact}</Act>`** — the canonical section:
  renders the mono eyebrow (`01 · THE VOICE`), the serif `statement`, one deck
  line, then the artifact as `children` (with `mt-14`). This is 90% of every
  page.
- **`<QuietChips items>`** — outlined pill cluster (calm capability lists).
  Responsive: compact on mobile (`px-3.5 py-2`), full size `sm:` up.
- **`<NumberedList items>`** — RC's `01..05` hairline principle rows.
- **`<TenantStack tiers caption>`** — the "where the layer sits" architecture
  stack (org → product → foundation), product tier highlighted.
- **`<Breather image>` / `<MediaBed poster>`** — full-bleed photographic
  interludes between acts (the "breathing room").

### Page = a sequence of numbered acts

Each Companion page is a narrative. The Hotel Companion reference structure:

- **Home** — Hero (device) → `THE PROBLEM` (FragmentScatter) → IntelligentLayer
  → the guided in-room flow (SuiteShowcase) → QuestionMarquee → the lifecycle →
  operations feed (live ledger) → "value before integration" → CTA.
- **Platform** — `01 THE VOICE` (VoiceMorph) → EverySurface → NextSurface →
  `02 THE KNOWLEDGE` → `03 THE LIFECYCLE` (JourneyWalkthrough) →
  `04 THE ACTION` (TwoStageAlert + PassThrough) → `05 INTELLIGENCE`
  (DashboardShowcase) → CTA.
- **Solutions** — hero → per-segment acts, each a *different* layout (chips /
  cards / device / paragraphs) so the page never feels templated.
- **Enterprise** — flat hero (no device) → shared-intelligence acts →
  TenantStack → `ENTERPRISE OUTCOMES` (OutcomeBand) → closing MediaBed CTA.
- **Company / Resources / Demo / Contact** — calmer editorial register.

**Rule:** vary the artifact per act. If two consecutive acts both use chips, one
is wrong. Rotate: device screen → diagram → chips → statement → ledger.

---

## 3. Component library

### Device UIs — "every answer is a picture"

The signature move: the Companion is **voice-first and visual**, never a text
chatbot. Every device screen resolves a spoken question into a *picture card*.

- **`TabletOS`** (`components/cds/TabletOS.tsx`) — the in-room tablet. Left rail
  = `VoiceOrb` + "SPEAK OR TOUCH" + property + service tiles (the active tile
  lights copper, synced to the on-screen answer). Right = full-bleed `Canvas`
  (image with top+bottom scrims for text) or card layouts. Bottom = chat bar.
  Status bar = property chip (pulsing dot) + LISTENING. Screens: home, beach/
  cenote, roomservice, upgrade, spa, concierge, issue, followup.
- **`CompanionTablet`** (`components/v5/CompanionTablet.tsx`) — the pre-arrival
  surface. Left rail "SPEAK OR TYPE" + pill tabs; right side **alternates
  layout** per screen (hero / choices / cards) so a viewer sees the range.
  Value badges (e.g. `$71 LESS THAN THE OTA`). Context pills below to jump.
- **`SuiteShowcase`** (`components/v5/SuiteShowcase.tsx`) — the full guided
  booking flow (welcome → browse → suite → stay → availability → review → pay →
  confirmed → loyalty), auto-advancing with a segmented control above and a
  persistent `VoiceBar` (orb + equalizer + "LISTENING — JUST KEEP TALKING")
  under every screen.
- **`VoiceOrb`** (`components/cds/VoiceOrb.tsx`) — the animated mic orb. States:
  `idle | listening | thinking | speaking`. Two concentric rings + radial glow
  + conic shimmer; `speaking` swaps the mic glyph for a `.vwave` equalizer.
  Ported 1:1 from RC's Features page. `VoiceOrbControl` is the button variant.

**Device chrome grammar (reuse verbatim):** property chip = mono UPPERCASE +
pulsing `--accent` dot; live status = mono + dot; answers = large serif; body =
sans; images = full-bleed `object-cover` + slow Ken-Burns under a top/bottom
scrim gradient. `data-device-ui=""` marks device text so it's excluded from
reading-copy word measures.

### Diagrams (`components/v5/Diagrams.tsx`)

All share the `useArmedIn()` reveal gate and an aspect-locked SVG coordinate
system (container `aspect-ratio` == `viewBox`, no `preserveAspectRatio:none`
stretch — otherwise line endpoints miss their chips).

- **`FragmentScatter`** — "the before": systems orbit a central entity ("The
  guest"), connected by dashed lines that **flow** (marching-ants) toward the
  center but never resolve, each ending in a pulsing anchor dot. The Axionari
  constellation. (No × marks, no failure labels — the motion carries it.)
- **`PassThrough`** — the vertical pass-through: one interaction → the layer →
  the systems you already run. Center node glows; mono connector labels
  (`CONTEXT ATTACHED`, `ROUTED · NOTHING RE-KEYED`).
- **`ArrowFlow`** — numbered step flow with arrows.
- **`OutcomeBand`** — the approved Axionari outcomes row (Better Decisions /
  Faster Execution / Organizational Alignment / Continuous Learning) as four
  numbered cards.

### Interactive moments (`components/cds/interactive.tsx`)

- **`VoiceMorph`** — five named voices, one guest question; picking a tone
  cross-fades the same reply into that voice. Voice-first device: orb (speaking)
  + equalizer + the tone named beside a large spoken serif reply.
- **`TwoStageAlert`** — the 2 AM save. Left: the voice exchange device. Right: a
  **live request ticket** (header + OPEN status + stages firing down a timeline)
  — so "tracked from creation to completion" is an on-screen artifact.

### Chrome & conversion

- **`SiteNav`** — `fixed top-0`, auto-hides on scroll-down / reveals on
  scroll-up; backdrop-blur; wordmark + links + `See It Live` (opens LiveDemo) +
  `Book a Demo` (→ `/demo`) + language toggle; mobile drawer with focus trap +
  scroll-lock + Esc.
- **`StickyCta`** (`components/cds/StickyCta.tsx`) — persistent conversion CTA
  (RC keeps its CTA pinned; our nav hides). Reveals past 640px scroll: desktop
  pill bottom-right, mobile bottom bar (safe-area aware). Mounted once in the
  root layout; hidden on `/demo` + product-app routes.
- **`EndorsementMark` / `AxionariMark` / `AxionariGlyph`** — the family lockups.
  `POWERED BY [glyph] AXIONARI` with the gold "A" mark (matches
  axionari-mark.svg on RC); AXIONARI text stays gold.
- **`SiteFooter`** — wordmark, four link columns, one-line OS + Axionari
  endorsements, legal line.

---

## 4. Animation system

**The golden rule: fail-open.** Motion is a `.v5-layer` gate that arms only if
JS runs *and* reduced-motion is off *and* the element enters from below; on
reveal it adds `.in`. No-JS / reduced-motion / already-on-screen → the composed
still renders immediately.

### The reveal gate (in `globals.css` + `useArmedIn()`)

```
.v5-layer .lg-item  { transition: opacity .8s, transform .8s; }
.v5-layer.armed:not(.in) .lg-item { opacity: 0; transform: translateY(14px); }
.v5-layer .lg-line  { transition: opacity 1.1s; }   /* opacity only */
.v5-layer.armed:not(.in) .lg-line { opacity: 0; }
```

`.lg-line` owns **opacity** (the reveal) so any looping animation on the same
element must touch only `stroke-dashoffset` / `r` / `transform` — never
opacity — or it fights the gate.

### Signature keyframes (all stilled under `prefers-reduced-motion`)

- `v5-frag-flow` — marching-ants `stroke-dashoffset` on FragmentScatter lines.
- `v5-frag-pulse` — anchor-dot `r` pulse.
- `v5-drift-a/b` — slow satellite drift.
- `v5-eq` / `.vwave` — voice equalizer bars (`vbar`).
- `pc-dot-pulse` — the live status dot.
- `v5-kenburns` / `tablet-kenburns` — slow image pan inside devices.
- `journey-progress` — the dwell bar in JourneyWalkthrough.

### Discipline

- Every `@keyframes` used gets a `@media (prefers-reduced-motion: reduce){ … animation:none }`.
- Cross-fades use `--dur-slow` + `--ease-emphasis`; reveals use `--ease-standard`.
- Sequential (not simultaneous) cross-fades for wrapping text: outgoing → 0 in
  160ms, incoming waits 160ms, so two lines never overlap at 50% opacity.
- Auto-advancing showcases pause on hover/focus and expose click-to-jump.

---

## 5. Imagery

The look lives or dies on photography. Rules:

**Sourcing (free commercial licenses only):**
- **Unsplash** (Unsplash License) and **Pexels** (Pexels License) — free for
  commercial use, no attribution required. Also acceptable: Pixabay, Mixkit.
- Curated luxury set in `public/assets/lux/`; device UI crops in
  `public/assets/ui/`; section breathers in `public/assets/breathers/`.
- **Always record provenance** in `public/assets/lux/CREDITS.md` (source URL,
  license, what it's used for, "swap-ready").

**Selection do's / don'ts:**
- Match the destination: a Riviera Maya hotel needs Caribbean/cenote/jungle,
  **not** a Rajasthani palace or a corporate lobby. Verify every photo visually
  before shipping.
- **Never use a recognizable branded/competitor landmark** (e.g. the Hotel
  Xcaret cove, the Suytun platform). Use *wild/natural* or generic scenes.
- Identify what you ship: research the actual place (we mislabeled a cenote as
  "Gran Cenote"/"Samulá" when it was Cenote Oxman — the rope swing gave it away).
- Prefer images with a clear subject band and room for top/bottom text scrims.

**Processing (via `sharp`, already a dep):**
- Convert to **webp**, quality ~80–82.
- Crop portrait stock to the target ratio (device canvases ~3:2 / 4:3); center
  on the subject. Aim < ~250–500 KB per hero image.
- Example: fetch high-res → `sharp(src).extract({landscape band}).resize({width:1500}).webp({quality:80})`.

---

## 6. i18n & copy governance

- Copy modules live in `src/lib/i18n/marketing/<module>.ts`, exporting
  `{ en, es }` typed `Localized<typeof en>` with `const es: typeof en = {…}` so
  **parity is compiler-enforced** (add a field to `en`, TS makes you add it to
  `es`).
- Components read copy via `useCopy(module)`; global strings via `useLang()` /
  `translations.ts`. **No visible string is ever hard-coded in a component.**
- Device-UI microcopy (LISTENING, statuses, ticket labels) is *also* localized.
- **Copy-governance:** any new *positioning* claim ships behind a `NEEDS
  CONFIRM` marker; illustrative device content (fictional prices, sample
  cenote names) is fine but must be plausible and non-branded.

---

## 7. Performance & hardening

Already-in-place practices to keep:
- **Static-first:** every marketing route prerenders (`○ Static` / `● SSG`).
- **Fonts** via `next/font` (`display:swap`, `preload:false`); General Sans
  self-hosted → zero third-party font requests at runtime.
- **Images** are webp, sized to use, lazy by default (background-image / plain
  `<img>`); the LiveDemo modal is a **deferred chunk**.
- **Motion** is CSS-driven and gated (no JS animation loops pinning the main
  thread); rAF-throttled scroll listeners; bounded retry loops (never unbounded
  rAF chains).
- Gate checklist before shipping: `npx tsc --noEmit` (0 errors) · `npx eslint .`
  (0 errors) · `npm run build` (all routes compile, static pages generate) ·
  `npx vitest run` (green).
- Cross-browser: use standard CSS; pair vendor-prefixed props
  (`-webkit-backdrop-filter` beside `backdrop-filter`); rely on flexbox/grid +
  relative units so Chrome/Edge (Chromium), Safari (WebKit) and Firefox (Gecko)
  agree. Respect `env(safe-area-inset-*)` on fixed mobile bars.

---

## 8. Verification workflow

Headless visual verification (how every change in this repo was checked):
- `playwright-core` driving the installed **Chrome for Testing**, at
  `deviceScaleFactor: 1` (dsf 2 corrupts pages taller than 16384px).
- **Crawl-scroll** the page (step `window.scrollTo` down in ~300px increments)
  to trip the reveal `IntersectionObserver`s before screenshotting.
- Screenshot the specific element (`[data-device-ui]`, an `#anchor`) rather than
  the full page. Disambiguate multiple devices by inner text (e.g. "SPEAK OR
  TOUCH" = TabletOS vs "SPEAK OR TYPE" = CompanionTablet).
- The dev-mode **"N" indicator** (Next.js) floats bottom-left and is **not** in
  the shipped DOM — ignore it in QA.

---

## 9. Standing up a NEW Companion site (checklist)

1. **Fork the system**: copy `tokens.css`, `globals.css`, `src/components/v5/*`,
   `src/components/cds/*`, the Editorial primitives, and the i18n scaffolding.
2. **Re-skin tokens** only if the vertical demands it — but the copper/gold/
   near-black system is the Axionari house style; change photography, not hues.
3. **Write the narrative first** (the acts). One message + one artifact each.
   Fill `src/lib/i18n/marketing/*` EN+ES before touching components.
4. **Assemble pages** from `<Act>` + the artifact library; rotate artifact types.
5. **Source & process imagery** (§5) into `/assets/lux` + CREDITS.
6. **Localize** all copy; keep `es: typeof en` parity.
7. **Wire the device UIs** to the vertical's "answer is a picture" moments.
8. **Add StickyCta + nav + footer + Axionari endorsement**.
9. **Run the gate checklist** (§7) and verify visually (§8).
10. **Deploy** (§10).

---

## 10. Deployment & domains

- **Repo:** `github.com/Axionari/placecompanion` (Vercel-linked, `main` =
  production). `vercel.json`: `framework nextjs`, `buildCommand npm run build`.
- **Ship:** fast-forward `main` to the release branch → push `origin main` →
  Vercel builds & deploys production.
- **Primary domain:** `www.hotelcompanion.ai` (set `metadataBase` in
  `layout.tsx` accordingly — already done).
- **Retiring a domain (safely):** host-based redirect in `next.config.ts`
  (`has: [{type:'host', value:'…'}]` → `destination`, `permanent:false`/307 so a
  *temporary* retirement isn't cached as a permanent 308). **Gate it behind an
  env flag** — enabling the redirect before the target domain is attached + DNS
  live would forward the live site to a dead domain. Order: attach the new
  domain in Vercel → point DNS → confirm it serves → set the flag
  (`RETIRE_PLACECOMPANION=1`) + redeploy. Only then does placecompanion.com
  307→ www.hotelcompanion.ai.
- **DNS / domain attach** is done in the Vercel dashboard + registrar (add the
  domain to the project, point A/CNAME records). This step is account-gated and
  handled by an operator, not in code.

---

*Maintainer note:* when in doubt, open restaurantcompanion.ai and measure. This
whole system was derived by reading RC's live values — that is the reference
implementation, and hotelcompanion.ai is the first adaptation of it.

---

## Open design debt

Two decisions taken deliberately, recorded so they are not rediscovered as bugs.

### 1. Retired components stay for now — do not delete

`ConvergenceDiagram` and `IconChipGrid` in `src/components/cds/blocks.tsx` lost
their last consumer when `/companion-os` moved to the v5 grammar. They are
**intentionally kept**.

While the design system is still moving, they are part of the exploration
archive — cheap to keep, and worth borrowing from later. The code savings are
negligible and deleting during active iteration buys nothing. Remove them in a
dedicated cleanup pass once the system has stabilised, not as a side effect of
a feature change.

### 2. `/companion-os` needs a signature v5-native diagram

Dropping `ConvergenceDiagram` left the architecture page more text-led than it
should be. **Do not restore the legacy component.** The page should eventually
own a purpose-built, v5-native conceptual diagram.

This is not just another illustration. The intent is *the* defining visual of
the product — the thing people remember, in the way AWS has its cloud diagrams,
Stripe its payment flow, Snowflake its data cloud. One memorable diagram, not
ten.

What it has to explain at a glance: everything above the line feeds in —
guests, staff, departments, knowledge, properties — through the **Hospitality
Intelligence Operating System**, and out the other side come insights, actions,
revenue and experiences. Many inputs, one layer, compounding outputs. (That
sketch is the *idea*, not the layout.)

Constraints when it gets built: v5 language only — hairline rules, mono labels,
serif statements, the `--accent` terracotta, `useArmedIn()` reveals; no filled
card boxes. See `Diagrams.tsx` for the existing vocabulary (`FragmentScatter`,
`PassThrough`, `ArrowFlow`, `OutcomeBand`).

Scheduled for a future design pass — deliberately not this sprint.

---

## Category Principles

Not copy — the lens. Every future page, feature, diagram, animation and
investor deck gets evaluated against these. If a proposed section cannot be
traced back to one of them, it probably does not belong on the site.

1. **Hotel Companion is the Hospitality Intelligence Platform.**
2. **The platform is powered by the Hospitality Intelligence Operating System.**
3. **Every guest conversation becomes shared operational intelligence.**
4. **Intelligence is shared across departments, not isolated inside
   conversations.**
5. **Hospitality comes before AI.**
6. **The platform augments people rather than replacing them.**

Principles 3 and 4 are the load-bearing pair: the first says a conversation is
an *input*, not the product; the second says its value is only realised when it
leaves the conversation. Most competitor messaging stops at 3. Everything the
site claims about departments, routing and compounding knowledge is downstream
of 4.

Principles 5 and 6 govern register as much as substance. They are why the site
leads with the guest and the property rather than the model, and why "not a
staff replacement" is stated as confident positioning rather than reassurance.

See `TERMINOLOGY.md` for the vocabulary and `BRAND.md` for the voice.
