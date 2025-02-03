import GameScreen from "../../CoralGameEngine/GameScreen.js";
import BackImage from "./components/BackImage.js";
import ImageCover from "./components/ImageCover.js";
import OptionButton from "./components/large-buttons/RankingButton.js";
import PlayButton from "./components/large-buttons/PlayButton.js";
import Table from "./components/Table.js";
import MenuRanking from "./components/MenuRanking.js";


export default class SplashScreen extends GameScreen {
  constructor(game){
    super(game)
    this.game.pause = true 
    this.backgroundColor = "skyblue"
    this.putImageCover()
    this.menu()

    
  }


  putImageCover(){
    new BackImage(this.game, this)
    new ImageCover(this.game, this)
    
  }
  
  menu(){
    new Table(this.game, this)
  }

  menuRanking(){
    new MenuRanking(this.game, this)
  }


  onDestroy(){
    this.game.pause = false
  }
} 