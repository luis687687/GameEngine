
import { ImageElement } from "../../../../CoralGameEngine/_helpers/ImageElement.js";
import BackgroundPlayerReference from "../BackgroundPlayerReference.js";



export default class Back2 extends BackgroundPlayerReference {
  constructor(game){
    super(game,  60, 1.7)
    this.imgElement = new ImageElement("../../../sprites/background/2.png", 5000, 864, 0, 0)
    this.speed = 0.7
    
  }
}