import Enemy from "../../Enemy.js";
import { Rolling } from "./Animation.js";

export class Bomb extends Enemy {
  constructor(game, w, h, x, y){
    super(game, w, h, x,y)

    this.animations = [
     // new Rolling(this, ".")
    ]
  }
}