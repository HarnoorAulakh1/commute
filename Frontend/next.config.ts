import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.bossrides.in","res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://commute-m5tv.onrender.com/:path*',
      },
    ];
  }
};

export default nextConfig;
