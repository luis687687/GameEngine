
import { ImageElement } from "../../../../CoralGameEngine/_helpers/ImageElement.js";
import BackgroundPlayerReference from "../BackgroundPlayerReference.js";



export default class Ceil extends BackgroundPlayerReference {
  constructor(game){
    super(game,60, 1)
    this.width = this.game.width
    this.image = "../../../sprites/background/0.png"
    this.imgElement = new ImageElement("../../../sprites/background/1.png", 5000, 944, 0, 0)
  }
}