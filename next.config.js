/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });

    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name][ext]'
      }
    });

    return config;
  },
}

module.exports = nextConfig 