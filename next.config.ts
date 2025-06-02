import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["next-intl"],
    optimizeServerReact: true,
    parallelServerCompiles: true,
    typedEnv: true,
    useEarlyImport: true,
    authInterrupts: true,
    inlineCss: true,
    middlewarePrefetch: "flexible",
    optimizeCss: true,
    appNavFailHandling: true,
    appDocumentPreloading: true,
    optimisticClientCache: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "scontent.fsgn19-1.fna.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;