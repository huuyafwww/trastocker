import { schema } from '@trastocker/database-definition';
import { connectDatabase } from '@trastocker/drizzle-helper/sql-js';
import { and, isNull, isNotNull } from 'drizzle-orm';

import UserVerifyStatus from '.';

import type { Meta, StoryObj } from '@storybook/react';

const database = await connectDatabase({ url: 'mock-database.sqlite' });
const registeredUser = await database.query.user.findFirst({
  where: and(
    isNotNull(schema.user.registeredAt),
    isNull(schema.user.verifiedAt),
    isNull(schema.user.deletedAt),
  ),
});

const meta = {
  title: 'Domain/UserVerifyStatus',
  component: UserVerifyStatus,
  args: {},
  argTypes: {},
} satisfies Meta<typeof UserVerifyStatus>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    verifyToken: registeredUser?.verifyToken as string,
  },
};

export const Invalid: Story = {
  args: {
    verifyToken: 'invalid-token',
  },
};

export default meta;
