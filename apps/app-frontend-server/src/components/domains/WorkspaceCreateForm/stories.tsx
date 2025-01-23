import WorkspaceCreateForm from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Domain/WorkspaceCreateForm',
  component: WorkspaceCreateForm,
  args: {},
  argTypes: {},
} satisfies Meta<typeof WorkspaceCreateForm>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
