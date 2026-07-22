# Hotel Companion — Surgical Transplant Map

**Premise:** the site is already strong. No redesign. We graft the best ideas from the Claude Design exploration ("PlaceCompanion design leveling": concepts 2a and 1c) into specific sections, and we cut text. Enterprise rule: say everything we must — once — and nothing twice.

Site sections referenced by their live numbers (01 Hero … 15 Next Step + Footer).

---

## The diagnosis in one line

The site's 15 sections are individually good but cumulatively long, and several explain what a *story* or a *card* could show. The artifact's real contribution is **compression**: it says the same things in a quarter of the words — narrative instead of explanation, cards instead of paragraphs, captions instead of copy.

---

## Transplant list — ranked by leverage

### T1 · The Maya film → merges into section 05 «Cada Conversación Es Ingreso» — *from 1c*
Section 05 already tells before/during/after in abstract bullets ("Reservan directo", "La reseña gana la próxima reserva") plus five explanatory paragraphs plus the +$402 revenue ticker. The 1c guest-journey film is the same content as *one story*: Scene 01 reserva directa (18 días antes) → Scene 02 rooftop al atardecer ("cada respuesta es una imagen — y una reservación") → Scene 03 las 2 AM resueltas ("nadie despierta molesto") → Scene 04 la reseña que gana la siguiente reserva.
**Surgery:** keep 05's structure and its revenue ticker; replace the five explanation paragraphs with the four scenes (pinned tablet, scenes crossfade — the artifact's motion spec). Each scene = one caption line, not a paragraph. Net effect: ~70% less text in 05, more persuasion.
**Keep ours:** the interactive tablet demo stays; the film's phone mock becomes our tablet.

### T2 · The outcome-card bento → replaces sections 08 + 09's list format — *from 2a*
The artifact's five cards (Direct Booking 0% · Upsell in Conversation · Command Centre 91% · Request → Execution · Guest Memory) compress what our sections 02, 08 and 09 say in lists and paragraphs.
**Surgery:**
- Section 09 (8 routing rows) → the compact "Request → Execution" card: 4 example rows with timestamps ("Hay agua en el piso del baño" 02:14 → Ingeniería). Four rows prove the point; eight belabor it.
- Section 08 gains the **Guest Memory card** ("Maya vuelve en noviembre. El Companion ya sabe: habitación con vista · vegetariana · aniversario · habla español · salida tardía") — this is product proof the site doesn't currently show, and it's our "Hospitality Should Remember" thesis made tangible in 10 words.
- Command Centre 91% already exists in 08 — keep ours, it's good.

### T3 · «Deja de leerlo. Pregúntale algo.» ask-bar → section 15 Next Step — *from 2a/1c*
The artifact's closing CTA is an ask-bar, not a button. We already ship "Pregunta lo que sea…" inside the tablet demo — elevate that exact input as the final CTA block, with 3 suggested chips ("¿Qué venderías más en mi hotel?" · "¿Cómo manejas las 2 AM?" · "¿Qué sabes de mi destino?"), scripted demo answers, and "Agenda una Demo" beside it. Enterprise-safe: it's a guided demo, not open chat.
**This is the single best conversion idea in the whole exercise.** The product's thesis is "conversation is the interface" — the site should end by *being* one.

### T4 · Epilogue stat card → bridges 05→08 — *from 1c*
"Una estancia se volvió inteligencia: **+$402 esta estancia · 91% resuelto · 7 solicitudes ruteadas · ★5**." One card that connects the guest story to the executive dashboard. Place it as the film's final frame (end of 05) so section 08 opens already earned. Cuts 08's intro paragraph.

### T5 · Caption discipline → sections 03, 10, 11 and the footer — *from 2a's "copy cut to captions"*
The artifact's rule: mono caption + one sentence, never two paragraphs. Apply to:
- **03 ($160B):** cut the two paragraphs ("Los equipos de atención están saturados…" / "Hotel Companion resuelve lo rutinario…") to one line: "Lo rutinario, resuelto automáticamente — tu equipo, libre para los momentos que importan."
- **10 (Companion OS):** today OS appears in the hero eyebrow, the nav, section 10, the FAQ and twice in the footer. Enterprise buyers need the platform story **once**. Compress 10 to a single quiet band: "Construido sobre Companion OS — la plataforma detrás de cada Companion. →" and remove the eight English capability names from this page (they live on the platform page).
- **11 (Implementación):** the three steps are fine; cut the two closing sentences to one.
- **Footer:** the two mini-essays (Companion OS + Axionari) become one line each; "Powered by AXIONARI" becomes the visible endorsement mark, with OS demoted to the platform link. Consider trimming the 5-column footer to 4.

### T6 · FAQ pruning — *from the artifact's restraint*
Artifact shows 3 questions; we show 8. Keep the 4 buyers actually ask (¿Reemplaza a mi personal? · ¿Cómo interactúan los huéspedes? · ¿Aumenta ingresos? · ¿Qué tan rápido en marcha?), move the rest to a /faq page. Fewer questions on-page reads more confident.

### T7 · Question-chip trim → section 04
Our marquee runs 16 questions (duplicated for the loop). Curate to the 10 most evocative. Small cut, tightens the room.

---

## Round 2 — the mobile/tablet screens (added Jul 22, from "Homepage Concepts" 5a–c / 6a–c)

The second exploration round moved from *website* ideas to *product-UI* ideas — screens of the concierge itself on iPhone and tablet, now correctly in the warm palette. These feed two places: the real product surfaces, and the site's interactive demo (which showcases them). The big find is not any single screen but a repeatable **answer anatomy**:

> **context chip (mono)** → **serif title** → **insider caption (gold)** → **concierge sentence with timing intelligence** → **one solid action + one ghost action** → **ask bar**
>
> e.g. `IN TOWN · GOLDEN HOUR 6:48` → *Cielo Rooftop* → "old town · mezcal list the hotel bar can't match" → "Leave by 6:15 and you'll catch the light. I can have you back for your 8:00 table at Casa Mariposa." → **Taxi at 6:15** / More spots

### T8 · AnswerCard anatomy → the site's tablet demo (and the product)
Our live demo's Akumal card already has ~70% of this. Adopt the missing 30%: the mono context chip (`SEA TURTLES BEFORE 11 AM`), the **insider caption** (knowledge a directory doesn't have — "the fish comes in that morning," "mezcal list the hotel bar can't match"), and the metadata line in mono (`12 MIN · TAXI $8`). The insider caption is the emotional proof of "knows your destination like your best employee."

### T9 · Speakable phrases, highlighted → demo + product
The replies teach voice commands inline: "Say **'hold it'** and I'll book for two." / "Say **'book the day'**." Bold = the phrase you can speak. This is voice-UI onboarding *inside* the answer, zero extra UI. Adopt everywhere the concierge replies.

### T10 · The day-planner scene (6b) → second demo scenario + section 09 proof
"Plan our last day" — cenote 9:00 (Driver booked) → pueblo lunch → 17:30 back for the spa ("Held for you"), route map, `78 KM · ONE DRIVER ALL DAY · $95`, closed by "Everything timed around your spa booking. Say 'book the day'." **Nothing on the live site shows multi-venue orchestration in one screen** — this is the coordination moat made visible, the natural companion to section 09, and the future Destination Companion bridge. Strongest new idea of the round.

### T11 · "Local pick" badge + guest-recognition greeting
Two small ones: the hotel-endorsed **Local pick** badge on venue cards (trust + a future partnerships story), and 5a's arrival state — orb + "Good afternoon, *Maya*" — recognition as the first thing a guest sees; our site demo could greet in demo mode the same way.

### T12 · The constellation (7a) → replaces section 06's device bento
The redesign of "One conversation. Every screen in the guest's world": instead of 8 flat vignettes in a grid, **one cinematic still** — real hardware with metallic bezels, overlapping in depth (phone, in-room tablet, laptop/web, watch, in-room TV, voice-only speaker), one question ("Best beach near here?") flowing across all of them. The upgrade isn't just compositional: **each device gets a mono role caption** — `WEB · BOOKS BEFORE THEY ARRIVE` · `IN-ROOM TV · GREETS ON ARRIVAL` · `WATCH · NUDGES HER BACK` · `VOICE ONLY · DESCRIBED ALOUD`. Device = role in the journey, not a screen in a catalog. Intro copy is already caption-discipline: "Asked once, answered everywhere. The layout adapts. The intelligence doesn't."

### T13 · The relay (7b) — the merge option for sections 05+06
"The conversation follows the guest. *All day.*" — a golden timeline: `3 WEEKS OUT` (web, books direct 0% fee) → `ARRIVAL · 3 PM` (TV greets her) → `DAY 2 · 10 AM` (tablet plans the morning) → `DAY 2 · 5 PM` (watch nudges her back) → `+2 DAYS HOME` (phone earns the return: rate held, ★ review, book again). Closing line: **"Five screens. One memory. She never repeated herself once."** — Every Surface and the memory thesis in one sentence.
**DECIDED (Eduardo, Jul 22): 7a wins for section 06.** The constellation replaces the bento. Salvage from the relay: the role captions and "Five screens. One memory. She never repeated herself once." ("Cinco pantallas. Una memoria. Nunca tuvo que repetirse.")

**Round 3 — the elevated relays (8a/8b), after our design critique:**
- **8a "The sun arc / sundial"** — the orb IS the sun, traveling a dawn→2AM arc; the sky shifts with it; moments hang under the arc as big serif timestamps (10:04 TABLET · SUITE 214 … 6:48pm WATCH · POOLSIDE) with tilted photo cards. Poetic, minimal words, "the surface changes, the voice doesn't." Weakness: less product proof (fewer real UIs). Becomes award-grade **if the orb animates along the arc on scroll** (their own "try next" suggests it).
- **8b "Four skies"** — the strongest execution of the relay idea so far: a continuous dawn→2AM panorama in four full-height light-bands, each hour in its own sky — 6:12 dawn sand (phone · WOKEN BY A WHISPER, "Yoga moved to the beach — the wind is perfect" → *I'm coming*), 10:04 midday teal (tablet · THE ANSWER IS A PICTURE), 6:48 golden hour terracotta (watch · A QUIET TAP POOLSIDE), 2:14 night (voice · HANDLED IN THE DARK, with the `→ ENGINEERING · ROOM 214 · 02:14` receipt). Closing: "The interface adapts to the hour. The intelligence never sleeps." Dense with product proof yet nearly wordless; bands stack naturally on mobile. Caveats: warm the 2AM band (indigo-brown night, not cool navy), and take their own suggestion — real device frames inside the bands.
- **Placement question (open):** 06 is decided for 7a. If 8b graduates, it is (a) the new body of **section 05** with the two revenue peaks added (books-direct dawn + return-note morning), or (b) the hero of a dedicated Every-Surface/product page. One Maya timeline on the homepage, never two.

### Cross-referencing microcopy (adopt as a copy rule, not a component)
The best sentences in the round weave held bookings into new answers: "…back for your **8:00 table at Casa Mariposa**." That's memory + coordination shown in one clause. Rule: every demo answer should reference one thing the Companion already knows or holds.

---

## What we explicitly do NOT take

- **The palette.** The artifact drifted navy/teal. Our warm black + champagne/amber stands. Any grafted component gets re-skinned to our tokens on arrival.
- **The flat teal orb.** Our ember orb with rings and waveform is better product identity. Non-negotiable.
- **"Companion OS" in the nav** and "Powered by Companion OS" endorsement — both violate the architecture (OS is explained once; the endorsement is Axionari's).
- **The full-page redesign implied by 2a's hero.** Our hero (orb + serif headline) already works; it keeps its job.

## What we keep of ours, explicitly (unchanged)

Hero + orb · section 02 (OTA stat bars — already caption-discipline) · the interactive tablet demo · section 06 Every Surface (the 8-device bento is a differentiator the artifact has nothing like) · section 07 dual knowledge · 12 Límites (already the best-written section on the site) · 13 Socios Fundadores · the ES-first voice.

---

## Execution order (each step is independent; ship as ready)

1. **T3** ask-bar CTA (highest conversion value, smallest surface)
2. **T5** caption pass — pure deletion, zero design work (03, 10, 11, footer)
3. **T6 + T7** FAQ and chip pruning — deletion
4. **T2** Request→Execution card + Guest Memory card into 08/09
5. **T4** epilogue stat card
6. **T1** the Maya film into 05 (biggest build; do last, everything else already paid off)

Rough net effect of T5-T7 alone: the page loses roughly a third of its body text without losing a single claim — that's the "say as much as we have to, minimally" balance.

---

*Working method note: this map = the artifact mined for parts + the live site as the chassis. The Claude Design conversation can now be pointed at one transplant at a time ("build T3 in our warm tokens") instead of another full concept round.*
