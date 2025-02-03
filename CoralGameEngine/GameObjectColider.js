import BaseObject from "./BaseObject.js"

export default class GameObjectColider extends BaseObject {
  constructor(game, width, height, x, y){
    super(game,  width, height)
    //this.debug = true
    this.backgroundColor = "transparent"
    this.feel = true //indica se é sensivel
    this.typeColider = true
    
  }

  update(){
    if(this.feel)
      this.debugColor = "green"
    else
      this.debugColor = "black"
  }
}