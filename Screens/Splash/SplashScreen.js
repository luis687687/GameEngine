import GameScreen from "../../CoralGameEngine/GameScreen.js";
import BackImage from "./components/BackImage.js";
import ImageCover from "./components/ImageCover.js";
import OptionButton from "./components/large-buttons/RankingButton.js";
import PlayButton from "./components/large-buttons/PlayButton.js";
import Table from "./components/Table.js";
import MenuRanking from "./components/MenuRanking.js";
import SimpleButton from "../buttons/SimpleButton.js";


export default class SplashScreen extends GameScreen {
  constructor(game){
    super(game)
    this.game.pause = true 
    this.backgroundColor = "skyblue"
    this.putImageCover()
    this.menu()
    this.game.reinitAll()
  }


  putImageCover(){
    new BackImage(this.game, this)
    new ImageCover(this.game, this)
    
  }
  
  menu(){
    new Table(this.game, this)
  }

  menuRanking(){
    this.menu_rank = new MenuRanking(this.game, this)
    this.btnBackFromRanking()
   
  }

  btnBackFromRanking(){
    this.btnBack = new SimpleButton(this.game, "Voltar", 20, this.width*0.5, this.height*0.57)
    this.btnBack.setScreen(this)
    this.btnBack.height = 45
    this.btnBack.width = 100
    this.addEvents()
  }

  addEvents(){
    const father = this
    this.btnBack.onClick = () => {
      if(father.menu_rank)
        father.menu_rank.destroy()
      father.btnBack.destroy()
      father.menu()
    }
  }


  onDestroy(){
    this.game.pause = false
  }
} 