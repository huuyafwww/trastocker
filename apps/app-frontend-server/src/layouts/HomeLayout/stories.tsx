import HomeLayout from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layouts/HomeLayout',
  component: HomeLayout,
  args: {},
  argTypes: {},
} satisfies Meta<typeof HomeLayout>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'HomeLayout',
  },
};

export default meta;
