// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://farcaster.xyz/~/developers/hosted-manifests?domain=airdrop-checker-chi.vercel.app',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;