import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "monorepo-test-holidaydeals-payload.vercel.app",
      },
    ],
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
