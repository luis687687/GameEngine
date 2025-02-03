import ScreenComponent from "./ScreenComponents/ScreenComponent.js";


export default class GameText extends ScreenComponent {
  constructor(game, text, size=30 , x = 0, y = 40, color= "#7a3d15", stroke = "#380d05"){
    super(game)
    this.x = x
    this.setY(y)
    this.text = text
    this.fontSize = size
    this.color = color
    this.stroke = stroke
    this.height = size
    this.letterSpacing = 3
    this.strokeSize = 1
    if(text)
      this.width = text.length * (size - 8)

  }
  

  /**Subscrita do draw! */
  draw(){ //acção muito restrita para Engine
   // await this.setFont()
    this.game.context.font = ` ${this.fontSize}px Luis`
    this.game.context.letterSpacing = `${this.letterSpacing}px`
    this.drawerDebug(this.x, this.y , this.width, this.height)
    this.offetY = this.height/1.4
    if(this.stroke){
      this.game.context.beginPath()
      this.game.context.strokeStyle = this.stroke
      
      this.game.context.strokeText(this.text, this.x, this.y + this.offetY)
      this.game.context.closePath()

    }

    this.game.context.fillStyle = this.color
    this.game.context.fillText(this.text, this.x, this.y + this.offetY)

    
  }
  update(){
    
  }

}