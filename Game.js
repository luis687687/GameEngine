import GameBuilder from "./CoralGameEngine/GameBuilder.js";
import GameObjectColider from "./CoralGameEngine/GameObjectColider.js"; //para remover os coliders do game manualmente
import SoundSystem from "./CoralGameEngine/Systems/SoundSystem.js";
import LoadScreen from "./Screens/Load/LoadScreen.js";
import PauseScreen from "./Screens/Pause/PauseScreen.js";
import PlayingScreen from "./Screens/Playing/PlayingScreen.js";
import SplashScreen from "./Screens/Splash/SplashScreen.js";

import Back2 from "./scripts/GameObjects/Background/Back2/Back2.js";
import Back3 from "./scripts/GameObjects/Background/Back3/Back3.js";
import { Back4 } from "./scripts/GameObjects/Background/Back4/Back4.js";
import Ceil from "./scripts/GameObjects/Background/Ceil/Ceil.js";
import { Sky } from "./scripts/GameObjects/Background/Sky/Sky.js";
import RedDragon from "./scripts/GameObjects/Enemies/Dragon/RedDragon/RedDragon.js";
import Enemy from "./scripts/GameObjects/Enemies/Enemy.js";
import { Mashroom } from "./scripts/GameObjects/Enemies/Mashroom/Mashroom.js";
import Cloud1 from "./scripts/GameObjects/GameItems/Cloud/Cloud1.js";
import Cloud2 from "./scripts/GameObjects/GameItems/Cloud/Cloud2.js";
import Cloud5 from "./scripts/GameObjects/GameItems/Cloud/Cloud5.js";
import AreaGameOver from "./scripts/GameObjects/GUI/AreaGameOver/AreaGameOver.js";
import HUB from "./scripts/GameObjects/GUI/HUD/HUD.js";
import Player from "./scripts/GameObjects/Player/Player.js";
import { getMyScore, getScoreBoard } from "./scripts/gameToServer.js";




class Game extends GameBuilder {
  constructor(){
    super(30)

    this.initializeFirstObjects()
    this.playingScreen()
    this.showHUB()
    //this.splashScreen()
    //this.pauseScreen()
    this.#initialServerRequests()
    this.initializeGameVariables()
    //this.gameOver()
  }


  update(){
    this.instanceateEnemies(this)
    
    
  }

  splashScreen(){
    new SplashScreen(this)
  }
  playingScreen(){
    new PlayingScreen(this)
  }
  pauseScreen(){
    new PauseScreen(this)
  }

  initializeFirstObjects(){

    this.reinitAll()
    this.sky = new Sky(this)
    this.back4 = new Back4(this)
    this.back3 = new Back3(this)
    this.back2 = new Back2(this)
    this.background = new Ceil(this)
    this.person = new Player(this)
    this.gameover = false
    this.listElements = [this.sky, this.back2, this.back3, this.back4, this.background, this.person]
    this.gameOverObject = null
    this.leavel = 0

    new RedDragon(this)
    this.instanceateTimerControlers()
    this.instanteateCloud()
  }

  reinitAll(){
    this.listElements?.forEach( e => e.destroy())
    this.removeObjectByType(Enemy)
    this.removeObjectByType(GameObjectColider)
    if(this.intervalcloud)
      clearInterval(this.intervalcloud)
  }







  initializeSound(){
   new SoundSystem("./sounds/back.mp3", true, 0.02).play()
  }

  showHUB(){
   this.hud = new HUB(this)
  }

  gameOver(){
    this.gameOverObject = new AreaGameOver(this)
    this.gameover = true
  }
  removeGameOver(){
   this.removeScreen(AreaGameOver)
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
      
      new Mashroom(this, this.person.x + this.distanceToIntanceate, 0)
      this.justIntaceate = true
    }
  }

  instanceateTimerControlers(){
    this.justIntaceate = false
    this.count = 0
    this.pastTime = 0
    this.timeToCreateEnemy = 3
    this.distanceToIntanceate = 150

  }

  initializeGameVariables(){
    this.enemiesDied = 0
    this.playerscore = 0
    this.myscore = 0
    this.scoreboard = []
  }

  whenInstanceateEnemy(){
    return this.person.isOnCenter && !this.gameover && !this.pause
  }

  loadScreen(){
    new LoadScreen(this)
  }

  #initialServerRequests(){

    getMyScore().then( score => {
      this.myscore = score.score ? score.score : 0
      
    })
  }


  instanteateCloud(){
    (this.randomCloudIndex()).x = this.width*0.6
    this.intervalcloud = setInterval(() => {
      const cloud = this.randomCloudIndex()
      cloud.speed = (Math.random())
      this.listElements?.push(cloud)
    }, 5000)
    
  }

  randomCloudIndex(){
   const index = parseInt(Math.random()*3)
   switch(index){
    case 1:
      return new Cloud1(this)
    case 2:
      return new Cloud2(this)
    default:
      return new Cloud5(this)
   }
  }




  
}



const game = new Game()
export default game

