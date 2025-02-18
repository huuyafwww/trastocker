export abstract class Repository<Entity, ID> {
  abstract save(entity: Entity): Promise<Entity>;
  abstract findById(id: ID): Promise<Entity | null>;
}
