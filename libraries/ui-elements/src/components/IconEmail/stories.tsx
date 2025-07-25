import IconEmail from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Icon/Email',
  component: IconEmail,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconEmail>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
