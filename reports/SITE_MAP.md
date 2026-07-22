# SITE_MAP — Hotel Companion (branch `v3`, forked from production commit `3057618`)

RECON deliverable for `docs/v3/specs/PHASE_0_FORK.md` step 6. All later phase
instructions bind to the file paths in this map.

## Stack

- **Framework:** Next.js `^16.2.10` (App Router, turbopack), React `19.2.3`, TypeScript 5.
- **Styling:** Tailwind CSS 4 (`@tailwindcss/postcss`) + `src/app/globals.css` + `src/app/tokens.css` (design tokens). Icons: `lucide-react`. Charts: `recharts` (legacy pages).
- **Routing:** App Router under `src/app/`. Marketing pages: `/` (`page.tsx` → `HomeClient.tsx`), `/platform`, `/solutions`, `/enterprise`, `/companion-os`, `/resources`, `/company`, `/contact`, `/demo`, plus legal (`/privacy`, `/terms`, `/cookies`, `/security`, `/responsible-ai`, `/trust`, `/accessibility`) and legacy app routes (`/auth`, `/dashboard`, `/onboarding`, `/assistant`, `/api/*`).
- **Deploy reality (Phase 0 finding):** the live domain `placecompanion-v2-ecru.vercel.app` is served by Vercel project `placecompanion-v2` **in the personal account** (`prj_URgtRtpSboRVjydImXgFUHAPT4t7`, team `eduardovertiz-dotcoms-projects`), production deployment built from `feat/hotel-companion` @ `3057618` via CLI. The Axionari-team project of the same name serves the older `main` site. The personal project has **no git integration** — previews are CLI-deployed (`npx vercel deploy` from a checkout of `v3`). See `OPEN_QUESTIONS.md` OQ-1/OQ-2.

## Commands

- `npm run dev` — dev server · `npm run build` — production build (turbopack)
- `npm run lint` — eslint · `npm test` — vitest (`src/lib/demo/marazulDemo.test.ts` etc.)
- Preview deploy: `npx vercel deploy --yes` (project linked via `.vercel/project.json`, gitignored; requires `vercel whoami` = axionari)

## i18n mechanism

Marketing copy modules in `src/lib/i18n/marketing/*.ts` each export `Localized<T>` = `{ en, es }` (ES mirrors the EN shape). Components call `useCopy(module)` (`src/lib/i18n/useCopy.ts`), which selects by the active language from `LanguageContext` (`src/lib/i18n/LanguageContext.tsx`): default `en`, hydrated from `localStorage['pc_lang']` or `navigator.language`, toggle persists + syncs `<html lang>`. A **legacy store** `src/lib/i18n/translations.ts` (896 lines, `useLang().t`) still feeds older components — notably `QuestionMarquee` (`t.realQuestions.row1/row2`).

> Verification note: language is client-side, so server-rendered HTML is EN; ES assertions must run against the hydrated DOM (set `localStorage.pc_lang='es'`) — both locales' strings do ship in the JS bundle.

## Homepage structure (`src/app/HomeClient.tsx`, 407 lines)

Copy hooks: `c = useCopy(homeCopy)` (`marketing/home.ts`), `a = useCopy(accents)` (`accents.ts`), `g = useCopy(globalCopy)` (`global.ts`), `screens = useCopy(deviceScreens)` (`deviceScreens.ts`).

In-code eyebrow numbering runs **01–15** (the brief's "15 sections"); physically there are 19 top-level bands (15 numbered + trust strip + unnumbered TabletOS cinematic + 2 `Breather` interstitials), plus nav / PersistentCTA / footer.

| Old # | Line | Band (DOM id) | Components (`src/components/cds/`) | Copy keys | Media |
|---|---|---|---|---|---|
| 01 | 53 | HERO `#home-hero` | `MediaBed`, `MultiAccentHeadline` (`AccentHeadline.tsx`), `EndorsementMark`, `HeroIgnition` (orb) | `hero.*`, accents `a.homeHero` | video `hero-coastal-sunset` + poster |
| — | 96 | Trust hairline strip `#home-trust` | inline | `trust` | — |
| 02 | 105 | OTA stake ($160B) | `StatBlock`, `CommissionCompare` (`blocks.tsx`) | `otaStake.*` | — |
| 03 | 116 | THE STAKE (2–3×) `#home-stake` | `StatBlock` | `stake.*` | — |
| 04 | 128 | CONVERSATION `#home-conversation` | `Reveal`, `QuestionMarquee` | `conversation.*`; marquee: legacy `t.realQuestions` | — |
| 05 | 159 | PRE·DURING·AFTER `#home-revenue` (revenue journey) | `Section`, `JourneyWalkthrough` (revenue stepper → `+$402`) | `revenue.title`, `journey.*` (`steps[].tally`, `tallyLabel`) | TabletOS screens |
| 06 | 166 | EVERY SURFACE (Interface of 2029) | `DeviceWall` | `surfaces2029.*` | device internals |
| — | 175 | Product-big cinematic (unnumbered) | `TabletOS` (`screen="beach"`, `orbState="speaking"`) | `surfaces2029.caption` | `/assets/ui/beach-akumal.webp` |
| 07 | 202 | KNOWLEDGE (dual lists) | `IconChipGrid` ×2 | `knows.*` (property/destination) | — |
| 08 | 224 | INTELLIGENCE (91% ring) | `IconChipGrid`, `ResolutionDonut` (91/9), `Teaser` | `intelligence.*`, `enterpriseIntel.*`, `dashboard.*` | — |
| — | 253 | Breather `#band-home-tree` | `Breather` | — | `breathers/giant-tree.webp` |
| 09 | 256 | EXECUTION | `RoutingFlow`, `Reveal` | `execution.*` | — |
| 10 | 271 | COMPANION OS `#home-companion-os` | `ConvergenceDiagram`, `CapabilityStrip` (`Teaser.tsx`), `EndorsementMark` | `companionOs.*`, `convergence.*`; `COMPANION_OS_CAPABILITIES` (`src/lib/capabilities.ts`) | — |
| 11 | 294 | DEPLOYMENT (Live in Days) | `JourneyTimeline`, `Reveal` | `liveInDays.*` | — |
| — | 326 | Breather `#band-home-pause` | `Breather` | — | `breathers/beach-golden.webp` + video `section-tropical-beach` |
| 12 | 329 | BOUNDARIES `#home-what-it-is-not-teaser` | `Reveal`; link `/enterprise#what-it-is-not` | `whatItIsNot.*` | — |
| 13 | 357 | FOUNDING PARTNERS `#home-founding-partner` | `Teaser` (split), `IconChipGrid` | `foundingPartner.*`, `foundingCta` | — |
| 14 | 372 | FAQ `#home-faq` | `Accordion` (`blocks.tsx`) | `faq.*` | — |
| 15 | 379 | FINAL CTA `#home-final-cta` | `MediaBed`, `Reveal`; link `/demo` | `finalCta.*` | `img/ambient-palms-night.webp` (still) |

v3 target mapping (brief §section-by-section): old 02+03 merge → new 02 · old 04 → new 03 · old 05 → new 04 sun arc · old 06 → new 05 constellation · old 07 → new 06 · old 08+09 merge → new 07 · old 10 → new 08 band · old 11 → new 09 · old 12 → new 10 (untouched) · old 13 → new 11 · old 14 → new 12 · old 15 → new 13 ask-bar.

## Nav — `src/components/site-nav.tsx`

- Strings: `globalCopy.nav` (`marketing/global.ts`); live-demo label from `liveDemo.ts` (`demo.open`).
- `NAV_LINKS` (line 12): platform, solutions, enterprise, **companionOs → `/companion-os`** (4th item — G5 removes it), resources, company. Rendered desktop (line 110) + mobile drawer (line 172).
- CTAs: `openLiveDemo` button + primary `/demo` (`nav.bookDemo`). `LanguageToggle` both layouts.

## Footer — `src/components/site-footer.tsx`

- Strings: `globalCopy.footer` (`global.ts` lines 20–119).
- Brand block (`footer.brand.*`, endorsement "Powered by Companion OS."), **5 columns** (Product — includes Companion OS link · Solutions · Resources · Company · Legal), newsletter (local state, no backend), **two essay cards**: `footer.companionOs.*` (centerpiece → `/companion-os`) + `footer.axionari.*` (→ axionari.com), `legalLine`, `signIn`, `LanguageToggle`.
- v3 targets: 4 columns, essays → one line each, endorsement → "Powered by AXIONARI" + "Construido sobre Companion OS →".

## Demo engine (attached to section 05/new 04)

- **Display OS:** `src/components/cds/TabletOS.tsx` (+ `TabletFilmstrip`), screens from `marketing/deviceScreens.ts` (`ScreenId`: `roomservice|spa|concierge|beach|upgrade`).
- **Live demo:** `LiveDemo.tsx` + `LiveDemoModal.tsx` (window event `hc:open-live-demo`), cards `DemoCards.tsx`.
- **Runtime:** `src/lib/demo/useCompanion.ts`, `useSpeech.ts`; scenario data `src/lib/demo/marazulDemo.ts` (`buildMarazulPrompt(lang)`, `parseReply`; cards `beach|suite|dish-grid|spa|map|upgrade`; actions `upgrade|roomservice|spa`); test `marazulDemo.test.ts`. API: `/api/preview-chat` (live LLM — note: v3 ask-bar is scripted, per brief).
- Modal strings: `marketing/liveDemo.ts`.

## Orb & signature components

- **Orb:** `src/components/cds/VoiceOrb.tsx` (`VoiceOrb`, `VoiceOrbControl`; states idle/listening/thinking/speaking). Hero composition: `HeroIgnition.tsx`.
- **Revenue ticker/stepper:** `JourneyWalkthrough.tsx` (tally `+$0 → +$402`); count-up stats: `StatBlock` in `blocks.tsx`.
- **Marquee:** `QuestionMarquee.tsx` (16 questions in legacy `t.realQuestions`).

## Asset inventory (kit-named assets → paths)

| Kit name | Path |
|---|---|
| coastal sunset | `public/assets/video/hero-coastal-sunset.{mp4,webm}` + `public/assets/img/hero-coastal-sunset-poster.webp` |
| luxury lobby | `public/assets/img/luxury-lobby.webp` (also `lobby-modern.webp`) |
| Akumal aerial | `public/assets/ui/beach-akumal.webp`; aerial video `public/assets/video/cta-beach-aerial.{mp4,webm}` + poster `img/cta-beach-aerial-poster.webp` |
| beach golden | `public/assets/breathers/beach-golden.webp` |
| palms night | `public/assets/img/ambient-palms-night.webp` |
| suites | `public/assets/ui/suite-{1,2,3}.webp` |
| dishes | `public/assets/ui/dish-{1,2,3}.webp` |
| (extras) | `breathers/{beach-dusk-walk,giant-tree,waterfall-lagoon,waterfall-swim}.webp`, `img/{hero-poolside,platform-pool-night,company-reception,section-tropical-beach-poster}.webp`, `ui/spa-{1,2,3}.webp`, video `section-tropical-beach.{mp4,webm}` |

Total `public/`: 39 files, 8.9 MB.
