/**
 * Feature flags — flip to toggle a capability site-wide.
 *
 * Typed as `boolean` (not the literal) on purpose so gated JSX isn't treated as
 * dead code.
 */

/** "See It Live" — the openLiveDemo trigger in the nav + page heroes.
 *  Disabled until the live demo is ready. Set to true to re-enable everywhere. */
export const LIVE_DEMO_ENABLED: boolean = false;
