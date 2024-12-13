import IconBars from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/IconBars',
  component: IconBars,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconBars>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
