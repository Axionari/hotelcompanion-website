# Terminology

Canonical language for Hotel Companion. Applies to the marketing site, product
UI, documentation, investor materials, decks, and anything an agent writes.

This exists to prevent drift. Terminology hardens fast across a company; once
three names for one thing are in circulation, every new page picks one at
random. If you are adding copy and the term you want is not here, add it here
first.

---

## The hierarchy

```
Brand                Hotel Companion
Category             Hospitality Intelligence Platform
Core architecture    Hospitality Intelligence Operating System
```

**The Operating System powers the Platform. They are not interchangeable.**

- The **Platform** is what a customer buys and what we lead with.
- The **Operating System** is the engine underneath. Use it only when
  describing architecture — how the thing works, not what it is.

### The default framing sentence

> Hotel Companion is the Hospitality Intelligence Platform, powered by a
> Hospitality Intelligence Operating System.

Use this the first time the product is introduced on any surface. Once the
relationship is established, shorter variations are fine ("the Platform", "the
Companion", "Hotel Companion").

### Spanish

| English | Spanish |
| --- | --- |
| Hospitality Intelligence Platform | Plataforma de Inteligencia Hotelera |
| Hospitality Intelligence Operating System | Sistema Operativo de Inteligencia Hotelera |

---

## Concepts (lowercase, not categories)

These are things the Platform **produces**. They are never the product name.

- **guest intelligence** — what the system learns about guests
- **operational intelligence** — what the system learns about how the hotel runs
- **hospitality intelligence** — the two together; the category's subject matter

✅ "The platform generates guest intelligence."
✅ "Guest intelligence becomes operational intelligence."
❌ "Hotel Companion is a Guest Intelligence Platform."

The distinction is the whole point: *guest intelligence* is an output,
*Hospitality Intelligence Platform* is what you buy.

---

## Capabilities (never the category)

**Voice-first** is a capability, not a category. The product spans voice agents,
the in-room voice companion, chat, self-navigation, and offline knowledge
access — leading with any single modality understates it.

✅ "Voice-First by Design." (Platform capability section)
✅ heroChips: `VOICE-FIRST`
❌ "The Voice-First Guest Intelligence Platform"

Same rule for chat: never describe the product as chat-only.

---

## Avoid

| Do not use | Use instead | Why |
| --- | --- | --- |
| Guest Intelligence Platform | Hospitality Intelligence Platform | Generic — competitors can claim it. Scopes the product to guests only. |
| Voice-First Guest Intelligence Platform | Hospitality Intelligence Platform | Both problems at once: modality-bound and guest-bound. |
| Hospitality Intelligence Operating Layer | Hospitality Intelligence Operating System | "Layer" is a descriptor, not a name. |
| Operating Layer | Operating System | Same. |
| AI Guest Companion *(marketing / guest-facing)* | Hotel Companion, "your Companion" | Guests do not need reminding they are talking to AI. |
| AI Concierge *(describing us)* | — | This is the category we are moving beyond. |

**"intelligence layer" as a descriptor is fine** — "the intelligence layer that
connects conversations, departments, knowledge, and operations." What is banned
is *Operating Layer* as a proper name.

**"AI Concierge" is allowed when discussing competitors or the prior
generation** — e.g. the essay *Beyond the AI Concierge*.

---

## Positioning: what we are not

Use confidently, never defensively. Pair each negative with the positive.

- not a guest messaging platform → it turns conversations into operational
  intelligence shared across departments
- not a PMS replacement → it sits above your systems and understands the
  conversations between them
- not another chatbot → it is the layer that connects conversations,
  departments, knowledge, and operations
- not a staff replacement → it resolves the routine so the team is free for the
  moments that matter

---

## Deliberate exceptions

Places where older terminology is intentionally left alone. Do not "fix" these.

- **Library essays** (`src/content/library/*.md`) — use "guest intelligence" as
  an industry concept, which is correct under this guide. Titles and slugs are
  URLs; do not rename. `the-rise-of-guest-intelligence-platforms` describes an
  industry shift, not our category.
- **Runtime LLM prompts** (`src/lib/extracted-prompt.ts`,
  `src/lib/marazul-config.ts`, `src/app/api/preview-chat/route.ts`,
  `src/app/onboarding/page.tsx`) — "AI Guest Companion" here is a behavioural
  role descriptor fed to the model, not customer-facing copy. Changing it
  changes product behaviour. The *guest-facing greeting* in
  `src/components/chat-interface.tsx` is customer-facing and does follow this
  guide.
- **No hero eyebrow on the homepage.** A category label stacked above the H1 is
  the generic SaaS move. The hero opens on the statement itself. Do not
  reintroduce one.

---

## Where copy lives

Marketing copy is not authored in components. It lives in
`src/lib/i18n/marketing/*.ts` as `{ en, es }` pairs, with `const es: typeof en`
enforcing key parity at compile time — if you add an English string, the build
fails until the Spanish exists.

`handoff/HotelCompanion__Site_Copy*.md` are the source decks the i18n modules
mirror. Update both, or the "verbatim — do not edit here" note at the top of
each module becomes a lie.
