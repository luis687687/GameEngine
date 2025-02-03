import Area from "./Area.js";

export default class Back extends Area {
  constructor(game){
    super(game, "./sprites/hud/hud_bg.png")
    this.setY(game.height)
    this.height = 180
  }
}