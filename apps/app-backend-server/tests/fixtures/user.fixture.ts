import { User } from '@domain/entities/user.entity';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserPassword } from '@domain/value-objects/user/password.value-object';

export const mockedUserId = UserId.generate();
export const mockedUserName = 'user';
export const mockedUserEmail = UserEmail.fromString('user@user.com');
export const mockedUserPassword = UserPassword.fromRawString('t2t2tN{b((t&');

export const mockedUserData = {
  id: mockedUserId,
  name: mockedUserName,
  email: mockedUserEmail,
  password: mockedUserPassword,
  registeredAt: new Date(),
  verifiedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
export const mockedUser = new User(mockedUserData);
