const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'uvgtgeauhjbdatrmmaob.supabase.co',
      'images.unsplash.com',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_MAPBOX_STYLE: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
  },
  webpack: (config, { isServer }) => {
    // Explicitly set @ alias to project root so all pages can resolve @/lib/*
    config.resolve.alias['@'] = path.resolve(__dirname)
    // Suppress mapbox-gl SSR warnings
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('mapbox-gl')
    }
    return config
  },
}

module.exports = nextConfig
