import GameImage from "../../../CoralGameEngine/GameImage.js";
import GameText from "../../../CoralGameEngine/GameText.js";
import SimpleButton from "../../buttons/SimpleButton.js";
import PlayButton from "./large-buttons/PlayButton.js";
import RankingButton from "./large-buttons/RankingButton.js";
import TextTable from "./TextTable.js";



export default class Table extends GameImage {
  constructor(game, screen){
    super(game,  "./sprites/gui/board1.png", 1024, 1024, 470, 470, game.width*0.45, game.height*0.95, 0, 0)
    this.setScreen(screen)
    this.debug = true
    
  }


    clickPlay(){
      this.screen.destroy()
      this.game.initializeFirstObjects()
    }
    clickRanking(){
      this.destroy()
      this.screen.menuRanking()
    }

    async childContent(){
      
      
      this.instanteateButtons()

  
      return [
        this.btnPlay,
        this.btnLeaderBoard,
        this.btnActiveControllers,
        this.btnClose
       
      ]
    }


    instanteateButtons(){
      this.btnPlay = new SimpleButton(this.game, "Jogar", 25, this.width*0.42, this.height*0.65)
      this.btnLeaderBoard = new SimpleButton(this.game, "Ranking", 25, this.width*0.42, this.height*0.54)
      this.btnActiveControllers = new SimpleButton(this.game, "Controles", 20, this.width*0.42, this.height*0.43)
      this.btnClose = new SimpleButton(this.game, "Abandonar", 18, this.width*0.42, this.height*0.32)
      this.addEvents()
    }

    addEvents(){
      this.btnPlay.onClick = this.clickPlay
      this.btnLeaderBoard.onClick = () => { this.clickRanking() }
    }
}