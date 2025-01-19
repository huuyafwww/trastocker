import { InvalidWorkspaceInviteCodeError, WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const inviteCode = 'TEST1234';
    const inviteCode1 = WorkspaceInviteCode.fromString(inviteCode);
    const inviteCode2 = WorkspaceInviteCode.fromString(inviteCode);
    expect(inviteCode1.isEqual(inviteCode2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const inviteCode1 = WorkspaceInviteCode.fromString('TEST1234');
    const inviteCode2 = WorkspaceInviteCode.fromString('TEST5678');
    expect(inviteCode1.isEqual(inviteCode2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    expect(WorkspaceInviteCode.isValid('TEST1234')).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(WorkspaceInviteCode.isValid('test2')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => WorkspaceInviteCode.fromString('test')).toThrow('Invalid WorkspaceInviteCode');
    expect(() => WorkspaceInviteCode.fromString('test')).toThrowError(InvalidWorkspaceInviteCodeError);
  });
});
