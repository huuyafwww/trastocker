import { defaultVariant } from './styles.css';

import Box from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Box',
  component: Box,
  args: {
    children: 'Box',
    variant: defaultVariant,
  },
  argTypes: {},
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Primary: Story = {
  args: {},
};
