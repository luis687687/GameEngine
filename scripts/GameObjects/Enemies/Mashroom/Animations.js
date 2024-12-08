import AnimationState from "../../../../CoralGameEngine/AnimationState.js";

export class Idle extends AnimationState{
  constructor(gameObject, image, width, height){
    super(gameObject, image, width, height)
    this.firstXSpace = 60
    this.width = 150
    this.height = 150
    this.frameY = -47
    
  }
}