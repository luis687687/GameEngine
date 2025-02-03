import GameImage from "../../../../CoralGameEngine/GameImage.js";



export default class Cloud2 extends GameImage {

  constructor(game){
    
    super(game, `./sprites/clouds/cloud2.png`, 196, 156, 100, 100, game.width, game.height*0.6)
    this.speed = 0.2
  }

  update(){
    this.moveLeft()
  }
}