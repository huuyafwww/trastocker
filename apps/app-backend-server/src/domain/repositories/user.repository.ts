import type { Users } from '@domain/collections/user.collection';
import type { User } from '@domain/entities/user.entity';
import type { UserEmail } from '@domain/value-objects/user/email.value-object';
import type { UserId } from '@domain/value-objects/user/id.value-object';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findById(id: UserId): Promise<User | null>;
  abstract findByIds(ids: UserId[]): Promise<Users>;
  abstract findByEmail(email: UserEmail): Promise<User | null>;
}
