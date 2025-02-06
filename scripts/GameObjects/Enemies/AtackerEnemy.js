import Enemy from "./Enemy.js";


export default class AtackerEnemy extends Enemy {
  constructor(game, x, y){
    super(game, x, y)
    this.animationAtackType = null
    this.distanceToAtack = 200
  }


   atackPlayer(){
      if(!this.target) return
      const distance = (this.getDistanceOf(this.target.getColider()))
      if(distance <= this.distanceToAtack && !this.isTheTargetAtack() && this.target.life > 0){
        if(!(this.actualAnimation instanceof this.animationAtackType))
        this.enterToAnimation(this.animationAtackType)
        this.shotBomb()
      }
    }
}