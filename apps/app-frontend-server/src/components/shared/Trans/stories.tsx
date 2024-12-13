import Trans from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Trans',
  component: Trans,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Trans>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Email',
  },
};

export default meta;
