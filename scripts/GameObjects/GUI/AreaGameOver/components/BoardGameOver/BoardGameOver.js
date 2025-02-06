
import GameText from "../../../../../../CoralGameEngine/GameText.js";
import GameBoard1 from "../../../../../../Screens/Boards/GameBoard1.js";
import SimpleButton from "../../../../../../Screens/buttons/SimpleButton.js";


export default class BoardGameOver extends GameBoard1 {

  constructor(game,screen, x, y){
    super(game, screen,x, y)
   
  }



  async childContent(){
    this.instanteate()

    return [
      this.title,
      this.btnBack
    ]

  }

  instanteate(){
    const xPose = 340
    this.title = new GameText(this.game, "Morte!", 60, xPose, 300)
    this.btnBack = new SimpleButton(this.game, "Voltar para menu", 20, xPose, 140)

    this.btnBack.onClick = () => {
      this.screen.destroy()
      this.game.splashScreen()
    }
  }

  
}