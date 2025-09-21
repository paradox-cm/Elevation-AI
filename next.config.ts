import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail production builds on ESLint warnings or errors.
    // Keep linting in CI as a separate job!
    ignoreDuringBuilds: true,
  },
  images: {
    // Optimize images for better performance
    formats: ['image/webp', 'image/avif'],
    // Cache images for longer periods
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Enable image optimization
    unoptimized: false,
    // Device pixel ratios to generate
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes to generate
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow Supabase storage images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
