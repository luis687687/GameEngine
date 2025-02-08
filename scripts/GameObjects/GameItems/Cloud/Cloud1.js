import GameImage from "../../../../CoralGameEngine/GameImage.js";



export default class Cloud1 extends GameImage {

  constructor(game){
    
    super(game, `./sprites/clouds/cloud1.png`, 203, 121, 100, 100, game.width, game.height*0.6)
    this.speed = 0.2
  }

  update(){
    if(this.game.person){
      if(this.game.person.isOnCenter){
        this.moveLeft(this.game.person.speed/1.3 + this.speed)
        return
      }
    }
    this.moveLeft()
  }
}