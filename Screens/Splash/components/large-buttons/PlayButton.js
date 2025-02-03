import ScreenButton from "./ScreenButton.js";

export default class PlayButton extends ScreenButton {
  constructor(game, screen,x=0,y=0){
    super(game, screen, "./sprites/gui/gui.png", 66, 29,x,y)
    

  }

  onClick(){
    this.screen.destroy()
  }
}