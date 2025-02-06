import GameImage from "../../../CoralGameEngine/GameImage.js";
import GameText from "../../../CoralGameEngine/GameText.js";
import { getMyScore, getScoreBoard } from "../../../scripts/gameToServer.js";
import CloseButton from "../../buttons/CloseButton.js";
import SimpleButton from "../../buttons/SimpleButton.js";
import UserPontuation from "../../UserPontuation/UserPontuation.js";
import TextTable from "./TextTable.js";



export default class MenuRanking extends GameImage {
  constructor(game, screen){
    super(game,  "./sprites/gui/board2.png", 1024, 1024, 550, 490, game.width*0.45, game.height*0.95, 0, 0)
    this.setScreen(screen)
    this.xTextOffset = this.width*0.5
  }

  
    async childContent(){
      this.instanteateButtons()
      const scores = await getScoreBoard()
      return [
        this.textTitle,
        ...scores.map((score, index) => new UserPontuation(this.game, "", score.user.email, score.score, 280+this.xTextOffset, 290-60*index))
      ]
    }


    instanteateButtons(){
      this.textTitle = new GameText(this.game, "Ranking", 50, this.width*0.44+this.xTextOffset, this.height*0.8, "#a83d15")
    }


}