import { Entity } from "./entity";

interface Info {
  entities: Entity[];
}

interface Choise {
  entity?: Entity;
}

export class Player {
  constructor(public entity: Entity) {
    this.entity.player = this;
  }

  choose(info: Info): Choise {
    const { entities } = info;
    const logicalChoises = entities.filter(
      (entity) => entity.name !== this.entity.name,
    );

    return { entity: logicalChoises[0] };
  }
}
