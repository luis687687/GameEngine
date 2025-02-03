import { AnimationType } from "../../../../../CoralGameEngine/_utils/constants.js";
import AnimationState from "../../../../../CoralGameEngine/AnimationState.js";
import Animator from "../../../../../CoralGameEngine/Animator.js";


export class Base extends Animator {

  constructor(obj){
    super(obj, "./sprites/gui/dragon1.png", 101, 64)
    this.frameY = 53
    this.fps = 10
    this.animationType = AnimationType.normal
    this.firstXSpace = 0
    this.frameHorizontalSpace = 45
    this.frameX = 31
    this.firstXSpace = 34
    this.frameRatio = 5
  }
}


export class Idle extends Animator {
  constructor(obj, frame){
    super(obj,"./sprites/gui/dragon/idle", 106, 66, 6)
    this.fps = 7
    this.frameY = -2
    

  }
}



export class Walking extends Animator {

  constructor(obj){
    super(obj,"./sprites/gui/dragon/walk", 134, 55, 6)
    this.fps = 10
    
  }
}


export class Up extends Animator {

  constructor(obj){
    super(obj,"./sprites/gui/dragon/up", 135, 107, 5)
    this.fps = 10
    this.beforeHeight = obj.height
    obj.setY(0)
   
  }
}