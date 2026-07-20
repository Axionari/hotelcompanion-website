# AUDIT.md — Recon findings (Hotel Companion build brief §2)

Date: 2026-07-20 · Branch: `feat/hotel-companion` · Base: `main` @ f7dc747

## 1 · Routes

**Marketing:** `/` (page.tsx, 1279 lines), `/about`, `/features`, `/demo`, `/privacy`, `/terms`, `not-found.tsx`.
**App (must keep functioning):** `/assistant/[id]`, `/dashboard`, `/dashboard/properties/[id]`, `/onboarding`, `/auth/login`, `/auth/signup`.
**API:** `/api/chat`, `/api/extract`, `/api/preview-chat`, `/api/assistant/[id]`, `/api/stripe/checkout`, `/api/stripe/webhook`.

## 2 · Design tokens actually in use

- `globals.css`: body bg `#141413`, text `#FAF9F5`. No CSS variables — all colors are hardcoded hex, inline styles or Tailwind arbitrary values.
- Section backgrounds vary ad hoc in `page.tsx`: `#1F1C19`, `#16131F` (founding partners — note the blue-ish tint, likely unintentional), `#1C1917` (pricing + onboarding + nav), `#161310` (footer + announcement bar).
- Accent copper `#C96A3A` / hover `#D4784A` used widely; green `#2D9E6B` (status dots); text tiers `#A8A099` / `#6B6560` / `#E8E3DC`.
- Divergence vs. brief §3.1: no `--bg #0E0C0B` layered-surface system exists; everything will migrate to `tokens.css` variables (P0-2).
- `REBUILD_NEW_SITE.md` (untracked, dated 2026-03-25) specifies a *different* token set and a self-serve pricing overlay — **superseded by this brief**; left untouched.

## 3 · Signature animation inventory (`globals.css`)

- `@keyframes fade-up` (defined; applied inline in `page.tsx` via IntersectionObserver adding style)
- `scroll-left` (22s) / `scroll-right` (38s) + `.marquee-row` (pause on hover) + `.marquee-chip` hover — the guest-question marquees, used in `page.tsx` lines ~169–210
- `pulse-ring`, `pc-arrow-pulse`, `pc-btn-blink`, `pc-dot-pulse` — used on CTAs/status dots (page.tsx, AnnouncementBar)
- `heading-hero/section/page/card` clamp utilities
- **No `prefers-reduced-motion` handling anywhere** — must be added (brief §3.4).

## 4 · Nav / Footer / AnnouncementBar / layout

- `site-nav.tsx`: fixed `top-10` (offset for AnnouncementBar), hide-on-scroll via scroll listener, mobile drawer (no focus trap, no Esc, no scroll lock), links Features/How It Works/Pricing/About + Sign In / See Live Demo / "Start Your Pilot" (→ `/onboarding`), `LanguageToggle`.
- `site-footer.tsx`: minimal single-row footer, links incl. `/#pricing`, `/#founding-partners`.
- `AnnouncementBar.tsx`: "Founding Partner Program · 3 spots remaining — lock in your rate for life" — SMB scarcity framing, links to `/#founding-partners`. Hidden on app routes. **Conflicts with enterprise repositioning** — will be removed/reworked in P0-3.
- `layout.tsx`: `pt-24` wrapper compensating for AnnouncementBar+nav; metadata is Place Companion; fonts Cormorant Garamond (`--font-serif`) + DM Sans (`--font-sans`) via `next/font` — matches CDS, keep.

## 5 · i18n shape

- `src/lib/i18n/translations.ts` (896 lines): `translations.{en,es}.{nav,hero,pain,realQuestions,stats,revenueIntent,…,footer,faq}`; `TranslationKey` type from `en`.
- `LanguageContext.tsx`: `useLang()` → `{lang, t, setLang}`; persisted `pc_lang` in localStorage; browser-language detect. `LanguageToggle` component.
- All marketing pages are client components consuming `t.*`. ES is fully populated for the current SMB site.

## 6 · Repositioning grep results

- "Place Companion": 15 files (layout, nav, footer, demo, terms, auth pages, dashboard, assistant client, onboarding, chat-interface, CalendlyModal, api/assistant route, translations).
- "chatbot": only `translations.ts` (FAQ answer "Is this a chatbot?").
- Pricing strings `$199/$599/free trial`: `page.tsx` (pricing section), `privacy`, `terms`, `dashboard` clients, `api/assistant/[id]/route.ts`, `translations.ts`. Note: dashboard/Stripe tier strings are **app runtime** — marketing copy is removed, app billing code left functional per P0-4 default.
- `placecompanion.com`: appears in privacy/terms contact emails and translations.

## 7 · Lighthouse baseline

Not run in this environment (no Chrome harness available headlessly here). Deferred to the Vercel preview sign-off pass; `npm run build` used as the regression gate instead.

## 8 · Config & assets

- `next.config.ts`: empty. Redirects for `/features`→`/platform`, `/about`→`/company` will be added (P4-2).
- `vercel.json`: minimal (framework/build only).
- `public/`: **only default Next.js SVGs** — no logo, favicon (beyond `src/app/favicon.ico`), OG image, tablet render, or photography. All imagery flagged `NEEDS REAL DATA`.
- Stack: Next 16.2 App Router, React 19.2, Tailwind v4 (PostCSS), Supabase, Stripe, Resend, `@ai-sdk/anthropic`, lucide-react, recharts, vitest.

## Open items requiring Eduardo (tracked, defaults applied)

1. **P0-4** self-serve `/onboarding`: default applied — app routes stay functional, all self-serve CTAs/pricing removed from marketing, Sign In demoted to subtle utility link.
2. **ES translation**: EN shipped from copy; ES keys mirror EN flagged `NEEDS ES` (no silent machine translation).
3. **Imagery**: none in repo — `NEEDS REAL DATA` comments at hero/tablet/OG slots.
4. **Medallia $47B**: held behind `NEEDS CONFIRM` — not rendered until confirmed.
5. Legal bodies: provided verbatim in copy file — used as-is.
6. Vercel project / DNS for hotelcompanion.ai: out of build scope (no deploy from this branch).
