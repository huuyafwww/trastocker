import { fn } from '@storybook/test';

import { defaultVariant } from './styles.css';

import Button from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/Button',
  component: Button,
  args: {
    as: 'button',
    children: 'Button',
    onPress: fn(),
    variant: defaultVariant,
  },
  argTypes: {},
} satisfies Meta<typeof Button>;

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

export const Danger: Story = {
  args: {
    variant: {
      color: 'danger',
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

export const Link: Story = {
  args: {
    variant: {
      color: 'link',
    },
  },
};

export const Square: Story = {
  args: {
    variant: {
      shape: 'square',
    },
    children: 'S',
  },
};

export const Circle: Story = {
  args: {
    variant: {
      shape: 'circle',
    },
    children: 'c',
  },
};

export const Outline: Story = {
  args: {
    variant: {
      border: 'outline',
    },
  },
};

export default meta;
