import AnimationStateAtack from "../../../Player/AnimationStateAtack.js";
import Player from "../../../Player/Player.js";
import AtackerEnemy from "../../AtackerEnemy.js";
import {  Dead, Fall, Fly, Hurt, Idle, StopedFireAtack, Up, Walking } from "./RedDragonAnimations.js";


export default class RedDragon extends AtackerEnemy {

constructor(game, x = 0, y = 0){
    super(game, 200*1.2, 90*1.2, x, y)
    this.setYWithVerticalLimit(0)
    this.debug = true
    this.setLive(1200)
    this.coliderInitializer(0,0 , this.width, this.height, true)
    this.setMaxHeight(this.game.height*0.5)
    this.distanceToDontLoock = 100
    this.speed = 1
    this.distanceToAtack = 180
    this.timeToWaitAtack = 4
    this.atackDuration = 10
    this.canAtack = true
    this.x = x
    this.setY(y)
    
    this.damageAtack = 0.01    
    this.value = 2
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
    this.dead = false
    
  }


  onColision(obj){
    if(!(obj instanceof Player)) return
    if((this.actualAnimation instanceof StopedFireAtack || (this.actualAnimation instanceof Fall))) {
      if(this.isThePlayerOnFront(obj))
        obj.tackHit(this.damageAtack)
      return 
    }
    if((obj.actualAnimation instanceof AnimationStateAtack)){
      this.callAnimationTakeHit()
    }
    

  }

  isThePlayerOnFront(obj){
    const cabeca = 40 //distancia centro cabeca, do drag
    if(!obj) return
    if(!obj.getColider()) return
    if(!this.isInitialOrientation()){
      return (this.getRealCenterX() - cabeca > obj.getColider().getRealCenterX())
    }
    return (this.getRealCenterX() + cabeca < obj.getColider().getRealCenterX())
      
  }

  callAnimationTakeHit(){
    if(this.cantTakeHit()) return
    if(!(this.actualAnimation instanceof Idle)) return
    if(this.actualAnimation instanceof Hurt) return
    if(this.live <= 0)
      return
      this.enterToAnimation(Hurt)
  }

  
  runWhenDie(){
    if(this.actualAnimation instanceof Dead) return
    this.enterToAnimation(Dead)
    this.dead = true
    this.stopLoock = true
    this.game.totalDragonsDeads++
    this.game.actualscore += this.value
    setTimeout(() => {
      //this.destroy()
    }, 2000)
  }

  enemyUpdateWithTarget(){
    if(this.dead) return
    if(this.game.pause){
      this.move = false
      return 
    }
    this.move = true
    this.#thinkFly()
    this.#thinkFall()
    this.#updaLifeIndicatorYPose()
    this.updateLifeIndicator()
  }


  #updaLifeIndicatorYPose(){
    if(!this.lifeIndicator) return
    this.lifeIndicator.y = this.y + 25
    this.lifeIndicator.width = 180
  }

  







  goToPlayer(){ //chamado na animacao
    if(!this.target) return
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
  if(!this.target) return //se nao tiver alvo
  if(this.#whenCantThinkFly()) return
   if(this.justThinkFly) return
   this.justThinkFly = true
   //console.log("Pensando em voar")
   setTimeout( _ => {
    this.justThinkFly = false
    //console.log("Decidi voar")
      this.enterToAnimation(Up)
   }, 10000)
  }

  #whenCantThinkFly(){
    return (this.actualAnimation instanceof Fly || this.actualAnimation instanceof Up || this.actualAnimation instanceof Dead) || 
    this.getDistanceOf(this.target.getColider()) <= this.distanceToAtack 
  }

  
  #thinkFall(){
    if(!this.target) return
    if(this.#whenCantThinkFall()) return
    if((this.getDistanceOf(this.target.getColider())) <= 116){
      this.enterToAnimation(Fall)
    }
  }

  #whenCantThinkFall(){
    return this.actualAnimation instanceof Fall || 
    this.actualAnimation instanceof Idle || 
    this.actualAnimation instanceof StopedFireAtack || this.actualAnimation instanceof Hurt || this.actualAnimation instanceof Dead
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
    if(this.cantTakeHit()) return
    this.live -= damage
    //console.log("Pode afectar ", this.live)
   }

   cantTakeHit(){
    // target é o player
    return (this.actualAnimation instanceof StopedFireAtack || this.actualAnimation instanceof Up 
    || this.actualAnimation instanceof Fly || this.actualAnimation instanceof Fall || this.animationAtackType instanceof Dead) 
    || !this.isThePlayerOnFront(this.target)
   }




   
  
}