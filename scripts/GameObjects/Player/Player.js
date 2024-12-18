import { GameObjectOrientation } from "../../../CoralGameEngine/_utils/constants.js";
import GameObject from "../../../CoralGameEngine/GameObject.js";
import { objectYPosition } from "../_constants.js";
import { Atack1, Dash, Dead, Idle, JumAtack, Jump, SpeenAtack, Walk, Warrior } from "./Animations.js";
import Enemy from "../Enemies/Enemy.js";
import { Life1, Life2, Life3, Life4, Life5 } from "../HUD/HP/Animations.js";

export default class Player extends GameObject {
  constructor(game){
    super(game, 170, 126, 0, game.height - 126 + objectYPosition)
    this.limitedHorizontal = true
    this.limitedVertical = true
    this.setAnimations()
    this.enterToAnimation(Walk)
    this.coliderInitializer(30,this.height - 50 , 30, 50)
    this.isOnCenter = false
    this.runned = false
    this.life = 5
  }

  update(){
    this.runned = true
    this.moveHorizontal()
    this.#updateHud()
    
  }



  moveHorizontal(){
    if(this.game.keys.actives.includes("ArrowRight")){
      if(this.orientation == GameObjectOrientation.left)
        this.setOrientation(GameObjectOrientation.right)
      if(!this.isOnCenter)
      this.moveRight()
      this.stopOnCenter()
    }

    if(this.game.keys.actives.includes("ArrowLeft")){
      if(this.orientation == GameObjectOrientation.right)
        this.setOrientation(GameObjectOrientation.left) //garante a rotação do elemento e o posicionamento correcto
        this.moveLeft()
      this.isOnCenter = false
    }
  }

  moveVertical(){
    if(this.game.keys.actives.includes("ArrowUp")){
      this.moveUp()
    }
    if(this.game.keys.actives.includes("ArrowDown")){
      this.moveBottom()
    }
  }

  stopOnCenter(){
    const ratio = 1.3
    const pointToStop = this.game.width/ratio
    if(this.x + this.width >= pointToStop)
    {
      this.setX(this.x)
      this.isOnCenter = true
    }
  }

onColision(obj){
  if(this.actualAnimation instanceof Atack1 || this.actualAnimation instanceof JumAtack || this.actualAnimation instanceof SpeenAtack){
    if(obj instanceof Enemy){
      console.log("E")
      obj.colidedEvent(this.actualAnimation.damage)
    }
  }

}

setAnimations(){
  this.path = "./sprites/player/"
  this.animations = [
    new Idle(this, this.path+"spr_Idle_strip.png"),
    new JumAtack(this, this.path+"spr_Leap_strip.png"),
    new Walk(this, this.path+"spr_Walk_strip.png"),
    new Atack1(this, this.path+"spr_Attack_strip.png"),
    new Dash(this, `./sprites/player/spr_Dash_strip.png`),
    new Dead(this, `./sprites/player/spr_Death_strip.png`),
    new Jump(this, `./sprites/player/spr_Jump_strip.png`),
    new SpeenAtack(this, `./sprites/player/spr_SpinAttack_strip.png`),
    new Warrior(this, `./sprites/Player/spr_Taunt_strip.png`),
  ] 
}

tackHit(hit){
  if(this.whenCantTakeHit()) return
  this.life -= hit
  if(this.life < 1){
    this.game.gameOver()
    this.game.hud.getHP().visible = false
    this.enterToAnimation(Warrior)
    return
  }
}

whenCantTakeHit(){
  return this.actualAnimation instanceof JumAtack || this.actualAnimation instanceof Jump || this.actualAnimation instanceof SpeenAtack
}

#updateHud(){
  if(this.life == 5) this.game.hud.getHP().enterToAnimation(Life1)
  if(this.life == 4) this.game.hud.getHP().enterToAnimation(Life2)
  if(this.life == 3) this.game.hud.getHP().enterToAnimation(Life3)
  if(this.life == 2) this.game.hud.getHP().enterToAnimation(Life4)
  if(this.life == 1) this.game.hud.getHP().enterToAnimation(Life5)

}

callOnCalision(hit){
  this.tackHit(hit)
}




  
}