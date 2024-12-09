import GameObject from "../../../../CoralGameEngine/GameObject.js";
import Area from "../Area/Area.js";
import { Life1, Life2, Life3, Life4, Life5 } from "./Animations.js";

export default class HP extends GameObject{
  constructor(game){
    super(game, "./sprites/hud/hud_hp.png")
    this.animations = [
      new Life1(this, "./sprites/hud/hud_hp.png"),
      new Life2(this, "./sprites/hud/hud_hp1.png"),
      new Life3(this, "./sprites/hud/hud_hp2.png"),
      new Life4(this, "./sprites/hud/hud_hp3.png"),
      new Life5(this, "./sprites/hud/hud_hp4.png")
    ]
    this.enterToAnimation(Life5)
    this.index = 0
    this.cont = 0
    this.just = false
    this.width = 250
    this.height = 170
    this.x = 5
    this.y = -20
  }

}