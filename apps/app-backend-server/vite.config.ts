import path from 'node:path';

import vCache from '@raegen/vite-plugin-vitest-cache';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // TODO: Support for CI=true
  plugins: [!process.env.CI && vCache()].filter(Boolean),
  resolve: {
    alias: {
      '@application': path.resolve(__dirname, 'src/application'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@graphql': path.resolve(__dirname, 'src/graphql'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@test': path.resolve(__dirname, 'tests'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    isolate: true,
    setupFiles: 'tests/setup.ts',
    include: ['tests/**/*.test.ts'],
  },
});
