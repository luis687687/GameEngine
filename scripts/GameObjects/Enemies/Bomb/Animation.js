import AnimationState from "../../../../CoralGameEngine/AnimationState.js";

export class Rolling extends AnimationState {
  constructor(gameObject){
    super(gameObject, "./sprites/enemies/Mushroom/rolling.png", 69, 50)
    this.firstXSpace = 7
    this.frameRatio = 4
    
  }
}