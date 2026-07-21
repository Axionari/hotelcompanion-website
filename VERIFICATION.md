# VERIFICATION.md — Hotel Companion build

Branch `feat/hotel-companion` · Verified 2026-07-20 against a local production build (`next build` + `next start`).
Gates below map to build brief §11 and the Handoff Addendum (Round 2: A2-1 … A2-6 · Round 3: A3-1 … A3-9).
**Not deployed** — device/Lighthouse sign-off is pending a Vercel preview.

> **Rounds 2 and 3 applied.** Round 2 resolved every copy-level open item from Round 1 (8th capability,
> Accessibility page, Founding-CTA destination, Medallia decision, full professional Spanish).
> Round 3 re-injected the strongest concrete copy from placecompanion.com — 12 approved sections, EN + ES.
> See "Round 2" and "Round 3" below.

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
| unverified stats | exactly **two**, both `NEEDS CONFIRM` in EN *and* ES: `$47B` (A3-1) and `91%/9%` (A3-9). A full numeric audit of the copy layer found no third unverified claim — the only other figures are `$250` inside the approved example dialogue and "200 questions" inside approved narrative copy. |
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

## Round 3 (Handoff Addendum A3-1 … A3-9) — preserve the best of placecompanion.com

12 approved sections re-injected into the enterprise IA, EN + ES, verbatim by anchor
(source files verified at 146/146 EN/ES anchor parity before wiring).

| ID | Section | Placement |
|---|---|---|
| A3-1 | `#home-stake` — the $47B cost of inaction | Home, right after the trust strip. Carries its Medallia source line; figure marked `NEEDS CONFIRM` in both languages. |
| A3-2 | `#company-why-hotels` — "the same 200 questions" | Company, after the hero, before Our Belief. Rendered verbatim and undiluted, as instructed. |
| A3-3 | `#platform-not-generic-ai` — "they needed a conversation, not a redirect" | Platform, after Property Knowledge. |
| A3-4 | `#platform-lifecycle` — Before / During / After + review loop | Platform, after Destination. |
| A3-5 | `#enterprise-what-it-is-not` — category boundaries | Enterprise, beside Integrates. **Carries `id="what-it-is-not"`** so the Home teaser deep link resolves (verified). |
| A3-6 | `#platform-issue-detection` — the two-stage 2 AM alert | Platform; also deepens `#solutions-engineering`. Maps to the repo's real `issue-detection.ts`. |
| A3-7 | `#home-what-it-is-not-teaser` | Home, before the final CTA → `/enterprise#what-it-is-not`. |
| A3-8 | `#home-revenue-example` — the 10:14 PM upgrade | Folded into `#home-revenue`, rendered as a real exchange closing on "Investment: covered." |
| A3-9 | Enrichments | `#platform-five-voices` **replaced** the adjective stack; `#platform-channels` **merged** into the voice-first channel list; `#platform-destination-examples` **added** to Destination; `#dashboards-resolution` **added** to both dashboards sections. No duplication — the superseded adjective list was removed, not left alongside. |

### Round 3 verification

- **Rendered-content probe:** every new section confirmed present in the real browser in **both languages** — 38 distinct content probes across Home, Platform, Enterprise and Company, all ✓ (e.g. `$47B` / `Se pierden cada año`, `Barefoot Luxury` / `Lujo Descalzo`, `no seaweed` / `sargazo`, `Investment: covered.` / `Inversión: cubierta.`).
- **ES leakage sweep re-run** with the Round-3 English tells added to the tell list: **18/18 routes clean**.
- **Link + anchor gates re-run:** 34 internal targets all resolve; every anchor verified in rendered HTML including the new `/enterprise#what-it-is-not` and `/company#why-hotels`.
- **Section numbering and ambient banding repaired** after the insertions — Home now runs 01–16, Platform 01–17, Enterprise 01–15, Company 01–10, each with strictly alternating surface bands (verified programmatically, no two adjacent sections share a surface).
- **New eyebrow labels** added to the ES dictionary: THE STAKE, BOUNDARIES, NOT GENERIC AI, LIFECYCLE, ISSUE DETECTION, WHAT IT IS NOT.
- **ES parity gate re-run** after all Round-3 copy landed. Every module 89–100% translated; each remaining identical string was individually checked and is a cognate or a deliberately-English brand term (`Enterprise`, `Golf.`, `Spa.`, `Resort`, `Retail.`, `Hotel`, `Legal`, `$47B`). No structural value differs across languages.
- **Gate hardening:** the parity checker previously mis-flagged `demoForm.fields.email` (a form *label*) as a structural value because it keyed off the field name. It now decides structural-vs-prose from the **value shape** (routes, mailto, real addresses, block-type discriminators) combined with a narrow identifier-key list, and treats `resources.categories.descriptions` as intentionally Spanish-keyed. Two false positives removed; the check is now correct rather than merely quiet.


## Live Demo tier (LD-1 … LD-10)

The guest-facing "See It Live" demo is real, embedded and working: it runs the
model, listens through the Web Speech API, and answers with picture cards.

**Reuse, not rebuild.** It calls the existing `src/app/api/preview-chat/route.ts`
**unchanged** — no new endpoint, no auth, no persistence, no new backend. That
route already accepts a client-supplied system prompt (it was written for
un-saved preview properties), so the demo seeds it from `src/lib/marazul-config.ts`.
Structure rides back on the text stream as trailing `[[card:…]]` / `[[action:…]]`
tags, because a JSON envelope could not be parsed until the last token and the
streaming is what makes the demo feel alive in a sales call.

Verified in a real browser (Chromium, `SpeechRecognition` + `speechSynthesis`
both present) at **1440 and 375, EN and ES**:

- Ask → intent-matched answer → picture card with a real photograph; no `[[` tag
  ever leaks into the transcript; state pill returns to Ready.
- Mock action end to end: ask → upgrade card → "Confirm the upgrade" →
  confirmation card carrying "DEMONSTRATION ONLY — NOTHING WAS CHARGED AND
  NOTHING WAS SENT". **Zero network requests fire during confirm** — the action
  is local, with no transaction and no PII.
- Entry points all live: nav "See It Live" / "Ver el Demo" (desktop + drawer),
  hero secondary CTA, and the hero tablet itself. Modal traps focus, restores it,
  closes on Esc, locks and restores body scroll.
- The persistent launcher now runs the same runtime; its "Sample responses"
  label is gone because the responses are no longer scripted.
- 375: no horizontal overflow, all chrome tap targets 44×44.
- 33 unit tests pass (18 new), 0 lint errors, tsc clean, ES parity gate at its
  prior baseline.

**Bug caught by the browser pass, not by the tests:** in Spanish, "la mejor
playa **cerca** de aquí" was answered with the El Pirata restaurant card — the
destination matcher listed the generic word "cerca" and runs before the beach
matcher. Fixed in both languages and covered by a regression test. Two
suggestion chips ("upgrade", "where do locals eat") also fell through to the
generic non-answer; both now have proper fallbacks.

### Blocker: the Anthropic API key is invalid

`ANTHROPIC_API_KEY` in `.env.local` returns **401 `authentication_error`** when
called directly, so `/api/preview-chat` streams an empty body and **every answer
currently comes from the canned fallback pool**. The demo therefore looks and
behaves correctly — that is exactly what the fallback path is for — but it is
not yet exercising the model.

This is why fallback quality was made load-bearing (intent matching, cards and
mock actions on the canned replies) rather than left as a blind rotation.

**To switch the demo to real answers, rotate the key — no code change is needed.**
Confirm with:

```
curl -s -o /dev/null -w '%{http_code}\n' https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" -H 'anthropic-version: 2023-06-01' \
  -H 'content-type: application/json' \
  -d '{"model":"claude-haiku-4-5-20251001","max_tokens":8,"messages":[{"role":"user","content":"hi"}]}'
```

`200` means the demo is live; `401` means it is still on fallbacks. Once the key
is valid, re-check that the model actually emits the card tags (the prompt asks
for them, but that path has not been observed against a working key).

## Open items carried forward

All are Eduardo's to provide; none block the build.

1. **Resend** — verify `hotelcompanion.ai` at resend.com/domains, move `from` off `onboarding@resend.dev`, set `DEMO_REQUEST_TO`. The form works; it currently 403s sending to `sales@` because Resend is in test mode.
2. **Imagery** — `public/` still holds only default Next SVGs. Flagged `NEEDS REAL DATA`: hero in-room tablet render, editorial photography, favicon, designed OG share image, logo lockups. (The Home secondary CTA "Watch Product Tour" no longer points at `/platform` — it opens the working demo, which retires that placeholder.)
3. **The two unverified numbers** — `$47B` (Home stake) and `91%/9%` (dashboards resolution) are now live on the site per the Round-3 decision, each marked `NEEDS CONFIRM` in EN and ES. Verify both before public launch, and per the addendum do not add a third unverified stat.
4. **Self-serve `/onboarding`** (P0-4) — still open. Default applied: app routes functional, zero self-serve CTAs or pricing on marketing, Sign In demoted to a footer utility link.
5. **Legal counsel review** — both EN and ES legal/trust bodies should be reviewed before public launch (standard, and the ES deck carries the same caveat).
6. **Vercel project + `hotelcompanion.ai` DNS** — needed for the preview so Lighthouse, on-device passes and motion recordings can be captured.

## Still not verified (needs a deployed preview / real devices)

- **The model path of the live demo** — blocked on a valid `ANTHROPIC_API_KEY` (see above). Everything downstream of the model is verified; the model call itself is not.
- **Voice input against a real microphone** — `SpeechRecognition` is present and wired, and every error path resets the orb, but granting mic permission and speaking is a human step.

- Lighthouse mobile on `/`, `/platform`, `/enterprise`, `/demo` (no baseline was capturable locally either — see AUDIT.md §7).
- On-device passes: iOS Safari, Chrome Android, a ≤360px device.
- Fast-scroll motion recordings at 390 and 1440 for dead-zone / mid-fade checks.
- CLS and LCP under throttled mobile.
