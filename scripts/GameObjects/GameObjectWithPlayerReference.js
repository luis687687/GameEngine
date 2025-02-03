import TrackerGameObject from "../../CoralGameEngine/TrackerGameObject.js";
import { objectYPosition } from "./_constants.js";
import Player from "./Player/Player.js";

export class GameObjectWithPlayerReferece extends TrackerGameObject {
  constructor(game, width, height){
    super(game)
    this.width = width !== undefined ? width: this.width
    this.height = height !== undefined ? height : this.height
    //this.setOnGround()
    this.dontMoveAsReference = false
  }
  /**Subscreve */
  referenceFrame(reference){ //Controlar quando mover o background
    if(this.game.person instanceof Player)  
     this.setObjectReference(this.game.person)
    else
      console.log("Nao tem person.... ")
    if(this.keys.includes("ArrowRight")){
      if(this.reference instanceof Player){
        if(this.reference.move && this.reference.isOnCenter){
          if(this.dontMoveAsReference) return
            this.moveLeft()
        }
      }
    }
  }

  // //coloca o objecto no chao
  // setOnGround(){
  //   this.y = this.game.height - this.height + objectYPosition
  // }
}