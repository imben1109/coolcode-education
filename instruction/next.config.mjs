/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/instruction',
  trailingSlash: true,
  rewrites: () => [
    { source: '/evaluate', destination: '/api/evaluate' },
  ],
  output: 'standalone',
};

export default nextConfig;
