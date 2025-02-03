import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import { GameObjectWithPlayerReferece } from "../../GameObjectWithPlayerReference.js";
import Player from "../../Player/Player.js";
import Enemy from "../Enemy.js";
import { Atack, Hart, Idle } from "./Animations.js";
import { Bomb } from "../Bomb/Bomb.js";
import AreaGameOver from "../../GUI/AreaGameOver/AreaGameOver.js";

export class Mashroom extends Enemy {
  constructor(game, x, y = 0){
    super(game, 120, 120)
    this.setAnimations()
    this.enterToAnimation(Idle)
    this.x = this.game.width/2 - this.width/2 +30
    this.coliderInitializer(25,this.width - 50 , 30, 50)
    this.debugColor = "yellow"
    this.totalBombs = 1
    this.x = x !== undefined ? x : this.x
    this.setYWithVerticalLimit(y)
    this.clicked = false
  }


  onColision(obj){
    this.canToLook = false
    if(obj == this.target && this.isTheTargetAtack()){
      this.enterToAnimation(Hart)
    }
  }
  

  atackPlayer(){
    if(!this.target) return
    const distance = (this.getDistanceOf(this.target.getColider()))
    if(distance <= this.distanceToAtack && !this.isTheTargetAtack() && this.target.life > 0){
      this.enterToAnimation(Atack)
      this.shotBomb()
    }
  }



  setAnimations(){
    this.animations = [ 
      new Idle(this, "./sprites/enemies/Mushroom/idle1.png"),
      new Hart(this,  "./sprites/enemies/Mushroom/hart.png"),
      new Atack(this, "./sprites/enemies/Mushroom/atack.png"),
    ]
  }

  

  getAtackType(){
    const bomb = new Bomb(this.game, 20, 20, this.getColider().x, this.getColider().y, this.orientation)
    return bomb
  }



  
  
  


}