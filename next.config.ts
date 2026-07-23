import type { NextConfig } from "next";

type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

const HC = "https://www.hotelcompanion.ai";

const nextConfig: NextConfig = {
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
