# Phone presentation redesign — September 30, 2026

The previous mobile layout fit the viewport but stacked desktop navigation, diagrams and miniature screenshots. This release gives phones their own visual presentation at 700px and below while preserving the approved desktop site and shared footer.

- Compact 64px masthead; demo link stays visible and language choices move inside the menu. Selecting a language closes the menu and restores scrolling.
- Shorter phone-specific hero introduction, readable conversation card and aligned playback controls.
- Single-row, touch-scrollable sequence tabs with a progress rail. The active tab scrolls within its own strip; it never moves the page.
- Real mobile captures of HC's guest interface and individual room, dining and spa cards in EN/ES, plus returning-guest context. Browser-native picture art direction selects one source, without downloading two hidden images or linking to the private presentation.
- One active onboarding and memory step at a time on phones, with all steps available through shared automatic/manual controls. Desktop retains the complete simultaneous layouts.
- Readable dashboard rows, compact guest-to-team stories, an ordered eight-logo connection grid, two-column footer links, improved inquiry and reading layouts.
- Real audio stays user initiated. Mobile shows the first exchange and offers the full transcript on demand; desktop retains every line.
- Cookie rejection and acceptance remain equally accessible; the phone banner uses concise labels and two adjacent choices, with customization retained.

Validation: production build and TypeScript, lint (no new warnings), 50 existing tests, cross-browser responsive and interaction checks in installed Chrome and Edge plus Firefox and WebKit engines, all 59 public routes at 320px, EN/ES imagery and menu behavior, transcript expansion, audio, and empty-form validation. Additional visual review checks internal dashboard clipping that document-level overflow audits cannot catch. Reduced-motion and keyboard controls remain supported. No actual inquiry, reservation or hotel-service requests were submitted.

Coverage: 396 responsive and interaction checks, 59 public routes, plus 24 final dashboard and phone-sequence checks. The ten new WebP captures total 344 KB after compression. A controlled first-visit phone measurement (1.6 Mbps, 150 ms latency, 4× CPU throttling) recorded LCP 2.55 s, CLS 0 and 461 KB transferred; this is a local lab measurement, not field performance.
