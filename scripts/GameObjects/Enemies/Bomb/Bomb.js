import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import GameObjectColider from "../../../../CoralGameEngine/GameObjectColider.js";
import SoundSystem from "../../../../CoralGameEngine/Systems/SoundSystem.js";
import Player from "../../Player/Player.js";
import Enemy from "../Enemy.js";
import { Bomb1, BombExplode } from "./Animation.js";

export class Bomb extends Enemy {
  constructor(game, w, h, x, y){
    super(game, w, h, x,y)
    this.speed = 10
    this.x = x
    this.y = y
    this.width = 30
    this.height = 30
    this.debug = true
    this.coliderInitializer(0,0, w, h)
    this.setAnimations()
    this.dontMoveAsReference = true
    this.sound = new SoundSystem("./sounds/mashroom/atack.mp3", false)
    this.sound.playOnAnimation()
    this.name = "bomba"
    
  }

  // enemyUpdateWithTarget(){
  //   console.log(this.waitToStartFeeling)
  // }
  
  enemyUpdateWithTarget(){
    if(this.game.pause) return
   this.autoDestroy()
   this.moveRight()
  }

  atackPlayer(){

  }
  explode(){
    this.destroy()
  }

  autodestroyeCalled = false
  autoDestroy(){
   if(this.x < -30 )
    this.destroy()
  }



  isdestroing = false
  onColision(obj){
    if(this.isdestroing) return //ajuda a nao sobrecarregar o settimout
    if(this.waitToStartFeeling) return this.doWaitToStartFeeling() //interessante, para evitar que, quando o elemento for instanciado, antes de ser setado a orientacao, ele nao se exploda
    if(obj instanceof Player){
       this.isdestroing = true
        setTimeout(() => {
          this.destroy()
        }, 1000)
      this.enterToAnimation(BombExplode)
      obj.tackHit(1)
      this.speed = 0
    }
  }


  //defini uma pausa antes de ser sencivel
  waitToStartFeeling = true
  jusCalledWaitToStartFeelingTimeout = false
  doWaitToStartFeeling(){
    if(this.jusCalledWaitToStartFeelingTimeout) return
    this.jusCalledWaitToStartFeelingTimeout = true
    setTimeout(() => {
      this.waitToStartFeeling = false
    }, 500)
  }
  setAnimations(){
    this.animations = [
      new Bomb1(this),
      new BombExplode(this)
    ]


    this.enterToAnimation(Bomb1)
  }

}