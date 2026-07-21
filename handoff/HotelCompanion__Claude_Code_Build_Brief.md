# CLAUDE CODE — BUILD BRIEF: placecompanion → hotelcompanion.ai on Companion OS

> Run from the repo root of `github.com/Axionari/placecompanion` (Next.js 16 App Router, React 19, Tailwind v4, Supabase, Stripe, Resend, `@ai-sdk/anthropic`, lucide-react, recharts). Deterministic and verifiable. Use the exact values and copy given. **Copy is canonical and lives in two files — `HotelCompanion__Site_Copy.md` and `HotelCompanion__Library_Essays.md` — referenced by `{#anchor}` IDs throughout. Never invent product data, metrics, logos, or liveness.** Where something conflicts with the code or a value is missing, STOP and ask. Grounded in the live sites (axionari.com, restaurantcompanion.ai, placecompanion.com) and the repo as of 2026-07-20.

---

## 0 · ROLE & MISSION

You are a senior design engineer executing a **repositioning + re-skin + IA expansion**, not a from-scratch rebuild. The existing Place Companion app already ships a warm, dark, editorial front end with strong signature animations (question marquees, pulse rings, fade-ups). Your job:

1. **Rename** Place Companion → **Hotel Companion** everywhere and re-point the brand to the Axionari / Companion OS family.
2. **Converge the visual language toward Restaurant Companion** (the family reference) while **preserving Place Companion's best animations and warmth** (target ~75% shared system / ~25% Hotel soul).
3. **Reposition to 100% enterprise** — remove the SMB self-serve pricing/free-trial identity; primary CTA becomes **Book a Demo**.
4. **Build out the full enterprise IA** from the approved copy: Home, Platform, Solutions, Enterprise, Companion OS, Resources + Library (12 essays), Company, Book a Demo, Contact, plus Legal/Trust pages, Footer, 404.

The 390px phone is the primary canvas. Match Restaurant Companion's desktop↔mobile adaptation quality.

**Decisions already locked (do not relitigate):**
- Hotel Companion is **100% enterprise**. No `$199/$599` tiers, no "Start Free Trial," no self-serve pricing on marketing pages. (Founding Partner / design-partner program replaces the self-serve learning loop.)
- Two visible brand layers: **Axionari** (company/platform) and **the Companions** (products). **Companion OS is surfaced as endorsement + one platform story, never a third consumer brand.** Lockups: "Powered by Companion OS." and "Powered by Axionari."
- Resort communities / master developers are **out of scope** here (they belong to a future **Destination Companion**). Do not build Destination Companion; it may appear only as a name in the Companion OS ecosystem list (`#companionos-ecosystem`).
- The word "chatbot" is banned. Use "assistant," "Companion," or "platform."

---

## 1 · GUARDRAILS (never violate)

1. **Preserve the art direction and warmth.** Keep the near-black warm surfaces, Cormorant Garamond (display serif) + DM Sans (body/UI) pairing, and the editorial voice. Do NOT introduce new fonts, new accent hues beyond the token set in §3, gradients-as-decoration, or emoji.
2. **Preserve the signature animations** (the "great graphics" to keep): the scrolling guest-question marquees (`animate-scroll-left/right`, `.marquee-*`), `fade-up` scroll reveals, `pulse-ring`, `pc-arrow-pulse`, `pc-btn-blink`, `pc-dot-pulse`. Reuse them on the new pages. Add RC-style **mono-eyebrow labels + numbered section markers** as the connective tissue that makes it feel like family.
3. **Copy is verbatim** from `HotelCompanion__Site_Copy.md` / `HotelCompanion__Library_Essays.md`. Do not rewrite, trim, or generate marketing copy. Each short line is an intentional visual beat. Essay bodies 02–12 must be pasted from Eduardo's approved source (see essays file) — never paraphrased or model-generated.
4. **Never invent data or claim false liveness.** No fake logos, customer names, metrics, certifications, or "trusted by X hotels." The one sourced stat allowed is the McKinsey $160B figure ONLY if Eduardo confirms it should carry over — otherwise `{/* NEEDS CONFIRM: $160B McKinsey */}` and STOP for that item.
5. **No new heavy dependencies.** Native CSS, Web Animations API, `IntersectionObserver`, View Transitions. `lucide-react` and `recharts` already exist and may be used. If a lib seems unavoidable, STOP and ask.
6. **Every behavior ships three states:** interactive/animated; `prefers-reduced-motion: reduce` (complete + legible, motion off); no-JS (a composed still). The site must be 10/10 with motion off.
7. **Preserve the working app.** The product surfaces — `/assistant/[id]`, `/dashboard`, `/onboarding`, `/auth/*`, and `/api/*` (chat, extract, preview-chat), Supabase/Stripe/Resend wiring, i18n — must keep functioning. This brief changes **marketing/brand/IA**, not the runtime. If a marketing change would break an app route or an env contract, STOP and ask. (Whether to keep self-serve `/onboarding` reachable at all is a product call — see P0-4.)
8. **Bilingual parity (EN/ES).** All new copy must flow through the existing i18n system (`src/lib/i18n/translations.ts` + `LanguageContext`). New pages must render in both languages. If ES copy is not provided, scaffold ES keys mirroring EN and mark `{/* NEEDS ES */}` — do not ship machine-translated ES silently; STOP and confirm the translation approach.
9. **Small commits, one item per ID** (e.g. `feat(P2-3): build /platform from #platform-*`). Never batch unrelated changes.
10. If any instruction conflicts with the code, STOP and surface it.

---

## 2 · RECON (first; write `AUDIT.md`, then build)

Confirm current state (verify, don't assume). Report findings in `AUDIT.md`:
1. Current routes under `src/app/**` and which are **marketing** (`/`, `/about`, `/features`, `/demo`, `/privacy`, `/terms`, `not-found`) vs **app** (`/assistant/[id]`, `/dashboard`, `/onboarding`, `/auth/*`) vs **api**.
2. The design tokens actually in use: `globals.css` (`body` bg `#141413`, text `#FAF9F5`; heading utility classes; keyframes) vs the token list in `REBUILD.md` (page `#080706`, card `#0F0D0B`, accent `#C96A3A`/`#D4784A`, green `#2D9E6B`, amber `#D4A84B`). Note every divergence — you will unify these in §3.
3. The signature animation inventory in `globals.css` and where `page.tsx` uses them (marquees, fade-up, pulses).
4. `site-nav.tsx` / `site-footer.tsx` structure, the `AnnouncementBar`, the fixed-nav hide-on-scroll behavior, and the `pt-24` offset in `layout.tsx`.
5. The i18n shape: `translations.ts` key structure, `useLang()`, `LanguageToggle`, and how `t.nav.*` / `t.footer.*` are consumed.
6. Every place the strings "Place Companion", "chatbot", "$199", "$599", "Free Trial", "founding partner", pricing, and "Start Your Pilot" appear (grep; you will replace/remove per §5).
7. Baseline Lighthouse mobile for `/`, `/features`, `/demo`.
8. `next.config.ts`, `vercel.json`, metadata in `layout.tsx`, and how images are handled (note: `public/` currently holds only default SVGs — real imagery is a `NEEDS REAL DATA` risk; flag it).

---

## 3 · DESIGN SYSTEM — the Companion Design System (CDS) layer

Goal: one tokenized system that reads as a member of the Restaurant Companion family while keeping Hotel warmth. **~75% shared / ~25% Hotel soul.**

### 3.1 Tokens (create `src/app/tokens.css`, imported by `globals.css`; convert hardcoded hex to CSS variables)
Unify on the warm-dark family palette. Reconcile the two conflicting sources by adopting **layered surfaces** (RC uses ambient banding):
```
--bg:            #0E0C0B;   /* page bed — deepen from #141413 toward RC near-black */
--surface-1:     #141311;   /* default section */
--surface-2:     #1A1715;   /* elevated card */
--surface-3:     #211D1A;   /* input / raised */
--text:          #FAF9F5;
--text-secondary:#A8A099;
--text-muted:    #6B6560;
--border:        rgba(232,227,220,0.08);
--accent:        #C96A3A;   /* copper — CTAs (aligns with RC #C86A3A) */
--accent-hover:  #D4784A;
--accent-deep:   #A9541F;   /* RC deep copper for pressed/points */
--green:         #2D9E6B;   /* status/active ONLY — never on primary CTAs or send */
--amber:         #D4A84B;   /* sparing highlight */
```
- Adjacent narrative zones should differ ≥12/255 in ≥1 channel (RC-style ambient banding); text contrast stays WCAG AA. Drive the body bed from `--bg`.
- STOP-and-confirm before changing accent if Eduardo wants Hotel's copper tuned cooler/coastal (the review left accent as part of the 25% "soul"); default = keep copper for family unity.

### 3.2 Typography (universal — this is the fastest family signal)
- Display: **Cormorant Garamond** (`--font-serif`) for all H1/H2/section titles. Keep the existing `heading-hero/section/page/card` clamp classes; extend if needed.
- Body/UI: **DM Sans** (`--font-sans`).
- **Add a mono-eyebrow style** (RC signature): small, uppercase, letter-spaced, `--text-muted`, used above section titles ("01 · VOICE-FIRST", "PLATFORM", "LIBRARY · REVENUE GROWTH"). Use a system/ui monospace stack or the existing sans in uppercase+tracking — no new font import unless STOP-approved.

### 3.3 Grid & spacing (universal)
- One container: `max-w-6xl mx-auto px-4 md:px-6` (already used) — standardize everywhere.
- Formalize an 8px spacing scale; consistent section vertical rhythm (e.g. `py-24 md:py-32` for major sections, tighter for strips).

### 3.4 Motion (universal spec)
- Reveal: `fade-up` on in-view via `IntersectionObserver`, `rootMargin:"0px 0px -10% 0px"`, distance ≤16px mobile / ≤24px desktop, duration ≤240ms, ease `cubic-bezier(.22,.61,.36,1)`. **Exclude first-viewport elements** (render full-opacity on load) + 100ms `IntersectionObserver` safety net.
- Keep marquees at their current speeds; pause on hover; honor reduced-motion (static wrap).
- All motion off under `prefers-reduced-motion`; layout must still read as designed.

### 3.5 Numbered-section narrative pattern (universal)
Adopt RC's rhythm: major pages tell their story as numbered sections with mono-eyebrows. Home already implies this; make it a reusable `<Section eyebrow="03 · …">` primitive.

### 3.6 The 25% Hotel "soul"
Warmth dial slightly higher than RC; the guest-question marquees are Hotel's signature and stay; hospitality/coastal photography world (when real assets exist); the in-room tablet is Hotel's hero artifact (see §7 Home/Platform). Keep the named-assistant warmth from the current app (persona) if it appears — but no invented persona on marketing pages unless copy calls for it.

---

## 4 · INFORMATION ARCHITECTURE & ROUTING

Create these App Router routes (all marketing pages use shared `SiteNav` + `SiteFooter`, CDS, three states, EN/ES). Copy anchors in parentheses.

| Route | Page | Copy source |
|---|---|---|
| `/` | Home (`#home`) | Site Copy |
| `/platform` | Platform (`#platform`) | Site Copy |
| `/solutions` | Solutions (`#solutions`) | Site Copy |
| `/enterprise` | Enterprise (`#enterprise`) | Site Copy |
| `/companion-os` | Companion OS (`#companionos`) | Site Copy |
| `/resources` | Resources / Library index (`#resources`) | Site Copy |
| `/resources/library/[slug]` | Essay template ×12 (`#article-template`, `#essay-index`) | Library Essays |
| `/company` | Company (`#company`) | Site Copy |
| `/demo` | Book a Demo (`#demo`) — **rebuild** existing `/demo` | Site Copy |
| `/contact` | Contact (`#contact`) | Site Copy |
| `/privacy` | Privacy (`#privacy`) — rebuild | Site Copy |
| `/terms` | Terms (`#terms`) — rebuild | Site Copy |
| `/cookies` | Cookie Policy (`#cookies`) — new | Site Copy |
| `/security` | Security (`#security`) — new | Site Copy |
| `/responsible-ai` | Responsible AI (`#responsible-ai`) — new | Site Copy |
| `/trust` | Trust Center (`#trust-center`) — new | Site Copy |
| `not-found` | 404 (`#not-found`) — rebuild | Site Copy |

**Redirects (in `next.config.ts`):** `/features` → `/platform` (old marketing route retired; confirm nothing app-critical links to it), and `/about` → `/company`. Preserve app routes untouched.

**Primary nav (desktop):** Platform · Solutions · Enterprise · Companion OS · Resources · Company — with **Book a Demo** as the primary CTA. Wordmark → `/`. Drop "Sign In / See Demo / Create Assistant" self-serve CTAs from the marketing nav (move Sign In to a subtle utility link only if the app must stay reachable — see P0-4). Mobile: same in the drawer, keep language toggle.

---

## 5 · REPOSITIONING REMOVALS (enterprise, not SMB)

- **Delete self-serve pricing** everywhere (the `$199/$599`, "less than $7/day," "one missed booking per day," tier cards, "Start Free Trial," "14-day free trial," "cancel anytime," "No commitment required"). Marketing CTAs → **Book a Demo** (or "Start a Pilot" where copy says so).
- **Reframe Founding Partner** as an enterprise **design-partner / pilot** block (copy at `#home-founding-partner`, `#company-founding-partners`, `#contact-founding`). Keep scarcity/co-creation tone; remove "lifetime rate / $ per month" SMB framing.
- **Remove SMB audience framing** ("intimate boutique properties up to 30 rooms" as the identity). Boutique still appears — but as a *Solutions* segment (`#solutions-boutique`), not the site's positioning.
- **Ban "chatbot"** → "assistant"/"Companion." Grep and fix.
- **Rename** all "Place Companion" → "Hotel Companion"; update `layout.tsx` metadata, `<title>`, OG/Twitter, wordmarks, footer, i18n strings, `manifest`/favicon references, and any `placecompanion.com` copy → `hotelcompanion.ai`.
- Product/app self-serve `/onboarding` funnel: see P0-4 (keep functional but de-emphasized, or gate behind sales — Eduardo's call).

---

## 6 · COMPONENT ARCHITECTURE (build once, reuse everywhere)

Create/refactor under `src/components/`:
- `SiteNav` (refactor): new IA (§4), Book a Demo CTA, wordmark "Hotel Companion," keep hide-on-scroll + drawer + language toggle. Add focus-trap + `Esc` + scroll-lock to the mobile drawer.
- `SiteFooter` (rebuild to `#footer`): the expanded enterprise footer with the **Companion OS centerpiece block** + **Powered by Axionari** block, link columns (Product/Solutions/Resources/Company/Legal), newsletter capture, social, legal line. Companion OS block reinforces Axionari → Companion OS → Hotel Companion on every page.
- `Section` primitive: props `eyebrow`, `title`, `children`, `variant` (surface level for ambient banding), `reveal`. Encapsulates mono-eyebrow + serif title + fade-up.
- `RhythmStack`: renders the stacked short-line noun lists (e.g. `#home-knows`) as vertical beats, not bullets.
- `CapabilityGrid`: the 8 Companion OS capabilities (Voice Intelligence, Knowledge Architecture, Organizational Memory, Reasoning Engine, Workflow Orchestration, Operational Intelligence, Enterprise Analytics, Continuous Learning) — reused on Home/Platform/Enterprise/Solutions/Companion OS. **One canonical taxonomy** (see §8).
- `QuestionMarquee` (extract from current `page.tsx`): the scrolling guest-question rows — Hotel's signature; reuse on Home hero/conversation section.
- `RoutingDiagram`: "request → department" mapping (`#home-execution`, `#platform-request-action`) — animated, reduced-motion static.
- `EndorsementMark`: the "Powered by Companion OS." lockup (+ Axionari variant) with correct link targets (`/companion-os`, `https://axionari.com`). No underline; accent-shift hover.
- `DemoForm` (from `#demo-form`): client+server validation, inline errors, real success/failure states. Reuse the existing submission mechanism (Resend/route) — confirm in recon; do not fabricate an endpoint.
- `FAQAccordion` (reuse existing `faq-section.tsx` pattern): Home/Platform/Demo/Contact FAQs.
- `ArticleLayout` (§ Library): the essay template (`#article-template`).
- `PersistentCTA` (mobile): slim thumb-zone "Book a Demo" bar after hero scrolls past; `env(safe-area-inset-bottom)`; hides at footer; reduced-motion friendly; never covers nav/drawer.

---

## 7 · PAGE-BY-PAGE SECTION MAPS

Build each page by composing §6 components with the copy anchors. Order = section order. Every page ends with its Final CTA and the shared footer.

- **Home (`/`)** — Hero `#home-hero` (H1 + subhead + Book a Demo / Watch Product Tour; ambient QuestionMarquee behind/below; **feature the in-room tablet as the hero artifact** if an asset exists, else `{/* NEEDS REAL DATA: tablet render */}`) → Trust strip `#home-trust` → `#home-conversation` → `#home-employee` → `#home-voice` → `#home-every-room` (RhythmStack) → `#home-revenue` → `#home-knows` → `#home-intelligence` → `#home-execution` (RoutingDiagram) → `#home-enterprise-intel` → `#home-companion-os` (CapabilityGrid + EndorsementMark) → `#home-live-in-days` → `#home-founding-partner` (design-partner framing) → FAQ `#home-faq` → Final CTA `#home-final-cta`. Add PersistentCTA on mobile.
- **Platform (`/platform`)** — `#platform-hero` → voice-first `#platform-voice-first` (list of surfaces incl. in-room tablets) → `#platform-your-voice` → `#platform-knows-property` → `#platform-destination` → `#platform-reservations` → `#platform-request-action` (RoutingDiagram) → `#platform-revenue-intel` → `#platform-guest-memory` → `#platform-guest-intel` → `#platform-dashboards` → `#platform-multi-property` → `#platform-enterprise-ready` → `#platform-companion-os` (CapabilityGrid) → `#platform-final-cta`.
- **Solutions (`/solutions`)** — `#solutions-hero` → department blocks (`#solutions-front-desk` … `#solutions-gm`) as a consistent "department card" rhythm → segment blocks (`#solutions-multi-property`, `-luxury`, `-resorts`, `-boutique`, `-business`, `-enterprise-groups`) → `#solutions-companion-os` → `#solutions-final-cta`.
- **Enterprise (`/enterprise`)** — `#enterprise-hero` → sections `#enterprise-shared-intel` … `#enterprise-grow` → `#enterprise-companion-os` → `#enterprise-final-cta`. This is the canonical trust/scale page; Home/Platform link here rather than duplicating.
- **Companion OS (`/companion-os`)** — `#companionos-hero` → `#companionos-why` → `#companionos-one-platform` → the 8 capability deep-dives (`#companionos-voice` … `#companionos-learning`) → `#companionos-enterprise` → `#companionos-ecosystem` (the family list; Destination Companion appears here as a future name only) → `#companionos-axionari` (EndorsementMark → axionari.com) → `#companionos-final-cta` (CTA "Explore Hotel Companion").
- **Resources (`/resources`)** — `#resources-hero` → featured `#resources-featured` (→ essay 01) → `#resources-library` grid → `#resources-categories` (filters) → `#resources-faq` → `#resources-updates` → `#resources-newsletter` → `#resources-final-cta`.
- **Library essay (`/resources/library/[slug]`)** — per `#article-template`; **all 12 essays are reproduced IN FULL** in `HotelCompanion__Library_Essays.md` (`#essay-01` … `#essay-12`), verbatim — paste each body as-is into its content file; "Next Article →" chain per `#essay-index`; essay 12 ends with the Epilogue (no Next).
- **Company (`/company`)** — `#company-hero` → belief/mission/approach/companion-os/axionari/philosophy/founding-partners/contact blocks → `#company-final-cta`.
- **Book a Demo (`/demo`)** — `#demo-hero` → `#demo-experience` → `#demo-who` → `#demo-discuss` → `#demo-expect` → `#demo-agenda` → `#demo-deployment` → `#demo-faq` → `DemoForm` `#demo-form` → `#demo-final-cta`.
- **Contact (`/contact`)** — `#contact-hero` → `#contact-channels` → `#contact-hq` → `#contact-schedule` → `#contact-faq` → `#contact-founding` → `#contact-closing`. Wire emails as `mailto:`.
- **Legal/Trust** — `/privacy`, `/terms`, `/cookies`, `/security`, `/responsible-ai`, `/trust` per their anchors; readable measure (~680px), same art direction, `Last Updated: July 2026`. Legal bodies: reproduce from the approved source doc; where the copy file gives section structure only, paste the full approved body verbatim (STOP if a section's full text isn't available).
- **404 (`not-found`)** — `#not-found`.

---

## 8 · CANONICAL CAPABILITY TAXONOMY (consistency gate)

The 8 Companion OS capabilities appear identically on Home, Platform, Enterprise, Solutions, and Companion OS: **Voice Intelligence · Knowledge Architecture · Organizational Memory · Reasoning Engine · Workflow Orchestration · Operational Intelligence · Enterprise Analytics · Continuous Learning.** Define once (a shared const), render via `CapabilityGrid`. If any page tries to show a different set/order, that's a bug — enterprise diligence will cross-shop these. DoD: grep confirms one source of truth.

---

## 9 · RESPONSIVE & ANIMATION (match Restaurant Companion)

- **Mobile-first, 390px primary.** Breakpoints to verify: 360 / 390 / 414 / 768 / 1024 / 1440.
- **First-paint content on every route** — no blank-above-fold; first viewport at full opacity on cold load.
- **Persistent thumb-zone Book a Demo CTA** on mobile (≤768px), ≥44×44px targets, `env(safe-area-inset-bottom)`, hides at footer.
- **Touch targets ≥44×44px, ≥8px apart**, `-webkit-tap-highlight-color:transparent` + custom `:active`. Display serif never overflows at 360px.
- **Marquees**: full-bleed, smooth, pause-on-hover, reduced-motion static.
- **Reveal cadence** tuned per §3.4 — no dead-zones, no mid-fade catches on fast flick (record `/`, `/platform`, `/enterprise` at 390 and 1440).
- **No CLS from animated/hero elements**; set image `width`/`height`, `loading="lazy"` below fold, modern formats.

---

## 10 · PHASES (ID'd tasks · DoD each · STOP where noted)

### P0 — Foundations & disqualifiers
- **P0-1 Global rename & metadata.** All "Place Companion"→"Hotel Companion"; `layout.tsx` title/description/OG/Twitter; wordmark; `placecompanion.com`→`hotelcompanion.ai`; ban "chatbot". **DoD:** grep for "Place Companion"/"chatbot"/"placecompanion.com" in shipped templates returns nothing.
- **P0-2 CDS tokens.** Add `tokens.css`; migrate hardcoded hex → variables; unify surfaces/accent (§3.1); keep animations working. **DoD:** `/` renders unchanged-or-better; no raw `#141413`/`#080706` literals left in components (grep).
- **P0-3 Nav + Footer.** Refactor `SiteNav` to new IA + Book a Demo; rebuild `SiteFooter` to `#footer` with Companion OS + Axionari blocks. Drawer focus-trap/Esc/scroll-lock. **DoD:** every nav/footer link resolves to a real route (no dead links) at 390/1440.
- **P0-4 Self-serve decision (STOP).** Confirm with Eduardo: keep `/onboarding` self-serve reachable (utility "Sign In" only) or fully gate behind sales? Default pending answer: keep app routes functional but remove all self-serve CTAs/pricing from marketing. Do not delete app code. **DoD:** documented decision; marketing shows zero pricing/free-trial strings (grep).
- **P0-5 i18n scaffolding.** Extend `translations.ts` with keys for all new pages/sections (EN from copy). ES: mirror keys, mark `{/* NEEDS ES */}`, STOP to confirm translation approach. **DoD:** every new page renders in EN via `useLang`; ES keys exist and are flagged.

### P1 — Design system components
- **P1-1** `Section`, `RhythmStack`, `EndorsementMark`, `CapabilityGrid` (§8 canonical const), `QuestionMarquee` (extracted), `RoutingDiagram`, `PersistentCTA`, `FAQAccordion`, `ArticleLayout`, `DemoForm`. Each with reduced-motion + no-JS states. **DoD:** a `/_kitchen-sink` (dev-only, not linked) renders all components in EN/ES with motion on/off.

### P2 — Marketing pages
- **P2-1** Home `/` from §7. **P2-2** Platform. **P2-3** Solutions. **P2-4** Enterprise. **P2-5** Companion OS. **P2-6** Company. **P2-7** Book a Demo (`DemoForm` wired to real submit). **P2-8** Contact. Each **DoD:** matches its section map, all three states, EN/ES, first-paint content, mobile PersistentCTA, no dead CTAs, Lighthouse mobile ≥95/100/100/100 on the page.

### P3 — Resources & Library
- **P3-1** Resources index from `#resources-*`. **P3-2** `ArticleLayout` + all 12 essay routes; **all 12 bodies are supplied verbatim in the essays file (`#essay-01`…`#essay-12`)** — paste as-is, no generation; "Next Article" chain; essay 12 Epilogue; per-essay SEO. **DoD:** all 12 routes resolve, chain is correct, category filters work, no lorem/placeholder bodies, no model-written essay text.

### P4 — Legal, Trust, 404, polish
- **P4-1** `/privacy`, `/terms`, `/cookies`, `/security`, `/responsible-ai`, `/trust`, `not-found` from anchors (STOP if full legal bodies unavailable). **P4-2** Global finish: favicon/OG per route + designed share image; focus-visible everywhere; empty/error/success form states; image dims (no CLS); redirects `/features`→`/platform`, `/about`→`/company`. **DoD:** Lighthouse mobile ≥95 Perf / 100 A11y / 100 BP / 100 SEO on `/`, `/platform`, `/enterprise`, `/demo`; CLS <0.05; LCP <2.0s throttled mobile; WCAG 2.1 AA.

---

## 11 · VERIFICATION PROTOCOL (write `VERIFICATION.md`; gate each DoD)

1. **Breakpoints:** 360/390/414/768/1024/1440 — screenshot first viewport (t=0) + mid-scroll per route.
2. **Devices:** iOS Safari, Chrome Android, one ≤360px Android, desktop Chrome/Safari/Firefox.
3. **Motion:** fast-scroll recording (mobile) — no dead-zones/mid-fade; <16ms frames; no CLS.
4. **Keyboard:** tab every route; visible focus; drawer trap + Esc; FAQ/accordions operable.
5. **Reduced-motion + no-JS:** all content present and legible on every page.
6. **Bilingual:** every page toggles EN/ES with no missing keys (or explicitly flagged `NEEDS ES`).
7. **Funnel:** click every CTA on every route → none dead, none reaches pricing/free-trial; submit `DemoForm` → success + failure states.
8. **Consistency gate (§8):** one capability taxonomy; endorsement lockups link correctly; no "chatbot"/"Place Companion"/pricing strings (grep).
9. **Lighthouse mobile** on the four key routes vs. recon baseline.
Do not mark a task done until its DoD + relevant checks pass. On failure, keep it in progress and report the blocker.

---

## 12 · SEQUENCING & OUTPUT

Order: **Recon → P0 → P1 → P2 → P3 → P4.** After each phase, present the diff summary + that phase's `VERIFICATION.md` evidence + anything flagged `NEEDS REAL DATA` / `NEEDS ES` / `NEEDS CONFIRM` or needing a human call. Commit per item with its ID. **Work on a branch (`feat/hotel-companion`); do not deploy** — hand back a Vercel preview for on-device + Lighthouse sign-off.

**Definition of done (all true):**
- Brand is Hotel Companion everywhere; family lockups ("Powered by Companion OS." / "Powered by Axionari.") correct; zero "Place Companion"/"chatbot"/pricing/free-trial strings.
- Full enterprise IA shipped (§4) from verbatim approved copy; one canonical capability taxonomy; Companion OS surfaced as endorsement + one platform story, never a third brand.
- Signature animations preserved; CDS unified; reads as a Restaurant Companion family member with Hotel warmth (~75/25).
- Mobile best-in-class: first-paint content, persistent thumb-zone CTA, ≥44px targets, RC-grade reveals; three states everywhere.
- 12 essays live with correct chain + SEO; legal/trust pages shipped; 404 branded.
- App routes (`/assistant`, `/dashboard`, `/auth`, `/api/*`) still function; i18n EN/ES parity (or flagged).
- Lighthouse/WCAG targets met; `AUDIT.md` + `VERIFICATION.md` current.
- Nothing looks templated; no invented data; no dead ends.

**Open items to confirm with Eduardo before/at the relevant phase (do not guess):**
1. P0-4 — keep self-serve `/onboarding` reachable, or fully sales-gated?
2. ES translation approach for all new copy (professional vs. flagged placeholders).
3. Real imagery/brand assets (hero, in-room tablet render, editorial photography, favicon/OG share image, logo lockups) — currently absent from `public/`.
4. Whether the McKinsey `$160B` stat carries over as the sourced stake.
5. Legal/Trust bodies — RESOLVED: full approved text for Privacy, Terms, Cookie, Security, Responsible AI, and Trust Center is now included verbatim in `HotelCompanion__Site_Copy.md` (`#privacy`, `#terms`, `#cookies`, `#security`, `#responsible-ai`, `#trust-center`). No external source needed. (Have counsel review before public launch — standard, not a blocker for the build.)
6. Domain/deploy: confirm the Vercel project + `hotelcompanion.ai` DNS target (ties to the Axionari-org migration).
