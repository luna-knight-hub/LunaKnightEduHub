import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Rewrites — Proxy requests to Python Backend (enabled when PYTHON_API_URL is set)
  async rewrites() {
    const pythonApiUrl = process.env.PYTHON_API_URL;
    if (!pythonApiUrl) return [];

    return [
      {
        source: '/api/game-proxy/:path*',
        destination: `${pythonApiUrl}/:path*`,
      },
    ];
  },

  // Image optimization — Allow Sanity CDN images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
