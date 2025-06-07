import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/gateway/:path*',
        destination: `${process.env.BACKEND_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
