import UserVerifyErrorMessage from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Domain/UserVerifyErrorMessage',
  component: UserVerifyErrorMessage,
  args: {},
  argTypes: {},
} satisfies Meta<typeof UserVerifyErrorMessage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
