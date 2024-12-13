import { v4 as uuidv4 } from 'uuid';

import { InvalidUserIdError, UserId } from '@domain/value-objects/user/id.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const id = uuidv4();
    const userId1 = UserId.fromString(id);
    const userId2 = UserId.fromString(id);
    expect(userId1.isEqual(userId2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const userId1 = UserId.fromString(id1);
    const userId2 = UserId.fromString(id2);
    expect(userId1.isEqual(userId2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    const id = uuidv4();
    expect(UserId.isValid(id)).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(UserId.isValid('test2')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => UserId.fromString('test2')).toThrow('Invalid UserId');
    expect(() => UserId.fromString('test2')).toThrowError(InvalidUserIdError);
  });
});
