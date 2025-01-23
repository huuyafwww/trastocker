import WorkspaceJoinForm from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Domain/WorkspaceJoinForm',
  component: WorkspaceJoinForm,
  args: {},
  argTypes: {},
} satisfies Meta<typeof WorkspaceJoinForm>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
