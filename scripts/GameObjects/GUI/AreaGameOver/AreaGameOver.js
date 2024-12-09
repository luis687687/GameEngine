import GameObject from "../../../../CoralGameEngine/GameObject.js";
import { TextGameOver } from "./TextGameOver.js";

export default class AreaGameOver extends GameObject {

  constructor(game){
    super(game)
    this.width = this.game.width
    this.height = this.game.height
    this.x = 0
    this.y = 0
    this.backgroundColor = "rgba(0,0,0,0.7)"
    this.putText()
  }


  putText(){
    this.text = new TextGameOver(this.game)
  }

}