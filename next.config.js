/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
