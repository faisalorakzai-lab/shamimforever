const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    poweredByHeader: false,
    trailingSlash: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'uvgtgeauhjbdatrmmaob.supabase.co',
      'images.unsplash.com',
      'api.qrserver.com',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname)

    // Fix: wagmi/rainbowkit pull in React Native modules on web builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'lokijs': false,
      'encoding': false,
      'bufferutil': false,
      'utf-8-validate': false,
    }

    // Fix: pino-pretty is a dev tool, exclude from bundle
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push('pino-pretty')
      config.externals.push('mapbox-gl')
    }

    // Ignore optional peer dependencies that cause build noise
    const webpack = require('webpack')
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(pino-pretty|@react-native-async-storage\/async-storage)$/,
      })
    )

    return config
  },
}

module.exports = nextConfig
