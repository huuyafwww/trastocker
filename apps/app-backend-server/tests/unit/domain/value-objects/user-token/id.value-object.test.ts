import { v4 as uuidv4 } from 'uuid';

import { InvalidUserTokenIdError, UserTokenId } from '@domain/value-objects/user-token/id.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const id = uuidv4();
    const userTokenId1 = UserTokenId.fromString(id);
    const userTokenId2 = UserTokenId.fromString(id);
    expect(userTokenId1.isEqual(userTokenId2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const userTokenId1 = UserTokenId.fromString(id1);
    const userTokenId2 = UserTokenId.fromString(id2);
    expect(userTokenId1.isEqual(userTokenId2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    const id = uuidv4();
    expect(UserTokenId.isValid(id)).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(UserTokenId.isValid('test2')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => UserTokenId.fromString('test2')).toThrow('Invalid UserTokenId');
    expect(() => UserTokenId.fromString('test2')).toThrowError(InvalidUserTokenIdError);
  });
});
