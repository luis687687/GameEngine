import { AnimationType } from "../../../../../CoralGameEngine/_utils/constants.js";
import AnimationState from "../../../../../CoralGameEngine/AnimationState.js";
import Animator from "../../../../../CoralGameEngine/Animator.js";
import SoundSystem from "../../../../../CoralGameEngine/Systems/SoundSystem.js";


export class Base extends Animator {

  constructor(obj, img, w, h, f){
    super(obj,img, w,h,f)
    this.beforeHeight = this.gameObject.height //salvar a primeira altura do pai object
    this.objInitSpeed = this.gameObject.speed
    this.beforeWidth = this.gameObject.width
  }
  onStart(){
    this.gameObject.height = this.beforeHeight //garantir o retorno da altura do pai
    this.gameObject.setY(0)
    this.gameObject.speed = this.objInitSpeed
    this.gameObject.width = this.beforeWidth 
  }
}


export class Idle extends Base {
  constructor(obj, frame){
    super(obj,"./sprites/gui/dragon/idle", 106, 66, 6)
    this.fps = 5
    this.frameY = -2
    this.sound = new SoundSystem("./sounds/dragon/drag.mp3", true)
    
  }

  running(){
    
    if(this.keys.includes("f"))
      this.gameObject.enterToAnimation(StopedFireAtack)
  }
}

export class Fly extends Base {
  constructor(obj){
    super(obj, "./sprites/gui/dragon/fly", 141, 114, 5)
    this.fps = 10
    this.sound = new SoundSystem("./sounds/dragon/flying.mp3", true, 1, 1.7)
  }
  onStart(){}
  onEnd(){
    this.gameObject.normalVelocityReference = false
    this.gameObject.speed = 1
  }
  running(){
    this.gameObject.speed = 10 + 1.5* this.gameObject.game.person .speed || 0
    this.gameObject.normalVelocityReference = true

    if(this.gameObject.goToPlayer)
      this.gameObject.goToPlayer()

  }
}


export class Hurt extends Base{
  constructor(obj){
    super(obj, "./sprites/gui/dragon/hurt", 111, 57, 4)
    this.fps = 5
    this.sound = new SoundSystem("./sounds/dragon/hurt.mp3")
  }
  onStart(){
    this.gameObject.height = this.beforeHeight - 10
    this.gameObject.width = this.beforeWidth - 10
    this.gameObject.setY(-2)
  }
  onEnd(){
    this.gameObject.height = this.beforeHeight
    this.gameObject.width = this.beforeWidth
    this.gameObject.enterToAnimation(Idle)
  }
}


export class Dead extends Base{
  constructor(obj){
    super(obj, "./sprites/gui/dragon/dead", 128, 53, 3)
    this.fps = 1
    
  }
  

  onEnd(){
    this.manual = true
    this.setIndex(2)
    this.loop = false
  }
}


export class StopedFireAtack extends Base{
  constructor(obj){
    super(obj, "./sprites/gui/dragon/stopedAtack1", 146, 58, 6)
    this.fps = 5
    this.justchangefire = false
    this.sound = new SoundSystem("./sounds/dragon/fire.mp3", true)
  }
  onStart(){
    this.fps = 7
    this.manual = false
  }
  running(){
    
    if(this.getIndex() >= 4 && !this.manual)
      this.manual = true
    if(this.manual){
      this.fps = 15 //aumenta ve
      this.setIndex(5) //obriga o fim
    }

  }
  onEnd(){
    this.setIndex(3)
  }
}

export class Walking extends Base {

  constructor(obj){
    super(obj,"./sprites/gui/dragon/walk", 134, 55, 6)
    this.fps = 15
    
  }
  
}


export class Up extends Base {

  constructor(obj){
    super(obj,"./sprites/gui/dragon/up", 135, 107, 5)
    this.fps = 10
    this.sound = new SoundSystem("./sounds/dragon/flying.mp3", true, 1, 1.6)
  
  }

  onStart(){
    this.gameObject.height = this.beforeHeight+100
    this.gameObject.setY(0)
    this.gameObject.speed = this.objInitSpeed
  }

  running(){
    if(!this.gameObject.isAtMaxHeight())
      for(let i =0; i < 3; i++)
        this.gameObject.moveUp()
    else{
      this.gameObject.enterToAnimation(Fly)
    }
  }
}




export class Fall extends Base {
  constructor(obj){
    super(obj,"./sprites/gui/dragon/fall", 135, 118, 3)
    this.fps = 60
    this.manual = true
    this.sound2 = new SoundSystem("./sounds/dragon/colision.mp3")
    
  }
  onStart(){
    this.initialyDistance = this.yDistance()
    this.setIndex(0)
    this.gameObject.speed = 3
  }
  

  running(){
    if(this.yDistance() <= this.initialyDistance/3 ){
      this.setIndex(2)
      //console.log("Dois ", this.yDistance(), this.initialyDistance/3)
    }else
      if(this.yDistance() <= this.initialyDistance/2){
        this.setIndex(1)
        //console.log("1 ", this.yDistance(), this.initialyDistance/2)
      }else{
        this.setIndex(0)
        //console.log("zero ", this.yDistance(), this.initialyDistance)
      }
    if(!this.gameObject.onground())
      this.gameObject.moveBottom()
    else{
      this.gameObject.enterToAnimation(Idle)
    }
  }
  onEnd(){
    this.soundColision()
    setTimeout(() => {
      this.gameObject.enterToAnimation(Idle) //um efeitozinho
    }, 500)
  }

  soundColision(){
    this.sound2.playOnAnimation()
  }
  yDistance(){
    return this.gameObject.game.height - this.gameObject.y - this.gameObject.height
  }

}