import IconTriangleAlert from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Icon/TriangleAlert',
  component: IconTriangleAlert,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconTriangleAlert>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
