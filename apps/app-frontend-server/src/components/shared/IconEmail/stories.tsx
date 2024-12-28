import IconEmail from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Icon/IconEmail',
  component: IconEmail,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconEmail>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
