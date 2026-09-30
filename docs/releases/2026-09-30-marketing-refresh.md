# Hotel Companion marketing refresh — 30 September 2026

Promotes the reviewed https://test.hotelcompanion.ai website to the existing Axionari/hotelcompanion-website marketing repository and Vercel project serving https://www.hotelcompanion.ai.

The release retains the approved hero and adds concise visual explanations of room-feature recommendations, timing/budget/availability alternatives, guest-demand insights, combined service requests, natural voice, memory and optional tablets. English and Spanish share the same page structure. Every footer uses the demo-page reference styling, isolated from page typography resets.

Only the marketing pages and the demo inquiry endpoint ship. The approved test package excludes legacy authenticated application, assistant, extraction, chat and Stripe API routes; the hotel product and private sales demo remain separate deployment targets. The public website does not link to the private sales showcase. Existing marketing email configuration is retained.

Reviewed test deployment: dpl_E4o9CA98xqYo7TtUbS5E3yYRoDjA.
Previous live marketing deployment: dpl_3m2Jr9vASagmmFNfhwKAgLkzbWfz (rollback reference).

Pre-release checks on the reviewed package: production build and TypeScript passed; all 59 footer pages matched the demo reference at desktop and mobile widths (118 comparisons). English and Spanish main pages had no horizontal overflow, failed loaded images, duplicate IDs or private-demo links. Illustrative examples retain their labels and separate paid sales from additional contribution.

## Loading and mobile refinements

- Replaced the onboarding illustration’s eager CSS background with a small, lazy responsive image. Product captures now use Next image optimization and lazy loading.
- Audio loads on demand, with transcript seeking preserved. Route prefetches are opt-in, so unvisited pages do not compete with the initial experience.
- The phone hero uses its content height, with readable type and accessible 44-pixel controls. Mobile navigation contains scrolling on short screens, locks the background, supports Escape and keeps keyboard focus within the open header. Safe-area insets and reduced-motion preferences are respected.
- Controlled Chrome mobile lab run: 390 × 844, DPR 3, 1.6 Mbps download, 150 ms latency, 4× CPU throttling, disabled browser cache. Initial transfer fell from 781,083 to 441,984 bytes (43.4%). LCP changed from 5.364 to 2.452 seconds; CLS was zero. These are local lab measurements, not a guarantee of every visitor’s network/device performance.
- Browser verification: installed Chrome 154, installed Edge 154, Firefox engine 153 and Safari WebKit engine 26.5. 196 checks covered phone widths 320/375/390/430, tablet 768/1024, desktop 1440, landscape navigation, EN/ES, keyboard gallery controls, audio playback and empty-form validation. No valid form was submitted.
- All 59 public pages were separately checked at 320 pixels: no horizontal overflow, missing footer or public link to the private sales demo.
- Production build, TypeScript, lint (no errors) and all 50 tests passed.
