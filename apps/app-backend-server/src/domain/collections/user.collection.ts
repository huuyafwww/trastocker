import type { User } from '@domain/entities/user.entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';

export class Users {
  private constructor(private entities: User[]) {}

  public static from(entities: User[]): Users {
    return new Users(entities);
  }

  public filterActive(): Users {
    return Users.from(this.entities.filter(entity => !entity.isDeleted()));
  }

  public pickIds(): UserId[] {
    return this.entities.map(entity => entity.id);
  }

  public toEntities(): User[] {
    return this.entities;
  }
}
