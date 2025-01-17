import { v4 as uuidv4 } from 'uuid';

import { InvalidWorkspaceIdError, WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const id = uuidv4();
    const workspaceId1 = WorkspaceId.fromString(id);
    const workspaceId2 = WorkspaceId.fromString(id);
    expect(workspaceId1.isEqual(workspaceId2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const workspaceId1 = WorkspaceId.fromString(id1);
    const workspaceId2 = WorkspaceId.fromString(id2);
    expect(workspaceId1.isEqual(workspaceId2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    const id = uuidv4();
    expect(WorkspaceId.isValid(id)).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(WorkspaceId.isValid('test2')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => WorkspaceId.fromString('test2')).toThrow('Invalid WorkspaceId');
    expect(() => WorkspaceId.fromString('test2')).toThrowError(InvalidWorkspaceIdError);
  });
});
