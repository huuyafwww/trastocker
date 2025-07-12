import IconExclamationCircle from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Icon/ExclamationCircle',
  component: IconExclamationCircle,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconExclamationCircle>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
