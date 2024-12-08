export class ImageElement {
  constructor(image, width, height, x, y){
    if(!image) throw "Defina uma imagem no oblecto ImageElement!"
    this.imageObject = new Image()
    this.imageObject.src = image
    this.image = image
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }
}