import ScreenComponent from "./ScreenComponents/ScreenComponent.js";


export default class GameImage extends ScreenComponent {
  constructor(game, image,  iw = 50, ih = 50, w = 50, h = 50, x = 0, y = 0, ix = 0 , iy = 0){
    super(game,undefined, w,h,x,y)
    
    this.image = new Image()
    this.image.src = image
    this.width = w
    this.height = h
    this.ix = ix
    this.iy = iy
    this.iw = iw 
    this.ih = ih
   
     
    
    

  }

  draw(){
    this.game.context.save()
    this.runnBeforeDraw()
    this.printDebug()
    this.game.context.drawImage(this.image, this.ix, this.iy, this.iw, this.ih, this.x, this.y,  this.width, this.height)
    this.game.context.restore()
  }

  //serve para interpolar código com o método draw nativo, super top
  runnBeforeDraw(){}

  printDebug(){
    if(!this.debug)  return
    this.game.context.strokeStyle = this.debugColor
    this.game.context.strokeRect( this.x, this.y,  this.width, this.height)
  }
}