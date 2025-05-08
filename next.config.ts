import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://old-images.hb.ru-msk.vkcs.cloud/**')],
  },
  // output: 'export',
};

export default nextConfig;
