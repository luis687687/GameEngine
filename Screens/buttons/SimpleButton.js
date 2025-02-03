import GameText from "../../CoralGameEngine/GameText.js";


export default class SimpleButton extends GameText {

  constructor(game, text, siz, x,y, color= "#7a3d15", stroke = "#380d05"){
    super(game, text, siz, x, y)
    this.color = color
    this.stroke = stroke
    
  }

}