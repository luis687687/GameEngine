import GameObject from "../GameObject.js";
import GameScreen from "../GameScreen.js";

/**usado para adicionar component de screen */
export default class ScreenComponent extends GameObject {
  constructor(game, screen, w,h,x,y){
    super(game,w,h,x,y)
    if(screen != undefined)
      this.setScreen(screen)
    this.pausePassible = false
  }

  setScreen(screen){
    if(! (screen instanceof GameScreen) ) {
      console.log("Screen inválido ", this.screen)
      throw "Screen precisa ser uma instancia de GameScreen"
    }
    this.screen = screen
    this.screen.appendChild(this)
  }

}