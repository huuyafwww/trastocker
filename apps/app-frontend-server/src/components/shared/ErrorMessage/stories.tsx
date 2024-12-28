import ErrorMessage from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/ErrorMessage',
  component: ErrorMessage,
  args: {},
  argTypes: {},
} satisfies Meta<typeof ErrorMessage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: 'This is an error message',
  },
};

export default meta;
