import GameImage from "../../../../CoralGameEngine/GameImage.js"

export default class ScreenButton extends GameImage {
  constructor(game, screen, image, ix, iy, x,y){
    super(game, image, 130,60, 120, 60, x, y)
    this.ix =ix
    this.iy = iy
    this.setScreen(screen)
    
    
  }


  
}