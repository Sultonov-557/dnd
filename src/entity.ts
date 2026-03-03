import { Dice } from "./dice";
import { Player } from "./player";

interface Stats {
  healthPoints: number;
  armorClass: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface Info {
  entities: Entity[];
}

export class Entity {
  public health: number;
  public player?: Player = new Player(this);
  constructor(
    public stats: Stats,
    public dice: Dice = new Dice(),
  ) {
    this.health = stats.healthPoints;
  }

  damage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }
  }

  heal(amount: number) {
    this.health += amount;
    if (this.health > this.stats.healthPoints) {
      this.health = this.stats.healthPoints;
    }
  }

  choose(info: Info) {}
}
