import GameObject from "./GameObject.js";

export default class GameText extends GameObject {
  constructor(game, text = "Coral Game Engine" , size=30 , x = 0, y = 40, color = "orange", stroke){
    super(game)
    this.x = x 
    this.y = y
    this.text = text
    this.fontSize = size
    this.color = color
    this.stroke = stroke
  }

  /**Subscrita do draw! */
  async draw(){ //acção muito restrita para Engine
    
   // await this.setFont()
    this.game.context.font = `bold ${this.fontSize}px Luis`
    if(this.stroke){
      this.game.context.strokeStyle = this.color
      this.game.context.strokeText(this.text, this.x, this.y)
    }
    else{
      this.game.context.fillStyle = this.color
      this.game.context.fillText(this.text, this.x, this.y)
    }
    
  }
  update(){
    //console.log("A")
  }

  // async setFont(font){
  //   if(this.font) return
  //  // this.font = new FontFace("test", "url(./_fonts/goodTsimingbeg.otf)")
  //   //return this.font.load()
  // }
}