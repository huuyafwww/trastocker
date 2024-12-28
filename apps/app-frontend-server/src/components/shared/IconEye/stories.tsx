import IconEye from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/IconEye',
  component: IconEye,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconEye>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
