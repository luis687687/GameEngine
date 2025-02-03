import Table from "../Table.js";
import ScreenButton from "./ScreenButton.js";

export default class RankingButton extends ScreenButton {
  constructor(game, screen, x=0, y=0){
    super(game, screen, "./sprites/gui/gui.png", 66, 160, x, y  )
    
    
  }

  onClick(){
    this.screen.removeChildByType(Table)
    this.screen.menuRanking()
  }
}