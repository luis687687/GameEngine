import { GameObjectOrientation } from "../../../CoralGameEngine/_utils/constants.js";
import GameBuilder from "../../../CoralGameEngine/GameBuilder.js";
import {createScore} from "../../gameToServer.js";
import { GameObjectWithPlayerReferece } from "../GameObjectWithPlayerReference.js";
import AnimationStateAtack from "../Player/AnimationStateAtack.js";
import Player from "../Player/Player.js";


export default class Enemy extends GameObjectWithPlayerReferece {
  #timerCount = 0 //***quando o enemy ataca ? */
  constructor(game, w=120,h=120 ,x,y){
    super(game, w, h)
    this.live = 10
    this.candestroy = true
    if(x !== undefined)
      this.x = x
    if(y !== undefined)
      this.y = y
    this.distanceToAtack = 100
    this.maxBombs = 1
    this.bombs = []
    this.intervalToAtack = 2
    this.actualTimer = 0
    this.value = 1
    this.pauseShot = false

    /**enquanto colidem, ele nao muda a orientação */
    this.canToLook = true //no caso de eles estarem muito perto, fixa a direcção da orientatio


    this.x = this.game.width/2 - this.width/2 +30
    this.coliderInitializer(25,this.width - 50 , 30, 50)
  }


  safeUpdate(){ //so por segurana, nao subscrever
    this.#setTarget()
    this.lookToplayer()
    this.die()
    if(!this.game.pause) 
      this.atackPlayer()
    this.enemyUpdateWithTarget()   /**update garantidamente com o target*/
  }
  
  /**update garantidamente com o target*/
  enemyUpdateWithTarget(){}

  
  setDamage(damage){
   this.live -= damage
  }

  callOnCalision(damage){ //safe call on colision listener
    this.setDamage(damage)
  }

  die(){
    if(this.candestroy)
      if(this.live <= 0){
        this.game.enemiesDied++
        this.game.playerscore+=this.value
        createScore(this.game.playerscore, this.game.leavel)
        this.destroy()
      }
  }

  #setTarget(){
    this.target = this.game.getChilds(Player)
    this.target = this.target && this.target[0]
    
  }

  isTheTargetAtack(){
    return (this.target.actualAnimation instanceof AnimationStateAtack) 
  }

  shotBomb(){
    const time = this.isTheTimeToAtack()
    if(time) {
      if(this.pauseShot) return
      this.bombs.push(this.getAtackType())
      this.pauseShot = true
    }
    else{
      this.pauseShot = false
    }
  }
  
  /**para subscrever nos enemies */
  getAtackType(){}

  #timerController(){
    if(this.game.timer - this.actualTimer >= 1000){
      this.actualTimer = this.game.timer
      this.#timerCount++
    }
  }

  isTheTimeToAtack(){
    this.#timerController()
    if(!this.#timerCount) return
    return this.#timerCount % this.intervalToAtack == 0
  }



  lookToplayer(){ //olhar para o centro do colider player
    const targetColider = this.target?.getColider()
    if( !targetColider ) return
    const distance = (this.getDistanceOf(targetColider))
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



}