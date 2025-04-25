import { schema } from '@trastocker/database-definition';
import { connectDatabase } from '@trastocker/drizzle-helper/sql-js';
import { and, isNull, isNotNull } from 'drizzle-orm';

import UserVerifyPage from '.';

import type { Meta, StoryObj } from '@storybook/react';

import AuthLayout from '@layouts/AuthLayout';

const database = await connectDatabase({ url: 'storybook/mock-database.sqlite' });
const registeredUser = await database.query.user.findFirst({
  where: and(
    isNotNull(schema.user.registeredAt),
    isNull(schema.user.verifiedAt),
    isNull(schema.user.deletedAt),
  ),
});

const meta = {
  title: 'Pages/UserVerifyPage',
  component: UserVerifyPage,
  args: {},
  argTypes: {},
  decorators: [
    Story => (
      <AuthLayout>
        <Story />
      </AuthLayout>
    ),
  ],
} satisfies Meta<typeof UserVerifyPage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    nextjs: {
      router: {
        query: {
          verifyToken: registeredUser?.verifyToken,
        },
      },
    },
  },
};

export const Invalid: Story = {
  parameters: {
    nextjs: {
      router: {
        query: {
          verifyToken: 'invalid-token',
        },
      },
    },
  },
};

export default meta;
