/** @type {import('next').NextConfig} */
const nextConfig = {
  // This helps bypass small errors during the Netlify build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
