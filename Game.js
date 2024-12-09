import GameBuilder from "./CoralGameEngine/GameBuilder.js";
import GameObject from "./CoralGameEngine/GameObject.js";
import SoundSystem from "./CoralGameEngine/Systems/SoundSystem.js";
import Objecto from "./Objecto.js";
import Back2 from "./scripts/GameObjects/Background/Back2/Back2.js";
import Back3 from "./scripts/GameObjects/Background/Back3/Back3.js";
import { Back4 } from "./scripts/GameObjects/Background/Back4/Back4.js";
import Ceil from "./scripts/GameObjects/Background/Ceil/Ceil.js";
import { Sky } from "./scripts/GameObjects/Background/Sky/Sky.js";
import { Mashroom } from "./scripts/GameObjects/Enemies/Mashroom/Mashroom.js";
import AreaGameOver from "./scripts/GameObjects/GUI/AreaGameOver/AreaGameOver.js";
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
    new Objecto(this)
    this.instanceateTimerControlers()
    this.showHUB()
    this.initializeSound()
  }


  update(){
    
    this.instanceateEnemies()
  }




  initializeSound(){
   new SoundSystem("./sounds/back.mp3", true, 0.02).play()
  }

  showHUB(){
   this.hud = new HUB(this)
  }

  gameOver(){
    this.area = new AreaGameOver(this)
  }



  updateTimerControler(){
    if(this.timer - this.pastTime >= 1000){
      this.pastTime = this.timer
      this.count++
      this.justIntaceate = false
    }
    
  }

  instanceateEnemies(){
    this.updateTimerControler()
    if(this.justIntaceate) return
    if(this.count == 0) return
    if(this.count % this.timeToCreateEnemy == 0){
      if(!this.whenInstanceateEnemy()) return
      new Mashroom(this, this.person.x + this.distanceToIntanceate)
      this.justIntaceate = true
    }
  }

  instanceateTimerControlers(){
    this.justIntaceate = false
    this.count = 0
    this.pastTime = 0
    this.timeToCreateEnemy = 3
    this.distanceToIntanceate = 150
    this.enemiesDied = 0
  }

  whenInstanceateEnemy(){
    return this.person.isOnCenter
  }


  
}



const game = new Game()
export default game

