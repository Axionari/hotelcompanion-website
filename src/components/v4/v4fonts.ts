import { Instrument_Serif, IBM_Plex_Mono } from 'next/font/google'

/* v4 kit §1.3 — exactly two typefaces on the marketing layer. Declared here
   (not in layout.tsx) so the fonts load only with the v4 homepage; every other
   route keeps the untouched v3 font stack. */

/* display:optional — the H1 is the LCP element; a late font swap was re-timing
   LCP to ~4.4s simulated (G-7). Fonts are preloaded, so on ordinary
   connections they apply from first paint; on very slow first visits the
   metric-adjusted serif fallback holds (CLS 0). Deviation enumerated in
   V4_REPORT. */
export const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-v4-serif',
  display: 'optional',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-v4-mono',
  display: 'optional',
})
