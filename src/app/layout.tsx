import type { Metadata } from "next";
import { Fraunces, Spline_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { LiveDemoModalDeferred } from "@/components/cds/LiveDemoModalDeferred";
import { StickyCta } from "@/components/cds/StickyCta";
import { CookieBanner } from "@/components/CookieBanner";

/* Display face — Restaurant Companion uses Fraunces (headline weight 530,
   italic accent 480). Variable axes give us those exact weights. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  // Variable font: omit `weight` so the full axis is available and CSS can ask
  // for RC's exact 530 (headline) / 480 (italic accent).
  variable: "--font-serif",
  display: "swap",
  /* v4 G-7: no forced preload — the font still loads via @font-face exactly
     as before (display:swap unchanged); it just leaves the homepage LCP
     dependency graph. Applies to all three v3 faces. */
  preload: false,
});

/* Mono eyebrow face — RC uses Spline Sans Mono at ~10.5px / 0.26em tracking. */
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

/* Body / UI face — RC uses General Sans (Fontshare, not Google). Self-hosted
   from public/fonts so there is no third-party request at runtime. */
const generalSans = localFont({
  src: [
    { path: "../../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  /* `swap` + a size-adjusted Arial fallback. The fallback's metrics are matched
     to General Sans, so the swap moves text by very little; the tab-row wrap it
     used to trigger is fixed by headroom (39px of slack), not by suppressing
     the swap. Deliberately NOT `optional`: this is the body face, and on a slow
     cold connection `optional` would keep Arial for the whole page view — the
     wrong trade for readers on mobile data.
     preload stays false per v4 G-7 below: re-adding it is its own decision. */
  display: "swap",
  adjustFontFallback: "Arial",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelcompanion.ai"),
  title: {
    default: "Hotel Companion — A concierge that never forgets, built on Companion OS",
    template: "%s · Hotel Companion",
  },
  description:
    "Understand Every Guest. Capture Every Opportunity. Hotel Companion transforms natural conversations into personalized guest experiences, operational intelligence, and coordinated execution. Powered by Companion OS.",
  openGraph: {
    siteName: "Hotel Companion",
    title: "Hotel Companion — A concierge that never forgets, built on Companion OS",
    description:
      "Understand Every Guest. Capture Every Opportunity. Powered by Companion OS.",
    url: "https://hotelcompanion.ai",
    type: "website",
    images: [{
      url: "https://hotelcompanion.ai/og/hotel-companion-og.jpg",
      width: 1200,
      height: 630,
      alt: "Hotel Companion",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Companion — A concierge that never forgets, built on Companion OS",
    description:
      "Understand Every Guest. Capture Every Opportunity. Powered by Companion OS.",
    images: ["https://hotelcompanion.ai/og/hotel-companion-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${fraunces.variable} ${generalSans.variable} ${splineMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="pt-16">{children}</div>
          {/* Persistent conversion CTA (RC keeps its CTA pinned; our nav auto-hides). */}
          <StickyCta />
          {/* One demo instance for every entry point: nav, hero CTA, hero tablet.
              v4: deferred chunk (authorized v3.1 bundle split) — same modal. */}
          <LiveDemoModalDeferred />
          {/* Cookie consent — client-only; renders only while undecided. */}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
