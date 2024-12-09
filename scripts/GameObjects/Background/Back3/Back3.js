
import { ImageElement } from "../../../../CoralGameEngine/_helpers/ImageElement.js";
import BackgroundPlayerReference from "../BackgroundPlayerReference.js";



export default class Back3 extends BackgroundPlayerReference {
  constructor(game){
    super(game, 150, 1.4)
    this.speed = 0.3
    this.imgElement = new ImageElement("./sprites/background/3.png", 5000, 1592, 0, 0)
    
    
  }
}