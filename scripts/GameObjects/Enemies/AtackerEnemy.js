import Enemy from "./Enemy.js";
import LifeIndicator from "./LifeIndicator/LifeIndicator.js";


export default class AtackerEnemy extends Enemy {
  constructor(game, w, h){
    super(game, w, h)
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

    async childContent(){
      this.lifeIndicator = new LifeIndicator(this.game)
      return [
        this.lifeIndicator
      ]
    }


    
    updateLifeIndicator(){
      if(!this.lifeIndicator) return
      if(this.live >= this.initLive*0.9) return this.lifeIndicator.setLife1()
      if(this.live >= this.initLive*0.7) return this.lifeIndicator.setLife2()
      if(this.live>= this.initLive*0.4) return this.lifeIndicator.setLife3()
      if(this.live>= this.initLive*0.2) return this.lifeIndicator.setLife4()
      return this.lifeIndicator.setLife5()
  }
}