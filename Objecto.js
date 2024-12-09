import GameObject from "./CoralGameEngine/GameObject.js";

export default class Objecto extends GameObject {

  constructor(game){
    super(game)
    this.width = 40
    this.height = 40
    this.backgroundColor = "red"
    this.x = 40
    this.y = 40
    this.visible = false
  }

  update(){
    if(this.game.keys.actives.includes("ArrowUp")){
      
    }
  }

}