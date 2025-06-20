import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();

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
  publicRuntimeConfig: {
    currentBranchName: process.env.GIT_BRANCH_NAME || 'develop',
  },
};

export default withVanillaExtract(nextConfig);
