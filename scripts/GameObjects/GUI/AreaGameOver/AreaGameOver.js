
import GameScreen from "../../../../CoralGameEngine/GameScreen.js";
import BoardGameOver from "./components/BoardGameOver/BoardGameOver.js";
import { TextGameOver } from "./TextGameOver.js";

export default class AreaGameOver extends GameScreen {

  constructor(game){
    super(game)
    this.instateate()
    
  }


  
  
  update(){
    this.game.pause = true
  }
  instateate(){
    this.board = new BoardGameOver(this.game, this, this.width*0.3, this.game.height*0.9)
  }
  onDestroy(){
    this.game.pause = false
  }

}