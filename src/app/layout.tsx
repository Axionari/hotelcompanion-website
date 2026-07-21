import type { Metadata } from "next";
import { Fraunces, Spline_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { LiveDemoModal } from "@/components/cds/LiveDemoModal";

/* Display face — Restaurant Companion uses Fraunces (headline weight 530,
   italic accent 480). Variable axes give us those exact weights. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  // Variable font: omit `weight` so the full axis is available and CSS can ask
  // for RC's exact 530 (headline) / 480 (italic accent).
  variable: "--font-serif",
  display: "swap",
});

/* Mono eyebrow face — RC uses Spline Sans Mono at ~10.5px / 0.26em tracking. */
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
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
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelcompanion.ai"),
  title: {
    default: "Hotel Companion — The Voice-First Guest Intelligence Platform for Hotels",
    template: "%s · Hotel Companion",
  },
  description:
    "Understand Every Guest. Capture Every Opportunity. Hotel Companion transforms natural conversations into personalized guest experiences, operational intelligence, and coordinated execution. Powered by Companion OS.",
  openGraph: {
    siteName: "Hotel Companion",
    title: "Hotel Companion — The Voice-First Guest Intelligence Platform for Hotels",
    description:
      "Understand Every Guest. Capture Every Opportunity. Powered by Companion OS.",
    url: "https://hotelcompanion.ai",
    type: "website",
    // NEEDS REAL DATA: designed OG share image (public/og.png) not yet in repo
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Companion — The Voice-First Guest Intelligence Platform for Hotels",
    description:
      "Understand Every Guest. Capture Every Opportunity. Powered by Companion OS.",
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
          {/* One demo instance for every entry point: nav, hero CTA, hero tablet */}
          <LiveDemoModal />
        </LanguageProvider>
      </body>
    </html>
  );
}
