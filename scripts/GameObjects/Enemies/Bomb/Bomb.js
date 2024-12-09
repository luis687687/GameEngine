import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import GameObjectColider from "../../../../CoralGameEngine/GameObjectColider.js";
import Player from "../../Player/Player.js";
import Enemy from "../Enemy.js";
import { Rolling } from "./Animation.js";

export class Bomb extends Enemy {
  constructor(game, w, h, x, y, orientation){
    super(game, w, h, x,y)
    this.speed = 2.5
    this.x = x
    this.y = y
    if(orientation != GameObjectOrientation.right)
      this.setOrientation(orientation)
    this.coliderInitializer(0,0, w, h)
    this.dontMoveAsReference = true
    
  }
  enemyUpdateWithTarget(){
   this.autoDestroy()
   this.moveRight()
  }

  atackPlayer(){

  }
  explode(){
    this.destroy()
  }

  autoDestroy(){
    setTimeout( () => {
      this.explode()
    }, 1000)
  }

  onColision(obj){
    if(obj instanceof Player){
      this.destroy()
      console.log("Player")
    }
  }

}