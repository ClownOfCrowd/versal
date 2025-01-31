/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media',
            outputPath: 'static/media',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig 