import LogoTrastocker from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/LogoTrastocker',
  component: LogoTrastocker,
  tags: ['autodocs'],
  args: {
    children: 'LogoTrastocker',
  },
} satisfies Meta<typeof LogoTrastocker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
