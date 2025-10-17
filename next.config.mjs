/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  transpilePackages: ['@lobehub/tts'],
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://admin.ajitkumarpandit.nakprc.com',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
