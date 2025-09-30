/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  // Optimize for production
  swcMinify: true,
}

module.exports = nextConfig