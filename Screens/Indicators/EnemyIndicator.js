import GameImage from "../../CoralGameEngine/GameImage.js";
import GameText from "../../CoralGameEngine/GameText.js";


export default class EnemyIndicator extends GameImage {

  constructor(game, screen, image, x, y, ix ){
    super(game, "./sprites/gui/gui.png", 210, 110, 
      Math.min( 200, game.width*0.1), Math.min( 90, game.height*0.1), x, y, 
      720, 700)
    
    this.setScreen(screen)
    this.text = new GameText(this.game, "0", 18, this.game.width*0.09, 15)
    this.imageIcon = new GameImage(this.game, image, 135, 107, 70, 70, ix, 13)
    this.debug = true

  }

  

  async childContent(){
    return [
      this.imageIcon,
      this.text
      
    ]
  }
}