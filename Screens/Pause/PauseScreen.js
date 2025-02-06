import GameScreen from "../../CoralGameEngine/GameScreen.js";
import BoardPause from "./components/BoardPause/BoardPause.js";


export default class PauseScreen extends GameScreen{
  constructor(game){
    super(game)
    this.game.pause = true
    this.board()
    this.game.sound.setVolume(0.2)
  }

  onDestroy(){
    this.game.pause = false
    this.game.sound.setVolume(0.6)
  }

  board(){
    new BoardPause(this.game, this, this.game.width*0.3, this.game.height*0.9)
  }
}