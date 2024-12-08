import BackgroundObject from "../../../CoralGameEngine/BackgroundObject.js"
import Player from "../Player/Player.js"



export default class BackgroundPlayerReference extends BackgroundObject {
  constructor(game, height, top){
    super(game)
    this.top = top
    this.height = height
    this.width = this.game.width
    this.y = this.game.height - this.top * height
    
  }

  /**Subscreve */
  referenceFrame(reference){ //Controlar quando mover o background
    if(this.game.person instanceof Player)
      this.setObjectReference(this.game.person)
    
    if(this.keys.includes("ArrowRight")){
      if(this.reference instanceof Player){
        if(this.reference.move){
          if(this.reference.isOnCenter)
            this.moveLeft()
          // else{
          //   if(!this.reference.isInitialOrientation()){
              
          //   }
          // }
        }
      }
    }
  }
}