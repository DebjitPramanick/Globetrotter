/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
