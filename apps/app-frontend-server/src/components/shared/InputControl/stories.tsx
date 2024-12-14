import ReactHookFormDecorator from '@/components/decorators/ReactHookFormDecorator';

import InputControl from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shared/InputControl',
  component: InputControl,
  decorators: [
    ReactHookFormDecorator,
  ],
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },
    defaultValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof InputControl>;

export default meta;

type Story = StoryObj<typeof InputControl>;

export const Default: Story = {
  args: {
    name: 'input',
    defaultValue: 'default value',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    rules: { required: true },
  },
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    readonly: true,
  },
};
