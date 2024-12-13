import LoginPage from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof LoginPage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
