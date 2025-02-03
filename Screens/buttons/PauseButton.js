import GameImage from "../../CoralGameEngine/GameImage.js";

export default class PauseButton extends GameImage {
  constructor(game, screen){

    super(game, "./sprites/gui/items1.png", 700,700, 60, 60, game.width*0.9, game.height*0.95, 1280, 2710)
    this.debug = true
    this.setScreen(screen)
  }

  onClick(){
    this.game.pauseScreen()
  }
}