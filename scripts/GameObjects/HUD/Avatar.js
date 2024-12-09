import GameImage from "../../../CoralGameEngine/GameImage.js";

export default class Avatar extends GameImage {
  constructor(game){
    super(game,  "../../../sprites/player/capa.png", 500, 500, 500, 500, 50, 55)
  }
  runnBeforeDraw(){
    this.game.context.scale(0.14, 0.14)
  }
}