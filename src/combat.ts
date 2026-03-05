import type { Entity } from "./entity";

export class Combat {
  public entities: Entity[];
  public turn: number = 0;
  public ended: boolean = false;
  constructor(entities: Entity[]) {
    const order = [];
    for (const entity of entities) {
      const roll = entity.dice.roll("1d20");
      console.log(`${entity.name} rolled ${roll.total} for initiative`);
      order.push({ entity, roll: roll.total });
    }

    this.entities = order.sort((a, b) => b.roll - a.roll).map((o) => o.entity);

    console.log(`combat order: ${this.entities.map((e) => e.name).join(", ")}`);

    while (!this.ended) {
      this.tick();
      this.turn = (this.turn + 1) % this.entities.length;
    }
  }

  tick() {
    const entity = this.entities[this.turn];
    if (!entity) return;
    console.log(`Combat turn ${this.turn} for ${entity.name}`);

    const choise = entity?.player?.choose({ entities: this.entities }) || null;
    if (!choise) return;
    if (!choise.entity) return;

    console.log(
      `Combat turn ${this.turn} for ${entity.name} chose ${choise.entity.name} to attack`,
    );

    const roll = entity.dice.roll(`1d20+${entity.stats.strength}`);
    console.log(
      `Combat turn ${this.turn} for ${entity.name} rolled ${roll.total} with ${roll.modifier} modifier`,
    );
    choise.entity?.damage(roll.total);

    this.entities = this.entities.filter((entity) => entity.health > 0);
    if (this.entities.length <= 1) {
      this.ended = true;
      return;
    }
  }
}
