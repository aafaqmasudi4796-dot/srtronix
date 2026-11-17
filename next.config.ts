import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  experimental: {
    agentUpgrade: "security",
  } as any,
};

export default nextConfig;
