import IconCheckCircle from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/CheckCircle',
  component: IconCheckCircle,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconCheckCircle>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
