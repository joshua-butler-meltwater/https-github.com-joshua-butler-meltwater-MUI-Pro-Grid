/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // External packages configuration
  experimental: {
    serverExternalPackages: ['@mui/x-license-pro'],
  },
}

export default nextConfig
