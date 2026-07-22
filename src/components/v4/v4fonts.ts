import { Instrument_Serif, IBM_Plex_Mono } from 'next/font/google'

/* v4 kit §1.3 — exactly two typefaces on the marketing layer. Declared here
   (not in layout.tsx) so the fonts load only with the v4 homepage; every other
   route keeps the untouched v3 font stack. */

export const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-v4-serif',
  display: 'swap',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-v4-mono',
  display: 'swap',
})
