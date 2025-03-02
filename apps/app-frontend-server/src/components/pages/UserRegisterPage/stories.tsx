import AuthLayout from '@layouts/AuthLayout';

import UserRegisterPage from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Pages/UserRegisterPage',
  component: UserRegisterPage,
  args: {},
  argTypes: {},
  decorators: [
    Story => (
      <AuthLayout>
        <Story />
      </AuthLayout>
    ),
  ],
} satisfies Meta<typeof UserRegisterPage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
