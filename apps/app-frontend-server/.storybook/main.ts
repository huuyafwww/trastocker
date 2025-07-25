import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    'storycapture',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  framework: '@storybook/nextjs-vite',
  staticDirs: ['./public'],
  viteFinal: config => ({
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      vanillaExtractPlugin(),
      tsconfigPathsPlugin(),
    ],
  }),
};
export default config;
