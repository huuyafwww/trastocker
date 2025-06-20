import tailwindcssPlugin from '@tailwindcss/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import reactPlugin from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tailwindcssPlugin(),
    reactPlugin(),
    vanillaExtractPlugin(),
    tsconfigPathsPlugin(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    passWithNoTests: true,
    isolate: true,
    include: ['src/**/*.test.ts'],
  },
});
