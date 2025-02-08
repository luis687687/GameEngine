import { GameObjectOrientation } from "../../../../CoralGameEngine/_utils/constants.js";
import { GameObjectWithPlayerReferece } from "../../GameObjectWithPlayerReference.js";
import Player from "../../Player/Player.js";
import Enemy from "../Enemy.js";
import { Atack, Hart, Idle } from "./Animations.js";
import { Bomb } from "../Bomb/Bomb.js";
import AreaGameOver from "../../GUI/AreaGameOver/AreaGameOver.js";
import AtackerEnemy from "../AtackerEnemy.js";
import LifeIndicator from "../LifeIndicator/LifeIndicator.js";

export class Mashroom extends AtackerEnemy {
  constructor(game, x = 0, y = 0){
    super(game, 120, 120)
    this.setAnimations()
    this.enterToAnimation(Idle)
    this.x = x
    this.coliderInitializer(25,this.width - 50 , 50, 50)
    this.debugColor = "yellow"
    this.totalBombs = 1
    this.debug = true
    
    this.setYWithVerticalLimit(y)
    this.clicked = false
    this.animationAtackType = Atack
    this.value = 1

    
  }

 

  onColision(obj){
    this.canToLook = false
    if(obj == this.target && this.isTheTargetAtack()){
      if(this.actualAnimation instanceof Hart) return
      this.enterToAnimation(Hart)
    }
  }

  onClick(){
    this.destroy()
    console.log("Clicado!")
  }
  
  enemyUpdateWithTarget(){
    if(this.getColider())
    if(this.getColider().getRealCenterX() < -10 && this.isInitialOrientation())  //quando auto destroy? se desaparecer da tela !
      return this.destroy() //destroa o elemento passado 
    this.updateLifeIndicator()
  }

  isThePlayerRightSide(){
    if(!this.game.person) return
    return (this.game.person.getColider().getRealCenterX() > this.getColider().getRealCenterX())
  }

  runWhenDie(){
    this.game.totalMashDeads ++
    this.game.actualscore += this.value
    this.destroy()
  }

 



  setAnimations(){
    this.animations = [ 
      new Idle(this, "./sprites/enemies/Mushroom/idle1.png"),
      new Hart(this,  "./sprites/enemies/Mushroom/hart.png"),
      new Atack(this, "./sprites/enemies/Mushroom/atack.png"),
    ]
  }

  
  
  getAtackType(){
    const bomb = new Bomb(this.game, 20, 20, this.getColider().getRealCenterX(), this.getColider().y)
    return bomb
  }



  
  



}