import GameText from "../../../../CoralGameEngine/GameText.js";

export class TextGameOver extends GameText {
  constructor(game){
    super(game)
    this.text = "Perdeu !"
    this.color = "orange"
    this.x = this.game.width/2- 130
    this.y = this.height/2+50
    this.fontSize = 60
  }
}