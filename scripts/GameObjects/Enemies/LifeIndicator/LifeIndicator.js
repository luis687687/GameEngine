import GameObject from "../../../../CoralGameEngine/GameObject.js";
import { Life1, Life2, Life3, Life4, Life5 } from "./LifeIndicatorAnimations.js";


export default class LifeIndicator extends GameObject {
  constructor(game){
    super(game, 100, 10, 90, -35)
    this.instanteateAnimations()
    
    
  }



  instanteateAnimations(){
    this.animations = [
      new Life1(this),
      new Life2(this),
      new Life3(this),
      new Life4(this),
      new Life5(this)
    ]
    this.setLife1()
  }

  setLife1(){this.enterToAnimation(Life1)}
  setLife2(){this.enterToAnimation(Life2)}
  setLife3(){this.enterToAnimation(Life3)}
  setLife4(){this.enterToAnimation(Life4)}
  setLife5(){this.enterToAnimation(Life5)}
}