import { schema } from '@trastocker/database-definition';
import { eq, and, isNull } from 'drizzle-orm';
import { injectable, inject } from 'inversify';

import { WorkspaceUsers } from '@domain/collections/workspace-user.collection';
import { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import { WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';

import type { WorkspaceUserSelectColumns } from '@trastocker/database-definition';
import type { Database } from '@trastocker/database-definition';

const convert = (workspaceUser: WorkspaceUserSelectColumns): WorkspaceUser => {
  return new WorkspaceUser({
    id: WorkspaceUserId.fromString(workspaceUser.id),
    userId: UserId.fromString(workspaceUser.userId),
    workspaceId: WorkspaceId.fromString(workspaceUser.workspaceId),
    createdAt: workspaceUser.createdAt,
    updatedAt: workspaceUser.updatedAt,
    deletedAt: workspaceUser.deletedAt,
  });
};

@injectable()
export class D1WorkspaceUserRepository implements WorkspaceUserRepository {
  constructor(
    @inject('D1Database') private database: Database,
  ) {}

  async save(workspaceUser: WorkspaceUser): Promise<WorkspaceUser> {
    if (!!(await this.findById(workspaceUser.id))) {
      const rows = await this.database.update(schema.workspaceUser).set({
        userId: workspaceUser.userId.toString(),
        workspaceId: workspaceUser.workspaceId.toString(),
        updatedAt: workspaceUser.updatedAt,
        deletedAt: workspaceUser.deletedAt,
      }).where(and(
        eq(schema.workspaceUser.id, workspaceUser.id.toString()),
        isNull(schema.workspaceUser.deletedAt),
      )).returning();

      const row = rows[0];
      if (!row) throw new Error('Failed to update workspace');
      return convert(row);
    }

    const rows = await this.database.insert(schema.workspaceUser).values([{
      ...workspaceUser.serialize(),
    }]).returning();

    const row = rows[0];
    if (!row) throw new Error('Failed to insert workspace');
    return convert(row);
  }

  async findById(id: WorkspaceUserId): Promise<WorkspaceUser | null> {
    const row = await this.database.query.workspaceUser.findFirst({
      where: and(
        eq(schema.workspaceUser.id, id.toString()),
      ),
    });
    if (!row) return null;
    return convert(row);
  }

  async findByUserId(userId: UserId): Promise<WorkspaceUsers> {
    const rows = await this.database.query.workspaceUser.findMany({
      where: and(
        eq(schema.workspaceUser.userId, userId.toString()),
      ),
    });
    return WorkspaceUsers.from(rows.map(convert));
  }

  async findByWorkspaceId(workspaceId: WorkspaceId): Promise<WorkspaceUsers> {
    const rows = await this.database.query.workspaceUser.findMany({
      where: and(
        eq(schema.workspaceUser.workspaceId, workspaceId.toString()),
      ),
    });
    return WorkspaceUsers.from(rows.map(convert));
  }
}
