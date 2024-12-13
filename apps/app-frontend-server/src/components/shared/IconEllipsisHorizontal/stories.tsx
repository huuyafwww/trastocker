import IconEllipsisHorizontal from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/IconEllipsisHorizontal',
  component: IconEllipsisHorizontal,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconEllipsisHorizontal>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
