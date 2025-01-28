import Divider from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Divider',
  component: Divider,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    children: 'Divider',
  },
};

export const Horizontal: Story = {
  args: {
    $horizontal: true,
    className: 'h-screen',
  },
};

export const HorizontalWithText: Story = {
  args: {
    $horizontal: true,
    children: 'Divider',
    className: 'h-screen',
  },
};

export default meta;
