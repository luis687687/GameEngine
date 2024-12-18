import AnimationState from "../../../../CoralGameEngine/AnimationState.js";
 


class MashroomAnimation extends AnimationState{
  constructor(gameObject, image, width, height){
    super(gameObject, image, width, height)
    this.firstXSpace = 58
    this.width = 150
    this.height = 150
    this.frameY = -47
    this.frameRatio = 3
    this.fps = 10
  }
}

export class Idle extends MashroomAnimation{
  constructor(gameObject, image, width, height){
    super(gameObject, image, width, height)
  }
}


export class Hart extends MashroomAnimation{
  constructor(gameObject, image, width, height){
    super(gameObject, image, width, height)
    this.frameRatio = 1 //para piscar
  }
  animationEnd(){
    this.gameObject.enterToAnimation(Idle)
  }
}

export class Atack extends MashroomAnimation{
  constructor(gameObject, image, width, height){
    super(gameObject, image, width, height)
    this.firstXSpace = this.firstXSpace + 15
  }
  animationEnd(){ //quando essa animação terminar
    this.gameObject.enterToAnimation(Idle)
  }
}