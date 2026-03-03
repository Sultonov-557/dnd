import type { Entity } from "./entity";

export class Combat {
  public entities: Entity[];
  public turn: number = 0;
  constructor(entities: Entity[]) {
    const order = [];
    for (const entity of entities) {
      const roll = entity.dice.roll("1d20");
      order.push({ entity, roll: roll.total });
    }

    this.entities = order.sort((a, b) => a.roll - b.roll).map((o) => o.entity);
  }

  tick() {
    const entity = this.entities[this.turn];
    const choise = entity?.player?.choose({ entities: this.entities }) || null;
  }
}
