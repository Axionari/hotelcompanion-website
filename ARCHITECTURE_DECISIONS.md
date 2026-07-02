# Place Companion — Architecture Decisions (the "Why")

This document preserves **engineering intent**. `CTO_HANDOFF.md` explains *how* the system works today; this document explains *why* it is shaped the way it is, so a future engineer never has to reverse-engineer rationale or ask the founders.

**Evidence rule.** Every claim is grounded in repository contents, git history, migrations, configuration, in-code comments, or existing docs (`REBUILD.md`, `prompt.md`). Where a rationale cannot be proven from the repository, it is marked **UNKNOWN**. Founder business reasoning that is not recorded is not invented.

**Primary evidence sources referenced throughout**
- Git history: 173 commits, `3d32e9b` (2026-03-10) → `8dc7a03` (2026-07-01).
- `REBUILD.md` — self-described "Master Context Document … for session continuity" (`4baf102`) and "project survival kit" (`64a7227`).
- `prompt.md` — a standing instruction set for AI-assisted edits (fixed design tokens + hard rules).
- `package.json`, `tsconfig.json`, `supabase/migrations/`, the six route handlers, and comments added during the July 2026 hardening pass.

---

## 0. Development Model — read this first; it explains most of what follows

The repository was produced by **AI-assisted solo development**: one founder iterating rapidly with an AI coding assistant, using `REBUILD.md` and `prompt.md` as persistent context carried between sessions.

**Evidence**
- `REBUILD.md` closes with "HOW TO START A NEW SESSION" → *"Say: 'Read REBUILD.md in the project root. That is our full context. Let's continue.'"*
- `prompt.md` is written *to an agent*: *"You are working on the Place Companion codebase. Read every file listed before making changes."* with hard rules — *"Never add new npm packages," "Never touch API routes, Supabase, Stripe, Resend, or auth logic," "Never introduce hex colors not listed above," "Run npx tsc --noEmit when done and fix all TypeScript errors."*
- Commit shape: 173 commits, most tiny and stylistic ("timestamp color/size," "force line break after 'One upgrade.'"), frequent `revert`/`restore` pairs (`c73355e`/`e954fc8`), and repeated `force redeploy` commits — the signature of a fast agent-in-the-loop workflow deploying straight to Vercel.

**Why this matters:** many properties of the codebase are optimizations for *AI-assisted iteration under a solo maintainer*, not team-scale architecture. This single fact pre-answers most "why didn't they just…?" questions:
- **Design tokens as constants** (`prompt.md` "DESIGN SYSTEM — NEVER DEVIATE") pin the visual system so the agent cannot drift it.
- **"Never add npm packages"** keeps the dependency surface small and predictable for both agent and human reviewer.
- **"Never touch API routes/auth"** protects the working backend from the stylistic edits that were the bulk of the work.
- **Duplication over abstraction** (three chat UIs; guardrail constants copied across routes) is what an agent editing file-by-file produces when no team is pushing to unify.

Read the code as *"correct, repetitive MVP produced quickly,"* not *"a team's considered abstractions."*

---

## Product Scope

### Decision
Build an AI guest-companion for independent boutique hotels, self-serve onboarded from a hotel's existing web presence.

### Context
- `REBUILD.md`: *"Place Companion is an AI guest companion platform for independent boutique hotels."*
- Tiers are named for the segment — `Boutique`, `Independent`, `Portfolio`.
- `REBUILD.md` "WHAT NOT TO DO — EVER" bans PMS/Cloudbeds/Mews language: an explicit refusal to position as a property-management integration.
- Engineering reality: a solo founder cannot integrate third-party hotel systems (each is months of work).

### Decision
A per-property assistant that answers guest questions about the property and destination, plus maintenance-issue escalation by email. Onboarding converts a URL/text into a working assistant *before* account creation (the "magic moment," heavily iterated: `8b7cfe3`, `de7b819`, `f93356e`).

### Why this decision was reasonable
The value proposition is expressible with only an LLM + a text knowledge base. Excluding PMS/booking integration let one person ship a complete vertical slice (onboarding → assistant → dashboard → billing) without depending on hotel IT.

### Benefits
- Tiny integration surface; no dependency on hotel systems.
- Self-serve onboarding is possible because the only required input is text.

### Costs
- Without PMS/booking data the assistant cannot answer reservation-specific questions; it is a concierge/FAQ layer, not an operational system.

### Alternatives considered
UNKNOWN. The boundary was *held* (explicit "no PMS" rule) but the deliberation is not recorded. Market rationale (why boutique vs. chains, TAM, competition) is **UNKNOWN** — not in the repository.

### When this decision should be revisited
When customers demand reservation-aware answers, or when the "no PMS" stance starts losing deals.

---

## Positioning (product narrative)

### Decision
Present the product as a "guest companion / guest intelligence" layer, and always say "assistant," never "chatbot."

### Context
Positioning evolved in history: hotel assistant → `5955c28` "positioning: elevate to guest intelligence platform" (2026-06-01) → `f93356e` "update onboarding flow to guest companion positioning" (2026-06-02). `REBUILD.md`: *"No 'chatbot' — always 'assistant'."*

### Decision
Copy and UI consistently use "assistant"/"companion"; "chatbot" is banned. Matches the premium dark design system (Cormorant Garamond serif, luxury palette).

### Why this decision was reasonable
Premium positioning for a premium (boutique/luxury) segment.

### Benefits / Costs
Benefit: coherent premium brand. Cost: none engineering-relevant.

### Alternatives considered
UNKNOWN (business/marketing choice).

### When this decision should be revisited
On a rebrand or segment change.

---

## Framework — Next.js, App Router, React

### Decision
Build a single Next.js (App Router) application on React, deployed to Vercel.

### Context
- The product needs three things at once: SSR marketing pages (SEO), an authenticated dashboard, and server endpoints that hold secret API keys. One framework serves all three.
- Development model (§0): fewer frameworks = less for the agent and the solo maintainer to reason about.
- `package.json`: `next` 16.x, `react`/`react-dom` 19; `src/app` layout.

### Decision
Next.js App Router with Route Handlers for all server logic; no separate backend service.

### Why this decision was reasonable
App Router unifies server components (dashboard SSR, `assistant/[id]` server read), route handlers (endpoints that must keep keys server-side), and static marketing pages into one deploy target. For a solo MVP, avoiding a separate API service removes an entire operational axis.

### Benefits
- One repo, one deploy, one mental model.
- Secrets stay server-side by construction.
- First-class Vercel deploy (`vercel.json` → framework `nextjs`).

### Costs
- Server logic is spread across many small route files rather than a cohesive service module.
- Lock-in to Next/Vercel conventions.

### Alternatives considered
UNKNOWN as a formal evaluation. History shows patterns were *matched to* the framework rather than weighed against alternatives: `2f7ec2f` "initialize anthropic client inside handler to match chat/route.ts pattern"; `526024a` "revert maxTokens back to maxOutputTokens to match AI SDK pattern."

### When this decision should be revisited
When server logic outgrows request/response handlers — background jobs, queues, long-running tasks — warranting a dedicated worker/service tier.

---

## Framework — App Router vs Pages Router

### Decision
Use the App Router, not the Pages Router.

### Context / Decision
`src/app`-based from the initial commit. Server components load owner-scoped data on the server (`dashboard/page.tsx`, `assistant/[id]/page.tsx`); route handlers stream LLM output.

### Why this decision was reasonable
Server components fetch data where the session cookie lives (no client data layer needed), and route handlers stream tokens cleanly — both App-Router-native.

### Benefits / Costs
Benefit: server-side data + streaming with no extra libraries. Cost: App Router's newer React-Compiler lint rules flagged working hydration effects; hardening downgraded two of them to warnings (see the comment in `eslint.config.mjs`).

### Alternatives considered
UNKNOWN.

### When this decision should be revisited
Not independently; tied to the Next.js decision.

---

## Database — Supabase, Postgres, RLS, JSON, schema

### Decision
Use Supabase (managed Postgres + Auth + RLS) as the entire backend, with per-property ownership enforced in the database.

### Context
- Constraint: a solo founder needs auth + a relational store + authorization without running separate services.
- Introduced together in `04cce84` "Phase 3A — Supabase auth, database persistence, and dashboard." Auth and DB arrived as one dependency.
- `package.json`: `@supabase/ssr`, `@supabase/supabase-js`; no other datastore.

### Decision
Postgres via Supabase; authorization as RLS policies keyed on `properties.user_id = auth.uid()`; child tables (`conversations`, `messages`, `issue_logs`) derive ownership via `property_id`. Extractor output is stored as `jsonb` (`properties.extracted_data`) alongside a flattened `system_prompt` text column.

### Why this decision was reasonable
- **One dependency** delivers auth + database + authorization — the highest-leverage choice for a solo MVP.
- **RLS** places the ownership boundary in the database, so a routing/middleware mistake cannot leak another hotel's data (defense-in-depth by construction).
- **`jsonb` for `extracted_data`** matches reality: the extractor's output shape is LLM-driven and evolving; rigid columns would fight it. The *derived* `system_prompt` is stored as plain text because that is exactly what the assistant route consumes at runtime — denormalizing avoids rebuilding the prompt per request.

### Benefits
- Auth + DB + authz in one managed service; minimal ops.
- RLS is a hard, per-row boundary independent of app code.
- `jsonb` absorbs extractor schema churn without migrations.

### Costs
- Authorization lives in SQL policies, which must be read alongside code to understand access.
- RLS is easy to get subtly wrong — and it *was* wrong initially (over-permissive public policies), corrected during hardening (`26c3dc6`, migration `20260701000001`). See §Security and §Timeline.
- Storing both `extracted_data` and a derived `system_prompt` means the prompt can drift from source data if a builder changes (there is no regeneration path today — `CTO_HANDOFF.md` §16).

### Why the schema has 8 tables when 4 are unused
Live: `properties`, `conversations`, `messages`, `issue_logs`. Unused (no code writers): `api_cost_logs`, `error_logs`, `agent_memory_logs`, `ambassador_referrals`. Evidence: `REBUILD.md` lists all eight and describes an `/admin` "command center" and analytics that were never built. These four are **forward scaffolding** created ahead of their features. Status: PLANNED (§Timeline).

### Alternatives considered
UNKNOWN. No evidence of a considered alternative datastore. RLS policy *shape* evolved incrementally (the four unused tables carried `Service role full access` policies that hardening removed), indicating policies were added piecemeal, not designed once.

### When this decision should be revisited
- Supabase-as-everything: when you need capabilities outside its model (heavy analytics, multi-region writes, background processing).
- RLS-as-authz: keep it; revisit only if privileged paths move entirely behind a trusted service layer.
- `jsonb extracted_data`: when the extractor output stabilizes enough to warrant typed, queryable columns.

---

## Authentication — Supabase Auth, middleware, ownership validation

### Decision
Supabase Auth (email + password) with a middleware session gate, a per-page re-check, and RLS ownership validation.

### Context
- Guests are anonymous by design (they scan a QR code); only owners authenticate.
- `middleware.ts` matches `/dashboard/:path*` and `/auth/:path*`.
- `dashboard/page.tsx` independently calls `getUser()` and redirects.

### Decision
Three layers: middleware redirect (UX), server-side `getUser()` per protected page (enforcement), RLS (authoritative data scoping). Money-touching mutations re-verify ownership (`/api/stripe/checkout`).

### Why this decision was reasonable
Middleware alone is a UX convenience and has been bypassable in various framework versions; relying on it for security would be fragile. Putting the real boundary in `getUser()` + RLS means the worst case of a middleware bypass is "no data returned," not "someone else's data." Checkout re-verifies ownership because Stripe metadata is attacker-influenced.

### Benefits
- Defense in depth: three independent layers must all fail to leak data.
- Guests need no accounts; friction is minimal at the point of value.

### Costs
- Redundant `getUser()` calls (middleware + page) add a little latency on protected routes — an intentional trade of latency for safety.

### Alternatives considered
UNKNOWN (auth came bundled with the Supabase decision).

### When this decision should be revisited
When you add roles beyond "owner" (staff, admin, multi-user properties); the current model assumes one `user_id` per property.

---

## AI — provider, server-side inference, prompt persistence, streaming, guardrails, issue detection, preview

### Decision (provider)
Anthropic via the Vercel AI SDK (`@ai-sdk/anthropic`, `ai`), model `claude-haiku-4-5-20251001` — **not** the official Anthropic SDK.

### Context
- `REBUILD.md` "WHAT NOT TO DO — EVER": *"No @anthropic-ai/sdk — use @ai-sdk/anthropic."* A **verified, explicitly recorded** rejection of an alternative.
- The same model id is used in all four AI routes.

### Why this decision was reasonable
The Vercel AI SDK integrates natively with Next.js streaming (`streamText().toTextStreamResponse()`) — the path of least resistance on Vercel. Haiku is the low-latency/low-cost tier, appropriate for concierge Q&A and JSON extraction where large-model reasoning is not required.

### Benefits
- One SDK spanning provider + streaming + framework.
- Haiku keeps per-message cost/latency low.

### Costs
- Weaker reasoning than larger models; extraction relies on strict-JSON prompting with a single repair pass (`/api/extract` strips code fences and retries the parse once).
- SDK-level coupling (a benefit for provider swaps, a lock-in otherwise).

### Alternatives considered
**Verified:** the official `@anthropic-ai/sdk` was explicitly rejected for `@ai-sdk/anthropic` (`REBUILD.md`). Other providers: UNKNOWN.

### When this decision should be revisited
When quality demands a stronger model (per-property upgrade), when Haiku volume makes cost material, or when multi-provider routing is needed.

---

### Decision (server-side inference + prompt isolation)
Run all inference server-side; never let the browser supply the production system prompt.

### Context — honest history
- `ANTHROPIC_API_KEY` must stay secret → inference is server-side.
- **Nuance:** the browser *could* originally influence the prompt. `3e9dc19` "fix(api/chat): handle both message formats and **rawSystemPrompt**" added client-supplied prompts *deliberately*, so several demo surfaces could reuse one endpoint. It was a convenience — but it created an open, unmetered proxy.
- Hardening (`26c3dc6`) made `/api/chat` ignore the client prompt and use the fixed `marazulChatConfig.systemPrompt`; the other routes were capped and rate-limited.
- **Verified leftover:** `inline-demo.tsx` still *sends* `body: { rawSystemPrompt: … }` (line 66), but the server no longer reads it (`chat/route.ts` reads only `messages`). The field is now inert client-side cruft — harmless, but a future engineer will misread it as active. Safe to delete.

### Why this decision was reasonable (then and now)
At demo-build time, a shared prompt-accepting endpoint was the fastest way to power multiple demo surfaces. Once the app had real cost/abuse exposure, server authority over the prompt became correct. The evolution is legitimate: flexibility first, isolation once it mattered.

### Costs
- `/api/preview-chat` still necessarily relays a client-supplied prompt, because onboarding previews an assistant *before* the property is saved. Bounded by input caps + rate limiting rather than eliminated (comment in `preview-chat/route.ts`).

### When this decision should be revisited
If preview abuse becomes real: persist a draft property server-side and reference it by id instead of relaying the prompt. Also delete the dead `rawSystemPrompt` send in `inline-demo.tsx` whenever that file is next touched.

---

### Decision (prompt persistence)
Store each property's assembled `system_prompt` as text; build it once from extractor output.

### Context / Why
- The assistant route reads `properties.system_prompt` directly — no per-request assembly. Denormalizing trades storage for runtime simplicity and determinism.
- **Critical invariant (established in hardening `75543e7`):** the onboarding *preview* and the saved *production* prompt are produced by the **same** builder, `src/lib/extracted-prompt.ts`. Before hardening, two divergent builders existed and production silently dropped amenities/nearby/policies. Now locked by a unit test.

### Costs
- The stored prompt can drift from `extracted_data` if the builder changes and old rows aren't rebuilt (no regeneration path — `CTO_HANDOFF.md` §16).

### When to revisit
When you add prompt regeneration/editing: centralize on the single builder and add a backfill.

---

### Decision (streamed responses)
Stream model output token-by-token.

### Context / Why
- `streamText(...).toTextStreamResponse()` everywhere. Chat UX needs incremental output; streaming is the AI-SDK-native default.
- Clients consume the stream three different ways (manual reader in `AssistantClient`/onboarding; `useChat` + `TextStreamChatTransport` in `inline-demo`; manual reader with a `429` branch in `chat-interface`). The `429` branch predates server-side rate limiting — UI that anticipated a limit later implemented in hardening.

### Costs
- Three stream-consumption implementations (see §Repository). Behavior is consistent but must be changed in three places.

### When to revisit
When unifying the chat components (see Flexible Layers).

---

### Decision (guardrails)
Append fixed guardrail instructions (hallucination, fallback, issue-handling) plus a style instruction to every non-demo prompt.

### Context
Added deliberately over 2026-03-13: `43c0d90` "conversational style selector … and hallucination guardrails," `2159091` "assistant fallback behavior," `2171f17` "add issue handling instruction to system prompt." The constants are duplicated verbatim in `/api/assistant/[id]` and `/api/preview-chat`.

### Why this decision was reasonable
Guardrails are prompt-engineering, iterated empirically against demo behavior. Keeping them as string constants next to the route made fast iteration easy for the AI-assisted workflow. Duplication was the byproduct (§0).

### Costs
Two copies can drift. Consolidation is recommended (LOW/MEDIUM debt, `CTO_HANDOFF.md` §11).

### Alternatives considered
UNKNOWN.

### When to revisit
Fold guardrails into `extracted-prompt.ts` or a sibling module the next time either route is touched.

---

### Decision (issue detection by keyword)
Detect maintenance issues with a bilingual keyword list + a room-number regex, then email the owner and log to `issue_logs`.

### Context
Built incrementally: `fccf574` (Resend alerts) → `116fadc` (Spanish keywords) → `2171f17` (prompt instruction) → `a500943` (two-stage: initial alert + room-number follow-up) → `6c6f691` (issue_logs open/resolved). Logic now lives in `src/lib/issue-detection.ts` (extracted during hardening to make it testable).

### Why this decision was reasonable
Keyword matching is trivial to implement, debug, and extend bilingually — appropriate for an MVP escalation path where a false positive costs an extra email, not a safety failure. Incremental construction (English → Spanish → two-stage) matches a ship-and-iterate approach.

### Benefits / Costs
Benefit: simple, deterministic, cheap. Cost: over-triggers (`help`, bare 1–4-digit numbers) — documented debt (`CTO_HANDOFF.md` §11 MEDIUM-3). Kept as-is through hardening to avoid changing escalation behavior.

### Alternatives considered
UNKNOWN (an LLM classifier is an obvious future option; no evidence it was weighed).

### When to revisit
When alert precision matters to customers; replace with a classifier or keyword+context gating (tests already scaffolded).

---

### Decision (preview assistant architecture)
Let onboarding preview a working assistant before account creation, powered by the same prompt that will be saved.

### Context / Why
The "magic moment" is the core acquisition mechanic (heavy iteration: `8b7cfe3`, `de7b819`, `f93356e`). Preview uses `/api/preview-chat` with `extracted.systemPrompt`; production saves that same string — the preview==production invariant (hardening `75543e7`).

### Costs
Preview must accept a client-relayed prompt (property not yet persisted), the one place server-prompt-authority is relaxed (bounded by caps + rate limits).

### When to revisit
If preview abuse warrants persisting a draft property server-side.

---

## Payments — Stripe, billing flow

### Decision
Stripe subscriptions via Checkout Sessions, activated by a signature-verified webhook.

### Context
- Introduced `b5cb9a1` "Phase 4 Stripe billing and upgrade flow"; `bcf3fdc` added Stripe to dependencies immediately after.
- Billing state lives on `properties` (`subscription_status`, `stripe_customer_id`, `stripe_subscription_id`, `subscription_price_id`).

### Decision
`UpgradeModal` → `/api/stripe/checkout` (session-authenticated, ownership-validated, price-allowlisted after hardening) → Stripe Checkout → `/api/stripe/webhook` (verifies signature, updates `properties`).

### Why this decision was reasonable
Stripe Checkout offloads PCI scope and the entire payment UI. A webhook-driven state update is the standard, minimal integration — the least-code path to real subscriptions for a solo founder.

### Benefits
- No card handling in-app; Stripe hosts checkout.
- Webhook signature verification was correct from the start (`constructEvent` with `STRIPE_WEBHOOK_SECRET`) — the security-critical part was done right.

### Costs
- **Price configuration drift.** `UpgradeModal` hardcodes March-era price IDs ($299/$549) while `STRIPE_PRICE_*` env vars hold a newer set ($349/$599). Root cause is verifiable in history: pricing was reworked at least three times — Phase 4 (`b5cb9a1`), `2428d34` "rebrand tiers, Boutique $199, free trial" (2026-05-05), `b21e47e` "build0: pricing update, tier rename" — and the modal's literals were not kept in sync. The modal is internally consistent (it charges what it displays), and the checkout allowlist accepts both sets, so no checkout breaks. **Which price is intended is UNKNOWN** and needs a business decision (`CTO_HANDOFF.md` §16).
- Coupon validity is checked cosmetically client-side; Stripe is the source of truth.

### Alternatives considered
UNKNOWN.

### When to revisit
Immediately for the price-ID source of truth (move to env or DB, single source). Structurally, when you need proration, seats, or usage-based billing.

---

## Deployment — Vercel

### Decision
Deploy to Vercel as a standard Next.js app.

### Context
- `vercel.json`: framework `nextjs`, `buildCommand: npm run build`, `outputDirectory: .next`.
- History contains many `force redeploy` commits and, until hardening, **no CI** — deploys were manual pushes to Vercel.

### Why this decision was reasonable
Vercel is the zero-config host for Next.js: preview deploys, serverless routing, managed secrets, no infra to run. For a solo maintainer this removes the entire deploy/ops axis.

### Benefits
- Git-push deploys, managed serverless, native Next support.

### Costs
- Serverless statelessness is *why* rate limiting is in-memory per-instance (see §Security). Anything needing shared state (rate limits, caches, locks) requires an external store.
- The pre-hardening workflow had no automated gate; "force redeploy" was the release mechanism.

### Alternatives considered
UNKNOWN.

### When to revisit
If you need long-running processes, background jobs, or self-hosting for compliance/cost.

---

## API Design — App Router Route Handlers, current boundaries

### Decision
Implement all server capabilities as small, single-purpose route handlers.

### Context / Decision
Six handlers, each one responsibility: `chat` (demo), `preview-chat` (onboarding), `extract` (URL/text → JSON), `assistant/[id]` (production guest chat), `stripe/checkout`, `stripe/webhook`. Boundaries follow the *surfaces* that call them, not a domain-layer design.

### Why this decision was reasonable
Route-per-surface is the natural App Router grain and keeps each endpoint independently reasoned about — well-suited to incremental, AI-assisted construction where each feature arrived as its own route (`8b7cfe3` added extract + preview-chat together; billing routes came in Phase 4).

### Benefits
Clear one-file-per-capability mapping; easy to locate and change in isolation.

### Costs
Cross-cutting logic (guardrails, message normalization, rate limiting) is duplicated or must be factored into `lib/` after the fact — which is exactly what hardening did (`rate-limit`, `url-guard`, `issue-detection`, `extracted-prompt`).

### Alternatives considered
UNKNOWN.

### When to revisit
When the number of routes or shared concerns grows enough that a service/middleware layer meaningfully reduces duplication.

---

## Security — trust boundaries, service-role separation, rate limiting, prompt isolation

### Decision
Make the server the sole authority for prompts, privileged data access, and payments; treat all browser input as untrusted.

### Context — honest history
The **initial** design trusted the client in places: `/api/chat` accepted `rawSystemPrompt` (`3e9dc19`), and the first RLS policy set exposed all active-property columns and allowed anonymous conversation/message writes (baseline migration `20260701000000` records this pre-hardening state). These were not weighed tradeoffs — they were MVP shortcuts that became risks once the app faced real exposure.

### Decision (current, post-hardening `26c3dc6`)
- Guest chat reads/writes go through the **service-role** client inside `/api/assistant/[id]`; anonymous RLS access to `properties`/`conversations`/`messages` was removed and **verified blocked by live REST probe** (`CTO_HANDOFF.md` §13).
- `/api/chat` no longer honors a client prompt; the public assistant page no longer ships `system_prompt`.
- All AI routes are rate-limited and input-capped; `/api/extract` is SSRF-guarded (`url-guard.ts`).
- Checkout requires a session, validates ownership, and allowlists `priceId`.

### Why service-role separation exists
RLS correctly forbids anonymous writes, but guests legitimately need their chats persisted. Rather than open RLS for anonymous writes (the original, unsafe choice), the server performs those writes with the service role — a trusted context that never reaches the browser (`src/lib/supabase/service.ts`). This keeps the RLS boundary strict while still supporting anonymous guests.

### Why rate limiting is in-memory (and its limit)
`src/lib/rate-limit.ts` is a per-instance fixed window. Its comment states the tradeoff: on serverless the effective limit is `limit × warm instances` — *"coarse abuse protection, not billing."* It blunts trivial abuse without adding an external dependency (consistent with "minimal dependencies," §0). A shared store is the documented upgrade when abuse/cost becomes real.

### Why prompt isolation matters
The system prompt is the product's core IP and may contain owner-private notes; exposing it (public page, or a client-controlled proxy) leaks IP and enables free use of the API key. Hardening closed both.

### Alternatives considered
UNKNOWN for the original design. The hardening deliberately chose the *minimal* correct fix each time (service-role writes over broadening RLS; lazy Stripe init over restructuring) to preserve behavior — a principle stated in the hardening commits.

### When to revisit
Rate limiting at real traffic; the preview-chat prompt relay if abused.

---

## Testing & CI — Vitest, GitHub Actions

### Decision
Add a minimal Vitest suite over pure logic, gated by GitHub Actions.

### Context
There were **no tests and no CI** before hardening; `prompt.md`'s only quality gate was *"Run npx tsc --noEmit when done."* Hardening added Vitest (`f8d4e8b`) with 15 tests over `extracted-prompt`, `issue-detection`, `url-guard`, and a CI workflow running lint + tsc + test + build.

### Why this decision was reasonable
For an MVP, the highest-value tests are the pure, high-consequence functions: prompt field-mapping (which had a real bug), issue detection, and the SSRF guard. Testing React UI or full route handlers would be higher-cost, lower-yield at this stage. Vitest is the standard low-friction runner for a TS/Next project and lives entirely in `devDependencies` (no production-bundle impact).

### Benefits
- The preview==production invariant and the SSRF guard are regression-locked.
- CI makes lint/type/test/build failures blocking instead of discovered in production.

### Costs
Coverage is intentionally narrow (no route-handler/UI integration tests).

### Alternatives considered
UNKNOWN (no prior test tooling to compare).

### When to revisit
Add route-handler/integration tests when the money paths (webhook state transitions, checkout ownership) or multi-step onboarding become high-churn.

---

## Repository — layout, module boundaries, conventions

### Decision
Standard Next `src/` layout; centralized UI copy; server helpers in `lib/`; design tokens treated as constants.

### Context / Decision
- `src/app` (routes), `src/components` (UI), `src/lib` (helpers + configs + i18n), `src/types`. Path alias `@/*` → `src/*` (`tsconfig.json`).
- All EN/ES copy is in one typed module (`src/lib/i18n/translations.ts`) — chosen over an i18n framework because there are exactly two locales and type safety was wanted with zero runtime deps.
- Styling is inline with fixed hex tokens, per `prompt.md`/`REBUILD.md` "NEVER DEVIATE."

### Why these conventions exist
- **Typed everything** (`tsconfig` `strict`; `prompt.md` "fix all TypeScript errors"): the type checker is the reviewer of last resort in an AI-assisted, test-light workflow.
- **Centralized copy**: a solo bilingual product keeps all strings in one place so coverage is visible and type-enforced.
- **Design tokens as constants**: prevent visual drift across many agent edits (§0).

### Costs
- **Duplication over abstraction** is a recurring convention, not an oversight: three chat UIs, duplicated guardrails, and (post-hardening side effect) two now-orphaned prompt-builder files (`build-system-prompt.ts`, `demo-config.ts`, both zero importers since `26c3dc6`).
- Large single files (`page.tsx` ~1,280 lines) because marketing pages were iterated as monoliths.

### Alternatives considered
UNKNOWN.

### When to revisit
Consolidate chat UIs and guardrails when either is next touched; adopt an i18n library only if locales grow beyond two.

---

## Architectural Timeline

Chronological, evidence-based. Decision → Reason → Impact → Status.

| Date | Decision | Reason (evidenced) | Impact | Status |
|---|---|---|---|---|
| 2026-03-10 | Initial platform (Next App Router + dark design system) | `3d32e9b`; design system in `prompt.md`/`REBUILD.md` | Foundation | **ACTIVE** |
| 2026-03-12 | AI routes; `/api/chat` accepts `rawSystemPrompt` | `3e9dc19` — one endpoint for multiple demo surfaces/message formats | Enabled demos; later a security risk | **DEPRECATED** (server ignores it now; client still sends a dead field) |
| 2026-03-12 | `/api/extract` + `/api/preview-chat` | `8b7cfe3` — onboarding "magic moment" | Self-serve onboarding | **ACTIVE** |
| 2026-03-12 | Supabase auth + DB + dashboard (Phase 3A) | `04cce84` — auth+DB+authz in one dependency | Backend established; initial RLS over-permissive | **ACTIVE** (RLS corrected later) |
| 2026-03-12 | Analytics/revenue signals (Phase 3B) | `f71bcb4` | `messages.revenue_signal`, dashboard | **ACTIVE** (partial) |
| 2026-03-12 | Stripe billing (Phase 4) | `b5cb9a1` | Subscriptions via Checkout + webhook | **ACTIVE** |
| 2026-03-13 | Guardrails + conversational styles | `43c0d90`, `2159091`, `2171f17` — empirical prompt safety | Guardrail constants (duplicated) | **ACTIVE** |
| 2026-03-13 | Email issue alerts (Resend) → bilingual → two-stage | `fccf574`→`116fadc`→`a500943` | Escalation path | **ACTIVE** |
| 2026-03-13 | Unified knowledge input incl. PDF upload | `de7b819` | Onboarding accepts URL/text/PDF | **ACTIVE** (PDF *content* parsing removed, below) |
| 2026-03-13 | **Remove PDF parsing** | `e9b3918` "fix: remove pdf parsing to fix build error" | PDFs accepted but only filename recorded | **DEPRECATED/incomplete** (this is *why* PDFs aren't parsed) |
| 2026-03-14 | `issue_logs` open/resolved + dashboard | `6c6f691` | Issue lifecycle | **ACTIVE** |
| 2026-03-23 | UI skin system (dark/light/bright) | `26a8ac6` — `ThemeProvider` + `propertyConfigs` | Per-demo theming scaffolding | **ACTIVE** (multi-demo routes PLANNED) |
| 2026-03 → 06 | Repeated pricing/positioning reworks | `2428d34`, `b21e47e`, `5955c28`, `f93356e` | Tier renames; **price-ID drift** in modal | **TRANSITIONING** (source-of-truth UNKNOWN) |
| 2026-07-01 | Security hardening | `26c3dc6` — close proxy, lock RLS, auth checkout, SSRF | Server authority established | **ACTIVE** |
| 2026-07-01 | Preview==production prompt | `75543e7` — single builder | Correctness invariant + test | **ACTIVE** |
| 2026-07-01 | CI + deps + secret-free build | `f8d4e8b` | First automated gate; Next → 16.2.10 | **ACTIVE** (not yet run on GitHub) |
| 2026-07-01 | Hygiene removals | `8dc7a03` | Dead code/asset/dep removed | **ACTIVE** |
| Future | `/admin`, cost/critic/referral analytics | `REBUILD.md` intent; 4 empty tables | Not built | **PLANNED** |
| Future | Multi-vertical assistants | `types/property.ts` 6 verticals; `build-system-prompt.ts` | Scaffolding only, now orphaned | **PLANNED/UNKNOWN** |

---

## Design Principles (inferred only from repeated evidence)

1. **Minimal dependencies.** `prompt.md`: "Never add new npm packages." ~12 runtime deps; hardening added only dev-only Vitest. *Evidence: dependency list + explicit rule + unchanged bundle.*
2. **Typed boundaries as the safety net.** `tsconfig` `strict`; `prompt.md` "fix all TypeScript errors." In a test-light, AI-assisted workflow, the type checker is the primary correctness gate. *Evidence: strict config + standing rule + `tsc` green throughout.*
3. **Protect the working core; iterate the surface.** `prompt.md`: "Never touch API routes, Supabase, Stripe, Resend, or auth logic." Most commits are UI/copy; backend changed rarely and deliberately. *Evidence: rule + commit distribution.*
4. **Ship the vertical slice; scaffold the rest.** Onboarding→assistant→dashboard→billing all work; analytics tables and `/admin` are pre-created but empty. *Evidence: phase commits + unused tables.*
5. **Duplication over premature abstraction.** Three chat UIs, duplicated guardrails. *Evidence: repeated across the codebase; consistent with the solo/AI model.*
6. **Progressive hardening.** Open proxy + open RLS shipped first; closed in a dedicated pass once real exposure existed. *Evidence: `3e9dc19`/baseline policies → `26c3dc6`.*
7. **Minimal-diff correctness.** Hardening consistently chose the smallest change that removed a risk (service-role writes over broadening RLS; lazy Stripe init over restructuring). *Evidence: hardening commit messages + diffs.*

**Principles NOT claimed** (insufficient/contradictory evidence): "test-driven" (tests arrived only at hardening); "DRY" (duplication is the norm); "security-first from day one" (it was progressive, not first).

---

## Intentional Non-Decisions (verified)

Things deliberately postponed or simplified — with evidence they were choices, not omissions:

- **PDF content parsing — deferred by necessity.** Attempted (`de7b819`), removed to fix a build error (`e9b3918`); the upload UI remains but only the filename is used. Cut to ship, not never-considered. (Resuming is UNKNOWN — `CTO_HANDOFF.md` §16.)
- **`/admin` command center + analytics — postponed.** `REBUILD.md` describes them; four tables exist unused. Scaffolded ahead of implementation.
- **Multi-vertical support — not generalized.** Six verticals are typed (`types/property.ts`) but only `hotel_resort` is exercised; the generic builder is now orphaned. Kept as scaffolding, not wired.
- **Rate limiting — intentionally coarse.** In-code comment: "coarse abuse protection, not billing." Per-instance limits accepted to avoid an external dependency.
- **Observability — intentionally minimal.** `console.*` only; no error-reporting service. Consistent with minimal dependencies.
- **Tests — intentionally narrow.** Only pure high-consequence logic is covered; UI/route integration tests deliberately out of scope for the hardening pass.
- **i18n framework — intentionally avoided.** Two locales in a typed object; no library.

---

## Stable Foundations (do not change without a compelling reason)

1. **RLS as the authorization boundary + service-role separation.** The security core. It was wrong once and fixed with verification; changing policies casually re-opens data exposure. Any change must be re-verified with the anon-key probe in `CTO_HANDOFF.md` §13. *A single mistake here leaks other hotels' data.*
2. **Server-side inference + prompt isolation.** Keeps the API key and prompt IP off the client. *Reversing it re-creates the open-proxy risk that was deliberately closed.*
3. **Stripe webhook signature verification + ownership-validated checkout.** The money path; correctness and fraud-prevention depend on it. *Signature verification was the one billing thing done right from the start — keep it.*
4. **Preview==production prompt builder (`extracted-prompt.ts`).** Guarantees customers get the assistant they demoed. *Divergence here is invisible and directly harms the core value prop.*
5. **Three-layer auth (middleware + per-page `getUser` + RLS).** Defense in depth; each layer covers the others' failure modes.
6. **Strict TypeScript.** The primary correctness gate in a test-light codebase. *Loosening it removes the main safety net.*

---

## Flexible Layers (intentionally replaceable)

1. **The three chat UI components.** Duplicated by circumstance, not design; safe to unify behind one component. Behavior is already consistent.
2. **Guardrail/style constants.** Prompt-engineering strings; expected to change and safe to consolidate.
3. **Rate-limit implementation.** `rate-limit.ts` is deliberately swappable for a shared store (Upstash/Vercel KV) with no change to callers.
4. **Issue-detection heuristic.** `issue-detection.ts` is isolated and tested; the keyword approach can be replaced with a classifier behind the same functions.
5. **Marketing/UI copy and design tokens.** Centralized (`translations.ts`, inline tokens); changing them cannot affect data or security.
6. **The unused analytics tables.** Wire them up or drop them freely; nothing reads them today.
7. **Model choice.** `claude-haiku-4-5` is a one-line change per route behind the AI SDK.
8. **The dead `rawSystemPrompt` send in `inline-demo.tsx`.** Inert; safe to remove.

---

## Engineering Philosophy (evidence-based)

The repository consistently demonstrates a coherent philosophy for an early, AI-assisted, solo-maintained product:

- **MVP-first, vertical-slice delivery.** Every user-facing path works end to end; depth (analytics, admin, PDF parsing, multi-vertical) is scaffolded or deferred. *Evidence: phase commits, unused tables, removed PDF parsing.*
- **Minimal moving parts.** One framework, one datastore-that-is-also-auth, one AI SDK, one host, ~12 runtime deps, "never add packages." *Evidence: `package.json` + `prompt.md`.*
- **Server authority over untrusted clients — reached progressively.** Flexibility first (client-supplied prompts, permissive RLS), authority once exposure was real. Not security-first, but security-*eventually*, done deliberately in one pass. *Evidence: `3e9dc19`/baseline → `26c3dc6`.*
- **Types as the reviewer.** Strict TS is the standing quality gate where tests were absent. *Evidence: `tsconfig` + `prompt.md` + `tsc` green throughout.*
- **Protect the core, iterate the surface.** Backend/auth/billing changed rarely and carefully; UI/copy churned constantly. *Evidence: commit distribution + "never touch API routes" rule.*
- **Minimal-diff, behavior-preserving change.** The hardening pass institutionalized this: smallest change that removes the risk, always verified. *Evidence: hardening commits.*

This is not a team-scale architecture and does not pretend to be. It is a disciplined MVP: small, typed, deployable, now secured — built to be evolved deliberately, one protected change at a time.

---

*Grounded in repository contents, git history (`3d32e9b` … `8dc7a03`), migrations, configuration, in-code comments, and existing docs. Business rationale not recorded in the repository is marked UNKNOWN rather than invented.*
