
import TrackerGameObject from "./TrackerGameObject.js";

export default class BackgroundObject extends TrackerGameObject {
  constructor(game){
    super(game)
    this.height = this.game.height
    this.x = -10
    this.y = 0
    this.#initialWidth()
    
  }
  /**subscreve */
  drawerWithoutAnimation(){
   this.#dubleDraw()
  }
  #dubleDraw(){
    let sx = this.x + this.width - 1
    const sy = this.y
    if(-this.x >= this.width){
      this.x = 0
    }
    this.drawSimpleWithImage(this.x, this.y, this.width , this.height, this.imgElement)
    this.drawSimpleWithImage(sx, this.y, this.width , this.height, this.imgElement)
  }
  /**setar o width default */
  #initialWidth(){
    this.width = this.game.width
  }
  /**subscrita */
  onScreenResize(){ /** */
    this.#initialWidth()
  }



}