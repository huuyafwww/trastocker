import UserLoginForm from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Domain/UserLoginForm',
  component: UserLoginForm,
  args: {},
  argTypes: {},
} satisfies Meta<typeof UserLoginForm>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
