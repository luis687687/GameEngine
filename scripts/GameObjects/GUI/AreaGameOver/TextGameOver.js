import GameText from "../../../../CoralGameEngine/GameText.js";

export class TextGameOver extends GameText {
  constructor(game, screen){
    super(game)
    this.text = "Perdeu !"
    this.color = "orange"
    this.x = this.game.width/2- 130
    this.y = this.height/2+50
    this.fontSize = 60
    this.setScreen(screen)
    
   
  }

  update(){
    // if(this.x > 0) this.x -= 0.5
    // else if(this.x < 100) this.x += 0.5
    this.moveLeft()
  }
}