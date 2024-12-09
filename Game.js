import GameBuilder from "./CoralGameEngine/GameBuilder.js";
import Back2 from "./scripts/GameObjects/Background/Back2/Back2.js";
import Back3 from "./scripts/GameObjects/Background/Back3/Back3.js";
import { Back4 } from "./scripts/GameObjects/Background/Back4/Back4.js";
import Ceil from "./scripts/GameObjects/Background/Ceil/Ceil.js";
import { Sky } from "./scripts/GameObjects/Background/Sky/Sky.js";
import { Mashroom } from "./scripts/GameObjects/Enemies/Mashroom/Mashroom.js";
import HUB from "./scripts/GameObjects/HUD/HUD.js";
import Player from "./scripts/GameObjects/Player/Player.js";

class Game extends GameBuilder {
  constructor(){
    super()
    this.sky = new Sky(this)
    this.back4 = new Back4(this)
    this.back3 = new Back3(this)
    this.back2 = new Back2(this)
    this.background = new Ceil(this)
    this.person = new Player(this)
    this.mashroom = new Mashroom(this)
    this.showHUB()
    this.initializeSound()
  }
  update(){
    
  }




  initializeSound(){
    //new SoundSystem("./sounds/back.mp3", true, 0.01).play()
  }

  showHUB(){
   new HUB(this)
  }

  
}



const game = new Game()