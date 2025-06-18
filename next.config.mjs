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
  // Temporarily disable React strict mode for testing react-beautiful-dnd
  reactStrictMode: false,
}

export default nextConfig
