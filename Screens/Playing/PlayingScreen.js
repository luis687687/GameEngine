import GameScreen from "../../CoralGameEngine/GameScreen.js";
import PauseButton from "../buttons/PauseButton.js";

export default class PlayingScreen extends GameScreen {
  constructor(game){
    super(game)
    
    this.backgroundColor = "transparent"
    new PauseButton(this.game, this)
  }


}