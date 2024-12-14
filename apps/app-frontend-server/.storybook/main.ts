import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import { merge } from 'webpack-merge';

import type { StorybookConfig } from '@storybook/nextjs';

const maxAssetSize = 1024 * 128; // 128KB

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: config => merge(config, {
    plugins: [new VanillaExtractPlugin()],

    // @see https://webpack.js.org/plugins/split-chunks-plugin/
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024, // 30KB
        maxSize: maxAssetSize,
      },
    },
    performance: { maxAssetSize },
  }),
};
export default config;
