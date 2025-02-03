import GameImage from "../../../CoralGameEngine/GameImage.js";

export default class BackImage extends GameImage {
    constructor(game, screen){
      super(game, "./sprites/gui/splash/desert.png", 1024, 1024, game.width, game.height, 0,game.height )
      this.setScreen(screen)
    }
}