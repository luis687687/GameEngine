import { ImageElement } from "../../../../CoralGameEngine/_helpers/ImageElement.js";
import BackgroundPlayerReference from "../BackgroundPlayerReference.js";

export class Back4 extends BackgroundPlayerReference {

  constructor(game){
    super(game, 80, 2.1)
    this.imgElement = new ImageElement("./sprites/background/5.png", 5000, 880, 0, 0)
    this.speed = 0.1
  }
}