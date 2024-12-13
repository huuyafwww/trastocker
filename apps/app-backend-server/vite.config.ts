import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@application': path.resolve(__dirname, 'src/application'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@graphql': path.resolve(__dirname, 'src/graphql'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    isolate: true, // 各テストケースを分離
    setupFiles: 'tests/setup.ts',
    include: ['tests/**/*.test.ts'],
  },
});
