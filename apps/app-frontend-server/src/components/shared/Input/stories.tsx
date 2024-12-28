import { defaultVariant } from './styles.css';

import Input from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: {
    variant: defaultVariant,
  },
  argTypes: {},
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: {
      color: 'secondary',
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: {
      color: 'ghost',
    },
  },
};
export const Warning: Story = {
  args: {
    variant: {
      color: 'warning',
    },
  },
};

export const Success: Story = {
  args: {
    variant: {
      color: 'success',
    },
  },
};

export const Info: Story = {
  args: {
    variant: {
      color: 'info',
    },
  },
};

export const Outline: Story = {
  args: {
    variant: {
      border: 'bordered',
    },
  },
};

export default meta;
