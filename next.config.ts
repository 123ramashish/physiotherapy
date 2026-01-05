import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // ✅ this replaces `next export`
  images: {
    unoptimized: true,     // ✅ required if you use next/image in static export
  },

  // optional (often useful for static hosting):
  // trailingSlash: true,
};

export default nextConfig;
