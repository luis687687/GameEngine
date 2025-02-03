import GameText from "../../../../CoralGameEngine/GameText.js";
import GameBoard1 from "../../../Boards/GameBoard1.js";


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
    this.title = new GameText(this.game, "Pausa", 60, 120, 305)
    this.btnContinue = new GameText(this.game, "Honrar o Guerreiro", 20, 110, 240)
    this.btnBack = new GameText(this.game, "Fugir da guerra", 20, 125, 200-5)

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