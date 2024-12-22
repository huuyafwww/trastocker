import { primaryKey, nullable } from '@mswjs/data';

export const user = {
  id: primaryKey(String),
  createdAt: Date,
  updatedAt: Date,
  deletedAt: nullable(Date),
  name: String,
  email: String,
  registeredAt: Date,
  verifiedAt: nullable(Date),
};
