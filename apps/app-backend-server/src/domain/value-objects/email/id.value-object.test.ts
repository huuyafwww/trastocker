import { v4 as uuidv4 } from 'uuid';

import { InvalidEmailIdError, EmailId } from '@domain/value-objects/email/id.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const id = uuidv4();
    const emailId1 = EmailId.fromString(id);
    const emailId2 = EmailId.fromString(id);
    expect(emailId1.isEqual(emailId2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const emailId1 = EmailId.fromString(id1);
    const emailId2 = EmailId.fromString(id2);
    expect(emailId1.isEqual(emailId2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    const id = uuidv4();
    expect(EmailId.isValid(id)).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(EmailId.isValid('test2')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => EmailId.fromString('test2')).toThrow('Invalid EmailId');
    expect(() => EmailId.fromString('test2')).toThrowError(InvalidEmailIdError);
  });
});
