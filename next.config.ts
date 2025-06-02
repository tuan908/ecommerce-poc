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

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
