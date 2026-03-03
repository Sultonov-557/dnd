import { Entity } from "./entity";

interface Info {
  entities: Entity[];
}

export class Player {
  constructor(public entity: Entity) {
    this.entity.player = this;
  }

  choose(info: Info) {}
}
