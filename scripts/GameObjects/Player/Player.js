import GameObject from "../../core/GameObject.js";
import { Atack1, Dash, Dead, Idle, JumAtack, Jump, SpeenAtack, Walk, Warrior } from "./Animations.js";

export default class Player extends GameObject {
  constructor(game){
    super(game)
    this.limitedHorizontal = true
    this.limitedVertical = true
    this.width = 150
    this.height = 126
    this.path = "../../../sprites/player/"
    this.animations = [
      new Idle(this, this.path+"spr_Idle_strip.png"),
      new JumAtack(this, this.path+"spr_Leap_strip.png"),
      new Walk(this, this.path+"spr_Walk_strip.png"),
      new Atack1(this, this.path+"spr_Attack_strip.png"),
      new Dash(this, `../../../sprites/player/spr_Dash_strip.png`),
      new Dead(this, `../../../sprites/player/spr_Death_strip.png`),
      new Jump(this, `../../../sprites/player/spr_Jump_strip.png`),
      new SpeenAtack(this, `../../../sprites/player/spr_SpinAttack_strip.png`),
      new Warrior(this, `../../../sprites/Player/spr_Taunt_strip.png`),

    ]
    this.animations[0].enter()
    
  }
  update(){
    this.moveHorizontal()
    //this.moveVertical()

  }


  moveHorizontal(){
    if(this.game.keys.actives.includes("ArrowRight")){
      this.moveRight()
      
    }
    if(this.game.keys.actives.includes("ArrowLeft")){
      this.moveLeft()
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

  
}