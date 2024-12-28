import IconEyeOff from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/IconEyeOff',
  component: IconEyeOff,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconEyeOff>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
