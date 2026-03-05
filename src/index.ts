import { Combat } from "./combat.ts";
import { Entity } from "./entity.ts";

const player1 = new Entity("john");
const player2 = new Entity("latte");

const combat = new Combat([player1, player2]);
