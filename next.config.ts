import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Retired marketing routes → their Hotel Companion equivalents (brief §4)
      { source: "/features", destination: "/platform", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
    ];
  },
};

export default nextConfig;
