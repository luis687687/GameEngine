import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import { GameObjectWithPlayerReferece } from "../../GameObjectWithPlayerReference.js";
import Player from "../../Player/Player.js";
import Enemy from "../Enemy.js";
import { Atack, Hart, Idle } from "./Animations.js";

export class Mashroom extends Enemy {
  constructor(game){
    super(game, 120, 120)
    this.setAnimations()
    this.enterToAnimation(Idle)
    this.x = this.game.width/2 - this.width/2 +30
    this.coliderInitializer(25,this.height - 50 , 30, 50)
    this.debug = true
    this.debugColor = "yellow"
    /**enquanto colidem, ele nao muda a orientação */
    this.canToLook = true //no caso de eles estarem muito perto, fixa a direcção da orientatio
  }

  safeUpdate(){ //poderia ter usado o enemyUpdateWithTarget, mas seguro
    this.lookToplayer()
    this.die()
    this.canAtackPlayer()
  }

  onColision(obj){
    this.canToLook = false
    if(obj == this.target && this.isTheTargetAtack()){
      this.enterToAnimation(Hart)
    }
  }

  canAtackPlayer(){
    if(!this.target) return
    const distance = (this.getDistanceOf(this.target.getColider()))
    if(distance <= this.distanceToAtack && !this.isTheTargetAtack())
      this.enterToAnimation(Atack)
  }

  lookToplayer(){ //olhar para o centro do colider player
    const distance = (this.getDistanceOf(this.target.getColider()))
    if(distance >=  this.distanceToAtack)
      this.canToLook = true
    if(!this.canToLook) return
    this.loockController()
  }

  loockController(){
    if(this.target.getColider().getRealCenterX() >= this.getColider().getRealCenterX()){
      if(this.orientation == GameObjectOrientation.left)
        this.setOrientation(GameObjectOrientation.right)
    }
    else{
      if(this.orientation == GameObjectOrientation.right)
        this.setOrientation(GameObjectOrientation.left)
    }
  }

  setAnimations(){
    this.animations = [ 
      new Idle(this, "../../../../sprites/enemies/Mushroom/idle1.png"),
      new Hart(this,  "../../../../sprites/enemies/Mushroom/hart.png"),
      new Atack(this, "../../../../sprites/enemies/Mushroom/atack.png"),
    ]
  }
  
  
  


}