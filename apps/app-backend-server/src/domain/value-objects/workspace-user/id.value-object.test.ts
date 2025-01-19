import { v4 as uuidv4 } from 'uuid';

import { InvalidWorkspaceUserIdError, WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const id = uuidv4();
    const workspaceUserId1 = WorkspaceUserId.fromString(id);
    const workspaceUserId2 = WorkspaceUserId.fromString(id);
    expect(workspaceUserId1.isEqual(workspaceUserId2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const workspaceUserId1 = WorkspaceUserId.fromString(id1);
    const workspaceUserId2 = WorkspaceUserId.fromString(id2);
    expect(workspaceUserId1.isEqual(workspaceUserId2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    const id = uuidv4();
    expect(WorkspaceUserId.isValid(id)).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(WorkspaceUserId.isValid('test2')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => WorkspaceUserId.fromString('test2')).toThrow('Invalid WorkspaceUserId');
    expect(() => WorkspaceUserId.fromString('test2')).toThrowError(InvalidWorkspaceUserIdError);
  });
});
