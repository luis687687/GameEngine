import GameImage from "../../../CoralGameEngine/GameImage.js";

export default class ImageCover extends GameImage {
    constructor(game, screen){
      super(game, "./sprites/player/capa.png", 500, 500, 400, 400, 0, 380)
      this.setScreen(screen)
    }
}