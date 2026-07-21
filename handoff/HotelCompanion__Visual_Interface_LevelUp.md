# Hotel Companion — Visual Interface Level-Up ("The Interface of 2029")

**For Claude Code, branch `feat/hotel-companion`. Read after the site is at RC parity (it is). This is the next
tier: less text / product-first, richer animation, and — the headline — the tablet becomes an *image-rich visual
interface*, not a voice-agent. Styling/UX + device-content only; do not rewrite approved marketing copy (you MAY
compress explanatory paragraphs into step captions per §3).**

## 0 · The idea (say it, then build it)
Restaurant Companion's device is a **voice/text** agent — "Welcome back, Maya," a menu line, a payment. That was
right for restaurants. **Hotel Companion is different: the guest is *in the room*, and should *see* — the suite,
the dish, the beach, the spa.** The tablet is a premium **hospitality display OS**, and the product is
**multi-surface across the whole guest journey**, and every stage of it is a **revenue moment**:

**The full journey = PRE · DURING · AFTER (the site must show all three acts, each a revenue moment):**

**PRE — discovery, selling, direct booking.** Before they're a guest, the Companion is the hotel's *best
employee*: it browses with them, sells the property and its experiences, answers everything, and closes the
**direct booking** (plus the first upsell). The whole point — **an interface so good the guest books direct
instead of going to Expedia / Booking / an OTA.** That is the headline revenue story: **capture the direct
booking, kill the 15–25% OTA commission, own the guest relationship,** and lift ADR at the point of sale.

**DURING — every device, an interface adapted to each.** In-room voice tablet (full image-rich OS), smartphone
(chat + visual + voice), laptop/desktop, smartwatch (glanceable), QR, plain voice call (audio-only), + the AR /
ambient / TV / kiosk horizon. Upgrades, room service, spa, excursions, concierge — every request an upsell that
*feels like hospitality, not selling.*

**AFTER — follow-up, reviews, rebooking.** Post-stay follow-up that does the work to **earn the 5-star review**
(reputation = future direct bookings), remembers the guest, and brings them back **direct** next time.

**The surfaces (one intelligence, every screen the guest owns):** the hotel's **website & laptop/desktop**
(discovery/booking), **smartphone** (chat + visual + voice), **in-room tablet** (full visual OS), **QR**,
**smartwatch** (glanceable: "your table is ready," "spa in 20 min"), a plain **phone call / voice-only** (audio,
no images), and — the forward vision, conceived like RC's 2029 interface — **AR glasses** (cards overlaid in the
guest's view), **ambient room display / smart mirror**, **in-room TV**, **lobby kiosk**. One continuous
conversation; the *interface adapts to the surface*, the intelligence stays the same.

**Positioning to make unmistakable:** this is not a support chatbot — it is a **powerful revenue-generating
system** that captures the direct booking, lifts ADR, and converts every in-stay conversation into ancillary
revenue. Say it in the copy and *prove it visually* (the $250 upgrade, "Investment: covered," a revenue tally
that ticks up across the journey). Make the site *show* the journey and the money, not just describe them.

Three moves, in priority order: **(A) make the tablet show pictures. (B) cut text, go product-first/surgical
like RC's Product page. (C) add the signature scroll-synced device animation + a multi-screen "2029" moment.**

---

## A · The tablet becomes a rich visual interface (the star)

Replace today's orb-and-text tablet with a **landscape in-room tablet UI that renders images.** It still opens
with the voice orb (voice-first), but **every answer resolves into a visual card**, and the guest can browse a
real, tactile, photo-driven interface. Build these screen states (each a real component the hero + walkthroughs
cycle through):

1. **Idle / Home screen** — property hero photo top, warm greeting ("Buenas tardes · Suite 214"), a row of
   **quick-action tiles with icons+thumbnails**: Room Service · Spa · Concierge · Explore · Check-out. A small
   live orb ("Habla o toca").
2. **Voice→visual answer** — guest asks "¿La mejor playa cerca?" → orb pulses → resolves to an **image card**:
   a beach photo, "Akumal — 20 min al sur · agua clara esta semana," with actions (Cómo llegar · Reservar taxi).
   *This is the core differentiator vs RC — the answer is a picture, not a sentence.*
3. **Room service** — a **grid of dish photos** (cards: image, name, price), tap-to-add, a running order total,
   "Enviar a la cocina." (Images: dishes below.)
4. **Room upgrade** — a **suite photo** (or small carousel), "Suite Vista al Mar · $250/noche · terraza privada,"
   Confirm → "Recepción confirmará." (This is the $250 "Investment: covered" moment — now with a real suite image.)
5. **Spa & wellness** — treatment cards with **spa images** + times + "Reservar."
6. **Concierge / destination** — recommendation cards with **restaurant/beach photos** + a small **map** panel.
7. **Housekeeping / issue** — the two-stage alert, minimal UI (this one stays sparse — it's an ops moment).

**Behavior:** landscape tablet frame (reuse `--device-*` tokens); screens **cross-fade/scale** between states
(~420ms `--ease-emphasis`); the hero auto-cycles 3–4 of these; on the Platform walkthrough the guest "taps"
through them. **Photos live inside the screen** (rounded, subtly darkened for legibility), not as full-bleed.

**Surface-adaptive rendering (show this):** the same "¿La mejor playa?" intent rendered three ways side by side —
**tablet** (big image card), **phone** (compact card + voice), **call** (an audio waveform, "described aloud, no
image"). One intent, three surfaces. It proves the platform thesis visually.

---

## B · The Interface of 2029 (a signature multi-screen moment)

Add one **signature section** (Platform, and a teaser on Home) that positions Hotel Companion as a *display-
agnostic guest intelligence layer*, the way RC framed "the future interface." Left: terse copy — "One
conversation. Every screen in the guest's world." Right/below: an **animated multi-surface fan** — in-room
**tablet**, **phone**, **voice/call**, **QR**, and the horizon set: **AR glasses** (overlaid cards in the guest's
view), **ambient room display / smart mirror**, **in-room TV**, **lobby kiosk**. A single card **hands off**
across surfaces on scroll (tablet → phone → glasses), copper thread connecting them. Label the horizon ones
"Emerging" so it's visionary, not a false claim. This is the FWA/Awwwards "wow" and it's *true to the product*.

---

## C · Product-first / surgical (cut the text)

Adopt RC's Product-page pattern site-wide. RC section 01 = "It feels like hospitality, not software." + a
**numbered 5-step list** (one line each: asks → recognized → guided → confirmed → paid) synced to a device. Copy
is terse; the *device* carries the meaning.

- **Convert prose sections → numbered step lists + a device screen per step.** Home's revenue/execution/knowledge
  and Platform's voice-first/reservations/issue sections become **device walkthroughs**, not paragraphs.
- **Compress explanatory paragraphs to ≤1 line captions.** Keep verbatim: headlines, the hero lines, the $160B
  stake, "Why Hotels," "conversation not a redirect," the FAQ answers. Trim the *connective prose* between them —
  aim to cut homepage/Platform body text ~40%. Long noun-stacks already chip; push further: show 6, "+ more."
- **Lead every product section with the visual**, then ≤2 lines. If a section is still mostly text after this,
  it should become a device walkthrough or a photo-backed statement.
- Net: fewer words, more product. The pages should feel like you're *watching the product*, not reading about it.

This also **fixes the dead-space** I flagged at 1440 — device walkthroughs and image cards fill the bands that
are currently half-empty. While at it, tighten section min-heights so content fills its height (RC density).

---

## D · Animation upgrades (the "cooler animations")

Signature = a **scroll-synced sticky device walkthrough** (RC's move): pin the device, and as the guest scrolls
the numbered steps, the tablet **screen cross-fades** step→step (idle → asks → image answer → upgrade → confirm).
One per key page (Home revenue, Platform guest-journey). Reduced-motion = a static filmstrip of the screens.

Catalog (all honor `prefers-reduced-motion`, ≤240ms unless noted, `--ease-standard`/`--ease-emphasis`):
- **Screen transitions** inside the tablet: cross-fade + slight scale, ~420ms.
- **Orb → image-card morph**: orb collapses, card blooms with the photo.
- **Image reveals**: subtle Ken-Burns/parallax on photo beds and card images (slow, ≤6% scale).
- **Multi-surface hand-off**: a card animates tablet→phone→glasses along a copper thread on scroll.
- **Voice-morph** (built): keep; make the reply also swap a small tone-appropriate visual.
- **Count-ups** (stat block), **draw-on** (diagrams/timeline), **marquee** (built).
- **Hover micro-states** on cards (lift + copper hairline). Never gratuitous; motion serves the product.

---

## E · Imagery to add (real, free-license — append to fetch-assets.sh)

Same download pattern (`images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1600`).
These go **inside the tablet screens** (and card grids), not as full-bleed beds. Add to `public/assets/ui/`:

```bash
P="auto=compress&cs=tinysrgb&w=1600"; U="public/assets/ui"; mkdir -p "$U"
# Suites (upgrade screen / carousel)
dl "https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?$P"  "$U/suite-1.jpg"
dl "https://images.pexels.com/photos/36916378/pexels-photo-36916378.jpeg?$P" "$U/suite-2.jpg"
dl "https://images.pexels.com/photos/34496715/pexels-photo-34496715.jpeg?$P" "$U/suite-3.jpg"
# Room-service dishes (menu grid)
dl "https://images.pexels.com/photos/7243881/pexels-photo-7243881.jpeg?$P"   "$U/dish-1.jpg"
dl "https://images.pexels.com/photos/17237180/pexels-photo-17237180.jpeg?$P" "$U/dish-2.jpg"
dl "https://images.pexels.com/photos/23644633/pexels-photo-23644633.jpeg?$P" "$U/dish-3.jpg"
# Spa (wellness cards)
dl "https://images.pexels.com/photos/9146381/pexels-photo-9146381.jpeg?$P"   "$U/spa-1.jpg"
dl "https://images.pexels.com/photos/37719540/pexels-photo-37719540.jpeg?$P" "$U/spa-2.jpg"
dl "https://images.pexels.com/photos/19666192/pexels-photo-19666192.jpeg?$P" "$U/spa-3.jpg"
# Beach/destination card images: reuse hero-poolside.jpg + a poster frame from section-tropical-beach.mp4,
# or add e.g. images.pexels.com/photos/258154 (palms) already fetched.
```
Optimize to `webp` ≤120KB each (they render small inside the device). Treatment: keep these *brighter/cleaner*
than the section beds — inside the UI they should look like real product photography, lightly rounded, faint
inner border. More categories, same pattern: `infinity pool`, `beach club`, `hotel gym`, `cocktail sunset`.

---

## F · Where it lands (page map)
- **Home hero** — tablet now cycles **voice→image answers** (beach card, suite card). Add ≤1 support line, cut the rest.
- **Home revenue** — the $250 upgrade becomes the **sticky scroll walkthrough** ending on the suite image + "Investment: covered."
- **Home / Platform** — the **Interface-of-2029 multi-surface** signature section.
- **Platform voice-first** — rebuild as a **device walkthrough** (idle → ask → image answer → book), image cards for room service/spa/concierge; keep channel cards.
- **Platform reservations / knowledge / destination** — image cards (dishes, spa, beach, map) instead of noun-stacks.
- **Solutions** (dept index — already great) — add a small device screen per department showing that team's view.
- **Everywhere** — replace remaining text-only sections with a device screen, an image card set, or a photo-backed statement; trim prose ~40%.

## Definition of done (this tier)
Open Home + Platform beside RC's Product page: Hotel should feel **more visual and more product-first** than RC —
the tablet shows real images, at least one **scroll-synced device walkthrough** runs, the **multi-surface 2029**
moment lands, prose is visibly cut, and there are **no half-empty bands**. It should look like the interface of
2029: multi-screen, image-rich, effortless — and unmistakably the same family as Restaurant Companion.
