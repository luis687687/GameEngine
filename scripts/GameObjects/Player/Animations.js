import AnimationState from "../../core/AnimationState.js";
import GameObject from "../../core/GameObject.js";


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
    this.frameY = -25
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0

    
  }
  onInput(){
    if(this.gameObject instanceof GameObject){
      const keys = this.gameObject.game.keys.actives
      
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
    }
  }
  
 
}

export class JumAtack extends AnimationState {
  constructor(gameObject, image){
    super(gameObject, image)
    this.width = 175
    this.height = 109
    this.frameBottomPadding = 0
    this.frameHorizontalSpace = 85
    this.firstXSpace = 62
    this.height -= this.frameBottomPadding
    this.frameX = this.firstXSpace + 0 * (this.width + this.frameHorizontalSpace)
    this.frameY = 3
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
  }

  animationEnd(){
    this.gameObject.enterToAnimation(Idle)
    this.gameObject.setX(this.gameObject.x + this.gameObject.width/2 +14)
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

  }

  onInput(){
    if(this.gameObject instanceof GameObject){
      const keys = this.gameObject.game.keys.actives
      if(!keys.includes("ArrowRight") && !keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Idle)
      }
      if(keys.includes("Control")){
        this.gameObject.enterToAnimation(JumAtack)
      }
      if(keys.includes("ArrowUp") && !keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Jump)
      }
      if(keys.includes("ArrowDown")){
        this.gameObject.enterToAnimation(SpeenAtack)
      }
    }
  }
}


export class Atack1 extends AnimationState {
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
  }

  animationEnd(){
    this.gameObject.enterToAnimation(Idle)
  }
  onInput(){
    if(this.gameObject instanceof GameObject){
      const keys = this.gameObject.game.keys.actives
      if(keys.includes("ArrowDown")){
        this.gameObject.enterToAnimation(SpeenAtack)
      }
      if(keys.includes("ArrowRight") || keys.includes("ArrowLeft")){
        this.gameObject.enterToAnimation(Walk)
      }
      if(keys.includes("Control")){
        this.gameObject.enterToAnimation(JumAtack)
      }
    }
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
    
    //this.frameRatio = 2.1

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
    
    //this.frameRatio = 2.1

  }

  animationEnd(){
    this.gameObject.enterToAnimation(Idle)
    this.gameObject.setX(this.gameObject.x + this.gameObject.width/2 - 16)
  }
}


export class SpeenAtack extends AnimationState {
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
    this.rightLimit -= this.width/3.5
    this.fps = 60    
    //this.frameRatio = 2.1

  }
  animationEnd(){
    if(this.gameObject instanceof GameObject){
      this.gameObject.enterToAnimation(Idle)
      this.gameObject.setX(this.gameObject.x+this.gameObject.width/2 - 40)
    }
   
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
    //this.frameRatio = 2.1

  }
}