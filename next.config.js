/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'miro.medium.com', 'api.dicebear.com'],
  },
};

module.exports = nextConfig;
