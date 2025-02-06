import GameImage from "../../CoralGameEngine/GameImage.js";
import SoundSystem from "../../CoralGameEngine/Systems/SoundSystem.js";

export default class PauseButton extends GameImage {
  constructor(game, screen){

    super(game, "./sprites/gui/items1.png", 700,700, 60, 60, game.width*0.9, game.height*0.95, 1280, 2710)
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