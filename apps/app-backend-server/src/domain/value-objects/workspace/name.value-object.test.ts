import { InvalidWorkspaceNameError, WorkspaceName } from '@domain/value-objects/workspace/name.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const workspaceName = 'test';
    const workspaceName1 = WorkspaceName.fromString(workspaceName);
    const workspaceName2 = WorkspaceName.fromString(workspaceName);
    expect(workspaceName1.isEqual(workspaceName2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const workspaceName1 = WorkspaceName.fromString('test1');
    const workspaceName2 = WorkspaceName.fromString('test2');
    expect(workspaceName1.isEqual(workspaceName2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    expect(WorkspaceName.isValid('test')).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(WorkspaceName.isValid('')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => WorkspaceName.fromString('')).toThrow('Invalid WorkspaceName');
    expect(() => WorkspaceName.fromString('')).toThrowError(InvalidWorkspaceNameError);
  });
});
