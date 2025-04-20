import dotenv from 'dotenv';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPathsPlugin(),
  ],
  test: {
    globals: true,
    environment: 'node',
    isolate: true,
    setupFiles: 'tests/setup.ts',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    env: dotenv.config({ path: '.env.test' }).parsed,
  },
});
