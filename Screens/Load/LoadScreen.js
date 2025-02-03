import GameScreen from "../../CoralGameEngine/GameScreen.js"
import LoadScreen2 from "./LoadScreen2.js"

export default class LoadScreen extends GameScreen {
  constructor(game){
    super(game)
    this.game.pause = true 
    this.backgroundColor = "blue"
    setTimeout( () => {
      this.createScreen2()
      this.destroy()
    }, 3000)
    
  }

  createScreen2(){
    console.log("Screen 2")
    const screen2 = new LoadScreen2(this.game)
    setTimeout(() => {
      screen2.destroy()
    }, 3000)

  }
}