import IconTrastocker from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/IconTrastocker',
  component: IconTrastocker,
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
} satisfies Meta<typeof IconTrastocker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
