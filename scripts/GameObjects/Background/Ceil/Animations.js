import { AnimationType } from "../../../../CoralGameEngine/_utils/constants.js";
import AnimationState from "../../../../CoralGameEngine/AnimationState.js";
import GameObject from "../../../../CoralGameEngine/GameObject.js";

export class BackgroundAnimation extends AnimationState {
  constructor(gameObject, image, player){
    super(gameObject, image, 5000, 3600)
    this.player = player
    if(this.gameObject instanceof GameObject){
      this.frameY = -2040
     
      //this.animationType = AnimationType.smooth
      this.speed = 19
    }
    this.fps = 0
  }
}