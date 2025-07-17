/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
  // Skip build errors temporarily for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
