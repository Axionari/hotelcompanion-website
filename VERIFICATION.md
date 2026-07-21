# VERIFICATION.md — Hotel Companion build

Branch `feat/hotel-companion` · Verified 2026-07-20 against a local production build (`next build` + `next start`).
Gates below map to build brief §11. **Not deployed** — device/Lighthouse sign-off is pending a Vercel preview.

## Build & type safety

| Check | Result |
|---|---|
| `npx tsc --noEmit` | passes, 0 errors |
| `npx eslint src` | 0 errors; 5 pre-existing warnings in `LanguageContext.tsx` (setState-in-effect), untouched by this work |
| `npm run build` | succeeds; full IA compiles |
| `/resources/library/[slug]` | all 12 slugs prerendered via `generateStaticParams` (SSG) |

## Routes (all 200, server-rendered content confirmed)

`/` · `/platform` · `/solutions` · `/enterprise` · `/companion-os` · `/resources` · `/company` · `/demo` · `/contact` ·
`/privacy` · `/terms` · `/cookies` · `/security` · `/responsible-ai` · `/trust` · 404 · all 12 `/resources/library/*`

Each marketing route returns 19k–37k characters of visible text with the correct `<h1>` — **no blank-above-fold on any route**.

**Redirects:** `/features` → `/platform` (308), `/about` → `/company` (308). Retired route directories deleted.

**App routes preserved:** `/auth/login` 200, `/auth/signup` 200, `/onboarding` 200, `/dashboard` 307 → auth guard intact.
`/api/*` untouched except the new `/api/demo-request`.

## Consistency gate (§8 + §5)

| Grep | Result |
|---|---|
| `Place Companion` / `placecompanion.com` | 0 hits |
| pricing / free-trial strings (`$199`, `$599`, "Free Trial", "14-day", "cancel anytime", "No commitment", "Start Your Pilot") | 0 hits in marketing |
| `chatbot` | 2 hits, both **verbatim approved copy** — `#companionos-why` ("Organizations don't need another chatbot.") and the Resources card dek. Plus essay bodies, which are approved source. |
| capability taxonomy | single source `src/lib/capabilities.ts`, rendered only via `CapabilityGrid`. No page hand-writes the list. |

## Links

- **33 unique internal link targets crawled across every page → all resolve (200/308). Zero dead links.**
- **Every deep-link anchor verified present in rendered HTML:** `/companion-os#{voice,knowledge,memory,reasoning,workflow,operational,analytics,learning}`, `/contact#founding`, `/demo#{faq,form}`, `/resources#{library,faq,updates}`, `/solutions#{multi-property,luxury,resorts,boutique,business,enterprise-groups}`.
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

## Not yet verified (requires a deployed preview / real devices)

- Lighthouse mobile scores on `/`, `/platform`, `/enterprise`, `/demo` (no baseline was capturable in this environment either — see AUDIT.md §7).
- On-device passes: iOS Safari, Chrome Android, a ≤360px device.
- Fast-scroll motion recordings at 390 and 1440 for dead-zone / mid-fade checks.
- CLS and LCP under throttled mobile.

## Open items carried forward

1. **ES translation** — every new copy module ships EN verbatim with `const es: typeof en = en` and a `NEEDS ES` comment. Type-safe (no missing keys), but the toggle currently renders English on new pages. No machine translation was shipped silently, per guardrail 8.
2. **Imagery** — `public/` still holds only default Next.js SVGs. Flagged `NEEDS REAL DATA`: hero in-room tablet render, editorial photography, favicon, designed OG share image, logo lockups. The Home secondary CTA ("Watch Product Tour") points at `/platform` until a tour asset exists.
3. **Medallia $47B** — not rendered anywhere; still awaiting confirmation.
4. **Footer "Accessibility" link** — the copy deck lists it but §4 defines no `/accessibility` route. Omitted rather than shipping a dead link; needs a decision.
5. **Founding Partner CTA** (`/contact#founding`) routed to `partners@hotelcompanion.ai` — confirm whether a dedicated intake form is wanted.
6. **Enterprise Analytics deep-dive** — the copy deck supplies 7 capability sections, not 8. The Enterprise Analytics tile deep-links to the capability overview section; needs either new copy or confirmation of current behavior.
7. **Self-serve `/onboarding`** (P0-4) — default applied: app routes remain functional, all self-serve CTAs and pricing removed from marketing, Sign In demoted to a footer utility link. Awaiting confirmation.
8. **Deploy target** — Vercel project + `hotelcompanion.ai` DNS not configured from this branch.
