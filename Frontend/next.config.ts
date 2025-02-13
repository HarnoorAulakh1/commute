import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.bossrides.in","res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  }
};

export default nextConfig;
