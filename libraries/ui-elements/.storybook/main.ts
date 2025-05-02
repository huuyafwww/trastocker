import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { docs: false },
    },
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  framework: '@storybook/react-vite',
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
