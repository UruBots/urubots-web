// Desc: Next.js configuration file
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.prismic.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        port: '',
        pathname: '/urubots/**',
      },
    ],
  },
};

module.exports = nextConfig;
