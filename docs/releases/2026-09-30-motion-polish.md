# Hotel Companion — coordinated product walkthroughs

Reference studied: https://dextr.ai/. Its “Always-on AI agents” section pairs a coordinated entrance with numbered progress rails and sequential, five-second inner demonstrations. HC applies the same visual storytelling principle with its own hotel identity, actual interface previews and illustrative scenarios.

## Changes

- A shared, viewport-aware clock coordinates the selected segment, visible progress rail and scene choreography. Automatic playback runs in order and loops. Clicking a segment switches to a complete, static scene; visitors can explicitly resume automatic playback.
- Timed walkthroughs cover the hero, four core capabilities, the guest-interface gallery, telephone/web/mobile/in-room tablet channels, relevant-offer alternatives, guest-to-team service workflow, guest memory, Companion Control and onboarding.
- Guest intent, useful context, the next relevant option and the resulting request or commercial insight appear as successive visual beats. Voice illustrations use a quiet waveform; the real recorded voice sample remains on-demand.
- Integration logos enter with subtle connection paths. Property examples, commercial stories, demand insights and contribution examples have coordinated entrances. Remaining public pages share restrained section entrances rather than cycling their forms, articles or legal content.
- Numbered tabs, thin progress rails and small pause controls use one treatment. English and Spanish retain the same experience. The approved hero narrative, shared footer, in-room tablet positioning and private presentation boundary are preserved.

## Interaction, accessibility and performance

- Automatic clocks and CSS choreography suspend outside the viewport and when the browser document is hidden. Keyboard focus within a scene pauses progression; explicitly resuming from the playback control works while that control has focus.
- Keyboard tab selection supports arrows, Home and End with matching panel labels. Controls retain 44-pixel targets. Reduced-motion preference disables autoplay and decorative motion; all segments remain manually accessible.
- Entrances progressively enhance visible server-rendered content. No additional animation library or video downloads; progress updates do not re-render React on every frame. Existing responsive image optimization, lazy loading and opt-in link prefetch remain intact.

## Verification

- Production build, TypeScript, lint (no new warnings/errors), and all 50 existing tests passed.
- 280 motion checks passed in installed Chrome 154, Edge 154, Firefox engine 153 and Safari WebKit engine 26.5: automatic progress, complete ordered loop, pause/resume, manual selection, offscreen suspension, each segment’s selection/panel association, keyboard navigation, reduced motion, EN/ES and phone layouts.
- 196 responsive and interaction checks passed across those four engines: 320/375/390/430-pixel phones, 768/1024-pixel tablets, 1440-pixel desktop, short landscape navigation, real voice playback and empty-form validation. No valid inquiry was submitted.
- All 59 public pages passed a separate 320-pixel audit for horizontal overflow, footer presence, private-demo links and undersized buttons.
- Controlled Chrome mobile lab: 390 × 844, DPR 3, 1.6 Mbps download, 150 ms latency, 4× CPU, disabled cache. Initial transfer 448,187 bytes versus 441,984 previously (6,203 bytes / 1.4% added); LCP 2.116 seconds, CLS zero. Lab timings vary with device/network and are not a guarantee.
