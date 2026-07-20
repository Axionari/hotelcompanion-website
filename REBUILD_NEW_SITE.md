# PLACE COMPANION — New Site Spec
# REBUILD_NEW_SITE.md
# The pitch deck site. What you open in front of Namron, Ahau, Habita, Chablé.
# Last updated: March 25, 2026

---

## WHAT THIS IS

This is the spec for the new placecompanion.com homepage.
It replaces src/app/page.tsx entirely.
The HTML mockup (PC_Definitive_2.html) is the visual reference.
This document is the build contract.

The goal: a hotel owner lands on this page and within 8 seconds thinks
"they get me. This was made for properties like mine. When can we start?"

REBUILD.md = safety net for the existing site (keep it, never delete it)
REBUILD_NEW_SITE.md = this document, the spec for what we're building now

---

## BRANCH

Work on: new-site branch
Command: git checkout -b new-site
Never touch main until Ed approves locally and says "ship it"

---

## DESIGN TOKENS (new site — deviates from current system intentionally)

```
--bg:    #0F0E0D        (slightly warmer than current #080706)
--ink:   #181614        (section contrast bg)
--ink2:  #201D1A        (elevated elements)
--text:  #EDE6D9        (primary text — warmer than current #FFFFFF)
--dim:   rgba(237,230,217,0.62)   (secondary text)
--faint: rgba(237,230,217,0.07)   (subtle fills)
--rule:  rgba(237,230,217,0.08)   (borders/dividers)
--tc:    #C4612C        (terracotta — primary accent, close to current #C96A3A)
--tc2:   #D4724A        (terracotta hover)
--green: #2A8A56        (status/active)
--amber: #C08A3A        (intelligence layer accent)
```

Fonts: Cormorant Garamond (serif) + DM Sans (sans) — same as current stack

---

## GLOBAL EFFECTS (non-negotiable — these make it feel premium)

### 1. Grain overlay
CSS body::after with SVG fractalNoise filter, opacity 0.55, mix-blend-mode overlay.
This is what separates it from every other SaaS site.
Must be the very first thing added to the new page.

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' 
    width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' 
    baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix 
    type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' 
    filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.55;
  mix-blend-mode: overlay;
}
```

### 2. Custom cursor
Two elements: dot (#cd, 5px terracotta circle) and ring (#cr, 36px ring with 
terracotta border). Ring expands to 72px on hover over interactive elements.
Cursor label appears contextually on hover ("EXPLORE", "OPEN", etc.)
cursor: none on body.

### 3. Scroll progress bar
1px height, terracotta color, fixed top, z-index 600.
Width driven by scroll percentage via JS.

### 4. Scroll reveal
All major elements use data-r attribute + IntersectionObserver.
On intersection: opacity 0→1, translateY(24px)→0, transition 0.9s ease.
Stagger via data-d="1/2/3/4" (0.1s per step).

---

## PAGE ARCHITECTURE — EXACT SECTION ORDER

```
1.  NAV
2.  OPENING SCENE (hero — full viewport)
3.  MARQUEE STRIP (words scrolling)
4.  PRODUCT SECTION (the pain + "until now")
5.  CINEMATIC SECTION ("Trained on your property. Not the internet.")
6.  DEMO SECTION ← MOVED UP. This is section 6, not buried at the bottom.
7.  SYSTEM LEARNING SECTION ← THE KILLER MOMENT
8.  INTELLIGENCE LAYER (stats)
9.  WHAT THIS IS NOT (4-column grid)
10. PMS DIAGRAM (no integration needed)
11. ACCESS SECTION (form / CTA)
12. PRICING OVERLAY (triggered by CTA, not a section)
13. FOOTER
```

---

## SECTION 1 — NAV

Logo: "PLACE COMPANION" — font-size 11px, letter-spacing 3.5px, uppercase
Links: Demo / Properties / Intelligence / Pricing
CTA: "Request access for your property" — terracotta border button with fill-on-hover
Behavior: transparent at top, blurs + border-bottom appears on scroll

---

## SECTION 2 — OPENING SCENE (hero)

This is the most important section. It sets everything.

### The 2:17 AM moment
Large ghost number: "2:17" in Cormorant Garamond, 
font-size clamp(100px,18vw,240px), color rgba(237,230,217,0.06)
Label below: "A guest is asking. No one is there." 
— font-size 12px, letter-spacing 4px, uppercase, color rgba(196,97,44,0.7)
Positioned: absolute, vertically centered left side

### Ghost word (background letterform)
"Knowledge" — Cormorant Garamond italic, font-size min(40vw,560px), 
color rgba(237,230,217,0.022), drifts slowly via CSS animation
ID: ghost-word — this word changes as user scrolls through sections

### Atmospheric gradients
3 radial gradients layered:
- Terracotta glow bottom-left
- Green whisper top-right  
- Dark fade bottom-center

### Vertical rule lines
5 vertical 1px lines, rgba(237,230,217,0.08), fade in on load

### Hero headline (main H1)
"The knowledge of your hotel,
always present."
Font: Cormorant Garamond, clamp(52px,9vw,128px), weight 300, line-height 0.94
Color: #EDE6D9
Second line italic: "And every guest interaction, permanently captured."
Color: terracotta #C4612C

### Subtext
"Your property speaks to every guest, exactly as it should — 
at any hour, in any language."
Font: DM Sans, clamp(15px,1.6vw,18px), color var(--dim), max-width 36ch

### CTA
Primary button: "Request access for your property" with arrow SVG
Note below: "Live in 30 seconds · No commitment"

### Data bar (bottom of hero)
4 columns separated by rules:
- What it is → Captured property intelligence
- Available → 24 hours · every language
- Resolution rate → 91% answered by the property
- Live from → Your website · 30 seconds

### Scroll cue
Vertical line + "Scroll" text, fades in after 2s

---

## SECTION 3 — MARQUEE STRIP

Single horizontal scrolling marquee (left direction).
8 words separated by diamond separators:
Knowledge · Continuity · Character · Voice · Presence · Intelligence · Permanence · Accumulation
(duplicated for seamless loop)
Font: Cormorant Garamond italic, clamp(18px,2.5vw,28px), letter-spacing 0.08em
Color: rgba(237,230,217,0.18)
Background: var(--ink), border-top and border-bottom: 1px solid var(--rule)

---

## SECTION 4 — PRODUCT / PAIN SECTION

### Strip list (what guests actually ask)
Numbered list, editorial style:
01 → Where to watch the sunset.
02 → Which beach is clear this week.
03 → Where locals actually eat.
04 → What's open right now.

Each item: number in muted color, text in full white, arrow right

### Pain sequence (staggered reveal)
These lines appear one by one with scroll:
"This knowledge doesn't live in your systems."
"It lives in your best people."
"And it disappears when they're not there."
"And none of it compounds."

### UNTIL NOW
Large display text: "Until now."
Cormorant Garamond, clamp(64px,12vw,160px), starts dark, 
lights up to full #EDE6D9 when scrolled into view
This is an emotional punctuation mark. Make it land.

---

## SECTION 5 — CINEMATIC SECTION

Full-width dark section, radial glow effect.
Tag line fades in: "The distinction that changes everything"
Headline animates word by word:

"Trained" (terracotta/gold)
"on"
"your"  
"property." (terracotta/gold)

[line break]

"Not" (muted)
"the" (muted)
"internet." (muted)

Post-reveal line: "Every answer from your property. Never approximated."
DM Sans, 18px, color var(--dim), fades in 2.6s after section enters viewport

---

## SECTION 6 — DEMO SECTION

⚠️ MOVED UP — this is section 6, not buried at the end.
The demo must be visible within the first 2 scrolls.

### Left column
Label: "Live demo"
Headline: "See how your hotel speaks when every question matters."
Body: "This is MarAzul Riviera Maya. Every answer comes from the property — 
its knowledge, its voice, its character. Not a script. Not the internet."

### Right column — the widget
Aura glow effect behind widget (blurred radial terracotta gradient)
Property header: "MarAzul Riviera Maya" / "Riviera Maya, Mexico" / Live dot

### DEMO RESPONSES — UPGRADE FROM MOCKUP
These are the exact responses to use. They must feel like elite concierge 
judgment, not FAQ answers.

CHIP 1: "Where is breakfast served?"
RESPONSE: "Breakfast is served at La Palapa from 7 until 11 each morning. 
On weekends we extend to a full brunch until 1pm — there's usually live 
music from 10. I can hold a table if you'd like."

CHIP 2: "Best beach near here?"
RESPONSE: "Akumal — about 20 minutes south. The water has been exceptionally 
clear this week and you can snorkel with sea turtles. Take the side path in, 
not the main entrance, for a quieter experience."

CHIP 3: "¿Tienen servicio de spa?"
RESPONSE: "Nuestro spa Cenote abre de 9am a 8pm todos los días. El ritual de 
chocolate maya es nuestra experiencia más reservada — si le interesa, le 
recomiendo apartarlo con anticipación. ¿Le asigno un horario para mañana?"

CHIP 4: "Where do locals eat?"
RESPONSE: "El Pirata in the town centre — about 15 minutes by taxi. It's 
where our staff goes on their days off. Ask for the fish tacos and a 
michelada. It won't look like much from the outside. It never does."

FREE INPUT: Any text → "Every answer comes from MarAzul Riviera Maya — 
the property's own knowledge, in the property's own voice. Not approximated."

### Typing behavior
Natural rhythm: variable speed (28-50ms per char), 
slower at start (120ms before first char), pause at punctuation (. = 180ms, , = 90ms)
Thinking delay before response: 800-1400ms random

### Bridge text below demo
"Every question becomes part of the system."
"Not just answered. Remembered. Structured. Reused."

---

## SECTION 7 — SYSTEM LEARNING (THE KILLER MOMENT)

⚠️ This section closes deals. Build it exactly.

Full-viewport section with dark atmospheric background.
Canvas element for bubble animation.

### Phase 1: Bubbles appear (14 guest questions, one by one, 220ms apart)
Scattered randomly across canvas:
- "Where is breakfast served?" (dining)
- "Which beach has no seaweed?" (destination)
- "Do you have yoga classes?" (wellness)
- "Best restaurant for tonight?" (dining)
- "How far to Tulum ruins?" (destination)
- "¿Tienen servicio de spa?" (wellness)
- "Can we get room service at midnight?" (dining)
- "Where do locals actually eat?" (destination)
- "Meditation session times?" (wellness)
- "Chef's tasting menu tonight?" (dining)
- "Best snorkeling near here?" (destination)
- "Yoga at sunrise tomorrow?" (wellness)
- "Rooftop bar open late?" (dining)
- "Local pharmacy open Sunday?" (destination)

### Phase 2: Bubbles drift and cluster by intent
Dining cluster: left side
Destination cluster: center
Wellness cluster: right side
Each bubble transitions to cluster color on arrival

### Phase 3: Cluster badges appear
"Dining Intent — 38%"
"Destination Intent — 29%"  
"Wellness Intent — 21%"

### Phase 4: Caption reveals
"This is what your property learns."
"And this is what it does with it."

### Phase 5: Intel cards reveal (3 cards)
Dining: "Restaurant recommendations that convert. Upsell moments 
that feel like care, not selling."
Destination: "Beach, activity, transport. Knowledge your PMS will never have."
Wellness: "Spa, yoga, restoration. The questions that reveal what guests 
actually came for."

Bubble colors by category:
- dining: rgba(196,97,44,0.15) border rgba(196,97,44,0.4)
- destination: rgba(42,138,86,0.12) border rgba(42,138,86,0.35)
- wellness: rgba(192,138,58,0.12) border rgba(192,138,58,0.35)

---

## SECTION 8 — INTELLIGENCE LAYER

Label: "The intelligence layer"
Headline: "Your property gets to know itself."
Body: "Every interaction teaches the system. What guests ask at midnight. 
What recommendations they follow. What questions reveal gaps.
Over time, the intelligence deepens — automatically, invisibly, continuously."
Highlight: "What your guests ask becomes as valuable as what they book."

### Stats (3 items)
91% → "Resolved by the property." 
      Sub: "Only questions that genuinely need a human reach your team. 
      Everything else handled in the property's voice."

24h → "The intelligence never goes home."
      Sub: "No shifts. No off hours. No missed moments at midnight."

∞ → "Languages. Automatically."
    Sub: "Every guest understood in their own words. No configuration required."

Stat numbers: Cormorant Garamond, clamp(56px,8vw,96px), weight 300

---

## SECTION 9 — WHAT THIS IS NOT

4-column grid, background var(--ink)

1. "Not scripted." — Every response adapts to the guest and the moment. 
   The personality is yours. The knowledge is your property's. Nothing is canned.

2. "Not intrusive." — No notifications. No noise. Present only when the guest 
   asks. The companion knows the difference between presence and intrusion.

3. "Nothing to download." — QR code on the nightstand. A link. A widget. 
   The guest is one tap from your property's complete knowledge.

4. "Not generic." — Trained on your property. Not the internet. Not a dataset 
   of other hotels. Your knowledge. Your voice. Your guests.

Coda line: "It becomes part of the experience. The part guests feel but cannot name."
Italic on: "The part guests feel but cannot name."

---

## SECTION 10 — PMS DIAGRAM

Two boxes separated by "No overlap" text:
Left: "Your PMS" / "Operations"
Right: "Place Companion" / "Your guests"

Statement: "Two different roles. Nothing to integrate.
Nothing to disrupt. Nothing to install."
Closing: "It fills the gap nothing else covers."

This directly addresses the first objection every hotel operator has.

---

## SECTION 11 — ACCESS / CTA SECTION

Label: "For properties that understand the difference"
Headline: "Request access."
Body: "Place Companion is currently available to a select number of 
independent properties. We work directly with each hotel to ensure the 
companion is exactly right."

### Form fields
- Property name (required)
- Your name
- Email
- Access code (optional — FOUNDING20 gives 20% off for life, validates inline)
- Submit: "Request access" button

On submit: form hides, success message appears:
"We'll be in touch within 24 hours. Your property deserves this."

---

## SECTION 12 — PRICING OVERLAY

Triggered by CTA click — NOT a page section.
Full-screen overlay, dark background with grain.

### Structure (vertical flow — NOT cards side by side)
Opening line: "Keep your assistant live."

---

Companion
$349 / month
For independent properties up to 40 rooms.
→ Activate

---

Companion Pro  
$599 / month
For hotels from 41 to 200 rooms.
→ Activate

---

Portfolio
Custom
For groups and collections.
→ Let's talk

---

Founding rate: FOUNDING20 · 20% off for life · 3 spots remaining

Close button: "Not now" (never "Close")

NO bullet lists. NO feature grids. Two sentences per tier maximum.
This is a decision surface, not a menu.

---

## COPY RULES (non-negotiable throughout)

NEVER use:
- "chatbot" — always "companion" or "the assistant"
- "dashboard" — always "command center" or omit
- "Subscribe" → "Activate"
- "Close" → "Not now"  
- "Submit" → "Request access"
- "Try it free" → never. not once.
- "Book a demo" → "Request access for your property"
- Amazing / stunning / vibrant / curated / immersive / transformative

ALWAYS:
- Speak to the operator, not the guest
- One idea per sentence
- Confidence without explanation
- Luxury trusts. It does not convince.

---

## BUILD SEQUENCE (session by session)

### Session 1 — Shell + Opening
1. Create new-site branch
2. Create src/app/(new-site)/page.tsx (parallel to existing, won't affect live site)
3. Add grain overlay global effect
4. Add custom cursor
5. Add scroll progress bar
6. Build Section 2 (Opening Scene) — hero, 2:17 AM moment, ghost word
7. QA on localhost:3000 (new route)

### Session 2 — Marquee + Pain + Cinematic
1. Section 3 (Marquee strip)
2. Section 4 (Product/pain + "Until now" moment)
3. Section 5 (Cinematic — "Trained on your property")

### Session 3 — Demo (upgraded responses)
1. Section 6 (Demo widget — upgrade all 4 chip responses to elite concierge level)
2. Natural typing rhythm implementation
3. Bridge text below demo

### Session 4 — System Learning Animation
1. Section 7 (The killer moment)
2. Full bubble scatter → cluster → badge → intel cards sequence
3. This session alone is what closes deals

### Session 5 — Remaining sections + Pricing overlay
1. Section 8 (Intelligence layer + stats)
2. Section 9 (What this is not)
3. Section 10 (PMS diagram)
4. Section 11 (Access form)
5. Section 12 (Pricing overlay — vertical, no bullets)

### Session 6 — Nav + Footer + Full QA
1. Nav (scroll-aware, blur on scroll)
2. Footer (minimal)
3. Full desktop + mobile QA
4. Ed approves → swap: new-site route becomes / homepage
5. Deploy to Vercel
6. placecompanion.com is now the pitch deck

---

## CRITICAL NOTES FOR CLAUDE CODE

1. NEVER touch src/app/page.tsx (the existing site) during new site builds
2. Build in src/app/(new-site)/page.tsx or a dedicated route first
3. The HTML mockup (PC_Definitive_2.html) is the visual reference — port it faithfully
4. All animations must use CSS/JS, not external animation libraries
5. The grain overlay and custom cursor must be scoped to the new page only (not global) until swap
6. All copy is final as written in this document — do not paraphrase or rewrite
7. The system learning section is the most technically complex — budget a full session for it
8. Worktree issue: Claude Code writes to .claude/worktrees/ — always cp to real src/ after builds

---

## THE STANDARD

When a Namron, Ahau, or Habita operator lands on this page:

Within 8 seconds: "they get me"
Within 30 seconds: "this is exactly what we need"
Within 60 seconds: "when can we start the pilot?"

That is the only metric that matters.
