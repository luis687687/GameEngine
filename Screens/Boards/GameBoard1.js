import GameImage from "../../CoralGameEngine/GameImage.js"

export default class GameBoard1 extends GameImage {

  constructor(game,screen, x, y){
    super(game, "./sprites/gui/board2.png", 690, 712, 450, 450, x, y, 313, 180)
    this.setScreen(screen)
    this.debug = false
  }


}