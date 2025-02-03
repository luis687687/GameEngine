import GameImage from "../../../../CoralGameEngine/GameImage.js";

export default class Avatar extends GameImage {
  constructor(game){
    super(game,  "./sprites/player/capa.png", 500, 500, 110, 110, 5, 5)
    this.setY(game.height-20)
  }
  runnBeforeDraw(){
    //this.game.context.scale(0.16, 0.15)
  }
}