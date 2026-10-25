import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Serif, Spline_Sans_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./interior-editorial.css";
import "./interior-pages.css";
import "./site-reading.css";
import "./mobile-refinement.css";
import "./motion-polish.css";
import "./phone-design.css";
import "./conversation-motion.css";
import "./message-panels.css";
import "./refined-interiors.css";
import "@/components/atelier/atelier.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { LiveDemoModalDeferred } from "@/components/cds/LiveDemoModalDeferred";
import { PageMotion } from "@/components/experience/PageMotion";
import { CookieBanner } from "@/components/CookieBanner";
import { LIVE_DEMO_ENABLED } from "@/lib/flags";
import { getSocialImage } from "@/lib/siteMetadata";

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

/* The concise editorial homepage uses the same display pair as Restaurant
   Companion. The rest of Hotel Companion keeps its established type tokens. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-editorial-mono",
  display: "swap",
  preload: false,
});

/* One clean reading face for the shared website and product illustrations. */
const generalSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotelcompanion.ai"),
  title: {
    default: "Hotel Companion — Smarter offers. More revenue.",
    template: "%s · Hotel Companion",
  },
  description:
    "A smart companion that turns calls, messages and web inquiries into bookings, upgrades and experiences, around the clock. Faster guest service. More value from every stay.",
  openGraph: {
    siteName: "Hotel Companion",
    title: "Hotel Companion — Smarter offers. More revenue.",
    description:
      "A smart companion that turns calls, messages and web inquiries into bookings, upgrades and experiences, around the clock. Faster guest service. More value from every stay.",
    url: "https://www.hotelcompanion.ai",
    type: "website",
    images: [getSocialImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Companion — Smarter offers. More revenue.",
    description:
      "A smart companion that turns calls, messages and web inquiries into bookings, upgrades and experiences, around the clock. Faster guest service. More value from every stay.",
    images: [{ url: getSocialImage().url, alt: getSocialImage().alt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the URL's language before first paint. The Spanish edition is
            statically rendered at /es/*; this keeps the document language in
            sync before the client provider hydrates. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang=location.pathname==='/es'||location.pathname.startsWith('/es/')?'es-MX':'en-US'" }} />
      </head>
      <body className={`${fraunces.variable} ${generalSans.variable} ${splineMono.variable} ${instrumentSerif.variable} ${plexMono.variable} font-sans antialiased at-review`}>
        <LanguageProvider>
          <div className="at-page-root">{children}</div>
          {/* Compact screens retain a persistent conversion path; desktop uses
              the always-present masthead CTA. */}

          {/* One demo instance for every entry point: nav, hero CTA, hero tablet.
              v4: deferred chunk (authorized v3.1 bundle split) — same modal. */}
          {LIVE_DEMO_ENABLED && <LiveDemoModalDeferred />}
          {/* Cookie consent — client-only; renders only while undecided. */}
          <CookieBanner />
          <PageMotion />
        </LanguageProvider>
      </body>
    </html>
  );
}
