import GameImage from "../../../../CoralGameEngine/GameImage.js";



export default class Cloud5 extends GameImage {

  constructor(game){
    
    super(game, `./sprites/clouds/cloud5.png`, 203, 121, 100, 100, game.width, game.height*0.6)
    this.speed = 0.2
  }

  update(){
    this.moveLeft()
  }
}