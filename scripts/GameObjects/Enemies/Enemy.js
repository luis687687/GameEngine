import { GameObjectOrientation } from "../../../CoralGameEngine/_utils/constants.js";
import { GameObjectWithPlayerReferece } from "../GameObjectWithPlayerReference.js";


export default class Enemy extends GameObjectWithPlayerReferece {
  constructor(game){
    super(game, 120, 120)
    this.live = 10
  }

  safeUpdate(){
    console.log(this.live)
    this.die()
  }

  /**melhorar a chamada de code em onColision */
  
  setDamage(damage){
    
   this.live -= damage
  }

  callOnCalision(damage){
    
    this.setDamage(damage)
  }

  die(){
    if(this.live <= 0)
      this.destroy()
  }
}