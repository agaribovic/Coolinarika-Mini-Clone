import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/cdn/**",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/cdn/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Type",
            value: "image/jpeg",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
