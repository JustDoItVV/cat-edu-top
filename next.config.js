const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL('https://old-images.hb.ru-msk.vkcs.cloud/**'),
      'old-images.hb.ru-msk.vkcs.cloud',
      {
        protocol: 'https',
        hostname: 'old-images.hb.ru-msk.vkcs.cloud',
      },
    ],
  },
};

module.exports = nextConfig
