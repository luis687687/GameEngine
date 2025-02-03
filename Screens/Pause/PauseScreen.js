import GameScreen from "../../CoralGameEngine/GameScreen.js";
import BoardPause from "./components/BoardPause/BoardPause.js";


export default class PauseScreen extends GameScreen{
  constructor(game){
    super(game)
    this.game.pause = true
    this.board()
  }

  onDestroy(){
    this.game.pause = false
  }

  board(){
    new BoardPause(this.game, this, this.game.width*0.3, this.game.height*0.9)
  }
}