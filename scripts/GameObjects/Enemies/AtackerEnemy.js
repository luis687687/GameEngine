import Enemy from "./Enemy.js";


export default class AtackerEnemy extends Enemy {
  constructor(game, x, y){
    super(game, x, y)
    this.animationAtackType = null
  }


   atackPlayer(){
      if(!this.target) return
      const distance = (this.getDistanceOf(this.target.getColider()))
      if(distance <= this.distanceToAtack && !this.isTheTargetAtack() && this.target.life > 0){
        this.enterToAnimation(this.animationAtackType)
        this.shotBomb()
      }
    }
}