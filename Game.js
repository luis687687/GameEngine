
/***
 * Uma coisa interessantemente estranha, acontece quando, chamo a função que apaga todos os game objects do jogo activo, onde os components de colider e childComponents dos mashrooms são eliminados, mas ainda assim do nada permanecem no vector de filhos do gamebuilder
 * devo reforçar o delete de coliders e de lifeindicator dos inimigos
 */
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
import LifeIndicator from "./scripts/GameObjects/Enemies/LifeIndicator/LifeIndicator.js";
import { Mashroom } from "./scripts/GameObjects/Enemies/Mashroom/Mashroom.js";
import Cloud1 from "./scripts/GameObjects/GameItems/Cloud/Cloud1.js";
import Cloud2 from "./scripts/GameObjects/GameItems/Cloud/Cloud2.js";
import Cloud5 from "./scripts/GameObjects/GameItems/Cloud/Cloud5.js";
import AreaGameOver from "./scripts/GameObjects/GUI/AreaGameOver/AreaGameOver.js";
import HUB from "./scripts/GameObjects/GUI/HUD/HUD.js";
import Player from "./scripts/GameObjects/Player/Player.js";
import StaticDragon from "./scripts/GameObjects/Statics/StaticDragon/StaticDragon.js";
import { getMyScore, getScoreBoard } from "./scripts/gameToServer.js";




class Game extends GameBuilder {
  constructor(){
    super(30)


    this.sound = new SoundSystem("./sounds/back.mp3", true, 0.6)
    this.initZombieSound()

    this.initializeFirstObjects()
    this.playingScreen()
    this.showHUB()
    //this.splashScreen()
    //this.pauseScreen()
    this.#initialServerRequests()
    
    
    //this.gameOver()
  }



  
  update(){
    this.instanceateEnemies(this)
    this.checkIfCanPlayZombieSound()


  }

  checkIfCanPlayZombieSound(){
    if(!this.getActivesMash().length) return
    if(!this.zombiesound) return
    if(this.zombiesound.isRunning()) return
    this.zombiesound.setVolume(0.1)
    console.log("Tocando....")
    this.zombiesound.playOnAnimation()
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
    this.instanteateStaticDragon()
    this.instanteateDragon()

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
    this.totalMashToInstance = 3

    //new RedDragon(this)
    this.initializeSound()
    this.instanceateTimerControlers()
    this.instanteateCloud()
    this.initializeGameVariables()
  }

  reinitiBackSoundPosition(){
    this.sound.setPosition(1000)
  }

  reinitAll(){
    this.sound.setVolume(0.3)
    this.zombiesound.pause()
    this.listElements?.forEach( e => e.destroy())
    this.removeObjectByType(Enemy)
    this.removeObjectByType(GameObjectColider)
    this.removeObjectByType(LifeIndicator)
    
    if(this.intervalcloud)
      clearInterval(this.intervalcloud)
  }





  initZombieSound(){
    this.zombiesound = new SoundSystem("./sounds/mashroom/idle.mp3", true, 0.1)
  }

  initializeSound(){
    this.reinitiBackSoundPosition()
   this.sound.play()
  }

  showHUB(){
   this.hud = new HUB(this)
  }

  justCallGameOver = false //importante
  gameOver(){
    if(this.justCallGameOver) return
    this.justCallGameOver = true
    setTimeout( () => {
      this.gameOverObject = new AreaGameOver(this)
      this.gameover = true
    }, 2000)
   
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

  justInstateMash = false
  instanceateEnemies(){
    let timer
    if(this.pause) return clearInterval(timer)
    if(this.justInstateMash) return
    //acrescer, o barramento de instancia de mashroom, caso tenha mais de um dragao
    if(this.getActivesMash().length >= this.totalMashToInstance) return this.makePauseBeforeInstanteateMashrooms()
    if(this.pausedOnInstanteateMeshrooms) return
    this.justInstateMash = true
    timer = this.#timerToInstanteateMashrooms()

  }

  #timerToInstanteateMashrooms(){
    return setTimeout( () => {
      this.justInstateMash = false
      new Mashroom(this, this.#minPlayerMashroomDistance() , 0)
    }, this.timeToCreateMashrooms*1000 )
  }



  
  instanteateDragonIntervalCalled = false
  totalDragons = 1
  instanteateDragon(){
    if(this.instanteateDragonIntervalCalled) return
    this.instanteateDragonIntervalCalled = true
    this.instanteateDragonTimer = setInterval(() => {
      if(this.getActivesDragons().length >= this.totalDragons) return //instancia um dragao por vez
      new RedDragon(this, this.width + 150)
    }, 1000)
  }
  //se já instanciou dragon pelo menos uma vez, as outras devem ser aleatórias (sempre que canRandomlyCreateDragon() = 3 )
  // 3 significa sim, num intervalo de 0 a
  canRandomlyCreateDragon(){
    return Math.max(0, parseInt(Math.random() * 6))
  }


  
  justCallStaticDragons = false
  instanteateStaticDragon(){
    if(this.justCallStaticDragons) return 
    this.justCallStaticDragons = true
    this.timerStaticDragons = setInterval(() => {
      new StaticDragon(this, -150, 0.82)
      new StaticDragon(this, -130, 0.72)
    }, 20000)
  }
  
  stopCallStaticsDragons(){
    if(!this.timerStaticDragons) return
    clearInterval(this.timerStaticDragons)
    this.justCallStaticDragons = false
  }

  #minPlayerMashroomDistance(){ //retorna a distancia para instanciar o mashrooms, e impedi que ele seja instanciado no mesmo ponto que o player
    const totalMashrooms = this.getActivesMash().length
    const xPose =  totalMashrooms ? this.getActivesMash()[totalMashrooms - 1].getRealCenterX() : this.width*0.4
    const offSetX = this.getActivesDragons().length > 0 ? 120 : 0
    return   Math.max(this.person.getRealCenterX()+200 , xPose  + (totalMashrooms >= 2 ? 290 : 170)) + offSetX
  }

  /***
   * Chamado para definir uma pausa depois de um certo numero de intanceas
   */
  pausedOnInstanteateMeshrooms
  makePauseBeforeInstanteateMashrooms(){
    if(this.pausedOnInstanteateMeshrooms) return
    this.pausedOnInstanteateMeshrooms = true
    let timer = setInterval(() => {
      if(!this.getActivesMash().length){ //remove a pausa de instancializacao se nao tiver nehum ene
        this.pausedOnInstanteateMeshrooms = false
        clearInterval(timer)
      }
      
    }, 5000)
  }


  getActivesMash(){
    return this.getAllObjects().filter( e => e instanceof Mashroom)
  }

  getActivesDragons(){
    return this.getAllObjects().filter( e => (e instanceof RedDragon) && !e.dead)
  }

  instanceateTimerControlers(){
    this.justIntaceate = false
    this.count = 0
    this.pastTime = 0
    this.timeToCreateMashrooms = 3
    this.distanceToIntanceate = 150

  }

  initializeGameVariables(){
    this.enemiesDied = 0
    this.playerscore = 0
    this.myscore = 0
    this.scoreboard = []
    this.justCallGameOver = false //importnate
    this.actualscore = 0
    this.totalDragonsDeads = 0
    this.totalMashDeads = 0
    
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

