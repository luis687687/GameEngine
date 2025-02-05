import AtackerEnemy from "../../AtackerEnemy.js";
import {  Dead, Fall, Fly, Hurt, Idle, StopedFireAtack, Up, Walking } from "./RedDragonAnimations.js";


export default class RedDragon extends AtackerEnemy {

  constructor(game){
    super(game, 200*1.12, 90*1.12, 0, 0)
    this.setYWithVerticalLimit(0)
    this.debug = true
    
    this.x = this.game.width*0.5
    this.coliderInitializer(0,0 , this.width, this.height, true)
    this.setMaxHeight(this.game.height*0.5)
    this.distanceToDontLoock = 100
    this.speed = 2
    this.distanceToAtack = 180
    this.timeToWaitAtack = 4
    this.atackDuration = 10
    this.canAtack = true
    this.live = 20
    

    this.animations = [
      new Idle(this),
      new Walking(this),
      new Up(this),
      new Fly(this),
      new Fall(this),
      new Hurt(this),
      new Dead(this),
      new StopedFireAtack(this)
    ]

    this.enterToAnimation(Idle)
    this.beforeHeight = this.height
    this.click = false
    
  }

  enemyUpdateWithTarget(){
    this.#thinkFly()
    this.#thinkFall()
  }







  goToPlayer(){
    if (this.getRealCenterX() == this.target.getRealCenterX()) return
    if(this.getRealCenterX() > this.target.getRealCenterX())
      this.moveLeft()
    else
      this.moveRight()
    
  }
  
  onClick(){
    
    if(this.click)
      this.enterToAnimation(Fall)
    else
      this.enterToAnimation(Up)
      this.click = !this.click
    
  }

  atackPlayer(){
    if(!this.target) return
    if(!(this.actualAnimation instanceof Idle || this.actualAnimation instanceof StopedFireAtack)) return
    const distance = (this.getDistanceOf(this.target.getColider()))
    if(distance <= this.distanceToAtack && this.target.life > 0){
      this.atackController()
    }
    else{
      if(this.actualAnimation instanceof Idle) return
        this.enterToAnimation(Idle)
    }
  }

  justThinkFly = false
  #thinkFly(){
  if((this.actualAnimation instanceof Fly || this.actualAnimation instanceof Up) || 
    this.getDistanceOf(this.target.getColider()) <= this.distanceToAtack ) return
   if(this.justThinkFly) return
   this.justThinkFly = true
   //console.log("Pensando em voar")
   setTimeout( _ => {
    this.justThinkFly = false
    //console.log("Decidi voar")
      this.enterToAnimation(Up)
   }, 10000)
  }

  
  #thinkFall(){
    if( this.actualAnimation instanceof Fall || this.actualAnimation instanceof Idle || this.actualAnimation instanceof StopedFireAtack) return
    if((this.getDistanceOf(this.target.getColider())) <= 116){
      this.enterToAnimation(Fall)
      
    }
      
      
  }

  atackController(){ //controla o tempo de atack, e espera
    if(!this.canAtack) {
      //console.log("Minha pausa... ")
      if(this.justCallCanAtackTimeout) return
      this.justCallCanAtackTimeout = true
      setTimeout(() => {
        this.canAtack = true
        this.justCallCanAtackTimeout = false
      }, this.timeToWaitAtack * 1000)
      //enquato espera
      if(this.actualAnimation instanceof Idle) return
        this.enterToAnimation(Idle)
      return
    }
    this.#setAtackDuration()
    if(this.actualAnimation instanceof StopedFireAtack) return
    this.enterToAnimation(StopedFireAtack)
  }

  justCallAtackDurationTimeout = false
  #setAtackDuration(){
    //console.log("Atacando... ")
    if(this.justCallAtackDurationTimeout) return
    this.justCallAtackDurationTimeout = true
    //console.log("PPPPAAA ")
    setTimeout(() => {
      this.canAtack = false
      this.justCallAtackDurationTimeout = false
    }, this.atackDuration* 1000)
  }


  setDamage(damage){
    if(this.actualAnimation instanceof StopedFireAtack || this.actualAnimation instanceof Up 
      || this.actualAnimation instanceof Fly || this.actualAnimation instanceof Fall) return
    this.live -= damage
    //console.log("Pode afectar ", this.live)
   }
  
}