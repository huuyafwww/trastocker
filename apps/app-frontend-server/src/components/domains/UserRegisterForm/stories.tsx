import UserRegisterForm from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Domain/UserRegisterForm',
  component: UserRegisterForm,
  args: {},
  argTypes: {},
} satisfies Meta<typeof UserRegisterForm>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
