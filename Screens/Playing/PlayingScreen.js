import GameScreen from "../../CoralGameEngine/GameScreen.js";
import PauseButton from "../buttons/PauseButton.js";
import EnemyIndicator from "../Indicators/EnemyIndicator.js";
import Leavel from "../Indicators/Leavel.js";

export default class PlayingScreen extends GameScreen {
  constructor(game){
    super(game)
    
    this.backgroundColor = "transparent"
    new PauseButton(this.game, this)
    this.showIndicatorsDeads()
    
  }



  showIndicatorsDeads(){

    const y = this.game.height*0.95

    this.dragonIncator = new EnemyIndicator(this.game, this, "./sprites/gui/dragon/up/2.png", this.game.width*0.7, y, this.game.width*0.04)
    this.mashIndicator = new EnemyIndicator(this.game, this, "./sprites/enemies/Mushroom/ma.png", this.game.width*0.56, y, this.game.width*0.06)

    this.mashIndicator.imageIcon.iw = 29
    this.mashIndicator.imageIcon.ih = 39
    this.mashIndicator.imageIcon.width = 29
    this.mashIndicator.imageIcon.height = 39

    this.leavelIndicator = new Leavel(this.game, this, this.width*0.34, y )
    
    
  }

  update(){
    this.dragonIncator.text.text = this.game.totalDragonsDeads
    this.mashIndicator.text.text = this.game.totalMashDeads
  }
}