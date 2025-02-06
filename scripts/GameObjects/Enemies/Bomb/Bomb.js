import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import GameObjectColider from "../../../../CoralGameEngine/GameObjectColider.js";
import SoundSystem from "../../../../CoralGameEngine/Systems/SoundSystem.js";
import Player from "../../Player/Player.js";
import Enemy from "../Enemy.js";
import { Bomb1, BombExplode } from "./Animation.js";

export class Bomb extends Enemy {
  constructor(game, w, h, x, y, orientation){
    super(game, w, h, x,y)
    this.speed = 10
    this.x = x
    this.y = y
    this.width = 30
    this.height = 30
    this.debug = true
    console.log(this.x, " fff1 ")
    // if(orientation != GameObjectOrientation.right)
    //   this.setOrientation(orientation)
    this.coliderInitializer(0,0, w, h)
    this.setAnimations()
    this.dontMoveAsReference = true
    this.sound = new SoundSystem("./sounds/mashroom/atack.mp3", false)
    this.sound.playOnAnimation()
    this.name = "bomba"
    console.log(this.x, " fff2 ")
  }
  
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
    
    if(this.isdestroing) return
    if(obj instanceof Player){
      
       this.isdestroing = true
        
        setTimeout(() => {
          this.destroy()
        }, 500)
      this.enterToAnimation(BombExplode)
      obj.tackHit(1)
      this.speed = 0
    }
  }

  setAnimations(){
    this.animations = [
      new Bomb1(this),
      new BombExplode(this)
    ]


    this.enterToAnimation(Bomb1)
  }

}