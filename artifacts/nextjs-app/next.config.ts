import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const devDomain = process.env.REPLIT_DEV_DOMAIN;

const nextConfig: NextConfig = {
  serverExternalPackages: ["@workspace/db", "drizzle-orm", "pg", "sharp"],
  allowedDevOrigins: devDomain
    ? [devDomain, `*.${devDomain.split(".").slice(-3).join(".")}`]
    : ["localhost", "127.0.0.1"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.pexels.com" },
    ],
  },
};

export default withPayload(nextConfig);
