import LoginForm from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Domain/LoginForm',
  component: LoginForm,
  args: {},
  argTypes: {},
} satisfies Meta<typeof LoginForm>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
