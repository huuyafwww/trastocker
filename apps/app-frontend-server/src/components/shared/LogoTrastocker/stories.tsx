import LogoTrastocker from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/LogoTrastocker',
  component: LogoTrastocker,
  args: {
    alt: 'Trastocker',
    priority: true,
  },
  argTypes: {
    alt: {
      control: 'text',
    },
    priority: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof LogoTrastocker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
