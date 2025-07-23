/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/instruction',
  rewrites: () => [
    { source: '/evaluate', destination: '/api/evaluate' },
  ],
  output: 'standalone',
};

export default nextConfig;
