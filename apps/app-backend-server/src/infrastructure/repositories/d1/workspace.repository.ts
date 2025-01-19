import { schema } from '@trastocker/database-definition';
import { eq, and, isNull, inArray } from 'drizzle-orm';
import { injectable, inject } from 'inversify';

import { Workspaces } from '@domain/collections/workspace.collection';
import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';
import { WorkspaceName } from '@domain/value-objects/workspace/name.value-object';

import type { WorkspaceSelectColumns } from '@trastocker/database-definition';
import type { Database } from '@trastocker/database-definition';

const convert = (workspace: WorkspaceSelectColumns): Workspace => {
  return new Workspace({
    id: WorkspaceId.fromString(workspace.id),
    name: WorkspaceName.fromString(workspace.name),
    inviteCode: WorkspaceInviteCode.fromString(workspace.inviteCode),
    createdAt: workspace.createdAt,
    updatedAt: workspace.updatedAt,
    deletedAt: workspace.deletedAt,
  });
};

@injectable()
export class D1WorkspaceRepository implements WorkspaceRepository {
  constructor(
    @inject('D1Database') private database: Database,
  ) {}

  async save(workspace: Workspace): Promise<Workspace> {
    if (!!(await this.findById(workspace.id))) {
      const rows = await this.database.update(schema.workspace).set({
        name: workspace.name.toString(),
        inviteCode: workspace.inviteCode.toString(),
        updatedAt: workspace.updatedAt,
        deletedAt: workspace.deletedAt,
      }).where(and(
        eq(schema.workspace.id, workspace.id.toString()),
        isNull(schema.workspace.deletedAt),
      )).returning();

      const row = rows[0];
      if (!row) throw new Error('Failed to update workspace');
      return convert(row);
    }

    const rows = await this.database.insert(schema.workspace).values([{
      ...workspace.serialize(),
    }]).returning();

    const row = rows[0];
    if (!row) throw new Error('Failed to insert workspace');
    return convert(row);
  }

  async findById(id: WorkspaceId): Promise<Workspace | null> {
    const row = await this.database.query.workspace.findFirst({
      where: and(
        eq(schema.workspace.id, id.toString()),
      ),
    });
    if (!row) return null;
    return convert(row);
  }

  async findByIds(ids: WorkspaceId[]): Promise<Workspaces> {
    if (ids.length === 0) return Workspaces.from([]);
    const rows = await this.database.query.workspace.findMany({
      where: and(
        inArray(schema.workspace.id, ids.map(id => id.toString())),
        isNull(schema.workspace.deletedAt),
      ),
    });
    return Workspaces.from(rows.map(convert));
  }

  async findByInviteCode(inviteCode: WorkspaceInviteCode): Promise<Workspace | null> {
    const row = await this.database.query.workspace.findFirst({
      where: and(
        eq(schema.workspace.inviteCode, inviteCode.toString()),
      ),
    });
    if (!row) return null;
    return convert(row);
  }
}
