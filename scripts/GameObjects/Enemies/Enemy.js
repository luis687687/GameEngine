import { GameObjectOrientation } from "../../../CoralGameEngine/_utils/constants.js";
import { GameObjectWithPlayerReferece } from "../GameObjectWithPlayerReference.js";
import AnimationStateAtack from "../Player/AnimationStateAtack.js";
import Player from "../Player/Player.js";


export default class Enemy extends GameObjectWithPlayerReferece {
  constructor(game, w=120,h=120 ,x,y){
    super(game, w, h)
    this.live = 10
    this.candestroy = true
    if(x !== undefined)
      this.x = x
    if(y !== undefined)
      this.y = y
    this.distanceToAtack = 40
    
    this.#setTarget()
   
  }


  safeUpdate(){ //so por segurana
    this.#setTarget()
    this.enemyUpdateWithTarget()   /**update garantidamente com o target*/
  }
  
  /**update garantidamente com o target*/
  enemyUpdateWithTarget(){}

  
  setDamage(damage){
   this.live -= damage
  }

  callOnCalision(damage){ //safe call on colision listener
    this.setDamage(damage)
  }

  die(){
    if(this.candestroy)
      if(this.live <= 0)
        this.destroy()
  }

  #setTarget(){
    this.target = this.game.getChilds(Player)
    this.target = this.target && this.target[0]
  }

  isTheTargetAtack(){
    return (this.target.actualAnimation instanceof AnimationStateAtack) 
  }
}