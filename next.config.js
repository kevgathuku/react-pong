/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // This removes the deprecated options that were causing the error
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
