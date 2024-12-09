import { ImageElement } from "../../../../CoralGameEngine/_helpers/ImageElement.js";
import BackgroundPlayerReference from "../BackgroundPlayerReference.js";

export class Sky extends BackgroundPlayerReference {
  constructor(game){
    super(game, game.height - 70, 1.5)
    this.imgElement = new ImageElement("./sprites/background/6.png", 5000, 796, 0, 0)
    this.speed = 0.04
  }
}