import IconKey from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/IconKey',
  component: IconKey,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconKey>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
