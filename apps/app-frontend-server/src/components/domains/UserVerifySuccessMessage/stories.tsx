import UserVerifySuccessMessage from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Domain/UserVerifySuccessMessage',
  component: UserVerifySuccessMessage,
  args: {},
  argTypes: {},
} satisfies Meta<typeof UserVerifySuccessMessage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
