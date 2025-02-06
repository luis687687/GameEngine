import GameText from "../../../../CoralGameEngine/GameText.js";
import GameBoard1 from "../../../Boards/GameBoard1.js";
import SimpleButton from "../../../buttons/SimpleButton.js";


export default class BoardPause extends GameBoard1{

  constructor(game, screen, x, y){
    super(game, screen, x, y)
  }

  async childContent(){
    this.items()

    return [
      this.title,
      this.btnContinue,
      this.btnBack
    ]
  }

  items(){
    const xOffset = 220
    this.title = new GameText(this.game, "Pausa", 60, 120 + xOffset, 305)
    this.btnContinue = new SimpleButton(this.game, "Honrar o Guerreiro", 20, 110 + xOffset, 240)
    this.btnBack = new SimpleButton(this.game, "Fugir da guerra", 20, 125 + xOffset, 200-5)

    this.events()
  }

  events(){
    this.btnContinue.onClick = () => { this.screen.destroy ()}
    this.btnBack.onClick = () => { 
      this.screen.destroy()
      this.game.splashScreen()
    }
  }
}