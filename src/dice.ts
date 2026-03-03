export class Dice {
  constructor() {}

  rng(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  d(sides: number) {
    return this.rng(1, sides);
  }

  roll(notation: string) {
    const s = String(notation).trim().toLowerCase();

    const match = /^(\d*)d(\d+)\s*([+-]\s*\d+)?$/.exec(s);
    if (!match) throw new Error(`Invalid dice notation: "${notation}"`);

    const count = match[1] === "" ? 1 : Number(match[1]);
    const sides = Number(match[2]);
    const mod = match[3] ? Number(match[3].replace(/\s+/g, "")) : 0;

    if (!Number.isInteger(count) || count <= 0) {
      throw new Error(`Invalid dice count: ${match[1]}`);
    }

    const rolls = [];
    let total = 0;

    for (let i = 0; i < count; i++) {
      const r = this.d(sides);
      rolls.push(r);
      total += r;
    }

    total += mod;

    return {
      notation: s,
      rolls,
      modifier: mod,
      total,
    };
  }
}
