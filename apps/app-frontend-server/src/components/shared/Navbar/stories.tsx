import Navbar from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Navbar',
  component: Navbar,
  args: {
    children: 'Navbar',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
