import LogoTrastocker from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'LogoTrastocker',
  component: LogoTrastocker,
  args: {
    alt: 'Trastocker',
  },
  argTypes: {
    alt: {
      control: 'text',
    },
  },
} satisfies Meta<typeof LogoTrastocker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
