import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';

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
  framework: '@storybook/experimental-nextjs-vite',
  staticDirs: ['./public'],
  viteFinal: config => ({
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      vanillaExtractPlugin(),
    ],
  }),
};
export default config;
