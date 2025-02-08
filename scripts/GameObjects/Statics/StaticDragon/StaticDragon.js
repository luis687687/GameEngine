import GameObject from "../../../../CoralGameEngine/GameObject.js";
import { Fly } from "../../Enemies/Dragon/RedDragon/RedDragonAnimations.js";


export default class StaticDragon extends GameObject {

  constructor(game, x, offSetY){

    super(game, 90, 80, x, game.height * offSetY)
    this.flyAnimation = new Fly(this)
    this.flyAnimation.sound = null
    this.backgroundColor = "transparent"
    
    this.animations = [
      this.flyAnimation
    ]
    this.enterToAnimation(Fly)
  }

  update(){
    this.speed = 0.5
    this.moveRight()
    if(this.x > this.game.width)
      this.destroy()
  }
}