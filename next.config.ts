import type { NextConfig } from "next";
import path from "node:path";

type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

const HC = "https://www.hotelcompanion.ai";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [66, 68, 70, 72, 74, 75],
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
  async redirects() {
    const redirects: Redirects = [
      // Retired marketing routes → their Hotel Companion equivalents (brief §4)
      { source: "/features", destination: "/platform", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
    ];

    // Domain move: placecompanion.com is TEMPORARILY retired — every request
    // (apex or www, any path) 307-redirects to www.hotelcompanion.ai.
    //
    // GATED behind an env flag ON PURPOSE: enabling this before
    // hotelcompanion.ai is attached + DNS-live would forward the live site to a
    // dead domain. Sequence: (1) attach hotelcompanion.ai in Vercel + point DNS,
    // (2) confirm it serves, (3) set RETIRE_PLACECOMPANION=1 in Vercel env and
    // redeploy. permanent:false (307) so it can be lifted without cached 308s.
    if (process.env.RETIRE_PLACECOMPANION === "1") {
      redirects.push(
        {
          source: "/:path*",
          has: [{ type: "host", value: "placecompanion.com" }],
          destination: `${HC}/:path*`,
          permanent: false,
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "www.placecompanion.com" }],
          destination: `${HC}/:path*`,
          permanent: false,
        }
      );
    }

    return redirects;
  },
};

export default nextConfig;
