# Complete conversation threads — 2026-10-01

Replaces two-line requests and response labels with four-turn conversations: guest intent, a specific companion reply, guest choice or approval, and a resolution. Examples cover anniversary dining, balcony upgrades, time-sensitive spa offers, remembered preferences, housekeeping and in-room dining. Revenue scenarios show budget and availability alternatives becoming actual bookings.

The format appears in the homepage hero and capabilities, the product gallery, channel previews, revenue scenarios, and the guest-to-staff workflow. Later staff stages preserve the first three turns and compose the updated response. Pending requests remain pending; confirmation appears in the confirmed stage. All examples and amounts are illustrative.

One visible-time clock drives messages, typing cues, outcome and tab progress. Selected scenarios play once and hold. Pause, offscreen and background-tab behavior are retained. Complete text is present without JavaScript and for reduced motion and assistive technology. Reserved text measures avoid reflow as messages are composed. No live product, booking or model calls are made.

The desktop conversation overlay now has real alternating bubbles and a single quiet header. Phone threads remain readable below an art-directed interface capture. Fixed narrow desktop grid shrinkage and overlap with the navigation. The shared footer, public contact flow and private sales MVP access boundary are preserved.

Validation:
- Production build and TypeScript passed.
- Lint: zero errors; 21 existing warnings, none added by this change.
- Existing test suite: 50 tests across seven suites passed.
- 157 browser checks passed across installed Chrome, installed Edge, Firefox and WebKit (Safari engine compatibility, not native Safari device certification).
- Checks cover four progressive turns, both response cues, pause/resume, complete resolution, stable height, retained staff history, all selected gallery/channel/revenue examples in English and Spanish, reduced motion, and a no-JavaScript transcript.
- Seven viewport widths, 320 through 1440px, with all four homepage capability scenarios: no horizontal overflow or conversation overlap with navigation.
- Desktop, phone, hero, recovery and staff workflow screenshots inspected.
