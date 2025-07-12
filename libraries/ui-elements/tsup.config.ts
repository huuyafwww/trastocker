import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  splitting: false,
  esbuildPlugins: [
    vanillaExtractPlugin(),
  ],
  loader: {
    '.png': 'dataurl',
  },
  minify: !options.watch,
  css: true,
}));
