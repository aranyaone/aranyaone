/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  generateStaticParams: false,
  dynamicParams: true
}

module.exports = nextConfig
