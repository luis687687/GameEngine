import GameImage from "../../../CoralGameEngine/GameImage.js";
import GameText from "../../../CoralGameEngine/GameText.js";
import { getMyScore, getScoreBoard } from "../../../scripts/gameToServer.js";
import CloseButton from "../../buttons/CloseButton.js";
import UserPontuation from "../../UserPontuation/UserPontuation.js";
import TextTable from "./TextTable.js";



export default class MenuRanking extends GameImage {
  constructor(game, screen){
    super(game,  "./sprites/gui/board2.png", 1024, 1024, 550, 490, game.width*0.45, game.height*0.95, 0, 0)
    this.setScreen(screen)
    
  }

  
    async childContent(){
      this.instanteateButtons()
      const scores = await getScoreBoard()
      return [
        this.btnBack,
        this.textTitle,
        ...scores.map((score, index) => new UserPontuation(this.game, "", score.user.email, score.score, 190, 290-60*index))
      ]
    }


    instanteateButtons(){
      this.textTitle = new GameText(this.game, "Ranking", 50, this.width*0.44, this.height*0.8, "#a83d15")
      this.btnBack = new GameText(this.game, "Voltar", 20, this.width*0.08, this.height*0.49)
      this.btnBack.height = 45
      this.btnBack.width = 100
      this.addEvents()
    }

    addEvents(){
      const father = this
      this.btnBack.onClick = function(){
        father.destroy()
        father.screen.menu()
      }
    }
}