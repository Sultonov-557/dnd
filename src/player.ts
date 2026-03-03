import { Entity } from "./entity";

export class Player {
  constructor(public entity: Entity) {
    this.entity.player = this;
  }
}
