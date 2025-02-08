import AnimationState from "../../../CoralGameEngine/AnimationState.js";
import GameColider from "../../../CoralGameEngine/GameObjectColider.js";
import GameObject from "../../../CoralGameEngine/GameObject.js";
import AnimationStateAtack from "./AnimationStateAtack.js";
import SoundSystem from "../../../CoralGameEngine/Systems/SoundSystem.js";


/**
 * Obs a soma entre o this.width e frameHorizontalSpace deve ser de 175
 * height e frameBottomPadding 115
 */

export class Idle extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image, 170, 109)
    this.frameBottomPadding = 6
    this.frameHorizontalSpace = 0
    this.firstXSpace = 62
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -26
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    // this.sound = new SoundSystem("./sounds/player/bre.mp3", true, 0.2, 1)
    this.unremovesound = true
    this.pauseSensivity = false
  }
 
  onInput(keys){
    if(this.gameObject instanceof GameObject){
      if(keys.includes("ArrowRight") || keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Walk)
      }
      if(keys.includes("ArrowDown")){
        if(this.gameObject.onground()) //so  executa speen no chao
          this.gameObject.enterToAnimation(SpeenAtack)
      }

      if(keys.includes("Enter")){
        this.gameObject.enterToAnimation(Atack1)
      }
      if(keys.includes("Control")){
        this.gameObject.enterToAnimation(JumAtack)
      }
      if(keys.includes("ArrowUp")){
        this.gameObject.enterToAnimation(Jump)
      }
      if(keys.includes("ArrowDown")){
        this.gameObject.enterToAnimation(SpeenAtack)
      }
    }
  }
  
 
}

export class JumAtack extends AnimationStateAtack {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 175
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 85
    this.firstXSpace = 73
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = 0
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.frameRatio = 3 //define ate que percentagem do tempo a animação vai ser cortada, normal 1.8 é o ratio
    this.endX = this.gameObject.getRealCenterX()+14
    this.damage = 10
    this.sound = new SoundSystem("./sounds/player/voohammer.mp3", false, 0.9)
    this.sound2 = new SoundSystem("./sounds/player/manup.mp3")
   
  }

  
  onEnd(){
    this.gameObject.enterToAnimation(Idle)
    this.gameObject.setX(this.endX)
    this.gameObject.move = true
    this.gameObject.coliderTrackerX = true
  }

  manUpSound(){
    this.sound2.playOnAnimation()
  }

  running(){ //running controller
    this.gameObject.coliderTrackerX = false

   if(this.xFrameIteration > 20){
      this.gameObject.move = false
      this.soundToLaunchHammerStop()
      if(this.gameObject.getColider()){
        this.gameObject.getColider().setX(this.endX + this.gameObject.coliderOffX)
      }
      return
   }
   if(this.xFrameIteration > 7) //para pausar o movimento
    this.gameObject.move = true
  if(this.xFrameIteration > 13) //para chamar outro som
    this.soundToLaunchHammer()
  }
  
  onStart(){
    this.manUpSound()
    this.justLaunch = false
    this.justFall = false
    this.setedNewPosition = false
    this.savedX = this.gameObject.x
    this.gameObject.move = false
    this.endX = this.gameObject.x + this.gameObject.width/2 +14
   }

   soundToLaunchHammer(){
    if(this.justLaunch) return
    this.LaunchHammer = new SoundSystem("./sounds/player/spin.mp3", false, 0.9, 1.2)
    this.LaunchHammer.playOnAnimation()
    this.justLaunch = true
   }

   soundToLaunchHammerStop(){
    this.LaunchHammer.pause()
    this.soundToEnd()
   }

   soundToEnd(){
    if(this.justFall) return
    this.soundEnd = new SoundSystem("./sounds/player/atack1.mp3", false, 0.9, 1.2)
    this.soundEnd.playOnAnimation()
    this.justFall = true
   }
  
}





export class Walk extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 170
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 64
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.fps = 15
    this.sound = new SoundSystem("./sounds/player/walking.mp3", true)

  }


  onInput(keys){
    if(this.gameObject instanceof GameObject){
      if(!keys.includes("ArrowRight") && !keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Idle)
      }
      if(keys.includes("Control")){
        this.gameObject.enterToAnimation(JumAtack)
      }
      if(keys.includes("ArrowUp")){
        this.gameObject.enterToAnimation(Jump)
        this.gameObject.actualAnimation.xFrameIteration = 5 //se estiver andando, então ao chamar o mortal, já não começa o frame do 0
      }
      if(keys.includes("ArrowDown")){
        this.gameObject.enterToAnimation(SpeenAtack)
      }
    }
  }
  
}


export class Atack1 extends AnimationStateAtack {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 170
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 56
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.frameRatio = 2.1
    this.justRunn = false
    this.moveColider = 25
    this.damage = 2
    this.sound = new SoundSystem("./sounds/player/atack1.mp3", true, 1)
  }
  onStart(){ /**Controlar o colisor no inicio dessa animação */
  
  }
  onEnd(){ /**Retornar nas configurações e ficar no idle caso essa animação termine */
    this.gameObject.enterToAnimation(Idle)
    this.gameObject.getColider().x -= this.moveColider
    this.justRunn = false
  }
  onInput(keys){
    if(this.gameObject instanceof GameObject){
      
      if(keys.includes("ArrowDown")){
        this.gameObject.enterToAnimation(SpeenAtack)
      }
      if(keys.includes("ArrowRight") || keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Walk)
      }
      if(keys.includes("Control")){
        this.gameObject.enterToAnimation(JumAtack)
      }
      if(keys.includes("ArrowUp")){
        this.gameObject.enterToAnimation(Jump)
      }
    }

    
  }

  running(){ /**Se essa animação estiver nos seus 23 frames, caso o user aperte enter, não deve esperar essa aniamação a acabar para combinar atack */
   if(this.xFrameIteration > 20){
    this.#finalSound()
    if(this.keys.includes("Enter")){
      this.xFrameIteration = 0 //reseta essa animação para lhe chmar de novo
      this.gameObject.enterToAnimation(Atack1)
    }
   }
   this.#rePoseColider()
  }

  #rePoseColider(){
    if(!this.justRunn){
      if(this.gameObject.getColider() && this.xFrameIteration > 4){ 
        this.gameObject.getColider().x+=this.moveColider
        this.justRunn = true
      }
   }
  }
  
  #finalSound(){
    //(new SoundSystem("./sounds/player/voohammer.mp3", false, 0.2, 1.1)).play()
  }
  
}


export class Dash extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 170
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 56
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    
    //this.frameRatio = 2.1

  }
}



export class Dead extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 170
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 56
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.sound = new SoundSystem("./sounds/player/screaming.mp3")
    //this.frameRatio = 2.1

  }
  onStart(){
    this.gameObject.move = false
  }
  
  running(){
    if(this.xFrameIteration >= 39)
      this.xFrameIteration = 39
  }
  
}


export class Jump extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 220
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 60
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.sound = new SoundSystem("./sounds/player/voohammer.mp3", false, 1)
    this.sound2 = new SoundSystem("./sounds/player/manup.mp3")
    this.frameRatio = 3 //define ate que percentagem do tempo a animação vai ser cortada, normal 1.8 é o ratio

  }

  onEnd(){
    this.gameObject.enterToAnimation(Idle)
    this.gameObject.setX(this.gameObject.x + this.gameObject.width/2 - 16)
    this.gameObject.move = true
    this.sound1 = new SoundSystem()
  }

  manUpSound(){
    
    this.sound2.playOnAnimation()
  }
  running(){
    if(this.xFrameIteration > 15){
      this.gameObject.move = false
      return
    }
    if(this.xFrameIteration > 5)
      this.gameObject.move = true
  }

  onStart(){
    this.manUpSound()
    if(this.keys.includes("Enter")) //se esiver a atacar
      this.xFrameIteration = 7 //ao entrar aqui, começa a animação apartir do frame 5
    this.gameObject.move = false
  }
}


export class SpeenAtack extends AnimationStateAtack {
  constructor(gameObject, image){
    
    super(gameObject, image)
    this.damage = 3
    this.width = 170
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 56
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    //this.rightLimit -= this.width/3.5
    this.fps = 60    
    this.frameRatio = 2.1
    this.sound = new SoundSystem("./sounds/player/spin.mp3", false, 0.9)
    this.sound2 = new SoundSystem("./sounds/player/manup.mp3")

  }
  onEnd(){
    if(this.gameObject instanceof GameObject){
      this.gameObject.enterToAnimation(Idle)
      this.gameObject.setX(this.gameObject.x+this.gameObject.width/2 - 40)
      this.gameObject.move = true
      if(this.gameObject.getColider()){
          this.gameObject.getColider().speed = this.gameObject.speed
          this.gameObject.getColider(this.gameObject.x)
      }
    }
  }

  manUpSound(){
   
    this.sound2.playOnAnimation()
  }

  running(){
    if(this.gameObject.getColider()){
      this.gameObject.getColider().speed = 1.5
      this.gameObject.getColider().moveRight()
    }
    if(this.xFrameIteration > 20){
      this.gameObject.move = false
      return
    }
  }

  onStart(){
    this.manUpSound()
  }
}

export class Warrior extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 170
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 0
    this.firstXSpace = 56
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = -32
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.frameRatio = 2.2
    this.sound = new SoundSystem("./sounds/player/hurt.mp3")
  }

  running(){
    if(this.xFrameIteration > 5){
      this.xFrameIteration = 0
      this.gameObject.enterToAnimation(Idle)
    }
  }
  onInput(keys){
    if(this.gameObject instanceof GameObject){
      if(keys.includes("ArrowRight") || keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Walk)
      }
      if(keys.includes("ArrowDown")){
        if(this.gameObject.onground()) //so  executa speen no chao
          this.gameObject.enterToAnimation(SpeenAtack)
      }

      if(keys.includes("Enter")){
        this.gameObject.enterToAnimation(Atack1)
      }
      if(keys.includes("Control")){
        this.gameObject.enterToAnimation(JumAtack)
      }
      if(keys.includes("ArrowUp")){
        this.gameObject.enterToAnimation(Jump)
      }
      if(keys.includes("ArrowDown")){
        this.gameObject.enterToAnimation(SpeenAtack)
      }
    }
  }
  onEnd(){
    this.gameObject.enterToAnimation(Idle)
  }
}