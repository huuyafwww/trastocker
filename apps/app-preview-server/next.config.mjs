/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
  basePath: process.env.VERCEL ? "": "/trastocker", // for GitHub Pages
  env: {
    NEXT_PUBLIC_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF || 'develop',
  },
};

export default nextConfig;
