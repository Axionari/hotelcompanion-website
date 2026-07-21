# VERIFICATION.md — Hotel Companion build

Branch `feat/hotel-companion` · Verified 2026-07-20 against a local production build (`next build` + `next start`).
Gates below map to build brief §11 and the Round-2 Handoff Addendum (A2-1 … A2-6).
**Not deployed** — device/Lighthouse sign-off is pending a Vercel preview.

> **Round 2 applied.** The addendum resolved every copy-level open item from Round 1: the 8th capability
> section, the Accessibility page, the Founding-CTA destination, the Medallia decision, and full
> professional Spanish. See "Round 2" below.

## Build & type safety

| Check | Result |
|---|---|
| `npx tsc --noEmit` | passes, 0 errors |
| `npx eslint src` | 0 errors; 5 pre-existing warnings in `LanguageContext.tsx` (setState-in-effect), untouched by this work |
| `npm run build` | succeeds; full IA compiles |
| `/resources/library/[slug]` | all 12 slugs prerendered via `generateStaticParams` (SSG) |

## Routes (all 200, server-rendered content confirmed)

`/` · `/platform` · `/solutions` · `/enterprise` · `/companion-os` · `/resources` · `/company` · `/demo` · `/contact` ·
`/privacy` · `/terms` · `/cookies` · `/security` · `/responsible-ai` · `/trust` · `/accessibility` · 404 ·
all 12 `/resources/library/*`

Each marketing route returns 19k–37k characters of visible text with the correct `<h1>` — **no blank-above-fold on any route**.

**Redirects:** `/features` → `/platform` (308), `/about` → `/company` (308). Retired route directories deleted.

**App routes preserved:** `/auth/login` 200, `/auth/signup` 200, `/onboarding` 200, `/dashboard` 307 → auth guard intact.
`/api/*` untouched except the new `/api/demo-request`.

## Consistency gate (§8 + §5)

| Grep | Result |
|---|---|
| `Place Companion` / `placecompanion.com` | 0 hits |
| pricing / free-trial strings (`$199`, `$599`, "Free Trial", "14-day", "cancel anytime", "No commitment", "Start Your Pilot") | 0 hits in marketing |
| `NEEDS ES` | **0 hits** — Spanish is fully wired |
| `chatbot` | 2 hits, both **verbatim approved copy** — `#companionos-why` ("Organizations don't need another chatbot.") and the Resources card dek. Plus essay bodies, which are approved source. |
| capability taxonomy | single source `src/lib/capabilities.ts`, rendered only via `CapabilityGrid`. No page hand-writes the list. |

## Links

- **34 unique internal link targets crawled across every page → all resolve (200/308). Zero dead links.**
- **Every deep-link anchor verified present in rendered HTML:** `/companion-os#{voice,knowledge,memory,reasoning,workflow,operational,analytics,learning}` — **all eight now resolve to their own deep-dive section**, `/contact#founding`, `/demo#{faq,form}`, `/resources#{library,faq,updates,categories}`, `/solutions#{multi-property,luxury,resorts,boutique,business,enterprise-groups}`.
- One dead anchor was found and fixed during verification: `/demo#faq` had no matching `id`. `Section` now also carries `scroll-mt-20` so the fixed nav never covers an anchor target.

## Three states (§3.4 / guardrail 6)

- **No-JS:** server HTML contains **zero** `class="reveal"` elements — reveal classes are applied client-side only, so the no-JS render is a fully composed still with all content present.
- **Reduced motion:** `globals.css` disables reveals, stops both marquees and re-flows them to a static wrapped row, and kills all animation/transition durations globally.
- **First viewport:** heroes are never wrapped in `Reveal`; `Reveal` additionally skips any element already within 95% of viewport height on mount, with a 100ms `IntersectionObserver` safety net.

## Library (§P3)

- 12 essay bodies extracted **verbatim** from the approved source into `src/content/library/*.md` — no paraphrase, no model-generated text. 2,200 lines total.
- Contamination scan clean: no front-matter, "Next Article", or editorial-instruction lines leaked into any body. Essay 11's `**Final Article →**` pointer was caught and removed.
- Next-Article chain walks 01 → 12 and terminates correctly; essay 12 renders the series-end block instead of a Next card.
- Per-essay SEO: title, description, canonical URL, OG `article`, Twitter card.

## Demo form (§P2-7)

- Client validation: required fields + email format, inline errors, `aria-invalid`.
- Server validation confirmed live: missing fields → 400 with the field list; bad email → 400; rate limited to 5/min per IP.
- Failure path returns a real error state to the user rather than a silent success.
- ⚠️ **Launch action:** Resend is in test mode and currently rejects sending to `sales@hotelcompanion.ai` (403 `validation_error`). Verify the `hotelcompanion.ai` domain at resend.com/domains, change the `from` address off `onboarding@resend.dev`, and set `DEMO_REQUEST_TO`. The route already reads `DEMO_REQUEST_TO`.

## Accessibility

- Global `:focus-visible` ring on `--accent`; `-webkit-tap-highlight-color: transparent`.
- Mobile drawer: focus trap, `Esc` to close, body scroll lock, focus returned to the toggle, `aria-expanded` / `aria-controls`.
- Touch targets ≥44px on nav toggle, drawer links, buttons, inputs, category filters.
- FAQ accordion buttons carry `aria-expanded`; form fields have associated `<label htmlFor>`.

## Round 2 (Handoff Addendum A2-1 … A2-6)

| ID | Item | Result |
|---|---|---|
| A2-1 | Enterprise Analytics, the 8th capability | Deep-dive added to `/companion-os` between Operational Intelligence and Continuous Learning. The `#analytics` deep-link workaround is gone; all 8 capability tiles now anchor to real sections (verified in rendered HTML). Trailing sections renumbered. |
| A2-2 | Founding Partner CTA destination | Home, Company (CTA added — it had none) and the footer all resolve to `/contact#founding`. The contact-page mailto workaround is gone. |
| A2-3 | Accessibility page | `/accessibility` shipped bilingual; footer "Accessibility" link restored; `accessibility@hotelcompanion.ai` wired. |
| A2-4 | Medallia $47B | Decision noted (KEEP, Eduardo verifies the citation). **No code change** — the figure is not rendered anywhere in the build, so nothing was fabricated. It stays absent until the citation is supplied. |
| A2-5/A2-6 | Professional Spanish | Wired site-wide. `grep "NEEDS ES"` → **0 hits**. |

### Spanish verification

- **Copy modules:** an automated parity gate walks every `Localized` pair and asserts identical key structure plus actual translation. Result: **95–100% of content strings differ from EN on every module**; every remaining identical string is a true cognate (`Spa.`, `Golf.`, `Concierge`, `Resort`, `Boutique`, `Retail`, `Companion OS`). No structural value drifted — **every `slug`, `href`, `id` and email is byte-identical across languages**, so no ES route or anchor can break.
- **Legal:** six documents translated with block-for-block parity (privacy 52/52, terms 70/70, cookies 36/36, security 34/34, responsible-AI 34/34, trust 19/19). `href` inventory identical.
- **Library:** 12 Spanish essays extracted verbatim (2,200 lines, matching EN line-for-line); contamination scan clean after stripping the ES "Artículo Final →" pointer from essay 11 (the same defect as the EN pass). Slug and order parity with EN confirmed. Chain renders "SIGUIENTE ARTÍCULO →"; essay 12 shows the series-end block.
- **Rendered-output sweep:** with `pc_lang=es`, all **18 routes** were loaded in a real browser and scanned for 15 tell-tale English strings (`Book a Demo`, `Frequently Asked Questions`, `NEXT STEP`, `Last Updated:`, `Return Home`, `Coming Soon`, `Sign In`, `Subscribe`, the endorsement lockups, …). Final result: **18/18 clean, zero English leakage.**
- **Two leaks were found and fixed during this sweep**, both invisible to a file-level review:
  1. `EndorsementMark` hardcoded "Powered by Companion OS." / "Powered by Axionari." in English — it leaked onto 5 pages in ES mode. Now uses the approved ES lockups ("Impulsado por Companion OS." / "Construido por Axionari.").
  2. 57 section eyebrows were hardcoded English in the page components (`01 · CONVERSATION` …). Now translated at the `Section` boundary via a shared dictionary, so ES renders `01 · CONVERSACIÓN`.
- **Resources filters:** ES description keys were verified against the Spanish essay index — every ES filter button resolves a description. EN likewise.
- **EN unaffected:** English rendering re-checked on Home and an essay after all ES work.

### Translator judgment calls worth a copywriter's glance

These strings exist in code but had no counterpart in the copy deck, so they were authored rather than lifted:
- UI chrome: menu open/close labels, form validation and submit-state messages, newsletter success/error, "Sign In".
- Section eyebrow labels (the deck uses prose headings, not numbered eyebrows) — including all 12 Enterprise labels and the 15 Solutions department/segment labels.
- `contact` channel one-line titles and `channelsTitle`/`hq.title`; `solutions` department/segment intro headings; `resources` eyebrows.
- Two legal cross-reference link labels (Privacy→Cookies, Security→Privacy) modeled on the Trust Center's ES phrasing.
- The ES deck's footer Legal list has 5 items where EN has 7; "IA Responsable" and "Centro de Confianza" were authored to preserve the routes rather than drop them.

Also carried through faithfully as the ES deck writes them: "Front Desk" and "Front Office" both render as "Recepción"; the ES sign-off is "Construido por Axionari" where EN says "Powered by Axionari".

## Open items carried forward

All are Eduardo's to provide; none block the build.

1. **Resend** — verify `hotelcompanion.ai` at resend.com/domains, move `from` off `onboarding@resend.dev`, set `DEMO_REQUEST_TO`. The form works; it currently 403s sending to `sales@` because Resend is in test mode.
2. **Imagery** — `public/` still holds only default Next SVGs. Flagged `NEEDS REAL DATA`: hero in-room tablet render, editorial photography, favicon, designed OG share image, logo lockups. The Home secondary CTA ("Watch Product Tour") points at `/platform` until a tour asset exists.
3. **Medallia $47B** — Eduardo verifies the citation (figure, report, year) before launch. Not rendered anywhere until then.
4. **Self-serve `/onboarding`** (P0-4) — still open. Default applied: app routes functional, zero self-serve CTAs or pricing on marketing, Sign In demoted to a footer utility link.
5. **Legal counsel review** — both EN and ES legal/trust bodies should be reviewed before public launch (standard, and the ES deck carries the same caveat).
6. **Vercel project + `hotelcompanion.ai` DNS** — needed for the preview so Lighthouse, on-device passes and motion recordings can be captured.

## Still not verified (needs a deployed preview / real devices)

- Lighthouse mobile on `/`, `/platform`, `/enterprise`, `/demo` (no baseline was capturable locally either — see AUDIT.md §7).
- On-device passes: iOS Safari, Chrome Android, a ≤360px device.
- Fast-scroll motion recordings at 390 and 1440 for dead-zone / mid-fade checks.
- CLS and LCP under throttled mobile.
