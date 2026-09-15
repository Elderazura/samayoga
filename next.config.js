/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Optimize fonts
  optimizeFonts: true,
  // Enable SWC minification
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/assets/images/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          // Discourage embedding as a standalone downloadable document
          { key: 'Content-Disposition', value: 'inline' },
          { key: 'X-Robots-Tag', value: 'noimageindex' },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Robots-Tag', value: 'noimageindex' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
