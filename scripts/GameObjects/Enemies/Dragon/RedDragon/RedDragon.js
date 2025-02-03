import Enemy from "../../Enemy.js";
import {  Idle, Up, Walking } from "./RedDragonAnimations.js";


export default class RedDragon extends Enemy {

  constructor(game){
    super(game, 200*1.15, 90*1.15, 0, 0)
    this.setYWithVerticalLimit(0)
    this.debug = true
    this.coliderInitializer(0,0 , this.width, this.height, true)
    this.setMaxHeight(this.game.height*0.7)
    
    
    this.animations = [
      new Idle(this),
      new Walking(this),
      new Up(this)
    ]

    this.enterToAnimation(Idle)
    this.beforeHeight = this.height
    this.click = false
    
  }

  enemyUpdateWithTarget(){
    console.log(this)
    if(this.actualAnimation instanceof Up){
      this.height = this.beforeHeight+100
      if(!this.speed)
        this.setY(0)
      this.speed = 1
      this.moveUp()
   

    }else{
      this.height = this.beforeHeight
      this.setY(0)
      this.speed = 0
    }

    
  }
  
  onClick(){
    this.click = !this.click
    if(this.click)
      this.enterToAnimation(Idle)
    else
      this.enterToAnimation(Up)
    
  }

  atackPlayer(){

  }
}