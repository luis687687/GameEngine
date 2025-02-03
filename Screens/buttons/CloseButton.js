import GameImage from "../../CoralGameEngine/GameImage.js";



export default class CloseButton extends GameImage{
  constructor(game, x=0, y=0, click){
    super(game, "./sprites/gui/items1.png", 80, 80, 50, 50, x,y, 420, 285)
    if(click)
      this.onClick = click
  }
}