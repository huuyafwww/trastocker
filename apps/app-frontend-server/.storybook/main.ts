import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import { merge } from 'webpack-merge';

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { docs: false },
    },
    '@storybook/addon-actions',
    'storycap',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  framework: {
    name: '@storybook/nextjs',
    options: { builder: { useSWC: true } },
  },
  staticDirs: ['./public'],
  webpackFinal: config => merge(config, {
    plugins: [new VanillaExtractPlugin()],
  }),
};
export default config;
