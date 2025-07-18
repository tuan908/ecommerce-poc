import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["next-intl"],
    optimizeServerReact: true,
    parallelServerCompiles: true,
    typedEnv: true,
    authInterrupts: true,
    inlineCss: true,
    middlewarePrefetch: "flexible",
    optimizeCss: true,
    appNavFailHandling: true,
    appDocumentPreloading: true,
    optimisticClientCache: true,
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "scontent.fsgn19-1.fna.fbcdn.net",
      },
      {
        hostname: "pbs.twimg.com"
      }
    ],
  },
};

export default nextConfig;