import GameObject from "../../../CoralGameEngine/GameObject.js"
import GameText from "../../../CoralGameEngine/GameText.js"
import Back from "./Area/Back.js"
import Avatar from "./Avatar.js"
import HP from "./HP/HP.js"

export default class  HUD extends GameObject {
  constructor(game){
    super(game)
      this.visible = false
      new Back(game)
      this.text = new GameText(game, "Luis Marques", 11, 145, 65)
      this.image = new Avatar(game)
      new HP(game)
  }
}