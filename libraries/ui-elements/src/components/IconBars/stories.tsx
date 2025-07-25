import IconBars from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Icon/Bars',
  component: IconBars,
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconBars>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
