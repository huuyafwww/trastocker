import WorkspaceCreatePage from './';

import type { Meta, StoryObj } from '@storybook/react';

import AuthLayout from '@layouts/AuthLayout';

const meta = {
  title: 'Pages/WorkspaceCreatePage',
  component: WorkspaceCreatePage,
  args: {},
  argTypes: {},
  decorators: [
    Story => (
      <AuthLayout>
        <Story />
      </AuthLayout>
    ),
  ],
} satisfies Meta<typeof WorkspaceCreatePage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
