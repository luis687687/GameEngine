import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import { GameObjectWithPlayerReferece } from "../../GameObjectWithPlayerReference.js";
import Enemy from "../Enemy.js";
import { Idle } from "./Animations.js";

export class Mashroom extends Enemy {
  constructor(game){
    super(game, 120, 120)
    this.animations = [ 
      new Idle(this, "../../../../sprites/enemies/Mushroom/Attack3.png")
    ]
    this.enterToAnimation(Idle)
    //this.debug = true
    this.x = this.game.width/2 - this.width/2
    console.log(this.x, "Marsh")
    //Rotacionar em y kkkkkkk, isso é tão bom! kkkkkkkkkk
    this.orientation = GameObjectOrientation.left
    this.coliderInitializer(30,this.height - 50 , 20, 50)
    this.debug = true
    this.debugColor = "yellow"
  }

  safeUpdate(){
   //console.log( this.getColider().getRealCenterX(),  this.getColider().x, " Mash ", this.getColider().width)
    
  }


}