import GameImage from "../../CoralGameEngine/GameImage.js";
import GameText from "../../CoralGameEngine/GameText.js";


export default class Leavel extends GameImage {

  constructor(game, screen, x, y) {
    super(game, "./sprites/gui/gui.png", 230, 50, Math.min(250, game.width * 0.15), 50, x, y, 260, 657)
    this.debug = true
    this.text = new GameText(this.game, "0", 18, this.game.width*0.15 , 15, "green")

  }
  update(){
    this.text.text = this.game.actualscore
  }

  async childContent(){


    return [
      this.text
    ]
  } 
}