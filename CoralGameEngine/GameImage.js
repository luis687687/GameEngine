import GameObject from "./GameObject.js";

export default class GameImage extends GameObject {
  constructor(game, image,  iw = 50, ih = 50, w = 50, h = 50, x = 0, y = 0, ix = 0 , iy = 0){
    super(game,w,h,x,y)
    this.image = new Image()
    this.image.src = image
    this.width = w
    this.height = h
    this.ix = ix
    this.iy = iy
    this.iw = iw 
    this.ih = ih
    console.log(this.image.height)

  }

  draw(){
    this.game.context.save()
    this.runnBeforeDraw()
    
    this.game.context.drawImage(this.image, this.ix, this.iy, this.iw, this.ih, this.x, this.y,  this.width, this.height)
    this.game.context.restore()
  }

  runnBeforeDraw(){}
}