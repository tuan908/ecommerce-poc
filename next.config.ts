import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { reactCompiler: true, optimizePackageImports: ["next-intl"] },
  images: {
    remotePatterns: [
      {
        hostname: "scontent.fsgn19-1.fna.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;