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

export class Entity {
  public health: number;
  public player?: Player = new Player(this);
  constructor(
    public name: string = "Entity",
    public stats: Stats = {
      armorClass: 10,
      constitution: 10,
      dexterity: 10,
      healthPoints: 20,
      intelligence: 10,
      strength: 5,
      wisdom: 10,
      charisma: 10,
    },
    public dice: Dice = new Dice(),
  ) {
    this.health = stats.healthPoints;

    console.log(
      `Entity ${name} created with ${stats.healthPoints} health points`,
    );
  }

  damage(amount: number) {
    if (amount <= this.stats.armorClass) {
      console.log(
        `${this.name} took ${amount} damage but was resisted and is now at ${this.health} health points`,
      );
      return;
    }
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }

    console.log(
      `${this.name} took ${amount} damage and is now at ${this.health} health points`,
    );
  }

  heal(amount: number) {
    this.health += amount;
    if (this.health > this.stats.healthPoints) {
      this.health = this.stats.healthPoints;
    }

    console.log(
      `${this.name} healed ${amount} points and is now at ${this.health} health points`,
    );
  }
}
