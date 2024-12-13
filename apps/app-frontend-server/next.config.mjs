import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
    compiler: { styledComponents: { ssr: true } },
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en']
  }
};

export default withVanillaExtract(nextConfig);
