/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Use remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.financeapp.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '**',
      }
    ],
    // Use modern formats by default
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Add compression for better performance
  compress: true,
  // Experimental features to improve performance
  experimental: {
    // Enable React Server Components
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-vercel-app-name.vercel.app']
    }
  },
  // Add support for modern syntax
  transpilePackages: ['lucide-react']
}

module.exports = nextConfig;