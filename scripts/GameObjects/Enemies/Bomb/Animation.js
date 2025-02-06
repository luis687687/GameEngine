import AnimationState from "../../../../CoralGameEngine/AnimationState.js";
import Animator from "../../../../CoralGameEngine/Animator.js";
import SoundSystem from "../../../../CoralGameEngine/Systems/SoundSystem.js";

export class Bomb1 extends Animator {
  constructor(gameObject){
    super(gameObject, "./sprites/bomb", 956, 915, 2)
    this.fps = 10
  }
  onStart(){
    this.gameObject.width = 30
    this.gameObject.height = 30
  }
}

export class BombExplode extends Animator {
  constructor(gameObject){
    super(gameObject, "./sprites/bomb", 1196, 1140, 5, 1)
    this.fps = 10
    this.gameObject.speed = 2.5
    this.sound = new SoundSystem("./sounds/dragon/colision.mp3")
    
  }
  onStart(){
    this.gameObject.width = 35
    this.gameObject.height = 35
  }
  running(){
    if(this.getIndex() == 1){
      this.width = 1361
      this.height = 1215
      this.gameObject.width = 40
      this.gameObject.height = 40
    }
    if(this.getIndex() == 2){
      this.width = 953
      this.height = 1221
      this.gameObject.width = 70
      this.gameObject.height = 55
      this.gameObject.y -= 10
    }

    if(this.getIndex() == 3){
      this.width = 1577
      this.height = 1193
      this.gameObject.width = 70
      this.gameObject.height = 70
      this.gameObject.y -= 15
    }

    if(this.getIndex() > 3){
      this.width = 1886
      this.height = 1369
      this.gameObject.width = 100
      this.gameObject.height = 100
      this.gameObject.y -= 30
    }
  }
  onEnd(){
    
  }
}