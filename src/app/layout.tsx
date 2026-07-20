import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      <body className={`${cormorantGaramond.variable} ${dmSans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="pt-16">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
