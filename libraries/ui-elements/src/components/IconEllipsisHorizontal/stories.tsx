import IconEllipsisHorizontal from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Icon/EllipsisHorizontal',
  component: IconEllipsisHorizontal,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconEllipsisHorizontal>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
