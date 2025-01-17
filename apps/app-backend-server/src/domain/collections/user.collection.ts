import { Collection } from '@domain/collections/collection';

import type { User } from '@domain/entities/user.entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';

export class Users extends Collection<User, UserId> {
  private constructor(entities: User[]) {
    super(entities);
  }

  public static from(entities: User[]): Users {
    return new Users(entities);
  }

  public filterActive(): Users {
    return Users.from(this.entities.filter(entity => !entity.isDeleted()));
  }
}
