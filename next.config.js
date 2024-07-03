/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.dribbble.com", "images.unsplash.com", "replicate.delivery"],
  },
};

module.exports = nextConfig;
