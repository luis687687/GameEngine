import GameImage from "../../CoralGameEngine/GameImage.js";
import SoundSystem from "../../CoralGameEngine/Systems/SoundSystem.js";

export default class PauseButton extends GameImage {
  constructor(game, screen, x, y){

    super(game, "./sprites/gui/gui.png", 60,60, 50, 50, game.width*0.95, game.height*0.95, 509, 380)
    this.debug = true
    this.setScreen(screen)
    this.sound = new SoundSystem("./sounds/click.mp3")
  }

  onClick(){
    if(this.game.pause) return
    this.game.pauseScreen()
    this.sound.playOnAnimation()
  }

}