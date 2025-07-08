import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "https://ai-db.r-carini2003.workers.dev/:slug*",
      },
    ];
  },
};

export default nextConfig;
