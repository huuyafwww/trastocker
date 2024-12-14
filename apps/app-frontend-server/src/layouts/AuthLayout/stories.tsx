import AuthLayout from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof AuthLayout>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'AuthLayout',
  },
};

export default meta;
