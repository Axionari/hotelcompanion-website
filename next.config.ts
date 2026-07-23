import type { NextConfig } from "next";

const HC = "https://www.hotelcompanion.ai";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Retired marketing routes → their Hotel Companion equivalents (brief §4)
      { source: "/features", destination: "/platform", permanent: true },
      { source: "/about", destination: "/company", permanent: true },

      // Domain move: placecompanion.com is TEMPORARILY retired. Every request
      // to it (apex or www, any path) 307-redirects to Hotel Companion.
      // permanent:false (307) so the retirement can be lifted later without
      // fighting browser-cached 308s. hotelcompanion.ai is the live domain.
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
      },
    ];
  },
};

export default nextConfig;
